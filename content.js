// ── Claude Helper — content script (runs in every page) ────────────────────
// Enforces the user POLICY passed from the background:
//   forbidden rules → HARD BLOCK (never runs)
//   sensitive page/action → in-page Approve/Deny modal
//   otherwise → runs directly
// Credentials/payments are never auto-entered without explicit approval, and
// password typing can be hard-forbidden entirely via policy.

(() => {
  let policy = null;

  function tagInteractive() {
    const sel = "a[href], button, input, textarea, select, [role=button], [contenteditable=true], [onclick]";
    const els = [...document.querySelectorAll(sel)];
    els.forEach((el, i) => el.setAttribute("data-claude-ref", String(i)));
    return els;
  }
  const elByRef = (ref) => document.querySelector(`[data-claude-ref="${CSS.escape(String(ref))}"]`);

  function readPage() {
    const els = tagInteractive();
    return {
      url: location.href, title: document.title,
      sensitivePage: isSensitivePage(), hasPasswordField: !!document.querySelector("input[type=password]"),
      elements: els.slice(0, 400).map((el) => ({
        ref: el.getAttribute("data-claude-ref"), tag: el.tagName.toLowerCase(),
        type: el.getAttribute("type") || "", name: el.getAttribute("name") || "",
        placeholder: el.getAttribute("placeholder") || "",
        text: (el.innerText || el.value || el.getAttribute("aria-label") || "").trim().slice(0, 80),
        href: el.getAttribute("href") || "", isPassword: (el.getAttribute("type") || "").toLowerCase() === "password"
      })),
      text: (document.body?.innerText || "").slice(0, 15000)
    };
  }

  const host = () => location.hostname.replace(/^www\./, "").toLowerCase();
  const hostMatches = (list) => (list || []).some((d) => host() === d || host().endsWith("." + d));
  function isSensitivePage() {
    const u = location.href.toLowerCase();
    return hostMatches(policy?.confirmDomains) || (policy?.confirmKeywords || []).some((k) => u.includes(k)) || !!document.querySelector("input[type=password]");
  }
  const PAY_WORDS = ["pay","submit","login","log in","sign in","signin","checkout","confirm","transfer","send money","place order","buy now","purchase","authorize"];
  function actionIsSensitive(kind, el) {
    if (isSensitivePage()) return true;
    if ((el?.getAttribute?.("type") || "").toLowerCase() === "password") return true;
    const label = (el?.innerText || el?.value || "").toLowerCase();
    if ((kind === "click" || kind === "submit") && PAY_WORDS.some((w) => label.includes(w))) return true;
    if (kind === "submit" && policy?.rules?.confirmAllSubmits) return true;
    return false;
  }

  function confirmModal(summary, detail) {
    return new Promise((resolve) => {
      const wrap = document.createElement("div");
      wrap.style.cssText = "position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;font-family:Segoe UI,Arial,sans-serif";
      wrap.innerHTML = `<div style="background:#fff;max-width:440px;width:90%;border-radius:12px;padding:20px;box-shadow:0 10px 40px rgba(0,0,0,.4)">
        <div style="font-size:16px;font-weight:700;color:#b3261e;margin-bottom:6px">⚠️ Sensitive action — approve?</div>
        <div style="font-size:14px;color:#111;margin-bottom:6px">${summary}</div>
        <pre style="background:#f3f3f3;border-radius:8px;padding:10px;font-size:12px;white-space:pre-wrap;max-height:160px;overflow:auto">${detail}</pre>
        <div style="font-size:12px;color:#666;margin:8px 0">This page matches your sensitive-site policy. Nothing runs unless you approve.</div>
        <div style="display:flex;gap:8px;justify-content:flex-end">
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
    if (kind === "read") return { ok: true, page: readPage() };
    const el = ref != null ? elByRef(ref) : (selector ? document.querySelector(selector) : null);
    if (!el) return { ok: false, error: "element not found — run read_page first to get refs." };

    const isPw = (el.getAttribute("type") || "").toLowerCase() === "password";

    // ── HARD-FORBIDDEN rules (never run) ─────────────────────────────────
    if (kind === "type" && isPw && policy?.rules?.forbidPasswordTyping)
      return { ok: false, forbidden: true, error: "forbidden by policy: typing into password fields is disabled" };
    if (kind === "submit" && policy?.rules?.forbidSubmitOnSensitive && isSensitivePage())
      return { ok: false, forbidden: true, error: "forbidden by policy: submitting on sensitive pages is disabled" };

    // ── Sensitive → confirm ──────────────────────────────────────────────
    if (actionIsSensitive(kind, el)) {
      const label = (el.innerText || el.value || el.getAttribute("name") || el.getAttribute("placeholder") || el.tagName).toString().slice(0, 60);
      const detail = `Action: ${kind}\nTarget: <${el.tagName.toLowerCase()}> ${label}\nURL: ${location.href}` + (kind === "type" ? `\nText: ${isPw ? "«password field — hidden»" : text}` : "");
      const ok = await confirmModal(`Claude Helper wants to <b>${kind}</b> on this sensitive page.`, detail);
      if (!ok) return { ok: false, denied: true, error: "Denied by user." };
    }

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
    if (msg?.type === "PAGE_ACTION") {
      policy = msg.policy || {};
      perform(msg.action).then(sendResponse).catch((e) => sendResponse({ ok: false, error: String(e?.message || e) }));
      return true;
    }
  });
  console.log("[Claude Helper] policy-enforced content script active on", location.href);
})();
