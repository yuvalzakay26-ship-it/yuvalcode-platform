// Canonical distribution-route registry.
//
// Every distribution surface — sitemap, feeds, schema, metadata, OG —
// derives from this single source of truth. Adding a route is one entry.
// Adding a collection is one entry that enables sitemap rows, an RSS feed,
// breadcrumbs, schema generators, and metadata derivation in lockstep.
//
// The registry is route-aware (a static surface map) AND collection-aware
// (it knows how to expand a collection slug into its dynamic entries via the
// editorial layer). Build-time generators read this file as the schema for
// what the platform exposes to the outside world.

import { EDITORIAL_COLLECTIONS } from "../editorial/collections-config";

// Canonical surface taxonomy — every URL the platform exposes belongs to one.
export const SURFACE_KIND = Object.freeze({
    HUB: "hub",                 // top-level destination (Home, Content, AI, ...)
    COLLECTION: "collection",   // editorial collection landing (/content/articles)
    ENTRY: "entry",             // editorial entry (/content/articles/<slug>)
    CATALOG: "catalog",         // catalog/listing (Exams, Videos)
    SYSTEM: "system",           // privacy/terms/legal — system pages
    ACTION: "action",           // deep-link action (newsletter signup, etc)
});

// Update-frequency tokens — sitemap.xml-shaped, but we use them across feeds
// as well so consumers can show "last updated weekly" labels uniformly.
export const UPDATE_FREQ = Object.freeze({
    ALWAYS: "always",
    HOURLY: "hourly",
    DAILY: "daily",
    WEEKLY: "weekly",
    MONTHLY: "monthly",
    YEARLY: "yearly",
    NEVER: "never",
});

/**
 * Static surface registry — every top-level route the platform exposes.
 *
 * Each row is the *contract* for a sitemap entry, a metadata derivation,
 * a JSON-LD scope, and (where applicable) an RSS feed link tag.
 *
 *   path           : URL path, leading slash, no host.
 *   kind           : SURFACE_KIND.
 *   priority       : sitemap priority (0.0 - 1.0).
 *   changefreq     : sitemap update frequency.
 *   schemaType     : JSON-LD schema.org type for this surface.
 *   feedSlug       : if set, this surface advertises a sibling RSS feed at
 *                    /feeds/<feedSlug>.xml (used by the <link rel="alternate"> tag).
 *   indexable      : if false, page is excluded from sitemap and feeds.
 *   title          : default title (overridable per-route).
 *   description    : default description (overridable per-route).
 *   eyebrow        : optional Latin-mono surface label.
 */
export const SURFACES = Object.freeze([
    {
        path: "/",
        kind: SURFACE_KIND.HUB,
        priority: 1.0,
        changefreq: UPDATE_FREQ.WEEKLY,
        schemaType: "WebSite",
        feedSlug: "all",
        indexable: true,
        eyebrow: "Home",
    },
    {
        path: "/content",
        kind: SURFACE_KIND.HUB,
        priority: 0.9,
        changefreq: UPDATE_FREQ.WEEKLY,
        schemaType: "CollectionPage",
        feedSlug: "all",
        indexable: true,
        eyebrow: "Content",
    },
    {
        path: "/ai",
        kind: SURFACE_KIND.HUB,
        priority: 0.85,
        changefreq: UPDATE_FREQ.WEEKLY,
        schemaType: "CollectionPage",
        feedSlug: "ai-experiments",
        indexable: true,
        eyebrow: "AI Track",
    },
    {
        path: "/projects",
        kind: SURFACE_KIND.HUB,
        priority: 0.85,
        changefreq: UPDATE_FREQ.WEEKLY,
        schemaType: "CollectionPage",
        feedSlug: "case-studies",
        indexable: true,
        eyebrow: "Projects",
    },
    {
        path: "/stack",
        kind: SURFACE_KIND.HUB,
        priority: 0.85,
        changefreq: UPDATE_FREQ.WEEKLY,
        schemaType: "CollectionPage",
        feedSlug: "workflows",
        indexable: true,
        eyebrow: "Stack",
    },
    {
        path: "/work-with-me",
        kind: SURFACE_KIND.HUB,
        priority: 0.8,
        changefreq: UPDATE_FREQ.MONTHLY,
        schemaType: "ContactPage",
        indexable: true,
        eyebrow: "Work With Me",
    },
    {
        path: "/exams",
        kind: SURFACE_KIND.CATALOG,
        priority: 0.9,
        changefreq: UPDATE_FREQ.WEEKLY,
        schemaType: "CollectionPage",
        indexable: true,
        eyebrow: "Mahat",
    },
    {
        path: "/videos",
        kind: SURFACE_KIND.CATALOG,
        priority: 0.8,
        changefreq: UPDATE_FREQ.WEEKLY,
        schemaType: "CollectionPage",
        indexable: true,
        eyebrow: "Videos",
    },
    {
        path: "/about",
        kind: SURFACE_KIND.HUB,
        priority: 0.6,
        changefreq: UPDATE_FREQ.MONTHLY,
        schemaType: "AboutPage",
        indexable: true,
        eyebrow: "About",
    },
    {
        path: "/contact",
        kind: SURFACE_KIND.HUB,
        priority: 0.6,
        changefreq: UPDATE_FREQ.MONTHLY,
        schemaType: "ContactPage",
        indexable: true,
        eyebrow: "Contact",
    },
    {
        path: "/privacy",
        kind: SURFACE_KIND.SYSTEM,
        priority: 0.2,
        changefreq: UPDATE_FREQ.YEARLY,
        schemaType: "WebPage",
        indexable: true,
        eyebrow: "Privacy",
    },
    {
        path: "/terms",
        kind: SURFACE_KIND.SYSTEM,
        priority: 0.2,
        changefreq: UPDATE_FREQ.YEARLY,
        schemaType: "WebPage",
        indexable: true,
        eyebrow: "Terms",
    },
]);

const SURFACES_BY_PATH = new Map(SURFACES.map((s) => [s.path, s]));

export function getSurface(path) {
    if (!path) return null;
    // Strip query / hash before lookup
    const clean = path.split("?")[0].split("#")[0];
    return SURFACES_BY_PATH.get(clean) || null;
}

/**
 * Editorial collection surfaces — derived from EDITORIAL_COLLECTIONS so the
 * registry stays one source of truth. Every collection landing is a sitemap
 * row, a feed candidate, and a schema-typed CollectionPage.
 */
export function getCollectionSurfaces() {
    return EDITORIAL_COLLECTIONS.map((c) => ({
        path: `/content/${c.slug}`,
        kind: SURFACE_KIND.COLLECTION,
        priority: 0.85,
        changefreq: UPDATE_FREQ.WEEKLY,
        schemaType: "CollectionPage",
        feedSlug: c.slug,
        indexable: true,
        eyebrow: c.labelEn,
        config: c,
    }));
}

/**
 * Returns the canonical sitemap surface list — static surfaces + collection
 * landings — without expanding entries (which are handled separately so that
 * generators can choose lastmod dates per entry).
 */
export function getStaticSurfaces() {
    return [...SURFACES, ...getCollectionSurfaces()].filter((s) => s.indexable !== false);
}

/**
 * Returns the routes that publish a feed. Every editorial collection publishes
 * a feed; the global feed (`all`) aggregates everything. Hubs may *advertise*
 * a feed via `feedSlug` but do not publish their own — they reuse the
 * collection feed they thematically point to.
 */
export function getFeedSlugs() {
    const slugs = new Set(["all"]);
    for (const c of EDITORIAL_COLLECTIONS) slugs.add(c.slug);
    return [...slugs];
}

/**
 * Resolves a feed slug back to its editorial collection config (or null when
 * the slug is the global "all").
 */
export function getCollectionForFeedSlug(slug) {
    if (slug === "all") return null;
    return EDITORIAL_COLLECTIONS.find((c) => c.slug === slug) || null;
}
