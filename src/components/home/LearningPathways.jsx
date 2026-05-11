import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, GraduationCap, Bot } from "lucide-react";
import { Tilt3D } from "../ui/Tilt3D";

const EASE = [0.16, 1, 0.3, 1];

const pathways = [
    {
        id: "programming",
        eyebrow: "Track 01 · תכנות",
        title: "C# וכל מבחני מה\"ט",
        description: "מאגר מסודר של פתרונות וידאו למבחני מה\"ט. ממוין לפי שנים ונושאים, כדי שתוכלו למצוא בדיוק את מה שאתם צריכים לתרגל.",
        bullets: ["מועדים 2020 → 2025", "מאות שאלות פתורות", "מסודר לפי נושא + שנה"],
        icon: GraduationCap,
        href: "/exams",
        cta: "פתח את הקטלוג",
        cta: "פתח את הקטלוג",
        bloomClass: "bloom-blue",
        delay: 0,
    },
    {
        id: "ai",
        eyebrow: "Track 02 · AI",
        title: "בנייה עם AI · 2026",
        description: "תיעוד של הכלים שאני משתמש בהם ביומיום — מסוכני קוד ועד לניהול ידע. פחות תיאוריה, יותר קוד אמיתי שעובד.",
        bullets: ["ניסויים עם סוכני AI", "Workflows עם Claude Code", "כלים מודרניים ליוצרים"],
        icon: Bot,
        href: "/ai",
        cta: "פתח את מסלול ה-AI",
        cta: "פתח את מסלול ה-AI",
        bloomClass: "bloom-violet",
        delay: 0.1,
    },
];

function PathwayCard({ path }) {
    const Icon = path.icon;
    const inner = (
        <Tilt3D className="font-sans h-full">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: path.delay, duration: 0.7, ease: EASE }}
                className={`relative h-full surface-warm card-ambient ${path.bloomClass} rounded-[2rem] p-8 lg:p-10 overflow-hidden group-hover:border-white/20 transition-colors`}
            >
                <div className="relative z-10 flex flex-col h-full card-content-layer">
                    <div className="flex items-start justify-between mb-7">
                        <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                            <Icon className="h-6 w-6 text-white" strokeWidth={1.75} />
                        </div>
                        <span dir="ltr" className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-dim">
                            {path.eyebrow}
                        </span>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-primary-200 transition-colors leading-snug">
                        {path.title}
                    </h3>

                    <p className="text-ink-muted leading-relaxed mb-6 flex-grow">
                        {path.description}
                    </p>

                    <ul className="space-y-2 mb-8">
                        {path.bullets.map((b) => (
                            <li key={b} className="flex items-center gap-2.5 text-sm text-ink-muted">
                                <span className="h-1 w-1 rounded-full bg-white/30" />
                                {b}
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center justify-between pt-5 border-t border-white/5">
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-primary-200 transition-colors">
                            {path.cta}
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        </span>
                    </div>
                </div>
            </motion.div>
        </Tilt3D>
    );

    return (
        <Link to={path.href} className="block group h-full">
            {inner}
        </Link>
    );
}

export function LearningPathways() {
    return (
        <section id="learning-pathways" className="py-24 relative z-10">
            <div className="container px-4 mx-auto">
                <div className="max-w-2xl mb-14">
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-4">
                        Learning Pathways
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-5xl font-black tracking-normal text-white mb-4">
                        תכנות אמיתי. <br />
                        <span className="text-brand-gradient">בנייה עם AI.</span>
                    </h2>
                    <p className="text-lg text-ink-muted leading-relaxed">
                        הערוץ מתחלק לשני עולמות: הבסיס הקלאסי של פיתוח תוכנה, והכלים החדשים שמשנים את הדרך שבה אנחנו עובדים ב-2026.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {pathways.map((p) => (
                        <PathwayCard key={p.id} path={p} />
                    ))}
                </div>
            </div>
        </section>
    );
}
