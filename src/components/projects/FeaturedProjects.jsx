import { motion } from "framer-motion";
import { Globe, GraduationCap, Bot, Github, ArrowLeft, Layers3 } from "lucide-react";
import { Tilt3D, CardGlow } from "../ui/Tilt3D";

const EASE = [0.16, 1, 0.3, 1];

const PROJECTS = [
    {
        id: "yuvalcode-platform",
        number: "01",
        category: "Creator Platform",
        title: "YuvalCode Platform",
        description:
            "פלטפורמת ההיוצר עצמה — אתר Hebrew-RTL מלא, lazy-loaded, עם שכבת YouTube חיה, מערכת glass design, ועמוד AI ראשון. נבנה כדי להיות ה-HQ של הערוץ, לא דף נחיתה.",
        solves:
            "המקום היחיד שמרכז ערוץ + לימוד + פרויקטים תחת חוויה אחת, RTL ראשון, mobile-first.",
        stack: ["React 19", "Vite 7", "Tailwind", "Framer Motion", "Native head metadata"],
        architecture: [
            "Code-splitting בכל route · main bundle 85kb gzip",
            "שכבת YouTube עם 3-tier TTL cache · stale-on-error",
            "Glass tier system (1/2/3) · single brand gradient · ease-premium",
        ],
        icon: Globe,
        rgb: "129, 140, 248",
        accent: "from-indigo-500/25 to-violet-500/15",
        ring: "group-hover:ring-indigo-400/40",
        status: "פעיל",
        statusTone: "live",
    },
    {
        id: "mahat-library",
        number: "02",
        category: "Learning System",
        title: "Mahat Learning Library",
        description:
            "ספרייה ציבורית של פתרונות מבחני מה״ט בתכנות — קטלוג מאות פתרונות ב-C#, מבני נתונים ואלגוריתמים, עם sort חכם, פילטרים, ופירוט per-exam.",
        solves:
            "סטודנטים מצאו עד היום פתרונות מפוזרים. כאן: מקום אחד, סדר ברור, Hebrew-first.",
        stack: ["YouTube Data API", "Custom normalizer", "Mahat-priority sort", "RTL UI"],
        architecture: [
            "Description-first → title-regex → playlist-context fallback",
            "Sort: priority groups → year DESC → alpha (numeric: true)",
            "Batch duration enrichment · 50 פריטים בקריאה",
        ],
        icon: GraduationCap,
        rgb: "168, 85, 247",
        accent: "from-purple-500/25 to-fuchsia-500/15",
        ring: "group-hover:ring-purple-400/40",
        status: "פעיל",
        statusTone: "live",
    },
    {
        id: "ai-workflows",
        number: "03",
        category: "AI Systems",
        title: "AI Workflow Systems",
        description:
            "סוכן שמנהל את צנרת הערוץ end-to-end — מתסריט, לתמלול, לתיוג, ל-thumbnails. נבנה לאט, נכנס לייצור רק אחרי שרץ במקביל לזרימה הידנית מספיק זמן כדי להוכיח את עצמו.",
        solves:
            "קצב יצירה של יוצר אחד נשבר על משימות חוזרות. סוכן עם זיכרון פותר את זה — אם בונים אותו נכון.",
        stack: ["Claude Code", "Agent loops", "Tool use", "RAG patterns", "Eval harness"],
        architecture: [
            "Sub-agents מבודדים לפי תחום אחריות",
            "Memory layer ב-Obsidian · graph view של החלטות",
            "Cost · latency · safety budgets לפני כל deploy",
        ],
        icon: Bot,
        rgb: "236, 72, 153",
        accent: "from-pink-500/25 to-rose-500/15",
        ring: "group-hover:ring-pink-400/40",
        status: "בבנייה",
        statusTone: "building",
    },
];

const STATUS_STYLES = {
    live: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
    building: "text-amber-300 bg-amber-500/10 border-amber-500/20",
    soon: "text-ink-muted bg-white/[0.04] border-white/10",
};

function ProjectCard({ project, index }) {
    const Icon = project.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.07, duration: 0.7, ease: EASE }}
            className="h-full"
        >
            <Tilt3D className="h-full">
                <article
                    className={`relative h-full rounded-[1.75rem] glass-panel-2 p-7 lg:p-8 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-white/20 ring-1 ring-transparent ${project.ring}`}
                >
                    <CardGlow rgb={project.rgb} />

                    <div
                        className={`absolute -right-20 -top-20 w-60 h-60 bg-gradient-to-br ${project.accent} blur-[80px] opacity-80 group-hover:opacity-100 transition-opacity duration-500`}
                        aria-hidden="true"
                    />

                    <div className="relative z-10 flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/20 transition-all duration-300">
                                <Icon className="h-5 w-5 text-white" strokeWidth={1.75} aria-hidden="true" />
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span dir="ltr" className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-dim">
                                    Project · {project.number}
                                </span>
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-mono uppercase tracking-[0.18em] ${STATUS_STYLES[project.statusTone]}`}>
                                    {project.statusTone === "live" && (
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                        </span>
                                    )}
                                    {project.status}
                                </span>
                            </div>
                        </div>

                        {/* Category eyebrow */}
                        <div dir="ltr" className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-3 text-left">
                            {project.category}
                        </div>

                        {/* Title */}
                        <h3 dir="ltr" className="text-2xl lg:text-[26px] font-bold text-white text-left mb-3 group-hover:text-primary-200 transition-colors leading-snug">
                            {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-ink-muted leading-relaxed mb-5 text-[15px]">
                            {project.description}
                        </p>

                        {/* What this solves */}
                        <div className="rounded-xl bg-white/[0.025] border border-white/[0.06] px-4 py-3 mb-5">
                            <span className="block text-[10px] font-mono uppercase tracking-[0.22em] text-ink-dim mb-1.5">
                                What this solves
                            </span>
                            <p className="text-[13.5px] text-ink leading-relaxed">{project.solves}</p>
                        </div>

                        {/* Architecture highlights */}
                        <div className="mb-5">
                            <span className="block text-[10px] font-mono uppercase tracking-[0.22em] text-ink-dim mb-2">
                                Architecture
                            </span>
                            <ul className="space-y-1.5">
                                {project.architecture.map((line) => (
                                    <li key={line} className="flex items-start gap-2.5 text-[13.5px] text-ink-muted leading-relaxed">
                                        <span aria-hidden="true" className="mt-2 h-1 w-1 rounded-full bg-white/30 shrink-0" />
                                        <span dir="auto">{line}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Stack chips */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                            {project.stack.map((s) => (
                                <span
                                    key={s}
                                    dir="ltr"
                                    className="inline-flex items-center px-2.5 py-1 rounded-full text-[10.5px] font-mono uppercase tracking-[0.16em] text-ink-muted bg-white/[0.035] border border-white/[0.07]"
                                >
                                    {s}
                                </span>
                            ))}
                        </div>

                        {/* Footer affordance */}
                        <div className="flex items-center justify-between pt-5 mt-auto border-t border-white/5">
                            <span className="inline-flex items-center gap-2 text-sm font-medium text-white/80 group-hover:text-primary-200 transition-colors">
                                Case study
                                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-[10.5px] font-mono uppercase tracking-[0.18em] text-ink-dim">
                                <Layers3 className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                                {project.stack.length} layers
                            </span>
                        </div>
                    </div>
                </article>
            </Tilt3D>
        </motion.div>
    );
}

export function FeaturedProjects() {
    return (
        <section
            id="featured-projects"
            className="py-24 relative z-10"
            aria-labelledby="featured-projects-heading"
        >
            <div className="container px-4 mx-auto">
                <div className="max-w-2xl mb-14">
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-4">
                        <Github className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                        Featured Systems · 2026
                    </div>
                    <h2 id="featured-projects-heading" className="text-4xl md:text-5xl lg:text-5xl font-black tracking-normal text-white mb-4">
                        שלושה <span className="text-brand-gradient">פרויקטים</span> חיים.
                    </h2>
                    <p className="text-lg text-ink-muted leading-relaxed">
                        כל אחד פותר בעיה אמיתית ומורץ בייצור — או נמצא בנתיב מוגדר אליו. בלי mockups, בלי screenshots-only.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7">
                    {PROJECTS.map((p, i) => (
                        <ProjectCard key={p.id} project={p} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
