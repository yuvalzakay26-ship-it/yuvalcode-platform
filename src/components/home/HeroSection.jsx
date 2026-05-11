import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

const EASE = [0.16, 1, 0.3, 1];

export function HeroSection() {
    const sectionRef = useRef(null);
    const reduced = useReducedMotion();

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden h-[100svh] min-h-[700px] flex items-center justify-center bg-[#07080d]"
        >
            {/* The Void */}
            <div className="absolute inset-0 bg-[#07080d] z-0 pointer-events-none" />

            {/* The Eclipse - Calmed and softened */}
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 0.12, scale: 1 }}
                    transition={{ duration: 3, ease: "easeOut" }}
                    className="absolute w-[90vw] h-[90vh] sm:w-[60vw] sm:h-[60vh] rounded-full mix-blend-screen"
                    style={{
                        background: 'radial-gradient(circle, rgba(79, 70, 229, 0.4) 0%, rgba(0,0,0,0) 65%)',
                        filter: 'blur(100px)'
                    }}
                />
            </div>

            {/* Ambient Core Light - Static, Calmed */}
            <div 
                aria-hidden="true" 
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background: 'radial-gradient(600px circle at 50% 50%, rgba(129, 140, 248, 0.03), transparent 50%)'
                }}
            />

            {/* The Monolith */}
            <div className="container px-4 mx-auto relative z-30 w-full flex flex-col items-center justify-center mt-[-5vh]">
                
                {/* Headline - Scaled for Hebrew mobile cohesion */}
                <motion.h1
                    initial={{ opacity: 0, filter: 'blur(12px)', y: 20 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    transition={{ duration: 1.8, ease: EASE, delay: 0.3 }}
                    className="text-[2.75rem] sm:text-5xl lg:text-5xl font-light text-[#F5F5F7] tracking-wide leading-[1.1] mb-8 text-center drop-shadow-2xl"
                >
                    <span className="block mb-2">קוד. מערכות.</span>
                    <span className="block">ואיך בונים היום.</span>
                </motion.h1>

                {/* Micro-copy - Removed monospace, humanized reading */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: EASE, delay: 1.2 }}
                    className="text-sm sm:text-base lg:text-lg text-ink-muted max-w-lg text-center mb-14 font-sans tracking-normal leading-relaxed"
                >
                    ללמוד תכנות מהבסיס, להבין סוכני AI מודרניים,
                    ולראות איך פרויקטים נבנים למציאות. ברור ובגובה העיניים.
                </motion.p>

                {/* The Magnetic CTA - Grounded action */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: EASE, delay: 1.5 }}
                >
                    <Link to="/exams" className="inline-block relative group">
                        {/* Hover Bloom - Calmed */}
                        <div className="absolute inset-0 bg-indigo-500/15 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        
                        <Button
                            size="lg"
                            className="relative px-12 py-7 text-[15px] font-medium rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white transition-all duration-500 shadow-[0_1px_0_rgba(255,255,255,0.05)_inset]"
                        >
                            לקטלוג השיעורים
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator - Static */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 2.5 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-[12vh] bg-gradient-to-b from-transparent via-white/15 to-transparent z-20 pointer-events-none"
            />
        </section>
    );
}
