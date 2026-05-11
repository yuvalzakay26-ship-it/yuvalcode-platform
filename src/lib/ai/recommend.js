// Recommendation engine.
//
// v1 is graph-based — adjacency from src/lib/content/pillars.js + entry
// `related` arrays + the surface cross-link map in graph.js. No vectors yet.
//
// Consumers (Featured Hub, Pillar Explorer, future "you might also like" rails)
// use the React hook below. The pure functions are exported for tests and for
// any non-React surface that wants to compute recommendations.

import { useMemo } from "react";
import { buildEcosystemGraph, pillarNodeId, neighborsOf } from "./graph";
import { getEntryById, getEntriesByPillar, getRelated } from "../content";

const DEFAULT_LIMIT = 6;

/**
 * recommendForEntry(entryId, opts) — returns ranked content recommendations
 * for a given entry. Uses:
 *   1. The entry's `related: []` (manual editorial signal — highest weight).
 *   2. Entries in the same pillar (pillar-cohesion signal).
 *   3. Entries in adjacent pillars (graph-traversal signal).
 *
 * The result is a stable, deterministic, deduplicated, length-bounded list.
 * Ready to be re-ranked by a future vector layer without changing the shape.
 */
export function recommendForEntry(entryId, { limit = DEFAULT_LIMIT } = {}) {
    const entry = getEntryById(entryId);
    if (!entry) return [];

    const seen = new Set([entryId]);
    const results = [];

    // 1. Manual related — strongest signal.
    for (const r of getRelated(entryId)) {
        if (seen.has(r.id)) continue;
        seen.add(r.id);
        results.push({ entry: r, source: "related", score: 1 });
    }

    // 2. Same pillar — natural cohort.
    if (entry.pillar) {
        for (const r of getEntriesByPillar(entry.pillar)) {
            if (seen.has(r.id)) continue;
            seen.add(r.id);
            results.push({ entry: r, source: "same-pillar", score: 0.7 });
        }
    }

    // 3. Adjacent pillars — graph-walk one hop out.
    if (entry.pillar) {
        const graph = buildEcosystemGraph();
        const pillarNeighbors = neighborsOf(graph, pillarNodeId(entry.pillar));
        for (const { node, kind } of pillarNeighbors) {
            if (kind !== "pillar") continue;
            const adjacentPillarId = node.id.replace(/^pillar:/, "");
            for (const r of getEntriesByPillar(adjacentPillarId)) {
                if (seen.has(r.id)) continue;
                seen.add(r.id);
                results.push({ entry: r, source: "adjacent-pillar", score: 0.5 });
            }
        }
    }

    return results.slice(0, limit);
}

/**
 * recommendForPillar(pillarId, opts) — entry-level recommendations for a
 * pillar landing page. Pulls entries in this pillar first, then adjacent.
 */
export function recommendForPillar(pillarId, { limit = DEFAULT_LIMIT } = {}) {
    const seen = new Set();
    const results = [];

    for (const r of getEntriesByPillar(pillarId)) {
        if (seen.has(r.id)) continue;
        seen.add(r.id);
        results.push({ entry: r, source: "same-pillar", score: 0.9 });
    }

    const graph = buildEcosystemGraph();
    for (const { node, kind } of neighborsOf(graph, pillarNodeId(pillarId))) {
        if (kind !== "pillar") continue;
        const adjacentPillarId = node.id.replace(/^pillar:/, "");
        for (const r of getEntriesByPillar(adjacentPillarId)) {
            if (seen.has(r.id)) continue;
            seen.add(r.id);
            results.push({ entry: r, source: "adjacent-pillar", score: 0.5 });
        }
    }

    return results.slice(0, limit);
}

/**
 * recommendForUser(history, opts) — personalization stub.
 *
 * v1: returns the most recently visited pillar's recommendations, falling
 * back to the global "recent" feed when history is empty. The signature is
 * deliberate so a future personalization layer can drop in without changing
 * call sites. No data is persisted by this function — callers are
 * responsible for managing whatever (cookieless, in-memory) history they
 * choose to feed in.
 */
export function recommendForUser(history = [], { limit = DEFAULT_LIMIT } = {}) {
    const lastPillar = [...history].reverse().find((h) => h?.pillar)?.pillar;
    if (lastPillar) return recommendForPillar(lastPillar, { limit });

    const lastEntryId = [...history].reverse().find((h) => h?.entryId)?.entryId;
    if (lastEntryId) return recommendForEntry(lastEntryId, { limit });

    // Fallback — the cold-start surface is the recent feed.
    // Avoids returning [] which can confuse layout code.
    const all = recommendForPillar("building-with-ai", { limit });
    return all.slice(0, limit);
}

/**
 * useRecommendations(opts) — memoized React hook. Pass either an entryId, a
 * pillarId, or a history array. Returns a stable, length-bounded list.
 */
export function useRecommendations({ entryId, pillarId, history, limit = DEFAULT_LIMIT } = {}) {
    return useMemo(() => {
        if (entryId) return recommendForEntry(entryId, { limit });
        if (pillarId) return recommendForPillar(pillarId, { limit });
        if (history) return recommendForUser(history, { limit });
        return [];
    }, [entryId, pillarId, history, limit]);
}

/**
 * Surface-level cross-link suggestions — given the current route, what other
 * top-level surfaces are most relevant? Used by the Final CTA / Ecosystem Rail
 * components today via direct imports; exposed here so future personalization
 * can re-rank by user history.
 */
export function recommendSurfacesFrom(currentSurface, { limit = 4 } = {}) {
    const graph = buildEcosystemGraph();
    return neighborsOf(graph, currentSurface, { limit })
        .filter(({ node }) => node.kind === "surface")
        .map(({ node, weight }) => ({ surface: node.id, weight }));
}
