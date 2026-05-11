// Newsletter / audience subscription provider abstraction.
//
// One adapter pattern. Multiple concrete providers. Zero coupling between
// the UI surfaces and any specific email vendor. The active provider is
// chosen at build time via VITE_NEWSLETTER_PROVIDER. When the env var is
// unset (default), the "deferred" provider routes signups to the existing
// /contact?subject=newsletter form so nothing is lost.
//
// Adding a real provider (Beehiiv, ConvertKit, Buttondown, Resend Audiences)
// is a single new function in this file plus an entry in the registry.

const PROVIDER = (import.meta.env.VITE_NEWSLETTER_PROVIDER || "deferred").toLowerCase();
const NEWSLETTER_ENDPOINT = import.meta.env.VITE_NEWSLETTER_ENDPOINT;
const NEWSLETTER_LIST_ID = import.meta.env.VITE_NEWSLETTER_LIST_ID;
const isDev = import.meta.env?.DEV ?? false;

export const SEGMENTS = Object.freeze({
    GENERAL: "general",
    AI: "ai",
    PROGRAMMING: "programming",
    BUILDING_IN_PUBLIC: "building-in-public",
});

export const SEGMENT_OPTIONS = Object.freeze([
    { id: SEGMENTS.GENERAL, label: "סיכום חודשי", description: "כל מה שקרה החודש." },
    { id: SEGMENTS.AI, label: "AI Track", description: "Claude · agents · workflows." },
    { id: SEGMENTS.PROGRAMMING, label: "Programming", description: "C# · אלגוריתמים · מבני נתונים." },
    { id: SEGMENTS.BUILDING_IN_PUBLIC, label: "Build in public", description: "מה אני בונה בזמן אמת." },
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value) {
    return typeof value === "string" && EMAIL_RE.test(value.trim());
}

// ---------------------------------------------------------------------------
// Adapter contract
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} SubscribeInput
 * @property {string}   email
 * @property {string[]} [segments]
 * @property {string}   [surface]   — analytics-only context (e.g. "/" or "/ai")
 *
 * @typedef {Object} SubscribeResult
 * @property {"queued"|"success"|"error"|"deferred"} status
 * @property {string} [message]
 * @property {string} [provider]
 */

const adapters = {
    /** No external provider — open the existing contact form. */
    async deferred({ email, surface }) {
        // Build a deep-link to the contact form with subject pre-selected.
        // The signup is "queued" — no email is actually transmitted from this
        // module; the user finishes the flow inside Contact.jsx.
        const params = new URLSearchParams({ subject: "newsletter" });
        if (email && isValidEmail(email)) params.set("email", email);
        const href = `/contact?${params.toString()}${surface ? "" : ""}`;
        return {
            status: "deferred",
            provider: "deferred",
            href,
            message: "ניוזלטר ייעודי בדרך — בינתיים נמשיך דרך טופס הקשר.",
        };
    },

    /** POST to a generic JSON endpoint. */
    async webhook({ email, segments }) {
        if (!NEWSLETTER_ENDPOINT) {
            return { status: "error", provider: "webhook", message: "VITE_NEWSLETTER_ENDPOINT לא מוגדר." };
        }
        try {
            const res = await fetch(NEWSLETTER_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, segments, list: NEWSLETTER_LIST_ID || null }),
            });
            if (!res.ok) {
                return { status: "error", provider: "webhook", message: `שגיאה (${res.status}).` };
            }
            return { status: "success", provider: "webhook" };
        } catch (err) {
            if (isDev) {
                console.error("[newsletter] webhook error", err);
            }
            return { status: "error", provider: "webhook", message: "תקלה ברשת — נסה שוב." };
        }
    },

    /** Beehiiv adapter — placeholder, wired the same way as webhook. */
    async beehiiv(input) {
        return adapters.webhook(input);
    },

    /** ConvertKit adapter — placeholder, wired the same way as webhook. */
    async convertkit(input) {
        return adapters.webhook(input);
    },
};

export function getActiveProvider() {
    return adapters[PROVIDER] ? PROVIDER : "deferred";
}

export function isProviderConfigured() {
    if (PROVIDER === "deferred") return true;
    if (PROVIDER === "webhook" || PROVIDER === "beehiiv" || PROVIDER === "convertkit") {
        return Boolean(NEWSLETTER_ENDPOINT);
    }
    return false;
}

/**
 * Subscribe a visitor to the newsletter. The shape never throws — every
 * branch returns a status object so the UI can render success/error/defer
 * without try/catch noise.
 */
export async function subscribeToNewsletter(input = {}) {
    const email = (input.email || "").trim();
    if (!isValidEmail(email)) {
        return { status: "error", message: "נא להזין כתובת אימייל תקינה." };
    }

    const provider = getActiveProvider();
    const adapter = adapters[provider];
    if (!adapter) {
        return { status: "error", message: "ניוזלטר לא מוגדר כרגע." };
    }

    return adapter({
        email,
        segments: Array.isArray(input.segments) ? input.segments : [SEGMENTS.GENERAL],
        surface: input.surface || null,
    });
}
