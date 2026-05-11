import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronUp } from "lucide-react";
import { getCollectionConfigByType } from "../../lib/editorial/collections-config";
import { CollectionIcon } from "./icons";

/**
 * EcosystemNav — prev/next within the same collection + a one-click
 * return to the collection landing page. Closes the long-form reading
 * experience with a sense of place ("you're in this publication; here's
 * what's around it") instead of dropping the visitor at a dead end.
 */
export function EcosystemNav({ entry, prev, next }) {
    const config = entry ? getCollectionConfigByType(entry.type) : null;
    if (!config) return null;

    return (
        <nav
            aria-label="Editorial navigation"
            className="container mx-auto px-4 pb-16 sm:pb-20"
        >
            <div className="max-w-5xl mx-auto">
                {/* Up — back to collection */}
                <Link
                    to={`/content/${config.slug}`}
                    className="group inline-flex items-center gap-2 mb-6 text-[11.5px] font-mono uppercase tracking-[0.22em] text-ink-muted hover:text-ink transition-colors"
                >
                    <ChevronUp className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                    כל ה-<span dir="ltr">{config.labelEn}</span>
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {/* Prev (RTL: visually right) */}
                    {prev ? (
                        <Link
                            to={`/content/${config.slug}/${prev.slug}`}
                            className="group rounded-2xl glass-panel-2 p-5 sm:p-6 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            <span
                                dir="ltr"
                                className="inline-flex items-center gap-1.5 text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-dim mb-2"
                            >
                                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} aria-hidden="true" />
                                Previous
                            </span>
                            <p className="font-display font-semibold text-ink text-lg leading-snug mb-1.5">
                                {prev.title}
                            </p>
                            <p className="text-ink-muted text-sm leading-relaxed line-clamp-2">
                                {prev.summary}
                            </p>
                        </Link>
                    ) : (
                        <PlaceholderTile config={config} side="prev" />
                    )}

                    {/* Next (RTL: visually left) */}
                    {next ? (
                        <Link
                            to={`/content/${config.slug}/${next.slug}`}
                            className="group rounded-2xl glass-panel-2 p-5 sm:p-6 hover:-translate-y-0.5 transition-all duration-300 md:text-end"
                        >
                            <span
                                dir="ltr"
                                className="inline-flex items-center gap-1.5 text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-dim mb-2"
                            >
                                Next
                                <ArrowLeft className="h-3 w-3 group-hover:-translate-x-0.5 transition-transform" strokeWidth={2} aria-hidden="true" />
                            </span>
                            <p className="font-display font-semibold text-ink text-lg leading-snug mb-1.5">
                                {next.title}
                            </p>
                            <p className="text-ink-muted text-sm leading-relaxed line-clamp-2">
                                {next.summary}
                            </p>
                        </Link>
                    ) : (
                        <PlaceholderTile config={config} side="next" />
                    )}
                </div>
            </div>
        </nav>
    );
}

function PlaceholderTile({ config, side }) {
    return (
        <Link
            to={`/content/${config.slug}`}
            className="group rounded-2xl glass-panel-1 p-5 sm:p-6 hover:bg-white/[0.04] transition-all duration-300 flex items-center justify-between"
        >
            <div className={side === "next" ? "md:text-end md:ms-auto" : ""}>
                <span
                    dir="ltr"
                    className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-dim block mb-2"
                >
                    {side === "next" ? "Soon" : "End of feed"}
                </span>
                <p className="font-display font-semibold text-ink-muted text-base leading-snug">
                    גלה עוד מ-<span dir="ltr">{config.labelEn}</span>
                </p>
            </div>
            <CollectionIcon
                name={config.iconName}
                className="h-5 w-5 text-ink-dim shrink-0 group-hover:text-ink-muted transition-colors"
                style={{ color: `rgb(${config.accent})` }}
            />
        </Link>
    );
}
