import { useEffect } from "react";

/**
 * Synchronously detects missing env vars.
 * Only logs to console in development. Never shows a UI banner
 * to ensure production safety and clean developer experience.
 */
function getMissingKeys() {
    const missing = [];
    if (!import.meta.env.VITE_YOUTUBE_API_KEY) missing.push("VITE_YOUTUBE_API_KEY");
    if (!import.meta.env.VITE_YOUTUBE_CHANNEL_ID) missing.push("VITE_YOUTUBE_CHANNEL_ID");
    if (!import.meta.env.VITE_CONTACT_ENDPOINT) missing.push("VITE_CONTACT_ENDPOINT");
    return missing;
}

export function ConfigValidator() {
    useEffect(() => {
        if (import.meta.env.DEV) {
            const missingKeys = getMissingKeys();
            if (missingKeys.length > 0) {
                console.warn(
                    `[ConfigValidator] Missing environment variables: ${missingKeys.join(", ")}. Some features will operate in fallback mode.`
                );
            }
        }
    }, []);

    return null;
}
