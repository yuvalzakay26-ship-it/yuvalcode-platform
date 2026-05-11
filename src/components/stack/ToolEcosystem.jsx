import { motion } from "framer-motion";
import {
    Brain,
    Code2,
    MessageSquare,
    Box,
    Hexagon,
    Github,
    Atom,
    Zap,
    Wind,
    Sparkles,
    Boxes,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const GROUPS = [
    {
        id: "intelligence",
        title: "Intelligence Layer",
        eyebrow: "Layer · 01",
        body: "החשיבה והסוכנים. כאן נולדות החלטות, נכתבות תוכניות, ונבחנים רעיונות לפני שהקוד נוגע.",
        bloomClass: "bloom-amber",
        tools: [
            { name: "Claude", role: "AI Partner", icon: Brain, body: "החשיבה הראשית — תכנון, סקירה, ובחינת רעיונות לפני שהם נכנסים לקוד." },
            { name: "Claude Code", role: "Coding Agent", icon: Code2, body: "סוכן ב-CLI שמריץ פקודות, עורך קבצים, ומבצע משימות end-to-end." },
            { name: "ChatGPT", role: "Brainstorm", icon: MessageSquare, body: "להשוואת זוויות, סיעור מוחות, וגישה שנייה כשצריך אופוזיציה לרעיון." },
        ],
    },
    {
        id: "development",
        title: "Development Surface",
        eyebrow: "Layer · 02",
        body: "הסביבה היומיומית של כתיבת קוד. Editor + AI + version control מחוברים במערכת אחת.",
        bloomClass: "bloom-blue",
        tools: [
            { name: "VS Code", role: "Editor", icon: Code2, body: "סביבת העריכה היומיומית — קלה, ניתנת להרחבה, מחוברת ל-Claude Code." },
            { name: "Cursor", role: "AI Editor", icon: Box, body: "כשצריך AI עם UI מלא בתוך העורך — לעריכות מהירות וזיווג קוד." },
            { name: "GitHub", role: "Source · CI", icon: Github, body: "כל commit חי בפומבי. ה-history הוא ה-changelog." },
        ],
    },
    {
        id: "knowledge",
        title: "Knowledge Layer",
        eyebrow: "Layer · 03",
        body: "המוח השני — Vault שמחזיק את כל הסקריפטים, הלקחים, וההחלטות עם graph חי.",
        bloomClass: "bloom-violet",
        tools: [
            { name: "Obsidian", role: "Second Brain", icon: Hexagon, body: "Vault שמחזיק סקריפטים, החלטות, ו-graph view של כל פרויקט." },
        ],
    },
    {
        id: "build",
        title: "Build & Ship Stack",
        eyebrow: "Layer · 04",
        body: "השכבה שמייצרת את הפלטפורמה הזו. כל בחירה כאן מגובה ב-bundle target ובהגיון arch.",
        bloomClass: "bloom-magenta",
        tools: [
            { name: "React", role: "UI Runtime", icon: Atom, body: "React 19 · concurrent rendering · Suspense lazy routes." },
            { name: ".NET / C#", role: "Foundation", icon: Boxes, body: "הבסיס של שנים — backend, מערכות, ו-Mahat curriculum." },
            { name: "Vite", role: "Bundler", icon: Zap, body: "Vite 7 · manualChunks · sub-second HMR · sourcemaps off in prod." },
            { name: "Tailwind", role: "Styling", icon: Wind, body: "Tailwind 3.4 · custom shade scale · glass tier system · ease-premium." },
            { name: "Framer Motion", role: "Motion", icon: Sparkles, body: "v12 · single EASE curve · whileInView once · reduced-motion guards." },
        ],
    },
];

const MARQUEE_LABELS = GROUPS.flatMap((g) => g.tools.map((t) => t.name));

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

function ToolTile({ tool, bloomClass }) {
    const Icon = tool.icon;
    return (
        <div className={`group relative rounded-2xl glass-panel-1 surface-warm card-ambient ${bloomClass} p-4 transition-colors duration-500 hover:border-white/15 overflow-hidden`}>
            <div className="relative z-10 card-content-layer">
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
}

function GroupBlock({ group, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.05, duration: 0.6, ease: EASE }}
            className={`relative rounded-[1.75rem] glass-panel-2 surface-warm card-ambient ${group.bloomClass} p-7 lg:p-8 overflow-hidden`}
        >
            <div className="relative z-10 card-content-layer">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <span dir="ltr" className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-2 block">
                            {group.eyebrow}
                        </span>
                        <h3 className="font-display text-xl lg:text-2xl font-bold text-white">
                            {group.title}
                        </h3>
                    </div>
                    <span
                        aria-hidden="true"
                        className="hidden sm:inline-flex h-9 px-3 rounded-full items-center text-[10.5px] font-mono uppercase tracking-[0.18em] text-ink-muted bg-white/[0.035] border border-white/[0.07]"
                    >
                        {group.tools.length} {group.tools.length === 1 ? "tool" : "tools"}
                    </span>
                </div>

                <p className="text-[14.5px] text-ink-muted leading-relaxed mb-6 max-w-2xl">
                    {group.body}
                </p>

                {/* Connection rail */}
                <div
                    aria-hidden="true"
                    className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-6"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {group.tools.map((tool) => (
                        <ToolTile key={tool.name} tool={tool} bloomClass={group.bloomClass} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export function ToolEcosystem() {
    return (
        <section
            id="tool-ecosystem"
            className="py-24 relative z-10"
            aria-labelledby="tool-ecosystem-heading"
        >
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-4">
                        Tool Ecosystem · Connected Stack
                    </div>
                    <h2 id="tool-ecosystem-heading" className="text-4xl md:text-5xl lg:text-5xl font-black tracking-normal text-white mb-4">
                        כלים שמדברים <span className="text-brand-gradient">אחד עם השני</span>.
                    </h2>
                    <p className="text-lg text-ink-muted leading-relaxed">
                        ארבע שכבות. כל כלי קיבל role + הסבר. אין לוגואים לתפאורה — יש מערכת.
                    </p>
                </div>

                <MarqueeRail />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7">
                    {GROUPS.map((g, i) => (
                        <GroupBlock key={g.id} group={g} index={i} />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-ink-dim max-w-xl mx-auto">
                        כל כלי כאן הוכיח את עצמו על פרויקט אמיתי לפני שהוא נכנס ל-stack. לא טרנדים — מה שעובד.
                    </p>
                </div>
            </div>
        </section>
    );
}
