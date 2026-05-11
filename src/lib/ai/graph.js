// Ecosystem semantic graph.
//
// The platform's content graph is derived, not authored. Pillars contribute
// adjacency from src/lib/content/pillars.js. Content entries contribute
// adjacency from their `related` arrays. Surfaces contribute adjacency from
// the cross-link map below (which mirrors the actual UI cross-links — Navbar,
// Final CTAs, ecosystem rails). The result is a single graph that future
// recommendation/personalization/semantic-search code can traverse without
// re-deriving relationships.

import { PILLARS, getPillar } from "../content/pillars";
import { getAllEntries } from "../content";

// Surface adjacency — derived from how the UI cross-links the major routes.
// Mirrors the Final CTA and Ecosystem Rail patterns from CONTENT_OS_REPORT
// and WORK_WITH_ME_REPORT. Edits here are intentional design changes.
const SURFACE_EDGES = Object.freeze([
    ["/", "/content"],
    ["/", "/ai"],
    ["/", "/exams"],
    ["/content", "/ai"],
    ["/content", "/projects"],
    ["/content", "/exams"],
    ["/content", "/stack"],
    ["/ai", "/projects"],
    ["/ai", "/stack"],
    ["/projects", "/stack"],
    ["/projects", "/ai"],
    ["/stack", "/ai"],
    ["/stack", "/projects"],
    ["/work-with-me", "/projects"],
    ["/work-with-me", "/ai"],
    ["/work-with-me", "/contact"],
]);

/**
 * buildEcosystemGraph() — compiles the ecosystem graph on demand.
 *
 * Returns:
 *   nodes: Map<string, { id, kind, label, surface? }>
 *   edges: Array<{ from, to, weight, kind }>
 *
 * Kinds:
 *   "pillar"    → one of the 8 BRAND_V2 pillars
 *   "surface"   → a top-level route
 *   "entry"     → a content collection entry
 */
export function buildEcosystemGraph() {
    const nodes = new Map();
    const edges = [];

    // Surfaces
    const surfaces = new Set();
    for (const [from, to] of SURFACE_EDGES) {
        surfaces.add(from);
        surfaces.add(to);
        edges.push({ from, to, weight: 1, kind: "surface" });
        edges.push({ from: to, to: from, weight: 1, kind: "surface" });
    }
    for (const surface of surfaces) {
        nodes.set(surface, { id: surface, kind: "surface", label: surface });
    }

    // Pillars + pillar→surface anchors + pillar↔pillar adjacency
    for (const pillar of PILLARS) {
        const id = `pillar:${pillar.id}`;
        nodes.set(id, {
            id,
            kind: "pillar",
            label: pillar.title,
            surface: pillar.route,
            weight: pillar.weight,
        });
        if (pillar.route) {
            edges.push({ from: id, to: pillar.route, weight: pillar.weight, kind: "anchor" });
        }
        for (const neighbor of pillar.connects) {
            edges.push({
                from: id,
                to: `pillar:${neighbor}`,
                weight: pillar.weight * 0.8,
                kind: "pillar",
            });
        }
    }

    // Content entries + entry→pillar + entry→entry (related)
    for (const entry of getAllEntries()) {
        const id = `entry:${entry.id}`;
        nodes.set(id, {
            id,
            kind: "entry",
            label: entry.title,
            type: entry.type,
            pillar: entry.pillar,
            href: entry.href,
        });
        if (entry.pillar) {
            edges.push({
                from: id,
                to: `pillar:${entry.pillar}`,
                weight: 1,
                kind: "pillar-membership",
            });
        }
        for (const relatedId of entry.related || []) {
            edges.push({
                from: id,
                to: `entry:${relatedId}`,
                weight: 0.9,
                kind: "related",
            });
        }
    }

    return { nodes, edges };
}

/**
 * Returns the immediate neighbours of a node id, ranked by edge weight.
 * Ready for use by recommend.js — no embedding needed for v1.
 */
export function neighborsOf(graph, id, { limit = 8 } = {}) {
    const out = [];
    for (const edge of graph.edges) {
        if (edge.from === id) {
            const node = graph.nodes.get(edge.to);
            if (node) out.push({ node, weight: edge.weight, kind: edge.kind });
        }
    }
    out.sort((a, b) => b.weight - a.weight);
    return out.slice(0, limit);
}

export function pillarNodeId(pillarId) {
    return `pillar:${pillarId}`;
}

export function entryNodeId(entryId) {
    return `entry:${entryId}`;
}

export function getPillarSummary(pillarId) {
    return getPillar(pillarId);
}
