import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Youtube, ArrowLeft, Mail, MessagesSquare, Bell } from "lucide-react";
import { Button } from "../ui/Button";
import { SITE, WHATSAPP_LINK } from "../../lib/constants";

export function AIFinalCTA() {
    return (
        <section className="py-24 relative overflow-hidden" aria-labelledby="ai-final-cta-heading">
            {/* Background */}
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10 opacity-60" />
            <div aria-hidden="true" className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />

            <div className="container px-4 mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="glass-panel-2 surface-warm card-ambient bloom-violet rounded-[3rem] p-10 md:p-16 lg:p-20 text-center relative overflow-hidden group"
                >
                    <div className="relative z-10 max-w-2xl mx-auto card-content-layer">
                        <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-5">
                            <Bell className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                            Follow the Build
                        </div>

                        <h2 id="ai-final-cta-heading" className="font-display text-4xl md:text-5xl lg:text-5xl font-black mb-6 text-white tracking-normal leading-[1.05]">
                            עקוב אחרי <span className="text-brand-gradient">המסע</span>.
                        </h2>
                        <p className="text-lg md:text-xl text-ink-muted mb-10 leading-relaxed max-w-2xl mx-auto">
                            מסלול AI חי — סרטון בשבוע על Claude Code, ניסויים עם סוכנים, מערכות ידע, ולמידה של בנייה בעידן AI.
                            הירשם לערוץ והצטרף למסע מבפנים.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                            <a
                                href={SITE.youtubeSubscribeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto"
                            >
                                <Button
                                    size="xl"
                                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700 from-red-600 to-red-600 text-white border-0 shadow-2xl shadow-red-900/30 hover:shadow-red-900/50 gap-3 px-8 text-lg"
                                >
                                    <Youtube className="h-6 w-6 fill-current" aria-hidden="true" />
                                    הירשם לערוץ
                                </Button>
                            </a>

                            <Link to="/contact?subject=newsletter" className="w-full sm:w-auto">
                                <Button
                                    variant="outline"
                                    size="xl"
                                    className="w-full sm:w-auto gap-3 px-8 text-lg border-white/15 hover:border-white/30"
                                >
                                    <Mail className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                                    הצטרף לניוזלטר
                                </Button>
                            </Link>
                        </div>

                        {/* Tertiary follow lines */}
                        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-ink-dim">
                            {WHATSAPP_LINK && (
                                <a
                                    href={WHATSAPP_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-ink-muted hover:text-white transition-colors"
                                >
                                    <MessagesSquare className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                                    הצטרף לקהילה
                                </a>
                            )}
                            <span className="inline-flex items-center gap-2">
                                <span>רוצה לעבוד יחד?</span>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-1 text-ink-muted hover:text-white transition-colors underline decoration-white/20 hover:decoration-white/40 underline-offset-4"
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
