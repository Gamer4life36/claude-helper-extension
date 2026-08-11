// ── Claude Companion — content script (policy-enforced) ───────────────────────
// forbidden host/keyword → HARD BLOCK
// sensitive site with mode "ask" → Approve/Deny modal
// sensitive site with mode "allow" → runs directly (you chose "always allow")
// otherwise → runs directly

import { Readability } from "@mozilla/readability";
import DOMPurify from "dompurify";

(() => {
  let policy = null;

  function tagInteractive() {
    const els = [...document.querySelectorAll("a[href], button, input, textarea, select, [role=button], [contenteditable=true], [onclick]")];
    els.forEach((el, i) => el.setAttribute("data-claude-ref", String(i)));
    return els;
  }
  const elByRef = (ref) => document.querySelector(`[data-claude-ref="${CSS.escape(String(ref))}"]`);
  function getLabel(el: any) {
    try {
      if (el.id) {
        const l: any = document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
        if (l && l.innerText.trim()) return l.innerText.trim().slice(0, 60);
      }
      const p = el.closest("label");
      if (p && p.innerText.trim()) return p.innerText.trim().slice(0, 60);
      const a = el.getAttribute("aria-label");
      if (a) return a.slice(0, 60);
      return "";
    } catch {
      return "";
    }
  }
  const host = () => location.hostname.replace(/^www\./, "").toLowerCase();
  const suffixMatch = (list) => (list || []).some((d) => host() === d || host().endsWith("." + d));
  const keywordMatch = (list) => (list || []).some((k) => host().includes(k));

  function readPage() {
    const els = tagInteractive();
    return {
      url: location.href,
      title: document.title,
      sensitive: !!sensitivity().mode,
      forbidden: isForbidden(),
      hasPasswordField: !!document.querySelector("input[type=password]"),
      elements: els.slice(0, 400).map((el: any) => ({
        ref: el.getAttribute("data-claude-ref"),
        tag: el.tagName.toLowerCase(),
        type: el.getAttribute("type") || "",
        name: el.getAttribute("name") || "",
        placeholder: el.getAttribute("placeholder") || "",
        label: getLabel(el),
        text: (el.innerText || el.value || el.getAttribute("aria-label") || "").trim().slice(0, 80),
        href: el.getAttribute("href") || "",
        isPassword: (el.getAttribute("type") || "").toLowerCase() === "password",
      })),
      text: (document.body?.innerText || "").slice(0, 15000),
    };
  }

  const isForbidden = () => suffixMatch(policy?.forbiddenDomains) || keywordMatch(policy?.forbiddenKeywords);

  // Returns {mode:"ask"|"allow"|null}. null = not sensitive → run directly.
  function sensitivity(kind?: any, el?: any) {
    // explicit per-site rule wins
    const site = (policy?.confirmSites || []).find((s) => host() === s.host || host().endsWith("." + s.host));
    if (site) return { mode: site.mode || "ask" };
    // keyword / password-field / pay-button → sensitive, default ASK
    const u = location.href.toLowerCase();
    const kw = (policy?.confirmKeywords || []).some((k) => u.includes(k));
    const pw = !!document.querySelector("input[type=password]") || (el?.getAttribute?.("type") || "").toLowerCase() === "password";
    const PAY = ["pay", "submit", "login", "log in", "sign in", "signin", "checkout", "confirm", "transfer", "send money", "place order", "buy now", "purchase", "authorize"];
    const label = (el?.innerText || el?.value || "").toLowerCase();
    const payBtn = (kind === "click" || kind === "submit") && PAY.some((w) => label.includes(w));
    const subGate = kind === "submit" && policy?.rules?.confirmAllSubmits;
    if (kw || pw || payBtn || subGate) return { mode: "ask" };
    return { mode: null };
  }

  function confirmModal(summary, detail) {
    return new Promise((resolve) => {
      const wrap = document.createElement("div");
      wrap.style.cssText = "position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;font-family:Segoe UI,Arial,sans-serif";
      wrap.innerHTML = `<div style="background:#fff;max-width:440px;width:90%;border-radius:12px;padding:20px;box-shadow:0 10px 40px rgba(0,0,0,.4)">
        <div style="font-size:16px;font-weight:700;color:#b3261e;margin-bottom:6px">⚠️ Sensitive action — approve?</div>
        <div style="font-size:14px;color:#111;margin-bottom:6px">${summary}</div>
        <pre style="background:#f3f3f3;border-radius:8px;padding:10px;font-size:12px;white-space:pre-wrap;max-height:160px;overflow:auto">${detail}</pre>
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:8px">
          <button id="cl-deny" style="padding:8px 14px;border-radius:8px;border:1px solid #ccc;background:#f5f5f5;cursor:pointer">Deny</button>
          <button id="cl-ok" style="padding:8px 14px;border-radius:8px;border:0;background:#b3261e;color:#fff;cursor:pointer">Approve once</button>
        </div></div>`;
      document.documentElement.appendChild(wrap);
      (wrap.querySelector("#cl-ok") as any).onclick = () => {
        wrap.remove();
        resolve(true);
      };
      (wrap.querySelector("#cl-deny") as any).onclick = () => {
        wrap.remove();
        resolve(false);
      };
    });
  }

  async function perform(action) {
    const { kind, ref, text, selector } = action;
    if (isForbidden()) return { ok: false, forbidden: true, error: "forbidden by policy: this site is blocked (" + host() + ")" };
    if (kind === "read") return { ok: true, page: readPage() };
    if (kind === "scroll") {
      if (action.to === "bottom") window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      else if (action.to === "top") window.scrollTo({ top: 0, behavior: "smooth" });
      else window.scrollBy({ top: (action.amount || 700) * (action.direction === "up" ? -1 : 1), behavior: "smooth" });
      return { ok: true, did: "scrolled " + (action.to || action.direction || "down") };
    }
    if (kind === "find_text") {
      const q = (action.text || "").toLowerCase();
      if (!q) return { ok: false, error: "no text given" };
      const el: any = [...document.querySelectorAll("body *")].find((e: any) => e.children.length === 0 && (e.innerText || "").toLowerCase().includes(q));
      if (!el) return { ok: false, error: `"${action.text}" not found on this page` };
      el.scrollIntoView({ block: "center", behavior: "smooth" });
      const old = el.style.backgroundColor;
      el.style.backgroundColor = "#ffe066";
      setTimeout(() => {
        el.style.backgroundColor = old;
      }, 2500);
      return { ok: true, did: "found", text: (el.innerText || "").trim().slice(0, 120) };
    }
    if (kind === "extract") {
      // Prefer Readability (better article extraction); fall back to the heuristic below.
      try {
        const docClone: any = document.cloneNode(true);
        const article: any = new Readability(docClone).parse();
        if (article && (article.textContent || "").trim().length >= 200) {
          return {
            ok: true,
            title: article.title || document.title,
            url: location.href,
            text: (article.textContent || "").trim().slice(0, 60000),
            html: DOMPurify.sanitize(article.content || ""),
          };
        }
      } catch {}
      // fallback: original heuristic (querySelector + strip + innerText)
      const pick = document.querySelector("article, main, [role=main]") || document.body;
      const clone: any = pick.cloneNode(true);
      clone.querySelectorAll("script,style,nav,header,footer,aside,form,noscript,iframe,svg,button").forEach((e) => e.remove());
      const txt = (clone.innerText || "")
        .replace(/[ \t]+\n/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
      return { ok: true, title: document.title, url: location.href, text: txt.slice(0, 60000), html: "" };
    }
    if (kind === "links") {
      const seen = new Set(),
        links = [];
      for (const a of document.querySelectorAll("a[href]") as any) {
        const href = a.href;
        if (!/^https?:/.test(href) || seen.has(href)) continue;
        seen.add(href);
        links.push({ text: (a.innerText || "").trim().slice(0, 70), href });
        if (links.length >= 300) break;
      }
      return { ok: true, links };
    }
    if (kind === "speak") {
      try {
        speechSynthesis.cancel();
        const src = action.text || ((document.querySelector("article, main, [role=main]") || document.body) as any).innerText || "";
        const u = new SpeechSynthesisUtterance(src.slice(0, 8000));
        u.rate = 1;
        speechSynthesis.speak(u);
        return { ok: true, did: "reading aloud" };
      } catch (e) {
        return { ok: false, error: "text-to-speech unavailable: " + e.message };
      }
    }
    if (kind === "stopspeak") {
      try {
        speechSynthesis.cancel();
      } catch {}
      return { ok: true, did: "stopped" };
    }
    if (kind === "darkmode") {
      let s = document.getElementById("__cl_dark");
      if (s) {
        s.remove();
        return { ok: true, did: "dark mode off" };
      }
      s = document.createElement("style");
      s.id = "__cl_dark";
      s.textContent =
        "html{filter:invert(1) hue-rotate(180deg)!important;background:#111!important}img,video,picture,canvas,svg,[style*='background-image']{filter:invert(1) hue-rotate(180deg)!important}";
      document.documentElement.appendChild(s);
      return { ok: true, did: "dark mode on" };
    }
    if (kind === "zoom") {
      const b = document.body;
      let z = parseFloat(b.style.zoom || "1") || 1;
      if (action.dir === "in") z += 0.1;
      else if (action.dir === "out") z = Math.max(0.3, z - 0.1);
      else z = 1;
      b.style.zoom = String(z);
      return { ok: true, did: "zoom " + Math.round(z * 100) + "%" };
    }
    if (kind === "copy") {
      const val = action.text ?? location.href;
      try {
        await navigator.clipboard.writeText(val);
        return { ok: true, did: "copied" };
      } catch {
        const ta = document.createElement("textarea");
        ta.value = val;
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        ta.remove();
        return ok ? { ok: true, did: "copied" } : { ok: false, error: "clipboard blocked on this page" };
      }
    }

    let el = ref != null ? elByRef(ref) : selector ? document.querySelector(selector) : null;
    if (!el && kind === "submit") el = document.querySelector("form button[type=submit], form [type=submit], form"); // submit: fall back to the page's form
    if (!el) return { ok: false, error: "element not found — run read_page first to get refs." };
    const isPw = (el.getAttribute("type") || "").toLowerCase() === "password";

    // hard limits
    if (kind === "type" && isPw && policy?.rules?.forbidPasswordTyping) return { ok: false, forbidden: true, error: "forbidden by policy: typing into password fields is disabled" };
    if (kind === "submit" && policy?.rules?.forbidSubmitOnSensitive && sensitivity(kind, el).mode)
      return { ok: false, forbidden: true, error: "forbidden by policy: submitting on sensitive pages is disabled" };

    // ── HARD BLOCKS (never run, even with confirm): sensitive data, purchases, legal signing ──
    const btnLabel = (el.innerText || el.value || el.getAttribute("aria-label") || "").toLowerCase();
    if (kind === "type" && policy?.rules?.forbidSensitiveData) {
      const meta = [el.getAttribute("name"), el.getAttribute("id"), el.getAttribute("placeholder"), el.getAttribute("aria-label"), getLabel(el), el.getAttribute("autocomplete")]
        .join(" ")
        .toLowerCase();
      const hit = (policy.sensitiveFieldPatterns || []).find((p) => meta.includes(p));
      if (hit) return { ok: false, forbidden: true, error: `HARD BLOCK: I won't enter sensitive data (field looks like "${hit}"). Please type this yourself.` };
    }
    if ((kind === "click" || kind === "submit") && policy?.rules?.forbidPurchases) {
      const hit = (policy.purchaseKeywords || []).find((w) => btnLabel.includes(w));
      if (hit) return { ok: false, forbidden: true, error: `HARD BLOCK: I won't complete a purchase ("${hit}"). Do the final buy/pay step yourself.` };
    }
    if ((kind === "click" || kind === "submit") && policy?.rules?.forbidLegalSigning) {
      const onLegal = (policy.legalDomains || []).some((d) => host() === d || host().endsWith("." + d));
      const kwHit = (policy.legalKeywords || []).find((w) => btnLabel.includes(w));
      if (kwHit || (onLegal && (kind === "submit" || /\b(sign|agree|accept|submit|finish|continue|adopt)\b/.test(btnLabel))))
        return { ok: false, forbidden: true, error: "HARD BLOCK: I won't sign or submit legal documents. Please do this yourself." };
    }

    // confirm tier
    const s = sensitivity(kind, el);
    if (s.mode === "ask") {
      const label = (el.innerText || el.value || el.getAttribute("name") || el.getAttribute("placeholder") || el.tagName).toString().slice(0, 60);
      const detail = `Action: ${kind}\nTarget: <${el.tagName.toLowerCase()}> ${label}\nURL: ${location.href}` + (kind === "type" ? `\nText: ${isPw ? "«password — hidden»" : text}` : "");
      const ok = await confirmModal(`Claude Companion wants to <b>${kind}</b> on this sensitive page.`, detail);
      if (!ok) return { ok: false, denied: true, error: "Denied by user." };
    }
    // s.mode === "allow" or null → proceed

    switch (kind) {
      case "click":
        el.scrollIntoView({ block: "center" });
        el.click();
        return { ok: true, did: "click", ref };
      case "type":
        el.focus();
        if ("value" in el) {
          el.value = text ?? "";
          el.dispatchEvent(new Event("input", { bubbles: true }));
          el.dispatchEvent(new Event("change", { bubbles: true }));
        } else if (el.isContentEditable) el.textContent = text ?? "";
        return { ok: true, did: "type", ref };
      case "submit": {
        const form = el.closest("form") || document.querySelector("form");
        if (form) {
          form.requestSubmit ? form.requestSubmit() : form.submit();
          return { ok: true, did: "submit" };
        }
        el.click();
        return { ok: true, did: "submit(click)" };
      }
      default:
        return { ok: false, error: "unknown action: " + kind };
    }
  }

  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg?.type === "PAGE_ACTION") {
      policy = msg.policy || {};
      perform(msg.action)
        .then(sendResponse)
        .catch((e) => sendResponse({ ok: false, error: String(e?.message || e) }));
      return true;
    }
  });
  console.log("[Claude Companion] policy content script active on", location.href);
})();
