// Flat ESLint config. typescript-eslint recommended (NON-type-checked for speed)
// + eslint-config-prettier last so formatting is owned by Prettier, not ESLint.
// Rules are deliberately relaxed to fit the codebase's lenient, any-heavy,
// dense single-line style — see the notes on each disabled rule below.
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default tseslint.config(
  {
    // Build outputs, deps, generated/config files, and e2e (own tooling/globals).
    ignores: ["js/", "node_modules/", "server/server.js", "server/node_modules/", "e2e/", "*.config.*"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Extension + shared library sources run in the browser / web-extension env.
    files: ["src/**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.webextensions,
        // Chrome built-in AI globals (declared ambiently in src/globals.d.ts).
        LanguageModel: "readonly",
        Summarizer: "readonly",
      },
    },
  },
  {
    // Node contexts: the build script and the optional bridge server source.
    files: ["build.mjs", "server/**/*.ts"],
    languageOptions: { globals: { ...globals.node } },
  },
  {
    // Rule relaxations applied everywhere. None change program behavior; they
    // just stop the linter from flagging intentional stylistic choices.
    rules: {
      // The code is deliberately any-heavy (untyped DOM/message plumbing).
      "@typescript-eslint/no-explicit-any": "off",
      // Empty catch blocks are used intentionally as "best-effort, ignore errors".
      "no-empty": "off",
      "@typescript-eslint/no-empty-function": "off",
      // Unused vars are informative, not errors, in this exploratory codebase.
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      // Intentional assignment-in-condition: while ((m = ...)) / if ((m = t.match(...))).
      "no-cond-assign": "off",
      // Intentional ternary-as-statement, e.g. `form.requestSubmit ? form.requestSubmit() : form.submit()`.
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      // Ambient `declare const` in globals.d.ts is a valid pattern here.
      "no-var": "off",
    },
  },
  // Must come last: turns off any stylistic rules that would conflict with Prettier.
  prettier,
);
