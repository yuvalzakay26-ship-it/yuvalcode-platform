import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Handshake, Compass, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "../ui/Button";

const EASE = [0.16, 1, 0.3, 1];

const FLOATING_KEYWORDS = [
    { label: "collaborations", x: "6%", y: "18%", delay: 1.8 },
    { label: "consulting", x: "84%", y: "22%", delay: 1.9 },
    { label: "mentorship", x: "8%", y: "76%", delay: 2.0 },
    { label: "partnerships", x: "82%", y: "72%", delay: 2.1 },
    { label: "ai-native dev", x: "50%", y: "10%", delay: 2.2 },
    { label: "long-term", x: "48%", y: "88%", delay: 2.3 },
];

const TRUST_SIGNALS = [
    "Selective collaborations",
    "Long-term thinking",
    "AI-assisted workflows",
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

function ConnectionGraph({ reduced, isMobile }) {
    return (
        <motion.svg
            initial={reduced ? false : { opacity: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: isMobile ? 1.5 : 2.0, delay: isMobile ? 1.8 : 2.4, ease: EASE }}
            aria-hidden="true"
            viewBox="0 0 420 220"
            className="absolute inset-x-0 top-12 mx-auto w-[660px] max-w-[92%] h-[180px] opacity-[0.16] pointer-events-none hidden md:block"
        >
            <defs>
                <linearGradient id="wwm-edge" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(129,140,248,0.85)" />
                    <stop offset="100%" stopColor="rgba(236,72,153,0.55)" />
                </linearGradient>
            </defs>
            {[
                ["210", "30", "60", "100"],
                ["210", "30", "360", "100"],
                ["210", "30", "210", "120"],
                ["60", "100", "210", "120"],
                ["360", "100", "210", "120"],
                ["60", "100", "120", "190"],
                ["360", "100", "300", "190"],
                ["210", "120", "120", "190"],
                ["210", "120", "300", "190"],
                ["120", "190", "300", "190"],
            ].map(([x1, y1, x2, y2], i) => (
                <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="url(#wwm-edge)"
                    strokeWidth="1"
                />
            ))}
            {[
                ["210", "30"],
                ["60", "100"],
                ["360", "100"],
                ["210", "120"],
                ["120", "190"],
                ["300", "190"],
            ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="3.5" fill="rgba(165,180,252,0.85)" />
            ))}
        </motion.svg>
    );
}

export function WorkWithMeHero() {
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

    const handleScrollToPathways = (e) => {
        e.preventDefault();
        const target = document.getElementById("collaboration-pathways");
        if (target) target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    };

    const handleScrollToContact = (e) => {
        e.preventDefault();
        const target = document.getElementById("contact-experience");
        if (target) target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    };

    return (
        <section
            ref={sectionRef}
            onMouseMove={handlePointerMove}
            className="relative overflow-hidden py-20 lg:py-28 min-h-[88vh] flex items-center"
            aria-labelledby="work-with-me-hero-heading"
        >
            {/* Atmosphere */}
            <motion.div 
                aria-hidden="true" 
                className="absolute inset-0 z-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3, ease: "easeOut" }}
            >
                <div className="absolute top-[-10%] left-[28%] w-[640px] h-[640px] bg-primary/15 rounded-full blur-[160px] mix-blend-screen" />
                <div className="absolute bottom-[-18%] right-[26%] w-[560px] h-[560px] bg-secondary/12 rounded-full blur-[150px] mix-blend-screen" />
                <div className="absolute top-1/3 left-[10%] w-[320px] h-[320px] bg-accent/8 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50" />
            </motion.div>

            {/* Cursor spotlight */}
            <div aria-hidden="true" className="hero-spotlight absolute inset-0 z-0 pointer-events-none" />

            {/* Floating keywords */}
            {FLOATING_KEYWORDS.map((k) => (
                <FloatingKeyword key={k.label} {...k} reduced={reduced} isMobile={isMobile} />
            ))}

            {/* Connection graph */}
            <ConnectionGraph reduced={reduced} isMobile={isMobile} />

            <div className="container px-4 mx-auto relative z-10 w-full">
                <div className="max-w-5xl mx-auto text-center">

                    {/* Eyebrow */}
                    <motion.div
                        initial={reduced ? false : { opacity: 0, y: isMobile ? 10 : 15, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: isMobile ? 1.4 : 1.8, delay: isMobile ? 0.2 : 0.3, ease: EASE }}
                        className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-panel-1 mb-8"
                    >
                        <Handshake className="h-3.5 w-3.5 text-primary-300" strokeWidth={2} aria-hidden="true" />
                        <span dir="ltr" className="text-[11px] sm:text-[12px] font-mono tracking-[0.22em] uppercase text-ink-muted">
                            Work With Me <span className="text-ink-dim mx-1.5">·</span> 2026
                            <span className="text-ink-dim mx-1.5">·</span> Open to the right opportunities
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        id="work-with-me-hero-heading"
                        initial={reduced ? false : { opacity: 0, y: isMobile ? 15 : 20, filter: 'blur(12px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: isMobile ? 1.5 : 1.8, delay: isMobile ? 0.5 : 0.7, ease: EASE }}
                        className="font-display text-5xl sm:text-5xl lg:text-5xl xl:text-5xl font-black tracking-normal mb-7 leading-[1.02]"
                    >
                        <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-300 drop-shadow-2xl">
                            בוא נבנה משהו <span className="text-accent-work text-glow">משמעותי</span>.
                        </span>
                        <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-300">
                            שיתופי פעולה. AI. הוראה.
                        </span>
                        <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400">
                            Long-term partnerships.
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={reduced ? false : { opacity: 0, y: isMobile ? 10 : 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: isMobile ? 1.0 : 1.2, delay: isMobile ? 0.9 : 1.2, ease: EASE }}
                        className="text-lg lg:text-xl text-ink-muted max-w-2xl mx-auto mb-9 leading-relaxed"
                    >
                        זה לא דף שירותים — זה <span className="text-ink font-medium">מרחב שיתוף פעולה</span> ליוצרים,
                        אנשי מקצוע, וצוותים שחוקרים פיתוח AI-native. נבחרים בקפידה, נבנים לאורך זמן, ומחוברים לאקוסיסטם החי של הערוץ.
                    </motion.p>

                    {/* Trust signals strip */}
                    <motion.div
                        initial={reduced ? false : { opacity: 0, y: isMobile ? 10 : 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: isMobile ? 1.0 : 1.2, delay: isMobile ? 1.1 : 1.4, ease: EASE }}
                        className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-mono uppercase tracking-[0.22em] text-ink-dim mb-10"
                    >
                        {TRUST_SIGNALS.map((s, i) => (
                            <span key={s} dir="ltr" className="inline-flex items-center gap-2">
                                {i > 0 && <span aria-hidden="true" className="text-ink-dim">·</span>}
                                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-primary-400/70" />
                                {s}
                            </span>
                        ))}
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        initial={reduced ? false : { opacity: 0, y: isMobile ? 10 : 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: isMobile ? 1.0 : 1.2, delay: isMobile ? 1.3 : 1.7, ease: EASE }}
                        className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4"
                    >
                        <a
                            href="#contact-experience"
                            onClick={handleScrollToContact}
                            className="w-full sm:w-auto"
                        >
                            <Button
                                size="lg"
                                className="w-full sm:w-auto gap-2.5 px-7 text-[15px]"
                            >
                                <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                                Start a Conversation
                            </Button>
                        </a>

                        <a
                            href="#collaboration-pathways"
                            onClick={handleScrollToPathways}
                            className="w-full sm:w-auto"
                        >
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto gap-2.5 px-7 text-[15px] border-white/15 hover:border-white/25 backdrop-blur-sm"
                            >
                                <Compass className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                                Explore the Ecosystem
                            </Button>
                        </a>
                    </motion.div>

                    {/* Atmospheric note */}
                    <motion.div
                        initial={reduced ? false : { opacity: 0, scale: 0.98, filter: 'blur(8px)', y: isMobile ? 15 : 20 }}
                        animate={reduced ? {} : { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
                        transition={{ duration: isMobile ? 1.5 : 1.8, delay: isMobile ? 2.0 : 2.6, ease: EASE }}
                        className="mt-14 max-w-xl mx-auto"
                    >
                        <div
                            className="rounded-2xl glass-panel-2 px-6 py-4 flex items-center justify-between gap-4"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <span className="relative flex h-2 w-2 shrink-0">
                                    <span aria-hidden="true" className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                                </span>
                                <span className="text-[13px] text-ink-muted text-right truncate">
                                    זמין לשיחות שיתוף פעולה ראשונות.
                                </span>
                            </div>
                            <span dir="ltr" className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.22em] text-ink-dim shrink-0">
                                <Sparkles className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                                Selective · Long-term
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
