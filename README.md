# Claude Companion — Configurable Browser Assistant

[![CI](https://github.com/Gamer4life36/claude-companion-extension/actions/workflows/ci.yml/badge.svg)](https://github.com/Gamer4life36/claude-companion-extension/actions/workflows/ci.yml)
[![CodeQL](https://github.com/Gamer4life36/claude-companion-extension/actions/workflows/codeql.yml/badge.svg)](https://github.com/Gamer4life36/claude-companion-extension/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> ⚖️ **Unofficial.** Not affiliated with, endorsed by, or sponsored by Anthropic. "Claude" is a
> trademark of Anthropic, PBC. This is an independent browser tool; it optionally connects to
> Claude only if *you* supply your own Anthropic API key.

> 🧪 **Testing this?** Start with **[TESTERS.md](docs/TESTERS.md)** — install steps + commands to try.
> Grab the ready-to-load zip from the **[Releases](https://github.com/Gamer4life36/claude-companion-extension/releases)** page.

A personal Chrome extension (Manifest V3). Click the icon → a **chat panel docks to
the right of the browser**, where you type commands to control the page. It has
**broad host permissions** (works even on sites that block the official AI
extensions) and is bounded entirely by a **user-defined policy**.

---

## ✅ Abilities & ⛔ Limits — read this first (for testers)

**What it CAN do — Free mode, no API key, no cost.** It's a *smart command interpreter*:
you type an instruction, it matches a pattern and drives the browser.
- **Navigate & search:** open sites by name/URL (or several at once), search within a
  specific site (YouTube, Amazon, Pinterest…), and intent searches — `images of…`,
  `videos of…`, `directions from A to B`, `weather…`, `define…`, `stock…`, natural questions.
- **Control the page:** read the page, click by number or visible text, type into fields,
  submit, press enter, scroll (incl. to top/bottom), back/forward/reload, find & highlight text.
- **Forms:** fill fields by name (`fill name=…, email=…`), or save a profile once
  (`set my info …`) and autofill any form with `fill my info`.
- **Reading tools (all computed locally):** `summarize` (extractive), `reader view`,
  `read aloud` (text-to-speech), `translate this page`, `word count`,
  `list links` / `extract emails` / `extract prices`, `copy url` / `copy page text`.
- **View:** `dark mode`, `zoom in/out/reset`.
- **Compose (opened prefilled for you to send):** Gmail drafts, calendar events, tweets, and social **share** dialogs (Facebook/LinkedIn/Reddit/X) — you write the caption and click Post.
- **Shortcuts:** `log into <site>` (opens the real login), `add to cart`.
- **Automate:** **Macros** (`save macro … / run …`), **Skills** (agent-skills style — name + description + steps, invoked explicitly with `use` or implicitly with `do`), and command **chaining** (`open youtube then search lofi then scroll down`).
- **Local files:** the **`files`** command opens a file manager to browse, read, and **edit** files inside a folder *you* pick — saves only when you click Save.
- **On-device AI (🧠 mode — free & local):** `ask <question>` and plain-English chat via Chrome's built-in Gemini Nano, plus a smarter abstractive `summarize`. No API key. (Needs Chrome 138+ and capable hardware.)

**What 🔵 Free mode CANNOT do on its own** — for these, use **🧠 On-device AI** (free, local) or **🟢 Claude API** (paid, frontier model):
- ❌ **Reason about a goal you didn't phrase as a command.** Free mode matches patterns; it doesn't understand intent.
- ❌ **Write original text or design.** `summarize` in Free mode *ranks existing sentences*; `build a page` *fills a fixed template*.
- ❌ **Judge or decide** ("which of these is best?"), or **hold a real conversation.**

> In short: **Free mode is the hands.** For a brain, add **🧠 On-device AI** (free & local, smaller
> model) or **🟢 Claude API** (a frontier model, your own paid key). A Claude *subscription does not
> include API access* — that's a separate, pay-per-use key.

## 🔒 Safety & privacy (important — you're sharing this)
- **Runs entirely in your browser.** Nothing is sent anywhere except the websites *you* tell it to open. There is no analytics, no server (unless *you* start the optional bridge).
- **Hard blocks — never run, not even with approval** (toggle in Options):
  - 💳 **Purchases/payments** — Buy now / Place order / Pay / Complete purchase are blocked. You can browse and reach checkout; the final buy is *your* click.
  - ✍️ **Legal paperwork / e-signatures** — DocuSign/Adobe Sign etc. and any "sign / agree / apply / submit application" action are blocked.
  - 🔑 **Sensitive data** — it won't type passwords, SSN, credit/debit card, CVV, bank/routing/account #, passport, license, tax ID, or date of birth into any field.
- **`set my info` stores only what you type** (name/email/phone/address) in local browser storage on your machine. Don't put secrets there.
- **Adult sites are blocked** by domain *and* keyword (including search terms). **Banks, logins, and checkout pages also prompt for approval before every action.**
- **Local files (`files` command):** opens a file manager that can read/edit files on your computer — but **only inside a folder you explicitly pick** via the OS folder dialog (File System Access API), and it **writes only when you click Save**. Nothing is uploaded. Don't point it at system folders.
- **Broad permissions:** this extension can act on *all* sites — that's what makes it useful, but it means **only load it from a source you trust.** It is an unpacked developer extension (personal, testing, or in-house professional use), not a Web Store product.

---

## How it compares to the official "Claude for Chrome"

Different tools for different jobs — be clear-eyed about which you need.

| | **Claude Companion — Free mode** | **Official Claude for Chrome / 🟢 API mode** |
|---|---|---|
| Brain | Pattern-matching (deterministic) | Real Claude reasoning |
| Cost | **Free** | Subscription / pay-per-use API |
| Speed | **Instant** (no model round-trip) | Model latency per step |
| Privacy | **Fully local** — nothing leaves your browser | Page content sent to the model |
| Repeatability | **Same command → same action, every time** (auditable) | May vary run to run |
| Works on sites that block AI extensions | **Yes** (broad permissions) | Often restricted |
| **Macros** (save & replay a routine) | **Yes** | n/a |
| Understands a vague/novel goal | ❌ | ✅ |
| Writes original text / designs | ❌ | ✅ |
| Judgment & conversation | ❌ | ✅ |

**Bottom line for professional use:** for **repeatable, well-defined workflows** — opening your
morning tabs, filling the same forms, extracting data, batch navigation, one-key routines — a
deterministic tool is often *better* than an LLM: faster, free, private, and reliable. For
**open-ended thinking** (research, writing, judgment), you want the API/official extension.
This tool is the **hands**; the API is the **brain**. Many pros want the hands.

---

## Three modes
| Mode | Brain? | Needs |
|------|--------|-------|
| 🔵 **Free** | ❌ pattern-based command interpreter | nothing (free) |
| 🧠 **On-device AI** | ✅ real reasoning, **local & free** | **Chrome 138+** + capable hardware (built-in Gemini Nano) |
| 🟢 **Claude API** | ✅ real reasoning & conversation | your own Anthropic **API key** (paid) via the bridge |

A toggle at the top of the panel switches between them; it **defaults to Free**.

### 🧠 On-device AI (Chrome built-in Gemini Nano)
Chrome 138+ ships an on-device model ([Gemini Nano](https://developer.chrome.com/docs/ai/built-in)) reachable from
extensions via the `LanguageModel` (Prompt API) and `Summarizer` globals. Claude Companion uses it for
**real, local, private, free** reasoning — no API key, offline after a one-time model download.
- Plain-English chat (in 🧠 mode) and `ask <question>` (in any mode)
- Smarter, **abstractive** `summarize` when the model is ready (extractive fallback otherwise)
- Powers implicit **Skill** selection (below)

Requirements: Chrome 138+, ~4GB+ GPU VRAM (or 16GB RAM + 4 cores), ~22GB free disk for the one-time download.
Everything degrades gracefully to Free mode when unavailable.

### 🧩 Skills (agent-skills standard)
Inspired by [Anthropic Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
and the [open agent-skills standard](https://learn.chatgpt.com/docs/build-skills): a **skill** is a named capability
with a **description** (what + *when* to trigger) and a body of **steps**. Stored locally.
```
skill new research: gather info on a topic => open google and search $input then open youtube and search $input
skills                          list your skills
use research neon cities        explicit invoke ($input → "neon cities")
do gather info on quantum        implicit — on-device AI picks the matching skill by its description
skill show research | skill delete research
```
`$input` (also `$topic` / `$query`) in the steps is replaced with whatever you pass. Explicit `use` works with no AI;
implicit `do` needs 🧠 On-device AI to route the request.

> **Honest note:** **🔵 Free mode** executes exact commands (`open pinterest`, `read`,
> `click 7`) — reliable, but it doesn't *think*. For actual reasoning you now have two
> options: **🧠 On-device AI** (free & local, if your Chrome/hardware supports Gemini
> Nano — smaller/less capable than a frontier model, but real) or **🟢 Claude API** (a
> frontier model, your own paid key). A Claude *subscription* does not include API
> access. (The official *Claude for Chrome* gives in-browser Claude on the Max plan.)

## The 3-tier policy
| Tier | Behavior |
|------|----------|
| ✅ **Allowed** | runs directly |
| ⚠️ **Confirm** | per-site: **ask each time** *or* **always allow** (banks, logins, bills, payments) |
| ⛔ **Forbidden** | never runs — by domain **or keyword** (adult sites blocked by default, incl. search terms) |

Configure everything in **Options** (right-click extension → Options, or the ⚙ Policy link in the panel).

## Commands (Free mode — pattern-based, no API)
Free mode is a smart command interpreter. It understands many phrasings, but it
matches **patterns** — it doesn't reason like the API. Examples:
```
OPEN      open pinterest · google.com · open youtube, reddit, github   (many at once)
SEARCH    search cute cats
          open youtube and search lofi        search within a specific site
          images of neon city                 Google Images
          videos of cats / play daft punk     YouTube
          buy usb-c hub                        Amazon
          map of Tokyo · directions from LA to Vegas · wiki entropy · define quark
          translate hola · weather Denver · news about AI · stock AAPL · recipe carbonara
          what is a qubit?                    natural questions → Google
PAGE      read                                 list clickable/typeable items with #refs
          click 7  |  click the Sign in button  click by number or visible text/label
          type me@x.com into email             type into a field (matched by label/name)
          submit · press enter · scroll to bottom · back · forward · reload
          find "returns" on the page           scroll to + highlight text on the page
READING   summarize                            extractive summary of the article (no AI)
          reader view                          clean, distraction-free version of the page
          read aloud / stop reading            local text-to-speech (Web Speech API)
          translate this page                  opens a translated view
          word count · list links · extract emails · extract prices · copy url · copy page text
VIEW      dark mode · zoom in · zoom out · reset zoom     injected on the current page
SHOP      add to cart · buy now · checkout     acts on the current page (sensitive steps ask first)
FORMS     fill name=John, email=john@x.com, message: hello
          → reads the page, matches each key to a field by label/name/placeholder, fills it
PROFILE   set my info name=Mike, email=me@x.com, phone=555-1234
          fill my info                         one-word autofill on any form (from saved profile)
LOGIN     log into github                      opens the site's real login (passwords never entered)
EMAIL     email jane@x.com about lunch saying are you free at noon?   opens a Gmail draft (you send)
EVENTS    add event dentist friday 3pm · tweet hello world
BUILD     build a landing page for my PC-building business
          → generates a templated page (starter design). For a *custom* design, ask Claude directly.
CHAIN     open youtube then search lofi then scroll down     run steps in sequence
MACROS    save macro standup = open github then open gmail then open calendar
          run standup · macros · delete macro standup       teach a routine once, replay forever
AI        ask <question>                       on-device Gemini Nano (local & free, Chrome 138+)
SHARE     share to facebook <url>              opens FB/LinkedIn/Reddit/X share dialog (you click Post)
FILES     files                                open the local file manager (pick a folder → browse/read/edit; saves on your click)
SKILLS    skill new <name>: <when> => <steps>  ·  use <name> <input>  ·  do <request>  ·  skills
          (ships with a starter "gamepost" skill: use gamepost <your game name>)
help                                          show all commands
```

## What it can do (the actions)
- **Tabs:** open (one or many), navigate, list, close, new tab
- **Nav:** scroll (incl. to top/bottom), back, forward, reload, find-text-on-page
- **Page:** read (elements + labels + text), click by text/number, type, submit, multi-field form fill
- **Reading tools (all local, no AI):** extractive **summarize**, **reader view**, **read-aloud** (text-to-speech), page **translate**, word count, link/email/price extraction, copy text/URL
- **View:** dark-mode toggle, zoom in/out/reset (injected on the page)
- **Profile autofill:** save your contact details once (`set my info …`), then `fill my info` completes any form
- **Login shortcuts:** `log into <site>` opens the real login page (never types passwords)
- **Compose:** Gmail drafts, calendar events, tweets — opened prefilled for you to review & send
- **Build:** generate a templated starter page from a topic (opens as a local `data:` page)
- **Automate:** Macros (save/replay), Skills (name + description + steps; explicit `use` / implicit `do`), command chaining
- **On-device AI:** `ask …` and 🧠 chat via Chrome's built-in Gemini Nano (free, local); smarter abstractive `summarize`
- **Local files:** `files` opens a file manager to browse, read, and edit files in a folder you pick (saves on your click)
- **Safety:** hard blocks for purchases, legal signing, and sensitive-data entry; adult sites blocked; sensitive sites prompt per action; never auto-enters/stores passwords or payment info

> **Where Free mode stops:** it can't invent a novel plan, judge "which is best,"
> write original copy/design, or hold a real conversation. For those, switch to 🧠 On-device
> AI (free & local) or 🟢 Claude API — or just ask Claude directly for design/writing.

## Install (unpacked)
**Easiest:** download `claude-companion-extension.zip` from the
[Releases](https://github.com/Gamer4life36/claude-companion-extension/releases) page and unzip it.
Or `git clone` this repo. Then:
1. `chrome://extensions` → enable **Developer mode**
2. **Load unpacked** → select the folder (the one containing `manifest.json`)
3. Click the icon → the chat docks on the right. Set your policy in **Options**.

Full step-by-step for non-developers: **[TESTERS.md](docs/TESTERS.md)**.

## Optional: 🟢 Claude API via the bridge (needs an API key)
`server/` runs a local agent loop that relays Claude's tool calls to the extension.
Requires your own Anthropic API key (pay-per-use, **separate** from any subscription).
```bash
npm install
$env:ANTHROPIC_API_KEY="sk-ant-..."   # PowerShell
npm run bridge                         # = node server/server.js
```
When it's running and you pick **🟢 Claude API** mode, the panel uses it. The bridge obeys
the same policy (can't bypass hard blocks, forbidden rules, or sensitive-site confirmations).

## Repo layout
Written in **TypeScript** (`src/`), compiled to the JS the extension loads (`js/`). The compiled
`js/` is committed, so you can load-unpacked with **zero build**.
- `manifest.json` — MV3 manifest; loads the compiled `js/*.js`
- `src/*.ts` → `js/*.js` — `background` (service worker), `content` (page actions + hard blocks), `sidepanel` (chat/interpreter/AI/Skills/Macros), `options`, `files`, `popup`
- `*.html` + `css/` — page markup and stylesheets
- `icons/` — extension icons (16/32/48/128)
- `server/` — optional Claude API bridge (`server.ts` → `server.js`, Node + `ws`)
- `package.json`, `tsconfig.json`, `tsconfig.server.json` — project manifest + TypeScript configs
- `AGENTS.md` — contributor/agent rules · `llm.txt` — machine-readable overview

## Build / develop
Only needed if you edit the TypeScript sources (testers loading the release zip don't build anything):
```bash
npm install
npm run build       # tsc type-check + esbuild bundle -> js/ and server/server.js
npm run watch       # incremental esbuild while editing
npm run typecheck   # tsc --noEmit only
```
Sources are TypeScript (`src/`), bundled by **esbuild** into self-contained scripts in `js/` (committed, so load-unpacked needs no build).

## License
**MIT** — see [LICENSE](LICENSE). Free for personal *and* commercial/professional use; modify
and redistribute freely. Provided as-is, without warranty. (If you deploy it at work, review the
permissions and policy for your environment first — it can act on all sites.)
