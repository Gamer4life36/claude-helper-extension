# Testing Claude Companion — Start Here

Thanks for testing! This is a personal Chrome extension that puts a **chat panel on the
right side of your browser**. You type plain commands ("open youtube and search lofi",
"summarize", "fill my info") and it drives the page for you.

It runs **100% on your machine, for free** — no account, no API key, no cost to try.

> **Honest 10-second version:** Free mode is the *hands*, not the *brain*. It reliably does
> mechanical things — open, search, click, fill forms, summarize, read aloud, translate.
> It **cannot** reason about a fuzzy goal, write original text, or design something custom —
> that's the one thing behind Anthropic's paid API. See [README.md](README.md) for the full list.

---

## 1. Install (2 minutes)

**Option A — Download the zip (easiest)**
1. Go to the [**Releases**](https://github.com/Gamer4life36/claude-helper-extension/releases) page.
2. Download **`claude-helper-extension.zip`** from the latest release.
3. **Unzip it** somewhere you'll keep it (e.g. `Documents\claude-helper-extension`).
   *(Don't run it from inside the zip — Chrome needs a real folder.)*

**Option B — Clone with git**
```bash
git clone https://github.com/Gamer4life36/claude-helper-extension.git
```

**Then load it into Chrome (same for both options):**
1. Open `chrome://extensions`
2. Turn on **Developer mode** (top-right toggle)
3. Click **Load unpacked**
4. Select the **folder** (the one containing `manifest.json`)
5. You'll see **“Claude Companion (Dev)”** appear. Pin it if you like.

---

## 2. First run
- **Click the extension icon** → a chat panel docks to the **right** of the page.
- It opens in **🔵 Free mode** (no API key). The toggle up top is how you'd switch to
  Claude API later — you don't need to.
- Type **`help`** to see every command.

---

## 3. Try these first 👇
Paste these into the panel one at a time:

```
open youtube and search synthwave
```
```
images of neon tokyo at night
```
Now go to any news article, then:
```
summarize
```
```
reader view
```
```
read aloud
```
(say `stop reading` to stop)

Save a profile once, then autofill any contact form:
```
set my info name=Test User, email=test@example.com, phone=555-0100
```
```
fill my info
```
Chain steps together:
```
open reddit then search mechanical keyboards then scroll down
```
Fun ones:
```
dark mode
```
```
translate this page
```

---

## 4. What to look for / report
Please note anything that:
- **Didn't do what the wording implied** (a command that opened a Google search when you
  expected something smarter — tell me the exact phrase you typed).
- **Broke or threw an error** (copy the red text from the panel).
- **Felt like it should exist** but didn't.

👉 **Report it:** open an [**Issue**](https://github.com/Gamer4life36/claude-helper-extension/issues)
with the exact command you typed and what happened. Screenshots help.

---

## 5. Safety (please read)
- It **never types or stores passwords or payment info** — password fields are hard-blocked.
- `set my info` saves **only what you type** (name/email/phone/address) in local browser
  storage on your machine. **Don't put anything secret there.**
- **Banks, logins, and checkout pages ask for your approval before every action.**
- **Adult sites are blocked.**
- It has **broad permissions** (it can act on any site) — that's what makes it work, but it's
  why you should only run extensions from someone you trust. This is a developer/test build.

---

## 6. (Optional) Full Claude — only if you have an Anthropic **API key**
Free mode covers everything above. If you specifically want AI reasoning, the panel's
**🟢 Claude API** toggle explains the setup (a local bridge + your own paid key). A Claude
*subscription does not* include API access. Most testers should just stay on 🔵 Free mode.
