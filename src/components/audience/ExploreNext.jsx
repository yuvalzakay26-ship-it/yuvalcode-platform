// ExploreNext — the bottom-of-page progression rail.
//
// A calm, editorial cross-link rail that surfaces 2–3 *next* surfaces based
// on:
//   - the visitor's accumulated pillar affinity (top + adjacent pillars)
//   - graceful fallback to the canonical surface order
//
// Designed to be the closing rhythm of every track page (sits *above* the
// FinalCTA, not replacing it). Each card carries a small "reason" chip so
// the visitor understands *why* the suggestion surfaced — premium
// transparency, never recommendation theater.

import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Compass } from "lucide-react";
import { useExploreNext } from "../../lib/audience";
import { trackRecommendationClick, trackRecommendationShown } from "../../lib/analytics";
import { useEffect } from "react";

const EASE = [0.16, 1, 0.3, 1];

const SURFACE_RGB = Object.freeze({
    "/": "99, 102, 241",
    "/content": "168, 85, 247",
    "/ai": "236, 72, 153",
    "/projects": "129, 140, 248",
    "/stack": "192, 132, 252",
    "/exams": "244, 114, 182",
    "/work-with-me": "251, 113, 133",
});

const REASON_LABEL = Object.freeze({
    "top-pillar": "מבוסס על מה שחיפשת",
    "adjacent-pillar": "סמוך לעניין שלך",
    "ecosystem-default": "המשך טבעי באקוסיסטם",
});

export function ExploreNext({ currentPath, limit = 3, surfaceId, className = "" }) {
    const items = useExploreNext(currentPath, { limit });
    const reduced = useReducedMotion();
    const surfaceLabel = surfaceId || currentPath || "(unknown)";

    useEffect(() => {
        if (!items || items.length === 0) return;
        items.forEach((item) =>
            trackRecommendationShown({
                id: item.surface,
                kind: item.reason,
                surface: surfaceLabel,
            })
        );
    }, [items, surfaceLabel]);

    if (!items || items.length === 0) return null;

    return (
        <section
            aria-labelledby="explore-next-heading"
            className={`py-20 lg:py-24 relative z-10 ${className}`}
        >
            <div className="container px-4 mx-auto">
                <div className="max-w-2xl mb-10">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-1 text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-muted mb-4">
                        <Compass className="h-3 w-3 text-primary-300" strokeWidth={2} aria-hidden="true" />
                        Explore next
                    </span>
                    <h2
                        id="explore-next-heading"
                        className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-normal text-ink leading-snug mb-3"
                    >
                        המשך <span className="text-brand-gradient">המסע</span>.
                    </h2>
                    <p className="text-sm sm:text-[15px] text-ink-muted leading-relaxed">
                        ההצעות הבאות מבוססות על האזורים בהם ביקרת — ועל הקישורים בין העמודים של האקוסיסטם.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
                    {items.map((item, i) => {
                        if (!item?.meta) return null;
                        const rgb = SURFACE_RGB[item.surface] || "99, 102, 241";
                        const reasonLabel = REASON_LABEL[item.reason] || REASON_LABEL["ecosystem-default"];
                        return (
                            <motion.div
                                key={item.surface}
                                initial={reduced ? false : { opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ delay: i * 0.06, duration: 0.55, ease: EASE }}
                            >
                                <Link
                                    to={item.surface}
                                    onClick={() =>
                                        trackRecommendationClick({
                                            id: item.surface,
                                            kind: item.reason,
                                            surface: surfaceLabel,
                                            position: i,
                                        })
                                    }
                                    aria-label={`${item.meta.label} — המשך לסקור`}
                                    className="group relative block h-full rounded-2xl glass-panel-2 p-6 lg:p-7 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 overflow-hidden"
                                    style={{ "--rgb": rgb }}
                                >
                                    <div
                                        aria-hidden="true"
                                        className="absolute -top-16 -left-16 w-44 h-44 rounded-full opacity-25 group-hover:opacity-60 transition-opacity duration-700 blur-[64px] pointer-events-none"
                                        style={{ background: `rgb(var(--rgb) / 0.45)` }}
                                    />

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between text-[10.5px] font-mono uppercase tracking-[0.2em] text-ink-dim mb-4">
                                            <span dir="ltr">{item.meta.eyebrow}</span>
                                            <span>{reasonLabel}</span>
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-bold text-ink leading-snug mb-2 group-hover:text-primary-200 transition-colors">
                                            {item.meta.label}
                                        </h3>
                                        <p className="text-[13px] sm:text-sm text-ink-muted leading-relaxed mb-5">
                                            {item.meta.body}
                                        </p>
                                        <div className="inline-flex items-center gap-1.5 text-[13px] font-medium text-primary-300 group-hover:text-white transition-colors">
                                            המשך
                                            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                                        </div>
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
