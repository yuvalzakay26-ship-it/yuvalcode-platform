// Canonical pillar registry.
//
// The eight content pillars from BRAND_V2.md §3 — codified once so that pages,
// search, recommendations, and analytics share one source of truth.
// Each pillar carries adjacency (`connects`) so the ecosystem graph can be
// derived from this file alone without crawling individual page sources.

export const PILLARS = Object.freeze([
    {
        id: "programming",
        eyebrow: "Programming",
        title: "תכנות · C#",
        route: "/exams",
        connects: ["mahat", "ai-tools", "claude-code"],
        weight: 1.0,
    },
    {
        id: "mahat",
        eyebrow: "Mahat Solutions",
        title: "פתרונות מה״ט",
        route: "/exams",
        connects: ["programming", "creator-journey"],
        weight: 1.0,
    },
    {
        id: "ai-tools",
        eyebrow: "AI Tools",
        title: "כלי AI",
        route: "/ai",
        connects: ["claude-code", "anti-gravity", "building-with-ai"],
        weight: 1.0,
    },
    {
        id: "claude-code",
        eyebrow: "Claude Code",
        title: "Claude Code Workflows",
        route: "/ai",
        connects: ["ai-tools", "building-with-ai", "obsidian"],
        weight: 1.0,
    },
    {
        id: "anti-gravity",
        eyebrow: "Anti Gravity",
        title: "Anti Gravity Systems",
        route: "/ai",
        connects: ["ai-tools", "obsidian", "building-with-ai"],
        weight: 0.8,
    },
    {
        id: "obsidian",
        eyebrow: "Obsidian",
        title: "Obsidian · Knowledge Systems",
        route: "/stack",
        connects: ["claude-code", "anti-gravity", "creator-journey"],
        weight: 0.9,
    },
    {
        id: "building-with-ai",
        eyebrow: "Building with AI",
        title: "בנייה עם AI",
        route: "/projects",
        connects: ["ai-tools", "claude-code", "creator-journey"],
        weight: 1.0,
    },
    {
        id: "creator-journey",
        eyebrow: "Creator Journey",
        title: "מסע היוצר",
        route: "/about",
        connects: ["building-with-ai", "obsidian", "mahat"],
        weight: 0.8,
    },
]);

const PILLAR_INDEX = new Map(PILLARS.map((p) => [p.id, p]));

export function getPillar(id) {
    return PILLAR_INDEX.get(id) || null;
}

export function isPillarId(value) {
    return PILLAR_INDEX.has(value);
}

/**
 * Returns the adjacency list for a given pillar — the pillars it connects to.
 * Powers the "Connects to" affordance in PillarExplorer and the
 * recommendation graph in src/lib/ai/recommend.js.
 */
export function getPillarNeighbors(id) {
    const pillar = PILLAR_INDEX.get(id);
    if (!pillar) return [];
    return pillar.connects.map((cid) => PILLAR_INDEX.get(cid)).filter(Boolean);
}
