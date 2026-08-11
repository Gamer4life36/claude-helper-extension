(() => {
  // src/popup.ts
  var out = document.getElementById("out");
  var statusEl = document.getElementById("status");
  var $ = (id) => document.getElementById(id);
  var show = (v) => out.textContent = typeof v === "string" ? v : JSON.stringify(v, null, 2);
  var send = (msg) => new Promise((res) => chrome.runtime.sendMessage(msg, res));
  var SITES = [
    ["Pinterest", "pinterest.com", "\u{1F4CC}"],
    ["YouTube", "youtube.com", "\u25B6\uFE0F"],
    ["Google", "google.com", "\u{1F50E}"],
    ["Gmail", "mail.google.com", "\u2709\uFE0F"],
    ["Google Maps", "maps.google.com", "\u{1F5FA}\uFE0F"],
    ["Amazon", "amazon.com", "\u{1F4E6}"],
    ["Facebook", "facebook.com", "\u{1F465}"],
    ["Instagram", "instagram.com", "\u{1F4F7}"],
    ["Reddit", "reddit.com", "\u{1F47D}"],
    ["X (Twitter)", "x.com", "\u2716\uFE0F"],
    ["TikTok", "tiktok.com", "\u{1F3B5}"],
    ["Netflix", "netflix.com", "\u{1F3AC}"],
    ["Wikipedia", "wikipedia.org", "\u{1F4DA}"],
    ["eBay", "ebay.com", "\u{1F3F7}\uFE0F"],
    ["Etsy", "etsy.com", "\u{1F9F6}"],
    ["Walmart", "walmart.com", "\u{1F6D2}"],
    ["Target", "target.com", "\u{1F3AF}"],
    ["Best Buy", "bestbuy.com", "\u{1F4BB}"],
    ["Twitch", "twitch.tv", "\u{1F3AE}"],
    ["LinkedIn", "linkedin.com", "\u{1F4BC}"],
    ["Spotify", "open.spotify.com", "\u{1F3A7}"],
    ["GitHub", "github.com", "\u{1F419}"],
    ["Discord", "discord.com", "\u{1F4AC}"],
    ["WhatsApp", "web.whatsapp.com", "\u{1F7E2}"],
    ["Yahoo", "yahoo.com", "\u{1F7E3}"],
    ["Yahoo Mail", "mail.yahoo.com", "\u{1F4E7}"],
    ["ChatGPT", "chatgpt.com", "\u{1F916}"],
    ["Claude", "claude.ai", "\u{1F7E0}"],
    ["IMDb", "imdb.com", "\u{1F39E}\uFE0F"],
    ["Weather", "weather.com", "\u2600\uFE0F"],
    ["CNN", "cnn.com", "\u{1F4F0}"],
    ["Craigslist", "craigslist.org", "\u{1F4CB}"],
    ["Steam", "store.steampowered.com", "\u{1F3AE}"],
    ["PayPal", "paypal.com", "\u{1F4B3}"],
    ["Nexus Mods", "nexusmods.com", "\u{1F9E9}"]
  ];
  var active = -1;
  var matches = [];
  var box = $("suggest");
  var input = $("url");
  function looksLikeUrl(s) {
    return /^https?:\/\//i.test(s) || /^[a-z0-9-]+(\.[a-z0-9-]+)+(\/\S*)?$/i.test(s);
  }
  function toUrl(s) {
    return /^https?:\/\//i.test(s) ? s : "https://" + s;
  }
  function googleSearch(q) {
    return "https://www.google.com/search?q=" + encodeURIComponent(q);
  }
  function resolve(raw) {
    const s = (raw || "").trim();
    if (!s) return null;
    const hit = SITES.find(([n, d]) => n.toLowerCase() === s.toLowerCase() || d === s.toLowerCase()) || SITES.find(([n, d]) => n.toLowerCase().startsWith(s.toLowerCase()) || d.startsWith(s.toLowerCase()));
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
    const rows = matches.map(
      ([n, d, f], i) => `<div class="sg${i === active ? " active" : ""}" data-url="https://${d}"><span class="fav">${f}</span><span class="name">${n}</span><span class="dom">${d}</span></div>`
    );
    if (s && !matches.some(([n]) => n.toLowerCase() === s)) {
      rows.push(
        `<div class="sg${active === matches.length ? " active" : ""}" data-url="${looksLikeUrl(s) ? toUrl(s) : googleSearch(q)}"><span class="fav">${looksLikeUrl(s) ? "\u{1F310}" : "\u{1F50E}"}</span><span class="name">${looksLikeUrl(s) ? "Go to " + q : "Search Google for \u201C" + q + "\u201D"}</span></div>`
      );
    }
    box.innerHTML = rows.join("");
    box.style.display = rows.length ? "block" : "none";
    box.querySelectorAll(".sg").forEach((el) => el.onclick = () => openUrl(el.dataset.url));
  }
  async function openUrl(url) {
    if (!url) return;
    box.style.display = "none";
    const r = await send({ type: "OPEN_TAB", url });
    show(r.ok ? "Opened: " + (r.url || url) : "\u{1F6AB} " + (r.error || "blocked"));
  }
  input.addEventListener("input", () => {
    active = -1;
    renderSuggest(input.value);
  });
  input.addEventListener("keydown", (e) => {
    const items = box.querySelectorAll(".sg");
    if (e.key === "ArrowDown") {
      active = Math.min(active + 1, items.length - 1);
      renderSuggest(input.value);
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      active = Math.max(active - 1, -1);
      renderSuggest(input.value);
      e.preventDefault();
    } else if (e.key === "Enter") {
      if (active >= 0 && items[active]) openUrl(items[active].dataset.url);
      else openUrl(resolve(input.value));
    } else if (e.key === "Escape") box.style.display = "none";
  });
  $("open").onclick = () => openUrl(resolve(input.value));
  document.addEventListener("click", (e) => {
    if (!$("searchWrap").contains(e.target)) box.style.display = "none";
  });
  async function refreshStatus() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return;
    const resp = await send({ type: "GET_POLICY" });
    const policy = resp && resp.policy || {};
    const host = (() => {
      try {
        return new URL(tab.url).hostname.replace(/^www\./, "");
      } catch {
        return "";
      }
    })();
    const sensitive = (policy.confirmSites || []).some((s) => s && s.host && (host === s.host || host.endsWith("." + s.host))) || /login|bank|pay|checkout|account|auth|billing/i.test(tab.url || "");
    const forbidden = (policy.forbiddenDomains || []).some((d) => host === d || host.endsWith("." + d)) || (policy.forbiddenKeywords || []).some((k) => host.includes(k));
    statusEl.innerHTML = `Active: <b>${host || tab.url}</b> \u2014 ` + (forbidden ? `<span class="warn">forbidden \u2192 blocked</span>` : sensitive ? `<span class="warn">sensitive \u2192 confirm</span>` : `<span class="safe">normal</span>`);
  }
  refreshStatus();
  $("policy").onclick = () => chrome.runtime.openOptionsPage();
  $("tabs").onclick = async () => show(await send({ type: "LIST_TABS" }));
  $("read").onclick = async () => {
    const r = await send({ type: "PAGE_ACTION", action: { kind: "read" } });
    if (r.ok)
      show(
        `URL: ${r.page.url}
Sensitive: ${r.page.sensitive} \xB7 Forbidden: ${r.page.forbidden}

` + r.page.elements.map((x) => `#${x.ref} <${x.tag}${x.type ? " " + x.type : ""}> ${x.text || x.placeholder || x.name || x.href}`.trim()).join("\n")
      );
    else show(r);
  };
  function refField() {
    const v = $("ref").value.trim();
    return /^\d+$/.test(v) ? { ref: v } : { selector: v };
  }
  $("click").onclick = async () => show(await send({ type: "PAGE_ACTION", action: { kind: "click", ...refField() } }));
  $("submit").onclick = async () => show(await send({ type: "PAGE_ACTION", action: { kind: "submit", ...refField() } }));
  $("type").onclick = async () => show(await send({ type: "PAGE_ACTION", action: { kind: "type", ...refField(), text: $("text").value } }));
})();
