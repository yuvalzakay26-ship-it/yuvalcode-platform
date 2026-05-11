import { motion, useReducedMotion } from "framer-motion";
import { MoveDown, Waypoints } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const PROGRESSION_STEPS = [
    {
        id: "step-1",
        label: "L1: Foundations",
        title: "Claude 101",
        description: "הבנת הכלים, פסיכולוגיית AI, ותקשורת נכונה עם מודלים.",
        color: "bg-amber-400/20 border-amber-500/30 text-amber-300"
    },
    {
        id: "step-2",
        label: "L2: Engineering",
        title: "Claude Code",
        description: "אוטומציית פיתוח, בניית מערכות, ועבודה מול טרמינל מקומי.",
        color: "bg-indigo-400/20 border-indigo-500/30 text-indigo-300"
    },
    {
        id: "step-3",
        label: "L3: Systems",
        title: "MAT Systems",
        description: "ארכיטקטורת תוכנה, חשיבה הנדסית למה"ט, והכנה לסביבות מורכבות.",
        color: "bg-rose-400/20 border-rose-500/30 text-rose-300"
    },
    {
        id: "step-4",
        label: "L4: Production",
        title: "Production Architecture",
        description: "פריסה, ניהול תשתיות ענן, ותפעול מערכות AI בקנה מידה רחב.",
        color: "bg-slate-400/20 border-slate-500/30 text-slate-300"
    }
];

export function LearningProgressionArchitecture() {
    const reduced = useReducedMotion();

    return (
        <section className="py-24 relative border-b border-white/5 bg-black/20">
            <div className="container px-4 mx-auto max-w-4xl relative z-10">
                
                <div className="text-center mb-16 md:mb-20">
                    <motion.div
                        initial={reduced ? false : { opacity: 0, y: 10 }}
                        whileInView={reduced ? {} : { opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6"
                    >
                        <Waypoints className="w-3.5 h-3.5 text-slate-400" />
                        <span dir="ltr" className="text-[11px] font-mono tracking-widest uppercase text-slate-400">Progression Architecture</span>
                    </motion.div>
                    
                    <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-4 tracking-tight">
                        מסלול ההתפתחות ההנדסית
                    </h2>
                    <p className="text-ink-muted text-lg font-light">
                        האקוסיסטם בנוי כשכבות של ידע. כל שלב מהווה תשתית לשלב הבא באבולוציה של מפתח AI-Native.
                    </p>
                </div>

                <div className="relative">
                    {/* The Spine */}
                    <div className="absolute top-0 bottom-0 left-[27px] md:left-1/2 w-px bg-gradient-to-b from-white/0 via-white/10 to-white/0 transform md:-translate-x-1/2" />
                    
                    <div className="space-y-12 relative z-10">
                        {PROGRESSION_STEPS.map((step, index) => {
                            const isEven = index % 2 === 0;
                            
                            return (
                                <motion.div 
                                    key={step.id}
                                    initial={reduced ? false : { opacity: 0, y: 20 }}
                                    whileInView={reduced ? {} : { opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-15%" }}
                                    transition={{ duration: 0.8, delay: index * 0.15, ease: EASE }}
                                    className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-0"
                                >
                                    {/* Desktop Left Side */}
                                    <div className={`hidden md:block w-1/2 ${isEven ? 'pr-12 text-right' : 'pl-12 order-last text-left'}`}>
                                        <div dir="ltr" className={`inline-flex items-center gap-2 px-2.5 py-1 rounded border text-[10px] font-mono tracking-widest uppercase ${step.color} mb-3`}>
                                            {step.label}
                                        </div>
                                        <h3 className="text-xl font-display font-medium text-white mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-ink-muted text-sm font-light leading-relaxed max-w-sm ml-auto">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Center Node */}
                                    <div className="absolute left-[19px] md:static md:left-auto flex-shrink-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-white/20 z-10 shadow-[0_0_15px_rgba(255,255,255,0.1)] transform md:mx-auto mt-1 md:mt-0" />

                                    {/* Mobile Content */}
                                    <div className="md:hidden ml-16">
                                        <div dir="ltr" className={`inline-flex items-center gap-2 px-2.5 py-1 rounded border text-[10px] font-mono tracking-widest uppercase ${step.color} mb-3`}>
                                            {step.label}
                                        </div>
                                        <h3 className="text-xl font-display font-medium text-white mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-ink-muted text-sm font-light leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Desktop Empty Space (for alternate side) */}
                                    <div className={`hidden md:block w-1/2 ${isEven ? 'pl-12' : 'pr-12'}`} />

                                </motion.div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}
