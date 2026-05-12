import { motion } from "framer-motion";
import {
    MessageSquare,
    Compass,
    Layers,
    Workflow,
    FileText,
    Repeat2,
    Workflow as WorkflowIcon,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const STEPS = [
    {
        id: "systems-thinking",
        marker: "Principle · 01",
        title: "Systems Thinking.",
        body:
            "אני לא כותב קוד לפני שאני מבין את המערכת. כל פרויקט מתחיל במיפוי הזרימה, ה-Edge Cases, והארכיטקטורה הכוללת. המטרה היא לבנות משהו שמחזיק מעמד לאורך זמן, לא סתם לפתור באג מקומי.",
        tags: ["Architecture", "Long-term"],
        icon: Layers,
        tone: "build",
    },
    {
        id: "experimentation",
        marker: "Principle · 02",
        title: "Experimentation.",
        body:
            "טכנולוגיה, ובמיוחד AI, משתנה בקצב מסחרר. העבודה שלי מבוססת על ניסויים מתמידים — לבדוק מה עובד, לזרוק את מה שלא, ולמצוא את הדרך הנכונה ביותר להטמיע את הכלים החדשים בתהליכים אמיתיים.",
        tags: ["Discovery", "AI-Native"],
        icon: Compass,
        tone: "plan",
    },
    {
        id: "iteration",
        marker: "Principle · 03",
        title: "Iteration.",
        body:
            "בנייה היא לא קו ישר. זה תהליך איטרטיבי של משוב, תיקון ודיוק. כל גרסה טובה יותר מהקודמת, וכל שלב מקרב אותנו למערכת יציבה וחזקה יותר.",
        tags: ["Feedback", "Cycles"],
        icon: Workflow,
        tone: "execute",
    },
    {
        id: "learning-in-public",
        marker: "Principle · 04",
        title: "Learning in Public.",
        body:
            "אני מאמין ששיתוף הידע הוא הדרך הטובה ביותר ללמוד. הרבה מהתהליכים שאני בונה הופכים לשיעורים בערוץ, כדי שגם אחרים יוכלו להבין, להעתיק, ולשפר את איך שהם בונים.",
        tags: ["Education", "Transparency"],
        icon: MessageSquare,
        tone: "open",
    },
    {
        id: "long-term",
        marker: "Principle · 05",
        title: "Long-term Thinking.",
        body:
            "אני לא מחפש פרויקטים של 'זבנג וגמרנו'. הקשרים שאני בונה הם לטווח ארוך — בין אם זה ליווי של מפתח, ייעוץ לצוות או בנייה של תשתית מורכבת.",
        tags: ["Partnerships", "Growth"],
        icon: Repeat2,
        tone: "loop",
    },
];

const TONE_DOT = {
    open: "bg-emerald-400",
    plan: "bg-sky-400",
    build: "bg-indigo-400",
    execute: "bg-amber-400",
    doc: "bg-purple-400",
    loop: "bg-pink-400",
};

const TONE_BLOOM = {
    open: "bloom-cyan",
    plan: "bloom-blue",
    build: "bloom-violet",
    execute: "bloom-amber",
    doc: "bloom-magenta",
    loop: "bloom-crimson",
};

export function HowIWork() {
    return (
        <section
            id="how-i-work"
            className="py-24 relative z-10"
            aria-labelledby="how-i-work-heading"
        >
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

                    {/* Sticky left column */}
                    <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
                        <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-4">
                            <WorkflowIcon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                            How I Work
                        </div>
                        <h2
                            id="how-i-work-heading"
                            className="text-4xl md:text-5xl font-black tracking-normal text-white mb-5 leading-[1.05]"
                        >
                            איך אני עובד <span className="text-brand-gradient">בפועל</span>.
                        </h2>
                        <p className="text-lg text-ink-muted leading-relaxed mb-6">
                            הגישה שלי לבנייה מבוססת על ניסויים, חשיבה מערכתית ולמידה פומבית. אלה העקרונות שמובילים כל פרויקט או מערכת שאני יוצר.
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel-1 text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-muted">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
                            5 Core Principles
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="lg:col-span-8 relative">
                        <div
                            aria-hidden="true"
                            className="absolute right-3 lg:right-4 top-2 bottom-2 w-px bg-gradient-to-b from-white/0 via-white/15 to-white/0"
                        />
                        <ol className="space-y-7">
                            {STEPS.map((step, i) => {
                                const Icon = step.icon;
                                return (
                                    <motion.li
                                        key={step.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-60px" }}
                                        transition={{ delay: i * 0.05, duration: 0.6, ease: EASE }}
                                        className="relative pr-12 lg:pr-16"
                                    >
                                        {/* Dot */}
                                        <span
                                            aria-hidden="true"
                                            className={`absolute right-2 lg:right-3 top-7 h-3 w-3 rounded-full ring-4 ring-background ${TONE_DOT[step.tone]}`}
                                        />

                                        <div className={`rounded-2xl glass-panel-1 surface-warm card-ambient ${TONE_BLOOM[step.tone]} p-6 hover:border-white/15 transition-colors duration-500 group`}>
                                            <div className="relative z-10 card-content-layer">
                                            <div className="flex items-start justify-between gap-3 mb-3">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                                        <Icon className="h-4 w-4 text-white" strokeWidth={1.75} aria-hidden="true" />
                                                    </div>
                                                    <span dir="ltr" className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-dim">
                                                        {step.marker}
                                                    </span>
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2 leading-snug group-hover:text-primary-200 transition-colors">
                                                {step.title}
                                            </h3>
                                            <p className="text-[14.5px] text-ink-muted leading-relaxed mb-4">
                                                {step.body}
                                            </p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {step.tags.map((t) => (
                                                    <span
                                                        key={t}
                                                        dir="ltr"
                                                        className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.16em] text-ink-muted bg-white/[0.035] border border-white/[0.07]"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                            </div>
                                        </div>
                                    </motion.li>
                                );
                            })}
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
}
