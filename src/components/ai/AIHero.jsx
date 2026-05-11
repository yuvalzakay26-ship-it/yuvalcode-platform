import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Workflow, Sparkles, Terminal } from "lucide-react";
import { Button } from "../ui/Button";
import { SITE } from "../../lib/constants";

const EASE = [0.16, 1, 0.3, 1];

const ECOSYSTEM_BADGES = [
    { label: "Claude Code", x: "8%", y: "22%", delay: 1.8 },
    { label: "Anti Gravity", x: "84%", y: "26%", delay: 1.95 },
    { label: "Obsidian", x: "12%", y: "72%", delay: 2.1 },
    { label: "Agents", x: "82%", y: "70%", delay: 2.25 },
];

const TERMINAL_LINES = [
    { prompt: "$", text: "claude --explore agent.experiment" },
    { prompt: ">", text: "planning · writing · running tests" },
    { prompt: "✓", text: "branch ready · 14 files changed · documented" },
];

function FloatingBadge({ label, x, y, delay, reduced, isMobile }) {
    const mobileDelay = delay * 0.8;
    return (
        <motion.div
            aria-hidden="true"
            initial={reduced ? false : { opacity: 0, y: isMobile ? 8 : 12, filter: 'blur(4px)' }}
            animate={reduced ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: isMobile ? 1.0 : 1.2, delay: isMobile ? mobileDelay : delay, ease: EASE }}
            className="absolute hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel-2"
            style={{ left: x, top: y }}
        >
            <span className="h-1.5 w-1.5 rounded-full bg-primary-400 shadow-[0_0_10px_rgba(165,180,252,0.7)]" />
            <span dir="ltr" className="text-[10.5px] font-mono uppercase tracking-[0.2em] text-ink-muted">
                {label}
            </span>
        </motion.div>
    );
}

export function AIHero() {
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
        const target = document.getElementById("ai-ecosystem");
        if (target) target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    };

    return (
        <section
            ref={sectionRef}
            onMouseMove={handlePointerMove}
            className="relative overflow-hidden py-20 lg:py-28 min-h-[88vh] flex items-center"
            aria-labelledby="ai-hero-heading"
        >
            {/* Atmosphere */}
            <motion.div 
                aria-hidden="true" 
                className="absolute inset-0 z-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3, ease: "easeOut" }}
            >
                <div className="absolute top-[-10%] left-1/3 w-[620px] h-[620px] bg-primary/15 rounded-full blur-[150px] mix-blend-screen" />
                <div className="absolute bottom-[-15%] right-1/4 w-[540px] h-[540px] bg-secondary/12 rounded-full blur-[140px] mix-blend-screen" />
                <div className="absolute top-1/3 right-1/2 w-[320px] h-[320px] bg-accent/8 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05]" />
                {/* Scanline-style ambient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />
            </motion.div>

            {/* Cursor spotlight */}
            <div aria-hidden="true" className="hero-spotlight absolute inset-0 z-0 pointer-events-none" />

            {/* Floating ecosystem badges */}
            {ECOSYSTEM_BADGES.map((b) => (
                <FloatingBadge key={b.label} {...b} reduced={reduced} isMobile={isMobile} />
            ))}

            <div className="container px-4 mx-auto relative z-10 w-full">
                <div className="max-w-5xl mx-auto text-center">

                    {/* Eyebrow */}
                    <motion.div
                        initial={reduced ? false : { opacity: 0, y: isMobile ? 10 : 15, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: isMobile ? 1.4 : 1.8, delay: isMobile ? 0.2 : 0.3, ease: EASE }}
                        className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-panel-1 mb-8"
                    >
                        <Sparkles className="h-3.5 w-3.5 text-primary-300" strokeWidth={2} aria-hidden="true" />
                        <span dir="ltr" className="text-[11px] sm:text-[12px] font-mono tracking-[0.2em] uppercase text-ink-muted">
                            AI Track <span className="text-ink-dim mx-1.5">·</span> 2026
                            <span className="text-ink-dim mx-1.5">·</span> Build in Public
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        id="ai-hero-heading"
                        initial={reduced ? false : { opacity: 0, y: isMobile ? 15 : 20, filter: 'blur(12px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: isMobile ? 1.5 : 1.8, delay: isMobile ? 0.5 : 0.7, ease: EASE }}
                        className="font-display text-5xl sm:text-5xl lg:text-5xl xl:text-5xl font-black tracking-normal mb-7 leading-[1.02]"
                    >
                        <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-300 drop-shadow-2xl">
                            בונה עם <span className="text-accent-ai text-glow">AI</span>.
                        </span>
                        <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-300">
                            בפומבי.
                        </span>
                        <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400">
                            בלי הייפ.
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={reduced ? false : { opacity: 0, y: isMobile ? 10 : 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: isMobile ? 1.0 : 1.2, delay: isMobile ? 0.9 : 1.2, ease: EASE }}
                        className="text-lg lg:text-xl text-ink-muted max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        מסלול תוכן על <span className="text-ink font-medium">Claude Code</span>,
                        סוכני <span dir="ltr" className="font-medium text-ink">AI</span>,
                        מערכות ידע ב-<span className="text-ink font-medium">Obsidian</span>,
                        ובניית מוצרים אמיתיים בעידן ה-AI. תיעוד של מסע, לא הבטחות.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={reduced ? false : { opacity: 0, y: isMobile ? 10 : 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: isMobile ? 1.0 : 1.2, delay: isMobile ? 1.3 : 1.7, ease: EASE }}
                        className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4"
                    >
                        <a
                            href={SITE.youtubeChannelUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto"
                        >
                            <Button
                                size="lg"
                                className="w-full sm:w-auto gap-2.5 px-7 text-[15px]"
                            >
                                <Play className="h-4 w-4 fill-current" strokeWidth={1.75} aria-hidden="true" />
                                צפה בתוכן AI
                            </Button>
                        </a>

                        <a
                            href="#ai-ecosystem"
                            onClick={handleScrollToWorkflows}
                            className="w-full sm:w-auto"
                        >
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto gap-2.5 px-7 text-[15px] border-white/15 hover:border-white/25 backdrop-blur-sm"
                            >
                                <Workflow className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                                גלה Workflows
                            </Button>
                        </a>
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
                            className="rounded-2xl glass-panel-2 px-5 py-4 text-left"
                            aria-hidden="true"
                        >
                            <div className="flex items-center gap-1.5 mb-3">
                                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                                <span className="ml-3 text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-dim flex items-center gap-1.5">
                                    <Terminal className="h-3 w-3" strokeWidth={2} />
                                    yuvalcode · ~/build
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
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
