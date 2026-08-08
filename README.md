# Claude Helper — Configurable Browser Assistant

A personal Chrome extension (Manifest V3). Click the icon → a **chat panel docks to
the right of the browser**, where you type commands to control the page. It has
**broad host permissions** (works even on sites that block the official AI
extensions) and is bounded entirely by a **user-defined policy**.

## Two modes
| Mode | Brain? | Needs |
|------|--------|-------|
| 🔵 **Basic commands** | ❌ no — a fixed command interpreter | nothing (free) |
| 🟢 **Full Claude** | ✅ yes — real reasoning & conversation | your own Anthropic **API key** (paid) via the bridge |

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

## Commands (Basic mode)
```
open pinterest            open a site by name / URL
search cute cats          Google search
read                      list the page's clickable/typeable items with #refs
click 7   |  click Sign in  click by number or visible text
type hello@x.com into 3   type into a field
submit                    submit the page's form
list tabs                 list open tabs
help                      show commands
```

## What it can do (the actions)
- **Tabs:** open, navigate, list, close
- **Page:** read (elements + text), click, type, submit
- **Safety:** sensitive sites prompt per action; adult sites blocked; never auto-enters passwords/payments

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
