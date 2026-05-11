import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { CollectionIcon } from "./icons";
import { FeedSubscribeLink } from "../distribution/FeedSubscribeLink";

const EASE = [0.16, 1, 0.3, 1];

/**
 * CollectionHero — the headline block for a collection landing page
 * (e.g. /content/articles, /content/changelog).
 *
 * Calmer than the route heroes on /ai or /projects: this is a publication
 * masthead, not a marketing hero. No floating keywords, no terminal panel,
 * no spotlight. The editorial tone IS the hero.
 *
 * Props:
 *   config — EditorialCollection config
 *   total  — number of entries currently in this collection
 */
export function CollectionHero({ config, total }) {
    const reduced = useReducedMotion();
    if (!config) return null;

    return (
        <section
            className="relative overflow-hidden border-b border-white/[0.06]"
            aria-labelledby="collection-hero-heading"
        >
            {/* Atmosphere — soft, never overpowering */}
            <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute -top-32 start-1/4 w-[520px] h-[520px] rounded-full blur-[160px] mix-blend-screen opacity-50"
                    style={{ background: `rgba(${config.accent},0.18)` }}
                />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.04]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60" />
            </div>

            <div className="container mx-auto px-4 relative z-10 py-16 sm:py-20 lg:py-24">
                <div className="max-w-2xl mx-auto">
                    {/* Breadcrumb back to /content */}
                    <motion.div
                        initial={reduced ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="mb-7"
                    >
                        <Link
                            to="/content"
                            className="inline-flex items-center gap-1.5 text-[11.5px] font-mono uppercase tracking-[0.22em] text-ink-dim hover:text-ink-muted transition-colors"
                        >
                            <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                            Content
                        </Link>
                    </motion.div>

                    {/* Eyebrow — collection identity */}
                    <motion.div
                        initial={reduced ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
                        className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-panel-1 mb-7"
                    >
                        <CollectionIcon
                            name={config.iconName}
                            className="h-3.5 w-3.5"
                            style={{ color: `rgb(${config.accent})` }}
                        />
                        <span
                            dir="ltr"
                            className="text-[11px] sm:text-[11.5px] font-mono uppercase tracking-[0.22em] text-ink-muted"
                        >
                            {config.eyebrow}
                            <span className="text-ink-dim mx-1.5">·</span>
                            {config.labelEn}
                            {typeof total === "number" && (
                                <>
                                    <span className="text-ink-dim mx-1.5">·</span>
                                    {total} {total === 1 ? "entry" : "entries"}
                                </>
                            )}
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        id="collection-hero-heading"
                        initial={reduced ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                        className="font-display text-4xl sm:text-5xl lg:text-5xl font-black tracking-normal leading-[1.05] text-ink mb-5"
                    >
                        {config.labelHe}
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p
                        initial={reduced ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
                        className="text-lg sm:text-xl text-ink-muted leading-relaxed max-w-2xl"
                    >
                        {config.tagline}
                    </motion.p>

                    {/* Quiet subscribe affordance — for the readers who care */}
                    <motion.div
                        initial={reduced ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.28, ease: EASE }}
                        className="mt-7"
                    >
                        <FeedSubscribeLink
                            path={`/content/${config.slug}`}
                            label={`Subscribe · ${config.labelEn}`}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
