import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Compass,
    Bot,
    Layers,
    Server,
    BookOpen
} from "lucide-react";
import { Button } from "../ui/Button";

export function LearningHubFinalCTA() {
    return (
        <section
            className="py-24 relative overflow-hidden"
            aria-labelledby="learning-hub-final-cta-heading"
        >
            {/* Background */}
            <div aria-hidden="true" className="absolute inset-0 bg-slate-900/10 opacity-60" />
            <div aria-hidden="true" className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />

            <div className="container px-4 mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="glass-panel-2 rounded-[3rem] p-10 md:p-16 lg:p-20 text-center relative overflow-hidden group bg-slate-950/40 border-white/5"
                >
                    {/* Atmospheric Gloom */}
                    <div aria-hidden="true" className="absolute -top-24 -right-24 w-72 h-72 bg-slate-500/10 rounded-full blur-[90px] group-hover:bg-slate-400/10 transition-colors duration-1000" />
                    <div aria-hidden="true" className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-[90px] group-hover:bg-indigo-400/10 transition-colors duration-1000" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-slate-400 mb-5 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                            <Server className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                            Enrollment Open
                        </div>

                        <h2 id="learning-hub-final-cta-heading" className="font-display text-4xl md:text-5xl lg:text-5xl font-medium mb-6 text-white tracking-normal leading-[1.05]">
                            התחל את <span className="text-slate-300">ההכשרה ההנדסית</span> שלך.
                        </h2>
                        <p className="text-lg md:text-xl text-ink-muted mb-10 leading-relaxed max-w-2xl mx-auto font-light">
                            הירשם למסלול הלימודים הראשון והתחל לבנות חשיבה מערכתית. YuvalCode הוא מוסד למידה, לא רק פלטפורמת תוכן.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                            <Link
                                to="/courses/claude-101"
                                className="w-full sm:w-auto"
                            >
                                <Button
                                    size="xl"
                                    className="w-full sm:w-auto bg-white text-black hover:bg-slate-200 gap-3 px-8 text-lg font-medium shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300"
                                >
                                    <BookOpen className="h-5 w-5 fill-current/10" aria-hidden="true" />
                                    התחל ב-Claude 101
                                </Button>
                            </Link>
                        </div>

                        {/* Tertiary cross-links */}
                        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-ink-dim">
                            <Link
                                to="/courses/claude-code"
                                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                            >
                                <Bot className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                                Claude Code
                            </Link>
                            <Link
                                to="/exams"
                                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                            >
                                <Layers className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                                MAT Systems
                            </Link>
                            <span className="inline-flex items-center gap-2 text-slate-500">
                                <span>שאלות על מסלולי הלימוד?</span>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors underline decoration-white/10 hover:decoration-white/30 underline-offset-4"
                                >
                                    צור קשר
                                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                                </Link>
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
