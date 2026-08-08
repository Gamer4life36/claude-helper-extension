# Claude Helper — Configurable Browser Assistant

A personal Chrome extension (Manifest V3). Click the icon → a **chat panel docks to
the right of the browser**, where you type commands to control the page. It has
**broad host permissions** (works even on sites that block the official AI
extensions) and is bounded entirely by a **user-defined policy**.

## Two modes
| Mode | Brain? | Needs |
|------|--------|-------|
| 🔵 **Free mode** | ❌ no — a smart pattern-based command interpreter | nothing (free) |
| 🟢 **Claude API** | ✅ yes — real reasoning & conversation | your own Anthropic **API key** (paid) via the bridge |

A toggle at the top of the panel switches between them. It **defaults to Free** and stays there until you pick Claude API — a running bridge can't hijack it.

> **Honest note:** without the API key, this is a **command-runner + smart search
> bar**, not an intelligent assistant. It executes exact commands (`open pinterest`,
> `read`, `click 7`) but does not think. Real Claude intelligence requires the paid
> API — a Claude *subscription* does not include API access. (The official *Claude
> for Chrome* extension gives intelligent in-browser Claude on the Max plan.)

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
NAVIGATE  open pinterest · google.com · new tab · close tab · back · reload · scroll down
SEARCH    search cute cats
          open youtube and search lofi        search within a specific site
          images of neon city                 Google Images
          videos of cats / play daft punk     YouTube
          buy usb-c hub                        Amazon
          map of Tokyo · wiki entropy · define quark · translate hola · weather Denver
PAGE      read                                 list clickable/typeable items with #refs
          click 7  |  click Sign in            click by number or visible text/label
          type me@x.com into email             type into a field (matched by label/name)
          submit                               submit the page's form
FORMS     fill name=John, email=john@x.com, message: hello
          → reads the page, matches each key to a field by label/name/placeholder, fills it
BUILD     build a landing page for my PC-building business
          → generates a templated page (starter design). For a *custom* design, ask Claude directly.
CHAIN     open youtube then search lofi then scroll down     run steps in sequence
help                                          show all commands
```

## What it can do (the actions)
- **Tabs:** open, navigate, list, close, new tab
- **Nav:** scroll, back, forward, reload
- **Page:** read (elements + labels + text), click, type, submit, multi-field form fill
- **Build:** generate a templated starter page from a topic (opens as a local `data:` page)
- **Safety:** sensitive sites prompt per action; adult sites blocked; never auto-enters passwords/payments

> **Where Free mode stops:** it can't invent a novel plan, judge "which is best,"
> write original page copy/design, or hold a real conversation. Those need 🟢 Claude
> API mode (below) — or just ask Claude directly for design/writing.

## Install (unpacked)
1. `chrome://extensions` → enable **Developer mode**
2. **Load unpacked** → select this folder
3. Click the icon → the chat docks on the right. Set your policy in **Options**.

## Optional: Full Claude via the bridge (needs an API key)
`server/` runs a local agent loop that relays Claude's tool calls to the extension.
Requires your own Anthropic API key (pay-per-use, **separate** from any subscription).
```bash
cd server && npm install
$env:ANTHROPIC_API_KEY="sk-ant-..."   # PowerShell
node server.js
```
When it's running, the side panel auto-switches to 🟢 **Full Claude**. The bridge obeys
the same policy (can't bypass forbidden rules or sensitive-site confirmations).

## Files
- `manifest.json` — MV3 manifest, permissions, side panel, options
- `background.js` — policy engine + tool executor + bridge client
- `content.js` — page actions + policy enforcement + confirmation modal
- `sidepanel.html/js` — the right-side chat (command interpreter / bridge)
- `options.html/js` — capabilities vs. forbidden configuration
- `popup.html/js` — legacy manual console (kept for reference)
- `server/` — optional Claude bridge (needs an API key)

## License
Personal use.
