// Release metadata operations.
//
// The platform ships in named phases (PHASE 1.0 → 3.4 …). The phase ledger
// has lived implicitly in the changelog and the *_REPORT.md files. This
// module formalizes it as structured data so:
//
//   - The creator console can render an at-a-glance release timeline.
//   - The changelog draft tool knows the phase number to use next.
//   - Operational scripts can stamp build outputs with the active phase.
//
// The ledger is intentionally code-resident (no JSON file) — the contract
// is "amend the file, commit it." Adds are append-only. Past phases never
// mutate.

export const RELEASE_PHASES = Object.freeze([
    Object.freeze({
        id: "phase-1",
        version: "1.0",
        label: "Foundation",
        date: "2025-12-01",
        report: "PHASE1_FOUNDATION_REPORT.md",
        summary: "Surface canonicalization, motion tokens, glass tier system.",
    }),
    Object.freeze({
        id: "phase-2-5",
        version: "2.5",
        label: "Work With Me",
        date: "2026-01-12",
        report: "WORK_WITH_ME_REPORT.md",
        summary: "/work-with-me track + selective intake. Status pill scoped.",
    }),
    Object.freeze({
        id: "phase-3-0",
        version: "3.0",
        label: "Platform Intelligence",
        date: "2026-03-04",
        report: "PLATFORM_INTELLIGENCE_REPORT.md",
        summary: "Schema, taxonomy, recommendation graph, audience layer.",
    }),
    Object.freeze({
        id: "phase-3-1",
        version: "3.1",
        label: "Editorial Activation",
        date: "2026-05-07",
        report: "EDITORIAL_ACTIVATION_REPORT.md",
        summary: "MDX-style publishing, dynamic content routes, related rail.",
    }),
    Object.freeze({
        id: "phase-3-2",
        version: "3.2",
        label: "Distribution & Scale",
        date: "2026-05-07",
        report: "DISTRIBUTION_SCALE_REPORT.md",
        summary: "Sitemap, RSS/Atom/JSON-Feed × 7 collections, edge readiness.",
    }),
    Object.freeze({
        id: "phase-3-3",
        version: "3.3",
        label: "Creator Stack",
        date: "2026-05-07",
        report: "CREATOR_STACK_REPORT.md",
        summary: "Creator-tooling primitives, audience retention surfaces.",
    }),
    Object.freeze({
        id: "phase-3-4",
        version: "3.4",
        label: "Creator Operations",
        date: "2026-05-07",
        report: "CREATOR_OPERATIONS_REPORT.md",
        summary: "Publishing pipeline, editorial validators, changelog ops, release ledger.",
    }),
]);

const BY_ID = new Map(RELEASE_PHASES.map((p) => [p.id, p]));
const BY_VERSION = new Map(RELEASE_PHASES.map((p) => [p.version, p]));

export function getRelease(idOrVersion) {
    return BY_ID.get(idOrVersion) || BY_VERSION.get(idOrVersion) || null;
}

/**
 * currentRelease() — the most recent phase by ledger order. Phase ordering is
 * source-of-truth via the array, not ISO date — multiple phases can ship the
 * same day and order still resolves deterministically.
 */
export function currentRelease() {
    return RELEASE_PHASES[RELEASE_PHASES.length - 1];
}

/**
 * releaseStamp() — small object suitable for stamping build outputs (JSON
 * footer in dist, optional console banner). Stable shape. No secrets.
 */
export function releaseStamp() {
    const phase = currentRelease();
    return Object.freeze({
        phase: phase.id,
        version: phase.version,
        label: phase.label,
        date: phase.date,
        builtAt: new Date().toISOString(),
    });
}

/**
 * nextPhaseHint() — small ergonomic helper for `draftReleaseEntry`. Returns
 * the suggested next phase number based on the current ledger tail. The
 * operator is free to override (e.g. when bumping minor vs. major).
 */
export function nextPhaseHint() {
    const last = currentRelease();
    const [major, minor] = last.version.split(".").map(Number);
    const nextMinor = Number.isFinite(minor) ? minor + 1 : 1;
    return {
        suggestedVersion: `${major}.${nextMinor}`,
        suggestedId: `phase-${major}-${nextMinor}`,
    };
}
