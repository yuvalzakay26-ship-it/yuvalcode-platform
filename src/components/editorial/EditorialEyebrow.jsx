import { cn } from "../../lib/utils";
import { CollectionIcon } from "./icons";

/**
 * EditorialEyebrow — the small header chip identifying a piece of
 * editorial content's collection + status. Appears above titles in
 * collection grids and entry hero blocks.
 *
 * Props:
 *   config — EditorialCollection config (slug, labelEn, accent, iconName)
 *   suffix — optional trailing detail (date, status, etc.)
 *   compact — render small (used in tight cards)
 */
export function EditorialEyebrow({ config, suffix, compact = false, className }) {
    if (!config) return null;

    return (
        <div
            dir="ltr"
            className={cn(
                "inline-flex items-center gap-2 rounded-full glass-panel-1",
                compact ? "px-2.5 py-1" : "px-3 py-1.5",
                className
            )}
        >
            <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: `rgba(${config.accent},0.95)`, boxShadow: `0 0 10px rgba(${config.accent},0.7)` }}
                aria-hidden="true"
            />
            <CollectionIcon
                name={config.iconName}
                className={cn(compact ? "h-3 w-3" : "h-3.5 w-3.5")}
                style={{ color: `rgb(${config.accent})` }}
            />
            <span
                className={cn(
                    "font-mono uppercase tracking-[0.22em] text-ink-muted",
                    compact ? "text-[10px]" : "text-[10.5px]"
                )}
            >
                {config.eyebrow} <span className="text-ink-dim/70 mx-1">·</span> {config.labelEn}
                {suffix && (
                    <>
                        <span className="text-ink-dim/70 mx-1.5">·</span>
                        <span className="text-ink-dim">{suffix}</span>
                    </>
                )}
            </span>
        </div>
    );
}
