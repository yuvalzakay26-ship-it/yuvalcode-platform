import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, Clock, Tag } from "lucide-react";
import { EditorialEyebrow } from "./EditorialEyebrow";
import { resolveReadingMinutes } from "../../lib/editorial/reading-time";
import { getPillar } from "../../lib/content/pillars";
import { TAGS } from "../../lib/content/taxonomy";

const EASE = [0.16, 1, 0.3, 1];

/**
 * EditorialHero — the masthead block on a single entry page.
 *
 * Quiet by design. The article IS the surface; the hero just frames it.
 * No floating keywords, no terminal panel, no spotlight, no CTA buttons.
 * Title leads, supporting metadata follows.
 */
export function EditorialHero({ entry, config, bodyText }) {
    const reduced = useReducedMotion();
    if (!entry || !config) return null;

    const pillar = entry.pillar ? getPillar(entry.pillar) : null;
    const minutes = resolveReadingMinutes(entry, bodyText);

    return (
        <section
            className="relative overflow-hidden border-b border-white/[0.06]"
            aria-labelledby="editorial-hero-heading"
        >
            {/* Atmosphere — single soft blob in the collection's accent */}
            <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute -top-24 start-1/3 w-[480px] h-[480px] rounded-full blur-[180px] mix-blend-screen opacity-40"
                    style={{ background: `rgba(${config.accent},0.20)` }}
                />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.04]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60" />
            </div>

            <div className="container mx-auto px-4 relative z-10 py-14 sm:py-18 lg:py-22">
                <div className="max-w-2xl mx-auto">
                    {/* Breadcrumb */}
                    <motion.div
                        initial={reduced ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="mb-6 flex items-center gap-2 text-[11.5px] font-mono uppercase tracking-[0.22em] text-ink-dim"
                    >
                        <Link to="/content" className="hover:text-ink-muted transition-colors flex items-center gap-1.5">
                            <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                            Content
                        </Link>
                        <span aria-hidden="true">/</span>
                        <Link
                            to={`/content/${config.slug}`}
                            className="hover:text-ink-muted transition-colors"
                        >
                            {config.labelEn}
                        </Link>
                    </motion.div>

                    {/* Eyebrow */}
                    <motion.div
                        initial={reduced ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
                        className="mb-6"
                    >
                        <EditorialEyebrow
                            config={config}
                            suffix={entry.date || undefined}
                        />
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        id="editorial-hero-heading"
                        initial={reduced ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                        className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-normal leading-[1.08] text-ink mb-5"
                    >
                        {entry.title}
                    </motion.h1>

                    {/* Summary / dek */}
                    <motion.p
                        initial={reduced ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
                        className="text-lg sm:text-xl text-ink-muted leading-relaxed max-w-2xl mb-8"
                    >
                        {entry.summary}
                    </motion.p>

                    {/* Meta strip */}
                    <motion.div
                        initial={reduced ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
                        className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-mono uppercase tracking-[0.22em] text-ink-dim"
                        dir="ltr"
                    >
                        <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                            {minutes} min read
                        </span>
                        {pillar && (
                            <>
                                <span aria-hidden="true">·</span>
                                <span>Pillar: <span className="text-ink-muted">{pillar.eyebrow}</span></span>
                            </>
                        )}
                        {Array.isArray(entry.tags) && entry.tags.length > 0 && (
                            <>
                                <span aria-hidden="true">·</span>
                                <span className="inline-flex items-center gap-1.5 flex-wrap">
                                    <Tag className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                                    {entry.tags.slice(0, 4).map((t) => (
                                        <span key={t} className="text-ink-muted">
                                            {TAGS[t]?.label || t}
                                        </span>
                                    ))}
                                </span>
                            </>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
