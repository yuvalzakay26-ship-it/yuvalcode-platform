// WhereShouldIStart — the calm, premium onboarding entry pathway.
//
// Renders ONLY for first-time visitors who haven't selected an entry path
// or dismissed the onboarding affordance. Four entry paths cover the
// dominant audience archetypes:
//   - ai-first         → /ai
//   - programming-first → /exams
//   - creator-first    → /content
//   - build-first      → /projects
//
// Selecting an option records the preference (so the home re-renders without
// the prompt next time) AND routes the visitor to the chosen surface. A
// quiet "אעיין לבד" dismisses without setting a preference.

import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
    Bot,
    Code2,
    Compass,
    Hammer,
    SparklesIcon,
    X,
} from "lucide-react";
import {
    useAudienceActions,
    useShouldShowOnboarding,
} from "../../lib/audience";
import { trackCta } from "../../lib/analytics";

const EASE = [0.16, 1, 0.3, 1];

const PATHS = Object.freeze([
    {
        id: "ai-first",
        eyebrow: "AI-first",
        title: "תכניס אותי ל-AI",
        body: "Claude Code · Agents · בנייה עם AI · workflows יומיים.",
        icon: Bot,
        rgb: "236, 72, 153",
        destination: "/ai",
    },
    {
        id: "programming-first",
        eyebrow: "Programming-first",
        title: "אני רוצה ללמוד תכנות",
        body: "C# · אלגוריתמים · מבני נתונים · פתרונות וידאו לכל מבחן מה״ט.",
        icon: Code2,
        rgb: "129, 140, 248",
        destination: "/exams",
    },
    {
        id: "creator-first",
        eyebrow: "Creator-first",
        title: "תראה לי את האקוסיסטם",
        body: "מרכז התוכן · שמונה עמודים · חמישה מסלולי לימוד.",
        icon: Compass,
        rgb: "168, 85, 247",
        destination: "/content",
    },
    {
        id: "build-first",
        eyebrow: "Build-first",
        title: "אני רוצה לראות מה אתה בונה",
        body: "מערכות חיות · ארכיטקטורה · Build in Public.",
        icon: Hammer,
        rgb: "192, 132, 252",
        destination: "/projects",
    },
]);

export function WhereShouldIStart({ surfaceId = "/" }) {
    const shouldShow = useShouldShowOnboarding();
    const { setEntryPath, dismissOnboarding } = useAudienceActions();
    const navigate = useNavigate();
    const reduced = useReducedMotion();

    if (!shouldShow) return null;

    const handleSelect = (path) => {
        setEntryPath(path.id);
        trackCta({
            id: `onboarding-${path.id}`,
            surface: surfaceId,
            destination: path.destination,
        });
        navigate(path.destination);
    };

    const handleDismiss = () => {
        dismissOnboarding();
        trackCta({
            id: "onboarding-dismiss",
            surface: surfaceId,
            destination: "(dismiss)",
        });
    };

    return (
        <section
            aria-labelledby="onboarding-heading"
            className="py-16 sm:py-20 lg:py-24 relative z-10"
        >
            <div className="container px-4 mx-auto">
                <motion.div
                    initial={reduced ? false : { opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="relative rounded-[2rem] glass-panel-2 p-7 sm:p-10 overflow-hidden"
                >
                    {/* Atmospheric blob — calm, single accent */}
                    <div
                        aria-hidden="true"
                        className="absolute -top-32 -left-32 w-[440px] h-[440px] bg-primary/15 rounded-full blur-[120px] pointer-events-none"
                    />
                    <div
                        aria-hidden="true"
                        className="absolute -bottom-32 -right-32 w-[380px] h-[380px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"
                    />

                    {/* Quiet dismiss — top-end (RTL: top-left) */}
                    <button
                        type="button"
                        onClick={handleDismiss}
                        className="absolute top-4 left-4 p-1.5 text-ink-dim hover:text-ink hover:bg-white/5 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none z-20"
                        aria-label="סגור הצעת התחלה"
                    >
                        <X className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                    </button>

                    <div className="relative z-10">
                        <div className="flex flex-col items-start gap-3 mb-8 max-w-2xl">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-1 text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-muted">
                                <SparklesIcon className="h-3 w-3 text-primary-300" strokeWidth={2} aria-hidden="true" />
                                Where to start
                            </span>
                            <h2
                                id="onboarding-heading"
                                className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-normal text-ink leading-snug"
                            >
                                מאיפה <span className="text-brand-gradient">להיכנס</span> לאקוסיסטם?
                            </h2>
                            <p className="text-sm sm:text-[15px] text-ink-muted leading-relaxed">
                                בחר מסלול אחד — נזכור את הבחירה ונסדר את האתר סביבה. תוכל לשנות בכל זמן.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {PATHS.map((path, i) => {
                                const Icon = path.icon;
                                return (
                                    <motion.button
                                        key={path.id}
                                        type="button"
                                        onClick={() => handleSelect(path)}
                                        initial={reduced ? false : { opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                                        className="group relative text-right rounded-2xl glass-panel-1 p-5 sm:p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                        style={{ "--rgb": path.rgb }}
                                    >
                                        <div
                                            aria-hidden="true"
                                            className="absolute -top-16 -left-16 w-44 h-44 rounded-full opacity-25 group-hover:opacity-60 transition-opacity duration-700 blur-[64px] pointer-events-none"
                                            style={{ background: `rgb(var(--rgb) / 0.4)` }}
                                        />

                                        <div className="relative z-10 flex flex-col gap-3.5">
                                            <div className="flex items-center justify-between">
                                                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/10">
                                                    <Icon
                                                        className="h-4.5 w-4.5"
                                                        style={{ color: `rgb(var(--rgb))` }}
                                                        strokeWidth={1.75}
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <span
                                                    dir="ltr"
                                                    className="text-[10px] font-mono uppercase tracking-[0.2em] text-ink-dim"
                                                >
                                                    {path.eyebrow}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="text-base sm:text-lg font-bold text-ink leading-snug mb-1.5 group-hover:text-primary-200 transition-colors">
                                                    {path.title}
                                                </h3>
                                                <p className="text-[13px] sm:text-sm text-ink-muted leading-relaxed">
                                                    {path.body}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>

                        <div className="mt-6 text-[11px] text-ink-dim">
                            לא רוצה לבחור?{" "}
                            <button
                                type="button"
                                onClick={handleDismiss}
                                className="underline underline-offset-2 hover:text-ink transition-colors focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none rounded-sm"
                            >
                                אעיין לבד
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
