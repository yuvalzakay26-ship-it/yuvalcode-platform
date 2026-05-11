// ContinueExploring — "pick up where you left off" rail.
//
// A second-tier surface (below the WelcomeBackStrip) that renders ONLY when
// the visitor has a real continuation context (a recent surface that isn't
// the current page). Designed to be embedded *inside* a section, not floated
// over the layout — so it integrates with the page rhythm.
//
// The card is on-message with the rest of the platform: glass tier 2,
// per-surface RGB ambient glow, Hebrew-first body, LTR mono eyebrow.

import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, History } from "lucide-react";
import { useContinueExploring, useVisitorTier, VISITOR_TIER } from "../../lib/audience";
import { trackCta } from "../../lib/analytics";

const EASE = [0.16, 1, 0.3, 1];

const SURFACE_RGB = Object.freeze({
    "/": "99, 102, 241",
    "/content": "168, 85, 247",
    "/ai": "236, 72, 153",
    "/projects": "129, 140, 248",
    "/stack": "192, 132, 252",
    "/exams": "244, 114, 182",
});

function relativeWindow(ts) {
    if (!ts) return null;
    const ms = Date.now() - ts;
    const minutes = Math.round(ms / 60000);
    if (minutes < 1) return "ממש עכשיו";
    if (minutes < 60) return `לפני ${minutes} דקות`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `לפני ${hours} שעות`;
    const days = Math.round(hours / 24);
    if (days === 1) return "אתמול";
    if (days < 7) return `לפני ${days} ימים`;
    return null;
}

export function ContinueExploring({ currentPath = "/", className = "" }) {
    const continueTo = useContinueExploring(currentPath);
    const tier = useVisitorTier();
    const reduced = useReducedMotion();

    // Cold-start visitors don't see this rail — they get the onboarding flow
    // instead. The component is intentionally one-shot per surface.
    if (!continueTo) return null;
    if (tier === VISITOR_TIER.NEW) return null;

    const surface = continueTo.meta;
    if (!surface) return null;
    const rgb = SURFACE_RGB[surface.id] || "99, 102, 241";
    const window_ = relativeWindow(continueTo.ts);

    return (
        <motion.section
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            aria-labelledby="continue-exploring-heading"
            className={`relative ${className}`}
        >
            <div className="container px-4 mx-auto">
                <div className="flex items-center gap-3 mb-5">
                    <div className="hairline flex-1" aria-hidden="true" />
                    <span className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-dim flex items-center gap-2">
                        <History className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />
                        Continue exploring
                    </span>
                    <div className="hairline flex-1" aria-hidden="true" />
                </div>

                <h2 id="continue-exploring-heading" className="sr-only">
                    המשך מהמקום שעצרת
                </h2>

                <Link
                    to={surface.id}
                    onClick={() =>
                        trackCta({
                            id: "continue-exploring",
                            surface: currentPath,
                            destination: surface.id,
                        })
                    }
                    className="group relative block overflow-hidden rounded-2xl glass-panel-2 p-5 sm:p-6 hover:-translate-y-0.5 transition-all duration-500 hover:border-white/20"
                    style={{ "--rgb": rgb }}
                >
                    <div
                        aria-hidden="true"
                        className="absolute -top-20 -left-20 w-56 h-56 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-700 blur-[80px] pointer-events-none"
                        style={{ background: `rgb(var(--rgb) / 0.4)` }}
                    />

                    <div className="relative z-10 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                            <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.18em] text-ink-dim mb-2">
                                <span dir="ltr">{surface.eyebrow}</span>
                                {window_ && (
                                    <>
                                        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/15" />
                                        <span>{window_}</span>
                                    </>
                                )}
                                {continueTo.pillarLabel && (
                                    <>
                                        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/15" />
                                        <span dir="ltr">{continueTo.pillarLabel}</span>
                                    </>
                                )}
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-ink leading-snug mb-1.5 group-hover:text-primary-200 transition-colors">
                                {surface.label}
                            </h3>
                            <p className="text-sm text-ink-muted leading-relaxed line-clamp-1">
                                {surface.body}
                            </p>
                        </div>

                        <div className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-primary-300 group-hover:text-white transition-colors shrink-0">
                            המשך
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                        </div>
                    </div>
                </Link>
            </div>
        </motion.section>
    );
}
