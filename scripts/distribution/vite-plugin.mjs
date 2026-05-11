// Vite plugin: generate the distribution surface at build time.
//
// Runs at `closeBundle` (after Rollup writes dist/) and emits:
//   dist/sitemap.xml
//   dist/feeds/<slug>.xml
//   dist/feeds/<slug>.atom.xml
//   dist/feeds/<slug>.json
//   dist/feeds/index.txt
//   dist/feeds/README.md
//
// The plugin spins up a tiny Vite SSR loader to hydrate the source modules
// (which include JSX). This costs ~1s per build and adds no new dependencies
// — Vite is already a project dependency.

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "../..");

export function distributionPlugin() {
    let userConfig = null;

    return {
        name: "yc:distribution",
        apply: "build",
        enforce: "post",

        configResolved(config) {
            userConfig = config;
        },

        async closeBundle() {
            const outDir = userConfig?.build?.outDir
                ? resolve(userConfig.root || PROJECT_ROOT, userConfig.build.outDir)
                : resolve(PROJECT_ROOT, "dist");

            const log = (msg) =>
                userConfig?.logger?.info?.(`\x1b[36m[distribution]\x1b[0m ${msg}`)
                    ?? console.log(`[distribution] ${msg}`);

            // Use a child Vite SSR loader so JSX entries hydrate cleanly.
            // The child server is configured to be silent and stateless.
            const { createServer } = await import("vite");
            const server = await createServer({
                configFile: false,
                root: userConfig?.root || PROJECT_ROOT,
                server: { middlewareMode: true, hmr: false, watch: null },
                appType: "custom",
                logLevel: "silent",
                clearScreen: false,
                plugins: [
                    // Re-use the project's react plugin so JSX transforms apply.
                    (await import("@vitejs/plugin-react")).default(),
                ],
                resolve: userConfig?.resolve,
            });

            try {
                const distribution = await server.ssrLoadModule(
                    "/src/lib/distribution/index.js",
                );
                const content = await server.ssrLoadModule("/src/lib/content/index.js");

                const allEntries = content.getAllEntries();
                log(`Hydrated ${allEntries.length} editorial entries.`);

                // Sitemap
                const sitemapXml = distribution.buildSitemap({ entries: allEntries });
                await writeOutput(join(outDir, "sitemap.xml"), sitemapXml);
                log(`sitemap.xml — ${prettyBytes(sitemapXml.length)}.`);

                // Feeds
                const feedSlugs = distribution.getFeedSlugs();
                let totalFeedBytes = 0;
                for (const slug of feedSlugs) {
                    let entries;
                    if (slug === "all") {
                        entries = allEntries;
                    } else {
                        const config = distribution.getCollectionForFeedSlug(slug);
                        if (!config) continue;
                        entries = allEntries.filter((e) => e.type === config.type);
                    }
                    entries = entries.slice().sort(byDateDesc);
                    const model = distribution.buildFeedModel({ slug, entries });

                    const rss = distribution.renderRss(model);
                    const atom = distribution.renderAtom(model);
                    const json = distribution.renderJsonFeed(model);

                    await writeOutput(join(outDir, "feeds", `${slug}.xml`), rss);
                    await writeOutput(join(outDir, "feeds", `${slug}.atom.xml`), atom);
                    await writeOutput(join(outDir, "feeds", `${slug}.json`), json);

                    totalFeedBytes += rss.length + atom.length + json.length;
                }

                const catalog = distribution.buildFeedIndex({ feedSlugs });
                await writeOutput(join(outDir, "feeds", "index.txt"), catalog);

                const readme = [
                    `# Distribution outputs`,
                    ``,
                    `Auto-generated. Do not edit by hand.`,
                    ``,
                    `## Feeds`,
                    ...feedSlugs.flatMap((slug) => [
                        ``,
                        `### ${slug}`,
                        `- /feeds/${slug}.xml`,
                        `- /feeds/${slug}.atom.xml`,
                        `- /feeds/${slug}.json`,
                    ]),
                    ``,
                ].join("\n");
                await writeOutput(join(outDir, "feeds", "README.md"), readme);

                log(
                    `feeds × ${feedSlugs.length} (RSS + Atom + JSON Feed) — ${prettyBytes(totalFeedBytes)}.`,
                );
                log(`distribution snapshot ready in ${outDir}.`);
            } catch (err) {
                console.error("[distribution] generation failed:", err);
                throw err;
            } finally {
                await server.close();
            }
        },
    };
}

async function writeOutput(path, content) {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, content, "utf8");
}

function byDateDesc(a, b) {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.localeCompare(a.date);
}

function prettyBytes(n) {
    if (n < 1024) return `${n}B`;
    return `${(n / 1024).toFixed(2)}kB`;
}
