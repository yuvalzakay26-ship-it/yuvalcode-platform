// Ecosystem progression engine.
//
// Pure functions that consume an audience-memory snapshot and produce
// "what should this visitor see next?" recommendations. Storage is the
// caller's responsibility — these functions never touch localStorage.
//
// The engine is deliberately graph-shaped so a future personalization layer
// (vector recs, AI-assisted discovery) can replace any one resolver behind
// the same signature without rewriting consumers.

import { rankedPillars, topPillar, getMostRecentVisit } from "./memory";
import { TRACK_SURFACE_ORDER, resolveSurfaceForPath } from "./routePillarMap";
import { getPillar, getPillarNeighbors } from "../content";

// Canonical surface metadata — kept in sync with the navbar list and the
// per-track Final CTAs. The labels are Hebrew-first; the eyebrows are LTR
// canonical names so they read correctly in mixed-bidi contexts.
export const SURFACE_META = Object.freeze({
    "/": {
        id: "/",
        eyebrow: "Home",
        label: "המרכז",
        body: "המסך הראשי — מסע, AI, מה״ט, היוצר.",
    },
    "/content": {
        id: "/content",
        eyebrow: "Content",
        label: "מרכז התוכן",
        body: "האקוסיסטם של היוצר — שמונה עמודים, חמישה מסלולים.",
    },
    "/ai": {
        id: "/ai",
        eyebrow: "AI Track",
        label: "מסלול AI",
        body: "Claude Code · Agents · בנייה עם AI.",
    },
    "/projects": {
        id: "/projects",
        eyebrow: "Projects",
        label: "מערכות חיות",
        body: "פרויקטים, ארכיטקטורה, ועדויות עבודה.",
    },
    "/stack": {
        id: "/stack",
        eyebrow: "Stack",
        label: "ה-Stack של היוצר",
        body: "כלים, workflows, ומערכת ההפעלה היומית.",
    },
    "/exams": {
        id: "/exams",
        eyebrow: "Programming",
        label: "קטלוג מה״ט",
        body: "פתרונות וידאו ל-C# ולמבחני מה״ט, מאות שאלות.",
    },
    "/work-with-me": {
        id: "/work-with-me",
        eyebrow: "Work With Me",
        label: "שיתופי פעולה",
        body: "AI, ייעוץ, שיעורים פרטיים, פרויקטים משותפים.",
    },
});

const PILLAR_TO_SURFACE = Object.freeze({
    "programming": "/exams",
    "mahat": "/exams",
    "ai-tools": "/ai",
    "claude-code": "/ai",
    "anti-gravity": "/ai",
    "obsidian": "/stack",
    "building-with-ai": "/projects",
    "creator-journey": "/about",
});

/**
 * Resolve the surface that best represents a pillar's content destination.
 * Falls back to `/content` for unknown pillars.
 */
export function surfaceForPillar(pillarId) {
    return PILLAR_TO_SURFACE[pillarId] || "/content";
}

/**
 * Suggest the next surface a visitor should explore from `currentPath`.
 * Strategy:
 *   1. If the visitor has an entry-path preference set, route them to it
 *      the first time they visit (one-shot continuation).
 *   2. If the visitor has accumulated pillar affinity, route them to the
 *      surface for the highest-ranked unvisited-recently pillar.
 *   3. Otherwise, walk the canonical surface order skipping the current.
 *
 * Returns `null` only if every option resolves to the current surface.
 */
export function suggestNextSurface(memory, currentPath, { exclude = [] } = {}) {
    const currentSurface = resolveSurfaceForPath(currentPath) || "/";
    const blocked = new Set([currentSurface, ...exclude]);

    const pref = memory.preferences?.entryPath;
    if (pref) {
        const surface = entryPathToSurface(pref);
        if (surface && !blocked.has(surface)) return surface;
    }

    const top = topPillar(memory);
    if (top) {
        const surface = surfaceForPillar(top);
        if (surface && !blocked.has(surface)) return surface;
    }

    for (const surface of TRACK_SURFACE_ORDER) {
        if (!blocked.has(surface)) return surface;
    }
    return null;
}

/**
 * Build a small list of "explore next" recommendations for a given page.
 * The list is bounded; the highest-affinity-pillar surface is preferred,
 * then graph-adjacent pillars, then a calm rotation through the remaining
 * track surfaces. Each entry carries a `reason` so the UI can show *why*
 * a card surfaced ("based on your interest in AI", "next in the journey").
 */
export function buildExploreNextRail(memory, currentPath, { limit = 3 } = {}) {
    const currentSurface = resolveSurfaceForPath(currentPath) || "/";
    const seen = new Set([currentSurface]);
    const out = [];

    // 1. Top pillar continuation
    const top = topPillar(memory);
    if (top) {
        const surface = surfaceForPillar(top);
        if (surface && !seen.has(surface)) {
            seen.add(surface);
            const pillar = getPillar(top);
            out.push({
                surface,
                meta: SURFACE_META[surface],
                reason: "top-pillar",
                pillarLabel: pillar?.eyebrow || null,
            });
        }
    }

    // 2. Graph-adjacent pillars from the top (one hop). Adds two more
    //    surfaces from the visitor's broader interest neighborhood.
    if (top) {
        const neighbors = getPillarNeighbors(top);
        for (const n of neighbors) {
            const surface = surfaceForPillar(n.id);
            if (surface && !seen.has(surface)) {
                seen.add(surface);
                out.push({
                    surface,
                    meta: SURFACE_META[surface],
                    reason: "adjacent-pillar",
                    pillarLabel: n.eyebrow,
                });
                if (out.length >= limit) return out;
            }
        }
    }

    // 3. Fallback rotation through the canonical surface order
    for (const surface of TRACK_SURFACE_ORDER) {
        if (!seen.has(surface)) {
            seen.add(surface);
            out.push({
                surface,
                meta: SURFACE_META[surface],
                reason: "ecosystem-default",
                pillarLabel: null,
            });
        }
        if (out.length >= limit) break;
    }

    return out;
}

/**
 * "Pick up where you left off" surface — returns the most recent surface
 * the visitor touched that ISN'T the current one. `null` for first visits.
 */
export function continueExploringSurface(memory, currentPath) {
    const last = getMostRecentVisit(memory, { exclude: resolveSurfaceForPath(currentPath) });
    if (!last) return null;
    const surface = resolveSurfaceForPath(last.path);
    if (!surface || surface === resolveSurfaceForPath(currentPath)) return null;
    return {
        surface,
        meta: SURFACE_META[surface] || null,
        ts: last.ts,
        pillarLabel: last.pillar ? getPillar(last.pillar)?.eyebrow || null : null,
    };
}

/**
 * Entry-path key → canonical surface. Lets the onboarding flow translate
 * a visitor's choice into a router destination.
 */
export function entryPathToSurface(entryPath) {
    switch (entryPath) {
        case "ai-first":
            return "/ai";
        case "programming-first":
            return "/exams";
        case "creator-first":
            return "/content";
        case "build-first":
            return "/projects";
        default:
            return null;
    }
}

/**
 * Re-export of pillar ranking with surface attached. Useful for any UI
 * that wants to render the visitor's "most explored pillars" as a chip
 * row with proper destinations.
 */
export function rankedPillarSurfaces(memory, opts) {
    return rankedPillars(memory, opts).map(({ pillar, score }) => {
        const meta = getPillar(pillar);
        return {
            pillar,
            score,
            surface: surfaceForPillar(pillar),
            label: meta?.title || pillar,
            eyebrow: meta?.eyebrow || pillar,
        };
    });
}
