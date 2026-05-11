import { motion, useReducedMotion } from "framer-motion";
import { Layers, Network, MonitorPlay } from "lucide-react";

const REASONS = [
    {
        id: "system-thinking",
        title: "חשיבה מערכתית",
        description: "למידה שמתמקדת בארכיטקטורה והבנה עמוקה של איך מערכות עובדות, לא רק שורות קוד.",
        icon: Network
    },
    {
        id: "real-work",
        title: "עבודה אמיתית",
        description: "התנסות מעשית עם סביבות פיתוח ו-AI בדיוק כפי שהן מתנהגות בתעשייה ברמת ייצור.",
        icon: Layers
    },
    {
        id: "modern-env",
        title: "סביבת לימוד מודרנית",
        description: "פלטפורמת למידה איכותית, ברורה ונקייה מרעשי רקע שנועדה למקסם את המיקוד שלך.",
        icon: MonitorPlay
    }
];

export function WhyLearnHere() {
    const reduced = useReducedMotion();

    return (
        <section className="py-24 relative border-b border-white/5 bg-black">
            <div className="container px-4 mx-auto max-w-5xl relative z-10">
                <div className="mb-16 text-center">
                    <h2 className="text-2xl md:text-3xl font-display font-medium text-white mb-4 tracking-tight">
                        למה ללמוד כאן
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {REASONS.map((reason, i) => {
                        const Icon = reason.icon;
                        return (
                            <motion.div
                                key={reason.id}
                                initial={reduced ? false : { opacity: 0, y: 20 }}
                                whileInView={reduced ? {} : { opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col items-center text-center group hover:bg-white/[0.04] transition-colors duration-300"
                            >
                                <div className="p-4 rounded-full bg-white/5 text-slate-300 mb-6 group-hover:scale-110 group-hover:text-white transition-all duration-300">
                                    <Icon strokeWidth={1.5} className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-medium text-white mb-3">
                                    {reason.title}
                                </h3>
                                <p className="text-sm text-ink-muted leading-relaxed font-light">
                                    {reason.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
