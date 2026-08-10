// ── Claude Companion — background service worker + policy engine + bridge ──────
// Policy tiers per action:
//   capabilities      — allow-list of tools
//   forbiddenDomains  — hard block by host (no action ever)
//   forbiddenKeywords — hard block if host CONTAINS the word (catches adult/etc.)
//   confirmSites      — [{host, mode:"ask"|"allow"}] sensitive sites; ask or auto-allow
//   confirmKeywords   — URL words that make a page sensitive (default: ask)
//   rules             — hard limits (never type passwords, etc.)

const ADULT_DOMAINS = [
  "pornhub.com","xvideos.com","xnxx.com","xhamster.com","redtube.com","youporn.com",
  "spankbang.com","brazzers.com","onlyfans.com","fansly.com","chaturbate.com","stripchat.com",
  "livejasmin.com","cam4.com","camsoda.com","bongacams.com","myfreecams.com","rule34.xxx","e621.net"
];
const ADULT_KEYWORDS = [
  "porn","xxx","xvideos","xnxx","xhamster","hentai","nsfw","camgirl","camsex","adultcam",
  "escort","onlyfans","chaturbate","stripchat","livejasmin","deepnude","undress","nudify",
  "rule34","xrated","x-rated","sexcam","camwhore"
];

const DEFAULT_POLICY = {
  capabilities: { open_tab: true, navigate: true, close_tab: true, list_tabs: true, read_page: true, click: true, type: true, submit: true, scroll: true, reload: true, back: true, forward: true, find_text: true, extract: true, links: true, speak: true, stopspeak: true, darkmode: true, zoom: true, copy: true },
  forbiddenDomains: [...ADULT_DOMAINS],
  forbiddenKeywords: [...ADULT_KEYWORDS],
  confirmSites: [
    "chase.com","bankofamerica.com","wellsfargo.com","citi.com","citibank.com","capitalone.com",
    "usbank.com","pnc.com","tdbank.com","discover.com","americanexpress.com","amex.com",
    "fidelity.com","schwab.com","vanguard.com","paypal.com","venmo.com","cash.app","stripe.com",
    "coinbase.com","irs.gov","ssa.gov"
  ].map((host) => ({ host, mode: "ask" })),
  confirmKeywords: ["login","signin","sign-in","logon","auth","account","bank","billing","checkout","payment","pay","wallet","transfer","invoice","card"],
  // HARD BLOCKS (never run, not even with confirm): purchases, legal signing, sensitive data entry
  purchaseKeywords: ["buy now","buy it now","place order","place your order","complete purchase","complete order","confirm purchase","confirm order","confirm and pay","confirm & pay","pay now","pay $","submit payment","proceed to payment","make payment","subscribe and pay","authorize payment","purchase now","pay and confirm","order now","complete payment"],
  legalDomains: ["docusign.com","docusign.net","hellosign.com","dropboxsign.com","adobesign.com","echosign.com","na1.echosign.com","signnow.com","pandadoc.com","signeasy.com","esignlive.com"],
  legalKeywords: ["e-sign","esign","electronically sign","sign document","sign & submit","agree and sign","legally binding","accept and sign","sign here","apply for a","submit application","power of attorney","notariz","notaris","adopt signature","apply my signature"],
  sensitiveFieldPatterns: ["ssn","social security","credit card","debit card","card number","cardnumber","cc-number","cc-num","cvv","cvc","security code","card verification","routing number","account number","bank account","iban","sort code","passport","driver's license","drivers license","license number","tax id","taxpayer","tin","ein","national id","government id","date of birth","dob","mother's maiden"],
  rules: { forbidPasswordTyping: true, forbidSubmitOnSensitive: false, confirmAllSubmits: true, allowBridge: true, forbidPurchases: true, forbidLegalSigning: true, forbidSensitiveData: true }
};
const BRIDGE_URL = "ws://localhost:8787";

async function getPolicy() {
  const { policy } = await chrome.storage.local.get("policy");
  const p = policy || {};
  const merged = {
    ...DEFAULT_POLICY, ...p,
    capabilities: { ...DEFAULT_POLICY.capabilities, ...(p.capabilities || {}) },
    rules: { ...DEFAULT_POLICY.rules, ...(p.rules || {}) },
    confirmSites: (p.confirmSites || p.confirmDomains?.map((h) => ({ host: h, mode: "ask" })) || DEFAULT_POLICY.confirmSites)
  };
  // one-time seed: guarantee the adult blocklists exist even for older stored policies
  if (!p.seeded) {
    merged.forbiddenDomains = [...new Set([...(p.forbiddenDomains || []), ...ADULT_DOMAINS])];
    merged.forbiddenKeywords = [...new Set([...(p.forbiddenKeywords || []), ...ADULT_KEYWORDS])];
    merged.seeded = true;
  }
  return merged;
}
async function seedPolicy() { await chrome.storage.local.set({ policy: await getPolicy() }); }
chrome.runtime.onInstalled.addListener(() => { seedPolicy(); try { chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }); } catch {} });
seedPolicy(); // also on service-worker start, to fix already-installed copies
try { chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }); } catch {}

const hostOf = (url) => { try { return new URL(url).hostname.replace(/^www\./, "").toLowerCase(); } catch { return ""; } };
const suffixMatch = (host, list) => (list || []).some((d) => host === d || host.endsWith("." + d));
const keywordMatch = (host, list) => (list || []).some((k) => host.includes(k));
function forbiddenReason(host, policy) {
  if (suffixMatch(host, policy.forbiddenDomains)) return `${host} is on the forbidden domains list`;
  const k = (policy.forbiddenKeywords || []).find((w) => host.includes(w));
  if (k) return `${host} matches forbidden keyword "${k}"`;
  return null;
}
// Also block searching for forbidden terms (e.g. typing "pornhub" -> Google search).
function searchQueryForbidden(url, policy) {
  try {
    const u = new URL(url);
    const q = (u.searchParams.get("q") || u.searchParams.get("query") || u.searchParams.get("p") || "").toLowerCase();
    const isSearch = /google\.|bing\.|duckduckgo\.|yahoo\.|search\./.test(u.hostname) && q;
    if (isSearch) { const k = (policy.forbiddenKeywords || []).find((w) => q.includes(w)); if (k) return `search query matches forbidden keyword "${k}"`; }
  } catch {}
  return null;
}

async function execTool(tool, args = {}) {
  const policy = await getPolicy();
  if (!policy.capabilities[tool]) return { ok: false, error: `blocked: capability "${tool}" is disabled in policy` };

  if (tool === "open_tab" || tool === "navigate") {
    const why = forbiddenReason(hostOf(args.url), policy) || searchQueryForbidden(args.url, policy);
    if (why) return { ok: false, forbidden: true, error: "blocked: " + why };
  }
  switch (tool) {
    case "open_tab": { const t = await chrome.tabs.create({ url: args.url, active: args.active ?? true }); return { ok: true, tabId: t.id, url: args.url }; }
    case "navigate": { await chrome.tabs.update(args.tabId ?? (await activeTabId()), { url: args.url }); return { ok: true }; }
    case "close_tab": await chrome.tabs.remove(args.tabId); return { ok: true };
    case "list_tabs": { const tabs = await chrome.tabs.query({}); return { ok: true, tabs: tabs.map(t => ({ id: t.id, url: t.url, title: t.title, active: t.active })) }; }
    case "reload": { const id = args.tabId ?? (await activeTabId()); await chrome.tabs.reload(id); return { ok: true }; }
    case "back": { const id = args.tabId ?? (await activeTabId()); try { await chrome.tabs.goBack(id); } catch { return { ok: false, error: "can't go back" }; } return { ok: true }; }
    case "forward": { const id = args.tabId ?? (await activeTabId()); try { await chrome.tabs.goForward(id); } catch { return { ok: false, error: "can't go forward" }; } return { ok: true }; }
    case "read_page": case "click": case "type": case "submit": case "scroll": case "find_text":
    case "extract": case "links": case "speak": case "stopspeak": case "darkmode": case "zoom": case "copy": {
      let tabId, tab;
      try { tabId = args.tabId ?? (await activeTabId()); } catch { return { ok: false, error: "no active tab — open a normal web page first" }; }
      try { tab = await chrome.tabs.get(tabId); } catch { return { ok: false, error: "couldn't access the active tab (open a normal http/https page)" }; }
      const why = forbiddenReason(hostOf(tab.url), policy);
      if (why) return { ok: false, forbidden: true, error: "blocked: " + why };
      const action = { kind: tool === "read_page" ? "read" : tool, ref: args.ref, selector: args.selector, text: args.text, direction: args.direction, amount: args.amount, to: args.to, dir: args.dir };
      return await sendToTab(tabId, { type: "PAGE_ACTION", action, policy });
    }
    default: return { ok: false, error: "unknown tool: " + tool };
  }
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  (async () => {
    try {
      switch (msg?.type) {
        case "GET_POLICY": return sendResponse({ ok: true, policy: await getPolicy(), defaults: DEFAULT_POLICY });
        case "SET_POLICY": await chrome.storage.local.set({ policy: msg.policy }); return sendResponse({ ok: true });
        case "EXEC": return sendResponse(await execTool(msg.tool, msg.args || {}));
        case "OPEN_TAB": return sendResponse(await execTool("open_tab", { url: msg.url, active: msg.active }));
        case "LIST_TABS": return sendResponse(await execTool("list_tabs"));
        case "PAGE_ACTION": { const m = { read: "read_page", click: "click", type: "type", submit: "submit" }; return sendResponse(await execTool(m[msg.action.kind], msg.action)); }
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

// ── Bridge (respects the same policy via execTool) ─────────────────────────
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
    const result = policy.rules.allowBridge
      ? await execTool(req.tool, req.args || {}).catch((e) => ({ ok: false, error: String(e?.message || e) }))
      : { ok: false, error: "blocked: bridge control is disabled in policy" };
    bridge.send(JSON.stringify({ id: req.id, result }));
  };
}
function scheduleReconnect() { clearTimeout(reconnectTimer); reconnectTimer = setTimeout(connectBridge, 3000); }
connectBridge();
setInterval(() => { if (bridge && bridge.readyState === 1) bridge.send(JSON.stringify({ ping: 1 })); }, 20000);
