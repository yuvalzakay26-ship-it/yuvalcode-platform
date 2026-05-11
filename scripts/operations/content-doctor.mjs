// scripts/operations/content-doctor.mjs
//
// Composite ecosystem health report. Per-entry validation +
// registry-wide graph checks (broken related[], orphans, duplicate slugs,
// pillar imbalance) + per-entry publication footprint summary.
//
// Operator-readable only; never wired into the build. Run by hand:
//   npm run ops:doctor

import { withOperations, log, styles, severitySymbol } from "./_runtime.mjs";

await withOperations(async ({ operations, content, editorial }) => {
    const entries = content.getAllEntries({ includeDrafts: true });
    const resolveSlug = (entry) => {
        const config = editorial.getCollectionConfigByType(entry.type);
        return config?.slug ?? null;
    };

    const report = operations.runEcosystemHealth({
        entries,
        resolveCollectionSlug: resolveSlug,
    });

    log(
        "doctor",
        `${report.totalEntries} entries · ${styles.green(report.liveEntries + " live")}`,
    );
    log(
        "doctor",
        `${styles.red(report.errors + " errors")} · ${styles.yellow(report.warnings + " warnings")} · ${styles.dim(report.info + " info")}`,
    );

    if (report.issues.length === 0) {
        log("doctor", styles.green("✓ ecosystem healthy"));
    } else {
        for (const issue of report.issues) {
            console.log(
                `  ${severitySymbol(issue.severity)} ${styles.dim(issue.code)} ${issue.message}`,
            );
        }
    }

    console.log("");
    log("doctor", styles.bold("by pillar"));
    for (const [pillar, count] of Object.entries(report.byPillar)) {
        console.log(`  ${styles.dim("·")} ${pillar.padEnd(20)} ${count}`);
    }

    console.log("");
    log("doctor", styles.bold("by collection"));
    for (const [slug, count] of Object.entries(report.byCollection)) {
        console.log(`  ${styles.dim("·")} ${String(slug).padEnd(20)} ${count}`);
    }

    if (report.errors > 0) {
        process.exitCode = 1;
    }
}).catch((err) => {
    console.error(styles.red("[doctor] failed:"), err);
    process.exitCode = 1;
});
