// FollowTheJourney — creator-following infrastructure.
//
// Surfaces the most-recent changelog entries + a "follow the journey" affordance
// that toggles a local flag (followsCreator). When `followsCreator` is on, the
// `EcosystemSinceLastVisit` rail can show items that have shipped since the
// visitor's previous session — turning a passive return-visit into a "what's
// new for me" moment.
//
// This is NOT a notifications system. The platform never pushes anything. The
// flag is purely a hint to the resurfacing logic, persisted locally, dismissable
// with one click.

import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowLeft,
    BellRing,
    Check,
    GitCommit,
    Radio,
} from "lucide-react";
import { useAudience, useAudienceActions } from "../../lib/audience";
import { trackCta } from "../../lib/analytics";
import { getCollection } from "../../lib/content";

const EASE = [0.16, 1, 0.3, 1];

function formatDate(iso) {
    if (!iso) return null;
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleDateString("he-IL", { day: "numeric", month: "short", year: "numeric" });
}

export function FollowTheJourney({ surfaceId = "/", className = "" }) {
    const memory = useAudience();
    const { setFollowing } = useAudienceActions();
    const reduced = useReducedMotion();

    const recent = useMemo(() => {
        const collection = getCollection("changelogs");
        if (!collection || !Array.isArray(collection.entries)) return [];
        return [...collection.entries]
            .filter((e) => e.status === "live")
            .sort((a, b) => {
                if (!a.date) return 1;
                if (!b.date) return -1;
                return b.date.localeCompare(a.date);
            })
            .slice(0, 3);
    }, []);

    const isFollowing = !!memory.preferences?.followsCreator;

    if (recent.length === 0) return null;

    const handleToggle = () => {
        const next = !isFollowing;
        setFollowing(next);
        trackCta({
            id: next ? "follow-journey-on" : "follow-journey-off",
            surface: surfaceId,
            destination: "(toggle)",
        });
    };

    return (
        <section
            aria-labelledby="follow-journey-heading"
            className={`py-20 lg:py-24 relative z-10 ${className}`}
        >
            <div className="container px-4 mx-auto">
                <motion.div
                    initial={reduced ? false : { opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="relative rounded-[2rem] glass-panel-2 p-7 sm:p-10 lg:p-12 overflow-hidden"
                >
                    <div
                        aria-hidden="true"
                        className="absolute -top-32 -right-32 w-[440px] h-[440px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"
                    />
                    <div
                        aria-hidden="true"
                        className="absolute -bottom-24 -left-24 w-[320px] h-[320px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"
                    />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                        {/* Header column */}
                        <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-1 text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-muted mb-5">
                                <Radio className="h-3 w-3 text-primary-300" strokeWidth={2} aria-hidden="true" />
                                Currently Building
                            </span>
                            <h2
                                id="follow-journey-heading"
                                className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-normal text-ink leading-snug mb-4"
                            >
                                עקוב אחרי <span className="text-brand-gradient">המסע</span>.
                            </h2>
                            <p className="text-sm sm:text-[15px] text-ink-muted leading-relaxed mb-6">
                                האקוסיסטם ממשיך לזוז גם כשאתה לא כאן. Changelog חי, פייסים מתועדים, ושיפורים שעולים שבוע-שבוע.
                            </p>

                            <button
                                type="button"
                                onClick={handleToggle}
                                className={`group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none ${
                                    isFollowing
                                        ? "bg-primary/10 text-primary-200 border border-primary/30 hover:bg-primary/15"
                                        : "glass-panel-1 text-ink-muted hover:text-ink hover:border-white/20"
                                }`}
                                aria-pressed={isFollowing}
                            >
                                {isFollowing ? (
                                    <>
                                        <Check className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                                        <span>עוקב אחרי המסע</span>
                                    </>
                                ) : (
                                    <>
                                        <BellRing className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                                        <span>סמן אותי כעוקב</span>
                                    </>
                                )}
                            </button>
                            <p className="mt-3 text-[11px] text-ink-dim leading-relaxed">
                                שמור מקומית. אין הודעות, אין דיוור — רק שכבה דקה ש&quot;יודעת&quot; שאתה מתעניין כשאתה חוזר לפלטפורמה.
                            </p>
                        </div>

                        {/* Changelog rail */}
                        <ol className="lg:col-span-7 relative space-y-5">
                            {/* Vertical hairline rail */}
                            <div
                                aria-hidden="true"
                                className="absolute right-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-white/15 via-white/5 to-transparent"
                            />

                            {recent.map((item, i) => {
                                const date = formatDate(item.date);
                                return (
                                    <motion.li
                                        key={item.id}
                                        initial={reduced ? false : { opacity: 0, x: 16 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-40px" }}
                                        transition={{ delay: i * 0.06, duration: 0.5, ease: EASE }}
                                        className="relative pr-12"
                                    >
                                        <div
                                            aria-hidden="true"
                                            className="absolute right-[8px] top-3 w-3.5 h-3.5 rounded-full bg-background border-2 border-primary-400 shadow-[0_0_0_3px_rgba(99,102,241,0.18)]"
                                        />

                                        <Link
                                            to={item.href || `/content/changelog/${item.slug}`}
                                            onClick={() =>
                                                trackCta({
                                                    id: `follow-journey-changelog-${item.id}`,
                                                    surface: surfaceId,
                                                    destination: item.href || `/content/changelog/${item.slug}`,
                                                })
                                            }
                                            className="group block rounded-xl glass-panel-1 p-4 sm:p-5 hover:-translate-y-0.5 transition-all duration-500 hover:border-white/20"
                                        >
                                            <div className="flex items-center gap-3 text-[10.5px] font-mono uppercase tracking-[0.18em] text-ink-dim mb-2">
                                                <span dir="ltr">{item.eyebrow || "Build in Public"}</span>
                                                {date && (
                                                    <>
                                                        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/15" />
                                                        <span>{date}</span>
                                                    </>
                                                )}
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold text-ink leading-snug mb-2 group-hover:text-primary-200 transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-[13px] sm:text-sm text-ink-muted leading-relaxed line-clamp-2 mb-3">
                                                {item.summary}
                                            </p>
                                            <div className="flex items-center justify-between text-[11.5px] text-ink-dim">
                                                <span className="inline-flex items-center gap-1.5">
                                                    <GitCommit className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />
                                                    Changelog · Shipped
                                                </span>
                                                <span className="inline-flex items-center gap-1 text-primary-300 group-hover:text-white transition-colors">
                                                    קרא
                                                    <ArrowLeft className="h-3 w-3" aria-hidden="true" />
                                                </span>
                                            </div>
                                        </Link>
                                    </motion.li>
                                );
                            })}
                        </ol>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
