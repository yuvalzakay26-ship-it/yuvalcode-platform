import { motion } from "framer-motion";
import {
    Atom,
    Wind,
    Sparkles,
    Youtube,
    Brain,
    Code2,
    Hexagon,
    Github,
    Boxes,
    Zap,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const ECOSYSTEMS = [
    {
        id: "frontend",
        title: "Front-End Foundation",
        eyebrow: "Layer · 01",
        body: "ה-stack שמעבד את כל מה שהמשתמש רואה. נבחר על rendering predictability, motion taste, ו-bundle discipline.",
        rgb: "129, 140, 248",
        accent: "from-indigo-500/15 to-violet-500/10",
        tools: [
            { name: "React", role: "UI runtime", icon: Atom, body: "React 19 · concurrent rendering · Suspense for lazy routes." },
            { name: "Vite", role: "Bundler", icon: Zap, body: "Vite 7 · manualChunks · sourcemaps off in prod · sub-second HMR." },
            { name: "Tailwind", role: "Styling", icon: Wind, body: "Tailwind 3.4 · custom shade scale · glass tier system · ease-premium." },
            { name: "Framer Motion", role: "Motion", icon: Sparkles, body: "v12 · single EASE curve · whileInView once · reduced-motion guards." },
        ],
    },
    {
        id: "data",
        title: "Data & Content Layer",
        eyebrow: "Layer · 02",
        body: "השכבה שממירה ערוץ YouTube חי לקטלוג שניתן לחפש, לסנן, ולמיין — בלי לשבור את quota.",
        rgb: "236, 72, 153",
        accent: "from-pink-500/15 to-rose-500/10",
        tools: [
            { name: "YouTube API", role: "Source", icon: Youtube, body: "Channels, playlists, items + duration enrichment." },
            { name: "TTL Cache", role: "Resilience", icon: Boxes, body: "3-tier localStorage cache · 24h/1h/15m · stale-on-error." },
            { name: "Normalizer", role: "Transform", icon: Code2, body: "Description-first → title-regex → playlist-context fallback." },
        ],
    },
    {
        id: "ai",
        title: "AI Exploration Stack",
        eyebrow: "Layer · 03",
        body: "הכלים שאני בודק לאורך הדרך — לא הם שמקבלים את ההחלטות. ה-AI הוא partner, לא autopilot.",
        rgb: "168, 85, 247",
        accent: "from-purple-500/15 to-fuchsia-500/10",
        tools: [
            { name: "Claude", role: "AI Partner", icon: Brain, body: "תכנון, סקירה, ואופוזיציה לרעיון לפני שהוא נכנס לקוד." },
            { name: "Claude Code", role: "Coding Agent", icon: Code2, body: "סוכן CLI — תכנון פיצ׳ר, מיגרציות, וביצוע end-to-end." },
            { name: "Obsidian", role: "Second Brain", icon: Hexagon, body: "Vault שמחזיק החלטות, סקריפטים, ולקחים — graph view של כל פרויקט." },
        ],
    },
    {
        id: "platform",
        title: "Platform & Workflow",
        eyebrow: "Layer · 04",
        body: "המקום שבו הקוד הופך לפומבי. Build-in-public מתחיל פה.",
        rgb: "203, 213, 225",
        accent: "from-slate-400/10 to-zinc-400/10",
        tools: [
            { name: "GitHub", role: "Source · CI", icon: Github, body: "כל commit חי בפומבי. ה-history הוא ה-changelog." },
            { name: ".NET / C#", role: "Foundation", icon: Boxes, body: "הבסיס של שנים — backend, מערכות, ו-Mahat curriculum." },
        ],
    },
];

const MARQUEE_LABELS = ECOSYSTEMS.flatMap((e) => e.tools.map((t) => t.name));

function MarqueeRail() {
    const items = [...MARQUEE_LABELS, ...MARQUEE_LABELS];
    return (
        <div
            className="relative overflow-hidden mask-fade py-3 mb-14 border-y border-white/5"
            aria-hidden="true"
        >
            <div
                dir="ltr"
                className="flex items-center gap-10 whitespace-nowrap animate-marquee text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] text-ink-dim"
                style={{ width: "max-content" }}
            >
                {items.map((label, i) => (
                    <span key={`${label}-${i}`} className="flex items-center gap-10">
                        <span className="text-ink-muted">{label}</span>
                        <span className="h-1 w-1 rounded-full bg-white/15" />
                    </span>
                ))}
            </div>
        </div>
    );
}

function EcosystemBlock({ eco, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.05, duration: 0.6, ease: EASE }}
            className="relative rounded-[1.75rem] glass-panel-2 p-7 lg:p-8 overflow-hidden"
        >
            <div
                aria-hidden="true"
                className={`absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-br ${eco.accent} blur-[80px] opacity-70`}
            />

            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <span dir="ltr" className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-2 block">
                            {eco.eyebrow}
                        </span>
                        <h3 className="font-display text-xl lg:text-2xl font-bold text-white">
                            {eco.title}
                        </h3>
                    </div>
                    <span
                        aria-hidden="true"
                        className="hidden sm:inline-flex h-9 px-3 rounded-full items-center text-[10.5px] font-mono uppercase tracking-[0.18em] text-ink-muted bg-white/[0.035] border border-white/[0.07]"
                    >
                        {eco.tools.length} tools
                    </span>
                </div>

                <p className="text-[14.5px] text-ink-muted leading-relaxed mb-7 max-w-2xl">
                    {eco.body}
                </p>

                {/* Tools rail */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {eco.tools.map((tool) => {
                        const Icon = tool.icon;
                        return (
                            <div
                                key={tool.name}
                                className="group relative rounded-2xl glass-panel-1 p-4 transition-colors duration-500 hover:border-white/15 overflow-hidden"
                            >
                                <div
                                    aria-hidden="true"
                                    className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-[50px] opacity-50 group-hover:opacity-80 transition-opacity duration-500"
                                    style={{
                                        background: `radial-gradient(circle, rgba(${eco.rgb}, 0.16), transparent 70%)`,
                                    }}
                                />
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors duration-300">
                                            <Icon className="h-4 w-4 text-white" strokeWidth={1.75} aria-hidden="true" />
                                        </div>
                                        <span dir="ltr" className="text-[9.5px] font-mono uppercase tracking-[0.22em] text-ink-dim">
                                            {tool.role}
                                        </span>
                                    </div>
                                    <h4 dir="ltr" className="text-[15px] font-bold text-white text-left mb-1.5 group-hover:text-primary-200 transition-colors">
                                        {tool.name}
                                    </h4>
                                    <p className="text-[13px] text-ink-muted leading-relaxed">
                                        {tool.body}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}

export function ProjectsTechStack() {
    return (
        <section
            id="projects-stack"
            className="py-24 relative z-10"
            aria-labelledby="projects-stack-heading"
        >
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-4">
                        Systems Stack · Intentional Tooling
                    </div>
                    <h2 id="projects-stack-heading" className="text-4xl md:text-5xl lg:text-5xl font-black tracking-normal text-white mb-4">
                        ה-<span className="text-brand-gradient">stack</span> שבונה את כל זה.
                    </h2>
                    <p className="text-lg text-ink-muted leading-relaxed">
                        ארבע שכבות, ארבע אחריות. כל כלי נכנס רק אחרי שהוכיח את עצמו על פרויקט אמיתי.
                    </p>
                </div>

                <MarqueeRail />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7">
                    {ECOSYSTEMS.map((eco, i) => (
                        <EcosystemBlock key={eco.id} eco={eco} index={i} />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-ink-dim max-w-xl mx-auto">
                        אין כאן לוגואים לתפאורה — כל ערך מקבל role + הסבר. לא טרנדים, מה שעובד.
                    </p>
                </div>
            </div>
        </section>
    );
}
