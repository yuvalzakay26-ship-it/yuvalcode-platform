import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EASE = [0.16, 1, 0.3, 1];

export function EcosystemGateway() {
    return (
        <section className="relative w-full bg-[#07080d] py-24 md:py-48 overflow-hidden flex justify-center">
            {/* The Diffusion (Atmosphere Continuation) 
                This gradient bleeds down from the Hero's Eclipse, ensuring the lighting feels continuous
                rather than abruptly cutting off at the section boundary. */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[800px] z-0 pointer-events-none opacity-40"
                 style={{
                     background: 'radial-gradient(circle at top, rgba(79, 70, 229, 0.12) 0%, rgba(0,0,0,0) 70%)',
                     filter: 'blur(100px)'
                 }}
            />

            <div className="container px-6 mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 items-center max-w-[1200px] mx-auto">
                    
                    {/* Left/Text Column (Asymmetrical - feels like a magazine article) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-15%" }}
                        transition={{ duration: 1.4, ease: EASE }}
                        className="w-full lg:w-5/12 flex flex-col items-start text-right"
                    >
                        {/* Curator/Editorial Label */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px w-10 bg-indigo-500/40"></div>
                            <span className="text-[11px] font-mono text-indigo-300/80 tracking-[0.2em] uppercase">קורס ראשון</span>
                        </div>
                        
                        {/* Massive, light typography scaling down from Hero */}
                        <h2 className="text-5xl sm:text-5xl lg:text-[4rem] font-light text-[#F5F5F7] leading-[1.05] tracking-normal mb-8">
                            Claude 101<br />
                            <span className="text-white/60 text-4xl sm:text-5xl lg:text-[3.2rem]">הבסיס של המודל.</span>
                        </h2>
                        
                        {/* Relaxed, highly legible body copy */}
                        <p className="text-base lg:text-lg text-white/70 leading-[1.8] font-sans font-light max-w-md mb-14">
                            קורס שמסביר איך Claude באמת עובד מתחת למכסה המנוע. 
                            במקום פרומפטים מוכנים, נדבר על קונטקסט, טוקנים, ואיך מודלי שפה חושבים. 
                            זה הבסיס שצריך לפני שמתחילים לבנות מערכות AI מורכבות.
                        </p>

                        {/* Invitational CTA, replacing aggressive buttons */}
                        <Link to="/courses/claude-101" className="group relative flex items-center gap-6 text-sm font-medium text-white/80 hover:text-white transition-colors duration-500">
                            <span className="relative z-10 tracking-wide">לפרטי הקורס</span>
                            {/* Animated line indicator */}
                            <div className="relative z-10 w-12 h-px bg-white/20 group-hover:bg-white/80 group-hover:w-20 transition-all duration-700 ease-out"></div>
                            {/* Subtle hover bloom */}
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-8 bg-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                        </Link>
                    </motion.div>

                    {/* Right/Visual Column (The "Artifact" replacing a generic course card) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-15%" }}
                        transition={{ duration: 1.8, ease: EASE, delay: 0.15 }}
                        className="w-full lg:w-7/12 relative group"
                    >
                        {/* The Artifact Glass Panel */}
                        <div className="relative w-full aspect-square sm:aspect-[4/3] rounded-3xl bg-[#0a0b10]/80 border border-white/5 backdrop-blur-xl flex flex-col shadow-2xl card-ambient bloom-violet">
                            <div className="absolute inset-0 card-content-layer pointer-events-none rounded-3xl overflow-hidden">
                            {/* Subtle noise texture for physical realism */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

                            {/* Top Bar - Minimalist structure */}
                            <div dir="ltr" className="h-14 border-b border-white/[0.04] flex items-center px-8 gap-3 bg-white/[0.01]">
                                <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                                <div className="flex-1"></div>
                                <span className="text-[10px] font-mono tracking-widest text-white/20 uppercase">תצוגה מקדימה</span>
                            </div>
                            
                            {/* Inner Architecture Visualization */}
                            <div className="p-8 sm:p-12 flex-1 flex flex-col justify-center relative overflow-hidden">
                                
                                {/* Static Structural Architecture representing the "Brain" */}
                                <div className="absolute -right-32 -bottom-32 w-96 h-96 border border-white/[0.03] rounded-full" />
                                <div className="absolute -right-16 -bottom-16 w-64 h-64 border border-indigo-500/10 rounded-full opacity-50" />
                                
                                {/* Code/Thought Simulation - Evolving line by line */}
                                <div dir="ltr" className="font-mono text-sm sm:text-base leading-[2] text-indigo-200/50 relative z-10 text-left w-full">
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, delay: 0.6 }}
                                    >
                                        <span className="text-indigo-400">import</span> {'{'} <span className="text-white/80">CognitiveEngine</span> {'}'} <span className="text-indigo-400">from</span> <span className="text-white/60">'@claude/core'</span>;
                                    </motion.div>
                                    
                                    <div className="h-4"></div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, delay: 1.2 }}
                                    >
                                        <span className="text-indigo-400">const</span> <span className="text-white/90">agent</span> = <span className="text-indigo-400">new</span> <span className="text-white/80">CognitiveEngine</span>();
                                    </motion.div>
                                    
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, delay: 1.8 }}
                                        className="mt-2"
                                    >
                                        <span className="text-indigo-400">await</span> agent.<span className="text-white/90">initialize</span>({'{'}
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, delay: 2.2 }}
                                        className="ml-6 sm:ml-8 border-l border-white/10 pl-4"
                                    >
                                        context_window: <span className="text-orange-400/80">"expanded"</span>,
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, delay: 2.6 }}
                                        className="ml-6 sm:ml-8 border-l border-white/10 pl-4"
                                    >
                                        reasoning_depth: <span className="text-blue-400/80">0.95</span>,
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, delay: 3.0 }}
                                        className="ml-6 sm:ml-8 border-l border-white/10 pl-4"
                                    >
                                        temperature: <span className="text-blue-400/80">0.2</span>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, delay: 3.4 }}
                                    >
                                        {'});'}
                                    </motion.div>
                                </div>

                                {/* Status Footer inside the panel */}
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 2, delay: 4.5 }}
                                    className="absolute bottom-0 left-0 right-0 p-8 flex items-center justify-between z-10"
                                >
                                    <div dir="ltr" className="flex items-center gap-3">
                                        <div className="relative flex h-3 w-3">
                                            <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-20 shadow-[0_0_12px_rgba(129,140,248,0.4)]"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500/70"></span>
                                        </div>
                                        <span className="text-[11px] font-mono tracking-widest text-white/50 uppercase">מודל פעיל</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                        </div>
                    </motion.div>
                    
                </div>
            </div>
        </section>
    );
}
