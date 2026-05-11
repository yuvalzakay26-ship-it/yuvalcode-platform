// scripts/operations/release-stamp.mjs
//
// Print the active release ledger row + a build-stamp blob. Useful as a
// quick pre-merge sanity check or as a one-liner the operator can drop
// into a commit message body.
//
// Usage: npm run ops:release

import { withOperations, log, styles } from "./_runtime.mjs";

await withOperations(async ({ operations }) => {
    const phase = operations.currentRelease();
    const stamp = operations.releaseStamp();
    const next = operations.nextPhaseHint();

    log("release", styles.bold(`${phase.id} · ${phase.label}`));
    console.log(`  version  ${phase.version}`);
    console.log(`  date     ${phase.date}`);
    console.log(`  report   ${phase.report}`);
    console.log(`  summary  ${phase.summary}`);

    console.log("");
    log("release", styles.bold("build stamp"));
    console.log("  " + JSON.stringify(stamp, null, 2).split("\n").join("\n  "));

    console.log("");
    log(
        "release",
        styles.dim(
            `next phase hint: ${next.suggestedId} (${next.suggestedVersion})`,
        ),
    );
}).catch((err) => {
    console.error(styles.red("[release] failed:"), err);
    process.exitCode = 1;
});
