// Search provider + global keyboard listener.
//
// Mounts once at Layout level. Owns:
//   1. The corpus (memoised — buildSearchIndex is cheap).
//   2. The open/close state.
//   3. The Cmd/Ctrl+K (and "/") shortcut listener.
//   4. The most-recent query for analytics.
//
// Everything UI-related lives in the lazy-loaded SearchModal so this provider
// stays cheap on the critical path.

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { buildSearchIndex } from "./indexer";
import { EVENTS, track } from "../analytics";

const SearchContext = createContext(null);

const isEditableTarget = (el) => {
    if (!el) return false;
    const tag = el.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
    if (el.isContentEditable) return true;
    return false;
};

const isMac = () => {
    if (typeof navigator === "undefined") return false;
    return /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent || "");
};

export function SearchProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQueryState] = useState("");

    // useState lazy-init guarantees the corpus is built exactly once per
    // mount (React contract), without the refs-in-render anti-pattern that a
    // useMemo+useRef hybrid would create.
    const [corpus] = useState(() => buildSearchIndex());

    const open = useCallback((reason = "manual") => {
        setIsOpen(true);
        track(EVENTS.SEARCH_OPEN, { reason });
    }, []);

    const close = useCallback((reason = "manual") => {
        setIsOpen(false);
        track(EVENTS.SEARCH_CLOSE, { reason });
    }, []);

    const setQuery = useCallback((next) => {
        setQueryState(typeof next === "function" ? next : String(next || ""));
    }, []);

    // Global keyboard listener — Cmd/Ctrl+K and "/" trigger; ESC handled
    // inside the modal so it can also clean up its own focus state.
    useEffect(() => {
        if (typeof window === "undefined") return;

        const handler = (event) => {
            const target = event.target;

            // Cmd/Ctrl + K — universal trigger, including from inside inputs.
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
                event.preventDefault();
                setIsOpen((prev) => {
                    if (!prev) track(EVENTS.SEARCH_OPEN, { reason: "shortcut" });
                    return true;
                });
                return;
            }

            // "/" — opens search only when focus is not in a typing surface.
            if (event.key === "/" && !isEditableTarget(target) && !event.metaKey && !event.ctrlKey && !event.altKey) {
                event.preventDefault();
                setIsOpen((prev) => {
                    if (!prev) track(EVENTS.SEARCH_OPEN, { reason: "slash" });
                    return true;
                });
            }
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    const value = useMemo(() => ({
        isOpen,
        open,
        close,
        query,
        setQuery,
        corpus,
        platform: isMac() ? "mac" : "pc",
    }), [isOpen, open, close, query, setQuery, corpus]);

    return (
        <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
    );
}

export function useSearch() {
    const ctx = useContext(SearchContext);
    if (!ctx) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    return ctx;
}

/** Read-only safe variant — returns null when no provider is mounted. */
export function useSearchOptional() {
    return useContext(SearchContext);
}
