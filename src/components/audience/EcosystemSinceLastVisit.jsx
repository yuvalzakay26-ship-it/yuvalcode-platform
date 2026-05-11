// EcosystemSinceLastVisit — calm "new since your last visit" surface.
//
// Renders ONLY when:
//   - The visitor has at least one prior session (returning) AND
//   - At least one editorial entry has shipped since the previous session
//     (within a 7-day lookback window).
//
// The component reads the audience memory's `previousLastSeen` timestamp
// and the live editorial corpus to compute "what's new for me." The
// content is editorial-shaped (Articles, Changelog, Case Studies) so the
// rail naturally complements the FollowTheJourney block without overlapping.

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useAudience } from "../../lib/audience";
import { getAllEntries } from "../../lib/content";
import { trackRecommendationClick, trackRecommendationShown } from "../../lib/analytics";

const EASE = [0.16, 1, 0.3, 1];
const NEW_LOOKBACK_MS = 7 * 24 * 60 * 60 * 1000; // mirror of memory.js

function entryHref(entry) {
    if (entry?.href) return entry.href;
    if (!entry?.slug) return "/content";
    // Map collection type to its URL segment.
    const seg = entry.type === "changelog" ? "changelog"
        : entry.type === "ai-experiment" ? "ai-experiments"
        : entry.type === "case-study" ? "case-studies"
        : entry.type === "research-note" ? "research-notes"
        : entry.type === "workflow" ? "workflows"
        : "articles";
    return `/content/${seg}/${entry.slug}`;
}

export function EcosystemSinceLastVisit({ surfaceId = "/", className = "" }) {
    const memory = useAudience();
    const reduced = useReducedMotion();

    // Capture `now` once at mount so the memoised filter stays pure for the
    // React-19 compiler-aware lint pass. The filter is conservative (date-
    // string comparison, day-resolution) so a stale "now" by a few seconds
    // is not observable.
    const [now] = useState(() => Date.now());

    const items = useMemo(() => {
        const previousLastSeen = memory.identity?.previousLastSeen;
        if (!previousLastSeen) return [];
        if (now - previousLastSeen > NEW_LOOKBACK_MS) return [];

        const cutoff = new Date(previousLastSeen);
        const cutoffIso = cutoff.toISOString().slice(0, 10);

        const all = getAllEntries();
        return all
            .filter((e) => e.date && e.date >= cutoffIso)
            .sort((a, b) => b.date.localeCompare(a.date))
            .slice(0, 3);
    }, [memory.identity?.previousLastSeen, now]);

    useEffect(() => {
        if (items.length === 0) return;
        items.forEach((item) =>
            trackRecommendationShown({
                id: item.id,
                kind: "since-last-visit",
                surface: surfaceId,
            })
        );
    }, [items, surfaceId]);

    if (items.length === 0) return null;

    const sinceDate = new Date(memory.identity.previousLastSeen).toLocaleDateString("he-IL", {
        day: "numeric",
        month: "short",
    });

    return (
        <section
            aria-labelledby="since-last-visit-heading"
            className={`py-16 lg:py-20 relative z-10 ${className}`}
        >
            <div className="container px-4 mx-auto">
                <div className="flex items-end justify-between gap-4 mb-8">
                    <div>
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-1 text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-muted mb-3">
                            <Sparkles className="h-3 w-3 text-primary-300" strokeWidth={2} aria-hidden="true" />
                            New since your last visit
                        </span>
                        <h2
                            id="since-last-visit-heading"
                            className="font-display text-2xl sm:text-3xl font-bold tracking-normal text-ink leading-snug"
                        >
                            מאז {sinceDate}, באקוסיסטם.
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {items.map((entry, i) => {
                        const href = entryHref(entry);
                        return (
                            <motion.div
                                key={entry.id}
                                initial={reduced ? false : { opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ delay: i * 0.06, duration: 0.5, ease: EASE }}
                            >
                                <Link
                                    to={href}
                                    onClick={() =>
                                        trackRecommendationClick({
                                            id: entry.id,
                                            kind: "since-last-visit",
                                            surface: surfaceId,
                                            position: i,
                                        })
                                    }
                                    className="group relative block h-full rounded-2xl glass-panel-1 p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/20 overflow-hidden"
                                >
                                    <div
                                        aria-hidden="true"
                                        className="absolute -top-12 -left-12 w-36 h-36 rounded-full bg-primary/15 opacity-30 group-hover:opacity-60 blur-[60px] transition-opacity duration-500 pointer-events-none"
                                    />

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-ink-dim mb-3">
                                            <span dir="ltr">{entry.eyebrow || entry.type}</span>
                                            {entry.date && (
                                                <>
                                                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/15" />
                                                    <span>{entry.date}</span>
                                                </>
                                            )}
                                        </div>
                                        <h3 className="text-base font-bold text-ink leading-snug mb-2 group-hover:text-primary-200 transition-colors line-clamp-2">
                                            {entry.title}
                                        </h3>
                                        <p className="text-[13px] text-ink-muted leading-relaxed line-clamp-2 mb-4">
                                            {entry.summary}
                                        </p>
                                        <span className="inline-flex items-center gap-1 text-[12.5px] font-medium text-primary-300 group-hover:text-white transition-colors">
                                            קרא
                                            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
