// Asset / image helpers.
//
// Lightweight utilities that prepare the platform for scalable media —
// responsive YouTube thumbnails, future CDN host swaps, and a single
// resolution surface for editorial cover images. No new runtime dependencies.

import { SITE } from "../constants";

// Future-CDN-ready host. When a real image CDN is wired (Cloudinary, Vercel
// Image, Bunny), set VITE_CDN_HOST and every image URL routed through
// `cdnUrl()` rebases without touching call sites.
const CDN_HOST = (import.meta.env?.VITE_CDN_HOST || "").replace(/\/$/, "");

/**
 * cdnUrl() — rebase a relative path onto the CDN host when configured.
 * Falls back to the canonical site host. Idempotent for absolute URLs.
 */
export function cdnUrl(path) {
    if (!path) return SITE.url;
    if (/^https?:/i.test(path)) return path;
    const host = CDN_HOST || SITE.url;
    if (path.startsWith("/")) return `${host}${path}`;
    return `${host}/${path}`;
}

// ---------------------------------------------------------------------------
// YouTube thumbnail strategy.
//
// YouTube exposes 4 quality tiers per video. We default to maxres on desktop
// and mqdefault on mobile; an automatic srcset wires both into the same
// <img>.
// ---------------------------------------------------------------------------

const YT_VARIANTS = Object.freeze({
    mqdefault: { w: 320, h: 180 },
    hqdefault: { w: 480, h: 360 },
    sddefault: { w: 640, h: 480 },
    maxresdefault: { w: 1280, h: 720 },
});

export function youTubeThumbnailUrl(videoId, variant = "maxresdefault") {
    if (!videoId) return null;
    const v = YT_VARIANTS[variant] ? variant : "maxresdefault";
    return `https://i.ytimg.com/vi/${videoId}/${v}.jpg`;
}

/**
 * youTubeThumbnailSrcSet(videoId) — returns srcset + sizes attributes for a
 * responsive <img>. The default behaviour assumes the image renders full-bleed
 * on mobile and ~760px on desktop hero cards — adjust `sizes` per call site
 * when needed.
 */
export function youTubeThumbnailSrcSet(videoId) {
    if (!videoId) return null;
    const entries = ["mqdefault", "hqdefault", "sddefault", "maxresdefault"]
        .map((v) => `${youTubeThumbnailUrl(videoId, v)} ${YT_VARIANTS[v].w}w`);
    return {
        src: youTubeThumbnailUrl(videoId, "hqdefault"),
        srcSet: entries.join(", "),
        sizes: "(min-width: 1024px) 760px, 100vw",
        width: YT_VARIANTS.maxresdefault.w,
        height: YT_VARIANTS.maxresdefault.h,
    };
}

// ---------------------------------------------------------------------------
// Editorial cover image resolution.
//
// Entries optionally carry a `coverImage`. We resolve to:
//   - The author-provided URL (absolute or relative).
//   - A collection-default fallback (per slug, when authored).
//   - The brand /og-image.png as the universal fallback.
// ---------------------------------------------------------------------------

const COVER_DEFAULTS = Object.freeze({
    // articles:           "/covers/articles.svg",
    // "ai-experiments":   "/covers/ai-experiments.svg",
});

export function resolveCoverImage({ entry, collectionSlug } = {}) {
    if (entry?.coverImage) return cdnUrl(entry.coverImage);
    if (collectionSlug && COVER_DEFAULTS[collectionSlug]) {
        return cdnUrl(COVER_DEFAULTS[collectionSlug]);
    }
    return cdnUrl("/og-image.png");
}

// ---------------------------------------------------------------------------
// Responsive image attributes for arbitrary cover assets — accepts a width
// list and returns srcset/sizes. Used when the editorial layer authors a real
// cover image and we want responsive delivery without adding a build pipeline.
// ---------------------------------------------------------------------------

export function responsiveImage({ src, widths = [400, 800, 1200], sizes = "100vw" } = {}) {
    if (!src) return null;
    const url = cdnUrl(src);
    return {
        src: url,
        srcSet: widths.map((w) => `${url}?w=${w} ${w}w`).join(", "),
        sizes,
    };
}

// ---------------------------------------------------------------------------
// <link rel="preload"> helpers — call sites can compose font / image preloads
// from a single source instead of hand-writing tags.
// ---------------------------------------------------------------------------

export function fontPreloadHref(weight) {
    return `https://fonts.gstatic.com/s/heebo/v26/NGS6v5_NC0k9P9H6T${weight}.woff2`;
}

export function preloadHints({ ogImage } = {}) {
    const hints = [];
    if (ogImage) {
        hints.push({ rel: "preload", as: "image", href: ogImage });
    }
    return hints;
}
