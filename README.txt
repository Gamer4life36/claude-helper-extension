Claude Companion — Browser Control (personal / unpacked dev extension)
==================================================================

WHAT IT DOES
- Open tabs, navigate, list/close tabs
- Read a page (returns every clickable/typeable element with a #ref number)
- Click, type, and submit — by ref number or CSS selector

SAFETY MODEL (the important part)
- On NORMAL sites, actions run directly (full automation, no nagging).
- On SENSITIVE sites, every action pops an in-page "Approve once / Deny" modal
  and will NOT run unless you click Approve. "Sensitive" = any of:
    * host is on the sensitive list (banks, PayPal/Venmo, IRS/SSA, brokerages…)
    * URL contains login/auth/account/bank/billing/checkout/payment/pay/wallet/…
    * the page has a password field
    * the action targets a password field
    * the action is a form submit, or a click on pay/login/checkout/confirm/transfer/buy
- The extension NEVER auto-enters passwords or payment details on its own —
  those always require your explicit, per-action approval.

CUSTOMIZE THE SENSITIVE LIST
- Add your banks/bill sites: open the service worker console (chrome://extensions
  > Claude Companion > "service worker") and run:
    chrome.storage.local.set({ sensitiveHosts: ["yourbank.com","yourutility.com", ...] })

HOW TO LOAD / RELOAD
1. chrome://extensions  →  Developer mode ON
2. First time: "Load unpacked" → select this folder.
   After edits: click the refresh/reload icon on the Claude Companion card,
   then RELOAD any open web tab so the new content script runs.
3. Pin it, click the icon → use the popup console.

NOTE: content scripts can't run on chrome:// pages, the Chrome Web Store, or the
New Tab page. Test on a normal http/https website.

NEXT STEP: to have Claude (the AI) drive this instead of you clicking the popup,
it needs a bridge to the Claude API (local server or native messaging). Ask and
that can be added.
