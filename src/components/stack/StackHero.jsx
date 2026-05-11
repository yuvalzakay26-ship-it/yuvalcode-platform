import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Workflow, Compass, Cpu, Terminal } from "lucide-react";
import { Button } from "../ui/Button";

const EASE = [0.16, 1, 0.3, 1];

const FLOATING_KEYWORDS = [
    { label: "research", x: "6%", y: "16%", delay: 1.8 },
    { label: "planning", x: "84%", y: "20%", delay: 1.9 },
    { label: "shipping", x: "9%", y: "78%", delay: 2.0 },
    { label: "documenting", x: "82%", y: "74%", delay: 2.1 },
    { label: "iteration", x: "50%", y: "8%", delay: 2.2 },
    { label: "ai-native", x: "48%", y: "88%", delay: 2.3 },
];

const TERMINAL_LINES = [
    { prompt: "$", text: "yc workflow --start morning" },
    { prompt: ">", text: "claude · planning · obsidian sync · vscode" },
    { prompt: ">", text: "anti-gravity · automations queued · 4 jobs" },
    { prompt: "✓", text: "system online · build · learn · document · ship" },
];

function FloatingKeyword({ label, x, y, delay, reduced, isMobile }) {
    const mobileDelay = delay * 0.8;
    return (
        <motion.div
            aria-hidden="true"
            initial={reduced ? false : { opacity: 0, y: isMobile ? 8 : 12, filter: 'blur(4px)' }}
            animate={reduced ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: isMobile ? 1.0 : 1.2, delay: isMobile ? mobileDelay : delay, ease: EASE }}
            className="absolute hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel-2"
            style={{ left: x, top: y }}
        >
            <span className="h-1.5 w-1.5 rounded-full bg-primary-400 shadow-[0_0_10px_rgba(165,180,252,0.7)]" />
            <span dir="ltr" className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-muted">
                {label}
            </span>
        </motion.div>
    );
}

function NodeWeb({ reduced, isMobile }) {
    return (
        <motion.svg
            initial={reduced ? false : { opacity: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: isMobile ? 1.5 : 2.0, delay: isMobile ? 1.8 : 2.4, ease: EASE }}
            aria-hidden="true"
            viewBox="0 0 400 220"
            className="absolute inset-x-0 top-12 mx-auto w-[640px] max-w-[92%] h-[180px] opacity-[0.18] pointer-events-none hidden md:block"
        >
            <defs>
                <linearGradient id="stack-edge" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(129,140,248,0.85)" />
                    <stop offset="100%" stopColor="rgba(236,72,153,0.55)" />
                </linearGradient>
            </defs>
            {[
                ["60", "60", "200", "30"],
                ["60", "60", "200", "120"],
                ["340", "60", "200", "30"],
                ["340", "60", "200", "120"],
                ["60", "180", "200", "120"],
                ["340", "180", "200", "120"],
                ["200", "30", "200", "120"],
                ["60", "60", "60", "180"],
                ["340", "60", "340", "180"],
            ].map(([x1, y1, x2, y2], i) => (
                <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="url(#stack-edge)"
                    strokeWidth="1"
                />
            ))}
            {[
                ["60", "60"],
                ["340", "60"],
                ["200", "30"],
                ["200", "120"],
                ["60", "180"],
                ["340", "180"],
            ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="3.5" fill="rgba(165,180,252,0.85)" />
            ))}
        </motion.svg>
    );
}

export function StackHero() {
    const sectionRef = useRef(null);
    const reduced = useReducedMotion();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    const handlePointerMove = (e) => {
        if (reduced) return;
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    const handleScrollToWorkflows = (e) => {
        e.preventDefault();
        const target = document.getElementById("core-workflow-systems");
        if (target) target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    };

    return (
        <section
            ref={sectionRef}
            onMouseMove={handlePointerMove}
            className="relative overflow-hidden py-20 lg:py-28 min-h-[88vh] flex items-center"
            aria-labelledby="stack-hero-heading"
        >
            {/* Atmosphere */}
            <motion.div 
                aria-hidden="true" 
                className="absolute inset-0 z-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3, ease: "easeOut" }}
            >
                <div className="absolute top-[-12%] left-[28%] w-[640px] h-[640px] bg-primary/15 rounded-full blur-[160px] mix-blend-screen" />
                <div className="absolute bottom-[-18%] right-[28%] w-[560px] h-[560px] bg-secondary/12 rounded-full blur-[150px] mix-blend-screen" />
                <div className="absolute top-1/3 left-[8%] w-[320px] h-[320px] bg-accent/8 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50" />
            </motion.div>

            {/* Cursor spotlight */}
            <div aria-hidden="true" className="hero-spotlight absolute inset-0 z-0 pointer-events-none" />

            {/* Floating workflow keywords */}
            {FLOATING_KEYWORDS.map((k) => (
                <FloatingKeyword key={k.label} {...k} reduced={reduced} isMobile={isMobile} />
            ))}

            {/* Subtle node web */}
            <NodeWeb reduced={reduced} isMobile={isMobile} />

            <div className="container px-4 mx-auto relative z-10 w-full">
                <div className="max-w-5xl mx-auto text-center">

                    {/* Eyebrow */}
                    <motion.div
                        initial={reduced ? false : { opacity: 0, y: isMobile ? 10 : 15, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: isMobile ? 1.4 : 1.8, delay: isMobile ? 0.2 : 0.3, ease: EASE }}
                        className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-panel-1 mb-8"
                    >
                        <Workflow className="h-3.5 w-3.5 text-primary-300" strokeWidth={2} aria-hidden="true" />
                        <span dir="ltr" className="text-[11px] sm:text-[12px] font-mono tracking-[0.22em] uppercase text-ink-muted">
                            Stack <span className="text-ink-dim mx-1.5">·</span> 2026
                            <span className="text-ink-dim mx-1.5">·</span> Creator Operating System
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        id="stack-hero-heading"
                        initial={reduced ? false : { opacity: 0, y: isMobile ? 15 : 20, filter: 'blur(12px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: isMobile ? 1.5 : 1.8, delay: isMobile ? 0.5 : 0.7, ease: EASE }}
                        className="font-display text-5xl sm:text-5xl lg:text-5xl xl:text-5xl font-black tracking-normal mb-7 leading-[1.02]"
                    >
                        <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-300 drop-shadow-2xl">
                            ה<span className="text-accent-stack text-glow">מערכות</span> שמאחורי העבודה.
                        </span>
                        <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-300">
                            כלים. Workflows.
                        </span>
                        <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400">
                            מערכת הפעלה.
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={reduced ? false : { opacity: 0, y: isMobile ? 10 : 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: isMobile ? 1.0 : 1.2, delay: isMobile ? 0.9 : 1.2, ease: EASE }}
                        className="text-lg lg:text-xl text-ink-muted max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        סביבת עבודה של יוצר <span className="text-ink font-medium">AI-native</span> —
                        בנויה לבנות, ללמוד, לתעד, ולשלוח. Stack אחד שמחבר
                        <span dir="ltr" className="font-medium text-ink"> Claude</span>,
                        <span dir="ltr" className="font-medium text-ink"> Obsidian</span>, ו-
                        <span dir="ltr" className="font-medium text-ink">VS Code</span> ל-OS שלם של יוצר.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={reduced ? false : { opacity: 0, y: isMobile ? 10 : 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: isMobile ? 1.0 : 1.2, delay: isMobile ? 1.3 : 1.7, ease: EASE }}
                        className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4"
                    >
                        <a
                            href="#core-workflow-systems"
                            onClick={handleScrollToWorkflows}
                            className="w-full sm:w-auto"
                        >
                            <Button
                                size="lg"
                                className="w-full sm:w-auto gap-2.5 px-7 text-[15px]"
                            >
                                <Compass className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                                Explore the Workflow
                            </Button>
                        </a>

                        <Link to="/ai" className="w-full sm:w-auto">
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto gap-2.5 px-7 text-[15px] border-white/15 hover:border-white/25 backdrop-blur-sm"
                            >
                                <Cpu className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                                AI Systems
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Terminal atmosphere */}
                    <motion.div
                        initial={reduced ? false : { opacity: 0, scale: 0.98, filter: 'blur(8px)', y: isMobile ? 15 : 20 }}
                        animate={reduced ? {} : { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
                        transition={{ duration: isMobile ? 1.5 : 1.8, delay: isMobile ? 2.0 : 2.6, ease: EASE }}
                        className="mt-14 max-w-xl mx-auto"
                    >
                        <div
                            dir="ltr"
                            className="rounded-2xl glass-panel-2 surface-warm card-ambient bloom-blue px-5 py-4 text-left"
                            aria-hidden="true"
                        >
                            <div className="relative card-content-layer">
                            <div className="flex items-center gap-1.5 mb-3">
                                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                                <span className="ml-3 text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-dim flex items-center gap-1.5">
                                    <Terminal className="h-3 w-3" strokeWidth={2} />
                                    yuvalcode · ~/stack
                                </span>
                            </div>
                            <div className="space-y-1.5 font-mono text-[12.5px] leading-relaxed">
                                {TERMINAL_LINES.map((line, i) => (
                                    <div key={i} className="flex items-start gap-2 text-ink-muted">
                                        <span className="text-primary-300 select-none">{line.prompt}</span>
                                        <span>{line.text}</span>
                                    </div>
                                ))}
                                <div className="flex items-center gap-2 text-primary-300">
                                    <span className="select-none">$</span>
                                    <span className="inline-block h-3.5 w-1.5 bg-primary-300 animate-pulse" />
                                </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
