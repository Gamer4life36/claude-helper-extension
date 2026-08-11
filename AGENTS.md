# AGENTS.md — working rules for Claude Companion

Guidance for AI coding agents (and humans) contributing to this repo. Read this before editing.

## What this is
Claude Companion is an **unofficial** Chrome extension (Manifest V3) that docks a chat panel in the
browser side panel and drives the current page from typed commands. It is **not affiliated with
Anthropic**; keep that disclaimer intact in `README.md` and `manifest.json`.

Three modes (user-selectable in the panel):
- **🔵 Free** — deterministic pattern-matching command interpreter. No network, no AI.
- **🧠 On-device AI** — Chrome built-in Gemini Nano (`LanguageModel` / `Summarizer` globals). Local, free, offline.
- **🟢 Claude API** — optional local Node bridge (`server/`) that runs an agent loop with the user's own API key.

## Repo layout
Sources are **TypeScript in `src/`**; `npm run build` compiles them to the `js/` that the
extension actually loads. HTML/CSS/manifest live at the root.

| Path | Role |
|------|------|
| `manifest.json` | MV3 manifest — identity, icons, UI surfaces, background, content script, permissions. Loads compiled `js/*.js`. |
| `src/background.ts` → `js/background.js` | Service worker (ES module): **policy engine** + tool executor (`execTool`) + WebSocket bridge client |
| `src/content.ts` → `js/content.js` | Injected on every page (classic IIFE — content scripts can't be modules): page actions + **hard-block enforcement** |
| `src/sidepanel.ts` → `js/sidepanel.js` | Chat UI, command interpreter, mode toggle, on-device AI, Skills, Macros |
| `src/options.ts` → `js/options.js` | Policy configuration UI |
| `src/files.ts` → `js/files.js` | Local file manager/editor (File System Access API) |
| `src/popup.ts` → `js/popup.js` | Legacy manual console (kept for reference) |
| `src/globals.d.ts` | Ambient types for browser APIs not in the TS lib (LanguageModel, Summarizer, showDirectoryPicker) |
| `*.html`, `css/` | Page markup and extracted stylesheets |
| `icons/` | Extension icons (16/32/48/128) |
| `server/server.ts` → `server/server.js` | Optional Claude API bridge (Node + `ws`, CommonJS); only runs if the user starts it with their key |
| `package.json`, `tsconfig.json`, `tsconfig.server.json` | Root project manifest + TS configs |

## Golden rules (do not weaken)
1. **Security invariants — never relax these:**
   - Hard blocks (enforced in `src/content.ts`, apply in *every* mode): **purchases/payments**, **legal signing / e-signatures**, **sensitive-data entry** (passwords, SSN, card #, CVV, bank/routing/account #, passport, license, tax ID, DOB). Keep them ON by default.
   - Adult sites blocked by domain **and** keyword (incl. search queries).
   - Banks/logins/checkout are confirm-tier (prompt per action).
   - Never auto-publish public content or auto-submit sensitive forms. Composing/drafting is fine; the final Post/Send/Pay/Sign click is always the user's.
2. **Local-first & private.** Free and On-device modes must send nothing off-device. Only the user-started bridge talks to the network.
3. **Graceful degradation.** Every AI feature must fall back cleanly when Gemini Nano is unavailable (feature-detect `typeof LanguageModel !== "undefined"` + `availability()`).
4. **Trademark.** Product name is "Claude Companion". Keep the "unofficial / not affiliated with Anthropic" disclaimer. Do not reproduce Anthropic's logo.

## Build
- `npm install` once, then **`npm run build`** compiles `src/*.ts` → `js/` and `server/server.ts` → `server/server.js`. `npm run watch` for incremental. `npm run typecheck` runs `tsc --noEmit`.
- The compiled `js/` **is committed** so testers can load-unpacked (or download the release zip) with **zero build**. After editing any `src/*.ts`, run `npm run build` and commit the regenerated `js/` alongside your source change.
- TS config is intentionally lenient (`strict: false`); most DOM/message boundaries are typed `any`. Tightening types is welcome but keep the build green (`npm run build` must exit 0).

## Conventions
- **TypeScript**, but keep it dependency-light: the only runtime dep is `ws` (bridge). Do not add a bundler; the build is plain `tsc` emitting per-file ES modules (and a classic IIFE for `content.js`).
- The five entry files (`background`, `sidepanel`, `options`, `popup`, `files`) end with `export {};` and load as ES modules (manifest `background.type: "module"`, HTML `<script type="module">`). **`content.ts` must stay a classic IIFE with no `export`** — content scripts can't be modules.
- Match the existing terse, single-line style in `sidepanel.ts` interpreter branches.
- All browser actions route through `execTool` in `src/background.ts`, which checks `policy.capabilities` then forbidden/sensitive rules. New page actions must be added to: the `capabilities` map + the page-action `case` group in `src/background.ts`, a handler in `src/content.ts`, and (usually) a command pattern in `src/sidepanel.ts`.
- Policy shape lives in `DEFAULT_POLICY` (`src/background.ts`); `getPolicy()` merges stored overrides on top and re-adds any new default keys, so new fields are safe to add.

## Adding things
- **A new command:** add a regex branch in `interpret()` (`src/sidepanel.ts`) *before* the generic fallback; return `{ text, blocked?, els?, nano? }`.
- **A new page capability:** see "All browser actions route through execTool" above (4 touch points).
- **A Skill** is data (`{name, description, steps}`) in `chrome.storage.local`; steps are `then`-separated commands with `$input` substitution. Don't hardcode skills in source except the seeded starter.

## Verify before committing
- **`npm run build`** must exit 0 (this also type-checks). CI runs `npm run typecheck` + `npm run build` + `node --check` on the compiled `js/`.
- Commit the regenerated `js/` (and `server/server.js`) together with the `src/` change.
- `manifest.json` must stay UTF-8 **without BOM** — Chrome rejects a BOM.
- Manually load unpacked in Chrome and exercise the changed path.

## CI / automation (`.github/`)
- **ci.yml** — on every push/PR: `node --check` all JS, validate `manifest.json` (parses, no BOM, v3), and confirm every manifest-referenced file exists. Keep this green.
- **release.yml** — on a pushed tag `v*`: builds the zip and attaches it to that tag's GitHub Release.
- **codeql.yml** — security/quality scanning.
- **dependabot.yml** — weekly bumps for GitHub Actions and `server/` npm deps.

## Release process
1. Bump `version` in `manifest.json` (semver).
2. Commit (end messages with the `Co-Authored-By` trailer used in history) and push.
3. Tag it: `git tag vX.Y.Z && git push origin vX.Y.Z` → **release.yml** builds and attaches the zip automatically.
   - Manual alternative: build the zip (excluding `.git/`, `.github/`, `server/node_modules/`) and run `gh release create vX.Y.Z <zip> --notes-file <notes>`.

## Don't
- Don't add analytics, telemetry, or remote calls to the extension.
- Don't broaden `host_permissions` beyond `<all_urls>` with new capabilities that bypass the policy.
- Don't commit an API key, `.env`, or `server/node_modules/`.
- Don't rename the product away from "Claude Companion" without updating every surface (name, icon, repo, docs, disclaimer).
