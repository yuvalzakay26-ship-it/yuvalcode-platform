import { motion } from "framer-motion";
import { AlertCircle, Network, MousePointerClick, Gauge, TrendingUp, Telescope, BookOpen } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const CASE_STUDIES = [
    {
        id: "yuvalcode-platform",
        eyebrow: "Case · 01",
        project: "YuvalCode Platform",
        headline: "איך הופכים אתר שאמור להיות פורטפוליו ל-HQ של ערוץ.",
        chapters: [
            {
                icon: AlertCircle,
                label: "Problem",
                body:
                    "אתר ראשון התחיל כפורטפוליו מגייסים. הבעיה: זה לא משקף איך עובדים בפועל — יוצר תוכן + בונה AI שמטרותיו subscribe ו-trust, לא resume scan.",
            },
            {
                icon: Network,
                label: "System thinking",
                body:
                    "הוגדר spine חדש: Hero → Latest Content → Tracks → Stack → Projects → Why Follow → Final CTA. כל סקציה ממוקדת קונברסיה אחת. אין דמויות-משתנה.",
            },
            {
                icon: MousePointerClick,
                label: "UX thinking",
                body:
                    "מובייל-first ב-375px. RTL מוחלט. Glass tier system אחיד (1/2/3) במקום ad-hoc surfaces. Reduced-motion guard גלובלי על כל אנימציה.",
            },
            {
                icon: Gauge,
                label: "Performance",
                body:
                    "522kb → 278kb raw / 85kb gzip. Lazy routes + manual chunks (react / motion / icons / helmet). FloatingTechBackground עם IntersectionObserver + visibility API.",
            },
            {
                icon: TrendingUp,
                label: "Scale",
                body:
                    "קטלוג מה״ט מתרחב לפי שנה. שכבת YouTube עם dedupe + 3-tier TTL מאפשרת לעמוד מול 10x גידול בלי לשבור את quota.",
            },
            {
                icon: Telescope,
                label: "Future",
                body:
                    "/projects/:slug יורש את אותו spine — section primitives נשארים, content נכנס. crawlable per-exam URLs יפתחו את ה-long-tail SEO.",
            },
        ],
    },
    {
        id: "ai-workflows",
        eyebrow: "Case · 02",
        project: "AI Workflow Systems",
        headline: "למה סוכן ייצור לא נבנה כמו prompt בודד.",
        chapters: [
            {
                icon: AlertCircle,
                label: "Problem",
                body:
                    "הצוואר היה משימות חוזרות בערוץ — תמלול, תיוג, thumbnails. prompt בודד לא מחזיק. הבעיה היא לא המודל, היא חוסר ברירת מחדל למצבים שהמודל לא צופה.",
            },
            {
                icon: Network,
                label: "System thinking",
                body:
                    "Agent loops עם sub-agents מבודדים, tool use עם schemas מוגדרים, ו-memory layer ב-Obsidian שמחזיק החלטות. כל החלטה ניתנת לשחזור.",
            },
            {
                icon: MousePointerClick,
                label: "UX thinking",
                body:
                    "הסוכן לא מחליף את היוצר. הוא רץ במקביל לזרימה הידנית, מציג הצעות, וחי בייצור רק אחרי שהשתווה למפעיל אנושי על מאות מקרים.",
            },
            {
                icon: Gauge,
                label: "Performance",
                body:
                    "Cost · latency · safety budgets לפני כל deploy. Eval harness שמריץ regression על prompts חדשים — לא משדרגים בלי גרף.",
            },
            {
                icon: TrendingUp,
                label: "Scale",
                body:
                    "ארכיטקטורה לכפיל-עלות פי-10 במשימה אם יחס Quality/Cost מצדיק. אחרת — הסוכן נסגר. דאטה מנהל החלטות, לא כריזמה של מודל.",
            },
            {
                icon: Telescope,
                label: "Future",
                body:
                    "אותה תשתית פותחת מוצרים נוספים: כלי סטודנטים, code-review companion, ועוזר תוכן לאנשי ידע. הליבה היא ה-system, לא ה-feature.",
            },
        ],
    },
];

function Chapter({ chapter, index }) {
    const Icon = chapter.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.05, duration: 0.55, ease: EASE }}
            className="relative rounded-2xl glass-panel-1 p-5 lg:p-6 hover:border-white/15 transition-colors duration-500"
        >
            <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-primary-300" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                    <span dir="ltr" className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-dim">
                        Chapter
                    </span>
                    <span dir="ltr" className="text-[12px] font-mono uppercase tracking-[0.18em] text-ink">
                        {chapter.label}
                    </span>
                </div>
            </div>
            <p className="text-[14px] text-ink-muted leading-relaxed">{chapter.body}</p>
        </motion.div>
    );
}

function CaseStudyBlock({ study, index }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative rounded-[2rem] glass-panel-2 p-7 lg:p-10 overflow-hidden"
        >
            <div
                aria-hidden="true"
                className="absolute -top-32 -right-32 w-72 h-72 rounded-full blur-[120px] opacity-50"
                style={{
                    background:
                        index % 2 === 0
                            ? "radial-gradient(circle, rgba(129,140,248,0.18), transparent 70%)"
                            : "radial-gradient(circle, rgba(236,72,153,0.18), transparent 70%)",
                }}
            />

            <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                    <div>
                        <div dir="ltr" className="inline-flex items-center gap-2 text-[10.5px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-3">
                            <BookOpen className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                            {study.eyebrow} <span className="text-ink-dim">·</span> {study.project}
                        </div>
                        <h3 className="font-display text-2xl md:text-3xl lg:text-[34px] font-bold text-white tracking-normal leading-snug max-w-2xl">
                            {study.headline}
                        </h3>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {study.chapters.map((c, i) => (
                        <Chapter key={c.label} chapter={c} index={i} />
                    ))}
                </div>
            </div>
        </motion.article>
    );
}

export function CaseStudyPreviews() {
    return (
        <section
            id="case-studies"
            className="py-24 relative z-10"
            aria-labelledby="case-studies-heading"
        >
            <div className="container px-4 mx-auto">
                <div className="max-w-2xl mb-14">
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-4">
                        Architectural Storytelling
                    </div>
                    <h2 id="case-studies-heading" className="text-4xl md:text-5xl lg:text-5xl font-black tracking-normal text-white mb-4">
                        איך אני <span className="text-brand-gradient">חושב</span>.
                    </h2>
                    <p className="text-lg text-ink-muted leading-relaxed">
                        כל פרויקט עובר את אותם ששה שיקולים — בעיה, מערכת, חוויה, ביצועים, scale, ועתיד. זה הכלי שמונע ניצול-יתר של כריזמה ועומק חסר.
                    </p>
                </div>

                <div className="space-y-8 lg:space-y-10">
                    {CASE_STUDIES.map((s, i) => (
                        <CaseStudyBlock key={s.id} study={s} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
