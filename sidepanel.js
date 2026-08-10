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
  imdb: "https://www.imdb.com/find/?q=", netflix: "https://www.netflix.com/search?q=", nexus: "https://www.nexusmods.com/search/?gsearch=",
  steam: "https://store.steampowered.com/search/?term="
};
// share a link to a social network (opens the official share dialog — you click Post)
const SHARE_URLS = {
  facebook: "https://www.facebook.com/sharer/sharer.php?u=", linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=",
  reddit: "https://www.reddit.com/submit?url=", twitter: "https://twitter.com/intent/tweet?url=", x: "https://twitter.com/intent/tweet?url="
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

// extractive summary — score sentences by keyword frequency + lead bias (no AI)
function summarize(text, n = 6) {
  const clean = text.replace(/\s+/g, " ").trim();
  const sentences = (clean.match(/[^.!?]+[.!?]+(?=\s|$)/g) || [clean]).filter((s) => s.trim().split(/\s+/).length >= 5);
  if (sentences.length <= n) return sentences.map((s) => s.trim());
  const stop = new Set("the a an and or but of to in on at for with is are was were be been by this that it as from your you we our their his her its not can will would should more most than then them they he she into out over about after before also just".split(" "));
  const freq = {}; for (const w of clean.toLowerCase().match(/[a-z']{3,}/g) || []) if (!stop.has(w)) freq[w] = (freq[w] || 0) + 1;
  const scored = sentences.map((s, i) => { const words = s.toLowerCase().match(/[a-z']{3,}/g) || []; let sc = words.reduce((a, w) => a + (freq[w] || 0), 0) / (words.length || 1); if (i < 3) sc *= 1.15; return { s: s.trim(), sc, i }; });
  return scored.sort((a, b) => b.sc - a.sc).slice(0, n).sort((a, b) => a.i - b.i).map((o) => o.s);
}
function readerPage(title, text) {
  const esc = (s) => s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));
  const paras = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean).map((p) => `<p>${esc(p)}</p>`).join("");
  const html = `<!doctype html><meta charset=utf-8><title>${esc(title)}</title><style>body{max-width:720px;margin:40px auto;padding:0 20px;font:18px/1.7 Georgia,serif;background:#faf9f6;color:#222}h1{font:700 30px/1.3 Segoe UI,Arial,sans-serif;margin-bottom:.6em}p{margin:0 0 1em}@media(prefers-color-scheme:dark){body{background:#16181d;color:#dcdcdc}}</style><h1>${esc(title)}</h1>${paras}`;
  return "data:text/html;charset=utf-8," + encodeURIComponent(html);
}
const LOGIN_URLS = {
  gmail: "https://accounts.google.com/", google: "https://accounts.google.com/", github: "https://github.com/login",
  facebook: "https://www.facebook.com/login", instagram: "https://www.instagram.com/accounts/login/",
  reddit: "https://www.reddit.com/login", twitter: "https://x.com/login", x: "https://x.com/login",
  amazon: "https://www.amazon.com/ap/signin", netflix: "https://www.netflix.com/login", linkedin: "https://www.linkedin.com/login",
  spotify: "https://accounts.spotify.com/en/login", discord: "https://discord.com/login", twitch: "https://www.twitch.tv/login",
  paypal: "https://www.paypal.com/signin", ebay: "https://signin.ebay.com/", nexus: "https://users.nexusmods.com/auth/sign_in"
};
// ── macros / saved workflows (professional repeatable automation) ───────────
const getMacros = async () => (await chrome.storage.local.get("macros")).macros || {};
const setMacros = async (mac) => chrome.storage.local.set({ macros: mac });

// ── Skills (agent-skills standard: name + description + steps) ──────────────
// Inspired by Anthropic Agent Skills & the open agent-skills standard: a skill
// is a named capability with a description (what + WHEN to trigger) and a body
// of steps. Explicit invoke: "use <name> <input>". Implicit: "do <request>"
// lets on-device AI pick the best skill by its description.
const getSkills = async () => (await chrome.storage.local.get("skills")).skills || {};
const setSkills = async (s) => chrome.storage.local.set({ skills: s });
// seed a starter skill once, so Skills work out of the box
chrome.storage.local.get("skillsSeeded").then(async ({ skillsSeeded }) => {
  if (skillsSeeded) return;
  const s = await getSkills();
  if (!s.gamepost) s.gamepost = { description: "announce or promote a Steam game on social media", steps: 'open steam and search $input then ask Write a short, punchy Facebook post announcing my Steam game "$input". Include [STORE LINK] and [RELEASE DATE] placeholders, a one-line hook, 2-3 relevant hashtags, and keep it under 80 words.' };
  await setSkills(s); await chrome.storage.local.set({ skillsSeeded: true });
});
async function runSkill(name, input, depth = 0) {
  const skills = await getSkills(); const sk = skills[name];
  if (!sk) return { text: `No skill “${name}”.` };
  if (depth > 4) return { text: "Skill nesting too deep — stopped.", blocked: true };
  const body = sk.steps.replace(/\$\{?(input|topic|query|q|x)\}?/gi, input || "");
  const steps = body.split(/\s+(?:and then|then)\s+|\s*;\s*/i).map((s) => s.trim()).filter(Boolean);
  addMsg("sys", `✳ skill “${name}”${input ? ` · “${input}”` : ""} (${steps.length} step${steps.length > 1 ? "s" : ""})`);
  for (const step of steps) {
    const r = await interpret(step, depth + 1);
    if (r.nano) { await runNano(r.nano); continue; }            // AI step inside a skill → on-device model
    addMsg("ai", r.text, r.els ? "els" : r.blocked ? "blocked" : "");
    if (r.blocked) return { text: `Skill “${name}” stopped — a step was blocked.`, blocked: true };
  }
  return { text: `✓ Skill “${name}” done.` };
}

// ── On-device AI: Chrome built-in Gemini Nano (Prompt/Summarizer API) ───────
// Local, free, offline after a one-time model download. Needs Chrome 138+ and
// capable hardware. Everything degrades gracefully when unavailable.
let _lm = null;
const nanoPresent = () => typeof LanguageModel !== "undefined";
async function nanoAvail() { try { return nanoPresent() ? await LanguageModel.availability() : "unavailable"; } catch { return "unavailable"; } }
async function nanoReady() { const a = await nanoAvail(); return a === "available" || a === "readily-available"; }
async function nanoSession(onProg) {
  if (_lm) return _lm;
  _lm = await LanguageModel.create({
    temperature: 0.7, topK: 3,
    initialPrompts: [{ role: "system", content: "You are Claude Companion, a concise, privacy-respecting browser assistant running on-device. Answer briefly and helpfully." }],
    monitor(mn) { mn.addEventListener("downloadprogress", (e) => onProg && onProg(e.loaded)); }
  });
  return _lm;
}
async function nanoAsk(prompt, onProg) { const s = await nanoSession(onProg); return (await s.prompt(prompt)).trim(); }
async function nanoSummarize(text, onProg) {
  if (typeof Summarizer !== "undefined") {
    try {
      const a = await Summarizer.availability();
      if (a !== "unavailable") { const sm = await Summarizer.create({ type: "key-points", format: "markdown", length: "medium", monitor(mn) { mn.addEventListener("downloadprogress", (e) => onProg && onProg(e.loaded)); } }); const out = await sm.summarize(text.slice(0, 12000)); try { sm.destroy(); } catch {} return out; }
    } catch {}
  }
  return nanoAsk("Summarize the following page content in 5 concise bullet points:\n\n" + text.slice(0, 6000), onProg);
}
async function nanoPickSkill(request, skills) {
  const list = Object.entries(skills).map(([n, s]) => `- ${n}: ${s.description}`).join("\n");
  const ans = (await nanoAsk(`Route the request to ONE browser skill or none.\nSkills:\n${list}\n\nRequest: "${request}"\n\nReply with ONLY the matching skill name, or "none".`)).toLowerCase().replace(/[^a-z0-9-]/g, "");
  return skills[ans] ? ans : null;
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

const HELP = `Free mode — a smart pattern-based controller (no API). Try:
OPEN      open pinterest · google.com · open youtube, reddit, github (many at once)
SEARCH    search cute cats · open youtube and search lofi · images of neon city · videos of cats
          buy usb-c hub · map of Tokyo · directions from LA to Vegas · wiki quantum · define entropy
          weather Denver · translate hola · news about AI · stock AAPL · recipe carbonara · what is a qubit?
PAGE      read · click the Sign in button · type me@x.com into email · submit · press enter
          scroll to bottom · back · forward · reload · find "returns" on the page · list tabs
READING   summarize · reader view · read aloud / stop reading · translate this page
          word count · list links · extract emails · extract prices · copy url · copy page text
VIEW      dark mode · zoom in · zoom out · reset zoom
SHOP      add to cart · buy now · checkout   (acts on the current page; sensitive steps ask first)
FORMS     fill name=John, email=john@x.com, message: hello
PROFILE   set my info name=Mike, email=me@x.com, phone=555-1234   →  then just say:  fill my info
LOGIN     log into github   (opens the site's real login; passwords never entered)
EMAIL     email jane@x.com about lunch saying are you free at noon?   (opens a Gmail draft — you send)
EVENTS    add event dentist friday 3pm · tweet hello world
BUILD     build a landing page for my PC-building business   (a template — for real design, ask Claude directly)
CHAIN     open youtube then search lofi then scroll down
MACROS    save macro standup = open github then open gmail then open calendar
          run standup · macros · delete macro standup     (teach a routine once, replay it forever)
AI        ask what's a good name for a tech blog     (on-device Gemini Nano — local & free, Chrome 138+)
          switch to 🧠 On-device AI up top for plain-English chat + smarter "summarize"
SHARE     share to facebook https://store.steampowered.com/app/…   (opens the share dialog — you click Post)
          also: share this page to reddit · share <url> to linkedin/x
SKILLS    skill new research: gather info on a topic => open google and search $input then open youtube and search $input
          use research neon cities   ·   do gather info on quantum computing   ·   skills   ·   skill delete research
Sensitive sites ask before acting; adult sites are blocked. Say "help" anytime.`;

async function interpret(text, depth = 0, opts = {}) {
  const t = text.trim(), l = t.toLowerCase(); let m;
  if (/^(help|\?|what can you do|commands)\b/.test(l)) return { text: HELP, els: true };

  // on-device AI chat (explicit) — the submit handler routes this to Gemini Nano
  if ((m = t.match(/^(?:ask|chat|hey companion|hey claude)\s+(.+)/i))) return { nano: m[1] };

  // ── skills (agent-skills standard: name + description + steps) ──
  if (/^(skills|list skills)$/i.test(l)) { const s = await getSkills(); const keys = Object.keys(s); return { text: keys.length ? "🧩 Skills:\n" + keys.map((k) => `• ${k} — ${s[k].description}`).join("\n") : 'No skills yet. Create one, e.g.:\n  skill new research: gather info on a topic => open google and search $input then open youtube and search $input', els: true }; }
  if ((m = t.match(/^skill\s+(?:new|add|create)\s+([\w-]+)\s*:\s*(.+?)\s*=>\s*(.+)$/i))) { const s = await getSkills(); s[m[1].toLowerCase()] = { description: m[2].trim(), steps: m[3].trim() }; await setSkills(s); return { text: `🧩 Saved skill “${m[1]}”. Run it:  use ${m[1]} <input>${nanoPresent() ? `   — or implicitly:  do <request>` : ""}` }; }
  if ((m = t.match(/^skill\s+(?:show|view)\s+([\w-]+)$/i))) { const s = await getSkills(); const sk = s[m[1].toLowerCase()]; return { text: sk ? `🧩 ${m[1]}\nwhen: ${sk.description}\nsteps: ${sk.steps}` : `No skill “${m[1]}”.` }; }
  if ((m = t.match(/^skill\s+(?:delete|remove|forget)\s+([\w-]+)$/i))) { const s = await getSkills(); const k = m[1].toLowerCase(); if (!s[k]) return { text: `No skill “${m[1]}”.` }; delete s[k]; await setSkills(s); return { text: `🗑 Deleted skill “${m[1]}”.` }; }
  if ((m = t.match(/^(?:use|@|\/)\s*([\w-]+)(?:\s+(.+))?$/i)) && (await getSkills())[m[1].toLowerCase()]) return runSkill(m[1].toLowerCase(), (m[2] || "").trim(), depth);
  if ((m = t.match(/^do\s+(.+)/i))) {
    const skills = await getSkills(); if (!Object.keys(skills).length) return { text: 'No skills yet. Create one with "skill new …".' };
    if (!(await nanoReady())) return { text: `🧠 On-device AI isn’t ready, so I can’t auto-pick a skill. Invoke one directly:  use <name> <input>.\nYour skills: ${Object.keys(skills).join(", ")}` };
    const pick = await nanoPickSkill(m[1], skills); if (!pick) return { text: `No skill matched “${m[1]}”. Your skills: ${Object.keys(skills).join(", ")}` };
    return runSkill(pick, m[1], depth);
  }

  // ── macros / saved workflows ──
  if ((m = t.match(/^(?:save|teach|create|define)\s+macro\s+([\w-]+)\s*(?:=|:|as)\s*(.+)$/i))) {
    const mac = await getMacros(); mac[m[1].toLowerCase()] = m[2].trim(); await setMacros(mac);
    return { text: `💾 Saved macro “${m[1]}”. Run it anytime with:  run ${m[1]}` };
  }
  if (/^(list )?macros$/i.test(l)) { const mac = await getMacros(); const keys = Object.keys(mac); return { text: keys.length ? "Saved macros:\n" + keys.map((k) => `• ${k} = ${mac[k]}`).join("\n") : "No macros yet. Save one, e.g.:\n  save macro standup = open github then open gmail then open calendar", els: true }; }
  if ((m = t.match(/^(?:delete|remove|forget)\s+macro\s+([\w-]+)$/i))) { const mac = await getMacros(); const k = m[1].toLowerCase(); if (!mac[k]) return { text: `No macro “${m[1]}”.` }; delete mac[k]; await setMacros(mac); return { text: `🗑 Deleted macro “${m[1]}”.` }; }
  if ((m = t.match(/^(?:run|play|macro)\s+([\w-]+)$/i))) {
    const mac = await getMacros(); const body = mac[m[1].toLowerCase()];
    if (!body) return { text: `No macro “${m[1]}”. See yours with:  macros` };
    if (depth > 4) return { text: "Macro nesting too deep — stopped." , blocked: true };
    const steps = body.split(/\s+(?:and then|then)\s+|\s*;\s*/i).map((s) => s.trim()).filter(Boolean);
    addMsg("sys", `▶ running macro “${m[1]}” (${steps.length} step${steps.length > 1 ? "s" : ""})`);
    for (const step of steps) { const r = await interpret(step, depth + 1); addMsg("ai", r.text, r.els ? "els" : r.blocked ? "blocked" : ""); if (r.blocked) return { text: `Macro “${m[1]}” stopped — a step was blocked.`, blocked: true }; }
    return { text: `✓ Macro “${m[1]}” done.` };
  }

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

  // translate the current page
  if (/^translate (this|the) page$|^translate page$/i.test(l)) { const [tab] = await chrome.tabs.query({ active: true, currentWindow: true }); const u = tab?.url || ""; if (!/^https?:/.test(u)) return { text: "Open a normal web page first, then say “translate this page”." }; await exec("open_tab", { url: "https://translate.google.com/translate?sl=auto&tl=en&u=" + enc(u) }); return { text: "Opened a translated view of this page." }; }

  // summarize — abstractive via on-device AI when ready, else extractive fallback
  if (/^(summari[sz]e|summary|tl;?dr|key points|main points)( (this|the) (page|article)| it)?$/i.test(l)) {
    const r = await exec("extract", {}); if (!r.ok) return { text: "🚫 " + r.error, blocked: true };
    if ((r.text || "").length < 40) return { text: "Couldn't find readable article text on this page." };
    if (await nanoReady()) { try { const out = await nanoSummarize(r.text); if (out) return { text: `🧠 ${r.title}\n\n${out}` }; } catch {} }
    const pts = summarize(r.text, 6); if (!pts.length) return { text: "Couldn't find readable article text on this page." };
    return { text: `📄 ${r.title}\n\n• ${pts.join("\n• ")}\n\n(Extractive summary. Switch to 🧠 On-device AI for a smarter, abstractive summary — free & local.)` };
  }
  // reader view
  if (/^(reader|reader view|read this|clean view|declutter|simplify)( (this|the) page)?$/i.test(l)) {
    const r = await exec("extract", {}); if (!r.ok) return { text: "🚫 " + r.error, blocked: true };
    if ((r.text || "").length < 40) return { text: "Not enough article text here for a reader view." };
    await exec("open_tab", { url: readerPage(r.title, r.text) }); return { text: "Opened a clean, distraction-free reader view." };
  }
  // read aloud (local text-to-speech)
  if (/^(read (this )?(aloud|to me)|speak|say this|start reading)$/i.test(l)) { const r = await exec("speak", {}); return { text: r.ok ? "🔊 Reading the page aloud… say “stop reading” to stop." : "🚫 " + r.error, blocked: !r.ok }; }
  if (/^(stop( reading| speaking)?|quiet|shush|be quiet)$/i.test(l)) { await exec("stopspeak", {}); return { text: "Stopped reading." }; }

  // links / emails / prices
  if (/^(list |show |get )?links$/i.test(l)) { const r = await exec("links", {}); if (!r.ok) return { text: "🚫 " + r.error, blocked: true }; const list = r.links.slice(0, 60).map((x) => `• ${x.text || x.href}\n  ${x.href}`).join("\n"); return { text: `${r.links.length} links:\n${list}`, els: true }; }
  if (/^(extract |find |get |list )?e-?mails?$/i.test(l)) { const r = await exec("extract", {}); if (!r.ok) return { text: "🚫 " + r.error, blocked: true }; const em = [...new Set(r.text.match(/[\w.+-]+@[\w-]+\.[\w.-]+/g) || [])]; return { text: em.length ? `${em.length} emails:\n` + em.join("\n") : "No email addresses found on this page." }; }
  if (/^(extract |find |get |list )?prices?$/i.test(l)) { const r = await exec("extract", {}); if (!r.ok) return { text: "🚫 " + r.error, blocked: true }; const pr = [...new Set(r.text.match(/[$£€]\s?\d[\d,]*(?:\.\d{2})?/g) || [])]; return { text: pr.length ? `${pr.length} prices:\n` + pr.join("  ·  ") : "No prices found on this page." }; }
  // word count / reading time
  if (/^(word count|reading time|how many words|how long)( (is )?(this|the) (page|article))?$/i.test(l)) {
    const r = await exec("extract", {}); if (!r.ok) return { text: "🚫 " + r.error, blocked: true };
    const words = (r.text.match(/\S+/g) || []).length, mins = Math.max(1, Math.round(words / 220));
    return { text: `📄 ${r.title}\n${words.toLocaleString()} words · ~${mins} min read` };
  }
  // dark mode / zoom / copy
  if (/^(dark|night)( mode)?$|^toggle dark( mode)?$/i.test(l)) { const r = await exec("darkmode", {}); return { text: r.ok ? "🌙 " + r.did + " (run again to toggle)." : "🚫 " + r.error }; }
  if (/^zoom in$/i.test(l)) { const r = await exec("zoom", { dir: "in" }); return { text: r.ok ? "🔍 " + r.did : "🚫 " + r.error }; }
  if (/^zoom out$/i.test(l)) { const r = await exec("zoom", { dir: "out" }); return { text: r.ok ? "🔍 " + r.did : "🚫 " + r.error }; }
  if (/^(reset zoom|zoom reset|actual size)$/i.test(l)) { const r = await exec("zoom", { dir: "reset" }); return { text: r.ok ? "🔍 " + r.did : "🚫 " + r.error }; }
  if (/^copy (this )?(url|link|address)$/i.test(l)) { const r = await exec("copy", {}); return { text: r.ok ? "📋 Copied the page URL." : "🚫 " + r.error }; }
  if (/^copy (the )?(page )?text$/i.test(l)) { const r = await exec("extract", {}); if (!r.ok) return { text: "🚫 " + r.error }; const c = await exec("copy", { text: r.text.slice(0, 100000) }); return { text: c.ok ? "📋 Copied the page text." : "🚫 " + c.error }; }

  // per-site login shortcuts
  if ((m = t.match(/^(?:log ?in(?:to| to)?|sign ?in(?:to| to)?)\s+(.+)$/i))) {
    const site = m[1].trim().toLowerCase().replace(/\.com$/, ""); const url = LOGIN_URLS[site];
    if (url) { await exec("open_tab", { url }); const prof = (await chrome.storage.local.get("profile")).profile || {}; return { text: `Opened ${site} login.${prof.email ? ` Say “fill my info” to prefill your email — passwords are never entered.` : ""}` }; }
    const r = await exec("open_tab", { url: resolve(m[1]) }); return { text: r.ok ? `Opened ${m[1]} — click Sign in there (I never enter passwords).` : "🚫 " + r.error, blocked: !r.ok };
  }

  // share a link to a social network → opens that network's share dialog (you click Post)
  if ((m = t.match(/^(?:share|post)\s+(?:(https?:\/\/\S+)\s+)?(?:this(?:\s+page)?\s+)?(?:to|on)\s+(facebook|fb|linkedin|reddit|twitter|x)(?:\s+(https?:\/\/\S+))?$/i))) {
    const net = ({ fb: "facebook" }[m[2].toLowerCase()] || m[2].toLowerCase());
    let url = m[1] || m[3];
    if (!url) { const [tab] = await chrome.tabs.query({ active: true, currentWindow: true }); url = tab?.url || ""; }
    if (!/^https?:/.test(url)) return { text: `Give a link, e.g. “share to ${net} https://store.steampowered.com/app/…”.` };
    await exec("open_tab", { url: SHARE_URLS[net] + enc(url) });
    return { text: `Opened ${net}'s share dialog for that link. Add your caption and click Post — I never auto-publish.` };
  }

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

  // natural questions → Google (unless On-device AI mode wants them)
  if (!opts.noFallback && (/\?$/.test(t) || /^(what|who|when|where|why|how|is|are|can|does|do|should|which|will|whats|what's)\b/.test(l))) { const r = await exec("open_tab", { url: "https://www.google.com/search?q=" + enc(t) }); return { text: r.ok ? "Searched Google: " + t : "🚫 " + r.error, blocked: !r.ok }; }

  // On-device AI mode: let unrecognized text fall through to Gemini Nano
  if (opts.noFallback) return { fallthrough: true };
  // fallback → site or search
  const url = resolve(t); const r = await exec("open_tab", { url }); return { text: r.ok ? "Opened " + url : "🚫 " + r.error, blocked: !r.ok };
}

// ── Mode: 🔵 Free (patterns) · 🧠 On-device AI (Gemini Nano) · 🟢 Claude API ──
let bridgeUp = false, nanoState = "unknown", mode = "free";
chrome.storage.local.get("mode").then((v) => { if (["free", "nano", "api"].includes(v.mode)) mode = v.mode; updateMode(); refreshNano(); });
function setMode(mNew) { mode = mNew; chrome.storage.local.set({ mode: mNew }); updateMode(); }
async function refreshNano() { nanoState = await nanoAvail(); updateMode(); }
function updateMode() {
  const set = (id, on) => { const b = document.getElementById(id); if (b) b.classList.toggle("active", on); };
  set("mFree", mode === "free"); set("mNano", mode === "nano"); set("mApi", mode === "api");
  const ready = nanoState === "available" || nanoState === "readily-available";
  document.getElementById("apiHelp").style.display = (mode === "api" && !bridgeUp) ? "block" : "none";
  const nh = document.getElementById("nanoHelp"); if (nh) nh.style.display = (mode === "nano" && !ready) ? "block" : "none";
  if (mode === "free") modeEl.innerHTML = '<span class="dot b"></span>Free mode — pattern commands, no AI';
  else if (mode === "nano") modeEl.innerHTML = ready ? '<span class="dot g"></span>On-device AI ready — Gemini Nano, local & free'
    : (nanoState === "downloadable" || nanoState === "after-download") ? '<span class="dot" style="background:#e0a800"></span>On-device AI — model downloads on first use'
    : nanoState === "downloading" ? '<span class="dot" style="background:#e0a800"></span>On-device AI — downloading model…'
    : '<span class="dot" style="background:#b3261e"></span>On-device AI unavailable (needs Chrome 138+ & capable hardware)';
  else modeEl.innerHTML = bridgeUp ? '<span class="dot g"></span>Claude API — bridge connected' : '<span class="dot" style="background:#b3261e"></span>Claude API — start the bridge or add a key';
}
async function checkMode() { try { const r = await (await fetch(BRIDGE + "/log")).json(); bridgeUp = !!r.connected; } catch { bridgeUp = false; } updateMode(); }
setInterval(checkMode, 3000); checkMode();
document.getElementById("mFree").onclick = () => { setMode("free"); addMsg("sys", "🔵 Free mode — pattern commands (no AI)."); };
document.getElementById("mNano").onclick = async () => { setMode("nano"); await refreshNano(); addMsg("sys", "🧠 On-device AI — local Gemini Nano. Ask in plain English (commands still work). First use downloads the model once."); };
document.getElementById("mApi").onclick = () => { setMode("api"); addMsg("sys", "🟢 Claude API — needs the bridge running with your API key."); };

async function runNano(prompt) {
  const div = addMsg("ai", "🧠 thinking…");
  if (!nanoPresent()) { div.textContent = "🧠 On-device AI (Gemini Nano) needs Chrome 138+ on capable hardware. Use 🔵 Free or 🟢 Claude API instead."; div.className += " blocked"; return; }
  try { const ans = await nanoAsk(prompt, (frac) => { div.textContent = `🧠 downloading model… ${Math.round(frac * 100)}% (one-time)`; logEl.scrollTop = logEl.scrollHeight; }); div.textContent = ans; logEl.scrollTop = logEl.scrollHeight; }
  catch (e) { div.textContent = "🧠 on-device AI error: " + (e?.message || e); div.className += " blocked"; }
}
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
  if (mode === "api") {
    if (!bridgeUp) return void addMsg("sys", "🟢 Claude API mode is on but the bridge isn’t running. Start it (node server.js with your API key), or switch modes up top.");
    return runViaBridge(text);
  }
  // chain steps on "then" / "and then" / ";"
  const steps = text.split(/\s+(?:and then|then)\s+|\s*;\s*/i).map((s) => s.trim()).filter(Boolean);
  for (const step of steps) {
    const r = await interpret(step, 0, { noFallback: mode === "nano" });
    if (r.nano) { await runNano(r.nano); continue; }            // explicit "ask …" — any mode
    if (r.fallthrough) { await runNano(step); continue; }        // 🧠 mode: plain text → local AI
    addMsg("ai", r.text, r.els ? "els" : r.blocked ? "blocked" : "");
    if (r.blocked) break;
  }
});
document.getElementById("policy").onclick = () => chrome.runtime.openOptionsPage();
addMsg("sys", "🔵 Free mode. Type a command (say “help”). Up top: 🧠 On-device AI for plain-English chat (local, free), or 🟢 Claude API with your key.");
