const $ = (id) => document.getElementById(id);
const send = (msg) => new Promise((res) => chrome.runtime.sendMessage(msg, res));
const CAP_LIST = ["open_tab", "navigate", "close_tab", "list_tabs", "read_page", "click", "type", "submit"];

let policy;

function renderCaps() {
  $("caps").innerHTML = CAP_LIST.map((c) =>
    `<label class="cap"><input type="checkbox" data-cap="${c}" ${policy.capabilities[c] ? "checked" : ""}/> ${c}</label>`
  ).join("");
}

async function load() {
  const r = await send({ type: "GET_POLICY" });
  policy = r.policy;
  renderCaps();
  $("forbidPasswordTyping").checked = !!policy.rules.forbidPasswordTyping;
  $("forbidSubmitOnSensitive").checked = !!policy.rules.forbidSubmitOnSensitive;
  $("allowBridgeInv").checked = !policy.rules.allowBridge;          // inverted: "Disable bridge"
  $("confirmAllSubmits").checked = !!policy.rules.confirmAllSubmits;
  $("forbiddenDomains").value = (policy.forbiddenDomains || []).join("\n");
  $("confirmDomains").value = (policy.confirmDomains || []).join("\n");
}

$("save").onclick = async () => {
  policy.capabilities = {};
  document.querySelectorAll("[data-cap]").forEach((el) => (policy.capabilities[el.dataset.cap] = el.checked));
  policy.rules.forbidPasswordTyping = $("forbidPasswordTyping").checked;
  policy.rules.forbidSubmitOnSensitive = $("forbidSubmitOnSensitive").checked;
  policy.rules.allowBridge = !$("allowBridgeInv").checked;          // inverted
  policy.rules.confirmAllSubmits = $("confirmAllSubmits").checked;
  const clean = (v) => v.split("\n").map((s) => s.trim().replace(/^www\./, "").toLowerCase()).filter(Boolean);
  policy.forbiddenDomains = clean($("forbiddenDomains").value);
  policy.confirmDomains = clean($("confirmDomains").value);
  await send({ type: "SET_POLICY", policy });
  $("saved").textContent = "Saved ✓";
  setTimeout(() => ($("saved").textContent = ""), 2000);
};

load();
