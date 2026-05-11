import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { summarizeCollections } from "../../lib/editorial/queries";
import { CollectionIcon } from "../editorial/icons";
import { trackCta } from "../../lib/analytics";

const EASE = [0.16, 1, 0.3, 1];

/**
 * EditorialCollectionsRail — the "publication map" rail on /content.
 *
 * Surfaces the six editorial collections (Articles · AI Experiments ·
 * Workflows · Case Studies · Changelog · Research Notes), each with its
 * eyebrow, headline count, and latest 2–3 entries. Visually consistent
 * with PillarExplorer — same grid rhythm, same glass tier, same hover.
 *
 * Renders even when collections are empty: an empty collection card still
 * shows the eyebrow + tagline + "פרסומים ראשונים בקרוב" affordance, so the
 * publication map is always legible.
 */
export function EditorialCollectionsRail() {
    const reduced = useReducedMotion();
    const summary = summarizeCollections({ perCollection: 2 });

    return (
        <section
            id="editorial-collections-rail"
            className="container mx-auto px-4 py-20 lg:py-24"
            aria-labelledby="editorial-collections-heading"
        >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={reduced ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="text-center max-w-2xl mx-auto mb-14"
                >
                    <p
                        dir="ltr"
                        className="text-[11px] sm:text-[11.5px] font-mono uppercase tracking-[0.22em] text-ink-dim mb-4"
                    >
                        Editorial System <span className="text-ink-dim/60 mx-1">·</span> 6 collections
                        <span className="text-ink-dim/60 mx-1">·</span> live
                    </p>
                    <h2
                        id="editorial-collections-heading"
                        className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-normal leading-[1.1] mb-4"
                    >
                        מפת ה<span className="text-brand-gradient">פרסום</span>.
                    </h2>
                    <p className="text-ink-muted text-base sm:text-lg leading-relaxed">
                        שש קולקציות. אקוסיסטם אחד. כל פרסום מתויג, מקושר, וניתן לחיפוש בכל הפלטפורמה.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {summary.map(({ config, entries, total }, i) => (
                        <CollectionTile
                            key={config.slug}
                            config={config}
                            entries={entries}
                            total={total}
                            index={i}
                            reduced={reduced}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function CollectionTile({ config, entries, total, index, reduced }) {
    const href = `/content/${config.slug}`;

    return (
        <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.3), ease: EASE }}
        >
            <Link
                to={href}
                onClick={() =>
                    trackCta({
                        id: `editorial-collection-${config.slug}`,
                        surface: "editorial-collections-rail",
                        destination: href,
                    })
                }
                className="group relative block rounded-2xl glass-panel-2 p-6 h-full overflow-hidden transition-all duration-500 ease-premium hover:-translate-y-1"
            >
                {/* Soft accent glow on hover */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-20 end-[-30%] w-56 h-56 rounded-full blur-[80px] opacity-0 group-hover:opacity-50 transition-opacity duration-700"
                    style={{ background: `rgba(${config.accent},0.35)` }}
                />

                {/* Header row */}
                <div className="relative flex items-start justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                        <span
                            className="h-11 w-11 rounded-xl glass-panel-1 flex items-center justify-center"
                            style={{ borderColor: config.accentBorder }}
                        >
                            <CollectionIcon
                                name={config.iconName}
                                className="h-5 w-5"
                                style={{ color: `rgb(${config.accent})` }}
                            />
                        </span>
                        <div className="flex flex-col">
                            <span
                                dir="ltr"
                                className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-dim"
                            >
                                {config.eyebrow}
                            </span>
                            <span
                                dir="ltr"
                                className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-muted"
                            >
                                {config.labelEn}
                            </span>
                        </div>
                    </div>
                    <span
                        dir="ltr"
                        className="shrink-0 text-[10px] font-mono uppercase tracking-[0.22em] text-ink-dim"
                    >
                        {total} {total === 1 ? "entry" : "entries"}
                    </span>
                </div>

                {/* Title */}
                <h3 className="relative font-display font-bold text-ink text-xl sm:text-[22px] leading-snug mb-2 group-hover:text-white transition-colors">
                    {config.labelHe}
                </h3>
                <p className="relative text-ink-muted text-sm sm:text-[15px] leading-relaxed mb-5 line-clamp-2">
                    {config.tagline}
                </p>

                {/* Latest entries — minimal preview */}
                {entries.length > 0 ? (
                    <ul className="relative flex flex-col gap-2 mb-5">
                        {entries.slice(0, 2).map((e) => (
                            <li
                                key={e.id}
                                className="flex items-baseline gap-2 text-[13.5px] text-ink-muted leading-snug"
                            >
                                <span
                                    aria-hidden="true"
                                    className="shrink-0 h-1 w-1 rounded-full"
                                    style={{ background: `rgba(${config.accent},0.7)` }}
                                />
                                <span className="line-clamp-1 group-hover:text-ink transition-colors">
                                    {e.title}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p
                        dir="ltr"
                        className="relative text-[11.5px] font-mono uppercase tracking-[0.22em] text-ink-dim mb-5"
                    >
                        First entries shipping soon
                    </p>
                )}

                {/* Footer */}
                <div className="relative flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <span
                        dir="ltr"
                        className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-dim"
                    >
                        {config.labelEn} →
                    </span>
                    <ArrowLeft
                        className="h-4 w-4 text-ink-dim group-hover:text-ink group-hover:-translate-x-1 transition-all"
                        strokeWidth={2}
                        aria-hidden="true"
                    />
                </div>
            </Link>
        </motion.div>
    );
}
