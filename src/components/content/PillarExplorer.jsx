import { motion } from "framer-motion";
import {
    Code2,
    GraduationCap,
    Brain,
    Terminal,
    Orbit,
    Hexagon,
    Bot,
    Compass,
    ArrowLeft,
    Network,
} from "lucide-react";
import { Tilt3D, CardGlow } from "../ui/Tilt3D";

const EASE = [0.16, 1, 0.3, 1];

const PILLARS = [
    {
        id: "programming",
        number: "01",
        eyebrow: "Programming · C#",
        title: "תכנות אמיתי, לא קוד-לדוגמה.",
        body: "C#, מבני נתונים, ואלגוריתמים — שכבת היסוד של כל מה שבונים אחר כך. ההסבר הוא של מורה, הקצב הוא של בונה.",
        connects: ["Mahat Solutions", "Building with AI"],
        icon: Code2,
        rgb: "56, 189, 248",
        accent: "from-sky-500/22 to-cyan-500/12",
        ring: "group-hover:ring-sky-400/40",
    },
    {
        id: "mahat",
        number: "02",
        eyebrow: "Mahat Solutions",
        title: "קטלוג מה״ט · הספרייה הציבורית.",
        body: "מאות פתרונות וידאו ב-C#, מסודרים לפי שנה, מועד ונושא. הפלייליסט הדגל של הערוץ — תורגם לקטלוג מסונן.",
        connects: ["Programming · C#", "Creator Journey"],
        icon: GraduationCap,
        rgb: "129, 140, 248",
        accent: "from-indigo-500/22 to-violet-500/12",
        ring: "group-hover:ring-indigo-400/40",
    },
    {
        id: "ai-tools",
        number: "03",
        eyebrow: "AI Tools",
        title: "הכלים שמייצרים את הקצב.",
        body: "Claude, ChatGPT, Cursor, Anti Gravity — מי משמש מתי, איך לחבר אותם זה לזה, ואיך לא להפוך אותם ל-autopilot.",
        connects: ["Claude Code", "Building with AI"],
        icon: Brain,
        rgb: "168, 85, 247",
        accent: "from-purple-500/22 to-fuchsia-500/12",
        ring: "group-hover:ring-purple-400/40",
    },
    {
        id: "claude-code",
        number: "04",
        eyebrow: "Claude Code",
        title: "סוכן CLI שעובד באמת.",
        body: "Sub-agents, MCP, skills, hooks — איך נראה יום-יום של מפתח שעובד עם Claude Code על פרויקטים אמיתיים, לא דמו.",
        connects: ["AI Tools", "Building with AI"],
        icon: Terminal,
        rgb: "251, 146, 60",
        accent: "from-orange-500/22 to-amber-500/12",
        ring: "group-hover:ring-amber-400/40",
    },
    {
        id: "anti-gravity",
        number: "05",
        eyebrow: "Anti Gravity",
        title: "מערכות שמרימות את היוצר.",
        body: "Workflows שמסירים חיכוך מהיומיום של יוצר תוכן — מתסריט ועד פרסום, בלי איבוד שיקול דעת אנושי.",
        connects: ["Claude Code", "Creator Journey"],
        icon: Orbit,
        rgb: "236, 72, 153",
        accent: "from-pink-500/22 to-rose-500/12",
        ring: "group-hover:ring-pink-400/40",
    },
    {
        id: "obsidian",
        number: "06",
        eyebrow: "Obsidian",
        title: "Second brain של יוצר.",
        body: "Vault שמחזיק כל סקריפט, כל לקח, וכל החלטה. Daily notes שעובדים. Linked thinking וגרף שמחזיק לאורך שנים.",
        connects: ["AI Tools", "Creator Journey"],
        icon: Hexagon,
        rgb: "139, 92, 246",
        accent: "from-violet-500/22 to-indigo-500/12",
        ring: "group-hover:ring-violet-400/40",
    },
    {
        id: "building-with-ai",
        number: "07",
        eyebrow: "Building with AI",
        title: "מוצרים אמיתיים בעידן AI.",
        body: "מהקצה לקצה: ארכיטקטורה, deployment, observability, ועלויות. איך מוצר AI שורד את המעבר מ-demo לייצור.",
        connects: ["Claude Code", "AI Tools"],
        icon: Bot,
        rgb: "236, 72, 153",
        accent: "from-pink-500/22 to-rose-500/12",
        ring: "group-hover:ring-pink-400/40",
    },
    {
        id: "creator-journey",
        number: "08",
        eyebrow: "The Creator Journey",
        title: "מסע היוצר · בפומבי.",
        body: "החלטות קריירה, רגעי ספק, ושינוי כיוון — מתועדים. הסיפור של הבנייה, לא רק התוצר. זה מה שיוצר נאמנות לאורך זמן.",
        connects: ["Mahat", "Anti Gravity"],
        icon: Compass,
        rgb: "203, 213, 225",
        accent: "from-slate-300/15 to-zinc-300/10",
        ring: "group-hover:ring-slate-300/30",
    },
];

function PillarCard({ pillar, index }) {
    const Icon = pillar.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.05, duration: 0.65, ease: EASE }}
            className="h-full"
        >
            <Tilt3D className="h-full">
                <article
                    className={`relative h-full rounded-[1.75rem] glass-panel-2 p-6 lg:p-7 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-white/20 ring-1 ring-transparent ${pillar.ring}`}
                >
                    <CardGlow rgb={pillar.rgb} />

                    <div
                        aria-hidden="true"
                        className={`absolute -right-20 -top-20 w-60 h-60 bg-gradient-to-br ${pillar.accent} blur-[80px] opacity-80 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    <div className="relative z-10 flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/20 transition-all duration-300">
                                <Icon className="h-5 w-5 text-white" strokeWidth={1.75} aria-hidden="true" />
                            </div>
                            <span dir="ltr" className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-dim">
                                Pillar · {pillar.number}
                            </span>
                        </div>

                        {/* Eyebrow */}
                        <div dir="ltr" className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-3 text-left">
                            {pillar.eyebrow}
                        </div>

                        {/* Title */}
                        <h3 className="text-lg lg:text-xl font-bold text-white mb-3 group-hover:text-primary-200 transition-colors leading-snug">
                            {pillar.title}
                        </h3>

                        {/* Body */}
                        <p className="text-[14px] text-ink-muted leading-relaxed mb-5 flex-grow">
                            {pillar.body}
                        </p>

                        {/* Connects to */}
                        <div className="pt-4 mt-auto border-t border-white/5">
                            <div className="flex items-center gap-1.5 mb-2">
                                <Network className="h-3 w-3 text-ink-dim" strokeWidth={2} aria-hidden="true" />
                                <span dir="ltr" className="text-[9.5px] font-mono uppercase tracking-[0.22em] text-ink-dim">
                                    Connects to
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {pillar.connects.map((c) => (
                                    <span
                                        key={c}
                                        dir="ltr"
                                        className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.16em] text-ink-muted bg-white/[0.035] border border-white/[0.07]"
                                    >
                                        {c}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/70 group-hover:text-primary-200 transition-colors">
                                גלה את הסדרה
                                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                </article>
            </Tilt3D>
        </motion.div>
    );
}

export function PillarExplorer() {
    return (
        <section
            id="pillar-explorer"
            className="py-24 relative z-10"
            aria-labelledby="pillar-explorer-heading"
        >
            <div className="container px-4 mx-auto">
                <div className="max-w-2xl mb-14">
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-4">
                        <Network className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                        Knowledge Graph · 8 Pillars
                    </div>
                    <h2 id="pillar-explorer-heading" className="text-4xl md:text-5xl lg:text-5xl font-black tracking-normal text-white mb-4">
                        שמונה <span className="text-brand-gradient">נתיבים</span>. מערכת אחת.
                    </h2>
                    <p className="text-lg text-ink-muted leading-relaxed">
                        כל pillar מחובר לפחות לעוד שניים. זו לא רשימת קטגוריות — זו רשת ידע שמלמדת איך הדברים מדברים זה עם זה.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                    {PILLARS.map((p, i) => (
                        <PillarCard key={p.id} pillar={p} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
