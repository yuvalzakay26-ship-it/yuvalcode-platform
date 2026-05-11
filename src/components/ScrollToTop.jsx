import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, trackPageview, trackTraversal } from "../lib/analytics";

export function ScrollToTop() {
    const { pathname, search } = useLocation();
    const previousPathRef = useRef(null);

    useEffect(() => {
        const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "auto" });
    }, [pathname]);

    // Initialize analytics once (no-op when env var unset). Emit pageview + a
    // traversal record on every route change so the analytics layer can
    // reconstruct ecosystem flows ("how do visitors move between tracks?")
    // without per-call-site instrumentation.
    useEffect(() => {
        initAnalytics();
        trackPageview(pathname + (search || ""));

        const previous = previousPathRef.current;
        if (previous && previous !== pathname) {
            trackTraversal({ from: previous, to: pathname, reason: "route-change" });
        }
        previousPathRef.current = pathname;
    }, [pathname, search]);

    return null;
}
