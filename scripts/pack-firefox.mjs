// Builds a Firefox-compatible copy of the extension into dist/firefox/.
// This NEVER touches the root Chrome extension: the root manifest.json stays
// Chrome (service_worker + side_panel) and the committed js/ stays the Chrome
// build. Only dist/firefox/ is (re)written here.
//
// Run the esbuild step first (`npm run build`) so js/ is current.
import { existsSync, mkdirSync, rmSync, cpSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "dist", "firefox");

// ── clean + recreate dist/firefox ──────────────────────────────────────────
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

// ── copy the loadable assets (the built js/ + static resources) ─────────────
for (const dir of ["js", "css", "icons", "pages"]) {
  const src = join(ROOT, dir);
  if (!existsSync(src)) throw new Error(`missing ${dir}/ — run "npm run build" first`);
  cpSync(src, join(OUT, dir), { recursive: true });
}

// ── derive a Firefox manifest from the root (Chrome) manifest ───────────────
const chromeManifest = JSON.parse(readFileSync(join(ROOT, "manifest.json"), "utf8"));

const ff = structuredClone(chromeManifest);

// Firefox MV3 uses an event page (background scripts), not a service worker.
ff.background = { scripts: ["js/background.js"] };

// Firefox has no side_panel; it uses sidebar_action instead.
delete ff.side_panel;
ff.sidebar_action = {
  default_panel: "pages/sidepanel.html",
  default_title: "Claude Companion",
  default_icon: "icons/icon48.png",
};

// Gecko needs an add-on id + a minimum version for MV3.
ff.browser_specific_settings = {
  gecko: { id: "claude-companion@local", strict_min_version: "128.0" },
};

// Chrome-only keys that Firefox doesn't understand / doesn't need.
delete ff.minimum_chrome_version;

// sidePanel is a Chrome-only permission — drop it for Firefox (host access and
// every other permission carry over unchanged, including <all_urls>).
if (Array.isArray(ff.permissions)) {
  ff.permissions = ff.permissions.filter((p) => p !== "sidePanel");
}

writeFileSync(join(OUT, "manifest.json"), JSON.stringify(ff, null, 2) + "\n", "utf8");

console.log(`pack:firefox — wrote ${join("dist", "firefox")}/ (manifest + js/ css/ icons/ pages/)`);
