import { motion, useReducedMotion } from 'framer-motion';
import { Cpu, Network, Terminal, Database, Code, Braces, Binary, CloudCog, Layers, Server, Workflow } from 'lucide-react';

export function IndigoSmokeAtmosphere() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
            {/* 1. DEEP AMBIENT BACKGROUND & VOLUMETRIC BASE */}
            <div className="absolute inset-0 bg-[#020308]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(49,46,129,0.15)_0%,_rgba(30,27,75,0.05)_40%,_transparent_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(67,56,202,0.08)_0%,_transparent_50%)]" />

            {/* =========================================
                CINEMATIC EDGE LIGHTING & CORNERS
               ========================================= */}
            <div className="absolute top-0 left-0 w-[20vw] h-full bg-[linear-gradient(to_right,rgba(67,56,202,0.12)_0%,transparent_100%)] blur-[60px]" />
            <div className="absolute top-0 right-0 w-[20vw] h-full bg-[linear-gradient(to_left,rgba(67,56,202,0.12)_0%,transparent_100%)] blur-[60px]" />
            
            {/* Corner Volumetric Bleeds */}
            <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-violet-600/[0.2] blur-[120px] rounded-full mix-blend-screen" />
            <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-500/[0.18] blur-[140px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-700/[0.15] blur-[130px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-700/[0.12] blur-[150px] rounded-full mix-blend-screen" />

            {/* =========================================
                LARGE VOLUMETRIC DIRECTIONAL LIGHTING (THE SMOKE)
               ========================================= */}
            <motion.div 
                animate={shouldReduceMotion ? {} : { y: ["-2%", "2%", "-2%"], x: ["-1%", "1%", "-1%"], scale: [1, 1.05, 1] }}
                transition={{ duration: 28, ease: "easeInOut", repeat: Infinity }}
                className="absolute top-[5%] left-[5%] w-[60vw] h-[70vh] bg-indigo-500/[0.18] blur-[120px] rounded-[100%] mix-blend-color-dodge transform-gpu"
                style={{ transformOrigin: "center left" }}
            />
            <motion.div 
                animate={shouldReduceMotion ? {} : { y: ["2%", "-2%", "2%"], x: ["1%", "-1%", "1%"], scale: [1, 1.08, 1] }}
                transition={{ duration: 32, ease: "easeInOut", repeat: Infinity }}
                className="absolute top-[15%] right-[-5%] w-[70vw] h-[80vh] bg-violet-500/[0.15] blur-[130px] rounded-[100%] mix-blend-screen transform-gpu"
            />
            <motion.div 
                animate={shouldReduceMotion ? {} : { y: ["-3%", "3%", "-3%"], rotate: [-2, 2, -2], scale: [1, 1.05, 1] }}
                transition={{ duration: 38, ease: "easeInOut", repeat: Infinity }}
                className="absolute top-[40%] left-[-10%] w-[80vw] h-[60vh] bg-indigo-600/[0.12] blur-[140px] rounded-[100%] mix-blend-screen transform-gpu"
            />
            <motion.div 
                animate={shouldReduceMotion ? {} : { y: ["2%", "-2%", "2%"], rotate: [2, -2, 2], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 45, ease: "easeInOut", repeat: Infinity }}
                className="absolute top-[60%] right-[-15%] w-[90vw] h-[70vh] bg-violet-600/[0.1] blur-[150px] rounded-[100%] mix-blend-color-dodge transform-gpu"
            />
            <motion.div 
                animate={shouldReduceMotion ? {} : { y: ["-1%", "1%", "-1%"], opacity: [0.08, 0.15, 0.08] }}
                transition={{ duration: 50, ease: "easeInOut", repeat: Infinity }}
                className="absolute bottom-[-5%] left-[10%] w-[70vw] h-[60vh] bg-blue-600/[0.1] blur-[140px] rounded-[100%] mix-blend-screen transform-gpu"
            />

            {/* =========================================
                CENTER TYPOGRAPHY PROTECTION MASK 
               ========================================= */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,_transparent_0%,_rgba(0,0,0,0.35)_25%,_rgba(0,0,0,0.35)_75%,_transparent_100%)] pointer-events-none z-10" />

            {/* =========================================
                ENVIRONMENTAL RICHNESS: FLOATING ELEMENTS
               ========================================= */}
            <div className="absolute inset-0 overflow-hidden mix-blend-screen z-20 pointer-events-none">
                {/* 1. Large Heavily Blurred Background Elements (Deep Depth) */}
                <motion.div animate={shouldReduceMotion ? {} : { y: ["0vh", "-10vh", "0vh"], rotate: [0, 45, 0] }} transition={{ duration: 70, ease: "linear", repeat: Infinity }} className="absolute top-[15%] left-[5%] opacity-20 blur-[10px]">
                    <Layers className="w-[30vw] h-[30vw] text-indigo-600" strokeWidth={0.5} />
                </motion.div>
                <motion.div animate={shouldReduceMotion ? {} : { y: ["0vh", "15vh", "0vh"], rotate: [0, -30, 0] }} transition={{ duration: 80, ease: "linear", repeat: Infinity, delay: 5 }} className="absolute top-[55%] right-[-5%] opacity-15 blur-[12px]">
                    <Network className="w-[40vw] h-[40vw] text-violet-600" strokeWidth={0.2} />
                </motion.div>

                {/* 2. Mid-Depth System Glyphs & UI Fragments */}
                <motion.div animate={shouldReduceMotion ? {} : { y: ["0vh", "-8vh", "0vh"], rotate: [-5, 5, -5] }} transition={{ duration: 50, ease: "easeInOut", repeat: Infinity }} className="absolute top-[18%] right-[22%] opacity-30 blur-[2.5px]">
                    <Server className="w-24 h-24 text-indigo-400" strokeWidth={0.5} />
                </motion.div>
                <motion.div animate={shouldReduceMotion ? {} : { y: ["0vh", "8vh", "0vh"], rotate: [5, -5, 5] }} transition={{ duration: 55, ease: "easeInOut", repeat: Infinity, delay: 10 }} className="absolute top-[42%] left-[12%] opacity-25 blur-[3.5px]">
                    <Workflow className="w-28 h-28 text-violet-300" strokeWidth={0.5} />
                </motion.div>
                <motion.div animate={shouldReduceMotion ? {} : { y: ["0vh", "-12vh", "0vh"], x: ["0vw", "2vw", "0vw"] }} transition={{ duration: 60, ease: "easeInOut", repeat: Infinity, delay: 15 }} className="absolute top-[68%] left-[6%] opacity-30 blur-[4px]">
                    <Terminal className="w-36 h-36 text-indigo-500" strokeWidth={0.5} />
                </motion.div>
                <motion.div animate={shouldReduceMotion ? {} : { y: ["0vh", "10vh", "0vh"], x: ["0vw", "-2vw", "0vw"] }} transition={{ duration: 65, ease: "easeInOut", repeat: Infinity, delay: 20 }} className="absolute top-[82%] right-[15%] opacity-20 blur-[2px]">
                    <Cpu className="w-32 h-32 text-violet-400" strokeWidth={0.5} />
                </motion.div>
                <motion.div animate={shouldReduceMotion ? {} : { y: ["0vh", "-15vh", "0vh"], rotate: [0, 15, 0] }} transition={{ duration: 75, ease: "easeInOut", repeat: Infinity, delay: 8 }} className="absolute top-[32%] right-[8%] opacity-20 blur-[5px]">
                    <Database className="w-40 h-40 text-blue-600" strokeWidth={0.5} />
                </motion.div>

                {/* 3. Sharp & Tiny Foreground Elements (Floating code, glyphs) */}
                <motion.div animate={shouldReduceMotion ? {} : { y: ["0vh", "-20vh"], opacity: [0, 0.5, 0] }} transition={{ duration: 40, ease: "linear", repeat: Infinity }} className="absolute top-[45%] right-[32%] opacity-50 blur-[0.5px]">
                    <Binary className="w-8 h-8 text-indigo-200" strokeWidth={1} />
                </motion.div>
                <motion.div animate={shouldReduceMotion ? {} : { y: ["0vh", "-25vh"], opacity: [0, 0.4, 0] }} transition={{ duration: 45, ease: "linear", repeat: Infinity, delay: 12 }} className="absolute top-[65%] left-[22%] opacity-40 blur-[1px]">
                    <Braces className="w-6 h-6 text-violet-200" strokeWidth={1.5} />
                </motion.div>
                <motion.div animate={shouldReduceMotion ? {} : { y: ["0vh", "-15vh"], opacity: [0, 0.6, 0] }} transition={{ duration: 35, ease: "linear", repeat: Infinity, delay: 25 }} className="absolute top-[28%] left-[35%] opacity-60 blur-[0px]">
                    <Code className="w-5 h-5 text-indigo-100" strokeWidth={1.5} />
                </motion.div>
                <motion.div animate={shouldReduceMotion ? {} : { y: ["0vh", "-30vh"], opacity: [0, 0.3, 0] }} transition={{ duration: 50, ease: "linear", repeat: Infinity, delay: 5 }} className="absolute top-[88%] right-[38%] opacity-30 blur-[1.5px]">
                    <CloudCog className="w-10 h-10 text-violet-300" strokeWidth={1} />
                </motion.div>
            </div>

            {/* =========================================
                HOLOGRAPHIC TILES / UI FRAGMENTS
               ========================================= */}
            <div className="absolute inset-0 overflow-hidden mix-blend-screen z-20 pointer-events-none">
                <motion.div animate={shouldReduceMotion ? {} : { y: ["0vh", "-10vh", "0vh"], rotateX: [0, 20, 0], rotateY: [0, 15, 0] }} transition={{ duration: 45, ease: "easeInOut", repeat: Infinity }} className="absolute top-[22%] right-[12%] w-32 h-20 border border-indigo-500/20 bg-indigo-500/5 rounded-lg backdrop-blur-md opacity-40 blur-[1px] hidden md:block" />
                <motion.div animate={shouldReduceMotion ? {} : { y: ["0vh", "12vh", "0vh"], rotateX: [0, -15, 0], rotateY: [0, -20, 0] }} transition={{ duration: 55, ease: "easeInOut", repeat: Infinity, delay: 10 }} className="absolute top-[58%] left-[8%] w-40 h-16 border border-violet-500/20 bg-violet-500/5 rounded-lg backdrop-blur-sm opacity-30 blur-[2px] hidden md:block" />
                <motion.div animate={shouldReduceMotion ? {} : { y: ["0vh", "-15vh", "0vh"], rotateX: [10, -10, 10], rotateY: [5, -5, 5] }} transition={{ duration: 65, ease: "easeInOut", repeat: Infinity, delay: 20 }} className="absolute top-[78%] right-[22%] w-24 h-24 border border-blue-400/10 bg-blue-400/5 rounded-full backdrop-blur-lg opacity-25 blur-[3px] hidden md:block" />
            </div>

            {/* =========================================
                CINEMATIC PARTICLES / DUST
               ========================================= */}
            <div className="absolute inset-0 overflow-hidden mix-blend-screen opacity-90 z-20 pointer-events-none">
                {/* Top/Hero */}
                <motion.div animate={shouldReduceMotion ? {} : { y: ["0vh", "-30vh"], opacity: [0, 0.8, 0], x: ["0vw", "2vw"] }} transition={{ duration: 25, ease: "linear", repeat: Infinity }} className="absolute top-[10%] left-[18%] w-[4px] h-[4px] bg-indigo-200 blur-[1px] rounded-full" />
                <motion.div animate={shouldReduceMotion ? {} : { y: ["0vh", "-40vh"], opacity: [0, 0.6, 0], x: ["0vw", "-3vw"] }} transition={{ duration: 35, ease: "linear", repeat: Infinity, delay: 5 }} className="absolute top-[18%] right-[22%] w-[8px] h-[8px] bg-violet-200 blur-[3px] rounded-full" />
                <motion.div animate={shouldReduceMotion ? {} : { y: ["0vh", "-35vh"], opacity: [0, 1, 0], x: ["0vw", "1vw"] }} transition={{ duration: 20, ease: "linear", repeat: Infinity, delay: 12 }} className="absolute top-[8%] left-[65%] w-[3px] h-[3px] bg-white blur-[0.5px] rounded-full" />
                <motion.div animate={shouldReduceMotion ? {} : { y: ["0vh", "-25vh"], opacity: [0, 0.5, 0], x: ["0vw", "-1vw"] }} transition={{ duration: 28, ease: "linear", repeat: Infinity, delay: 2 }} className="absolute top-[28%] right-[38%] w-[12px] h-[12px] bg-blue-400 blur-[5px] rounded-full" />

                {/* Mid */}
                <motion.div animate={shouldReduceMotion ? {} : { y: ["0vh", "-30vh"], opacity: [0, 0.7, 0], x: ["0vw", "1vw"] }} transition={{ duration: 32, ease: "linear", repeat: Infinity, delay: 8 }} className="absolute top-[42%] left-[18%] w-[6px] h-[6px] bg-violet-300 blur-[2px] rounded-full" />
                <motion.div animate={shouldReduceMotion ? {} : { y: ["0vh", "-45vh"], opacity: [0, 0.8, 0], x: ["0vw", "-2vw"] }} transition={{ duration: 40, ease: "linear", repeat: Infinity, delay: 15 }} className="absolute top-[52%] right-[18%] w-[5px] h-[5px] bg-indigo-200 blur-[1px] rounded-full" />
                <motion.div animate={shouldReduceMotion ? {} : { y: ["0vh", "-20vh"], opacity: [0, 0.6, 0], x: ["0vw", "3vw"] }} transition={{ duration: 26, ease: "linear", repeat: Infinity, delay: 4 }} className="absolute top-[38%] left-[78%] w-[15px] h-[15px] bg-blue-500 blur-[6px] rounded-full" />
                <motion.div animate={shouldReduceMotion ? {} : { y: ["0vh", "-35vh"], opacity: [0, 0.9, 0], x: ["0vw", "-1vw"] }} transition={{ duration: 30, ease: "linear", repeat: Infinity, delay: 18 }} className="absolute top-[62%] left-[28%] w-[4px] h-[4px] bg-indigo-100 blur-[0.5px] rounded-full" />

                {/* Lower */}
                <motion.div animate={shouldReduceMotion ? {} : { y: ["0vh", "-25vh"], opacity: [0, 0.7, 0], x: ["0vw", "2vw"] }} transition={{ duration: 35, ease: "linear", repeat: Infinity, delay: 7 }} className="absolute top-[78%] left-[42%] w-[7px] h-[7px] bg-blue-300 blur-[2px] rounded-full" />
                <motion.div animate={shouldReduceMotion ? {} : { y: ["0vh", "-40vh"], opacity: [0, 0.5, 0], x: ["0vw", "-4vw"] }} transition={{ duration: 45, ease: "linear", repeat: Infinity, delay: 11 }} className="absolute top-[88%] right-[18%] w-[10px] h-[10px] bg-violet-400 blur-[4px] rounded-full" />
                <motion.div animate={shouldReduceMotion ? {} : { y: ["0vh", "-20vh"], opacity: [0, 0.8, 0], x: ["0vw", "1vw"] }} transition={{ duration: 22, ease: "linear", repeat: Infinity, delay: 3 }} className="absolute top-[92%] left-[22%] w-[5px] h-[5px] bg-indigo-200 blur-[1px] rounded-full" />
                <motion.div animate={shouldReduceMotion ? {} : { y: ["0vh", "-30vh"], opacity: [0, 0.6, 0], x: ["0vw", "-2vw"] }} transition={{ duration: 38, ease: "linear", repeat: Infinity, delay: 14 }} className="absolute top-[82%] right-[58%] w-[18px] h-[18px] bg-blue-600 blur-[8px] rounded-full" />
                <motion.div animate={shouldReduceMotion ? {} : { y: ["0vh", "-35vh"], opacity: [0, 0.7, 0], x: ["0vw", "1vw"] }} transition={{ duration: 29, ease: "linear", repeat: Infinity, delay: 21 }} className="absolute top-[96%] left-[78%] w-[4px] h-[4px] bg-indigo-100 blur-[0px] rounded-full" />
            </div>
        </div>
    );
}
