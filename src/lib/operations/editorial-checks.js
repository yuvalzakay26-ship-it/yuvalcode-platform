// Editorial integrity checks across the full registry.
//
// validateEntryShape() (publishing.js) operates per-entry. The functions here
// look across collections — broken `related[]` references, orphan entries,
// duplicate slugs across collections, taxonomy drift, pillar imbalance.
// Pure helpers — accept an entries iterable so they're trivially testable
// from a script or future CMS adapter.

import { OPERATION_SEVERITY } from "./publishing";
import { CONTENT_STATUS, CONTENT_VISIBILITY } from "../content/schema";
import { PILLARS } from "../content/pillars";

function issue(severity, code, message, context = {}) {
    return Object.freeze({ severity, code, message, ...context });
}

/**
 * findBrokenRelations(entries) — every related[] reference must resolve to
 * a public, live entry. References to drafts, unlisted, or non-existent ids
 * surface here.
 */
export function findBrokenRelations(entries) {
    const issues = [];
    const ids = new Map(entries.map((e) => [e.id, e]));
    for (const entry of entries) {
        if (!Array.isArray(entry.related)) continue;
        for (const ref of entry.related) {
            const target = ids.get(ref);
            if (!target) {
                issues.push(
                    issue(
                        OPERATION_SEVERITY.ERROR,
                        "graph:broken-related",
                        `Entry "${entry.id}" → related "${ref}" does not exist in the registry.`,
                        { entryId: entry.id, ref },
                    ),
                );
                continue;
            }
            if (target.status !== CONTENT_STATUS.LIVE) {
                issues.push(
                    issue(
                        OPERATION_SEVERITY.WARN,
                        "graph:related-not-live",
                        `Entry "${entry.id}" → related "${ref}" is "${target.status}" (not live).`,
                        { entryId: entry.id, ref, status: target.status },
                    ),
                );
            }
            if (target.visibility !== CONTENT_VISIBILITY.PUBLIC) {
                issues.push(
                    issue(
                        OPERATION_SEVERITY.WARN,
                        "graph:related-not-public",
                        `Entry "${entry.id}" → related "${ref}" visibility is "${target.visibility}".`,
                        { entryId: entry.id, ref, visibility: target.visibility },
                    ),
                );
            }
        }
    }
    return issues;
}

/**
 * findOrphans(entries) — entries that nothing links to. Not necessarily a
 * bug; flagged as info so the author can decide whether the entry deserves a
 * cross-link. Editorial graph hygiene.
 */
export function findOrphans(entries) {
    const incoming = new Map();
    for (const entry of entries) {
        if (!Array.isArray(entry.related)) continue;
        for (const ref of entry.related) {
            incoming.set(ref, (incoming.get(ref) ?? 0) + 1);
        }
    }
    const issues = [];
    for (const entry of entries) {
        if (entry.status !== CONTENT_STATUS.LIVE) continue;
        if (entry.visibility !== CONTENT_VISIBILITY.PUBLIC) continue;
        if (!incoming.get(entry.id)) {
            issues.push(
                issue(
                    OPERATION_SEVERITY.INFO,
                    "graph:orphan",
                    `Entry "${entry.id}" has no incoming related[] references — RelatedRail surfaces it only via same-pillar.`,
                    { entryId: entry.id },
                ),
            );
        }
    }
    return issues;
}

/**
 * findDuplicateSlugs(entries) — slug uniqueness within a collection is
 * enforced; across collections the dynamic route disambiguates. We still
 * flag exact slug collisions so the author can decide.
 */
export function findDuplicateSlugs(entries) {
    const bucket = new Map();
    for (const entry of entries) {
        const list = bucket.get(entry.slug) ?? [];
        list.push(entry);
        bucket.set(entry.slug, list);
    }
    const issues = [];
    for (const [slug, list] of bucket) {
        if (list.length < 2) continue;
        const types = list.map((e) => e.type).join(", ");
        issues.push(
            issue(
                OPERATION_SEVERITY.WARN,
                "graph:duplicate-slug",
                `Slug "${slug}" appears in ${list.length} entries (${types}).`,
                { slug, ids: list.map((e) => e.id) },
            ),
        );
    }
    return issues;
}

/**
 * findPillarImbalance(entries) — high-level info: how is the editorial output
 * distributed across pillars? Authors generally want a healthy spread; the
 * report helps spot a pillar that's gone quiet.
 */
export function findPillarImbalance(entries, { thinThreshold = 0 } = {}) {
    const tally = new Map(PILLARS.map((p) => [p.id, 0]));
    for (const entry of entries) {
        if (entry.status !== CONTENT_STATUS.LIVE) continue;
        if (!tally.has(entry.pillar)) continue;
        tally.set(entry.pillar, tally.get(entry.pillar) + 1);
    }
    const issues = [];
    for (const [pillarId, count] of tally) {
        if (count <= thinThreshold) {
            issues.push(
                issue(
                    OPERATION_SEVERITY.INFO,
                    "graph:thin-pillar",
                    `Pillar "${pillarId}" has ${count} live entries — consider seeding this surface.`,
                    { pillarId, count },
                ),
            );
        }
    }
    return issues;
}

/**
 * runEditorialChecks(entries) — composite pass. Returns a flat issue list
 * sorted error → warn → info. Used by the content-doctor script.
 */
export function runEditorialChecks(entries) {
    const all = [
        ...findBrokenRelations(entries),
        ...findDuplicateSlugs(entries),
        ...findOrphans(entries),
        ...findPillarImbalance(entries),
    ];
    return all
        .slice()
        .sort((a, b) => severityRank(a.severity) - severityRank(b.severity));
}

function severityRank(severity) {
    if (severity === OPERATION_SEVERITY.ERROR) return 0;
    if (severity === OPERATION_SEVERITY.WARN) return 1;
    return 2;
}
