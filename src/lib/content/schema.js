// Content frontmatter contract.
//
// Every entry in src/content/ — regardless of collection — conforms to this shape.
// MDX or remote sources will be normalized into this shape at build time when they ship.
// The schema is deliberately minimal: enough to render, link, search, and rank;
// not enough to lock the editorial layer into one CMS.

export const CONTENT_TYPES = Object.freeze({
    ARTICLE: "article",
    CASE_STUDY: "case-study",
    AI_EXPERIMENT: "ai-experiment",
    WORKFLOW: "workflow",
    CHANGELOG: "changelog",
    NEWSLETTER: "newsletter",
    RESEARCH_NOTE: "research-note",
});

export const CONTENT_STATUS = Object.freeze({
    DRAFT: "draft",
    LIVE: "live",
    ARCHIVED: "archived",
});

export const CONTENT_VISIBILITY = Object.freeze({
    PUBLIC: "public",
    UNLISTED: "unlisted",
    PRIVATE: "private",
});

/**
 * Reference shape: every collection entry MUST include these fields.
 *
 *   id        — stable, slug-shaped (kebab-case, ASCII, lowercase). Never reused.
 *   slug      — URL-safe; usually equal to id; may differ if the route is nested.
 *   type      — one of CONTENT_TYPES.
 *   pillar    — canonical pillar id from taxonomy.js (one of eight).
 *   title     — Hebrew-first display title.
 *   summary   — one-line description; used in search + recommendations + meta.
 *   tags      — array of taxonomy tag ids (free-form within taxonomy registry).
 *   status    — one of CONTENT_STATUS.
 *   date      — ISO 8601 (YYYY-MM-DD). Used for sort + recency scoring.
 *   href      — canonical destination (may be internal route or YouTube URL).
 *   related   — array of other entry ids; powers the recommendation graph.
 *
 *   visibility, eyebrow, body, coverImage, externalSource — all optional.
 *
 * Validation is intentionally loose at the runtime layer: collections may
 * carry richer fields. The contract is "every entry has at minimum these".
 */
export const REQUIRED_FIELDS = Object.freeze([
    "id",
    "slug",
    "type",
    "pillar",
    "title",
    "summary",
    "status",
]);

export function isValidEntry(entry) {
    if (!entry || typeof entry !== "object") return false;
    return REQUIRED_FIELDS.every((field) => Boolean(entry[field]));
}
