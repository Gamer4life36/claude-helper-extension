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
  const inputs = lastEls.filter((x) => ["input", "textarea", "select"].includes(x.tag) && !["submit", "button", "checkbox", "radio", "password"].includes(x.type) && !x.isPassword);
  const best = inputs.map((x) => ({ x, sc: scoreEl(x, s, ["label", "name", "placeholder"]) })).filter((o) => o.sc > 0).sort((a, b) => b.sc - a.sc)[0];
  return best ? { ref: best.x.ref } : null;
}

// ── saved profile (for one-word autofill) ──────────────────────────────────
const FIELD_SYNS = {
  name: ["name", "full name", "your name", "fullname"], first: ["first name", "first", "given name", "fname", "firstname"],
  last: ["last name", "last", "surname", "family name", "lname", "lastname"], email: ["email", "e-mail", "email address"],
  phone: ["phone", "mobile", "telephone", "phone number", "tel", "cell"], address: ["address", "street", "address line 1", "street address"],
  address2: ["address line 2", "apt", "apartment", "suite", "unit"], city: ["city", "town"],
  state: ["state", "province", "region"], zip: ["zip", "postal", "postcode", "zip code", "postal code"],
  country: ["country"], company: ["company", "organization", "organisation", "business"], message: ["message", "comment", "comments", "your message", "note"]
};
function normKey(k) { k = k.toLowerCase().trim(); for (const [c, syns] of Object.entries(FIELD_SYNS)) { if (c === k || syns.includes(k)) return c; } return k; }
function parsePairs(str) {
  return str.split(/[,;]|\band\b/i).map((s) => s.trim()).filter(Boolean)
    .map((s) => { const mm = s.match(/^(.+?)\s*[:=]\s*(.+)$/); return mm ? { k: mm[1].trim(), v: mm[2].trim() } : null; }).filter(Boolean);
}
async function autofillProfile(prof) {
  await ensureRead(); const done = []; const used = new Set();
  for (const [key, value] of Object.entries(prof)) {
    const syns = FIELD_SYNS[key] || [key]; let filled = false;
    for (const syn of syns) { const tgt = findField(syn); if (tgt && !used.has(tgt.ref)) { const r = await exec("type", { ...tgt, text: value }); if (r.ok) { used.add(tgt.ref); done.push(`• ${key} → filled`); filled = true; break; } } }
    if (!filled) done.push(`• ${key}: no field`);
  }
  return done;
}
const clickByText = async (label) => { await ensureRead(); const tgt = findEl(label); if (!tgt) return { ok: false, error: `no “${label}” control found — try "read" first` }; return exec("click", tgt); };

// intent → URL
const enc = encodeURIComponent;
function intentUrl(t) {
  let m;
  if ((m = t.match(/^(?:images?|pictures?|pics?)\s+of\s+(.+)/i))) return "https://www.google.com/search?tbm=isch&q=" + enc(m[1]);
  if ((m = t.match(/^(?:videos?|watch|play)\s+(?:of\s+)?(.+)/i))) return SEARCH_URLS.youtube + enc(m[1]);
  if ((m = t.match(/^directions?\s+from\s+(.+?)\s+to\s+(.+)$/i))) return "https://www.google.com/maps/dir/" + enc(m[1]) + "/" + enc(m[2]);
  if ((m = t.match(/^(?:maps?|directions?(?:\s+to)?|navigate to|where is)\s+(.+)/i))) return "https://www.google.com/maps/search/" + enc(m[1]);
  if ((m = t.match(/^(?:wiki|wikipedia)\s+(.+)/i))) return SEARCH_URLS.wikipedia + enc(m[1]);
  if ((m = t.match(/^(?:define|definition of|meaning of)\s+(.+)/i))) return "https://www.google.com/search?q=" + enc("define " + m[1]);
  if ((m = t.match(/^translate\s+(.+)/i))) return "https://translate.google.com/?sl=auto&tl=en&text=" + enc(m[1]);
  if ((m = t.match(/^weather(?:\s+(?:in|for))?\s+(.+)/i))) return "https://www.google.com/search?q=" + enc("weather " + m[1]);
  if ((m = t.match(/^(?:buy|shop(?:\s+for)?|order|purchase)\s+(.+)/i))) return SEARCH_URLS.amazon + enc(m[1]);
  if ((m = t.match(/^news(?:\s+(?:about|on))?\s+(.+)/i))) return "https://news.google.com/search?q=" + enc(m[1]);
  if ((m = t.match(/^(?:tweet|post to (?:twitter|x))\s+(.+)/i))) return "https://twitter.com/intent/tweet?text=" + enc(m[1]);
  if ((m = t.match(/^(?:add (?:a )?(?:calendar )?event|schedule|new event|remind me to)\s+(.+)/i))) return "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + enc(m[1]);
  if ((m = t.match(/^(?:search (?:my )?(?:e-?mail|gmail|inbox)|find (?:e-?mails?|mail))\s+(?:for\s+|from\s+)?(.+)/i))) return "https://mail.google.com/mail/u/0/#search/" + enc(m[1]);
  if ((m = t.match(/^(?:stock|ticker|share price)\s+(?:of\s+|for\s+)?(.+)/i))) return "https://www.google.com/search?q=" + enc(m[1] + " stock");
  if ((m = t.match(/^flights?\s+(?:from\s+)?(.+?)\s+to\s+(.+)$/i))) return "https://www.google.com/travel/flights?q=" + enc("flights from " + m[1] + " to " + m[2]);
  if ((m = t.match(/^(?:showtimes?|movie times?)\s+(?:for\s+)?(.+)/i))) return "https://www.google.com/search?q=" + enc(m[1] + " showtimes");
  if ((m = t.match(/^recipe(?:s)?\s+(?:for\s+)?(.+)/i))) return "https://www.google.com/search?q=" + enc(m[1] + " recipe");
  return null;
}
function composeEmailUrl(to, sub, body) { return `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(to || "")}&su=${enc(sub || "")}&body=${enc(body || "")}`; }

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

const HELP = `Free mode — a smart pattern-based controller (no API). Try:
OPEN      open pinterest · google.com · open youtube, reddit, github (many at once)
SEARCH    search cute cats · open youtube and search lofi · images of neon city · videos of cats
          buy usb-c hub · map of Tokyo · directions from LA to Vegas · wiki quantum · define entropy
          weather Denver · translate hola · news about AI · stock AAPL · recipe carbonara · what is a qubit?
PAGE      read · click 7 · click the Sign in button · type me@x.com into email · submit · press enter
          scroll down · scroll to bottom · back · forward · reload · find "returns" on the page · list tabs
SHOP      add to cart · buy now · checkout   (acts on the current page; sensitive steps ask first)
FORMS     fill name=John, email=john@x.com, message: hello
PROFILE   set my info name=Mike, email=me@x.com, phone=555-1234   →  then just say:  fill my info
EMAIL     email jane@x.com about lunch saying are you free at noon?   (opens a Gmail draft — you send)
EVENTS    add event dentist friday 3pm · tweet hello world
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
  if (/^(scroll to |go to )?(the )?bottom$|^scroll bottom$/.test(l)) { await exec("scroll", { to: "bottom" }); return { text: "Scrolled to bottom." }; }
  if (/^(scroll to |go to )?(the )?top$|^scroll top$/.test(l)) { await exec("scroll", { to: "top" }); return { text: "Scrolled to top." }; }
  if (/^(press|hit)\s+enter$/.test(l)) { const r = await exec("submit", {}); return { text: r.ok ? "Submitted." : "🚫 " + r.error, blocked: !r.ok }; }

  // find text on the current page
  if ((m = t.match(/^(?:find|locate|highlight|jump to)\s+(.+?)\s+on\s+(?:this|the)\s+page$/i)) || (m = t.match(/^find on page\s+(.+)/i)) || (m = t.match(/^(?:find|highlight)\s+"([^"]+)"$/i))) {
    const r = await exec("find_text", { text: m[1].replace(/^["'“]|["'”]$/g, "").trim() }); return { text: r.ok ? `Found: “${r.text}”` : "🚫 " + r.error, blocked: !r.ok };
  }

  // common page buttons (shopping / auth) — clicked on the CURRENT page
  if (/^(add to cart|add to bag|add to basket|add this to (?:my )?cart)$/i.test(l)) { const r = await clickByText("add to cart"); return { text: r.ok ? "Clicked Add to cart." : "🚫 " + r.error, blocked: !r.ok }; }
  if (/^(buy now|buy it now)$/i.test(l)) { const r = await clickByText("buy now"); return { text: r.ok ? "Clicked Buy now (confirm if prompted)." : "🚫 " + r.error, blocked: !r.ok }; }
  if (/^(checkout|check out|proceed to checkout|place order)$/i.test(l)) { const r = await clickByText("checkout"); return { text: r.ok ? "Clicked Checkout (confirm if prompted)." : "🚫 " + r.error, blocked: !r.ok }; }
  if (/^(sign in|log ?in)$/i.test(l)) { const r = await clickByText("sign in"); return { text: r.ok ? "Clicked Sign in." : "🚫 " + r.error, blocked: !r.ok }; }

  // email compose → opens a Gmail draft (you review & send)
  if ((m = t.match(/^(?:email|e-?mail|write (?:an? )?email to|send (?:an? )?email to|compose (?:to|an email to))\s+(\S+@\S+|[\w .'-]+?)(?:\s+(?:about|re:?|subject:?|saying|that says|with subject)\s+(.+))?$/i))) {
    const to = m[1].trim(); let sub = (m[2] || "").trim(), body = "";
    const bm = sub.match(/^(.+?)\s+(?:saying|body:?|message:?)\s+(.+)$/i); if (bm) { sub = bm[1].trim(); body = bm[2].trim(); }
    const r = await exec("open_tab", { url: composeEmailUrl(to, sub, body) });
    return { text: r.ok ? `Opened a Gmail draft to ${to}${sub ? ` — “${sub}”` : ""}. Review and send it yourself.` : "🚫 " + r.error, blocked: !r.ok };
  }

  // save profile → "set my info name=Mike, email=..., phone=..."
  if ((m = t.match(/^(?:set|save|remember|update)\s+my\s+(?:info|profile|details|contact(?:\s+info)?)?\s*(?:to|:|=|with|as)?\s*(.+)$/i)) && /[:=]/.test(m[1])) {
    const pairs = parsePairs(m[1]); if (!pairs.length) return { text: 'Say e.g. "set my info name=Mike, email=me@x.com, phone=555-1234".' };
    const prof = (await chrome.storage.local.get("profile")).profile || {};
    for (const { k, v } of pairs) prof[normKey(k)] = v;
    await chrome.storage.local.set({ profile: prof });
    return { text: "Saved your profile: " + Object.keys(prof).join(", ") + '.\nNow say “fill my info” on any form. (Passwords & cards are never stored.)' };
  }
  // autofill from saved profile
  if (/^(?:fill|autofill|complete)\s+(?:this\s+)?(?:form\s+)?(?:with\s+)?my\s+(?:info|profile|details|contact(?:\s+info)?)$|^autofill$/i.test(l)) {
    const prof = (await chrome.storage.local.get("profile")).profile || {};
    if (!Object.keys(prof).length) return { text: 'No saved profile yet. First: "set my info name=Mike, email=me@x.com, phone=...".' };
    const done = await autofillProfile(prof);
    return { text: "Autofilled from your profile:\n" + done.join("\n"), els: true };
  }

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

  // open several at once: "open youtube, reddit, github"
  if ((m = l.match(/^open\s+(.+,.+)$/))) { const sites = m[1].split(/\s*,\s*/).map((s) => s.trim()).filter(Boolean); for (const s of sites) await exec("open_tab", { url: resolve(s) }); return { text: "Opened " + sites.length + " tabs: " + sites.join(", ") }; }
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
  if ((m = t.match(/^fill\s+(?:(?:in|out)\s+)?(?:the\s+)?(?:form\s+)?(?:with\s+)?(.+)$/i)) && /[:=]/.test(m[1])) {
    const pairs = parsePairs(m[1]);
    if (!pairs.length) return { text: `Say e.g. "fill name=John, email=john@x.com, message: hello".` };
    await ensureRead();
    const done = [];
    for (const { k, v } of pairs) { const tgt = findField(k); if (!tgt) { done.push(`• ${k}: no matching field`); continue; } const r = await exec("type", { ...tgt, text: v }); done.push(`• ${k} → ${r.ok ? "filled" : r.error}`); }
    return { text: "Form fill:\n" + done.join("\n"), els: true };
  }

  // type X into Y
  if ((m = t.match(/^type\s+(.+?)\s+(?:into|in)\s+(.+)$/i))) { await ensureRead(); const tgt = findEl(m[2]); if (!tgt) return { text: `Read the page first, then e.g. "type ${m[1]} into email".` }; const r = await exec("type", { ...tgt, text: m[1] }); return { text: r.ok ? `Typed into ${m[2]}` : "🚫 " + r.error, blocked: !r.ok }; }
  // click (strips "the"/"button"/"link", allows "click on")
  if ((m = l.match(/^click(?:\s+on)?\s+(.+)/))) { await ensureRead(); const q = m[1].replace(/^the\s+/, "").replace(/\s+(button|link|tab|icon|option)$/, "").trim(); const tgt = findEl(q); if (!tgt) return { text: `Couldn't find "${q}". Say "read" first, then click by number or visible text.` }; const r = await exec("click", tgt); return { text: r.ok ? `Clicked ${q}` : "🚫 " + r.error, blocked: !r.ok }; }
  // submit
  if (/^submit\b/.test(l)) { const r = await exec("submit", {}); return { text: r.ok ? "Submitted." : "🚫 " + r.error, blocked: !r.ok }; }

  // natural questions → Google
  if (/\?$/.test(t) || /^(what|who|when|where|why|how|is|are|can|does|do|should|which|will|whats|what's)\b/.test(l)) { const r = await exec("open_tab", { url: "https://www.google.com/search?q=" + enc(t) }); return { text: r.ok ? "Searched Google: " + t : "🚫 " + r.error, blocked: !r.ok }; }

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
