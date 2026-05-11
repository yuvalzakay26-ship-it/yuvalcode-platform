import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    GraduationCap,
    Bot,
    Layers,
    Hexagon,
    Compass,
    ArrowLeft,
    Route,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const PATHWAYS = [
    {
        id: "csharp-foundation",
        eyebrow: "Pathway · 01",
        title: "Start with C#",
        subtitle: "מהיסודות ועד שאלות מה״ט.",
        body: "מסלול ליניארי לתכנות מאפס: תחביר, מבני נתונים, אלגוריתמים, ופתרון מבחני מה״ט עם הסבר מלא.",
        steps: [
            { tag: "Programming", text: "יסודות C# · משתנים, תנאים, לולאות" },
            { tag: "Data", text: "מבני נתונים · arrays · linked lists · trees" },
            { tag: "Mahat", text: "פתרון מבחני מה״ט · year DESC" },
        ],
        href: "/exams",
        cta: "התחל בקטלוג",
        icon: GraduationCap,
        rgb: "56, 189, 248",
        accent: "from-sky-500/22 to-cyan-500/12",
        ring: "group-hover:ring-sky-400/40",
    },
    {
        id: "ai-workflows",
        eyebrow: "Pathway · 02",
        title: "Start with AI Workflows",
        subtitle: "Claude Code · Agents · RAG.",
        body: "מסלול שמכניס אותך לעבודה יומיומית עם סוכני AI, ולא רק תיאוריה — workflow אחר workflow.",
        steps: [
            { tag: "Tools", text: "Claude Code · sub-agents · skills" },
            { tag: "Patterns", text: "RAG patterns · agent loops · memory" },
            { tag: "Production", text: "Cost · latency · safety budgets" },
        ],
        href: "/ai",
        cta: "צלול ל-AI Track",
        icon: Bot,
        rgb: "168, 85, 247",
        accent: "from-purple-500/22 to-pink-500/12",
        ring: "group-hover:ring-purple-400/40",
    },
    {
        id: "first-system",
        eyebrow: "Pathway · 03",
        title: "Build Your First System",
        subtitle: "מ-prompt בודד למערכת שעובדת.",
        body: "מסלול שמראה איך להעביר רעיון של מוצר AI ממקום שעובד פעם אחת — למערכת שעובדת לאורך זמן.",
        steps: [
            { tag: "Architecture", text: "Sub-agents · tool use · schemas" },
            { tag: "Eval", text: "Eval harness · regression checks" },
            { tag: "Ship", text: "Production deploy · observability" },
        ],
        href: "/projects",
        cta: "ראה מערכות חיות",
        icon: Layers,
        rgb: "129, 140, 248",
        accent: "from-indigo-500/22 to-violet-500/12",
        ring: "group-hover:ring-indigo-400/40",
    },
    {
        id: "creator-workflow",
        eyebrow: "Pathway · 04",
        title: "Learn Creator Workflows",
        subtitle: "Anti Gravity · Obsidian · קצב יוצר.",
        body: "המסלול ליוצרי תוכן שרוצים לשלב AI במערך העבודה היומי — בלי לאבד את שיקול הדעת ואת הקול האישי.",
        steps: [
            { tag: "Obsidian", text: "Vault structure · daily notes · graph" },
            { tag: "Anti Gravity", text: "Friction-removing workflows" },
            { tag: "Cadence", text: "Ship every week · in public" },
        ],
        href: "/ai",
        cta: "ראה את ה-stack",
        icon: Hexagon,
        rgb: "139, 92, 246",
        accent: "from-violet-500/22 to-indigo-500/12",
        ring: "group-hover:ring-violet-400/40",
    },
    {
        id: "explore-tools",
        eyebrow: "Pathway · 05",
        title: "Explore AI Tools",
        subtitle: "מי משמש מתי, ולמה.",
        body: "מפת הכלים — Claude, ChatGPT, Cursor, Anti Gravity — והבחירה ביניהם לפי משימה ומצב, לא לפי באז.",
        steps: [
            { tag: "Claude", text: "Planning · review · partner thinking" },
            { tag: "Cursor", text: "Editor-native AI · pair programming" },
            { tag: "Anti Gravity", text: "Workflow systems · creator stack" },
        ],
        href: "/ai",
        cta: "הכר את הכלים",
        icon: Compass,
        rgb: "236, 72, 153",
        accent: "from-pink-500/22 to-rose-500/12",
        ring: "group-hover:ring-pink-400/40",
    },
];

function PathwayCard({ pathway, index }) {
    const Icon = pathway.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.05, duration: 0.65, ease: EASE }}
            className="h-full"
        >
            <Link
                to={pathway.href}
                aria-label={`${pathway.title} — ${pathway.cta}`}
                className={`group relative block h-full rounded-[1.75rem] glass-panel-2 p-7 lg:p-8 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-white/20 ring-1 ring-transparent ${pathway.ring}`}
            >
                <div
                    aria-hidden="true"
                    className={`absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br ${pathway.accent} blur-[80px] opacity-80 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/20 transition-all duration-300">
                            <Icon className="h-5 w-5 text-white" strokeWidth={1.75} aria-hidden="true" />
                        </div>
                        <span dir="ltr" className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-dim">
                            {pathway.eyebrow}
                        </span>
                    </div>

                    <h3 dir="ltr" className="font-display text-2xl lg:text-[26px] font-bold text-white text-left mb-2 group-hover:text-primary-200 transition-colors leading-snug">
                        {pathway.title}
                    </h3>

                    <p className="text-[15px] text-ink-muted mb-5 leading-relaxed">
                        {pathway.subtitle}
                    </p>

                    <p className="text-[14px] text-ink-muted mb-6 leading-relaxed flex-grow">
                        {pathway.body}
                    </p>

                    {/* Steps */}
                    <ol className="space-y-2 mb-6" role="list">
                        {pathway.steps.map((s, i) => (
                            <li key={s.text} className="flex items-start gap-3">
                                <span
                                    dir="ltr"
                                    className="shrink-0 inline-flex items-center justify-center h-5 w-5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono text-ink-muted"
                                    aria-hidden="true"
                                >
                                    {i + 1}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <span dir="ltr" className="block text-[10px] font-mono uppercase tracking-[0.18em] text-ink-dim mb-0.5">
                                        {s.tag}
                                    </span>
                                    <span dir="auto" className="text-[13.5px] text-ink-muted leading-snug">
                                        {s.text}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ol>

                    {/* CTA */}
                    <div className="pt-4 mt-auto border-t border-white/5 flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-white/80 group-hover:text-primary-200 transition-colors">
                            {pathway.cta}
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                        </span>
                        <span dir="ltr" className="inline-flex items-center gap-1.5 text-[10.5px] font-mono uppercase tracking-[0.18em] text-ink-dim">
                            <Route className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                            {pathway.steps.length} steps
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export function ContentLearningPathways() {
    return (
        <section
            id="learning-pathways"
            className="py-24 relative z-10"
            aria-labelledby="content-learning-pathways-heading"
        >
            <div className="container px-4 mx-auto">
                <div className="max-w-2xl mb-14">
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-4">
                        <Route className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                        Learning Pathways · Structured Discovery
                    </div>
                    <h2 id="content-learning-pathways-heading" className="text-4xl md:text-5xl lg:text-5xl font-black tracking-normal text-white mb-4">
                        בחר את <span className="text-brand-gradient">המסלול</span> שלך.
                    </h2>
                    <p className="text-lg text-ink-muted leading-relaxed">
                        חמישה נתיבים מוגדרים מראש שמחברים בין ה-pillars. כל אחד הוא רצף הגיוני — לא רשימת קישורים אקראית.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                    {PATHWAYS.map((p, i) => (
                        <PathwayCard key={p.id} pathway={p} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
