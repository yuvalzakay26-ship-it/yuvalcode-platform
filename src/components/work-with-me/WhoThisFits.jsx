import { motion } from "framer-motion";
import { Users, Code, GraduationCap, Hammer, Cpu } from "lucide-react";
import { Tilt3D, CardGlow } from "../ui/Tilt3D";

const EASE = [0.16, 1, 0.3, 1];

const PATHWAYS = [
    {
        id: "builders",
        number: "01",
        eyebrow: "Builders",
        title: "Builders",
        forWhom: "For · אנשים שרוצים לבנות מערכות עבודה מודרניות.",
        looksLike:
            "בין אם אתם בונים כלים פנימיים לארגון שלכם, או מפתחים פלטפורמה משלכם, העבודה המשותפת מתמקדת בבניית המערכת הנכונה — כזאת שתחזיק מעמד.",
        icon: Hammer,
        rgb: "129, 140, 248",
        accent: "from-indigo-500/25 to-violet-500/15",
        ring: "group-hover:ring-indigo-400/40",
    },
    {
        id: "ai-explorers",
        number: "02",
        eyebrow: "AI Explorers",
        title: "חוקרי AI אמיתי",
        forWhom: "For · אנשים שרוצים להבין AI לעומק, מעבר ל-Hype.",
        looksLike:
            "אלו שמבינים ש-AI הוא לא רק צ'אט, אלא כלי שמשנה את איך שאנחנו חושבים ובונים. כאן המקום לחקור, לנסות ולהטמיע.",
        icon: Cpu,
        rgb: "251, 146, 60",
        accent: "from-orange-500/25 to-amber-500/15",
        ring: "group-hover:ring-amber-400/40",
    },
    {
        id: "students",
        number: "03",
        eyebrow: "Students",
        title: "תלמידים",
        forWhom: "For · מי שמוכן ללמוד וליישם.",
        looksLike:
            "למידה היא לא רק קליטת מידע, היא בנייה. תלמידים כאן הם אלו שמגיעים עם רצון לקחת אחריות על הידע שלהם וליישם אותו על פרויקטים אמיתיים.",
        icon: GraduationCap,
        rgb: "168, 85, 247",
        accent: "from-purple-500/25 to-fuchsia-500/15",
        ring: "group-hover:ring-purple-400/40",
    },
    {
        id: "creators",
        number: "04",
        eyebrow: "Creators",
        title: "יוצרים",
        forWhom: "For · יוצרי תוכן, מורים ומי שמפיץ ידע.",
        looksLike:
            "יוצרים שרוצים לבנות תשתיות חזקות יותר לתוכן שלהם, לייעל תהליכים בעזרת AI, ולייצר חוויות למידה טובות יותר לקהל שלהם.",
        icon: Users,
        rgb: "16, 185, 129",
        accent: "from-emerald-500/25 to-teal-500/15",
        ring: "group-hover:ring-emerald-400/40",
    },
];

function PathwayCard({ pathway, index }) {
    const Icon = pathway.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.06, duration: 0.7, ease: EASE }}
            className="h-full"
        >
            <Tilt3D className="h-full">
                <article
                    className={`relative h-full rounded-[1.75rem] glass-panel-2 p-7 lg:p-8 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-white/20 ring-1 ring-transparent ${pathway.ring}`}
                >
                    <CardGlow rgb={pathway.rgb} />

                    <div
                        className={`absolute -right-20 -top-20 w-60 h-60 bg-gradient-to-br ${pathway.accent} blur-[80px] opacity-80 group-hover:opacity-100 transition-opacity duration-500`}
                        aria-hidden="true"
                    />

                    <div className="relative z-10 flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/20 transition-all duration-300">
                                <Icon className="h-5 w-5 text-white" strokeWidth={1.75} aria-hidden="true" />
                            </div>
                            <span dir="ltr" className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-dim">
                                Profile · {pathway.number}
                            </span>
                        </div>

                        {/* Eyebrow */}
                        <div dir="ltr" className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-3 text-left">
                            {pathway.eyebrow}
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl lg:text-[26px] font-bold text-white mb-3 group-hover:text-primary-200 transition-colors leading-snug">
                            {pathway.title}
                        </h3>

                        {/* For whom */}
                        <p dir="ltr" className="text-[11.5px] font-mono uppercase tracking-[0.18em] text-ink-dim mb-4 text-left">
                            {pathway.forWhom}
                        </p>

                        {/* What it looks like */}
                        <p className="text-ink-muted leading-relaxed mb-5 text-[14.5px]">
                            {pathway.looksLike}
                        </p>
                    </div>
                </article>
            </Tilt3D>
        </motion.div>
    );
}

export function WhoThisFits() {
    return (
        <section
            id="who-this-fits"
            className="py-24 relative z-10"
            aria-labelledby="who-this-fits-heading"
        >
            <div className="container px-4 mx-auto">
                <div className="max-w-2xl mb-14">
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-4">
                        Who This Fits
                    </div>
                    <h2
                        id="who-this-fits-heading"
                        className="text-4xl md:text-5xl lg:text-5xl font-black tracking-normal text-white mb-4"
                    >
                        למי זה <span className="text-brand-gradient">מתאים</span>.
                    </h2>
                    <p className="text-lg text-ink-muted leading-relaxed">
                        המרחב הזה לא מיועד ללקוחות ייעוץ אנטרפרייז או פרויקטים תאגידיים קלאסיים.
                        הוא מיועד לאנשים שרוצים לבנות דברים אמיתיים בעצמם.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-7">
                    {PATHWAYS.map((p, i) => (
                        <PathwayCard key={p.id} pathway={p} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
