import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Compass, Play, Network, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import { SITE } from "../../lib/constants";

const EASE = [0.16, 1, 0.3, 1];

const PILLAR_KEYWORDS = [
    { label: "Programming", x: "6%", y: "20%", delay: 1.8 },
    { label: "AI Tools", x: "84%", y: "22%", delay: 1.9 },
    { label: "Claude Code", x: "10%", y: "44%", delay: 2.0 },
    { label: "Anti Gravity", x: "82%", y: "46%", delay: 2.1 },
    { label: "Obsidian", x: "8%", y: "70%", delay: 2.2 },
    { label: "Building with AI", x: "82%", y: "70%", delay: 2.3 },
];

const GRAPH_NODES = [
    { id: "n1", label: "Programming", cx: 18, cy: 28, primary: true },
    { id: "n2", label: "AI Tools", cx: 78, cy: 32 },
    { id: "n3", label: "Claude Code", cx: 50, cy: 18 },
    { id: "n4", label: "Obsidian", cx: 32, cy: 64 },
    { id: "n5", label: "Anti Gravity", cx: 68, cy: 60 },
    { id: "n6", label: "Building", cx: 50, cy: 78 },
];

const GRAPH_EDGES = [
    ["n1", "n3"], ["n3", "n2"], ["n1", "n4"], ["n4", "n6"],
    ["n2", "n5"], ["n5", "n6"], ["n3", "n5"], ["n4", "n2"],
];

function FloatingPillar({ label, x, y, delay, reduced, isMobile }) {
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

function ContentGraph({ reduced, isMobile }) {
    const nodeById = Object.fromEntries(GRAPH_NODES.map((n) => [n.id, n]));
    const delay = isMobile ? 2.0 : 2.6;
    return (
        <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.98, filter: 'blur(8px)', y: isMobile ? 15 : 20 }}
            animate={reduced ? {} : { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: isMobile ? 1.5 : 1.8, delay, ease: EASE }}
            className="mt-14 max-w-2xl mx-auto"
            aria-hidden="true"
        >
            <div className="rounded-2xl glass-panel-2 px-5 py-5">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                        <span dir="ltr" className="ml-3 text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-dim flex items-center gap-1.5">
                            <Network className="h-3 w-3" strokeWidth={2} />
                            content-graph · 8 pillars
                        </span>
                    </div>
                    <span dir="ltr" className="text-[10px] font-mono uppercase tracking-[0.2em] text-ink-dim hidden sm:inline">
                        live
                    </span>
                </div>

                <div className="relative h-44 sm:h-52 w-full">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                        <defs>
                            <linearGradient id="content-edge" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="rgba(129,140,248,0.45)" />
                                <stop offset="100%" stopColor="rgba(236,72,153,0.25)" />
                            </linearGradient>
                        </defs>
                        {GRAPH_EDGES.map(([a, b], i) => {
                            const A = nodeById[a]; const B = nodeById[b];
                            return (
                                <line
                                    key={i}
                                    x1={A.cx} y1={A.cy} x2={B.cx} y2={B.cy}
                                    stroke="url(#content-edge)"
                                    strokeWidth="0.35"
                                    vectorEffect="non-scaling-stroke"
                                />
                            );
                        })}
                        {GRAPH_NODES.map((n) => (
                            <g key={n.id}>
                                <circle
                                    cx={n.cx} cy={n.cy} r={n.primary ? 1.6 : 1.2}
                                    fill={n.primary ? "rgba(165,180,252,0.95)" : "rgba(255,255,255,0.7)"}
                                />
                                <circle
                                    cx={n.cx} cy={n.cy} r={n.primary ? 3.2 : 2.4}
                                    fill="transparent"
                                    stroke={n.primary ? "rgba(165,180,252,0.35)" : "rgba(255,255,255,0.18)"}
                                    strokeWidth="0.3"
                                    vectorEffect="non-scaling-stroke"
                                />
                            </g>
                        ))}
                    </svg>
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <span dir="ltr" className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-dim">
                        nodes · 8 <span className="text-ink-dim/60 mx-1.5">·</span> edges · evolving
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        </span>
                        <span dir="ltr" className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-300">
                            growing
                        </span>
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

export function ContentHero() {
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

    const handleScrollToFeatured = (e) => {
        e.preventDefault();
        const target = document.getElementById("featured-content-hub");
        if (target) target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    };

    return (
        <section
            ref={sectionRef}
            onMouseMove={handlePointerMove}
            className="relative overflow-hidden py-20 lg:py-28 min-h-[88vh] flex items-center"
            aria-labelledby="content-hero-heading"
        >
            {/* Atmosphere */}
            <motion.div 
                aria-hidden="true" 
                className="absolute inset-0 z-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3, ease: "easeOut" }}
            >
                <div className="absolute top-[-12%] left-1/4 w-[640px] h-[640px] bg-primary/15 rounded-full blur-[160px] mix-blend-screen" />
                <div className="absolute bottom-[-18%] right-1/3 w-[560px] h-[560px] bg-secondary/12 rounded-full blur-[150px] mix-blend-screen" />
                <div className="absolute top-1/3 right-[8%] w-[320px] h-[320px] bg-accent/8 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50" />
            </motion.div>

            <div aria-hidden="true" className="hero-spotlight absolute inset-0 z-0 pointer-events-none" />

            {PILLAR_KEYWORDS.map((k) => (
                <FloatingPillar key={k.label} {...k} reduced={reduced} isMobile={isMobile} />
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
                        <span dir="ltr" className="text-[11px] sm:text-[12px] font-mono tracking-[0.22em] uppercase text-ink-muted">
                            Content OS <span className="text-ink-dim mx-1.5">·</span> 2026
                            <span className="text-ink-dim mx-1.5">·</span> 8 Pillars
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        id="content-hero-heading"
                        initial={reduced ? false : { opacity: 0, y: isMobile ? 15 : 20, filter: 'blur(12px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: isMobile ? 1.5 : 1.8, delay: isMobile ? 0.5 : 0.7, ease: EASE }}
                        className="font-display text-5xl sm:text-5xl lg:text-5xl xl:text-5xl font-black tracking-normal mb-7 leading-[1.02]"
                    >
                        <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-300 drop-shadow-2xl">
                            חקור את <span className="text-accent-content text-glow">האקוסיסטם</span>.
                        </span>
                        <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-300">
                            לא רשימת סרטונים.
                        </span>
                        <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400">
                            מערכת תוכן חיה.
                        </span>
                    </motion.h1>

                    {/* Subheadline 1 */}
                    <motion.p
                        initial={reduced ? false : { opacity: 0, y: isMobile ? 10 : 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: isMobile ? 1.0 : 1.2, delay: isMobile ? 0.9 : 1.2, ease: EASE }}
                        className="text-lg lg:text-xl text-ink-muted max-w-2xl mx-auto mb-3 leading-relaxed"
                    >
                        <span className="text-ink font-medium">Programming</span> · <span dir="ltr" className="text-ink font-medium">AI</span> · <span className="text-ink font-medium">Systems</span> · <span dir="ltr" className="text-ink font-medium">Building in public</span>.
                    </motion.p>

                    {/* Subheadline 2 */}
                    <motion.p
                        initial={reduced ? false : { opacity: 0, y: isMobile ? 10 : 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: isMobile ? 1.0 : 1.2, delay: isMobile ? 1.1 : 1.4, ease: EASE }}
                        className="text-base lg:text-lg text-ink-muted max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        מערכת תוכן שמחברת שמונה pillars לאקוסיסטם אחד. למד מה שאני בונה — בזמן אמת.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={reduced ? false : { opacity: 0, y: isMobile ? 10 : 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: isMobile ? 1.0 : 1.2, delay: isMobile ? 1.3 : 1.7, ease: EASE }}
                        className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4"
                    >
                        <a
                            href="#featured-content-hub"
                            onClick={handleScrollToFeatured}
                            className="w-full sm:w-auto"
                        >
                            <Button
                                size="lg"
                                className="w-full sm:w-auto gap-2.5 px-7 text-[15px]"
                            >
                                <Compass className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                                Start Exploring
                            </Button>
                        </a>

                        <a
                            href={SITE.youtubeChannelUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto"
                        >
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto gap-2.5 px-7 text-[15px] border-white/15 hover:border-white/25 backdrop-blur-sm"
                            >
                                <Play className="h-4 w-4 fill-current" strokeWidth={1.75} aria-hidden="true" />
                                Latest AI Content
                            </Button>
                        </a>
                    </motion.div>

                    <ContentGraph reduced={reduced} isMobile={isMobile} />
                </div>
            </div>
        </section>
    );
}
