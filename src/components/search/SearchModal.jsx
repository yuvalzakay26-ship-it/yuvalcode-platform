import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, X, ArrowUpRight, CornerDownLeft, Command } from "lucide-react";
import { useSearch } from "../../lib/search/SearchContext";
import { match } from "../../lib/search/match";
import { KIND_LABEL, KIND_ORDER } from "../../lib/search/indexer";
import {
    EVENTS,
    track,
    trackSearchQuery,
    trackSearchSelect,
} from "../../lib/analytics";
import { cn } from "../../lib/utils";

const EASE = [0.16, 1, 0.3, 1];
const MAX_RESULTS = 24;

/**
 * SearchModal — premium, keyboard-first, lazy-loaded.
 *
 * The modal is the only place in the platform that renders the search corpus.
 * It ships behind React.lazy() in App.jsx so the search keyboard shortcut
 * stays cheap when the modal isn't open.
 */
export default function SearchModal() {
    const { isOpen, close, query, setQuery, corpus, platform } = useSearch();
    const reduced = useReducedMotion();
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const listRef = useRef(null);
    const lastFocusedRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const results = useMemo(() => {
        if (!query) return [];
        return match(query, corpus, { limit: MAX_RESULTS });
    }, [query, corpus]);

    const groupedResults = useMemo(() => {
        const groups = new Map();
        for (const r of results) {
            if (!groups.has(r.kind)) groups.set(r.kind, []);
            groups.get(r.kind).push(r);
        }
        return KIND_ORDER
            .filter((kind) => groups.has(kind))
            .map((kind) => ({ kind, items: groups.get(kind) }));
    }, [results]);

    // Flat list mirrors the rendered order for keyboard navigation.
    const flatResults = useMemo(
        () => groupedResults.flatMap((g) => g.items),
        [groupedResults]
    );

    const onQueryChange = useCallback((next) => {
        setQuery(next);
        setActiveIndex(0);
    }, [setQuery]);

    // Track query — debounced via the natural keystroke cadence.
    useEffect(() => {
        if (!query) return;
        const t = setTimeout(() => trackSearchQuery(query, results.length), 350);
        return () => clearTimeout(t);
    }, [query, results.length]);

    // Open lifecycle — focus management, body lock, focus restore.
    useEffect(() => {
        if (!isOpen) return;
        lastFocusedRef.current = document.activeElement;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const t = setTimeout(() => inputRef.current?.focus(), 50);

        return () => {
            clearTimeout(t);
            document.body.style.overflow = previousOverflow;
            const last = lastFocusedRef.current;
            if (last && typeof last.focus === "function") last.focus();
        };
    }, [isOpen]);

    const onSelect = useCallback((entry, position) => {
        if (!entry) return;
        trackSearchSelect({ id: entry.id, kind: entry.kind, position });
        close("select");
        if (entry.external && entry.href) {
            window.open(entry.href, "_blank", "noopener,noreferrer");
            return;
        }
        if (entry.href) {
            if (entry.href.startsWith("http")) window.location.href = entry.href;
            else navigate(entry.href);
        }
    }, [close, navigate]);

    const onKeyDown = useCallback((event) => {
        if (event.key === "Escape") {
            event.preventDefault();
            close("escape");
            return;
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();
            setActiveIndex((prev) =>
                flatResults.length === 0 ? 0 : (prev + 1) % flatResults.length
            );
            return;
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex((prev) =>
                flatResults.length === 0
                    ? 0
                    : (prev - 1 + flatResults.length) % flatResults.length
            );
            return;
        }

        if (event.key === "Enter") {
            event.preventDefault();
            const entry = flatResults[activeIndex];
            if (entry) onSelect(entry, activeIndex);
        }
    }, [activeIndex, close, flatResults, onSelect]);

    if (!isOpen) return <AnimatePresence />; // keep tree mounted for exit animations

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-label="חיפוש באקוסיסטם"
                    className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[10vh] pb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    onKeyDown={onKeyDown}
                >
                    {/* Scrim */}
                    <button
                        type="button"
                        aria-label="סגור חיפוש"
                        tabIndex={-1}
                        onClick={() => close("scrim")}
                        className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-default"
                    />

                    <motion.div
                        className="relative w-full max-w-2xl glass-panel-3 rounded-3xl overflow-hidden shadow-[0_30px_120px_-30px_rgba(99,102,241,0.45)]"
                        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
                        animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                        exit={reduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.28, ease: EASE }}
                    >
                        {/* Input row */}
                        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
                            <Search className="h-5 w-5 text-ink-muted shrink-0" strokeWidth={1.75} aria-hidden="true" />
                            <input
                                ref={inputRef}
                                type="search"
                                value={query}
                                onChange={(e) => onQueryChange(e.target.value)}
                                placeholder="חפש באקוסיסטם · pillars · content · routes"
                                className="flex-1 bg-transparent text-ink placeholder:text-ink-dim outline-none border-none text-[15px] tracking-wide"
                                aria-label="שאילתת חיפוש"
                                aria-controls="search-results"
                                aria-autocomplete="list"
                                spellCheck={false}
                                autoComplete="off"
                            />
                            <div className="hidden sm:flex items-center gap-1.5 shrink-0 text-[10px] font-mono text-ink-dim">
                                <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.04]">
                                    {platform === "mac" ? <Command className="h-3 w-3 inline" aria-hidden="true" /> : "Ctrl"}
                                </kbd>
                                <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.04]">K</kbd>
                            </div>
                            <button
                                type="button"
                                onClick={() => close("close-button")}
                                className="p-1.5 rounded-full text-ink-muted hover:text-ink hover:bg-white/5 transition-colors focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none"
                                aria-label="סגור חיפוש"
                            >
                                <X className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                            </button>
                        </div>

                        {/* Results */}
                        <div
                            id="search-results"
                            ref={listRef}
                            role="listbox"
                            aria-label="תוצאות חיפוש"
                            className="max-h-[60vh] overflow-y-auto"
                        >
                            {!query && (
                                <EmptyHint platform={platform} />
                            )}

                            {query && flatResults.length === 0 && (
                                <NoResults query={query} />
                            )}

                            {query && groupedResults.map((group) => (
                                <ResultGroup
                                    key={group.kind}
                                    kind={group.kind}
                                    items={group.items}
                                    flatStart={flatResults.indexOf(group.items[0])}
                                    activeIndex={activeIndex}
                                    onSelect={onSelect}
                                    onHoverIndex={setActiveIndex}
                                />
                            ))}
                        </div>

                        <SearchFooter />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function ResultGroup({ kind, items, flatStart, activeIndex, onSelect, onHoverIndex }) {
    return (
        <div className="px-2 py-2">
            <div className="px-3 pt-2 pb-1 text-[10px] font-mono uppercase tracking-[0.18em] text-ink-dim">
                {KIND_LABEL[kind] || kind}
            </div>
            {items.map((entry, i) => {
                const flatIndex = flatStart + i;
                const isActive = flatIndex === activeIndex;
                return (
                    <button
                        key={entry.id}
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onMouseEnter={() => onHoverIndex(flatIndex)}
                        onClick={() => onSelect(entry, flatIndex)}
                        className={cn(
                            "w-full flex items-start justify-between gap-3 px-3 py-2.5 rounded-xl text-right transition-colors",
                            isActive
                                ? "bg-white/[0.06] ring-1 ring-white/10"
                                : "hover:bg-white/[0.04]"
                        )}
                    >
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                                {entry.eyebrow && (
                                    <span className="text-[9.5px] font-mono uppercase tracking-[0.18em] text-ink-dim">
                                        {entry.eyebrow}
                                    </span>
                                )}
                            </div>
                            <div className="text-[14px] font-medium text-ink truncate">
                                {entry.title}
                            </div>
                            {entry.subtitle && (
                                <div className="text-[12px] text-ink-muted truncate mt-0.5">
                                    {entry.subtitle}
                                </div>
                            )}
                        </div>
                        <div className="shrink-0 self-center text-ink-dim">
                            {entry.external ? (
                                <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                            ) : (
                                <CornerDownLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                            )}
                        </div>
                    </button>
                );
            })}
        </div>
    );
}

function EmptyHint({ platform }) {
    return (
        <div className="px-6 py-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-1 text-[10px] font-mono uppercase tracking-[0.18em] text-ink-dim mb-4">
                Search · ecosystem
            </div>
            <p className="text-[13px] text-ink-muted leading-relaxed max-w-sm mx-auto">
                התחל להקליד כדי למצוא pillars, מסלולים, מערכות וסרטונים. השתמש ב-{" "}
                <kbd className="px-1 py-0.5 rounded border border-white/10 bg-white/[0.04] text-[10px] font-mono text-ink">
                    {platform === "mac" ? "⌘" : "Ctrl"}
                </kbd>{" "}
                <kbd className="px-1 py-0.5 rounded border border-white/10 bg-white/[0.04] text-[10px] font-mono text-ink">
                    K
                </kbd>{" "}
                בכל מקום.
            </p>
        </div>
    );
}

function NoResults({ query }) {
    useEffect(() => {
        track(EVENTS.SEARCH_EMPTY, { len: String(query.length) });
    }, [query]);

    return (
        <div className="px-6 py-10 text-center">
            <p className="text-[13px] text-ink-muted">
                אין תוצאות עבור{" "}
                <span className="text-ink font-medium">&ldquo;{query}&rdquo;</span>.
            </p>
            <p className="mt-2 text-[12px] text-ink-dim">
                נסה pillar, מסלול, או שם של פרויקט.
            </p>
        </div>
    );
}

function SearchFooter() {
    return (
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.06] text-[10px] font-mono uppercase tracking-[0.18em] text-ink-dim">
            <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.04] normal-case">↑↓</kbd>
                    nav
                </span>
                <span className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.04] normal-case">↵</kbd>
                    open
                </span>
                <span className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.04] normal-case">esc</kbd>
                    close
                </span>
            </div>
            <span className="text-[10px] tracking-[0.18em]">YuvalCode · Search</span>
        </div>
    );
}
