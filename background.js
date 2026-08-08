// ── Claude Helper — background service worker + policy engine + bridge ──────
// Every action is checked against a user-editable POLICY:
//   • capabilities  — which tools are allowed at all (allow-list)
//   • forbiddenDomains — hard-blocked hosts: NO action ever runs (not even read)
//   • confirmDomains  — sensitive hosts: each action asks for approval
//   • rules — hard limits (e.g. never type into password fields)
// Policy is enforced for BOTH the popup and the Claude bridge.

const DEFAULT_POLICY = {
  capabilities: {
    open_tab: true, navigate: true, close_tab: true, list_tabs: true,
    read_page: true, click: true, type: true, submit: true
  },
  forbiddenDomains: [],            // e.g. ["mybank.com"] → extension refuses entirely
  confirmDomains: [
    "chase.com","bankofamerica.com","wellsfargo.com","citi.com","citibank.com",
    "capitalone.com","usbank.com","pnc.com","tdbank.com","discover.com",
    "americanexpress.com","amex.com","fidelity.com","schwab.com","vanguard.com",
    "paypal.com","venmo.com","cash.app","stripe.com","coinbase.com","irs.gov","ssa.gov"
  ],
  confirmKeywords: ["login","signin","sign-in","logon","auth","account","bank","billing","checkout","payment","pay","wallet","transfer","invoice","card"],
  rules: {
    forbidPasswordTyping: true,     // never type into <input type=password>
    forbidSubmitOnSensitive: false, // if true: block (not just confirm) submits on sensitive pages
    confirmAllSubmits: true,        // any form submit asks for approval
    allowBridge: true               // allow the Claude bridge to drive actions
  }
};
const BRIDGE_URL = "ws://localhost:8787";

async function getPolicy() {
  const { policy } = await chrome.storage.local.get("policy");
  return { ...DEFAULT_POLICY, ...(policy || {}), capabilities: { ...DEFAULT_POLICY.capabilities, ...(policy?.capabilities || {}) }, rules: { ...DEFAULT_POLICY.rules, ...(policy?.rules || {}) } };
}
chrome.runtime.onInstalled.addListener(async () => {
  const cur = await chrome.storage.local.get("policy");
  if (!cur.policy) await chrome.storage.local.set({ policy: DEFAULT_POLICY });
});

function hostOf(url) { try { return new URL(url).hostname.replace(/^www\./, "").toLowerCase(); } catch { return ""; } }
function hostMatches(host, list) { return list.some((d) => host === d || host.endsWith("." + d)); }

// ── Execute one tool under policy (shared by popup + bridge) ───────────────
async function execTool(tool, args = {}) {
  const policy = await getPolicy();
  if (!policy.capabilities[tool]) return { ok: false, error: `blocked: capability "${tool}" is disabled in policy` };

  // resolve target tab + host for page actions / navigation
  const pageTools = ["read_page", "click", "type", "submit"];
  let tabId = args.tabId;
  if (pageTools.includes(tool) && tabId == null) tabId = await activeTabId();

  if (tool === "open_tab" || tool === "navigate") {
    const host = hostOf(args.url);
    if (hostMatches(host, policy.forbiddenDomains)) return { ok: false, error: `blocked: ${host} is on the forbidden list` };
  }

  switch (tool) {
    case "open_tab": { const t = await chrome.tabs.create({ url: args.url, active: args.active ?? true }); return { ok: true, tabId: t.id, url: args.url }; }
    case "navigate": { await chrome.tabs.update(tabId ?? (await activeTabId()), { url: args.url }); return { ok: true }; }
    case "close_tab": await chrome.tabs.remove(args.tabId); return { ok: true };
    case "list_tabs": { const tabs = await chrome.tabs.query({}); return { ok: true, tabs: tabs.map(t => ({ id: t.id, url: t.url, title: t.title, active: t.active })) }; }
    case "read_page": case "click": case "type": case "submit": {
      const tab = await chrome.tabs.get(tabId);
      if (hostMatches(hostOf(tab.url), policy.forbiddenDomains)) return { ok: false, error: `blocked: ${hostOf(tab.url)} is on the forbidden list` };
      const action = { kind: tool === "read_page" ? "read" : tool, ref: args.ref, selector: args.selector, text: args.text };
      return await sendToTab(tabId, { type: "PAGE_ACTION", action, policy });
    }
    default: return { ok: false, error: "unknown tool: " + tool };
  }
}

// ── Popup / options message hub ────────────────────────────────────────────
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  (async () => {
    try {
      switch (msg?.type) {
        case "GET_POLICY": return sendResponse({ ok: true, policy: await getPolicy(), defaults: DEFAULT_POLICY });
        case "SET_POLICY": await chrome.storage.local.set({ policy: msg.policy }); return sendResponse({ ok: true });
        case "OPEN_TAB": return sendResponse(await execTool("open_tab", { url: msg.url, active: msg.active }));
        case "LIST_TABS": return sendResponse(await execTool("list_tabs"));
        case "PAGE_ACTION": { const map = { read: "read_page", click: "click", type: "type", submit: "submit" }; return sendResponse(await execTool(map[msg.action.kind], msg.action)); }
        case "BRIDGE_STATUS": return sendResponse({ ok: true, connected: !!(bridge && bridge.readyState === 1) });
        default: sendResponse({ ok: false, error: "unknown: " + msg?.type });
      }
    } catch (e) { sendResponse({ ok: false, error: String(e?.message || e) }); }
  })();
  return true;
});

async function activeTabId() { const [t] = await chrome.tabs.query({ active: true, currentWindow: true }); if (!t) throw new Error("no active tab"); return t.id; }
function sendToTab(tabId, payload) {
  return new Promise((resolve) => chrome.tabs.sendMessage(tabId, payload, (resp) =>
    resolve(chrome.runtime.lastError ? { ok: false, error: chrome.runtime.lastError.message + " (open a normal http/https page and reload it)" } : resp)));
}

// ── Bridge (WebSocket to local Claude server) — respects policy via execTool ─
let bridge = null, reconnectTimer = null;
function connectBridge() {
  try { bridge = new WebSocket(BRIDGE_URL); } catch { return scheduleReconnect(); }
  bridge.onopen = () => bridge.send(JSON.stringify({ hello: "extension" }));
  bridge.onclose = () => scheduleReconnect();
  bridge.onerror = () => { try { bridge.close(); } catch {} };
  bridge.onmessage = async (ev) => {
    let req; try { req = JSON.parse(ev.data); } catch { return; }
    if (!req.id || !req.tool) return;
    const policy = await getPolicy();
    let result = policy.rules.allowBridge ? await execTool(req.tool, req.args || {}).catch((e) => ({ ok: false, error: String(e?.message || e) }))
                                          : { ok: false, error: "blocked: bridge control is disabled in policy" };
    bridge.send(JSON.stringify({ id: req.id, result }));
  };
}
function scheduleReconnect() { clearTimeout(reconnectTimer); reconnectTimer = setTimeout(connectBridge, 3000); }
connectBridge();
setInterval(() => { if (bridge && bridge.readyState === 1) bridge.send(JSON.stringify({ ping: 1 })); }, 20000);
