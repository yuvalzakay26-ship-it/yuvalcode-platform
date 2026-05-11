import { useState, useMemo } from "react";
import { AlertTriangle, X } from "lucide-react";

/**
 * Synchronously detects missing env vars at first render to avoid the
 * "banner appears 32 px after paint" layout-shift bug. Dismissible per session.
 */
function getMissingKeys() {
    const missing = [];
    if (!import.meta.env.VITE_YOUTUBE_API_KEY) missing.push("VITE_YOUTUBE_API_KEY");
    if (!import.meta.env.VITE_YOUTUBE_CHANNEL_ID) missing.push("VITE_YOUTUBE_CHANNEL_ID");
    // Contact form is silent without an endpoint — surface in dev only to keep production banner-free.
    if (import.meta.env.DEV && !import.meta.env.VITE_CONTACT_ENDPOINT) {
        missing.push("VITE_CONTACT_ENDPOINT");
    }
    return missing;
}

export function ConfigValidator() {
    const initial = useMemo(() => getMissingKeys(), []);
    const [missingKeys] = useState(initial);
    const [dismissed, setDismissed] = useState(false);

    if (missingKeys.length === 0 || dismissed) return null;

    return (
        <div
            role="status"
            aria-live="polite"
            className="bg-yellow-500/10 border-b border-yellow-500/20 text-yellow-200 px-4 py-2 text-sm font-medium relative z-[60]"
        >
            <div className="container mx-auto flex items-center justify-center gap-3">
                <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="text-center">
                    שים לב: חסרות הגדרות סביבה (<span dir="ltr">{missingKeys.join(", ")}</span>). חלק מהיכולות יפעלו במצב fallback.
                </span>
                <button
                    type="button"
                    onClick={() => setDismissed(true)}
                    className="shrink-0 p-1 rounded-full hover:bg-yellow-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/60"
                    aria-label="סגור הודעה"
                >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
            </div>
        </div>
    );
}
