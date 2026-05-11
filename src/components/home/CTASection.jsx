import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Youtube, ArrowLeft, Bell, Play } from "lucide-react";
import { Button } from "../ui/Button";
import { SITE } from "../../lib/constants";

export function CTASection() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background gradient + grid */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10 opacity-60" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />

            <div className="container px-4 mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="glass-panel-2 surface-warm card-ambient bloom-magenta rounded-[3rem] p-10 md:p-16 lg:p-20 text-center relative overflow-hidden group"
                >
                    <div className="relative z-10 max-w-2xl mx-auto card-content-layer">
                        <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-primary-300 mb-5">
                            <Bell className="h-3.5 w-3.5" strokeWidth={2} />
                            Subscribe
                        </div>

                        <h2 className="font-display text-4xl md:text-5xl lg:text-5xl font-black mb-6 text-white tracking-normal leading-[1.05]">
                            הירשמו <span className="text-brand-gradient">לערוץ</span>.
                        </h2>
                        <p className="text-lg md:text-xl text-ink-muted mb-10 leading-relaxed max-w-2xl mx-auto">
                            אני מעלה סרטונים חדשים באופן קבוע על תכנות, פיתוח מערכות וכלים שאני משתמש בהם. אם התוכן הזה עוזר לכם, אתם מוזמנים להצטרף.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
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
                                    <Youtube className="h-6 w-6 fill-current" />
                                    הירשם לערוץ
                                </Button>
                            </a>
                            <Link to="/exams" className="w-full sm:w-auto">
                                <Button
                                    variant="outline"
                                    size="xl"
                                    className="w-full sm:w-auto gap-3 px-8 text-lg border-white/15 hover:border-white/30"
                                >
                                    <Play className="h-5 w-5 fill-current" />
                                    התחל לצפות
                                </Button>
                            </Link>
                        </div>

                        {/* Tertiary: contact link, demoted */}
                        <div className="flex items-center justify-center gap-2 text-sm text-ink-dim">
                            <span>רוצה לעבוד יחד?</span>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-1 text-ink-muted hover:text-white transition-colors underline decoration-white/20 hover:decoration-white/40 underline-offset-4"
                            >
                                צור קשר
                                <ArrowLeft className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
