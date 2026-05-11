import { motion } from "framer-motion";
import { Sparkles, Cpu, Users, GraduationCap, Network, Telescope } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const FOCUS_AREAS = [
    {
        id: "ai-workflows",
        marker: "Open · 01",
        title: "AI workflow experiments",
        body:
            "יוצרים וצוותים שחוקרים סוכנים, RAG, ו-eval harnesses ורוצים שותף לחקור איתם. מעדיף ניסויים מתועדים יחד, לא audits שטוחים.",
        icon: Cpu,
        tone: "live",
    },
    {
        id: "creator-partnerships",
        marker: "Open · 02",
        title: "Creator partnerships",
        body:
            "סדרות משותפות עם יוצרים טכנולוגיים, מורים, וחלקי ערוץ שיש להם קהל אמיתי וסבלנות לבניית פורמט.",
        icon: Users,
        tone: "live",
    },
    {
        id: "technical-education",
        marker: "Open · 03",
        title: "Technical education",
        body:
            "סדנאות ל-AI ו-Systems Thinking, הרצאות אורח במכללות, ובניית curriculum ל-cohorts קטנים שמסתיימים בפרויקט אמיתי.",
        icon: GraduationCap,
        tone: "live",
    },
    {
        id: "system-design",
        marker: "Open · 04",
        title: "System design conversations",
        body:
            "שיחות arch ל-creator infrastructure, AI tooling, ו-content systems. אם אתם בונים משהו רציני וצריך זוג עיניים — נשמח לדבר.",
        icon: Network,
        tone: "exploring",
    },
    {
        id: "long-term-projects",
        marker: "Open · 05",
        title: "Long-term projects",
        body:
            "מעדיף 6+ חודשים על-פני sprint של רבעון. הקשרים הטובים ביותר נבנים כשיש מספיק זמן לראות את ההחלטות מתבגרות.",
        icon: Telescope,
        tone: "selective",
    },
];

const NOT_OPEN = [
    "One-off Fiverr-style gigs",
    "Hustle-culture projects",
    "Anything that requires hiding the AI usage",
    "Sponsorships for tools I don't use",
];

const TONE_STYLES = {
    live: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
    exploring: "text-sky-300 bg-sky-500/10 border-sky-500/20",
    selective: "text-amber-300 bg-amber-500/10 border-amber-500/20",
};

const TONE_BLOOM = {
    live: "bloom-cyan",
    exploring: "bloom-blue",
    selective: "bloom-amber",
};

export function CurrentFocus() {
    return (
        <section
            id="current-focus"
            className="py-24 relative z-10"
            aria-labelledby="current-focus-heading"
        >
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-4">
                        <Sparkles className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                        Currently Open To
                    </div>
                    <h2
                        id="current-focus-heading"
                        className="text-4xl md:text-5xl lg:text-5xl font-black tracking-normal text-white mb-4"
                    >
                        מה <span className="text-brand-gradient">פתוח</span> עכשיו.
                    </h2>
                    <p className="text-lg text-ink-muted leading-relaxed">
                        זו לא רשימה סטטית — היא מתעדכנת לפי מה שאני בונה, מה שמעניין אותי לעומק, ומה שיש לי capacity ל-deliver אליו ברמה גבוהה.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-16">
                    {FOCUS_AREAS.map((area, i) => {
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
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-mono uppercase tracking-[0.18em] ${TONE_STYLES[area.tone]}`}>
                                            {area.tone === "live" && (
                                                <span className="relative flex h-1.5 w-1.5">
                                                    <span aria-hidden="true" className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                                </span>
                                            )}
                                            <span dir="ltr">{area.tone === "live" ? "Open" : area.tone === "exploring" ? "Exploring" : "Selective"}</span>
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

                {/* Not currently open block */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="max-w-2xl mx-auto rounded-2xl glass-panel-1 p-6 lg:p-7"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <span dir="ltr" className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-dim">
                            Not currently open to
                        </span>
                        <span aria-hidden="true" className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                        {NOT_OPEN.map((item) => (
                            <li key={item} dir="ltr" className="flex items-center gap-2.5 text-[13.5px] text-ink-muted">
                                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/30" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </section>
    );
}
