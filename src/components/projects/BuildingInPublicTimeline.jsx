import { motion } from "framer-motion";
import { GitCommit, Radio, Activity } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const TIMELINE = [
    {
        id: "phase1",
        marker: "Phase 1",
        title: "Foundation Stabilization",
        date: "2026-05",
        tone: "ship",
        body:
            "Lazy routes, ErrorBoundary, SkipToContent, Robots/Sitemap/JSON-LD, Surface tokens, Toast a11y. Bundle 522kb → 278kb.",
        deliverables: ["bundle 85kb gzip", "JSON-LD on every route", "Hebrew a11y pass"],
    },
    {
        id: "phase2-1",
        marker: "Phase 2.1",
        title: "AI Track Foundation",
        date: "2026-05",
        tone: "ship",
        body:
            "/ai מסלול חי — Hero, Tracks, Currently Building, Ecosystem, Why Follow Journey, Final CTA. Cross-links מ-Home.",
        deliverables: ["6 sections built", "/ai · 8.66kb gzip", "Sitemap updated"],
    },
    {
        id: "phase2-2",
        marker: "Phase 2.2",
        title: "Projects Authority System",
        date: "2026-05",
        tone: "live",
        body:
            "/projects כ-systems showcase — לא תיק, לא Dribbble. Hero, Featured Projects, Case Studies, Timeline, Stack, Why Build, CTA.",
        deliverables: ["7 sections", "Future-ready /:slug", "Architectural storytelling"],
    },
    {
        id: "phase2-3",
        marker: "Phase 2.3",
        title: "Creator Ecosystem Expansion",
        date: "Q3 2026",
        tone: "next",
        body:
            "/work-with-me · /stack · /content hub. Real headshot, OG image, channel-stats trust strip. Plausible analytics live.",
        deliverables: ["Trust signals", "Live channel stats", "Analytics wired"],
    },
    {
        id: "phase3",
        marker: "Phase 3",
        title: "Per-Project Case Pages",
        date: "Future",
        tone: "future",
        body:
            "/projects/:slug — דפי deep-dive. כל פרויקט מקבל hero, ארכיטקטורה ויזואלית, lessons learned, ו-changelog.",
        deliverables: ["Slug routing", "Lessons changelog", "MDX-ready content"],
    },
    {
        id: "phase4",
        marker: "Phase 4",
        title: "AI Products in Public",
        date: "Future",
        tone: "future",
        body:
            "מוצרי AI ראשונים נכנסים לתחת ה-/projects — סוכן ערוץ, code-review companion, ועוזר תוכן ליוצרים.",
        deliverables: ["Live AI products", "Public eval reports", "Cost dashboards"],
    },
];

const TONE_DOT = {
    live: "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]",
    ship: "bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.7)]",
    next: "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.7)]",
    future: "bg-white/30",
};

const TONE_TEXT = {
    live: "text-emerald-300",
    ship: "text-sky-300",
    next: "text-amber-300",
    future: "text-ink-dim",
};

const TONE_LABEL = {
    live: "Now",
    ship: "Shipped",
    next: "Next",
    future: "Future",
};

function TimelineEntry({ item, index }) {
    return (
        <motion.li
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.06, duration: 0.6, ease: EASE }}
            className="relative pr-12 lg:pr-14 pb-8 last:pb-0"
        >
            <span
                aria-hidden="true"
                className={`absolute right-2 lg:right-3 top-3 h-2.5 w-2.5 rounded-full ${TONE_DOT[item.tone]}`}
            />

            <div className="rounded-2xl glass-panel-1 p-5 lg:p-6 hover:border-white/15 transition-colors duration-500">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                        <span dir="ltr" className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-dim">
                            {item.marker}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-white/15" aria-hidden="true" />
                        <span dir="ltr" className="text-[10.5px] font-mono uppercase tracking-[0.18em] text-ink-muted">
                            {item.date}
                        </span>
                    </div>
                    <span dir="ltr" className={`inline-flex items-center gap-1.5 text-[10.5px] font-mono uppercase tracking-[0.2em] ${TONE_TEXT[item.tone]}`}>
                        {item.tone === "live" && (
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            </span>
                        )}
                        {TONE_LABEL[item.tone]}
                    </span>
                </div>

                <h3 className="text-lg lg:text-xl font-bold text-white mb-2 leading-snug">
                    {item.title}
                </h3>

                <p className="text-[14px] text-ink-muted leading-relaxed mb-4">{item.body}</p>

                <div className="flex flex-wrap gap-1.5">
                    {item.deliverables.map((d) => (
                        <span
                            key={d}
                            dir="auto"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-mono uppercase tracking-[0.16em] text-ink-muted bg-white/[0.035] border border-white/[0.07]"
                        >
                            <GitCommit className="h-3 w-3 text-primary-300" strokeWidth={2} aria-hidden="true" />
                            {d}
                        </span>
                    ))}
                </div>
            </div>
        </motion.li>
    );
}

export function BuildingInPublicTimeline() {
    return (
        <section
            id="building-timeline"
            className="py-24 relative z-10"
            aria-labelledby="timeline-heading"
        >
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                    {/* Left header (sticky on lg) */}
                    <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-1 mb-5">
                            <Radio className="h-3.5 w-3.5 text-primary-300" strokeWidth={2} aria-hidden="true" />
                            <span dir="ltr" className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-muted">
                                Building in Public
                            </span>
                        </div>

                        <h2 id="timeline-heading" className="text-4xl md:text-5xl lg:text-5xl font-black tracking-normal text-white mb-5 leading-[1.05]">
                            <span className="text-brand-gradient">Shipping</span> momentum.
                        </h2>

                        <p className="text-lg text-ink-muted leading-relaxed mb-8">
                            ציר זמן חי של הפלטפורמה — כל phase הוא יחידת עבודה PR-sized שלא שוברת main. ההתקדמות גלויה, גם איפה שעדיין לא יצא.
                        </p>

                        <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-ink-dim">
                            <Activity className="h-3.5 w-3.5 text-primary-300" strokeWidth={2} aria-hidden="true" />
                            עדכון אחרון · 2026-05
                        </div>
                    </div>

                    {/* Timeline column */}
                    <div className="lg:col-span-7">
                        <ol className="relative" role="list">
                            <span
                                aria-hidden="true"
                                className="absolute top-2 bottom-2 right-3 lg:right-4 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
                            />
                            {TIMELINE.map((item, i) => (
                                <TimelineEntry key={item.id} item={item} index={i} />
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
}
