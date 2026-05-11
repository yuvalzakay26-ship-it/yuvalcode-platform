import { useEffect, useRef } from "react";
import { useRecommendations } from "../../lib/ai/recommend";
import { trackRecommendationShown } from "../../lib/analytics";
import { EntryCard } from "./EntryCard";

/**
 * RelatedRail — the "you might also like" surface that closes every entry.
 *
 * Reads from the existing graph-based recommendation engine
 * (src/lib/ai/recommend.js). v1 is graph-derived, labelled accordingly;
 * v2 will re-rank by vector similarity behind the same hook.
 *
 * Renders nothing when no recommendations exist (cold start) — the
 * AuthorBlock + EcosystemNav still close the article gracefully.
 */
export function RelatedRail({ entryId, limit = 4 }) {
    const recs = useRecommendations({ entryId, limit });
    const announcedRef = useRef(false);

    useEffect(() => {
        if (announcedRef.current) return;
        if (!recs || recs.length === 0) return;
        trackRecommendationShown({
            anchor: entryId,
            count: recs.length,
            sources: Array.from(new Set(recs.map((r) => r.source))).join(","),
        });
        announcedRef.current = true;
    }, [entryId, recs]);

    if (!recs || recs.length === 0) return null;

    return (
        <section
            aria-labelledby="related-rail-heading"
            className="container mx-auto px-4 py-14 sm:py-18 border-t border-white/[0.06]"
        >
            <div className="max-w-5xl mx-auto">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <p
                            dir="ltr"
                            className="text-[11px] font-mono uppercase tracking-[0.22em] text-ink-dim mb-2"
                        >
                            Continue reading <span className="text-ink-dim/60 mx-1">·</span> graph-derived
                        </p>
                        <h2
                            id="related-rail-heading"
                            className="font-display text-2xl sm:text-3xl font-bold text-ink tracking-normal"
                        >
                            המשך לחקור.
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {recs.map(({ entry, source }) => (
                        <EntryCard
                            key={entry.id}
                            entry={entry}
                            compact
                            showSource={source}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
