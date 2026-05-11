import { motion, useReducedMotion } from "framer-motion";
import { Eye, Wrench, Telescope } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const PILLARS = [
    {
        icon: Eye,
        eyebrow: "Build in public",
        title: "כל commit חי בפומבי.",
        body: "ה-history הוא ה-changelog. ההחלטות, ה-PRs, וגם ה-rollbacks — כולם נראים. שקיפות מייצרת אמון שאי אפשר לזייף.",
    },
    {
        icon: Wrench,
        eyebrow: "Systems over hacks",
        title: "מערכות, לא טריקים.",
        body: "תיקון נקודתי שעובד היום אבל ישבר מחר הוא חוב. אני בוחר ארכיטקטורה שמחזיקה גם כשהקוד גדל פי 10 — גם אם זה ארוך יותר.",
    },
    {
        icon: Telescope,
        eyebrow: "Long-term architecture",
        title: "אופק של עשור, לא רבעון.",
        body: "כל החלטה אדריכלית נבחנת מול 2030. AI לא טרנד — זה שינוי שיגדיר עשור. הקוד שאני כותב היום צריך להיות הבסיס של מה שיבוא אחר כך.",
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

export function ProjectsWhyIBuild() {
    const reduced = useReducedMotion();

    return (
        <section className="py-24 lg:py-32 relative z-10" aria-labelledby="projects-why-heading">
            <div className="container px-4 mx-auto">
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-1 text-[11px] font-medium text-ink-muted tracking-wide mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Why I build this way
                    </span>
                    <h2
                        id="projects-why-heading"
                        className="font-display text-3xl md:text-5xl font-bold text-ink mb-4 tracking-normal"
                    >
                        איך אני <span className="text-brand-gradient">בונה</span>.
                    </h2>
                    <p className="text-ink-muted text-base md:text-lg leading-relaxed">
                        שלוש החלטות שמכוונות כל פרויקט שאני נוגע בו.
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
                                className="group relative glass-panel-2 rounded-3xl p-7 lg:p-8 overflow-hidden hover:border-white/20 transition-colors duration-500"
                            >
                                <div
                                    aria-hidden="true"
                                    className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                />

                                <div className="relative z-10">
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
