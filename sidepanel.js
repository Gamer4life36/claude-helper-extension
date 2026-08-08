const logEl = document.getElementById("log");
const modeEl = document.getElementById("mode");
const inp = document.getElementById("inp");
const BRIDGE = "http://localhost:8787";
const exec = (tool, args = {}) => new Promise((res) => chrome.runtime.sendMessage({ type: "EXEC", tool, args }, res));

const SITES = {
  pinterest: "pinterest.com", youtube: "youtube.com", google: "google.com", gmail: "mail.google.com",
  maps: "maps.google.com", amazon: "amazon.com", facebook: "facebook.com", instagram: "instagram.com",
  reddit: "reddit.com", twitter: "x.com", x: "x.com", tiktok: "tiktok.com", netflix: "netflix.com",
  wikipedia: "wikipedia.org", ebay: "ebay.com", etsy: "etsy.com", walmart: "walmart.com", target: "target.com",
  twitch: "twitch.tv", linkedin: "linkedin.com", spotify: "open.spotify.com", github: "github.com",
  discord: "discord.com", whatsapp: "web.whatsapp.com", yahoo: "yahoo.com", chatgpt: "chatgpt.com",
  claude: "claude.ai", imdb: "imdb.com", steam: "store.steampowered.com", paypal: "paypal.com", nexus: "nexusmods.com"
};
const looksUrl = (s) => /^https?:\/\//i.test(s) || /^[a-z0-9-]+(\.[a-z0-9-]+)+(\/\S*)?$/i.test(s);
function resolve(s) {
  s = s.trim();
  const key = s.toLowerCase().replace(/\.com$/, "");
  if (SITES[key]) return "https://" + SITES[key];
  const hit = Object.entries(SITES).find(([n, d]) => n.startsWith(s.toLowerCase()) || d.startsWith(s.toLowerCase()));
  if (hit && !s.includes(" ") && !looksUrl(s)) return "https://" + hit[1];
  if (looksUrl(s)) return /^https?:/i.test(s) ? s : "https://" + s;
  return "https://www.google.com/search?q=" + encodeURIComponent(s);
}

function addMsg(role, text, cls = "") {
  const d = document.createElement("div");
  d.className = "msg " + (role === "me" ? "me" : role === "sys" ? "sys" : "ai") + (cls ? " " + cls : "");
  d.textContent = text;
  logEl.appendChild(d); logEl.scrollTop = logEl.scrollHeight;
  return d;
}

let lastEls = [];
function resolveRef(s) {
  s = s.trim().replace(/^#/, "");
  if (/^\d+$/.test(s)) return { ref: s };
  const q = s.toLowerCase();
  const el = lastEls.find((x) => [x.text, x.name, x.placeholder, x.href].some((v) => (v || "").toLowerCase().includes(q)));
  return el ? { ref: el.ref } : null;
}

const HELP = `I can control your browser. Try:
• open pinterest    (or any site name / URL)
• search cute cats
• read              (lists the page's clickable/typeable items with numbers)
• click 7    or    click Sign in
• type hello@x.com into 3
• submit
• list tabs
Sensitive sites ask before acting; adult sites are blocked.`;

async function interpret(text) {
  const t = text.trim(), l = t.toLowerCase();
  let m;
  if (/^(help|\?|what can you do|commands)/.test(l)) return { text: HELP };
  if ((m = l.match(/^(?:open|go to|goto|visit|launch)\s+(.+)/))) { const url = resolve(m[1]); const r = await exec("open_tab", { url }); return { text: r.ok ? "Opened " + url : "🚫 " + r.error, blocked: !r.ok }; }
  if ((m = l.match(/^(?:search|google|find)\s+(.+)/))) { const url = "https://www.google.com/search?q=" + encodeURIComponent(m[1]); const r = await exec("open_tab", { url }); return { text: r.ok ? "Searched: " + m[1] : "🚫 " + r.error, blocked: !r.ok }; }
  if (l === "read" || /^(read|scan)( the)?( page)?$/.test(l) || /what.?s on/.test(l)) {
    const r = await exec("read_page", {}); if (!r.ok) return { text: "🚫 " + r.error, blocked: true };
    lastEls = r.page.elements;
    const list = lastEls.slice(0, 50).map((x) => `#${x.ref} <${x.tag}${x.type ? " " + x.type : ""}> ${x.text || x.placeholder || x.name || x.href}`.trim()).join("\n");
    return { text: `${r.page.url}\n${r.page.sensitive ? "⚠ sensitive · " : ""}${r.page.elements.length} elements:\n${list}`, els: true };
  }
  if (/^(list )?tabs$/.test(l)) { const r = await exec("list_tabs", {}); return { text: r.ok ? r.tabs.map((x) => `• ${x.title || x.url}`).join("\n") : "🚫 " + r.error, els: true }; }
  if ((m = t.match(/^type\s+(.+?)\s+(?:into|in)\s+(.+)$/i))) { const tgt = resolveRef(m[2]); if (!tgt) return { text: `Read the page first, then e.g. "type ${m[1]} into 3".` }; const r = await exec("type", { ...tgt, text: m[1] }); return { text: r.ok ? `Typed into ${m[2]}` : "🚫 " + r.error, blocked: !r.ok }; }
  if ((m = l.match(/^click\s+(.+)/))) { const tgt = resolveRef(m[1]); if (!tgt) return { text: `Couldn't find "${m[1]}". Say "read" first, then click by number or visible text.` }; const r = await exec("click", tgt); return { text: r.ok ? `Clicked ${m[1]}` : "🚫 " + r.error, blocked: !r.ok }; }
  if (/^submit\b/.test(l)) { const r = await exec("submit", {}); return { text: r.ok ? "Submitted." : "🚫 " + r.error, blocked: !r.ok }; }
  // fallback: treat as a site/search
  const url = resolve(t); const r = await exec("open_tab", { url }); return { text: r.ok ? "Opened " + url : "🚫 " + r.error, blocked: !r.ok };
}

// ── Full-Claude mode via the local bridge ──────────────────────────────────
let bridgeUp = false;
async function checkMode() {
  try { const r = await (await fetch(BRIDGE + "/log")).json(); bridgeUp = !!r.connected; } catch { bridgeUp = false; }
  modeEl.innerHTML = bridgeUp ? '<span class="dot g"></span>Full Claude (bridge connected)' : '<span class="dot b"></span>Basic commands — no API needed';
}
setInterval(checkMode, 3000); checkMode();

async function runViaBridge(text) {
  let before = 0; try { before = (await (await fetch(BRIDGE + "/log")).json()).log.length; } catch {}
  await fetch(BRIDGE + "/task", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ task: text }) });
  const div = addMsg("ai", "…thinking…", "els");
  for (let i = 0; i < 200; i++) {
    await new Promise((r) => setTimeout(r, 800));
    let r; try { r = await (await fetch(BRIDGE + "/log")).json(); } catch { break; }
    div.textContent = r.log.slice(before).join("\n") || "…";
    logEl.scrollTop = logEl.scrollHeight;
    if (!r.running) break;
  }
}

document.getElementById("f").addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = inp.value.trim(); if (!text) return;
  inp.value = ""; addMsg("me", text);
  if (bridgeUp) return runViaBridge(text);
  const r = await interpret(text);
  addMsg("ai", r.text, r.els ? "els" : r.blocked ? "blocked" : "");
});
document.getElementById("policy").onclick = () => chrome.runtime.openOptionsPage();
addMsg("sys", "Type a command. Say “help” for examples.");
