// Ecosystem maintenance — composite health report.
//
// Single entry point that the content-doctor script and (eventually) the
// creator console call to get a summary of registry health. Aggregates the
// per-entry shape/polish checks (publishing.js) with the registry-wide graph
// checks (editorial-checks.js) into a normalized report.
//
// Pure: takes an entries iterable + per-entry collection-slug resolver.

import {
    OPERATION_SEVERITY,
    validateEntryShape,
    validateEditorialPolish,
    derivePublicationFootprint,
} from "./publishing";
import { runEditorialChecks } from "./editorial-checks";

/**
 * @typedef {Object} HealthReport
 * @property {number}  totalEntries
 * @property {number}  liveEntries
 * @property {number}  errors
 * @property {number}  warnings
 * @property {number}  info
 * @property {Array}   issues             — flat, severity-sorted
 * @property {Array}   footprints         — one per live entry
 * @property {object}  byPillar           — { pillarId: count }
 * @property {object}  byCollection       — { slug: count }
 */

/**
 * runEcosystemHealth({ entries, resolveCollectionSlug })
 *
 * @param {Array} entries — full editorial registry
 * @param {(entry) => string|null} resolveCollectionSlug — slug for a given entry
 */
export function runEcosystemHealth({ entries, resolveCollectionSlug = () => null } = {}) {
    if (!Array.isArray(entries)) {
        return Object.freeze({
            totalEntries: 0,
            liveEntries: 0,
            errors: 0,
            warnings: 0,
            info: 0,
            issues: Object.freeze([]),
            footprints: Object.freeze([]),
            byPillar: Object.freeze({}),
            byCollection: Object.freeze({}),
        });
    }

    const perEntryIssues = entries.flatMap((e) => [
        ...validateEntryShape(e),
        ...validateEditorialPolish(e),
    ]);
    const graphIssues = runEditorialChecks(entries);
    const issues = [...perEntryIssues, ...graphIssues].sort(
        (a, b) => severityRank(a.severity) - severityRank(b.severity),
    );

    const footprints = entries
        .map((e) => derivePublicationFootprint(e, { collectionSlug: resolveCollectionSlug(e) }))
        .filter(Boolean);

    const byPillar = {};
    const byCollection = {};
    let liveEntries = 0;

    for (const entry of entries) {
        const isLive = entry.status === "live" && entry.visibility === "public";
        if (isLive) liveEntries += 1;
        const pillar = entry.pillar || "unknown";
        byPillar[pillar] = (byPillar[pillar] ?? 0) + 1;
        const slug = resolveCollectionSlug(entry) || entry.type || "unknown";
        byCollection[slug] = (byCollection[slug] ?? 0) + 1;
    }

    let errors = 0;
    let warnings = 0;
    let info = 0;
    for (const i of issues) {
        if (i.severity === OPERATION_SEVERITY.ERROR) errors += 1;
        else if (i.severity === OPERATION_SEVERITY.WARN) warnings += 1;
        else info += 1;
    }

    return Object.freeze({
        totalEntries: entries.length,
        liveEntries,
        errors,
        warnings,
        info,
        issues: Object.freeze(issues),
        footprints: Object.freeze(footprints),
        byPillar: Object.freeze(byPillar),
        byCollection: Object.freeze(byCollection),
    });
}

function severityRank(severity) {
    if (severity === OPERATION_SEVERITY.ERROR) return 0;
    if (severity === OPERATION_SEVERITY.WARN) return 1;
    return 2;
}
