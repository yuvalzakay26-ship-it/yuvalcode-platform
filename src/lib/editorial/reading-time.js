// Reading-time estimator.
//
// We don't ship a dependency for this. The canonical "average adult reading
// speed" is 200–250 words/minute for English; for Hebrew (denser orthography,
// fewer letters per word) we use 180. Authors can override by passing
// `readingMinutes` directly on the entry — the override always wins.

const HEBREW_WPM = 180;

export function estimateReadingMinutes(text) {
    if (!text || typeof text !== "string") return 1;
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    if (words === 0) return 1;
    return Math.max(1, Math.round(words / HEBREW_WPM));
}

/**
 * resolveReadingMinutes — prefer the author-provided override; otherwise
 * fall back to estimate. Used by the entry layout when rendering the
 * "X minute read" label.
 */
export function resolveReadingMinutes(entry, fallbackText) {
    if (typeof entry?.readingMinutes === "number" && entry.readingMinutes > 0) {
        return entry.readingMinutes;
    }
    return estimateReadingMinutes(fallbackText || entry?.summary || "");
}
