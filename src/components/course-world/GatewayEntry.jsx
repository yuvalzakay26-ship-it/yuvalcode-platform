import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Institutional handoff — the quiet seam between the course page and the first lesson.
// Not a marketing CTA; a calm, intentional opening of the learning itself.
export function GatewayEntry({
    targetUrl,
    identity,
    ctaText = "התחל את הקורס",
    eyebrow = "פתיחה למסלול",
    heading = "מתחילים את השיעור הראשון.",
    body = "כאן נגמרת הסקירה ומתחיל הלימוד עצמו. השיעור הראשון נבנה רגוע במכוון — קודם נסתכל על Claude מלמעלה, בלי להתקין דבר. שום קצב לא ייכפה עליך, ואפשר תמיד לחזור אחורה.",
    transitionText = "פותחים את השיעור הראשון...",
}) {
    const [isInitializing, setIsInitializing] = useState(false);
    const navigate = useNavigate();

    const handleEntry = () => {
        setIsInitializing(true);
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            if (targetUrl.startsWith('/')) {
                navigate(targetUrl);
                setIsInitializing(false);
            } else {
                window.location.href = targetUrl;
            }
            setTimeout(() => { document.body.style.overflow = ''; }, 500);
        }, 900);
    };

    return (
        <>
            <section
                id="gateway-entry"
                className="relative py-48 px-6 flex flex-col items-center justify-center text-center border-t border-white/5 bg-gradient-to-t from-black via-background to-background"
            >
                <div className={`mb-10 w-px h-16 bg-gradient-to-b from-transparent to-${identity.borderAccent.replace('border-', '')} opacity-50`} />

                <div className={`mb-6 text-[11px] tracking-[0.22em] uppercase ${identity.textAccent}`}>
                    {eyebrow}
                </div>

                <h2 className="text-3xl md:text-4xl font-medium text-white mb-6 max-w-2xl leading-tight">
                    {heading}
                </h2>

                <p className="text-white/55 max-w-xl mb-14 leading-[2.0] text-[15.5px] md:text-[16.5px]">
                    {body}
                </p>

                <button
                    onClick={handleEntry}
                    className={`px-14 py-6 rounded bg-transparent border border-white/20 hover:bg-white/[0.03] transition-all duration-500 text-white font-medium tracking-[0.15em] uppercase text-sm ${identity.borderAccentHover}`}
                >
                    {ctaText}
                </button>
            </section>

            <AnimatePresence>
                {isInitializing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
                    >
                        <div className="flex flex-col items-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className={`w-16 h-16 border-t-2 border-r-2 rounded-full mb-10 border-white/20`}
                                style={{ borderTopColor: 'currentColor', color: 'var(--tw-colors-indigo-400)' }}
                            >
                                <div className={`w-full h-full rounded-full border-t-2 border-transparent ${identity.borderAccent}`} />
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className={`text-sm tracking-[0.18em] ${identity.textAccent}`}
                            >
                                {transitionText}
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
