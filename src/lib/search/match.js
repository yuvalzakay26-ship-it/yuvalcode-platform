// Matcher — converts a query string into a ranked list of corpus entries.
//
// v1: case-insensitive, accent-insensitive substring scoring with token-level
// boosts. Hebrew + English play nicely because Unicode normalize + lowercase
// gives consistent comparison without bringing in a dependency.
//
// v2: this file is the swap-point for semantic search. The function signature
// stays — `match(query, corpus, opts)` — but the body can call out to an
// embeddings index and re-rank by cosine similarity. Consumers won't change.

const FOLD_RE = /[֑-ׇ]/g; // Hebrew niqqud — ignored when matching

function fold(input) {
    if (!input) return "";
    const lower = String(input).toLowerCase();
    // Drop combining diacritics + niqqud so "מָהט" matches "מהט".
    return lower.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(FOLD_RE, "");
}

function entryHaystack(entry) {
    const parts = [
        entry.title,
        entry.subtitle,
        entry.eyebrow,
        entry.pillarId,
        entry.type,
        ...(entry.keywords || []),
        ...(entry.tags || []),
    ];
    return fold(parts.filter(Boolean).join(" · "));
}

const KIND_BOOST = Object.freeze({
    route: 1.2,
    pillar: 1.1,
    entry: 1.0,
    video: 0.9,
});

function scoreEntry(entry, query, queryTokens) {
    const haystack = entryHaystack(entry);
    if (!haystack) return 0;

    let score = 0;

    // Whole-query match — strongest signal.
    if (query && haystack.includes(query)) {
        score += 4;
        if (haystack.startsWith(query)) score += 2;
    }

    // Per-token matches — graceful for "anti gravity" / "build in public".
    let tokenHits = 0;
    for (const token of queryTokens) {
        if (!token) continue;
        if (haystack.includes(token)) tokenHits++;
    }
    if (queryTokens.length > 0) {
        score += (tokenHits / queryTokens.length) * 2;
    }

    if (score === 0) return 0;

    score *= KIND_BOOST[entry.kind] || 1;
    return score;
}

/**
 * match(query, corpus, opts) — returns ranked entries.
 *
 * @param {string} query
 * @param {Array}  corpus     output of buildSearchIndex()
 * @param {{ limit?: number }} opts
 */
export function match(query, corpus, { limit = 24 } = {}) {
    const trimmed = (query || "").trim();
    if (!trimmed) return [];

    const folded = fold(trimmed);
    const tokens = folded.split(/\s+/).filter(Boolean);

    const scored = [];
    for (const entry of corpus) {
        const score = scoreEntry(entry, folded, tokens);
        if (score > 0) scored.push({ entry, score });
    }

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit).map(({ entry }) => entry);
}

/**
 * groupByKind(matches) — preserves rank order within each group.
 */
export function groupByKind(matches) {
    const groups = new Map();
    for (const m of matches) {
        const arr = groups.get(m.kind) || [];
        arr.push(m);
        groups.set(m.kind, arr);
    }
    return groups;
}
