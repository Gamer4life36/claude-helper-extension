// Single source of the promise-based WebExtension API.
// The webextension-polyfill provides `browser.*` on Chromium (mapping to
// `chrome.*`) and uses Firefox's native `browser.*` on Gecko — so importing
// from here lets one codebase run on Chrome, Edge, and Firefox.
//
// Note: APIs with no cross-browser equivalent (e.g. `chrome.sidePanel`) are NOT
// on `browser` — keep using the `chrome.*` global for those, guarded and marked
// `/* chrome-only */`.
import browser from "webextension-polyfill";

export default browser;
