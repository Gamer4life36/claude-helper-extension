const out = document.getElementById("out");
const statusEl = document.getElementById("status");
const $ = (id) => document.getElementById(id);
const show = (v) => (out.textContent = typeof v === "string" ? v : JSON.stringify(v, null, 2));
const send = (msg) => new Promise((res) => chrome.runtime.sendMessage(msg, res));

// ── Known sites for autocomplete (name → domain) ───────────────────────────
const SITES = [
  ["Pinterest","pinterest.com","📌"],["YouTube","youtube.com","▶️"],["Google","google.com","🔎"],
  ["Gmail","mail.google.com","✉️"],["Google Maps","maps.google.com","🗺️"],["Amazon","amazon.com","📦"],
  ["Facebook","facebook.com","👥"],["Instagram","instagram.com","📷"],["Reddit","reddit.com","👽"],
  ["X (Twitter)","x.com","✖️"],["TikTok","tiktok.com","🎵"],["Netflix","netflix.com","🎬"],
  ["Wikipedia","wikipedia.org","📚"],["eBay","ebay.com","🏷️"],["Etsy","etsy.com","🧶"],
  ["Walmart","walmart.com","🛒"],["Target","target.com","🎯"],["Best Buy","bestbuy.com","💻"],
  ["Twitch","twitch.tv","🎮"],["LinkedIn","linkedin.com","💼"],["Spotify","open.spotify.com","🎧"],
  ["GitHub","github.com","🐙"],["Discord","discord.com","💬"],["WhatsApp","web.whatsapp.com","🟢"],
  ["Yahoo","yahoo.com","🟣"],["Yahoo Mail","mail.yahoo.com","📧"],["ChatGPT","chatgpt.com","🤖"],
  ["Claude","claude.ai","🟠"],["IMDb","imdb.com","🎞️"],["Weather","weather.com","☀️"],
  ["CNN","cnn.com","📰"],["Craigslist","craigslist.org","📋"],["Steam","store.steampowered.com","🎮"],
  ["PayPal","paypal.com","💳"],["Nexus Mods","nexusmods.com","🧩"]
];

let active = -1, matches = [];
const box = $("suggest"), input = $("url");

function looksLikeUrl(s) { return /^https?:\/\//i.test(s) || /^[a-z0-9-]+(\.[a-z0-9-]+)+(\/\S*)?$/i.test(s); }
function toUrl(s) { return /^https?:\/\//i.test(s) ? s : "https://" + s; }
function googleSearch(q) { return "https://www.google.com/search?q=" + encodeURIComponent(q); }

// Resolve typed text → a URL (site match → domain, url-like → https, else → search)
function resolve(raw) {
  const s = (raw || "").trim();
  if (!s) return null;
  const hit = SITES.find(([n, d]) => n.toLowerCase() === s.toLowerCase() || d === s.toLowerCase())
           || SITES.find(([n, d]) => n.toLowerCase().startsWith(s.toLowerCase()) || d.startsWith(s.toLowerCase()));
  if (hit && !s.includes(" ") && !looksLikeUrl(s)) return "https://" + hit[1];
  if (looksLikeUrl(s)) return toUrl(s);
  return googleSearch(s);
}

function renderSuggest(q) {
  const s = q.trim().toLowerCase();
  matches = [];
  if (s && !looksLikeUrl(s)) {
    matches = SITES.filter(([n, d]) => n.toLowerCase().includes(s) || d.includes(s)).slice(0, 7);
  }
  const rows = matches.map(([n, d, f], i) =>
    `<div class="sg${i === active ? " active" : ""}" data-url="https://${d}"><span class="fav">${f}</span><span class="name">${n}</span><span class="dom">${d}</span></div>`);
  if (s && !matches.some(([n]) => n.toLowerCase() === s)) {
    rows.push(`<div class="sg${active === matches.length ? " active" : ""}" data-url="${looksLikeUrl(s) ? toUrl(s) : googleSearch(q)}"><span class="fav">${looksLikeUrl(s) ? "🌐" : "🔎"}</span><span class="name">${looksLikeUrl(s) ? "Go to " + q : "Search Google for “" + q + "”"}</span></div>`);
  }
  box.innerHTML = rows.join("");
  box.style.display = rows.length ? "block" : "none";
  box.querySelectorAll(".sg").forEach((el) => (el.onclick = () => openUrl(el.dataset.url)));
}

async function openUrl(url) {
  if (!url) return;
  box.style.display = "none";
  const r = await send({ type: "OPEN_TAB", url });
  show(r.ok ? "Opened: " + (r.url || url) : "🚫 " + (r.error || "blocked"));
}

input.addEventListener("input", () => { active = -1; renderSuggest(input.value); });
input.addEventListener("keydown", (e) => {
  const items = box.querySelectorAll(".sg");
  if (e.key === "ArrowDown") { active = Math.min(active + 1, items.length - 1); renderSuggest(input.value); e.preventDefault(); }
  else if (e.key === "ArrowUp") { active = Math.max(active - 1, -1); renderSuggest(input.value); e.preventDefault(); }
  else if (e.key === "Enter") {
    if (active >= 0 && items[active]) openUrl(items[active].dataset.url);
    else openUrl(resolve(input.value));
  } else if (e.key === "Escape") box.style.display = "none";
});
$("open").onclick = () => openUrl(resolve(input.value));
document.addEventListener("click", (e) => { if (!$("searchWrap").contains(e.target)) box.style.display = "none"; });

// ── existing controls ──────────────────────────────────────────────────────
async function refreshStatus() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const { policy } = await send({ type: "GET_POLICY" });
  const host = (() => { try { return new URL(tab.url).hostname.replace(/^www\./, ""); } catch { return ""; } })();
  const sensitive = (policy.confirmSites || []).some((s) => host === s.host || host.endsWith("." + s.host)) || /login|bank|pay|checkout|account|auth|billing/i.test(tab.url || "");
  const forbidden = (policy.forbiddenDomains || []).some((d) => host === d || host.endsWith("." + d)) || (policy.forbiddenKeywords || []).some((k) => host.includes(k));
  statusEl.innerHTML = `Active: <b>${host || tab.url}</b> — ` +
    (forbidden ? `<span class="warn">forbidden → blocked</span>` : sensitive ? `<span class="warn">sensitive → confirm</span>` : `<span class="safe">normal</span>`);
}
refreshStatus();
$("policy").onclick = () => chrome.runtime.openOptionsPage();
$("tabs").onclick = async () => show(await send({ type: "LIST_TABS" }));
$("read").onclick = async () => {
  const r = await send({ type: "PAGE_ACTION", action: { kind: "read" } });
  if (r.ok) show(`URL: ${r.page.url}\nSensitive: ${r.page.sensitive} · Forbidden: ${r.page.forbidden}\n\n` +
    r.page.elements.map((x) => `#${x.ref} <${x.tag}${x.type ? " " + x.type : ""}> ${x.text || x.placeholder || x.name || x.href}`.trim()).join("\n"));
  else show(r);
};
function refField() { const v = $("ref").value.trim(); return /^\d+$/.test(v) ? { ref: v } : { selector: v }; }
$("click").onclick = async () => show(await send({ type: "PAGE_ACTION", action: { kind: "click", ...refField() } }));
$("submit").onclick = async () => show(await send({ type: "PAGE_ACTION", action: { kind: "submit", ...refField() } }));
$("type").onclick = async () => show(await send({ type: "PAGE_ACTION", action: { kind: "type", ...refField(), text: $("text").value } }));
