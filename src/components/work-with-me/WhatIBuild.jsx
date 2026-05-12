import { motion } from "framer-motion";
import { Sparkles, Layers, Cpu, Database, Network } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const BUILD_AREAS = [
    {
        id: "learning-systems",
        marker: "System · 01",
        title: "מערכות למידה",
        body:
            "פלטפורמות חינוכיות, מסלולי למידה מותאמים, וסביבות שמנגישות ידע טכנולוגי מורכב בצורה בהירה. בנייה של מסלולים שמיועדים לאנשים אמיתיים שרוצים ללמוד.",
        icon: Layers,
        tone: "live",
    },
    {
        id: "ai-workflows",
        marker: "System · 02",
        title: "מערכות עבודה עם AI",
        body:
            "שילוב של סוכנים ו-AI לתוך תהליכי עבודה קיימים. לא רק צ'אטבוטים, אלא אוטומציות שמורידות עומס ומאיצות תהליכי חשיבה ופיתוח (AI-native workflows).",
        icon: Cpu,
        tone: "live",
    },
    {
        id: "content-infra",
        marker: "System · 03",
        title: "תשתיות תוכן",
        body:
            "מערכות ניהול תוכן, Pipelines ליצירה והפצה של ידע, בניית ארכיטקטורה ליוצרים וגופים שצריכים לנהל scale של ידע בצורה מסודרת ומאורגנת.",
        icon: Database,
        tone: "live",
    },
    {
        id: "modern-environments",
        marker: "System · 04",
        title: "סביבות עבודה מודרניות",
        body:
            "אוטומציות, כלי עזר אישיים, וחיבור בין מערכות שונות כדי לייצר סביבת עבודה אחידה, מהירה, וחסרת חיכוך.",
        icon: Network,
        tone: "live",
    },
];

const TONE_STYLES = {
    live: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
};

const TONE_BLOOM = {
    live: "bloom-cyan",
};

export function WhatIBuild() {
    return (
        <section
            id="what-i-build"
            className="py-24 relative z-10"
            aria-labelledby="what-i-build-heading"
        >
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-4">
                        <Sparkles className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                        Real Systems
                    </div>
                    <h2
                        id="what-i-build-heading"
                        className="text-4xl md:text-5xl lg:text-5xl font-black tracking-normal text-white mb-4"
                    >
                        מה אני בונה <span className="text-brand-gradient">בפועל</span>.
                    </h2>
                    <p className="text-lg text-ink-muted leading-relaxed">
                        בלי מונחי אנטרפרייז מוגזמים או buzzwords ריקים. אלה המערכות האמיתיות שאני בונה, מפתח וחוקר ביום-יום.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 mb-16 max-w-5xl mx-auto">
                    {BUILD_AREAS.map((area, i) => {
                        const Icon = area.icon;
                        return (
                            <motion.article
                                key={area.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ delay: i * 0.06, duration: 0.6, ease: EASE }}
                                className={`group relative rounded-2xl glass-panel-2 surface-warm card-ambient ${TONE_BLOOM[area.tone]} p-6 lg:p-7 overflow-hidden hover:border-white/20 transition-colors duration-500 h-full`}
                            >
                                <div className="relative z-10 card-content-layer h-full flex flex-col">
                                <div className="flex items-start justify-between mb-5">
                                    <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors duration-300">
                                        <Icon className="h-4.5 w-4.5 text-white" strokeWidth={1.75} aria-hidden="true" />
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span dir="ltr" className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-dim">
                                            {area.marker}
                                        </span>
                                    </div>
                                </div>

                                <h3 dir="ltr" className="text-lg lg:text-[20px] font-bold text-white text-left mb-3 leading-snug">
                                    {area.title}
                                </h3>
                                <p className="text-[14px] text-ink-muted leading-relaxed">
                                    {area.body}
                                </p>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
