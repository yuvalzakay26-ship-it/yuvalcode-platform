// Distribution intelligence layer.
//
// Cross-route discovery hooks. The layer is *graph-aware* (consumes the
// existing src/lib/ai/graph.js + content registry) but stays UI-agnostic so
// pages can adopt the helpers without reaching into AI primitives directly.
//
// What this layer answers:
//
//   - Given a route, what feeds should it advertise?
//   - Given a route, what other routes should it cross-link?
//   - Given an entry, what surfaces (tracks, collections, pillars) does it
//     belong to and how should it be promoted?
//
// The brief explicitly forbids "personalized AI rec engine UI" at this stage
// — those primitives stay deferred. What ships is the *contract* + a v1
// graph-derived implementation. When the personalization layer arrives,
// it slots behind the same exports.

import { getSurface, getStaticSurfaces, getFeedSlugs } from "./routes";
import { EDITORIAL_COLLECTIONS } from "../editorial/collections-config";
import { getAllEntries } from "../content";
import { PILLARS, getPillar } from "../content/pillars";

// ---------------------------------------------------------------------------
// Feed advertisement — every surface that ought to surface a feed.
// ---------------------------------------------------------------------------

/**
 * feedsForRoute(path) — returns the list of feed descriptors a route should
 * advertise via <link rel="alternate" type="application/rss+xml">.
 *
 * Returns an array of { slug, type, href, title }.
 *
 *   - Editorial collection landings → their own feed.
 *   - Editorial entry pages → their collection's feed.
 *   - Hubs that point at a collection (via SURFACES.feedSlug) → that feed.
 *   - The home page + /content hub → the global "all" feed.
 */
export function feedsForRoute(path) {
    if (!path) return [];

    // Entry path → resolve the collection from the path.
    const entryMatch = path.match(/^\/content\/([^/]+)\/[^/]+/);
    if (entryMatch) return feedDescriptors(entryMatch[1]);

    // Collection landing.
    const collectionMatch = path.match(/^\/content\/([^/]+)$/);
    if (collectionMatch) return feedDescriptors(collectionMatch[1]);

    // Static surface.
    const surface = getSurface(path);
    if (surface?.feedSlug) return feedDescriptors(surface.feedSlug);

    return [];
}

function feedDescriptors(slug) {
    const slugs = getFeedSlugs();
    if (!slugs.includes(slug)) return [];
    return [
        { slug, type: "application/rss+xml", href: `/feeds/${slug}.xml` },
        { slug, type: "application/atom+xml", href: `/feeds/${slug}.atom.xml` },
        { slug, type: "application/feed+json", href: `/feeds/${slug}.json` },
    ];
}

// ---------------------------------------------------------------------------
// Cross-route distribution hints — used by the FeedDiscoveryStrip and the
// routing-internal "see also" rails. Today this is a deterministic graph
// traversal; tomorrow it can be re-ranked by user behaviour.
// ---------------------------------------------------------------------------

const CROSS_ROUTE_GRAPH = Object.freeze({
    "/": ["/content", "/ai", "/projects", "/exams"],
    "/content": ["/ai", "/projects", "/stack", "/exams"],
    "/ai": ["/projects", "/stack", "/content"],
    "/projects": ["/ai", "/stack", "/content"],
    "/stack": ["/ai", "/projects", "/content"],
    "/work-with-me": ["/projects", "/ai", "/contact"],
    "/exams": ["/programming", "/videos", "/content"],
    "/videos": ["/exams", "/content"],
    "/about": ["/work-with-me", "/projects", "/ai"],
    "/contact": ["/work-with-me", "/about"],
});

export function relatedSurfacesFor(path, { limit = 4 } = {}) {
    if (!path) return [];
    const surface = getSurface(path);
    if (!surface) return [];
    const candidates = CROSS_ROUTE_GRAPH[path] || [];
    const out = [];
    for (const cand of candidates) {
        const next = getSurface(cand);
        if (!next) continue;
        out.push({
            path: cand,
            eyebrow: next.eyebrow,
            kind: next.kind,
            schemaType: next.schemaType,
        });
        if (out.length >= limit) break;
    }
    return out;
}

// ---------------------------------------------------------------------------
// Editorial promotion — given an entry or pillar, return the surfaces that
// should promote it. Used by the recommendation rails on track pages and by
// the upcoming homepage adaptive assembly.
// ---------------------------------------------------------------------------

const PILLAR_TO_SURFACES = Object.freeze({
    programming: ["/exams", "/content", "/videos"],
    mahat: ["/exams", "/videos", "/content"],
    "ai-tools": ["/ai", "/content", "/projects"],
    "claude-code": ["/ai", "/stack", "/content"],
    "anti-gravity": ["/ai", "/stack"],
    obsidian: ["/stack", "/ai", "/content"],
    "building-with-ai": ["/projects", "/ai", "/content"],
    "creator-journey": ["/about", "/content", "/projects"],
});

export function surfacesForPillar(pillarId) {
    if (!pillarId) return [];
    const pillar = getPillar(pillarId);
    if (!pillar) return [];
    const paths = PILLAR_TO_SURFACES[pillarId] || [pillar.route].filter(Boolean);
    return paths.map((p) => getSurface(p)).filter(Boolean);
}

export function surfacesForEntry(entry) {
    if (!entry?.pillar) return [];
    return surfacesForPillar(entry.pillar);
}

// ---------------------------------------------------------------------------
// Distribution snapshot — diagnostic helper used by build scripts and the
// future analytics dashboard. Returns one row per surface the platform
// publishes to the outside world.
// ---------------------------------------------------------------------------

export function distributionSnapshot() {
    const surfaces = getStaticSurfaces();
    const entries = getAllEntries();
    const byType = new Map();
    for (const entry of entries) {
        if (!byType.has(entry.type)) byType.set(entry.type, 0);
        byType.set(entry.type, byType.get(entry.type) + 1);
    }
    return Object.freeze({
        surfaces: surfaces.length,
        feeds: getFeedSlugs().length,
        entries: entries.length,
        pillars: PILLARS.length,
        collections: EDITORIAL_COLLECTIONS.map((c) => ({
            slug: c.slug,
            label: c.labelEn,
            entries: byType.get(c.type) || 0,
        })),
    });
}

// ---------------------------------------------------------------------------
// Future personalization hook (deferred).
//
// The shape `pickAdaptiveSurfaces({ history, limit })` is the contract a
// future personalization layer must satisfy. v1 returns a deterministic list
// derived from the graph; v2 will re-rank by user history.
// ---------------------------------------------------------------------------

export function pickAdaptiveSurfaces({ history = [], limit = 6 } = {}) {
    // v1: deterministic. Use the home graph as the canonical "first-time
    // visitor" list. When personalization lands, this body can read the
    // history array and re-rank the same neighborhood.
    void history;
    return relatedSurfacesFor("/", { limit });
}
