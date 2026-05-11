import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Server, Compass } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

export function InstitutionalHero() {
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

    return (
        <section
            ref={sectionRef}
            onMouseMove={handlePointerMove}
            className="relative overflow-hidden py-24 lg:py-32 min-h-[60vh] flex items-center border-b border-white/5"
            aria-labelledby="institutional-hero-heading"
        >
            {/* Minimal Atmospheric Grounding */}
            <motion.div 
                aria-hidden="true" 
                className="absolute inset-0 z-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3, ease: "easeOut" }}
            >
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-slate-400/5 rounded-full blur-[140px] mix-blend-screen" />
                <div className="absolute bottom-[-10%] left-1/3 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
            </motion.div>

            <div className="container px-4 mx-auto relative z-10 w-full">
                <div className="max-w-4xl mx-auto text-center">

                    {/* Engineering Eyebrow */}
                    <motion.div
                        initial={reduced ? false : { opacity: 0, y: isMobile ? 10 : 15, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: isMobile ? 1.4 : 1.8, delay: isMobile ? 0.2 : 0.3, ease: EASE }}
                        className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-panel-1 mb-8"
                    >
                        <Server className="h-3.5 w-3.5 text-slate-300" strokeWidth={2} aria-hidden="true" />
                        <span dir="ltr" className="text-[11px] sm:text-[12px] font-mono tracking-[0.22em] uppercase text-ink-muted">
                            YuvalCode Institution <span className="text-ink-dim mx-1.5">·</span> 2026
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        id="institutional-hero-heading"
                        initial={reduced ? false : { opacity: 0, y: isMobile ? 15 : 20, filter: 'blur(12px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: isMobile ? 1.5 : 1.8, delay: isMobile ? 0.5 : 0.7, ease: EASE }}
                        className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-normal mb-7 leading-[1.05]"
                    >
                        <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400 drop-shadow-xl">
                            מוסד הלמידה של YuvalCode.
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={reduced ? false : { opacity: 0, y: isMobile ? 10 : 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: isMobile ? 1.0 : 1.2, delay: isMobile ? 0.9 : 1.2, ease: EASE }}
                        className="text-lg lg:text-xl text-ink-muted max-w-2xl mx-auto leading-relaxed font-light"
                    >
                        קורסים מקצועיים לבניית מערכות עבודה מודרניות עם AI, פיתוח, אוטומציות וחשיבה הנדסית.
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
