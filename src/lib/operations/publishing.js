// Publishing workflow primitives.
//
// Phase 3.4 — operational layer over the editorial registry. Pure functions
// only: zero React imports, zero DOM coupling, zero new dependencies. Every
// helper here is consumable from a script (Node SSR loader), a future CMS
// adapter, an AI-assisted publishing pipeline, or — eventually — a creator
// console. None of these consume runtime bundle weight; they are operational,
// not visitor-facing.
//
// The shape is the contract: a publishing run produces a `PublishingPlan`
// describing the entry's footprint across the ecosystem (search, sitemap,
// feeds, recommendations, breadcrumbs, JSON-LD, OG, related rails). When the
// platform grows automated publishing, the assistant fills the same shape.

import {
    CONTENT_STATUS,
    CONTENT_VISIBILITY,
    REQUIRED_FIELDS,
    isValidEntry,
} from "../content/schema";
import { isPillarId } from "../content/pillars";
import { isValidTag } from "../content/taxonomy";

/**
 * Severity tiers used by every operations validator. Matches the editorial
 * "fail soft, surface loud" stance: errors block the build; warnings inform
 * the author; info nudges at editorial polish.
 */
export const OPERATION_SEVERITY = Object.freeze({
    ERROR: "error",
    WARN: "warn",
    INFO: "info",
});

const SUMMARY_MIN = 40;
const SUMMARY_MAX = 220;
const TITLE_MAX = 100;

function issue(severity, code, message, context = {}) {
    return Object.freeze({ severity, code, message, ...context });
}

/**
 * validateEntryShape(entry)
 *
 * Strict shape check — same fields the editorial defineCollection() validates
 * but expressed as a structured issue list rather than dev console warnings.
 * Operational tooling (scripts, future console UI, CI) consumes this list.
 */
export function validateEntryShape(entry) {
    const issues = [];

    if (!entry || typeof entry !== "object") {
        return [issue(OPERATION_SEVERITY.ERROR, "shape:not-object", "Entry is not an object.")];
    }

    for (const field of REQUIRED_FIELDS) {
        if (!entry[field]) {
            issues.push(
                issue(
                    OPERATION_SEVERITY.ERROR,
                    "shape:missing-field",
                    `Entry "${entry.id || "?"}" is missing required field "${field}".`,
                    { entryId: entry.id ?? null, field },
                ),
            );
        }
    }

    if (entry.pillar && !isPillarId(entry.pillar)) {
        issues.push(
            issue(
                OPERATION_SEVERITY.ERROR,
                "shape:unknown-pillar",
                `Entry "${entry.id}" references unknown pillar "${entry.pillar}".`,
                { entryId: entry.id, pillar: entry.pillar },
            ),
        );
    }

    if (Array.isArray(entry.tags)) {
        for (const tag of entry.tags) {
            if (!isValidTag(tag)) {
                issues.push(
                    issue(
                        OPERATION_SEVERITY.WARN,
                        "shape:unknown-tag",
                        `Entry "${entry.id}" carries unregistered tag "${tag}".`,
                        { entryId: entry.id, tag },
                    ),
                );
            }
        }
    }

    if (entry.status && !Object.values(CONTENT_STATUS).includes(entry.status)) {
        issues.push(
            issue(
                OPERATION_SEVERITY.ERROR,
                "shape:invalid-status",
                `Entry "${entry.id}" has invalid status "${entry.status}".`,
                { entryId: entry.id, status: entry.status },
            ),
        );
    }

    if (entry.visibility && !Object.values(CONTENT_VISIBILITY).includes(entry.visibility)) {
        issues.push(
            issue(
                OPERATION_SEVERITY.ERROR,
                "shape:invalid-visibility",
                `Entry "${entry.id}" has invalid visibility "${entry.visibility}".`,
                { entryId: entry.id, visibility: entry.visibility },
            ),
        );
    }

    return issues;
}

/**
 * validateEditorialPolish(entry) — softer checks: title length, summary band,
 * presence of related[], ISO date shape, body presence. These are warnings,
 * not errors. They guide the author; they never block publishing.
 */
export function validateEditorialPolish(entry) {
    const issues = [];
    if (!entry) return issues;

    if (typeof entry.title === "string" && entry.title.length > TITLE_MAX) {
        issues.push(
            issue(
                OPERATION_SEVERITY.WARN,
                "polish:title-too-long",
                `Entry "${entry.id}" title is ${entry.title.length} chars (recommended ≤ ${TITLE_MAX}).`,
                { entryId: entry.id, length: entry.title.length },
            ),
        );
    }

    if (typeof entry.summary === "string") {
        if (entry.summary.length < SUMMARY_MIN) {
            issues.push(
                issue(
                    OPERATION_SEVERITY.INFO,
                    "polish:summary-thin",
                    `Entry "${entry.id}" summary is short (${entry.summary.length} chars; ≥ ${SUMMARY_MIN} recommended for OG/feeds).`,
                    { entryId: entry.id, length: entry.summary.length },
                ),
            );
        }
        if (entry.summary.length > SUMMARY_MAX) {
            issues.push(
                issue(
                    OPERATION_SEVERITY.WARN,
                    "polish:summary-long",
                    `Entry "${entry.id}" summary is ${entry.summary.length} chars (≤ ${SUMMARY_MAX} recommended; OG truncates).`,
                    { entryId: entry.id, length: entry.summary.length },
                ),
            );
        }
    }

    if (entry.date && !/^\d{4}-\d{2}-\d{2}$/.test(entry.date)) {
        issues.push(
            issue(
                OPERATION_SEVERITY.WARN,
                "polish:date-format",
                `Entry "${entry.id}" date "${entry.date}" is not ISO 8601 (YYYY-MM-DD).`,
                { entryId: entry.id, date: entry.date },
            ),
        );
    }

    if (!entry.date) {
        issues.push(
            issue(
                OPERATION_SEVERITY.INFO,
                "polish:no-date",
                `Entry "${entry.id}" has no date — sinks to the bottom of every recency sort.`,
                { entryId: entry.id },
            ),
        );
    }

    if (!Array.isArray(entry.related) || entry.related.length === 0) {
        issues.push(
            issue(
                OPERATION_SEVERITY.INFO,
                "polish:no-related",
                `Entry "${entry.id}" lists no related[] — RelatedRail will fall back to same-pillar.`,
                { entryId: entry.id },
            ),
        );
    }

    if (entry.status === CONTENT_STATUS.LIVE && !entry.Body && !entry.href) {
        issues.push(
            issue(
                OPERATION_SEVERITY.WARN,
                "polish:no-body-or-href",
                `Live entry "${entry.id}" has neither Body nor href — readers will land on an empty page.`,
                { entryId: entry.id },
            ),
        );
    }

    return issues;
}

/**
 * derivePublicationFootprint(entry, { collectionSlug })
 *
 * Reports every surface that hydrates from a single entry. This is the
 * editorial-side reflection of §12.3 of the contract: "The platform publishes
 * itself." When the assistant lands, this footprint is what it will preview
 * to the author before the entry merges.
 */
export function derivePublicationFootprint(entry, { collectionSlug } = {}) {
    if (!isValidEntry(entry)) return null;
    const slug = collectionSlug || null;
    const live = entry.status === CONTENT_STATUS.LIVE && entry.visibility === CONTENT_VISIBILITY.PUBLIC;

    const surfaces = [];
    if (live && slug) {
        surfaces.push({ kind: "route", path: `/content/${slug}/${entry.slug}` });
        surfaces.push({ kind: "collection-landing", path: `/content/${slug}` });
    }
    if (live) {
        surfaces.push({ kind: "search-index", path: "Cmd+K corpus" });
        surfaces.push({ kind: "recommendation-graph", path: "RelatedRail / whatsNext" });
        surfaces.push({ kind: "sitemap", path: "/sitemap.xml" });
        surfaces.push({ kind: "feed", path: `/feeds/${slug || "all"}.xml` });
        surfaces.push({ kind: "feed", path: `/feeds/${slug || "all"}.atom.xml` });
        surfaces.push({ kind: "feed", path: `/feeds/${slug || "all"}.json` });
        surfaces.push({ kind: "feed-global", path: "/feeds/all.xml" });
        surfaces.push({ kind: "json-ld", path: "BreadcrumbList + Article|TechArticle|HowTo" });
        surfaces.push({ kind: "open-graph", path: "og:title / og:description / og:image" });
        surfaces.push({ kind: "ecosystem-graph", path: "pillar-affinity propagation" });
    }

    return Object.freeze({
        entryId: entry.id,
        type: entry.type,
        pillar: entry.pillar,
        live,
        surfaces: Object.freeze(surfaces),
    });
}

/**
 * derivePublishingPlan({ entry, collectionSlug })
 *
 * One-shot: validate + polish + footprint. The single integration point an
 * authoring tool, an AI agent, or a CI step calls before merge. Returns:
 *   { entry, ok, issues, footprint }
 */
export function derivePublishingPlan({ entry, collectionSlug } = {}) {
    const shapeIssues = validateEntryShape(entry);
    const polishIssues = validateEditorialPolish(entry);
    const issues = [...shapeIssues, ...polishIssues];
    const ok = !issues.some((i) => i.severity === OPERATION_SEVERITY.ERROR);
    return Object.freeze({
        entry,
        ok,
        issues: Object.freeze(issues),
        footprint: derivePublicationFootprint(entry, { collectionSlug }),
    });
}
