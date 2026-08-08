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
const SEARCH_URLS = {
  pinterest: "https://www.pinterest.com/search/pins/?q=", youtube: "https://www.youtube.com/results?search_query=",
  amazon: "https://www.amazon.com/s?k=", google: "https://www.google.com/search?q=", reddit: "https://www.reddit.com/search/?q=",
  ebay: "https://www.ebay.com/sch/i.html?_nkw=", etsy: "https://www.etsy.com/search?q=", github: "https://github.com/search?q=",
  wikipedia: "https://en.wikipedia.org/w/index.php?search=", twitter: "https://x.com/search?q=", x: "https://x.com/search?q=",
  walmart: "https://www.walmart.com/search?q=", target: "https://www.target.com/s?searchTerm=", spotify: "https://open.spotify.com/search/",
  imdb: "https://www.imdb.com/find/?q=", netflix: "https://www.netflix.com/search?q=", nexus: "https://www.nexusmods.com/search/?gsearch="
};
function siteSearchUrl(site, q) { const k = site.toLowerCase().replace(/\.com$/, ""); return SEARCH_URLS[k] ? SEARCH_URLS[k] + encodeURIComponent(q) : "https://www.google.com/search?q=" + encodeURIComponent(site + " " + q); }
const looksUrl = (s) => /^https?:\/\//i.test(s) || /^[a-z0-9-]+(\.[a-z0-9-]+)+(\/\S*)?$/i.test(s);
function resolve(s) {
  s = s.trim(); const key = s.toLowerCase().replace(/\.com$/, "");
  if (SITES[key]) return "https://" + SITES[key];
  const hit = Object.entries(SITES).find(([n, d]) => n.startsWith(s.toLowerCase()) || d.startsWith(s.toLowerCase()));
  if (hit && !s.includes(" ") && !looksUrl(s)) return "https://" + hit[1];
  if (looksUrl(s)) return /^https?:/i.test(s) ? s : "https://" + s;
  return "https://www.google.com/search?q=" + encodeURIComponent(s);
}

function addMsg(role, text, cls = "") {
  const d = document.createElement("div");
  d.className = "msg " + (role === "me" ? "me" : role === "sys" ? "sys" : "ai") + (cls ? " " + cls : "");
  d.textContent = text; logEl.appendChild(d); logEl.scrollTop = logEl.scrollHeight; return d;
}

// ── element / field matching ──────────────────────────────────────────────
let lastEls = [];
async function ensureRead() { const r = await exec("read_page", {}); if (r.ok) lastEls = r.page.elements; return lastEls; }
function scoreEl(x, s, keys) { let sc = 0; for (const key of keys) { const t = (x[key] || "").toLowerCase(); if (t === s) sc = Math.max(sc, 3); else if (t.startsWith(s)) sc = Math.max(sc, 2); else if (t.includes(s)) sc = Math.max(sc, 1); } return sc; }
function findEl(q) {
  q = q.trim().replace(/^#/, ""); if (/^\d+$/.test(q)) return { ref: q };
  const s = q.toLowerCase();
  const best = lastEls.map((x) => ({ x, sc: scoreEl(x, s, ["label", "text", "name", "placeholder", "href"]) })).filter((o) => o.sc > 0).sort((a, b) => b.sc - a.sc)[0];
  return best ? { ref: best.x.ref } : null;
}
function findField(k) {
  const s = k.toLowerCase();
  const inputs = lastEls.filter((x) => ["input", "textarea", "select"].includes(x.tag) && !["submit", "button", "checkbox", "radio"].includes(x.type));
  const best = inputs.map((x) => ({ x, sc: scoreEl(x, s, ["label", "name", "placeholder"]) })).filter((o) => o.sc > 0).sort((a, b) => b.sc - a.sc)[0];
  return best ? { ref: best.x.ref } : null;
}

// intent → URL
function intentUrl(t) {
  let m;
  if ((m = t.match(/^(?:images?|pictures?|pics?)\s+of\s+(.+)/i))) return "https://www.google.com/search?tbm=isch&q=" + encodeURIComponent(m[1]);
  if ((m = t.match(/^(?:videos?|watch|play)\s+(?:of\s+)?(.+)/i))) return SEARCH_URLS.youtube + encodeURIComponent(m[1]);
  if ((m = t.match(/^(?:maps?|directions?(?:\s+to)?|where is)\s+(.+)/i))) return "https://www.google.com/maps/search/" + encodeURIComponent(m[1]);
  if ((m = t.match(/^(?:wiki|wikipedia)\s+(.+)/i))) return SEARCH_URLS.wikipedia + encodeURIComponent(m[1]);
  if ((m = t.match(/^(?:define|definition of|meaning of)\s+(.+)/i))) return "https://www.google.com/search?q=" + encodeURIComponent("define " + m[1]);
  if ((m = t.match(/^translate\s+(.+)/i))) return "https://translate.google.com/?sl=auto&tl=en&text=" + encodeURIComponent(m[1]);
  if ((m = t.match(/^weather(?:\s+(?:in|for))?\s+(.+)/i))) return "https://www.google.com/search?q=" + encodeURIComponent("weather " + m[1]);
  if ((m = t.match(/^(?:buy|shop(?:\s+for)?|order)\s+(.+)/i))) return SEARCH_URLS.amazon + encodeURIComponent(m[1]);
  if ((m = t.match(/^news(?:\s+(?:about|on))?\s+(.+)/i))) return "https://news.google.com/search?q=" + encodeURIComponent(m[1]);
  return null;
}

function buildPage(topic) {
  const T = topic.replace(/[<>]/g, "").slice(0, 60);
  const html = `<!doctype html><html><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>${T}</title>
<style>*{margin:0;box-sizing:border-box}body{font-family:Segoe UI,Arial,sans-serif;background:#0b0e13;color:#e8e8e8}
.hero{padding:90px 24px;text-align:center;background:radial-gradient(circle at 50% -20%,#16324f,#0b0e13)}
.hero h1{font-size:46px;background:linear-gradient(90deg,#5ea0ff,#9b6bff);-webkit-background-clip:text;background-clip:text;color:transparent}
.hero p{color:#9aa4b2;margin-top:14px;font-size:18px}.btn{display:inline-block;margin-top:26px;padding:12px 26px;border-radius:10px;background:#3b82f6;color:#fff;text-decoration:none}
.wrap{max-width:1000px;margin:0 auto;padding:60px 24px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px}
.card{background:#141a22;border:1px solid #232b36;border-radius:14px;padding:22px}.card h3{color:#7fb0ff;margin-bottom:8px}footer{text-align:center;color:#6b7280;padding:40px}</style></head>
<body><div class=hero><h1>${T}</h1><p>Built for people who love tech — clean, fast, easy to navigate.</p><a class=btn href="#f">Explore</a></div>
<div class=wrap id=f><div class=grid>
<div class=card><h3>⚡ Fast</h3><p>Snappy and modern, zero clutter.</p></div>
<div class=card><h3>🎨 Sleek</h3><p>Dark, tech-forward aesthetic.</p></div>
<div class=card><h3>🧭 Easy</h3><p>Everything one click away.</p></div></div></div>
<footer>${T} · starter template</footer></body></html>`;
  return "data:text/html;charset=utf-8," + encodeURIComponent(html);
}

const HELP = `I control your browser (Free mode — pattern-based, no API). Try:
NAVIGATE  open pinterest · google.com · reddit
SEARCH    search cute cats · open youtube and search lofi · images of neon city · videos of cats · buy usb-c hub · map of Tokyo · wiki quantum · define entropy · weather Denver
PAGE      read · click 7 · click Sign in · type me@x.com into email · submit · scroll down · back · reload · list tabs
FORMS     fill name=John, email=john@x.com, message: hello
BUILD     build a landing page for my PC-building business   (a template — for real design, ask Claude directly)
CHAIN     open youtube then search lofi then scroll down
Sensitive sites ask before acting; adult sites are blocked. Say "help" anytime.`;

async function interpret(text) {
  const t = text.trim(), l = t.toLowerCase(); let m;
  if (/^(help|\?|what can you do|commands)\b/.test(l)) return { text: HELP, els: true };

  // navigation
  if (/^scroll( down)?$|^down$/.test(l)) { await exec("scroll", { direction: "down" }); return { text: "Scrolled down." }; }
  if (/^scroll up$|^up$/.test(l)) { await exec("scroll", { direction: "up" }); return { text: "Scrolled up." }; }
  if (/^(go )?back$/.test(l)) { const r = await exec("back", {}); return { text: r.ok ? "Went back." : "🚫 " + r.error }; }
  if (/^(go )?forward$/.test(l)) { const r = await exec("forward", {}); return { text: r.ok ? "Went forward." : "🚫 " + r.error }; }
  if (/^(reload|refresh)( (the|this) page)?$/.test(l)) { await exec("reload", {}); return { text: "Reloaded." }; }
  if (/^close( this)?( tab)?$/.test(l)) { const [tab] = await chrome.tabs.query({ active: true, currentWindow: true }); await exec("close_tab", { tabId: tab.id }); return { text: "Closed tab." }; }
  if (/^(new tab|open( a)? new tab)$/.test(l)) { await exec("open_tab", { url: "about:blank" }); return { text: "New tab." }; }
  if (/^(list )?tabs$/.test(l)) { const r = await exec("list_tabs", {}); return { text: r.ok ? r.tabs.map((x) => `• ${x.title || x.url}`).join("\n") : "🚫 " + r.error, els: true }; }

  // build a template page
  if ((m = t.match(/^(?:build|make|create|generate)\s+(?:me\s+)?(?:a|an)?\s*[\w ]*?(?:page|site|website|landing[\w ]*)\s+(?:for|about)\s+(.+)/i))) {
    const url = buildPage(m[1]); const r = await exec("open_tab", { url });
    return { text: r.ok ? `Built a starter page for “${m[1]}”. (This is a template — for a real custom design, ask Claude directly.)` : "🚫 " + r.error, blocked: !r.ok };
  }

  // site-search
  const known = (n) => SEARCH_URLS[n.toLowerCase().replace(/\.com$/, "")] || SITES[n.toLowerCase()];
  if ((m = t.match(/^(?:open\s+|go to\s+|on\s+)?([a-z0-9.-]+)\s+(?:and\s+)?search(?:\s+for)?\s+(.+)$/i)) && known(m[1])) { const r = await exec("open_tab", { url: siteSearchUrl(m[1], m[2]) }); return { text: r.ok ? `Searching ${m[1]} for “${m[2]}”` : "🚫 " + r.error, blocked: !r.ok }; }
  if ((m = t.match(/^search\s+([a-z0-9.-]+)\s+(?:for|:)\s+(.+)$/i)) && known(m[1])) { const r = await exec("open_tab", { url: siteSearchUrl(m[1], m[2]) }); return { text: r.ok ? `Searching ${m[1]} for “${m[2]}”` : "🚫 " + r.error, blocked: !r.ok }; }

  // intent shortcuts
  const iu = intentUrl(t); if (iu) { const r = await exec("open_tab", { url: iu }); return { text: r.ok ? "Opened." : "🚫 " + r.error, blocked: !r.ok }; }

  // open / go
  if ((m = l.match(/^(?:open|go to|goto|visit|launch)\s+(.+)/))) { const url = resolve(m[1]); const r = await exec("open_tab", { url }); return { text: r.ok ? "Opened " + url : "🚫 " + r.error, blocked: !r.ok }; }
  // generic search
  if ((m = l.match(/^(?:search|google|find)\s+(.+)/))) { const r = await exec("open_tab", { url: "https://www.google.com/search?q=" + encodeURIComponent(m[1]) }); return { text: r.ok ? "Searched: " + m[1] : "🚫 " + r.error, blocked: !r.ok }; }

  // read
  if (l === "read" || /^(read|scan)( the)?( page)?$/.test(l) || /what.?s on/.test(l)) {
    const r = await exec("read_page", {}); if (!r.ok) return { text: "🚫 " + r.error, blocked: true };
    lastEls = r.page.elements;
    const list = lastEls.slice(0, 60).map((x) => `#${x.ref} <${x.tag}${x.type ? " " + x.type : ""}> ${x.label || x.text || x.placeholder || x.name || x.href}`.trim()).join("\n");
    return { text: `${r.page.url}\n${r.page.sensitive ? "⚠ sensitive · " : ""}${r.page.elements.length} elements:\n${list}`, els: true };
  }

  // form fill
  if ((m = t.match(/^fill\s+(?:(?:in|out)\s+)?(?:the\s+)?(?:form\s+)?(?:with\s+)?(.+)$/i))) {
    const pairs = m[1].split(/[,;]|\band\b/i).map((s) => s.trim()).filter(Boolean).map((s) => { const mm = s.match(/^(.+?)\s*[:=]\s*(.+)$/); return mm ? { k: mm[1].trim(), v: mm[2].trim() } : null; }).filter(Boolean);
    if (!pairs.length) return { text: `Say e.g. "fill name=John, email=john@x.com, message: hello".` };
    await ensureRead();
    const done = [];
    for (const { k, v } of pairs) { const tgt = findField(k); if (!tgt) { done.push(`• ${k}: no matching field`); continue; } const r = await exec("type", { ...tgt, text: v }); done.push(`• ${k} → ${r.ok ? "filled" : r.error}`); }
    return { text: "Form fill:\n" + done.join("\n"), els: true };
  }

  // type X into Y
  if ((m = t.match(/^type\s+(.+?)\s+(?:into|in)\s+(.+)$/i))) { await ensureRead(); const tgt = findEl(m[2]); if (!tgt) return { text: `Read the page first, then e.g. "type ${m[1]} into email".` }; const r = await exec("type", { ...tgt, text: m[1] }); return { text: r.ok ? `Typed into ${m[2]}` : "🚫 " + r.error, blocked: !r.ok }; }
  // click
  if ((m = l.match(/^click\s+(.+)/))) { await ensureRead(); const tgt = findEl(m[1]); if (!tgt) return { text: `Couldn't find "${m[1]}". Say "read" first, then click by number or visible text.` }; const r = await exec("click", tgt); return { text: r.ok ? `Clicked ${m[1]}` : "🚫 " + r.error, blocked: !r.ok }; }
  // submit
  if (/^submit\b/.test(l)) { const r = await exec("submit", {}); return { text: r.ok ? "Submitted." : "🚫 " + r.error, blocked: !r.ok }; }

  // fallback → site or search
  const url = resolve(t); const r = await exec("open_tab", { url }); return { text: r.ok ? "Opened " + url : "🚫 " + r.error, blocked: !r.ok };
}

// ── Mode: Free (keyless) vs Claude API (bridge) — default Free ──────────────
let bridgeUp = false, freeMode = true;
chrome.storage.local.get("freeMode").then((v) => { if (typeof v.freeMode === "boolean") freeMode = v.freeMode; updateMode(); });
function updateMode() {
  document.getElementById("mFree").classList.toggle("active", freeMode);
  document.getElementById("mApi").classList.toggle("active", !freeMode);
  if (freeMode) modeEl.innerHTML = '<span class="dot b"></span>Free mode — no API key needed';
  else modeEl.innerHTML = bridgeUp ? '<span class="dot g"></span>Claude API — bridge connected' : '<span class="dot" style="background:#b3261e"></span>Claude API — start the bridge (node server.js) or add a key';
  document.getElementById("apiHelp").style.display = (!freeMode && !bridgeUp) ? "block" : "none";
}
async function checkMode() { try { const r = await (await fetch(BRIDGE + "/log")).json(); bridgeUp = !!r.connected; } catch { bridgeUp = false; } updateMode(); }
setInterval(checkMode, 3000); checkMode();
document.getElementById("mFree").onclick = () => { freeMode = true; chrome.storage.local.set({ freeMode: true }); updateMode(); addMsg("sys", "🔵 Free mode — command interpreter (no API)."); };
document.getElementById("mApi").onclick = () => { freeMode = false; chrome.storage.local.set({ freeMode: false }); updateMode(); addMsg("sys", "🟢 Claude API mode — needs the bridge running with your API key."); };

async function runViaBridge(text) {
  let before = 0; try { before = (await (await fetch(BRIDGE + "/log")).json()).log.length; } catch {}
  await fetch(BRIDGE + "/task", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ task: text }) });
  const div = addMsg("ai", "…thinking…", "els");
  for (let i = 0; i < 200; i++) { await new Promise((r) => setTimeout(r, 800)); let r; try { r = await (await fetch(BRIDGE + "/log")).json(); } catch { break; } div.textContent = r.log.slice(before).join("\n") || "…"; logEl.scrollTop = logEl.scrollHeight; if (!r.running) break; }
}

document.getElementById("f").addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = inp.value.trim(); if (!text) return;
  inp.value = ""; addMsg("me", text);
  if (!freeMode) {
    if (!bridgeUp) return void addMsg("sys", "🟢 Claude API mode is on but the bridge isn’t running. Start it (node server.js with your API key), or switch to 🔵 Free mode.");
    return runViaBridge(text);
  }
  // chain steps on "then" / "and then" / ";"
  const steps = text.split(/\s+(?:and then|then)\s+|\s*;\s*/i).map((s) => s.trim()).filter(Boolean);
  for (const step of steps) { const r = await interpret(step); addMsg("ai", r.text, r.els ? "els" : r.blocked ? "blocked" : ""); if (r.blocked) break; }
});
document.getElementById("policy").onclick = () => chrome.runtime.openOptionsPage();
addMsg("sys", "🔵 Free mode (no API key). Type a command — say “help” for examples. Switch to 🟢 Claude API up top once you add a key.");
