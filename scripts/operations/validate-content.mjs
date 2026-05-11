// scripts/operations/validate-content.mjs
//
// Per-entry validator. Walks the live registry and reports any shape errors
// or polish hints. Exits non-zero on errors so it can wrap a CI gate.
// Warnings and info do not fail the run — the editorial layer is "fail soft".
//
// Usage: npm run ops:validate

import { withOperations, log, styles, severitySymbol } from "./_runtime.mjs";

await withOperations(async ({ operations, content }) => {
    const entries = content.getAllEntries({ includeDrafts: true });
    log("validate", `Hydrated ${entries.length} entries (incl. drafts).`);

    const issues = entries.flatMap((entry) => [
        ...operations.validateEntryShape(entry),
        ...operations.validateEditorialPolish(entry),
    ]);

    if (issues.length === 0) {
        log("validate", styles.green("✓ no issues"));
        return;
    }

    const errors = issues.filter((i) => i.severity === "error");
    const warns = issues.filter((i) => i.severity === "warn");
    const info = issues.filter((i) => i.severity === "info");

    log(
        "validate",
        `${styles.red(errors.length + " errors")} · ${styles.yellow(warns.length + " warnings")} · ${styles.dim(info.length + " info")}`,
    );

    for (const issue of issues) {
        console.log(
            `  ${severitySymbol(issue.severity)} ${styles.dim(issue.code)} ${issue.message}`,
        );
    }

    if (errors.length > 0) {
        process.exitCode = 1;
    }
}).catch((err) => {
    console.error(styles.red("[validate] failed:"), err);
    process.exitCode = 1;
});
