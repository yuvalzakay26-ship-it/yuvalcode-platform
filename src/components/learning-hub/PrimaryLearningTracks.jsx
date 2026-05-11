import { motion, useReducedMotion } from "framer-motion";
import { Lock, ArrowUpRight, Code, Blocks, Cloud, ShieldAlert, Zap, Terminal } from "lucide-react";
import { Link } from "react-router-dom";

const EASE = [0.16, 1, 0.3, 1];

const TRACKS = [
    {
        id: "claude-101",
        title: "Claude 101",
        subtitle: "Active",
        description: "יסודות עבודה מודרנית עם AI וסביבות עבודה מקצועיות.",
        href: "/courses/claude-101",
        icon: Blocks,
        color: "from-amber-400/20 to-amber-600/5",
        borderColor: "border-amber-500/20",
        iconColor: "text-amber-400",
        bgHover: "hover:bg-amber-500/5",
        status: "Available",
        cta: "היכנס לקורס"
    },
    {
        id: "claude-code",
        title: "Claude Code",
        subtitle: "Active",
        description: "מערכות עבודה, Workflows והנדסת תהליכים מודרנית.",
        href: "/courses/claude-code",
        icon: Code,
        color: "from-indigo-400/20 to-indigo-600/5",
        borderColor: "border-indigo-500/20",
        iconColor: "text-indigo-400",
        bgHover: "hover:bg-indigo-500/5",
        status: "Available",
        cta: "פתח סביבת עבודה"
    },
    {
        id: "mat-systems",
        title: "MAT Systems",
        subtitle: "Active",
        description: "פתרון מבחני MAT, חשיבה טכנית והבנה מערכתית.",
        href: "/exams",
        icon: ShieldAlert,
        color: "from-rose-400/20 to-rose-600/5",
        borderColor: "border-rose-500/20",
        iconColor: "text-rose-400",
        bgHover: "hover:bg-rose-500/5",
        status: "Available",
        cta: "התחל ללמוד"
    },
    {
        id: "cloud-systems",
        title: "Cloud Systems",
        subtitle: "Coming Soon",
        description: "ארכיטקטורת ענן מודרנית, פריסת מערכות וניהול שרתים.",
        href: "#",
        icon: Cloud,
        color: "from-slate-400/10 to-slate-600/5",
        borderColor: "border-slate-500/10",
        iconColor: "text-slate-400",
        bgHover: "hover:bg-slate-500/5",
        status: "Locked",
        cta: "Locked"
    },
    {
        id: "antigravity",
        title: "AntiGravity",
        subtitle: "Coming Soon",
        description: "סוכני AI אוטונומיים, סביבות הרצה וסוכנים מורכבים.",
        href: "#",
        icon: Zap,
        color: "from-slate-400/10 to-slate-600/5",
        borderColor: "border-slate-500/10",
        iconColor: "text-slate-400",
        bgHover: "hover:bg-slate-500/5",
        status: "Locked",
        cta: "Locked"
    },
    {
        id: "ai-tools",
        title: "AI Tools",
        subtitle: "Experimental",
        description: "כלי פיתוח, סביבות מינימליסטיות ותשתיות מחקר.",
        href: "#",
        icon: Terminal,
        color: "from-slate-400/10 to-slate-600/5",
        borderColor: "border-slate-500/10",
        iconColor: "text-slate-400",
        bgHover: "hover:bg-slate-500/5",
        status: "Locked",
        cta: "Locked"
    }
];

export function PrimaryLearningTracks() {
    const reduced = useReducedMotion();

    return (
        <section id="primary-learning-tracks" className="py-24 relative border-b border-white/5">
            <div className="container px-4 mx-auto max-w-6xl relative z-10">
                
                <div className="mb-16 md:mb-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-4 tracking-tight">
                        קטלוג הקורסים
                    </h2>
                    <p className="text-ink-muted max-w-2xl mx-auto text-lg font-light">
                        בחר את מסלול ההתמחות שלך.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {TRACKS.map((track, i) => {
                        const Icon = track.icon;
                        const isLocked = track.status === "Locked";
                        
                        return (
                            <motion.div
                                key={track.id}
                                initial={reduced ? false : { opacity: 0, y: 20 }}
                                whileInView={reduced ? {} : { opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                            >
                                {isLocked ? (
                                    <div className={`block h-full p-8 rounded-3xl border ${track.borderColor} bg-slate-900/20 backdrop-blur-sm relative overflow-hidden transition-all duration-300`}>
                                        <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${track.color} blur-[80px] opacity-20 pointer-events-none`} />
                                        
                                        <div className="flex justify-between items-start mb-12 relative z-10">
                                            <div className={`p-3 rounded-2xl bg-white/5 border border-white/5 ${track.iconColor}`}>
                                                <Icon strokeWidth={1.5} className="w-6 h-6" />
                                            </div>
                                            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 flex items-center gap-1.5">
                                                <Lock className="w-3 h-3 text-slate-400" />
                                                <span dir="ltr" className="text-[11px] font-mono tracking-widest uppercase text-slate-400">{track.subtitle}</span>
                                            </div>
                                        </div>

                                        <div className="relative z-10 flex flex-col h-[calc(100%-6rem)]">
                                            <div className="flex-grow">
                                                <h3 className="text-2xl font-display font-medium text-slate-300 mb-3">
                                                    {track.title}
                                                </h3>
                                                <p className="text-slate-500 font-light leading-relaxed text-sm">
                                                    {track.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Link 
                                        to={track.href}
                                        className={`block h-full p-8 rounded-3xl border ${track.borderColor} bg-slate-900/40 backdrop-blur-sm ${track.bgHover} relative overflow-hidden transition-all duration-500 group flex flex-col`}
                                    >
                                        <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${track.color} blur-[80px] opacity-40 pointer-events-none group-hover:opacity-70 transition-opacity duration-700`} />
                                        
                                        <div className="flex justify-between items-start mb-12 relative z-10">
                                            <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${track.iconColor} shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-500 ease-out`}>
                                                <Icon strokeWidth={1.5} className="w-6 h-6" />
                                            </div>
                                            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <span dir="ltr" className="text-[11px] font-mono uppercase text-white/70">{track.cta}</span>
                                                <ArrowUpRight strokeWidth={1.5} className="w-3 h-3 text-white/70" />
                                            </div>
                                        </div>

                                        <div className="relative z-10 flex-grow flex flex-col">
                                            <div className="flex-grow">
                                                <div dir="ltr" className={`text-[11px] font-mono uppercase tracking-widest ${track.iconColor} mb-2`}>
                                                    {track.subtitle}
                                                </div>
                                                <h3 className="text-2xl font-display font-medium text-white mb-3 group-hover:text-white transition-colors duration-300">
                                                    {track.title}
                                                </h3>
                                                <p className="text-ink-muted font-light leading-relaxed group-hover:text-ink-dim transition-colors duration-300 text-sm">
                                                    {track.description}
                                                </p>
                                            </div>
                                            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between opacity-80 group-hover:opacity-100 transition-opacity">
                                                <span className="text-sm font-medium text-white/90">{track.cta}</span>
                                                <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
