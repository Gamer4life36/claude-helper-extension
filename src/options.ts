const $ = (id: any): any => document.getElementById(id);
const send = (msg: any): Promise<any> => new Promise((res) => chrome.runtime.sendMessage(msg, res));
const CAP_LIST = ["open_tab", "navigate", "close_tab", "list_tabs", "read_page", "click", "type", "submit", "scroll", "reload", "back", "forward", "find_text", "extract", "links", "speak", "darkmode", "zoom", "copy"];
let policy;

function renderCaps() {
  $("caps").innerHTML = CAP_LIST.map((c) =>
    `<label class="cap"><input type="checkbox" data-cap="${c}" ${policy.capabilities[c] ? "checked" : ""}/> ${c}</label>`).join("");
}

function siteRow(host = "", mode = "ask") {
  const div = document.createElement("div");
  div.className = "site";
  div.innerHTML = `<input class="host" value="${host.replace(/"/g, "&quot;")}" placeholder="host.com" />
    <select class="mode">
      <option value="ask" ${mode === "ask" ? "selected" : ""}>Ask each time</option>
      <option value="allow" ${mode === "allow" ? "selected" : ""}>Always allow</option>
    </select>
    <button class="rm">✕</button>`;
  (div.querySelector(".rm") as any).onclick = () => div.remove();
  return div;
}

function renderConfirm() {
  const box = $("confirmRows");
  box.innerHTML = "";
  (policy.confirmSites || []).forEach((s) => box.appendChild(siteRow(s.host, s.mode)));
}

async function load() {
  const r = await send({ type: "GET_POLICY" });
  policy = r.policy;
  renderCaps();
  renderConfirm();
  $("forbidPasswordTyping").checked = !!policy.rules.forbidPasswordTyping;
  $("forbidSensitiveData").checked = policy.rules.forbidSensitiveData !== false;
  $("forbidPurchases").checked = policy.rules.forbidPurchases !== false;
  $("forbidLegalSigning").checked = policy.rules.forbidLegalSigning !== false;
  $("forbidSubmitOnSensitive").checked = !!policy.rules.forbidSubmitOnSensitive;
  $("allowBridgeInv").checked = !policy.rules.allowBridge;
  $("confirmAllSubmits").checked = !!policy.rules.confirmAllSubmits;
  $("forbiddenKeywords").value = (policy.forbiddenKeywords || []).join("\n");
  $("forbiddenDomains").value = (policy.forbiddenDomains || []).join("\n");
}

$("addSite").onclick = () => $("confirmRows").appendChild(siteRow());

$("save").onclick = async () => {
  policy.capabilities = {};
  document.querySelectorAll("[data-cap]").forEach((el: any) => (policy.capabilities[el.dataset.cap] = el.checked));
  policy.rules.forbidPasswordTyping = $("forbidPasswordTyping").checked;
  policy.rules.forbidSensitiveData = $("forbidSensitiveData").checked;
  policy.rules.forbidPurchases = $("forbidPurchases").checked;
  policy.rules.forbidLegalSigning = $("forbidLegalSigning").checked;
  policy.rules.forbidSubmitOnSensitive = $("forbidSubmitOnSensitive").checked;
  policy.rules.allowBridge = !$("allowBridgeInv").checked;
  policy.rules.confirmAllSubmits = $("confirmAllSubmits").checked;
  const clean = (v) => v.split("\n").map((s) => s.trim().replace(/^www\./, "").toLowerCase()).filter(Boolean);
  policy.forbiddenKeywords = clean($("forbiddenKeywords").value);
  policy.forbiddenDomains = clean($("forbiddenDomains").value);
  policy.confirmSites = [...document.querySelectorAll("#confirmRows .site")]
    .map((r: any) => ({ host: r.querySelector(".host").value.trim().replace(/^www\./, "").toLowerCase(), mode: r.querySelector(".mode").value }))
    .filter((s) => s.host);
  await send({ type: "SET_POLICY", policy });
  $("saved").textContent = "Saved ✓";
  setTimeout(() => ($("saved").textContent = ""), 2000);
};

load();

export {};
