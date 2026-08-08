# Claude Helper — Configurable Browser Assistant

A personal Chrome extension (Manifest V3) that gives an assistant **full browser
control** — open tabs, read pages, click, type, submit — with **broad host
permissions** so it works even on sites that block the official AI extensions.

Every action is bounded by a **user-defined policy** with three tiers:

| Tier | Behavior |
|------|----------|
| ✅ **Allowed** | runs directly |
| ⚠️ **Confirm** | per-site: **ask each time** *or* **always allow** (banks, logins, bills, payments) |
| ⛔ **Forbidden** | never runs — by domain **or keyword** (adult sites blocked by default) |

You decide what it *can* do and what is *strictly off-limits* — in the Options page.

> ⚠️ This is a personal, unpacked developer extension with broad permissions
> (`<all_urls>`). Load it only for yourself. Keep the repo **private** unless you
> know what you're publishing.

## What it can do
- **Tabs:** open, navigate, list, close
- **Page:** read (returns every interactive element with a `ref`), click, type, submit
- Works as a manual tool (popup console) **or** driven by Claude via the local bridge

## Safety model (the important part)
- **Sensitive sites ask per action.** Banks, logins, checkouts, and any page with a
  password field trigger an in-page **Approve / Deny** modal. Nothing runs unless you approve.
- **Hard limits you can set:** never type into password fields, never submit on
  sensitive pages, forbid entire domains, disable the auto-bridge.
- **Credentials/payments are never auto-entered** without your explicit per-action approval.

Configure it all in **Options** (right-click the extension → Options, or the
"⚙ Policy" button in the popup).

## Install (unpacked)
1. `chrome://extensions` → enable **Developer mode**
2. **Load unpacked** → select this folder
3. Pin it. Set your policy in **Options**.

## Optional: let Claude drive it (the bridge)
The `server/` folder runs a local agent loop that relays Claude's tool calls to the
extension. **Requires your own Anthropic API key** (pay-per-use, separate from any
Claude subscription).

```bash
cd server
npm install
$env:ANTHROPIC_API_KEY="sk-ant-..."   # PowerShell
node server.js
# open http://localhost:8787
```

The bridge is subject to the **same policy** — it cannot bypass forbidden rules or
the sensitive-site confirmations.

## Files
- `manifest.json` — MV3 manifest, permissions, options page
- `background.js` — policy engine + tool executor + bridge client
- `content.js` — page actions + policy enforcement + confirmation modal
- `options.html/js` — capabilities vs. forbidden configuration UI
- `popup.html/js` — manual control console
- `server/` — optional Claude bridge (needs an API key)

## License
Personal use.
