// Fallback dataset for when the YouTube Data API is unavailable
// (missing/invalid API key, network failure, quota exhausted).
//
// Intentionally empty: the previous placeholder records pointed to a
// well-known rickroll URL and were unsafe to ship. The site now displays
// a clean empty state when the API is unavailable; the ConfigValidator
// banner already informs the user of the missing configuration.
//
// Restore entries here ONLY with real, safe URLs from our own channel.
export const videos = [];

export const getThumbnail = (youtubeUrl) => {
    try {
        const urlParams = new URLSearchParams(new URL(youtubeUrl).search);
        const videoId = urlParams.get("v");
        if (videoId) {
            return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }
        return "";
    } catch {
        return "";
    }
};
