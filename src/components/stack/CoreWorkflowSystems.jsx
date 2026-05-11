import { motion } from "framer-motion";
import { Bot, Code2, Network, Megaphone, ArrowLeft } from "lucide-react";
import { Tilt3D, CardGlow } from "../ui/Tilt3D";

const EASE = [0.16, 1, 0.3, 1];

const SYSTEMS = [
    {
        id: "ai-workflow",
        number: "01",
        eyebrow: "AI Workflow",
        title: "סוכן ראשי + מוח שני.",
        purpose: "Purpose · להפוך כל החלטה אדריכלית ל-pair-programming מול AI.",
        philosophy:
            "AI לא מחליף שיקול דעת — הוא מאיץ אותו. כל פיצ'ר עובר תכנון מול Claude, ביצוע מול Claude Code, ודיון מול ChatGPT לפני שהוא נכנס למערכת.",
        why:
            "כדי לכתוב פחות, לחשוב יותר, ולא להיתקע בנקודות שכבר נפתרו במקום אחר בעולם.",
        tools: ["Claude", "Claude Code", "ChatGPT", "Anti Gravity"],
        icon: Bot,
        rgb: "251, 146, 60",
        accent: "from-orange-500/25 to-amber-500/15",
        ring: "group-hover:ring-amber-400/40",
    },
    {
        id: "dev-workflow",
        number: "02",
        eyebrow: "Development Workflow",
        title: "Editor + סוכן + Repo.",
        purpose: "Purpose · קצב של commit-per-feature, בלי לאבד שליטה על איכות הקוד.",
        philosophy:
            "VS Code הוא הבית — Cursor נכנס כשצריך AI עם UI מלא. Claude Code רץ במקביל ב-CLI. כל שינוי משמעותי הופך ל-PR ציבורי לפני שהוא מתפרסם בערוץ.",
        why:
            "סביבה אחת שמדברת עם עצמה — מהמחשבה הראשונה, דרך הקוד, עד ה-deploy.",
        tools: ["VS Code", "Cursor", "Claude Code", "GitHub"],
        icon: Code2,
        rgb: "129, 140, 248",
        accent: "from-indigo-500/25 to-violet-500/15",
        ring: "group-hover:ring-indigo-400/40",
    },
    {
        id: "knowledge",
        number: "03",
        eyebrow: "Knowledge System",
        title: "Vault שמחזיק עשור.",
        purpose: "Purpose · לתעד כל החלטה, כל לקח, וכל סקריפט — graph-first.",
        philosophy:
            "Obsidian כ-Second Brain. Daily notes שמחברים בין רעיונות, MOCs לכל פרויקט, ו-graph view שמראה את הקשרים. AI עוזר לסכם, לחפש, ולחבר — לא להחליף את החשיבה.",
        why:
            "הידע של עשור לא מחזיק בראש. הוא חי ב-vault, נגיש ב-2 קליקים, וחוזר לכל פרויקט שצריך.",
        tools: ["Obsidian", "Daily Notes", "Graph View", "Claude"],
        icon: Network,
        rgb: "168, 85, 247",
        accent: "from-purple-500/25 to-fuchsia-500/15",
        ring: "group-hover:ring-purple-400/40",
    },
    {
        id: "publishing",
        number: "04",
        eyebrow: "Creator Publishing",
        title: "מסקריפט ל-Air.",
        purpose: "Purpose · להפוך לקח טכני לסרטון אחד, באותו שבוע שבו הוא נלמד.",
        philosophy:
            "כל סרטון מתחיל ב-Obsidian — מבנה, נקודות מפתח, ודמואים. צילום ב-Premiere, פרסום ל-YouTube + GitHub + הפלטפורמה. תיעוד public-by-default, לא private-then-published.",
        why:
            "פרסום מהיר שומר על תזמון של תובנה. אם הלקח חיכה חודש — הוא כבר לא חי.",
        tools: ["Obsidian", "Premiere", "YouTube", "GitHub"],
        icon: Megaphone,
        rgb: "236, 72, 153",
        accent: "from-pink-500/25 to-rose-500/15",
        ring: "group-hover:ring-pink-400/40",
    },
];

function SystemCard({ system, index }) {
    const Icon = system.icon;
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
                    className={`relative h-full rounded-[1.75rem] glass-panel-2 p-7 lg:p-8 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-white/20 ring-1 ring-transparent ${system.ring}`}
                >
                    <CardGlow rgb={system.rgb} />

                    <div
                        className={`absolute -right-20 -top-20 w-60 h-60 bg-gradient-to-br ${system.accent} blur-[80px] opacity-80 group-hover:opacity-100 transition-opacity duration-500`}
                        aria-hidden="true"
                    />

                    <div className="relative z-10 flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/20 transition-all duration-300">
                                <Icon className="h-5 w-5 text-white" strokeWidth={1.75} aria-hidden="true" />
                            </div>
                            <span dir="ltr" className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-dim">
                                System · {system.number}
                            </span>
                        </div>

                        {/* Eyebrow */}
                        <div dir="ltr" className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-3 text-left">
                            {system.eyebrow}
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl lg:text-[26px] font-bold text-white mb-3 group-hover:text-primary-200 transition-colors leading-snug">
                            {system.title}
                        </h3>

                        {/* Purpose */}
                        <p dir="ltr" className="text-[11.5px] font-mono uppercase tracking-[0.18em] text-ink-dim mb-4 text-left">
                            {system.purpose}
                        </p>

                        {/* Philosophy */}
                        <p className="text-ink-muted leading-relaxed mb-5 text-[14.5px]">
                            {system.philosophy}
                        </p>

                        {/* Why this exists */}
                        <div className="rounded-xl bg-white/[0.025] border border-white/[0.06] px-4 py-3 mb-5">
                            <span className="block text-[10px] font-mono uppercase tracking-[0.22em] text-ink-dim mb-1.5">
                                Why this setup
                            </span>
                            <p className="text-[13.5px] text-ink leading-relaxed">{system.why}</p>
                        </div>

                        {/* Connected tools */}
                        <div className="mb-6">
                            <span className="block text-[10px] font-mono uppercase tracking-[0.22em] text-ink-dim mb-2">
                                Connected tools
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {system.tools.map((t) => (
                                    <span
                                        key={t}
                                        dir="ltr"
                                        className="inline-flex items-center px-2.5 py-1 rounded-full text-[10.5px] font-mono uppercase tracking-[0.16em] text-ink-muted bg-white/[0.035] border border-white/[0.07]"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-5 mt-auto border-t border-white/5">
                            <span className="inline-flex items-center gap-2 text-sm font-medium text-white/80 group-hover:text-primary-200 transition-colors">
                                Workflow detail
                                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-[10.5px] font-mono uppercase tracking-[0.18em] text-ink-dim">
                                {system.tools.length} tools
                            </span>
                        </div>
                    </div>
                </article>
            </Tilt3D>
        </motion.div>
    );
}

export function CoreWorkflowSystems() {
    return (
        <section
            id="core-workflow-systems"
            className="py-24 relative z-10"
            aria-labelledby="core-workflow-heading"
        >
            <div className="container px-4 mx-auto">
                <div className="max-w-2xl mb-14">
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-4">
                        Core Workflow Systems
                    </div>
                    <h2
                        id="core-workflow-heading"
                        className="text-4xl md:text-5xl lg:text-5xl font-black tracking-normal text-white mb-4"
                    >
                        ארבע <span className="text-brand-gradient">מערכות</span>. סביבה אחת.
                    </h2>
                    <p className="text-lg text-ink-muted leading-relaxed">
                        זה לא ערימת אפליקציות — זו מערכת הפעלה. כל system פותר חלק אחד מהזרימה ומחבר אותו לבא אחריו.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
                    {SYSTEMS.map((s, i) => (
                        <SystemCard key={s.id} system={s} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
