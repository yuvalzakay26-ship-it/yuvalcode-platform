// Semantic metadata strategy.
//
// This module is the boundary between editorial content and any future
// vector / semantic-search / RAG layer. Today every helper returns plain
// JS objects so the rest of the platform can rely on the shape. Tomorrow,
// each function can call out to an embedding service, a database, or a
// Claude tool without changing a single consumer.
//
// Nothing in this file ships an embedding model, an index, or a vendor SDK.
// The point is the *contract*.

const DEFAULT_KEYWORD_LIMIT = 8;

/**
 * extractSemanticMetadata(entry) — derives semantic metadata from a content
 * entry. v1 returns deterministic shape; v2 will replace `embedding` with a
 * real vector and `summary` with an AI-generated abstract.
 */
export function extractSemanticMetadata(entry) {
    if (!entry) return null;

    const keywords = collectKeywords(entry).slice(0, DEFAULT_KEYWORD_LIMIT);

    return Object.freeze({
        id: entry.id,
        pillar: entry.pillar || null,
        keywords,
        summary: entry.summary || null,
        relationships: Object.freeze({
            related: entry.related || [],
            tags: entry.tags || [],
        }),
        // Reserved for the v2 vector layer. Stays null in v1 so consumers can
        // branch on `meta.embedding === null` to fall back to keyword matching.
        embedding: null,
        embeddingModel: null,
        embeddingDim: null,
    });
}

function collectKeywords(entry) {
    const out = new Set();
    if (entry.tags) entry.tags.forEach((t) => out.add(String(t)));
    if (entry.pillar) out.add(entry.pillar);
    if (entry.type) out.add(entry.type);
    return Array.from(out);
}

/**
 * Future-ready signature for a remote embedding service. v1 returns null.
 * v2 will route to Claude / Voyage / OpenAI embeddings depending on env.
 */
export async function embedEntry(/* entry */) {
    return null;
}

/**
 * Future cosine-similarity helper. v1 returns 0 so callers can branch on it
 * but never accidentally surface "smart" results before the layer is real.
 */
export function cosineSimilarity(/* a, b */) {
    return 0;
}

/**
 * Stable sort key for entries. Combines recency + pillar weight + a soft
 * popularity hook (placeholder; stays at 0 until real data ships).
 */
export function rankKey(entry) {
    if (!entry) return -Infinity;
    const recency = entry.date ? Date.parse(entry.date) || 0 : 0;
    const pillarBoost = 0; // wired later by recommend.js if context provides it
    return recency + pillarBoost;
}
