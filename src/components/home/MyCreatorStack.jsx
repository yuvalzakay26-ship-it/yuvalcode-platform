import { motion } from "framer-motion";
import { Brain, Terminal, Sparkles, Hexagon, Github, Code2, Workflow, Atom } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const MARQUEE = [
    "Claude", "Claude Code", "Anti Gravity", "Obsidian", "GitHub",
    "C# / .NET", "React", "Vite", "Tailwind", "Vercel",
    "Framer Motion", "TypeScript", "Node",
];

const STACK = [
    {
        id: "claude",
        name: "Claude",
        category: "AI Partner",
        body: "משמש אותי לסיעור מוחות טכני, סקירת קוד, ולפעמים גם כדי לפשט רעיונות מורכבים לפני שאני מסריט.",
        icon: Brain,
        accent: "from-orange-500/15 to-amber-500/10",
        ring: "group-hover:ring-amber-400/40",
    },
    {
        id: "claude-code",
        name: "Claude Code",
        category: "Coding Agent",
        body: "עוזר לי לכתוב קוד מהר יותר דרך הטרמינל. מריץ פקודות, מחפש בקבצים, וחוסך המון פעולות רפטטיביות.",
        icon: Terminal,
        accent: "from-amber-500/15 to-rose-500/10",
        ring: "group-hover:ring-rose-400/40",
    },
    {
        id: "anti-gravity",
        name: "Anti Gravity",
        category: "Exploring · Agent System",
        body: "מערכת AI שאני בודק כדי לנהל את העבודה שלי. פרויקט בהתפתחות שאני לומד תוך כדי תנועה.",
        icon: Sparkles,
        accent: "from-purple-500/20 to-pink-500/10",
        ring: "group-hover:ring-purple-400/40",
    },
    {
        id: "obsidian",
        name: "Obsidian",
        category: "Second Brain",
        body: "המקום שבו אני מתעד הכל. סקריפטים, סיכומי למידה, וקטעי קוד שאני צריך לזכור.",
        icon: Hexagon,
        accent: "from-violet-500/20 to-indigo-500/10",
        ring: "group-hover:ring-violet-400/40",
    },
    {
        id: "github",
        name: "GitHub",
        category: "Build in Public",
        body: "כל הקוד מהסרטונים והפרויקטים שלי נמצא כאן, פתוח לכולם.",
        icon: Github,
        accent: "from-slate-400/15 to-zinc-500/10",
        ring: "group-hover:ring-zinc-300/40",
    },
    {
        id: "csharp",
        name: "C# · .NET",
        category: "Foundation",
        body: "השפה שאני מלמד הכי הרבה. שפה מעולה להבין דרכה תכנות מונחה עצמים ומבנה נתונים.",
        icon: Code2,
        accent: "from-blue-500/20 to-cyan-500/10",
        ring: "group-hover:ring-cyan-400/40",
    },
    {
        id: "react",
        name: "React · Vite",
        category: "Front-End",
        body: "הכלים העיקריים שלי לבניית ממשקי משתמש. איתם גם בניתי את האתר הזה.",
        icon: Atom,
        accent: "from-cyan-500/15 to-sky-500/10",
        ring: "group-hover:ring-sky-400/40",
    },
    {
        id: "automation",
        name: "Workflow Automation",
        category: "Glue",
        body: "סקריפטים שאני כותב כדי לחבר בין הכלים השונים שלי ולחסוך זמן טכני.",
        icon: Workflow,
        accent: "from-emerald-500/15 to-teal-500/10",
        ring: "group-hover:ring-emerald-400/40",
    },
];

function MarqueeStrip() {
    const items = [...MARQUEE, ...MARQUEE]; // duplicate for seamless loop
    return (
        <div
            className="relative overflow-hidden mask-fade py-3 mb-12 border-y border-white/5"
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

export function MyCreatorStack() {
    return (
        <section id="creator-stack" className="py-24 relative z-10">
            <div className="container px-4 mx-auto">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-4">
                        <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
                        סביבת עבודה · 2026
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-5xl font-black tracking-normal text-white mb-4">
                        הכלים <span className="text-brand-gradient">שאני בונה</span> איתם.
                    </h2>
                    <p className="text-lg text-ink-muted leading-relaxed">
                        הכלים שמרכיבים את סביבת העבודה היומיומית שלי. לא מדובר ברשימת לוגואים יפה, אלא בכלים שאני באמת משתמש בהם כדי לכתוב קוד ולייצר תוכן.
                    </p>
                </div>

                {/* Marquee strip — animated icon row */}
                <MarqueeStrip />

                {/* Why-it-matters grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {STACK.map((tool, i) => {
                        const Icon = tool.icon;
                        return (
                            <motion.div
                                key={tool.id}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ delay: i * 0.04, duration: 0.5, ease: EASE }}
                                className={`group relative rounded-2xl glass-panel-1 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/15 ring-1 ring-transparent ${tool.ring} overflow-hidden`}
                            >
                                <div className={`absolute -top-16 -left-16 w-40 h-40 rounded-full bg-gradient-to-br ${tool.accent} blur-[60px] opacity-70 group-hover:opacity-100 transition-opacity duration-500`} />

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/20 transition-all duration-300">
                                            <Icon className="h-5 w-5 text-white" strokeWidth={1.75} />
                                        </div>
                                        <span dir="ltr" className="text-[9.5px] font-mono uppercase tracking-[0.22em] text-ink-dim">
                                            {tool.category}
                                        </span>
                                    </div>
                                    <h3 dir="ltr" className="text-lg font-bold text-white text-left mb-2 group-hover:text-primary-200 transition-colors">
                                        {tool.name}
                                    </h3>
                                    <p className="text-sm text-ink-muted leading-relaxed">
                                        {tool.body}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Footer caption */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-ink-dim max-w-xl mx-auto">
                        הרשימה הזו משתנה כשאני מוצא כלים חדשים שבאמת עובדים עבורי. מוזמנים לעקוב אחרי הפרויקטים בערוץ כדי לראות אותם בפעולה.
                    </p>
                </div>
            </div>
        </section>
    );
}
