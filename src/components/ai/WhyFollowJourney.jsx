import { motion, useReducedMotion } from "framer-motion";
import { Eye, FlaskConical, Compass } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const PILLARS = [
    {
        icon: Eye,
        eyebrow: "Learn in public",
        title: "המסע גלוי — לא רק התוצאה.",
        body: "כל ניסוי, כל הצלחה, וכל קוד שלא הסתדר — מתועדים. הצופה רואה את הדרך שלי, לא רק שקופית סופית.",
        bloomClass: "bloom-cyan"
    },
    {
        icon: FlaskConical,
        eyebrow: "Real experimentation",
        title: "ניסויים, לא הבטחות.",
        body: "אני בודק כלים, מודלים, וגישות מול בעיות אמיתיות — ומדווח על מה שעובד ומה שלא, גם כשהמסקנה לא נוצצת.",
        bloomClass: "bloom-amber"
    },
    {
        icon: Compass,
        eyebrow: "Long-term journey",
        title: "מסע ארוך, לא טרנד שבועי.",
        body: "AI הוא לא הייפ של רבעון. זה שינוי שיעצב עשור — ואני בונה את הנוכחות שלי בו לאורך זמן, סרטון אחרי סרטון.",
        bloomClass: "bloom-violet"
    },
];

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function WhyFollowJourney() {
    const reduced = useReducedMotion();

    return (
        <section className="py-24 lg:py-32 relative z-10" aria-labelledby="why-follow-journey-heading">
            <div className="container px-4 mx-auto">
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-1 text-[11px] font-medium text-ink-muted tracking-wide mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Why follow this journey
                    </span>
                    <h2
                        id="why-follow-journey-heading"
                        className="font-display text-3xl md:text-5xl font-bold text-ink mb-4 tracking-normal"
                    >
                        למה <span className="text-brand-gradient">לעקוב</span> אחרי המסלול הזה?
                    </h2>
                    <p className="text-ink-muted text-base md:text-lg leading-relaxed">
                        שלוש נקודות שמגדירות את ההבדל בין תוכן AI שיוצר ערך לבין רעש.
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
                                        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
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
