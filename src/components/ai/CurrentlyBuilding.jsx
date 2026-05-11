import { motion } from "framer-motion";
import { Activity, Radio } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const NOW_ITEMS = [
    {
        id: "claude-code",
        tag: "Claude Code",
        text: "מתעדף את ה-CLI ככלי הראשי לפיתוח. בודק sub-agents, hooks, ו-skills בפרויקטים אמיתיים.",
        state: "מתנסה",
        tone: "live",
    },
    {
        id: "rag",
        tag: "RAG Patterns",
        text: "לומד לעומק תבניות RAG מודרניות — chunking, hybrid search, re-ranking, ואיך להעריך תוצאות בלי להונות את עצמך.",
        state: "לומד",
        tone: "study",
    },
    {
        id: "agents",
        tag: "Agent Systems",
        text: "בונה סוכן אישי שמנהל את הצנרת של הערוץ — מתסריט, לתמלול, לתיוג, להעלאה. הקפיצה היא לא מודל גדול יותר; היא מערכת טובה יותר.",
        state: "בונה",
        tone: "build",
    },
    {
        id: "production-ai",
        tag: "AI in Production · Studying",
        text: "לומד איך נראית ארכיטקטורה של מוצרי AI בייצור — observability, fallbacks, עלויות, ואיפה דברים נשברים כשהמודל מתעצבן. דרך מאמרים, פוסטים, וניסויים אישיים.",
        state: "לומד",
        tone: "research",
    },
    {
        id: "obsidian",
        tag: "Obsidian Vault",
        text: "משכלל את ה-vault שמחזיק את כל התוכן של הערוץ. כל סקריפט מתחיל שם, וכל לקח חוזר אליו.",
        state: "משכלל",
        tone: "polish",
    },
];

const TONE_DOT = {
    live: "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]",
    study: "bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.7)]",
    build: "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.7)]",
    research: "bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.7)]",
    polish: "bg-pink-400 shadow-[0_0_12px_rgba(244,114,182,0.7)]",
};

const TONE_TEXT = {
    live: "text-emerald-300",
    study: "text-sky-300",
    build: "text-amber-300",
    research: "text-violet-300",
    polish: "text-pink-300",
};

export function CurrentlyBuilding() {
    return (
        <section id="currently-building" className="py-24 relative z-10" aria-labelledby="now-heading">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                    {/* Left — header */}
                    <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-1 mb-5">
                            <Radio className="h-3.5 w-3.5 text-primary-300" strokeWidth={2} aria-hidden="true" />
                            <span dir="ltr" className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-muted">
                                Now · Live Status
                            </span>
                        </div>

                        <h2 id="now-heading" className="text-4xl md:text-5xl lg:text-5xl font-black tracking-normal text-white mb-5 leading-[1.05]">
                            מה <span className="text-brand-gradient">בונים</span> עכשיו.
                        </h2>

                        <p className="text-lg text-ink-muted leading-relaxed mb-8">
                            תיעוד פתוח של מה שאני לומד, בונה, ושובר השבוע. בלי פילטר, בלי לבחור רק את הצדדים הנוצצים — זה מה שיוצר נאמנות לאורך זמן.
                        </p>

                        <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-ink-dim">
                            <Activity className="h-3.5 w-3.5 text-primary-300" strokeWidth={2} aria-hidden="true" />
                            עדכון אחרון · 2026-05
                        </div>
                    </div>

                    {/* Right — feed */}
                    <div className="lg:col-span-7">
                        <ol className="relative" role="list">
                            {/* Vertical hairline */}
                            <span
                                aria-hidden="true"
                                className="absolute top-2 bottom-2 right-3 lg:right-4 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
                            />

                            {NOW_ITEMS.map((item, i) => (
                                <motion.li
                                    key={item.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
                                    className="relative pr-12 lg:pr-14 pb-7 last:pb-0"
                                >
                                    {/* Dot on the rail */}
                                    <span
                                        aria-hidden="true"
                                        className={`absolute right-2 lg:right-3 top-3 h-2.5 w-2.5 rounded-full ${TONE_DOT[item.tone]}`}
                                    />

                                    <div className="rounded-2xl glass-panel-1 p-5 lg:p-6 hover:border-white/15 transition-colors duration-500">
                                        <div className="flex items-center justify-between mb-2 gap-3">
                                            <span dir="ltr" className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-dim truncate">
                                                {item.tag}
                                            </span>
                                            <span className={`text-[10.5px] font-mono uppercase tracking-[0.18em] ${TONE_TEXT[item.tone]}`}>
                                                {item.state}
                                            </span>
                                        </div>
                                        <p className="text-[15px] leading-relaxed text-ink">
                                            {item.text}
                                        </p>
                                    </div>
                                </motion.li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
}
