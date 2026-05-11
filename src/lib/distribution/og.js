// OpenGraph / social-card pipeline.
//
// The pipeline is split into two layers:
//
//   1. RESOLUTION  (this file) — for any route or entry, resolve the canonical
//      OG image URL, alt text, OG type, and Twitter card type. The resolution
//      logic prefers a route-specific image when authored, falls back to a
//      collection-typed default, and ultimately to the global brand asset.
//
//   2. RENDERING   (`scripts/distribution/og-render.mjs`, future) — where the
//      images themselves come from. v1 ships a single static asset
//      (`/og-image.png`). v2 hooks into a real image renderer (Satori,
//      `@vercel/og`, or a Cloudinary/Imgix template) without changing the
//      consumers — every consumer reads the resolved URL from this module,
//      not from a hardcoded path.
//
// The shape of `resolveOpenGraph()` is the contract a future renderer must
// satisfy. Today it returns static URLs. Tomorrow it returns
// `https://og.yuvalcode.co.il/<route|entry>.png` or a build-time
// pre-rendered file under `/og/<slug>.png`. Consumers stay unchanged.

import { SITE } from "../constants";
import { EDITORIAL_COLLECTIONS } from "../editorial/collections-config";

const FALLBACK_IMAGE = `${SITE.url}/og-image.png`;
const FALLBACK_ALT = `${SITE.name} — ${SITE.roleHe}`;

// Per-collection OG image overrides — when a real renderer ships these can
// land at /og/<slug>.png. Until then every collection inherits the brand fallback.
// This map is the *contract* — extending it does not require touching the
// page composers.
const COLLECTION_OG_OVERRIDES = Object.freeze({
    // articles:        `${SITE.url}/og/articles.png`,
    // "ai-experiments": `${SITE.url}/og/ai-experiments.png`,
});

const ROUTE_OG_OVERRIDES = Object.freeze({
    // "/ai":     `${SITE.url}/og/ai.png`,
    // "/projects": `${SITE.url}/og/projects.png`,
});

/**
 * Resolve the canonical OG metadata for a route OR a content entry.
 *
 *   route    — surface path (e.g. "/", "/ai", "/content/articles")
 *   entry    — optional content entry (overrides route-level resolution)
 *   image    — explicit override; wins above all
 *
 * Returns:
 *   { image, alt, type, twitterCard }
 *
 * `type` is one of "website" | "article" | "profile" — used in <meta property="og:type">.
 * `twitterCard` is "summary_large_image" today; the architecture allows
 * `summary` for compact entries when authored.
 */
export function resolveOpenGraph({ route, entry, image, alt } = {}) {
    let resolvedImage = image;
    let resolvedAlt = alt;
    let type = "website";
    const twitterCard = "summary_large_image";

    if (entry) {
        type = "article";
        if (!resolvedImage && entry.coverImage) {
            resolvedImage = absolutize(entry.coverImage);
        }
        if (!resolvedImage) {
            const config = EDITORIAL_COLLECTIONS.find((c) => c.type === entry.type);
            if (config && COLLECTION_OG_OVERRIDES[config.slug]) {
                resolvedImage = COLLECTION_OG_OVERRIDES[config.slug];
            }
        }
        if (!resolvedAlt) {
            resolvedAlt = entry.summary || entry.title || FALLBACK_ALT;
        }
    }

    if (!resolvedImage && route) {
        if (ROUTE_OG_OVERRIDES[route]) resolvedImage = ROUTE_OG_OVERRIDES[route];
    }

    if (!resolvedImage) resolvedImage = FALLBACK_IMAGE;
    if (!resolvedAlt) resolvedAlt = FALLBACK_ALT;

    return Object.freeze({
        image: absolutize(resolvedImage),
        alt: resolvedAlt,
        type,
        twitterCard,
    });
}

function absolutize(url) {
    if (!url) return FALLBACK_IMAGE;
    if (url.startsWith("http")) return url;
    if (url.startsWith("/")) return `${SITE.url}${url}`;
    return `${SITE.url}/${url}`;
}

/**
 * Resolve the article-typed OG metadata block — used by ContentEntry pages
 * to emit `og:type=article` along with article-specific fields. Returned
 * shape is consumed verbatim by `<PageMeta articleMeta={...}>`.
 */
export function resolveArticleOgMeta(entry) {
    if (!entry) return null;
    return Object.freeze({
        publishedTime: entry.date || null,
        modifiedTime: entry.updatedAt || entry.date || null,
        author: SITE.name,
        section: entry.eyebrow || null,
        tags: Array.isArray(entry.tags) ? entry.tags : [],
    });
}
