// E2E smoke test — run LOCALLY with: `npx playwright install chromium` then `npm run e2e`.
// Loading an unpacked MV3 extension requires a real Chrome process (a full browser,
// via new-headless or headed), so this is intentionally NOT wired into CI by default.
// It could not be verified green in the original dev environment because the bundled
// Chromium was missing its Visual C++ runtime ("side-by-side configuration is incorrect"),
// so it is deliberately left out of CI. To run it on CI (ubuntu), install with
// `npx playwright install --with-deps chromium` and launch under xvfb: `xvfb-run -a npm run e2e`.
import { test, expect, chromium, type BrowserContext, type Worker } from "@playwright/test";
import path from "node:path";

// Repo root = one level up from this e2e/ file (Playwright runs specs as CJS).
const repoRoot = path.resolve(__dirname, "..");

let context: BrowserContext;
let extensionId: string;

const EXT_ARGS = [`--disable-extensions-except=${repoRoot}`, `--load-extension=${repoRoot}`];

// Resolve the extension id from its MV3 service worker (chrome-extension://<id>/…).
async function waitForExtensionId(ctx: BrowserContext, timeout: number): Promise<string> {
  let [sw] = ctx.serviceWorkers();
  if (!sw) sw = (await ctx.waitForEvent("serviceworker", { timeout })) as Worker;
  return new URL(sw.url()).host;
}

// Old headless Chrome can't load extensions, so try the new headless mode first
// (headless:false stops Playwright injecting the old --headless; we pass
// --headless=new ourselves — no display needed). If the service worker never
// registers, fall back to a fully headed browser (needs a display, e.g. xvfb in CI).
async function launchWithExtension(): Promise<{ ctx: BrowserContext; id: string }> {
  const newHeadless = await chromium.launchPersistentContext("", { headless: false, args: [...EXT_ARGS, "--headless=new"] });
  try {
    const id = await waitForExtensionId(newHeadless, 15_000);
    return { ctx: newHeadless, id };
  } catch {
    await newHeadless.close().catch(() => {});
  }
  const headed = await chromium.launchPersistentContext("", { headless: false, args: EXT_ARGS });
  const id = await waitForExtensionId(headed, 30_000);
  return { ctx: headed, id };
}

test.beforeAll(async () => {
  const launched = await launchWithExtension();
  context = launched.ctx;
  extensionId = launched.id;
  expect(extensionId).toMatch(/^[a-p]{32}$/);
});

test.afterAll(async () => {
  await context?.close();
});

test("files page renders its picker control", async () => {
  const page = await context.newPage();
  await page.goto(`chrome-extension://${extensionId}/pages/files.html`);
  await expect(page.locator("#pick")).toBeVisible();
  await page.close();
});

test("options page renders its capabilities section", async () => {
  const page = await context.newPage();
  await page.goto(`chrome-extension://${extensionId}/pages/options.html`);
  await expect(page.locator("#caps")).toBeVisible();
  await page.close();
});
