// JSON-LD schema generators.
//
// Reusable, composable schema builders for every surface kind on the
// platform. Each generator accepts a small input shape and returns a plain
// object ready to JSON.stringify into a <script type="application/ld+json">.
//
// Builders are pure: same input → same output. They never reach into runtime
// state, so they can be called from build scripts (sitemap generator,
// pre-rendering, etc.) as well as from the React layer via PageMeta.

import { SITE } from "../constants";

const ORG = Object.freeze({
    "@type": "Organization",
    "name": SITE.name,
    "url": SITE.url,
    "logo": {
        "@type": "ImageObject",
        "url": `${SITE.url}/og-image.png`,
    },
});

const PERSON = Object.freeze({
    "@type": "Person",
    "name": SITE.name,
    "alternateName": "יובל זכאי",
    "url": SITE.url,
    "jobTitle": "Software Educator · Learning & Building with AI in Public",
    ...(SITE.youtubeChannelUrl ? { "sameAs": [SITE.youtubeChannelUrl].filter(Boolean) } : {}),
});

function asAbsolute(url) {
    if (!url) return SITE.url;
    if (url.startsWith("http")) return url;
    if (url.startsWith("/")) return `${SITE.url}${url}`;
    return `${SITE.url}/${url}`;
}

function omitEmpty(obj) {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
        if (v === null || v === undefined) continue;
        if (Array.isArray(v) && v.length === 0) continue;
        if (typeof v === "string" && v.length === 0) continue;
        out[k] = v;
    }
    return out;
}

// ---------------------------------------------------------------------------
// Foundational graphs
// ---------------------------------------------------------------------------

export function buildWebSiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": SITE.name,
        "alternateName": SITE.educationBrand,
        "url": SITE.url,
        "inLanguage": "he-IL",
        "publisher": PERSON,
    };
}

export function buildOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        ...ORG,
        "founder": PERSON,
        "sameAs": [SITE.youtubeChannelUrl, SITE.githubUrl, SITE.linkedinUrl].filter(Boolean),
    };
}

export function buildPersonSchema() {
    return {
        "@context": "https://schema.org",
        ...PERSON,
        "sameAs": [SITE.youtubeChannelUrl, SITE.githubUrl, SITE.linkedinUrl].filter(Boolean),
    };
}

// ---------------------------------------------------------------------------
// Breadcrumbs
// ---------------------------------------------------------------------------

export function buildBreadcrumbList(breadcrumbs) {
    if (!Array.isArray(breadcrumbs) || breadcrumbs.length === 0) return null;
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((b, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": b.name,
            "item": asAbsolute(b.path),
        })),
    };
}

// ---------------------------------------------------------------------------
// CollectionPage / WebPage / AboutPage / ContactPage
// ---------------------------------------------------------------------------

export function buildWebPageSchema({ type = "WebPage", path, title, description, breadcrumbs }) {
    const breadcrumbBlock = buildBreadcrumbList(breadcrumbs);
    return omitEmpty({
        "@context": "https://schema.org",
        "@type": type,
        "name": title,
        "description": description,
        "url": asAbsolute(path),
        "inLanguage": "he-IL",
        "isPartOf": {
            "@type": "WebSite",
            "name": SITE.name,
            "url": SITE.url,
        },
        "publisher": ORG,
        "breadcrumb": breadcrumbBlock || undefined,
    });
}

export function buildCollectionPageSchema({
    path,
    title,
    description,
    breadcrumbs,
    about,
    hasPart,
}) {
    const breadcrumbBlock = buildBreadcrumbList(breadcrumbs);
    return omitEmpty({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": title,
        "description": description,
        "url": asAbsolute(path),
        "inLanguage": "he-IL",
        "about": Array.isArray(about) ? about : undefined,
        "hasPart": Array.isArray(hasPart) ? hasPart : undefined,
        "isPartOf": {
            "@type": "WebSite",
            "name": SITE.name,
            "url": SITE.url,
        },
        "publisher": ORG,
        "breadcrumb": breadcrumbBlock || undefined,
    });
}

// ---------------------------------------------------------------------------
// Article / TechArticle / BlogPosting / HowTo
// ---------------------------------------------------------------------------

/**
 * Build an Article (or subtype) schema for a content entry.
 *
 * @param entry  — content collection entry (schema.js shape)
 * @param config — editorial collection config (schemaType lives here)
 */
export function buildArticleSchema(entry, config) {
    if (!entry) return null;
    const collectionConfig = config || null;
    const schemaType = collectionConfig?.schemaType || "Article";
    const path = entry.href || (collectionConfig
        ? `/content/${collectionConfig.slug}/${entry.slug}`
        : `/content/${entry.slug}`);

    return omitEmpty({
        "@context": "https://schema.org",
        "@type": schemaType,
        "headline": entry.title,
        "alternativeHeadline": entry.eyebrow || undefined,
        "description": entry.summary,
        "inLanguage": "he-IL",
        "url": asAbsolute(path),
        "datePublished": entry.date || undefined,
        "dateModified": entry.updatedAt || entry.date || undefined,
        "author": PERSON,
        "publisher": ORG,
        "mainEntityOfPage": asAbsolute(path),
        "keywords": Array.isArray(entry.tags) && entry.tags.length > 0
            ? entry.tags.join(", ")
            : undefined,
        "articleSection": collectionConfig?.labelEn || undefined,
        "image": entry.coverImage ? asAbsolute(entry.coverImage) : `${SITE.url}/og-image.png`,
        "wordCount": entry.wordCount || undefined,
        "isPartOf": collectionConfig
            ? {
                "@type": "CollectionPage",
                "name": `${collectionConfig.labelEn} · ${SITE.name}`,
                "url": `${SITE.url}/content/${collectionConfig.slug}`,
            }
            : undefined,
    });
}

/**
 * Build a CreativeWork schema describing a relationship — used when the
 * canonical type is something other than Article (e.g. SoftwareSourceCode,
 * VideoObject) and the entry needs to be expressed as a creative work.
 */
export function buildCreativeWorkSchema({ name, description, url, datePublished, keywords }) {
    return omitEmpty({
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": name,
        "description": description,
        "url": asAbsolute(url),
        "datePublished": datePublished || undefined,
        "inLanguage": "he-IL",
        "creator": PERSON,
        "publisher": ORG,
        "keywords": keywords || undefined,
    });
}

// ---------------------------------------------------------------------------
// Helpers for converting a list of entries into a hasPart array.
// ---------------------------------------------------------------------------

export function entriesToHasPart(entries, config) {
    if (!Array.isArray(entries)) return [];
    return entries.map((entry) =>
        omitEmpty({
            "@type": config?.schemaType || "Article",
            "headline": entry.title,
            "description": entry.summary,
            "datePublished": entry.date || undefined,
            "url": asAbsolute(
                entry.href || `/content/${config?.slug || ""}/${entry.slug}`,
            ),
        }),
    );
}
