import { defineConfig } from "@playwright/test";

// E2E smoke test for the unpacked MV3 extension. The extension itself is loaded
// per-test via chromium.launchPersistentContext (see e2e/extension.spec.ts),
// so no global project/browser config is needed here.
export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
});
