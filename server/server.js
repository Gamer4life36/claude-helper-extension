"use strict";
// ── Claude Browser Bridge ──────────────────────────────────────────────────
// Runs the Claude agent loop and relays its tool calls to the Chrome extension
// over WebSocket. Sensitive actions are still gated by the extension's in-page
// confirmation, so this cannot silently act on banks/logins/payments.
//
//   Setup:  npm install
//   Run:    set ANTHROPIC_API_KEY=sk-ant-...   (PowerShell: $env:ANTHROPIC_API_KEY="sk-ant-...")
//           node server.js
//   Then open http://localhost:8787 and type a task.
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { WebSocketServer } = require("ws");
const PORT = Number(process.env.BRIDGE_PORT || 8787);
const API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.CLAUDE_MODEL || "claude-sonnet-5";
const MAX_STEPS = Number(process.env.MAX_STEPS || 40);
if (!API_KEY)
    console.warn("\n[!] ANTHROPIC_API_KEY is not set — set it before running a task.\n");
// ── state ──────────────────────────────────────────────────────────────────
let extSocket = null;
const pending = new Map(); // requestId -> {resolve, reject}
let logBuf = [];
let running = false;
function log(...a) {
    const s = a.map((x) => (typeof x === "string" ? x : JSON.stringify(x))).join(" ");
    logBuf.push(new Date().toISOString().slice(11, 19) + "  " + s);
    if (logBuf.length > 800)
        logBuf.shift();
    console.log(s);
}
// Send a tool command to the extension and await its result.
function callExtension(tool, args) {
    return new Promise((resolve, reject) => {
        if (!extSocket || extSocket.readyState !== 1)
            return reject(new Error("extension not connected (load/reload the Chrome extension)"));
        const id = crypto.randomUUID();
        pending.set(id, { resolve, reject });
        extSocket.send(JSON.stringify({ id, tool, args }));
        setTimeout(() => { if (pending.has(id)) {
            pending.delete(id);
            reject(new Error("extension timed out (a confirmation may be waiting, or the tab has no content script)"));
        } }, 180000);
    });
}
// ── Claude tools ─────────────────────────────────────────────────────────
const TOOLS = [
    { name: "open_tab", description: "Open a new browser tab at a URL.", input_schema: { type: "object", properties: { url: { type: "string" } }, required: ["url"] } },
    { name: "navigate", description: "Navigate the active tab to a URL.", input_schema: { type: "object", properties: { url: { type: "string" } }, required: ["url"] } },
    { name: "list_tabs", description: "List open tabs.", input_schema: { type: "object", properties: {} } },
    { name: "read_page", description: "Read the active page: returns interactive elements each with a numeric 'ref', plus page text. Call this before clicking/typing to get refs.", input_schema: { type: "object", properties: {} } },
    { name: "click", description: "Click an element by its ref number (from read_page) or a CSS selector.", input_schema: { type: "object", properties: { ref: { type: "string" }, selector: { type: "string" } } } },
    { name: "type", description: "Type text into an element by ref or CSS selector.", input_schema: { type: "object", properties: { ref: { type: "string" }, selector: { type: "string" }, text: { type: "string" } }, required: ["text"] } },
    { name: "submit", description: "Submit the form containing the element (by ref or selector).", input_schema: { type: "object", properties: { ref: { type: "string" }, selector: { type: "string" } } } }
];
const SYSTEM = [
    "You operate a web browser through tools to accomplish the user's task.",
    "Always call read_page to get fresh element refs before you click/type/submit.",
    "Work in small steps; after acting, read_page again to verify the result.",
    "SAFETY: On login/banking/bill/payment pages the user is prompted to approve each action; an action may come back denied. If denied, do NOT retry silently — explain and stop, or ask the user. Never attempt to guess or enter passwords or payment details yourself.",
    "Be concise. When the task is complete, give a short summary and stop calling tools."
].join(" ");
async function anthropic(messages) {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "content-type": "application/json", "x-api-key": API_KEY, "anthropic-version": "2023-06-01" },
        body: JSON.stringify({ model: MODEL, max_tokens: 1500, system: SYSTEM, tools: TOOLS, messages })
    });
    if (!res.ok)
        throw new Error("Anthropic API " + res.status + ": " + (await res.text()).slice(0, 400));
    return res.json();
}
async function runTask(task) {
    if (running)
        return log("Busy — a task is already running.");
    running = true;
    log("── TASK: " + task);
    const messages = [{ role: "user", content: task }];
    try {
        for (let step = 0; step < MAX_STEPS; step++) {
            const resp = await anthropic(messages);
            messages.push({ role: "assistant", content: resp.content });
            const text = resp.content.filter((c) => c.type === "text").map((c) => c.text).join(" ").trim();
            if (text)
                log("Claude: " + text);
            const toolUses = resp.content.filter((c) => c.type === "tool_use");
            if (!toolUses.length) {
                log("✓ Done.");
                break;
            }
            const results = [];
            for (const tu of toolUses) {
                log("→ " + tu.name + " " + JSON.stringify(tu.input));
                let result;
                try {
                    result = await callExtension(tu.name, tu.input);
                }
                catch (e) {
                    result = { ok: false, error: String(e.message || e) };
                }
                if (result?.denied)
                    log("   ⛔ user DENIED this action");
                log("   " + JSON.stringify(result).slice(0, 240));
                results.push({ type: "tool_result", tool_use_id: tu.id, content: JSON.stringify(result).slice(0, 8000) });
            }
            messages.push({ role: "user", content: results });
        }
    }
    catch (e) {
        log("ERROR: " + (e.message || e));
    }
    finally {
        running = false;
    }
}
// ── HTTP (control page + task submit + log poll) ───────────────────────────
const server = http.createServer((req, res) => {
    if (req.url === "/" || req.url === "/index.html") {
        res.writeHead(200, { "content-type": "text/html" });
        return res.end(fs.readFileSync(path.join(__dirname, "index.html")));
    }
    if (req.url === "/log") {
        res.writeHead(200, { "content-type": "application/json" });
        return res.end(JSON.stringify({ running, connected: !!extSocket && extSocket.readyState === 1, log: logBuf }));
    }
    if (req.url === "/task" && req.method === "POST") {
        let body = "";
        req.on("data", (c) => (body += c));
        req.on("end", () => {
            try {
                const { task } = JSON.parse(body || "{}");
                if (task)
                    runTask(task);
                res.writeHead(200);
                res.end("ok");
            }
            catch {
                res.writeHead(400);
                res.end("bad request");
            }
        });
        return;
    }
    res.writeHead(404);
    res.end();
});
// ── WebSocket (extension link) ─────────────────────────────────────────────
const wss = new WebSocketServer({ server });
wss.on("connection", (ws) => {
    extSocket = ws;
    log("● extension connected");
    ws.on("message", (m) => {
        let d;
        try {
            d = JSON.parse(m);
        }
        catch {
            return;
        }
        if (d.ping || d.hello)
            return;
        const p = pending.get(d.id);
        if (p) {
            pending.delete(d.id);
            d.error ? p.reject(new Error(d.error)) : p.resolve(d.result);
        }
    });
    ws.on("close", () => { if (extSocket === ws)
        extSocket = null; log("○ extension disconnected"); });
});
server.listen(PORT, () => log("Bridge listening on http://localhost:" + PORT + "  (model: " + MODEL + ")"));
