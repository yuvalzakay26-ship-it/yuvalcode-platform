// Content authoring helpers.
//
// Pure string utilities the authoring tools (and a future creator console)
// use to scaffold new entries. Zero React, zero Node — runs anywhere.
//
// "Filesystem-native publishing" (§12.2): a new entry is one .jsx file +
// one import in collections.js. These helpers generate the .jsx skeleton
// that the operator drops in place, then edits the Body inline. We never
// write the file from JS; we hand the operator the string and let them
// paste it. That keeps the contract honest — files are still the medium.

const SLUG_RE = /[^a-z0-9]+/g;
const TRIM_DASH = /^-+|-+$/g;

/**
 * slugify(input) — kebab-case, ASCII, lowercase. Mirrors the slug shape used
 * across the existing registry. Hebrew input falls back to a transliteration
 * skeleton (`hebrew-content`) so the author never gets an empty string.
 */
export function slugify(input) {
    if (typeof input !== "string") return "";
    const lowered = input.toLowerCase().trim();
    const normalized = lowered.normalize("NFKD").replace(/[̀-ͯ]/g, "");
    // eslint-disable-next-line no-control-regex
    const ascii = normalized.replace(/[^\x00-\x7f]/g, "");
    const slug = ascii.replace(SLUG_RE, "-").replace(TRIM_DASH, "");
    return slug || "hebrew-content";
}

/**
 * Today's date in YYYY-MM-DD (UTC). Inputs accepted for testing override.
 */
export function todayIso(now = new Date()) {
    return now.toISOString().slice(0, 10);
}

/**
 * composeFrontmatter({ id, slug, type, pillar, title, summary, ... })
 *
 * Returns a JS object literal — the `entry` shape — formatted as a string
 * the author can paste into a new module. Defaults match the editorial
 * contract.
 */
export function composeFrontmatter({
    id,
    slug,
    type,
    pillar,
    title,
    summary,
    eyebrow = null,
    tags = [],
    related = [],
    date = todayIso(),
    readingMinutes = null,
    href = null,
    typeConst = "CONTENT_TYPES.ARTICLE",
} = {}) {
    if (!id || !slug || !type || !pillar || !title || !summary) {
        throw new Error("composeFrontmatter requires id, slug, type, pillar, title, summary.");
    }
    const lines = [
        "export const entry = {",
        `    id: ${quote(id)},`,
        `    slug: ${quote(slug)},`,
        `    type: ${typeConst},`,
        `    pillar: ${quote(pillar)},`,
        `    title: ${quote(title)},`,
        `    summary: ${quote(summary)},`,
        eyebrow ? `    eyebrow: ${quote(eyebrow)},` : null,
        `    tags: ${formatList(tags)},`,
        `    status: "live",`,
        `    visibility: "public",`,
        `    date: ${quote(date)},`,
        href ? `    href: ${quote(href)},` : null,
        `    related: ${formatList(related)},`,
        readingMinutes ? `    readingMinutes: ${readingMinutes},` : null,
        "    Body,",
        "};",
    ].filter(Boolean);
    return lines.join("\n");
}

/**
 * composeEntrySkeleton({ collection, id, ... }) — full file body for a new
 * editorial entry, ready to paste at src/content/<collection>/<slug>.jsx.
 * Intentionally minimal Body — author owns the substance.
 */
export function composeEntrySkeleton({
    collection,
    id,
    slug,
    pillar,
    title,
    summary,
    eyebrow = null,
    tags = [],
    related = [],
    date = todayIso(),
    typeImport = "CONTENT_TYPES.ARTICLE",
    type,
} = {}) {
    if (!collection || !type) throw new Error("composeEntrySkeleton requires { collection, type }.");
    const frontmatter = composeFrontmatter({
        id,
        slug,
        type,
        pillar,
        title,
        summary,
        eyebrow,
        tags,
        related,
        date,
        typeConst: typeImport,
    });
    return [
        `import { Callout } from "../../components/editorial/Callout";`,
        `import { CONTENT_TYPES } from "../../lib/content/schema";`,
        ``,
        frontmatter,
        ``,
        `function Body() {`,
        `    return (`,
        `        <>`,
        `            <p>${escapeJsx(summary)}</p>`,
        ``,
        `            <Callout variant="note" title="הערת עורך.">`,
        `                {/* החלף בתוכן אמיתי. הקריאה האדיטוריאלית היא ה-PR review. */}`,
        `            </Callout>`,
        ``,
        `            <h2>נקודות מפתח</h2>`,
        `            <ul>`,
        `                <li>...</li>`,
        `            </ul>`,
        `        </>`,
        `    );`,
        `}`,
        ``,
    ].join("\n");
}

/**
 * registryImportLine({ collection, varName, slug }) — the one-line addition
 * for src/content/collections.js. Operator pastes once; the registry picks
 * the entry up on next build.
 */
export function registryImportLine({ collection, varName, slug }) {
    if (!collection || !varName || !slug) {
        throw new Error("registryImportLine requires { collection, varName, slug }.");
    }
    return `import { entry as ${varName} } from "./${collection}/${slug}";`;
}

function quote(s) {
    return JSON.stringify(String(s));
}

function formatList(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return "[]";
    return `[${arr.map(quote).join(", ")}]`;
}

function escapeJsx(s) {
    if (typeof s !== "string") return "";
    return s.replace(/[<>{}]/g, (c) => `{${JSON.stringify(c)}}`);
}
