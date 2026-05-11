import { motion } from "framer-motion";
import {
    Sun,
    Search,
    Workflow,
    Code2,
    FlaskConical,
    BookOpen,
    Send,
    RotateCw,
    Clock,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const PHASES = [
    {
        id: "morning",
        marker: "Phase · 01",
        time: "06:30",
        title: "Morning brief",
        body:
            "Daily note ב-Obsidian נפתח. סקירה של ה-vault — מה נשאר פתוח אתמול, איזה רעיונות חיכו ללילה, ומה הפוקוס היחיד של היום.",
        tools: ["Obsidian", "Daily Notes"],
        icon: Sun,
        tone: "calm",
    },
    {
        id: "research",
        marker: "Phase · 02",
        time: "07:00",
        title: "Research",
        body:
            "שאלות פתוחות עוברות ל-Claude. RAG patterns, ספריות חדשות, debate על arch decisions. תשובות חוזרות ל-vault עם קישור למקור.",
        tools: ["Claude", "ChatGPT", "Obsidian"],
        icon: Search,
        tone: "research",
    },
    {
        id: "planning",
        marker: "Phase · 03",
        time: "08:30",
        title: "Planning",
        body:
            "Feature plan ב-Markdown — בעיה, מערכת, שלבים, וקריטריוני קבלה. Claude סוקר את התכנון לפני שמתחילים. אם משהו לא ברור — חוזרים שלב.",
        tools: ["Claude", "Markdown", "Obsidian"],
        icon: Workflow,
        tone: "plan",
    },
    {
        id: "coding",
        marker: "Phase · 04",
        time: "09:30",
        title: "Coding",
        body:
            "VS Code + Claude Code רץ במקביל. כל commit הוא יחידת עבודה אחת — feature, fix, או refactor. ה-history הופך ל-changelog.",
        tools: ["VS Code", "Claude Code", "GitHub"],
        icon: Code2,
        tone: "build",
    },
    {
        id: "testing",
        marker: "Phase · 05",
        time: "12:00",
        title: "Testing & review",
        body:
            "בדיקה ידנית בדפדפן, eval harness לסוכנים. Claude עוזר ב-code review של ה-diff לפני merge. אם eval ירד — לא מ-deploy.",
        tools: ["Browser", "Eval Harness", "Claude"],
        icon: FlaskConical,
        tone: "review",
    },
    {
        id: "documenting",
        marker: "Phase · 06",
        time: "14:00",
        title: "Documenting",
        body:
            "לקח חוזר ל-vault. Decision record · what worked · what failed. כותב סקריפט לסרטון אם הלקח שווה אותו.",
        tools: ["Obsidian", "Decision Records"],
        icon: BookOpen,
        tone: "doc",
    },
    {
        id: "publishing",
        marker: "Phase · 07",
        time: "16:00",
        title: "Publishing",
        body:
            "Push ל-GitHub. Deploy. אם יש סרטון — צילום, חיתוך ב-Premiere, ופרסום. Build-in-public אומר שגם הקומיט הציבורי וגם הסרטון יוצאים באותו שבוע.",
        tools: ["GitHub", "Premiere", "YouTube"],
        icon: Send,
        tone: "ship",
    },
    {
        id: "iteration",
        marker: "Phase · 08",
        time: "Evening",
        title: "Iteration",
        body:
            "סגירת הלולאה. סקירה של מה שנדחה, רעיונות שעלו תוך כדי, ועדכון של ה-roadmap למחר. ה-loop הוא היחידה — לא הסטטוס.",
        tools: ["Obsidian", "Roadmap"],
        icon: RotateCw,
        tone: "loop",
    },
];

const TONE_DOT = {
    calm: "bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.7)]",
    research: "bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.7)]",
    plan: "bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.7)]",
    build: "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.7)]",
    review: "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]",
    doc: "bg-pink-400 shadow-[0_0_12px_rgba(244,114,182,0.7)]",
    ship: "bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.7)]",
    loop: "bg-white/40",
};

const TONE_TEXT = {
    calm: "text-sky-300",
    research: "text-violet-300",
    plan: "text-indigo-300",
    build: "text-amber-300",
    review: "text-emerald-300",
    doc: "text-pink-300",
    ship: "text-rose-300",
    loop: "text-ink-dim",
};

function PhaseEntry({ item, index }) {
    const Icon = item.icon;
    return (
        <motion.li
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.05, duration: 0.6, ease: EASE }}
            className="relative pr-12 lg:pr-14 pb-8 last:pb-0"
        >
            <span
                aria-hidden="true"
                className={`absolute right-2 lg:right-3 top-3 h-2.5 w-2.5 rounded-full ${TONE_DOT[item.tone]}`}
            />

            <div className="rounded-2xl glass-panel-1 p-5 lg:p-6 hover:border-white/15 transition-colors duration-500">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                            <Icon className="h-3.5 w-3.5 text-white" strokeWidth={1.75} aria-hidden="true" />
                        </div>
                        <span dir="ltr" className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-dim">
                            {item.marker}
                        </span>
                    </div>
                    <span dir="ltr" className={`inline-flex items-center gap-1.5 text-[10.5px] font-mono uppercase tracking-[0.18em] ${TONE_TEXT[item.tone]}`}>
                        <Clock className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                        {item.time}
                    </span>
                </div>

                <h3 className="text-lg lg:text-xl font-bold text-white mb-2 leading-snug">
                    {item.title}
                </h3>

                <p className="text-[14px] text-ink-muted leading-relaxed mb-4">{item.body}</p>

                <div className="flex flex-wrap gap-1.5">
                    {item.tools.map((t) => (
                        <span
                            key={t}
                            dir="ltr"
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-[10.5px] font-mono uppercase tracking-[0.16em] text-ink-muted bg-white/[0.035] border border-white/[0.07]"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </motion.li>
    );
}

export function DailyWorkflowTimeline() {
    return (
        <section
            id="daily-workflow"
            className="py-24 relative z-10"
            aria-labelledby="daily-workflow-heading"
        >
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                    {/* Left header (sticky on lg) */}
                    <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-1 mb-5">
                            <Workflow className="h-3.5 w-3.5 text-primary-300" strokeWidth={2} aria-hidden="true" />
                            <span dir="ltr" className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-muted">
                                Daily Workflow · 8 Phases
                            </span>
                        </div>

                        <h2
                            id="daily-workflow-heading"
                            className="text-4xl md:text-5xl lg:text-5xl font-black tracking-normal text-white mb-5 leading-[1.05]"
                        >
                            יום של <span className="text-brand-gradient">בנייה</span>.
                        </h2>

                        <p className="text-lg text-ink-muted leading-relaxed mb-8">
                            אין יום זהה — אבל יש שלד. שמונה שלבים שחוזרים, גם כשהפרויקט משתנה. המבנה הוא מה שמאפשר קצב אמיתי.
                        </p>

                        <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-ink-dim">
                            <Clock className="h-3.5 w-3.5 text-primary-300" strokeWidth={2} aria-hidden="true" />
                            Loop · Research → Plan → Build → Ship
                        </div>
                    </div>

                    {/* Timeline column */}
                    <div className="lg:col-span-7">
                        <ol className="relative" role="list">
                            <span
                                aria-hidden="true"
                                className="absolute top-2 bottom-2 right-3 lg:right-4 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
                            />
                            {PHASES.map((item, i) => (
                                <PhaseEntry key={item.id} item={item} index={i} />
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
}
