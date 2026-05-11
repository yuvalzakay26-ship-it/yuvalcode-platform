import { motion } from "framer-motion";
import {
    GraduationCap,
    Youtube,
    Layers,
    Globe,
    Telescope,
    Award,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const PILLARS = [
    {
        id: "teaching",
        eyebrow: "Teaching",
        title: "שנים של הוראה.",
        body:
            "מורה לתכנות עם ניסיון מצטבר בכיתות, שיעורים פרטיים, ומסגרות לימוד. הסטודנטים הראשונים שלי בנו את המוצרים שלהם, וחלקם מלמדים בעצמם היום.",
        kpi: "Hundreds of students taught",
        icon: GraduationCap,
        accent: "from-indigo-500/15 to-violet-500/8",
    },
    {
        id: "youtube",
        eyebrow: "YouTube ecosystem",
        title: "ערוץ חי, קהל אמיתי.",
        body:
            "ערוץ YouTube פעיל עם תוכן שבועי על תכנות, AI, ו-Systems. הקטלוג ציבורי, נגיש לחיפוש, ומחובר לכל החלקים האחרים של האקוסיסטם.",
        kpi: "Weekly content · public catalog",
        icon: Youtube,
        accent: "from-rose-500/15 to-pink-500/8",
    },
    {
        id: "systems",
        eyebrow: "Systems shipped",
        title: "מערכות חיות באוויר.",
        body:
            "YuvalCode Platform, Mahat Library, ו-AI workflow experiments — כולם פתוחים ב-Projects, עם decision records לאורך כל הדרך, ו-public commits שאפשר לבדוק.",
        kpi: "Public systems · documented decisions",
        icon: Layers,
        accent: "from-emerald-500/15 to-teal-500/8",
    },
    {
        id: "public-building",
        eyebrow: "Building in public",
        title: "Build-in-public כברירת מחדל.",
        body:
            "כל commit, כל decision record, כל experiment — ציבורי. הקהל לא רואה רק את התוצאה; הוא רואה את ההחלטות, את ה-trade-offs, ואת הלקחים.",
        kpi: "Public PRs · public lessons",
        icon: Globe,
        accent: "from-amber-500/15 to-orange-500/8",
    },
    {
        id: "long-term",
        eyebrow: "Long-term direction",
        title: "אופק של עשור.",
        body:
            "ה-platform נבנה על roadmap של שנים, לא של חודשים. AI track, Content OS, Stack — כולם חלקים בתוך כיוון אחד שמתפתח לאט ובכוונה.",
        kpi: "Decade-long arc · roadmap public",
        icon: Telescope,
        accent: "from-purple-500/15 to-fuchsia-500/8",
    },
    {
        id: "credibility",
        eyebrow: "What it means",
        title: "Serious creator. Real systems.",
        body:
            "זה לא 'recruiter resume', וזה לא 'open to opportunities'. זה evidence — תוכן ציבורי, מערכות חיות, ו-public commits שמדברים בעצמם.",
        kpi: "Evidence > adjectives",
        icon: Award,
        accent: "from-sky-500/15 to-cyan-500/8",
    },
];

export function TrustAuthorityLayer() {
    return (
        <section
            id="trust-authority-layer"
            className="py-24 relative z-10 overflow-hidden"
            aria-labelledby="trust-authority-heading"
        >
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[480px] h-[480px] bg-primary/8 rounded-full blur-[140px] mix-blend-screen" />
                <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] bg-accent/6 rounded-full blur-[120px] mix-blend-screen" />
            </div>

            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-4">
                        <Award className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                        Trust & Evidence
                    </div>
                    <h2
                        id="trust-authority-heading"
                        className="text-4xl md:text-5xl lg:text-5xl font-black tracking-normal text-white mb-4"
                    >
                        על מה <span className="text-brand-gradient">בנוי</span> האמון.
                    </h2>
                    <p className="text-lg text-ink-muted leading-relaxed">
                        אין כאן testimonials מומצאים, ואין שורת stats מנופחת. יש מערכות חיות, קהל אמיתי, וכיוון ארוך טווח שאפשר לבדוק בעצמכם.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                    {PILLARS.map((pillar, i) => {
                        const Icon = pillar.icon;
                        return (
                            <motion.article
                                key={pillar.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ delay: i * 0.05, duration: 0.6, ease: EASE }}
                                className="group relative rounded-2xl glass-panel-2 p-7 overflow-hidden hover:border-white/20 transition-colors duration-500"
                            >
                                <div
                                    aria-hidden="true"
                                    className={`absolute -right-20 -top-20 w-52 h-52 bg-gradient-to-br ${pillar.accent} blur-[80px] opacity-70 group-hover:opacity-100 transition-opacity duration-500`}
                                />

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-5">
                                        <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-primary-300 group-hover:border-white/20 transition-colors duration-300">
                                            <Icon className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden="true" />
                                        </div>
                                        <span dir="ltr" className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-dim text-right max-w-[55%]">
                                            {pillar.eyebrow}
                                        </span>
                                    </div>

                                    <h3 className="text-xl lg:text-[22px] font-bold text-white mb-3 leading-snug group-hover:text-primary-200 transition-colors">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-[14px] text-ink-muted leading-relaxed mb-5">
                                        {pillar.body}
                                    </p>

                                    <div className="pt-4 border-t border-white/5">
                                        <span dir="ltr" className="inline-flex items-center gap-2 text-[10.5px] font-mono uppercase tracking-[0.18em] text-ink-dim">
                                            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-primary-400/70" />
                                            {pillar.kpi}
                                        </span>
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
