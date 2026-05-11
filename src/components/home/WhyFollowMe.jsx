import { motion, useReducedMotion } from "framer-motion";
import { Compass, Hammer, Sparkles } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const PILLARS = [
    {
        icon: Compass,
        eyebrow: "Build-in-public",
        title: "לומדים מתוך עשייה.",
        body: "אני מאמין שהדרך הכי טובה להסביר קונספט היא לכתוב קוד שעובד. בסרטונים אנחנו בונים פרויקטים אמיתיים ומבינים את הלוגיקה.",
        bloomClass: "bloom-cyan"
    },
    {
        icon: Hammer,
        eyebrow: "Transparent",
        title: "שקיפות מלאה.",
        body: "אם משהו לא עובד, אני מראה את זה. המטרה היא להראות את תהליך הפיתוח כמו שהוא קורה במציאות, לא רק את התוצאה הסופית והנקייה.",
        bloomClass: "bloom-amber"
    },
    {
        icon: Sparkles,
        eyebrow: "Exploring 2026 tools",
        title: "קצב עדכני.",
        body: "עולם הפיתוח זז מהר. אני בודק ומשלב כלים חדשים בעבודה היומיומית שלי, ומשתף בערוץ מה עובד לי ומה פחות.",
        bloomClass: "bloom-violet"
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.12 }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }
};

export function WhyFollowMe() {
    const reduced = useReducedMotion();

    return (
        <section className="py-24 lg:py-32 relative z-10" aria-labelledby="why-follow-me-heading">
            <div className="container px-4 mx-auto">
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-1 text-[11px] font-medium text-ink-muted tracking-wide mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        The Approach
                    </span>
                    <h2
                        id="why-follow-me-heading"
                        className="font-display text-3xl md:text-5xl font-bold text-ink mb-4 tracking-normal"
                    >
                        הגישה <span className="text-brand-gradient">שלי</span>.
                    </h2>
                    <p className="text-ink-muted text-base md:text-lg leading-relaxed">
                        איך שאני ניגש ליצירת תוכן ולמידה. בלי הבטחות קסם, רק עבודה אמיתית.
                    </p>
                </div>

                <motion.div
                    variants={container}
                    initial={reduced ? false : "hidden"}
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
                >
                    {PILLARS.map((p) => {
                        const Icon = p.icon;
                        return (
                            <motion.article
                                key={p.title}
                                variants={item}
                                className={`group relative glass-panel-2 surface-warm card-ambient ${p.bloomClass} rounded-3xl p-7 lg:p-8 overflow-hidden hover:border-white/20 transition-colors duration-500`}
                            >
                                <div className="relative z-10 card-content-layer">
                                    <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-white/[0.04] border border-white/10 text-primary-300 mb-6">
                                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                                    </div>

                                    <span className="block text-[11px] font-mono text-ink-dim tracking-[0.18em] uppercase mb-2">
                                        {p.eyebrow}
                                    </span>
                                    <h3 className="font-display text-xl lg:text-[22px] font-bold text-ink mb-3 leading-snug">
                                        {p.title}
                                    </h3>
                                    <p className="text-sm lg:text-[15px] text-ink-muted leading-relaxed">
                                        {p.body}
                                    </p>
                                </div>
                            </motion.article>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
