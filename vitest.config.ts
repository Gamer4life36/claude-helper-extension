import { defineConfig } from "vitest/config";

// Unit tests live in test/. Scope Vitest there so it never tries to run the
// Playwright specs under e2e/ (which import @playwright/test, not Vitest).
export default defineConfig({
  test: {
    include: ["test/**/*.test.ts"],
  },
});
