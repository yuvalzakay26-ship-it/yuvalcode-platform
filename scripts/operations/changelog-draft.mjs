// scripts/operations/changelog-draft.mjs
//
// Compose a ready-to-paste changelog entry skeleton from a release context
// passed as CLI args. Prints the .jsx body to stdout — the operator pipes
// it into src/content/changelogs/<slug>.jsx and edits the Body.
//
// Usage:
//   npm run ops:changelog -- --phase 3.5 --title "Title" --summary "Summary"
//
// All flags are required; everything else falls back to ledger defaults.

import { argv } from "node:process";
import { withOperations, styles } from "./_runtime.mjs";

function parseArgs(args) {
    const out = {};
    for (let i = 0; i < args.length; i += 1) {
        const flag = args[i];
        if (!flag.startsWith("--")) continue;
        const key = flag.slice(2);
        const next = args[i + 1];
        if (!next || next.startsWith("--")) {
            out[key] = true;
            continue;
        }
        out[key] = next;
        i += 1;
    }
    return out;
}

const args = parseArgs(argv.slice(2));

await withOperations(async ({ operations }) => {
    const phase = args.phase || operations.nextPhaseHint().suggestedVersion;
    const title = args.title;
    const summary = args.summary;

    if (!title || !summary) {
        console.error(styles.red("[changelog] requires --title and --summary."));
        console.error("usage: npm run ops:changelog -- --phase 3.5 --title \"…\" --summary \"…\"");
        process.exitCode = 1;
        return;
    }

    const composer = operations.getChangelogComposer();
    const result = await composer.compose({ phase, title, summary });
    console.log(`// kind: ${result.kind} · source: ${result.source}`);
    console.log(result.draft);
}).catch((err) => {
    console.error(styles.red("[changelog] failed:"), err);
    process.exitCode = 1;
});
