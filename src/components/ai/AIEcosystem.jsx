import { motion } from "framer-motion";
import { Brain, MessageSquare, Hexagon, Code2, Github, Atom, Boxes, Box } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const TOOLS = [
    {
        id: "claude",
        name: "Claude",
        role: "AI Partner",
        body: "החשיבה הראשית — תכנון, סקירה, ובחינת רעיונות לפני שהם נכנסים לקוד.",
        icon: Brain,
        bloomClass: "bloom-amber",
    },
    {
        id: "claude-code",
        name: "Claude Code",
        role: "Coding Agent",
        body: "סוכן ב-CLI שמריץ פקודות, עורך קבצים, ומבצע משימות end-to-end.",
        icon: Code2,
        bloomClass: "bloom-amber",
    },
    {
        id: "chatgpt",
        name: "ChatGPT",
        role: "Brainstorm",
        body: "להשוואת זוויות, סיעור מוחות, וגישה שנייה כשצריך אופוזיציה לרעיון.",
        icon: MessageSquare,
        bloomClass: "bloom-cyan",
    },
    {
        id: "obsidian",
        name: "Obsidian",
        role: "Second Brain",
        body: "המוח השני — סקריפטים, לקחים, החלטות, וקישורים בין רעיונות.",
        icon: Hexagon,
        bloomClass: "bloom-violet",
    },
    {
        id: "vscode",
        name: "VS Code",
        role: "Editor",
        body: "סביבת העריכה היומיומית — קלה, ניתנת להרחבה, מחוברת ל-Claude Code.",
        icon: Code2,
        bloomClass: "bloom-blue",
    },
    {
        id: "cursor",
        name: "Cursor",
        role: "AI Editor",
        body: "כשצריך AI עם UI מלא בתוך העורך — לעריכות מהירות וזיווג קוד.",
        icon: Box,
        bloomClass: "bloom-blue",
    },
    {
        id: "github",
        name: "GitHub",
        role: "Build in Public",
        body: "כל שורת קוד חיה בפומבי. הקומיטים מספרים את הסיפור שאף סרטון לא מספר.",
        icon: Github,
        bloomClass: "bloom-cyan",
    },
    {
        id: "react",
        name: "React",
        role: "Front-End",
        body: "ה-stack של אתרים מודרניים — כולל זה. מהיר, מודולרי, פרודקטיבי.",
        icon: Atom,
        bloomClass: "bloom-cyan",
    },
    {
        id: "dotnet",
        name: ".NET / C#",
        role: "Foundation",
        body: "הבסיס של שנים — backend, מערכות, וקוד שעדיין רץ בייצור.",
        icon: Boxes,
        bloomClass: "bloom-blue",
    },
];

const MARQUEE_LABELS = TOOLS.map((t) => t.name);

function MarqueeRail() {
    const items = [...MARQUEE_LABELS, ...MARQUEE_LABELS];
    return (
        <div
            className="relative overflow-hidden mask-fade py-3 mb-12 border-y border-white/5"
            aria-hidden="true"
        >
            <div
                dir="ltr"
                className="flex items-center gap-10 whitespace-nowrap animate-marquee text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] text-ink-dim"
                style={{ width: "max-content" }}
            >
                {items.map((label, i) => (
                    <span key={`${label}-${i}`} className="flex items-center gap-10">
                        <span className="text-ink-muted">{label}</span>
                        <span className="h-1 w-1 rounded-full bg-white/15" />
                    </span>
                ))}
            </div>
        </div>
    );
}

export function AIEcosystem() {
    return (
        <section id="ai-ecosystem" className="py-24 relative z-10" aria-labelledby="ai-ecosystem-heading">
            <div className="container px-4 mx-auto">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-4">
                        Creator Workflow · 2026
                    </div>
                    <h2 id="ai-ecosystem-heading" className="text-4xl md:text-5xl lg:text-5xl font-black tracking-normal text-white mb-4">
                        ה-<span className="text-brand-gradient">ecosystem</span> שאני בונה איתו.
                    </h2>
                    <p className="text-lg text-ink-muted leading-relaxed">
                        זו לא רשימת לוגואים. אלה הכלים שאני בודק יחד, מנסה לחבר אחד לשני, ולומד מהם איך לעבוד אחרת ב-2026.
                    </p>
                </div>

                <MarqueeRail />

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {TOOLS.map((tool, i) => {
                        const Icon = tool.icon;
                        return (
                            <motion.div
                                key={tool.id}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ delay: i * 0.04, duration: 0.5, ease: EASE }}
                                className={`group relative rounded-2xl glass-panel-1 surface-warm card-ambient ${tool.bloomClass} p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/15 overflow-hidden`}
                            >
                                <div className="relative z-10 card-content-layer">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors duration-300">
                                            <Icon className="text-white" strokeWidth={1.75} aria-hidden="true" style={{ width: 18, height: 18 }} />
                                        </div>
                                        <span dir="ltr" className="text-[9.5px] font-mono uppercase tracking-[0.22em] text-ink-dim">
                                            {tool.role}
                                        </span>
                                    </div>
                                    <h3 dir="ltr" className="text-base font-bold text-white text-left mb-2 group-hover:text-primary-200 transition-colors">
                                        {tool.name}
                                    </h3>
                                    <p className="text-sm text-ink-muted leading-relaxed">
                                        {tool.body}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Footer caption */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-ink-dim max-w-xl mx-auto">
                        כל כלי כאן נכנס ל-stack רק אחרי שהוכיח את עצמו על פרויקט אמיתי. לא טרנדים — מה שעובד.
                    </p>
                </div>
            </div>
        </section>
    );
}
