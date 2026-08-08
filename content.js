// ── Claude Helper — content script (policy-enforced) ───────────────────────
// forbidden host/keyword → HARD BLOCK
// sensitive site with mode "ask" → Approve/Deny modal
// sensitive site with mode "allow" → runs directly (you chose "always allow")
// otherwise → runs directly

(() => {
  let policy = null;

  function tagInteractive() {
    const els = [...document.querySelectorAll("a[href], button, input, textarea, select, [role=button], [contenteditable=true], [onclick]")];
    els.forEach((el, i) => el.setAttribute("data-claude-ref", String(i)));
    return els;
  }
  const elByRef = (ref) => document.querySelector(`[data-claude-ref="${CSS.escape(String(ref))}"]`);
  const host = () => location.hostname.replace(/^www\./, "").toLowerCase();
  const suffixMatch = (list) => (list || []).some((d) => host() === d || host().endsWith("." + d));
  const keywordMatch = (list) => (list || []).some((k) => host().includes(k));

  function readPage() {
    const els = tagInteractive();
    return {
      url: location.href, title: document.title, sensitive: !!sensitivity().mode, forbidden: isForbidden(),
      hasPasswordField: !!document.querySelector("input[type=password]"),
      elements: els.slice(0, 400).map((el) => ({
        ref: el.getAttribute("data-claude-ref"), tag: el.tagName.toLowerCase(), type: el.getAttribute("type") || "",
        name: el.getAttribute("name") || "", placeholder: el.getAttribute("placeholder") || "",
        text: (el.innerText || el.value || el.getAttribute("aria-label") || "").trim().slice(0, 80),
        href: el.getAttribute("href") || "", isPassword: (el.getAttribute("type") || "").toLowerCase() === "password"
      })),
      text: (document.body?.innerText || "").slice(0, 15000)
    };
  }

  const isForbidden = () => suffixMatch(policy?.forbiddenDomains) || keywordMatch(policy?.forbiddenKeywords);

  // Returns {mode:"ask"|"allow"|null}. null = not sensitive → run directly.
  function sensitivity(kind, el) {
    // explicit per-site rule wins
    const site = (policy?.confirmSites || []).find((s) => host() === s.host || host().endsWith("." + s.host));
    if (site) return { mode: site.mode || "ask" };
    // keyword / password-field / pay-button → sensitive, default ASK
    const u = location.href.toLowerCase();
    const kw = (policy?.confirmKeywords || []).some((k) => u.includes(k));
    const pw = !!document.querySelector("input[type=password]") || (el?.getAttribute?.("type") || "").toLowerCase() === "password";
    const PAY = ["pay","submit","login","log in","sign in","signin","checkout","confirm","transfer","send money","place order","buy now","purchase","authorize"];
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
      wrap.querySelector("#cl-ok").onclick = () => { wrap.remove(); resolve(true); };
      wrap.querySelector("#cl-deny").onclick = () => { wrap.remove(); resolve(false); };
    });
  }

  async function perform(action) {
    const { kind, ref, text, selector } = action;
    if (isForbidden()) return { ok: false, forbidden: true, error: "forbidden by policy: this site is blocked (" + host() + ")" };
    if (kind === "read") return { ok: true, page: readPage() };

    const el = ref != null ? elByRef(ref) : (selector ? document.querySelector(selector) : null);
    if (!el) return { ok: false, error: "element not found — run read_page first to get refs." };
    const isPw = (el.getAttribute("type") || "").toLowerCase() === "password";

    // hard limits
    if (kind === "type" && isPw && policy?.rules?.forbidPasswordTyping)
      return { ok: false, forbidden: true, error: "forbidden by policy: typing into password fields is disabled" };
    if (kind === "submit" && policy?.rules?.forbidSubmitOnSensitive && sensitivity(kind, el).mode)
      return { ok: false, forbidden: true, error: "forbidden by policy: submitting on sensitive pages is disabled" };

    // confirm tier
    const s = sensitivity(kind, el);
    if (s.mode === "ask") {
      const label = (el.innerText || el.value || el.getAttribute("name") || el.getAttribute("placeholder") || el.tagName).toString().slice(0, 60);
      const detail = `Action: ${kind}\nTarget: <${el.tagName.toLowerCase()}> ${label}\nURL: ${location.href}` + (kind === "type" ? `\nText: ${isPw ? "«password — hidden»" : text}` : "");
      const ok = await confirmModal(`Claude Helper wants to <b>${kind}</b> on this sensitive page.`, detail);
      if (!ok) return { ok: false, denied: true, error: "Denied by user." };
    }
    // s.mode === "allow" or null → proceed

    switch (kind) {
      case "click": el.scrollIntoView({ block: "center" }); el.click(); return { ok: true, did: "click", ref };
      case "type":
        el.focus();
        if ("value" in el) { el.value = text ?? ""; el.dispatchEvent(new Event("input", { bubbles: true })); el.dispatchEvent(new Event("change", { bubbles: true })); }
        else if (el.isContentEditable) el.textContent = text ?? "";
        return { ok: true, did: "type", ref };
      case "submit": { const form = el.closest("form") || document.querySelector("form"); if (form) { form.requestSubmit ? form.requestSubmit() : form.submit(); return { ok: true, did: "submit" }; } el.click(); return { ok: true, did: "submit(click)" }; }
      default: return { ok: false, error: "unknown action: " + kind };
    }
  }

  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg?.type === "PAGE_ACTION") { policy = msg.policy || {}; perform(msg.action).then(sendResponse).catch((e) => sendResponse({ ok: false, error: String(e?.message || e) })); return true; }
  });
  console.log("[Claude Helper] policy content script active on", location.href);
})();
