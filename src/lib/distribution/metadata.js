// Advanced metadata automation.
//
// Single helper: `derivePageMeta(input)` — given a route path (and optional
// content entry, breadcrumbs, overrides), returns the *full* PageMeta props
// shape. Replaces the per-page boilerplate of "compose canonical, breadcrumb
// list, JSON-LD, OG image, feed link tag" with one call.
//
// The helper is route-aware (reads from the distribution registry) and
// collection-aware (resolves the editorial collection config when a content
// entry is passed). Pages stay opinionated about *what* they render; this
// helper stays opinionated about *how the metadata is shaped*.

import { SITE } from "../constants";
import { getSurface, getCollectionForFeedSlug, getFeedSlugs } from "./routes";
import {
    buildArticleSchema,
    buildBreadcrumbList,
    buildCollectionPageSchema,
    buildWebPageSchema,
    buildWebSiteSchema,
} from "./schema";
import { resolveOpenGraph, resolveArticleOgMeta } from "./og";
import { resolveReadingMinutes } from "../editorial/reading-time";
import { EDITORIAL_COLLECTIONS } from "../editorial/collections-config";

const DEFAULT_DESCRIPTION =
    "יובל זכאי — מורה לתכנות ויוצר תוכן ישראלי. לומד ובונה עם AI בפומבי, מלמד תכנות אמיתי, ומתעד את המסע לעולם הפיתוח של 2026 ואילך.";

/**
 * derivePageMeta — derive the full PageMeta props for a route or entry.
 *
 *   path        : surface path (e.g. "/", "/ai", "/content/articles")
 *   entry       : optional content entry (for collection-entry routes)
 *   collectionSlug : optional collection slug (when path is /content/<slug>)
 *   title       : explicit override
 *   description : explicit override
 *   image       : explicit OG image override
 *   breadcrumbs : explicit breadcrumb list
 *   noindex     : robots noindex flag
 *   keywords    : array of keywords (joined into the meta keywords field)
 *   pillar      : pillar id for schema enrichment
 *   schema      : extra JSON-LD blocks to merge with the auto-derived ones
 *
 * Returns:
 *   { title, description, image, path, jsonLd, breadcrumbs, noindex,
 *     feedHref, feedTitle, articleMeta, keywords, canonical, og }
 */
export function derivePageMeta(input = {}) {
    const {
        path,
        entry = null,
        collectionSlug: collectionSlugInput = null,
        title: titleOverride,
        description: descriptionOverride,
        image: imageOverride,
        breadcrumbs: breadcrumbsOverride,
        noindex,
        keywords: keywordsOverride,
        pillar: pillarOverride,
        schema: schemaExtras,
    } = input;

    const surface = path ? getSurface(path) : null;

    // Resolve collection config for editorial entries / collection landings.
    const collectionConfig = entry
        ? EDITORIAL_COLLECTIONS.find((c) => c.type === entry.type) || null
        : (collectionSlugInput
            ? EDITORIAL_COLLECTIONS.find((c) => c.slug === collectionSlugInput) || null
            : null);

    // Title resolution — entry > override > surface eyebrow.
    const baseTitle = entry?.title
        || titleOverride
        || (collectionConfig ? `${collectionConfig.labelEn} · Content` : null)
        || surface?.eyebrow
        || null;

    const description = descriptionOverride
        || entry?.summary
        || (collectionConfig ? `${collectionConfig.labelHe} — ${collectionConfig.tagline}` : null)
        || DEFAULT_DESCRIPTION;

    // Breadcrumbs — derive automatically when not provided.
    const breadcrumbs = breadcrumbsOverride
        || autoBreadcrumbs({ path, entry, collectionConfig });

    const og = resolveOpenGraph({
        route: path,
        entry,
        image: imageOverride,
    });

    const articleMeta = entry ? resolveArticleOgMeta(entry) : null;

    // Feed advertisement — if the surface (or its collection) has a feedSlug,
    // we expose <link rel="alternate" type="application/rss+xml"> hints.
    const feedSlug = collectionConfig?.slug
        || surface?.feedSlug
        || null;
    const feedDescriptors = feedSlug ? buildFeedAdvertisements(feedSlug) : [];

    // Keywords — merged from explicit override + entry tags + pillar.
    const keywords = mergeKeywords({ keywordsOverride, entry, pillarOverride });

    // JSON-LD — auto-derive base schema for the surface kind, then merge any
    // explicit schema extras.
    const autoSchema = autoJsonLd({
        path,
        surface,
        entry,
        collectionConfig,
        breadcrumbs,
        title: baseTitle,
        description,
    });
    const jsonLd = mergeJsonLd(autoSchema, schemaExtras);

    return Object.freeze({
        title: baseTitle,
        description,
        image: og.image,
        ogAlt: og.alt,
        ogType: og.type,
        twitterCard: og.twitterCard,
        path,
        jsonLd,
        breadcrumbs,
        noindex: !!noindex,
        feeds: feedDescriptors,
        articleMeta,
        keywords,
        readingMinutes: entry ? resolveReadingMinutes(entry) : null,
        canonical: path ? `${SITE.url}${path}` : SITE.url,
        publication: buildPublicationMeta(entry, collectionConfig),
    });
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function autoBreadcrumbs({ path, entry, collectionConfig }) {
    if (!path) return null;
    if (path === "/") return null;
    const trail = [{ name: "בית", path: "/" }];

    if (entry && collectionConfig) {
        trail.push({ name: "Content", path: "/content" });
        trail.push({
            name: collectionConfig.labelEn,
            path: `/content/${collectionConfig.slug}`,
        });
        trail.push({
            name: entry.title,
            path: `/content/${collectionConfig.slug}/${entry.slug}`,
        });
        return trail;
    }

    if (collectionConfig) {
        trail.push({ name: "Content", path: "/content" });
        trail.push({
            name: collectionConfig.labelEn,
            path: `/content/${collectionConfig.slug}`,
        });
        return trail;
    }

    // Generic fallback — derive from path segments.
    const segments = path.split("/").filter(Boolean);
    let acc = "";
    for (const seg of segments) {
        acc += `/${seg}`;
        trail.push({
            name: prettifySegment(seg),
            path: acc,
        });
    }
    return trail;
}

function prettifySegment(seg) {
    if (!seg) return "";
    if (seg.length <= 4) return seg.toUpperCase();
    return seg
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function autoJsonLd({ path, surface, entry, collectionConfig, breadcrumbs, title, description }) {
    const out = [];
    const breadcrumbBlock = buildBreadcrumbList(breadcrumbs);
    if (breadcrumbBlock) out.push(breadcrumbBlock);

    if (entry && collectionConfig) {
        const article = buildArticleSchema(entry, collectionConfig);
        if (article) out.push(article);
        return out;
    }

    if (collectionConfig) {
        const collection = buildCollectionPageSchema({
            path,
            title,
            description,
            breadcrumbs,
        });
        if (collection) out.push(collection);
        return out;
    }

    if (path === "/") {
        out.push(buildWebSiteSchema());
        return out;
    }

    if (surface?.schemaType) {
        const generic = buildWebPageSchema({
            type: surface.schemaType === "WebPage"
                ? "WebPage"
                : surface.schemaType,
            path,
            title,
            description,
            breadcrumbs,
        });
        if (generic) out.push(generic);
    }

    return out;
}

function mergeJsonLd(autoBlocks, extras) {
    const combined = [...autoBlocks];
    if (!extras) return combined;
    if (Array.isArray(extras)) {
        for (const e of extras) if (e) combined.push(e);
    } else {
        combined.push(extras);
    }
    return combined;
}

function buildFeedAdvertisements(feedSlug) {
    const slugs = getFeedSlugs();
    if (!slugs.includes(feedSlug)) return [];
    const config = getCollectionForFeedSlug(feedSlug);
    const baseTitle = config
        ? `${config.labelEn} — ${SITE.name}`
        : `${SITE.name} — Editorial`;
    return [
        {
            rel: "alternate",
            type: "application/rss+xml",
            href: `${SITE.url}/feeds/${feedSlug}.xml`,
            title: `${baseTitle} (RSS)`,
        },
        {
            rel: "alternate",
            type: "application/atom+xml",
            href: `${SITE.url}/feeds/${feedSlug}.atom.xml`,
            title: `${baseTitle} (Atom)`,
        },
        {
            rel: "alternate",
            type: "application/feed+json",
            href: `${SITE.url}/feeds/${feedSlug}.json`,
            title: `${baseTitle} (JSON Feed)`,
        },
    ];
}

function mergeKeywords({ keywordsOverride, entry, pillarOverride }) {
    const out = new Set();
    const push = (value) => {
        if (value === null || value === undefined) return;
        if (Array.isArray(value)) value.forEach(push);
        else out.add(String(value).trim());
    };
    push(keywordsOverride);
    if (entry) {
        push(entry.tags);
        push(entry.pillar);
        push(entry.eyebrow);
    }
    push(pillarOverride);
    return [...out].filter(Boolean);
}

function buildPublicationMeta(entry, collectionConfig) {
    if (!entry) return null;
    return Object.freeze({
        author: SITE.name,
        publisher: SITE.name,
        publishedTime: entry.date || null,
        modifiedTime: entry.updatedAt || entry.date || null,
        section: collectionConfig?.labelEn || entry.eyebrow || null,
        tags: Array.isArray(entry.tags) ? entry.tags : [],
        pillar: entry.pillar || null,
        wordCount: entry.wordCount || null,
        readingMinutes: resolveReadingMinutes(entry),
    });
}
