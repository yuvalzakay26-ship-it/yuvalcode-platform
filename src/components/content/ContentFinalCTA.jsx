import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Youtube,
    ArrowLeft,
    Mail,
    MessagesSquare,
    Compass,
    Bot,
    Layers,
} from "lucide-react";
import { Button } from "../ui/Button";
import { SITE, WHATSAPP_LINK } from "../../lib/constants";

export function ContentFinalCTA() {
    return (
        <section
            className="py-24 relative overflow-hidden"
            aria-labelledby="content-final-cta-heading"
        >
            {/* Background */}
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10 opacity-60" />
            <div aria-hidden="true" className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />

            <div className="container px-4 mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="glass-panel-2 rounded-[3rem] p-10 md:p-16 lg:p-20 text-center relative overflow-hidden group"
                >
                    {/* Blobs */}
                    <div aria-hidden="true" className="absolute -top-24 -right-24 w-72 h-72 bg-primary/20 rounded-full blur-[90px] group-hover:bg-primary/30 transition-colors duration-1000" />
                    <div aria-hidden="true" className="absolute -bottom-24 -left-24 w-72 h-72 bg-accent/15 rounded-full blur-[90px] group-hover:bg-accent/25 transition-colors duration-1000" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-5">
                            <Compass className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                            Follow the Ecosystem
                        </div>

                        <h2 id="content-final-cta-heading" className="font-display text-4xl md:text-5xl lg:text-5xl font-black mb-6 text-white tracking-normal leading-[1.05]">
                            הצטרף <span className="text-brand-gradient">לאקוסיסטם</span>.
                        </h2>
                        <p className="text-lg md:text-xl text-ink-muted mb-10 leading-relaxed max-w-2xl mx-auto">
                            הפלטפורמה לא נסגרת — היא מתפתחת. סרטון בשבוע, מערכת בחודש, ו-pillar חדש כל רבעון.
                            הירשם לערוץ והצטרף לבנייה שמתרחבת מבפנים.
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

                        {/* Tertiary cross-links */}
                        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-ink-dim">
                            <Link
                                to="/ai"
                                className="inline-flex items-center gap-1.5 text-ink-muted hover:text-white transition-colors"
                            >
                                <Bot className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                                גלה את מסלול AI
                            </Link>
                            <Link
                                to="/projects"
                                className="inline-flex items-center gap-1.5 text-ink-muted hover:text-white transition-colors"
                            >
                                <Layers className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                                ראה מערכות חיות
                            </Link>
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
                                <span>רוצים לבנות יחד?</span>
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
