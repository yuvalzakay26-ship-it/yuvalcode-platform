import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { cn } from "../../lib/utils";
import { getCollectionConfigByType } from "../../lib/editorial/collections-config";
import { getEntryHref } from "../../lib/editorial/queries";
import { resolveReadingMinutes } from "../../lib/editorial/reading-time";
import { CollectionIcon } from "./icons";
import { trackCta } from "../../lib/analytics";

/**
 * EntryCard — premium tile for a single editorial entry.
 *
 * Used by the editorial hub, collection landing grids, and the related rail.
 * Visually consistent with the existing AI Tracks / Projects card pattern,
 * minus Tilt3D (the editorial grid is denser; subtle hover wins over showy
 * 3D tilt).
 *
 * Props:
 *   entry      — content entry (must have type, slug, title, summary)
 *   compact    — render small (e.g. inside a related rail)
 *   showSource — show the recommendation source label (related / same-pillar)
 */
export function EntryCard({ entry, compact = false, showSource, className }) {
    if (!entry) return null;
    const config = getCollectionConfigByType(entry.type);
    if (!config) return null;
    const href = getEntryHref(entry);
    const minutes = resolveReadingMinutes(entry, "");
    const accent = config.accent;

    const onClick = () => {
        trackCta({
            id: `editorial-entry-${entry.id}`,
            surface: `entry-card${compact ? "-compact" : ""}`,
            destination: href,
        });
    };

    return (
        <Link
            to={href}
            onClick={onClick}
            className={cn(
                "group relative block rounded-2xl glass-panel-2 overflow-hidden",
                "transition-all duration-500 ease-premium",
                "hover:-translate-y-1",
                compact ? "p-5" : "p-6 sm:p-7",
                className
            )}
            style={{
                "--accent-rgb": accent,
            }}
        >
            {/* Soft accent gradient blob — edge-only, never washes the card */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 end-[-30%] w-56 h-56 rounded-full blur-[80px] opacity-0 group-hover:opacity-50 transition-opacity duration-700"
                style={{ background: `rgba(${accent},0.35)` }}
            />

            {/* Top row: icon + collection eyebrow */}
            <div className="relative flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                    <span
                        className="h-9 w-9 rounded-xl glass-panel-1 flex items-center justify-center transition-colors duration-300"
                        style={{ borderColor: config.accentBorder }}
                    >
                        <CollectionIcon
                            name={config.iconName}
                            className="h-4 w-4"
                            style={{ color: `rgb(${accent})` }}
                        />
                    </span>
                    <div className="flex flex-col">
                        <span
                            dir="ltr"
                            className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-dim"
                        >
                            {config.labelEn}
                        </span>
                        {entry.eyebrow && (
                            <span
                                dir="ltr"
                                className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-muted"
                            >
                                {entry.eyebrow}
                            </span>
                        )}
                    </div>
                </div>

                {/* Status / source chip */}
                <div className="flex items-center gap-2">
                    {showSource && (
                        <span
                            dir="ltr"
                            className="text-[9.5px] font-mono uppercase tracking-[0.22em] text-ink-dim/80"
                        >
                            {labelForSource(showSource)}
                        </span>
                    )}
                    {entry.date && (
                        <span
                            dir="ltr"
                            className="text-[10px] font-mono tracking-[0.18em] text-ink-dim"
                        >
                            {entry.date}
                        </span>
                    )}
                </div>
            </div>

            {/* Title */}
            <h3
                className={cn(
                    "relative font-display font-bold text-ink leading-snug transition-colors duration-300 group-hover:text-white",
                    compact ? "text-[17px] mb-2" : "text-xl sm:text-[22px] mb-3"
                )}
            >
                {entry.title}
            </h3>

            {/* Summary */}
            <p
                className={cn(
                    "relative text-ink-muted leading-relaxed mb-5",
                    compact ? "text-[14px] line-clamp-2" : "text-[15px] line-clamp-3"
                )}
            >
                {entry.summary}
            </p>

            {/* Footer: reading time + arrow affordance */}
            <div className="relative flex items-center justify-between">
                <span
                    dir="ltr"
                    className="inline-flex items-center gap-1.5 text-[10.5px] font-mono uppercase tracking-[0.2em] text-ink-dim"
                >
                    <Clock className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                    {minutes} min read
                </span>
                <span
                    className="inline-flex items-center gap-1 text-[11.5px] font-mono uppercase tracking-[0.22em] text-ink-muted group-hover:text-ink transition-colors"
                    style={{ color: undefined }}
                >
                    קרא
                    <ArrowLeft
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1"
                        strokeWidth={2}
                        aria-hidden="true"
                    />
                </span>
            </div>
        </Link>
    );
}

function labelForSource(source) {
    if (source === "related") return "Editorially related";
    if (source === "same-pillar") return "Same pillar";
    if (source === "adjacent-pillar") return "Adjacent pillar";
    return "Continue";
}
