// Bundles the TypeScript sources into the plain scripts the extension loads.
// tsc handles type-checking (npm run typecheck); esbuild handles bundling/emit.
import * as esbuild from "esbuild";

const watch = process.argv.includes("--watch");
const ENTRIES = ["background", "content", "sidepanel", "options", "popup", "files"];

/** Extension scripts: self-contained IIFE bundles (classic scripts — work as
 *  service worker, content script, and page scripts without module plumbing). */
const extensionOpts = {
  entryPoints: ENTRIES.map((e) => `src/${e}.ts`),
  outdir: "js",
  bundle: true,
  format: "iife",
  target: "chrome111",
  legalComments: "none",
  logLevel: "info",
};

/** Optional Node bridge: CommonJS, with ws kept external (installed dep). */
const serverOpts = {
  entryPoints: ["server/server.ts"],
  outfile: "server/server.js",
  bundle: true,
  platform: "node",
  format: "cjs",
  target: "node20",
  external: ["ws"],
  legalComments: "none",
  logLevel: "info",
};

if (watch) {
  const c1 = await esbuild.context(extensionOpts);
  const c2 = await esbuild.context(serverOpts);
  await Promise.all([c1.watch(), c2.watch()]);
  console.log("esbuild watching src/ and server/ …");
} else {
  await esbuild.build(extensionOpts);
  await esbuild.build(serverOpts);
  console.log("esbuild: built js/ and server/server.js");
}
