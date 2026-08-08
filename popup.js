const out = document.getElementById("out");
const statusEl = document.getElementById("status");
const $ = (id) => document.getElementById(id);
const show = (v) => (out.textContent = typeof v === "string" ? v : JSON.stringify(v, null, 2));
const send = (msg) => new Promise((res) => chrome.runtime.sendMessage(msg, res));

async function refreshStatus() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const { hosts } = await send({ type: "GET_SENSITIVE_HOSTS" });
  const host = (() => { try { return new URL(tab.url).hostname.replace(/^www\./, ""); } catch { return ""; } })();
  const sensitive = hosts.some((d) => host === d || host.endsWith("." + d)) || /login|bank|pay|checkout|account|auth|billing/i.test(tab.url || "");
  statusEl.innerHTML = `Active: <b>${host || tab.url}</b> — ` +
    (sensitive ? `<span class="warn">sensitive → will confirm each action</span>` : `<span class="safe">normal → actions run directly</span>`);
}
refreshStatus();

$("policy").onclick = () => chrome.runtime.openOptionsPage();

$("open").onclick = async () => show(await send({ type: "OPEN_TAB", url: $("url").value }));
$("tabs").onclick = async () => show(await send({ type: "LIST_TABS" }));
$("read").onclick = async () => {
  const r = await send({ type: "PAGE_ACTION", action: { kind: "read" } });
  if (r.ok) {
    const e = r.page.elements.map((x) => `#${x.ref} <${x.tag}${x.type ? " " + x.type : ""}> ${x.text || x.placeholder || x.name || x.href}`.trim());
    show(`URL: ${r.page.url}\nSensitive page: ${r.page.sensitivePage}\nPassword field: ${r.page.hasPasswordField}\n\nElements (ref → element):\n` + e.join("\n"));
  } else show(r);
};

function refField() { const v = $("ref").value.trim(); return /^\d+$/.test(v) ? { ref: v } : { selector: v }; }
$("click").onclick = async () => show(await send({ type: "PAGE_ACTION", action: { kind: "click", ...refField() } }));
$("submit").onclick = async () => show(await send({ type: "PAGE_ACTION", action: { kind: "submit", ...refField() } }));
$("type").onclick = async () => show(await send({ type: "PAGE_ACTION", action: { kind: "type", ...refField(), text: $("text").value } }));
