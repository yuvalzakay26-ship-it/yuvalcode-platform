// Lightweight analytics shim.
//
// Drop-in for Plausible / GA4 / PostHog without coupling app code to a vendor.
// Reads VITE_PLAUSIBLE_DOMAIN at build time. When unset, every call is a no-op
// and nothing ships. When set, a small <script> is injected once.
//
// Phase 3.0 extends the shim with a typed event taxonomy, a traversal tracker,
// and helpers consumed across the platform intelligence layer (search,
// newsletter, recommendations). The shim stays vendor-agnostic — every event
// passes through `track(name, props)` so swapping providers is a one-file diff.

const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
const PLAUSIBLE_SRC = import.meta.env.VITE_PLAUSIBLE_SRC || "https://plausible.io/js/script.js";
const ANALYTICS_DEBUG = import.meta.env.VITE_ANALYTICS_DEBUG === "true";

let initialized = false;

// ---------------------------------------------------------------------------
// Event taxonomy — every call site uses one of these names. Adding a new event
// is one line; renaming requires a migration. Names are kebab-case to read
// cleanly in Plausible's dashboard.
// ---------------------------------------------------------------------------

export const EVENTS = Object.freeze({
    // Lifecycle
    PAGEVIEW: "pageview",
    ROUTE_TRANSITION: "route-transition",

    // Discovery / search
    SEARCH_OPEN: "search-open",
    SEARCH_CLOSE: "search-close",
    SEARCH_QUERY: "search-query",
    SEARCH_SELECT: "search-select",
    SEARCH_EMPTY: "search-empty",

    // Ecosystem traversal — cross-track navigation
    ECOSYSTEM_TRAVERSAL: "ecosystem-traversal",
    PILLAR_CLICK: "pillar-click",
    PATHWAY_CLICK: "pathway-click",

    // Track engagement
    AI_TRACK_ENGAGE: "ai-track-engage",
    PROJECT_ENGAGE: "project-engage",
    STACK_ENGAGE: "stack-engage",
    CONTENT_ENGAGE: "content-engage",
    EXAM_ENGAGE: "exam-engage",

    // Conversion
    CTA_CLICK: "cta-click",
    NEWSLETTER_INTENT: "newsletter-intent",
    NEWSLETTER_SUBMIT: "newsletter-submit",
    NEWSLETTER_SUCCESS: "newsletter-success",
    NEWSLETTER_ERROR: "newsletter-error",
    SUBSCRIBE_CLICK: "subscribe-click",
    COMMUNITY_JOIN: "community-join",
    WORK_WITH_ME_INTENT: "work-with-me-intent",

    // Recommendation hooks (used when AI layer ships)
    RECOMMENDATION_SHOWN: "recommendation-shown",
    RECOMMENDATION_CLICK: "recommendation-click",
});

// ---------------------------------------------------------------------------
// Initialization + low-level tracking
// ---------------------------------------------------------------------------

export function initAnalytics() {
    if (initialized) return;
    if (typeof document === "undefined") return;
    if (!PLAUSIBLE_DOMAIN) return;

    const existing = document.querySelector('script[data-analytics="plausible"]');
    if (existing) {
        initialized = true;
        return;
    }

    const script = document.createElement("script");
    script.defer = true;
    script.src = PLAUSIBLE_SRC;
    script.setAttribute("data-domain", PLAUSIBLE_DOMAIN);
    script.setAttribute("data-analytics", "plausible");
    document.head.appendChild(script);

    if (typeof window !== "undefined" && !window.plausible) {
        window.plausible = window.plausible || function () {
            (window.plausible.q = window.plausible.q || []).push(arguments);
        };
    }

    initialized = true;
}

function debugLog(name, props) {
    if (!ANALYTICS_DEBUG) return;
    if (typeof console === "undefined") return;
    console.debug(`[analytics] ${name}`, props || {});
}

/**
 * Single chokepoint for every event. Stays a no-op if the analytics provider
 * never loads, so non-critical surfaces can call it freely.
 */
export function track(name, props) {
    debugLog(name, props);
    if (typeof window === "undefined") return;
    if (typeof window.plausible !== "function") return;

    const payload = props && Object.keys(props).length > 0
        ? { props: scrubProps(props) }
        : undefined;

    try {
        window.plausible(name, payload);
    } catch {
        // analytics failure must never break the app
    }
}

export function trackPageview(path) {
    if (typeof window === "undefined") return;
    if (typeof window.plausible !== "function") return;
    try {
        window.plausible("pageview", path ? { u: window.location.origin + path } : undefined);
    } catch {
        // ignore
    }
}

// Backwards-compatible alias — earlier phases imported `trackEvent`.
export function trackEvent(name, props) {
    track(name, props);
}

// ---------------------------------------------------------------------------
// Privacy-conscious helpers
// ---------------------------------------------------------------------------
//
// scrubProps() prevents accidental PII from reaching the wire. Plausible itself
// is privacy-friendly by design, but we still defensively drop anything that
// looks like an email or a long free-form string.

const MAX_PROP_LEN = 80;
const EMAIL_RE = /[^\s@]+@[^\s@]+\.[^\s@]+/;

function scrubProps(props) {
    const out = {};
    for (const [key, raw] of Object.entries(props)) {
        if (raw === null || raw === undefined) continue;
        const value = typeof raw === "string" ? raw : String(raw);
        if (EMAIL_RE.test(value)) continue;
        if (value.length > MAX_PROP_LEN) {
            out[key] = value.slice(0, MAX_PROP_LEN);
        } else {
            out[key] = value;
        }
    }
    return out;
}

// ---------------------------------------------------------------------------
// High-level helpers — preferred over raw `track()` at call sites.
// ---------------------------------------------------------------------------

/**
 * Records that the visitor moved between two surfaces in the ecosystem.
 *
 * Example: a click on the AI card in /content → /ai becomes
 *   trackTraversal({ from: "/content", to: "/ai", reason: "pillar-card" })
 *
 * Used by ScrollToTop on every route transition (inferred from history) and
 * directly by call sites that know richer context (e.g. which pillar card
 * triggered the navigation).
 */
export function trackTraversal({ from, to, reason }) {
    if (!to) return;
    track(EVENTS.ECOSYSTEM_TRAVERSAL, {
        from: from || "(none)",
        to,
        reason: reason || "navigation",
    });
}

export function trackCta({ id, surface, destination }) {
    track(EVENTS.CTA_CLICK, { id, surface, destination });
}

export function trackSearchQuery(query, resultCount) {
    if (!query) return;
    const trimmed = String(query).trim();
    if (trimmed.length === 0) return;
    track(EVENTS.SEARCH_QUERY, {
        len: String(trimmed.length),
        results: String(resultCount ?? 0),
    });
    if ((resultCount ?? 0) === 0) track(EVENTS.SEARCH_EMPTY, { len: String(trimmed.length) });
}

export function trackSearchSelect({ id, kind, position }) {
    track(EVENTS.SEARCH_SELECT, {
        id: id || "(unknown)",
        kind: kind || "(unknown)",
        position: String(position ?? -1),
    });
}

export function trackNewsletterIntent({ surface }) {
    track(EVENTS.NEWSLETTER_INTENT, { surface: surface || "(unknown)" });
}

export function trackNewsletterResult({ status, surface }) {
    if (status === "success") track(EVENTS.NEWSLETTER_SUCCESS, { surface });
    else if (status === "error") track(EVENTS.NEWSLETTER_ERROR, { surface });
    else track(EVENTS.NEWSLETTER_SUBMIT, { surface });
}

export function trackPillarClick({ pillar, surface }) {
    track(EVENTS.PILLAR_CLICK, { pillar, surface });
}

export function trackRecommendationShown({ id, kind, surface }) {
    track(EVENTS.RECOMMENDATION_SHOWN, { id, kind, surface });
}

export function trackRecommendationClick({ id, kind, surface, position }) {
    track(EVENTS.RECOMMENDATION_CLICK, {
        id,
        kind,
        surface,
        position: String(position ?? -1),
    });
}
