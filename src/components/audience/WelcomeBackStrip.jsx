// WelcomeBackStrip — the subtle returning-user welcome.
//
// Renders only for visitors who:
//   - have at least one prior session (visitCount ≥ 1)
//   - returned after the 30-min in-session window
//   - haven't dismissed the strip since their most recent return
//
// The strip is calm by design — premium glass, no emojis, no exclamation
// marks, no countdown timers. A single "המשך מהמקום שעצרת" CTA routes the
// visitor back to their last surface; a quiet × dismisses for this return.

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowLeft, Compass, X } from "lucide-react";
import { trackCta } from "../../lib/analytics";
import {
    useAudienceActions,
    useContinueExploring,
    useShouldShowWelcomeBack,
} from "../../lib/audience";

const EASE = [0.16, 1, 0.3, 1];

export function WelcomeBackStrip({ currentPath = "/" }) {
    const shouldShow = useShouldShowWelcomeBack();
    const continueTo = useContinueExploring(currentPath);
    const { dismissWelcomeBack } = useAudienceActions();
    const reduced = useReducedMotion();
    const [mounted, setMounted] = useState(false);

    // Defer the strip mount by a frame so the first-paint of the page is
    // never delayed by the welcome layer; under reduced-motion, mount instantly.
    useEffect(() => {
        if (!shouldShow) return;
        const t = setTimeout(() => setMounted(true), reduced ? 0 : 80);
        return () => clearTimeout(t);
    }, [shouldShow, reduced]);

    if (!shouldShow) return null;
    if (!mounted) return null;

    const surface = continueTo?.meta;

    return (
        <AnimatePresence>
            <motion.aside
                initial={reduced ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: EASE }}
                role="status"
                aria-live="polite"
                className="relative z-10 mx-auto max-w-5xl px-4 mt-2"
            >
                <div className="relative rounded-2xl glass-panel-1 px-4 py-3 sm:px-5 sm:py-3.5 flex items-center justify-between gap-4 overflow-hidden">
                    {/* Calm ambient glow — single primary blob, low opacity */}
                    <div
                        aria-hidden="true"
                        className="absolute -top-12 -right-12 w-40 h-40 bg-primary/10 rounded-full blur-[60px] pointer-events-none"
                    />

                    <div className="flex items-center gap-3 relative z-10 min-w-0">
                        <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 text-primary-300 shrink-0">
                            <Compass className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                            <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-dim mb-0.5">
                                Welcome back
                            </div>
                            <p className="text-[13px] sm:text-sm text-ink leading-snug truncate">
                                {surface ? (
                                    <>
                                        המשך מ-<span className="text-ink font-medium">{surface.label}</span>
                                        <span className="text-ink-dim mx-1.5">·</span>
                                        <span className="text-ink-muted">{surface.body}</span>
                                    </>
                                ) : (
                                    <>טוב לראות אותך שוב — האקוסיסטם המשיך לזוז.</>
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 relative z-10 shrink-0">
                        {surface && (
                            <Link
                                to={surface.id}
                                onClick={() => trackCta({
                                    id: "welcome-back-continue",
                                    surface: currentPath,
                                    destination: surface.id,
                                })}
                                className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-medium text-primary-300 hover:text-white transition-colors"
                            >
                                המשך
                                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
                            </Link>
                        )}
                        <button
                            type="button"
                            onClick={() => {
                                dismissWelcomeBack();
                                trackCta({
                                    id: "welcome-back-dismiss",
                                    surface: currentPath,
                                    destination: "(dismiss)",
                                });
                            }}
                            className="p-1.5 text-ink-dim hover:text-ink hover:bg-white/5 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none"
                            aria-label="סגור הודעת חזרה"
                        >
                            <X className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </motion.aside>
        </AnimatePresence>
    );
}
