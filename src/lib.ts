// Pure, DOM-free helpers extracted from sidepanel.ts so they can be unit-tested
// (Vitest) and reused. Behavior-identical to the originals; sidepanel.ts imports
// them back and esbuild re-bundles everything into js/sidepanel.js.
import * as chrono from "chrono-node";

export const SITES = {
  pinterest: "pinterest.com",
  youtube: "youtube.com",
  google: "google.com",
  gmail: "mail.google.com",
  maps: "maps.google.com",
  amazon: "amazon.com",
  facebook: "facebook.com",
  instagram: "instagram.com",
  reddit: "reddit.com",
  twitter: "x.com",
  x: "x.com",
  tiktok: "tiktok.com",
  netflix: "netflix.com",
  wikipedia: "wikipedia.org",
  ebay: "ebay.com",
  etsy: "etsy.com",
  walmart: "walmart.com",
  target: "target.com",
  twitch: "twitch.tv",
  linkedin: "linkedin.com",
  spotify: "open.spotify.com",
  github: "github.com",
  discord: "discord.com",
  whatsapp: "web.whatsapp.com",
  yahoo: "yahoo.com",
  chatgpt: "chatgpt.com",
  claude: "claude.ai",
  imdb: "imdb.com",
  steam: "store.steampowered.com",
  paypal: "paypal.com",
  nexus: "nexusmods.com",
};
export const SEARCH_URLS = {
  pinterest: "https://www.pinterest.com/search/pins/?q=",
  youtube: "https://www.youtube.com/results?search_query=",
  amazon: "https://www.amazon.com/s?k=",
  google: "https://www.google.com/search?q=",
  reddit: "https://www.reddit.com/search/?q=",
  ebay: "https://www.ebay.com/sch/i.html?_nkw=",
  etsy: "https://www.etsy.com/search?q=",
  github: "https://github.com/search?q=",
  wikipedia: "https://en.wikipedia.org/w/index.php?search=",
  twitter: "https://x.com/search?q=",
  x: "https://x.com/search?q=",
  walmart: "https://www.walmart.com/search?q=",
  target: "https://www.target.com/s?searchTerm=",
  spotify: "https://open.spotify.com/search/",
  imdb: "https://www.imdb.com/find/?q=",
  netflix: "https://www.netflix.com/search?q=",
  nexus: "https://www.nexusmods.com/search/?gsearch=",
  steam: "https://store.steampowered.com/search/?term=",
};
// share a link to a social network (opens the official share dialog — you click Post)
export const SHARE_URLS = {
  facebook: "https://www.facebook.com/sharer/sharer.php?u=",
  linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=",
  reddit: "https://www.reddit.com/submit?url=",
  twitter: "https://twitter.com/intent/tweet?url=",
  x: "https://twitter.com/intent/tweet?url=",
};
export function siteSearchUrl(site, q) {
  const k = site.toLowerCase().replace(/\.com$/, "");
  return SEARCH_URLS[k] ? SEARCH_URLS[k] + encodeURIComponent(q) : "https://www.google.com/search?q=" + encodeURIComponent(site + " " + q);
}
export const looksUrl = (s) => /^https?:\/\//i.test(s) || /^[a-z0-9-]+(\.[a-z0-9-]+)+(\/\S*)?$/i.test(s);
export function resolve(s) {
  s = s.trim();
  const key = s.toLowerCase().replace(/\.com$/, "");
  if (SITES[key]) return "https://" + SITES[key];
  const hit = Object.entries(SITES).find(([n, d]) => n.startsWith(s.toLowerCase()) || d.startsWith(s.toLowerCase()));
  if (hit && !s.includes(" ") && !looksUrl(s)) return "https://" + hit[1];
  if (looksUrl(s)) return /^https?:/i.test(s) ? s : "https://" + s;
  return "https://www.google.com/search?q=" + encodeURIComponent(s);
}

// ── saved profile (for one-word autofill) ──────────────────────────────────
export const FIELD_SYNS = {
  name: ["name", "full name", "your name", "fullname"],
  first: ["first name", "first", "given name", "fname", "firstname"],
  last: ["last name", "last", "surname", "family name", "lname", "lastname"],
  email: ["email", "e-mail", "email address"],
  phone: ["phone", "mobile", "telephone", "phone number", "tel", "cell"],
  address: ["address", "street", "address line 1", "street address"],
  address2: ["address line 2", "apt", "apartment", "suite", "unit"],
  city: ["city", "town"],
  state: ["state", "province", "region"],
  zip: ["zip", "postal", "postcode", "zip code", "postal code"],
  country: ["country"],
  company: ["company", "organization", "organisation", "business"],
  message: ["message", "comment", "comments", "your message", "note"],
};
export function normKey(k) {
  k = k.toLowerCase().trim();
  for (const [c, syns] of Object.entries(FIELD_SYNS)) {
    if (c === k || syns.includes(k)) return c;
  }
  return k;
}
export function parsePairs(str) {
  return str
    .split(/[,;]|\band\b/i)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      const mm = s.match(/^(.+?)\s*[:=]\s*(.+)$/);
      return mm ? { k: mm[1].trim(), v: mm[2].trim() } : null;
    })
    .filter(Boolean);
}

// intent → URL
export const enc = encodeURIComponent;
export function intentUrl(t) {
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
  if ((m = t.match(/^(?:add (?:a )?(?:calendar )?event|schedule|new event|remind me to)\s+(.+)/i))) {
    const raw = m[1];
    try {
      const res: any = (chrono.parse(raw) || [])[0];
      if (res && res.start) {
        const start = res.start.date();
        const end = res.end ? res.end.date() : new Date(start.getTime() + 3600000); // default 1h
        const fmt = (d) => d.toISOString().replace(/[-:]|\.\d{3}/g, ""); // YYYYMMDDTHHMMSSZ (UTC)
        const title = (raw.slice(0, res.index) + raw.slice(res.index + res.text.length)).replace(/\s{2,}/g, " ").trim() || raw;
        return "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + enc(title) + "&dates=" + fmt(start) + "/" + fmt(end);
      }
    } catch {}
    return "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + enc(raw);
  }
  if ((m = t.match(/^(?:search (?:my )?(?:e-?mail|gmail|inbox)|find (?:e-?mails?|mail))\s+(?:for\s+|from\s+)?(.+)/i))) return "https://mail.google.com/mail/u/0/#search/" + enc(m[1]);
  if ((m = t.match(/^(?:stock|ticker|share price)\s+(?:of\s+|for\s+)?(.+)/i))) return "https://www.google.com/search?q=" + enc(m[1] + " stock");
  if ((m = t.match(/^flights?\s+(?:from\s+)?(.+?)\s+to\s+(.+)$/i))) return "https://www.google.com/travel/flights?q=" + enc("flights from " + m[1] + " to " + m[2]);
  if ((m = t.match(/^(?:showtimes?|movie times?)\s+(?:for\s+)?(.+)/i))) return "https://www.google.com/search?q=" + enc(m[1] + " showtimes");
  if ((m = t.match(/^recipe(?:s)?\s+(?:for\s+)?(.+)/i))) return "https://www.google.com/search?q=" + enc(m[1] + " recipe");
  return null;
}
export function composeEmailUrl(to, sub, body) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(to || "")}&su=${enc(sub || "")}&body=${enc(body || "")}`;
}

// extractive summary — score sentences by keyword frequency + lead bias (no AI)
export function summarize(text, n = 6) {
  const clean = text.replace(/\s+/g, " ").trim();
  const sentences = (clean.match(/[^.!?]+[.!?]+(?=\s|$)/g) || [clean]).filter((s) => s.trim().split(/\s+/).length >= 5);
  if (sentences.length <= n) return sentences.map((s) => s.trim());
  const stop = new Set(
    "the a an and or but of to in on at for with is are was were be been by this that it as from your you we our their his her its not can will would should more most than then them they he she into out over about after before also just".split(
      " ",
    ),
  );
  const freq = {};
  for (const w of clean.toLowerCase().match(/[a-z']{3,}/g) || []) if (!stop.has(w)) freq[w] = (freq[w] || 0) + 1;
  const scored = sentences.map((s, i) => {
    const words = s.toLowerCase().match(/[a-z']{3,}/g) || [];
    let sc = words.reduce((a, w) => a + (freq[w] || 0), 0) / (words.length || 1);
    if (i < 3) sc *= 1.15;
    return { s: s.trim(), sc, i };
  });
  return scored
    .sort((a, b) => b.sc - a.sc)
    .slice(0, n)
    .sort((a, b) => a.i - b.i)
    .map((o) => o.s);
}
