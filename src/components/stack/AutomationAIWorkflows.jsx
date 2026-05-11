import { motion } from "framer-motion";
import { Bot, Zap, Cpu, Workflow, Sparkles } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const STREAMS = [
    {
        id: "agents",
        marker: "Stream · 01",
        title: "AI Agents בתוך ה-Stack",
        body:
            "Claude Code כסוכן ראשי. Sub-agents מבודדים לפי תחום אחריות — code reviewer, content drafter, eval runner. Memory layer ב-Obsidian שמחזיק החלטות.",
        bullets: ["Sub-agents · MCP · Skills", "Memory ב-Obsidian", "Hooks ל-CLI"],
        icon: Bot,
        rgb: "251, 146, 60",
        accent: "from-orange-500/20 to-amber-500/10",
        status: "Live",
        statusTone: "live",
    },
    {
        id: "automations",
        marker: "Stream · 02",
        title: "Creator Automations",
        body:
            "צנרת תוכן — מתסריט, לתמלול, לתיוג, ל-thumbnails. כל שלב מנוהל על ידי job עם schema מוגדר. כשהזרימה הידנית רצה במקביל מספיק זמן, הסוכן עולה לאוויר.",
        bullets: ["Pipelines · jobs · queues", "Eval לפני production", "Cost · latency budgets"],
        icon: Workflow,
        rgb: "129, 140, 248",
        accent: "from-indigo-500/20 to-violet-500/10",
        status: "Building",
        statusTone: "building",
    },
    {
        id: "experiments",
        marker: "Stream · 03",
        title: "Workflow Experimentation",
        body:
            "כל שבוע — בדיקה של כלי חדש, מודל חדש, או pattern חדש. Eval harness שמריץ regression מול ה-baseline. אם הכלי לא משפר משהו אמיתי, הוא לא נכנס.",
        bullets: ["Weekly experiments", "Regression evals", "Public lessons"],
        icon: Zap,
        rgb: "168, 85, 247",
        accent: "from-purple-500/20 to-fuchsia-500/10",
        status: "Live",
        statusTone: "live",
    },
    {
        id: "future",
        marker: "Stream · 04",
        title: "Toward Smarter Systems",
        body:
            "הכיוון הבא שאני חוקר — מערכות שלומדות מה-vault עצמו, מציעות improvements ל-stack, ומתחזקות מסמכים אוטומטית. AI שמסייע ליוצר, לא להפך.",
        bullets: ["Vault-aware agents", "Self-updating docs", "Architectural reviews"],
        icon: Cpu,
        rgb: "236, 72, 153",
        accent: "from-pink-500/20 to-rose-500/10",
        status: "Roadmap",
        statusTone: "future",
    },
];

const STATUS_STYLES = {
    live: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
    building: "text-amber-300 bg-amber-500/10 border-amber-500/20",
    future: "text-ink-muted bg-white/[0.04] border-white/10",
};

function StreamCard({ stream, index }) {
    const Icon = stream.icon;
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.06, duration: 0.65, ease: EASE }}
            className="group relative rounded-[1.75rem] glass-panel-2 p-7 lg:p-8 overflow-hidden hover:border-white/20 transition-colors duration-500"
        >
            <div
                aria-hidden="true"
                className={`absolute -right-20 -top-20 w-60 h-60 bg-gradient-to-br ${stream.accent} blur-[80px] opacity-80 group-hover:opacity-100 transition-opacity duration-500`}
            />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors duration-300">
                        <Icon className="h-5 w-5 text-white" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <span dir="ltr" className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-dim">
                            {stream.marker}
                        </span>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-mono uppercase tracking-[0.18em] ${STATUS_STYLES[stream.statusTone]}`}>
                            {stream.statusTone === "live" && (
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                </span>
                            )}
                            {stream.status}
                        </span>
                    </div>
                </div>

                <h3 dir="ltr" className="text-xl lg:text-[22px] font-bold text-white text-left mb-3 group-hover:text-primary-200 transition-colors leading-snug">
                    {stream.title}
                </h3>

                <p className="text-ink-muted leading-relaxed mb-5 text-[14.5px] flex-grow">
                    {stream.body}
                </p>

                <ul className="space-y-1.5">
                    {stream.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2.5 text-sm text-ink-muted">
                            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/30" />
                            <span dir="auto">{b}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.article>
    );
}

export function AutomationAIWorkflows() {
    return (
        <section
            id="automation-ai"
            className="py-24 relative z-10"
            aria-labelledby="automation-ai-heading"
        >
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-4">
                        <Sparkles className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                        Automation & AI Workflows
                    </div>
                    <h2
                        id="automation-ai-heading"
                        className="text-4xl md:text-5xl lg:text-5xl font-black tracking-normal text-white mb-4"
                    >
                        חוקר לקראת <span className="text-brand-gradient">מערכות חכמות יותר</span>.
                    </h2>
                    <p className="text-lg text-ink-muted leading-relaxed">
                        ה-stack לא קופא. כל שבוע נכנסים experiments, יוצאים automations חדשות, וה-system משתפר.
                        זה כיוון, לא תכלית.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
                    {STREAMS.map((s, i) => (
                        <StreamCard key={s.id} stream={s} index={i} />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-ink-dim max-w-xl mx-auto">
                        הכיוון: AI שמאיץ את היוצר, לא מחליף אותו. כל experiment מתועד, וכל לקח חי בפומבי.
                    </p>
                </div>
            </div>
        </section>
    );
}
