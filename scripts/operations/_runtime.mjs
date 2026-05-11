// Shared SSR runtime for the operations scripts.
//
// Mirrors scripts/distribution/post-build.mjs: stand up a Vite SSR server,
// hydrate the in-memory editorial registry, and hand back the operations
// modules. No new dependencies — Vite + @vitejs/plugin-react are already
// project deps.
//
// Every operations script imports `withOperations(handler)` and writes its
// own output. The runtime closes the SSR server once `handler` resolves.

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const PROJECT_ROOT = resolve(__dirname, "../..");

export const styles = {
    cyan: (s) => `\x1b[36m${s}\x1b[0m`,
    green: (s) => `\x1b[32m${s}\x1b[0m`,
    yellow: (s) => `\x1b[33m${s}\x1b[0m`,
    red: (s) => `\x1b[31m${s}\x1b[0m`,
    dim: (s) => `\x1b[2m${s}\x1b[0m`,
    bold: (s) => `\x1b[1m${s}\x1b[0m`,
};

export function log(tag, ...args) {
    console.log(styles.cyan(`[${tag}]`), ...args);
}

/**
 * withOperations(handler)
 *
 * Boots a silent Vite SSR server, hands the handler a context object with
 * the loaded operations + content modules, then closes the server.
 */
export async function withOperations(handler) {
    const { createServer } = await import("vite");
    const react = (await import("@vitejs/plugin-react")).default;

    const server = await createServer({
        configFile: false,
        root: PROJECT_ROOT,
        server: { middlewareMode: true, hmr: false, watch: null },
        appType: "custom",
        logLevel: "silent",
        clearScreen: false,
        plugins: [react()],
    });

    try {
        const operations = await server.ssrLoadModule("/src/lib/operations/index.js");
        const content = await server.ssrLoadModule("/src/lib/content/index.js");
        const editorial = await server.ssrLoadModule("/src/lib/editorial/index.js");
        await handler({ operations, content, editorial });
    } finally {
        await server.close();
    }
}

export function severitySymbol(severity) {
    if (severity === "error") return styles.red("✘");
    if (severity === "warn") return styles.yellow("⚠");
    return styles.dim("ℹ");
}
