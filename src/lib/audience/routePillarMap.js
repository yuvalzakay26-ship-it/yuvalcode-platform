// Route → pillar / surface resolution.
//
// Centralizes the mapping from a router pathname to the canonical surface
// label and the pillar it activates. Used by:
//   - the audience memory recorder (to bump the right pillar weight)
//   - the progression engine (to choose the next surface to recommend)
//   - the "explore next" rail (to know which surface the visitor is on)
//
// The mapping is intentionally smaller than the Phase 3.0 ecosystem graph —
// the graph encodes per-tool/entry adjacency; this file is the SPA-route
// projection of that graph for the audience layer.

// Five canonical surfaces match the v2 creator-track architecture.
export const SURFACES = Object.freeze({
    HOME: "/",
    AI: "/ai",
    PROJECTS: "/projects",
    CONTENT: "/content",
    STACK: "/stack",
    EXAMS: "/exams",
    WORK_WITH_ME: "/work-with-me",
    ABOUT: "/about",
});

// Default per-surface pillar. `null` indicates the surface is multi-pillar
// (e.g. the home page or the content hub) and shouldn't bias the affinity
// scorer toward a single pillar.
const SURFACE_PILLAR_MAP = Object.freeze({
    "/": null,
    "/ai": "ai-tools",
    "/projects": "building-with-ai",
    "/content": null,
    "/stack": "claude-code",
    "/exams": "mahat",
    "/videos": "mahat",
    "/work-with-me": "creator-journey",
    "/about": "creator-journey",
});

// Per-collection pillar default for editorial routes (`/content/:collection`
// and `/content/:collection/:slug`). The recommendation engine resolves
// collection slug → pillar; this is the SPA shortcut.
const COLLECTION_PILLAR_DEFAULT = Object.freeze({
    "articles": null,
    "ai-experiments": "ai-tools",
    "case-studies": "building-with-ai",
    "workflows": "claude-code",
    "changelog": "creator-journey",
    "research-notes": "ai-tools",
    "newsletters": null,
});

// Surface label classification — used by the "since your last visit" rail
// to know whether a path is a track surface, an editorial entry, or something
// else (privacy, terms, contact).
const TRACK_SURFACES = new Set([
    "/", "/ai", "/projects", "/content", "/stack",
]);

const UTILITY_PATHS = new Set([
    "/privacy", "/terms", "/contact",
]);

/**
 * Strip query string and trailing slash for a stable surface key.
 */
function normalizePath(path) {
    if (!path || typeof path !== "string") return null;
    const noQuery = path.split("?")[0].split("#")[0];
    if (noQuery === "/") return "/";
    return noQuery.replace(/\/+$/, "");
}

/**
 * Returns the canonical surface for a path. For dynamic editorial routes
 * (`/content/:collection`, `/content/:collection/:slug`) this collapses to
 * `/content` so the audience layer treats the editorial corpus as one
 * surface; the per-entry detail lives in `recordEntryRead()`.
 */
export function resolveSurfaceForPath(path) {
    const norm = normalizePath(path);
    if (!norm) return null;
    if (UTILITY_PATHS.has(norm)) return null; // don't track utility routes

    // `/content/:something` → `/content`
    if (norm.startsWith("/content/")) return "/content";

    // `/videos` is the legacy detail surface for the Mahat catalog; treat
    // it as `/exams` for affinity bookkeeping.
    if (norm === "/videos") return "/exams";

    if (norm in SURFACE_PILLAR_MAP) return norm;
    return null;
}

/**
 * Returns the pillar that a path activates, or `null` for multi-pillar
 * surfaces. For `/content/:collection/:slug` paths, falls back to the
 * collection default.
 */
export function resolvePillarForPath(path, { collection } = {}) {
    const norm = normalizePath(path);
    if (!norm) return null;

    if (norm.startsWith("/content/")) {
        const segments = norm.split("/").filter(Boolean); // ["content", ":coll", maybe slug]
        const slug = collection || segments[1];
        return COLLECTION_PILLAR_DEFAULT[slug] ?? null;
    }

    return SURFACE_PILLAR_MAP[norm] ?? null;
}

/**
 * Track surfaces are the five v2 creator-track pages. Used by the
 * "explore next" rail to suggest cross-track navigation.
 */
export function isTrackSurface(path) {
    const surface = resolveSurfaceForPath(path);
    return surface ? TRACK_SURFACES.has(surface) : false;
}

/**
 * The full ordered list of track surfaces. Powers the progression engine
 * when no specific recommendation is computable.
 */
export const TRACK_SURFACE_ORDER = Object.freeze([
    "/", "/content", "/ai", "/projects", "/stack",
]);
