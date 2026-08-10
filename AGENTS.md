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
| File | Role |
|------|------|
| `manifest.json` | MV3 manifest — identity, icons, UI surfaces, background, content script, permissions |
| `background.js` | Service worker: **policy engine** + tool executor (`execTool`) + WebSocket bridge client |
| `content.js` | Injected on every page: performs page actions (read/click/type/submit/scroll/extract/…) and **enforces hard blocks** |
| `sidepanel.html` / `sidepanel.js` | The chat UI, command interpreter, mode toggle, on-device AI, Skills, Macros |
| `options.html` / `options.js` | Policy configuration UI (capabilities, hard limits, forbidden/confirm sites) |
| `files.html` / `files.js` | Local file manager/editor via the File System Access API (user picks a folder; read/edit/save) |
| `popup.html` / `popup.js` | Legacy manual console (kept for reference) |
| `icons/` | Extension icons (16/32/48/128) |
| `server/` | Optional Claude API bridge (Node + `ws`); only runs if the user starts it with their key |

## Golden rules (do not weaken)
1. **Security invariants — never relax these:**
   - Hard blocks (enforced in `content.js`, apply in *every* mode): **purchases/payments**, **legal signing / e-signatures**, **sensitive-data entry** (passwords, SSN, card #, CVV, bank/routing/account #, passport, license, tax ID, DOB). Keep them ON by default.
   - Adult sites blocked by domain **and** keyword (incl. search queries).
   - Banks/logins/checkout are confirm-tier (prompt per action).
   - Never auto-publish public content or auto-submit sensitive forms. Composing/drafting is fine; the final Post/Send/Pay/Sign click is always the user's.
2. **Local-first & private.** Free and On-device modes must send nothing off-device. Only the user-started bridge talks to the network.
3. **Graceful degradation.** Every AI feature must fall back cleanly when Gemini Nano is unavailable (feature-detect `typeof LanguageModel !== "undefined"` + `availability()`).
4. **Trademark.** Product name is "Claude Companion". Keep the "unofficial / not affiliated with Anthropic" disclaimer. Do not reproduce Anthropic's logo.

## Conventions
- **Vanilla JS**, no build step, no dependencies in the extension itself (only `server/` uses `ws`). Do not add a bundler or npm packages to the extension.
- Match the existing terse, single-line style in `sidepanel.js` interpreter branches.
- All browser actions route through `execTool` in `background.js`, which checks `policy.capabilities` then forbidden/sensitive rules. New page actions must be added to: the `capabilities` map + the page-action `case` group in `background.js`, a handler in `content.js`, and (usually) a command pattern in `sidepanel.js`.
- Policy shape lives in `DEFAULT_POLICY` (`background.js`); `getPolicy()` merges stored overrides on top and re-adds any new default keys, so new fields are safe to add.

## Adding things
- **A new command:** add a regex branch in `interpret()` (`sidepanel.js`) *before* the generic fallback; return `{ text, blocked?, els?, nano? }`.
- **A new page capability:** see "All browser actions route through execTool" above (4 touch points).
- **A Skill** is data (`{name, description, steps}`) in `chrome.storage.local`; steps are `then`-separated commands with `$input` substitution. Don't hardcode skills in source except the seeded starter.

## Verify before committing
- `node --check` each of `background.js`, `content.js`, `sidepanel.js`, `options.js` (there are no unit tests).
- Validate `manifest.json` parses (it must stay UTF-8 **without BOM** — Chrome rejects a BOM).
- Manually load unpacked in Chrome and exercise the changed path.

## Release process
1. Bump `version` in `manifest.json` (semver).
2. Commit; end messages with the `Co-Authored-By` trailer already used in history.
3. Build the distributable zip **excluding** `.git/` and `server/node_modules/`.
4. `gh release create vX.Y.Z <zip> --notes-file <notes>` on `Gamer4life36/claude-companion-extension`.

## Don't
- Don't add analytics, telemetry, or remote calls to the extension.
- Don't broaden `host_permissions` beyond `<all_urls>` with new capabilities that bypass the policy.
- Don't commit an API key, `.env`, or `server/node_modules/`.
- Don't rename the product away from "Claude Companion" without updating every surface (name, icon, repo, docs, disclaimer).
