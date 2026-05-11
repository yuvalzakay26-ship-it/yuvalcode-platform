import { Search, Command } from "lucide-react";
import { useSearch } from "../../lib/search/SearchContext";
import { cn } from "../../lib/utils";

/**
 * SearchTrigger — minimal Navbar entry point.
 *
 * Renders as a discoverable affordance ("Search · ⌘K") that doubles as a
 * keyboard hint. The keyboard listener lives in SearchProvider, so this
 * button is purely a click affordance + a visible cue that the shortcut exists.
 */
export function SearchTrigger({ scrolled = false }) {
    const { open, platform } = useSearch();

    return (
        <button
            type="button"
            onClick={() => open("trigger")}
            aria-label="פתח חיפוש (Ctrl+K)"
            className={cn(
                "group relative inline-flex items-center gap-2 rounded-full font-medium text-ink-muted hover:text-ink transition-all duration-300 border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                scrolled ? "px-3 py-1.5 text-[12px]" : "px-3.5 py-1.5 text-[12px]"
            )}
        >
            <Search className="h-3.5 w-3.5 text-ink-muted group-hover:text-ink transition-colors" strokeWidth={1.75} aria-hidden="true" />
            <span className="hidden lg:inline tracking-wide">חיפוש</span>
            <span className="hidden lg:flex items-center gap-1 ms-1 text-ink-dim">
                <kbd className="px-1 py-0 rounded border border-white/10 bg-white/[0.04] text-[10px] font-mono">
                    {platform === "mac" ? <Command className="h-2.5 w-2.5 inline" aria-hidden="true" /> : "Ctrl"}
                </kbd>
                <kbd className="px-1 py-0 rounded border border-white/10 bg-white/[0.04] text-[10px] font-mono">K</kbd>
            </span>
        </button>
    );
}
