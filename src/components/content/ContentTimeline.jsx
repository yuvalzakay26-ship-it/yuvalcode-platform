import { motion } from "framer-motion";
import { Activity, Radio, GitCommit } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const TIMELINE = [
    {
        id: "experiment-claude-code",
        marker: "Experiment",
        title: "Claude Code · sub-agents בייצור.",
        date: "2026-05",
        tone: "live",
        body:
            "מתעדף sub-agents מבודדים על משימות חוזרות בערוץ. הצופים מקבלים את התוצאה לפני שהיא פוסטת — תיעוד חי של איך מערכת מתבגרת.",
        tags: ["Claude Code", "Workflows", "Live"],
    },
    {
        id: "system-content-os",
        marker: "System",
        title: "Content OS · 8 pillars מחוברים.",
        date: "2026-05",
        tone: "ship",
        body:
            "ארכיטקטורת Content Hub חדשה — שמונה pillars שמחוברים אחד לשני בגרף ידע. הסקציה הזו עצמה היא חלק מהשיפור.",
        tags: ["Pillar Graph", "Knowledge System", "Shipped"],
    },
    {
        id: "ai-discovery-rag",
        marker: "Discovery",
        title: "RAG patterns · re-ranking שמשנה תוצאות.",
        date: "2026-05",
        tone: "study",
        body:
            "הוספת שכבת re-ranking מעל hybrid search משנה ב-30%+ את איכות התוצאות במשימות תוכן ארוך. סדרת סרטונים בתחנת הכנה.",
        tags: ["RAG", "Eval", "Research"],
    },
    {
        id: "platform-evolution",
        marker: "Platform",
        title: "Phase 2.3 · Content OS שיגר ל-air.",
        date: "2026-05",
        tone: "ship",
        body:
            "/content מצטרף ל-/ai ול-/projects. השלישייה הזו היא הספיינה של אקוסיסטם היוצר. כל אחת מקבלת דף משלה — לא placeholder.",
        tags: ["Phase 2.3", "Platform", "Shipped"],
    },
    {
        id: "creator-milestone",
        marker: "Milestone",
        title: "סרטון בשבוע · 12 שבועות רצופים.",
        date: "2026-05",
        tone: "win",
        body:
            "הקצב ה-build-in-public שורד את הקיץ. הצופים רואים את ההתפתחות מסרטון לסרטון — לא רק בכותרת, גם בעומק.",
        tags: ["Cadence", "Build in Public", "Milestone"],
    },
    {
        id: "next-newsletter",
        marker: "Next",
        title: "ניוזלטר חודשי · עדכון אקוסיסטם.",
        date: "Q3 2026",
        tone: "next",
        body:
            "ניוזלטר שמסכם את החודש — מה נלמד, מה נבנה, ומה שובר את ראשי. נקודת חיבור נוספת בין סרטונים, מערכות ופרויקטים.",
        tags: ["Newsletter", "Community", "Soon"],
    },
];

const TONE_DOT = {
    live: "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]",
    ship: "bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.7)]",
    study: "bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.7)]",
    win: "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.7)]",
    next: "bg-pink-400 shadow-[0_0_12px_rgba(244,114,182,0.7)]",
};

const TONE_TEXT = {
    live: "text-emerald-300",
    ship: "text-sky-300",
    study: "text-violet-300",
    win: "text-amber-300",
    next: "text-pink-300",
};

const TONE_LABEL = {
    live: "Live",
    ship: "Shipped",
    study: "Study",
    win: "Milestone",
    next: "Next",
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
                        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/15" />
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

                <p className="text-[14px] text-ink-muted leading-relaxed mb-4">
                    {item.body}
                </p>

                <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((t) => (
                        <span
                            key={t}
                            dir="ltr"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-mono uppercase tracking-[0.16em] text-ink-muted bg-white/[0.035] border border-white/[0.07]"
                        >
                            <GitCommit className="h-3 w-3 text-primary-300" strokeWidth={2} aria-hidden="true" />
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </motion.li>
    );
}

export function ContentTimeline() {
    return (
        <section
            id="content-timeline"
            className="py-24 relative z-10"
            aria-labelledby="content-timeline-heading"
        >
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                    {/* Header (sticky on lg) */}
                    <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-1 mb-5">
                            <Radio className="h-3.5 w-3.5 text-primary-300" strokeWidth={2} aria-hidden="true" />
                            <span dir="ltr" className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-muted">
                                Living Timeline · Evolving
                            </span>
                        </div>

                        <h2 id="content-timeline-heading" className="text-4xl md:text-5xl lg:text-5xl font-black tracking-normal text-white mb-5 leading-[1.05]">
                            <span className="text-brand-gradient">תוכן</span> חי, לא ארכיון.
                        </h2>

                        <p className="text-lg text-ink-muted leading-relaxed mb-8">
                            הפלטפורמה לא נשאבת מתוך לוח שיווק — היא נסגרת אחרי שהיא נבנית. הציר הזה מציג ניסויים, מערכות, ולקחים שעולים בזמן אמת.
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
