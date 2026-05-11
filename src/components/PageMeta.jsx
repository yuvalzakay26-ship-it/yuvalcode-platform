import { useEffect } from "react";
import { SITE } from "../lib/constants";
import { resolveOpenGraph, resolveArticleOgMeta } from "../lib/distribution/og";
import { feedsForRoute } from "../lib/distribution/distribution";
import {
    cleanupMeta,
    removeMetaTag,
    removePropertyTag,
    setArticleTags,
    setCanonical,
    setHtmlAttr,
    setJsonLd,
    setLinkAlternates,
    setMetaTag,
    setPropertyTag,
    setTitle,
} from "../lib/metadata";

const DEFAULT_DESCRIPTION =
    "יובל זכאי — מורה לתכנות ויוצר תוכן ישראלי. לומד ובונה עם AI בפומבי, מלמד תכנות אמיתי, ומתעד את המסע לעולם הפיתוח של 2026 ואילך.";

const DEFAULT_THEME_COLOR = "#07080d";
const DEFAULT_AUTHOR = SITE.name;

/**
 * PageMeta — single source of truth for per-route head metadata.
 *
 * React 19-native: no third-party head manager. A single useEffect drives the
 * imperative metadata utilities so re-renders never thrash the DOM and route
 * transitions never accumulate stale tags.
 *
 * Props:
 *   title       : route title (composed with site name)
 *   description : meta description; falls back to site default
 *   image       : explicit override for og:image (otherwise resolved)
 *   path        : route path (used to build canonical + og:url)
 *   keywords    : array of free-form keywords; joined into <meta name="keywords">
 *   author      : meta author override (defaults to SITE.name)
 *   themeColor  : meta theme-color override (defaults to brand bg)
 *   jsonLd      : single JSON-LD object OR array of objects
 *   breadcrumbs : optional array of { name, path } — emits BreadcrumbList JSON-LD
 *   noindex     : when true, emits robots noindex
 *   feeds       : optional array of { rel, type, href, title } feed descriptors.
 *                 If omitted, feeds are auto-derived from the path.
 *   articleMeta : optional { publishedTime, modifiedTime, author, section, tags }
 *                 — emits og:type=article + article:* fields.
 *   ogType      : explicit override; defaults to "website" or "article" (if articleMeta).
 *   ogAlt       : alt text for the OG image.
 */
export function PageMeta({
    title,
    description,
    image,
    path,
    jsonLd,
    breadcrumbs,
    noindex,
    feeds,
    articleMeta,
    keywords,
    ogType,
    ogAlt,
    author,
    themeColor,
}) {
    const fullTitle = title ? `${title} · ${SITE.name}` : `${SITE.name} — ${SITE.roleHe}`;
    const metaDesc = description || DEFAULT_DESCRIPTION;
    const url = path ? `${SITE.url}${path}` : SITE.url;
    const authorValue = author || DEFAULT_AUTHOR;
    const themeValue = themeColor || DEFAULT_THEME_COLOR;

    const og = resolveOpenGraph({ route: path, image, alt: ogAlt });
    const ogImage = og.image;
    const ogAltText = og.alt;
    const resolvedOgType = ogType || (articleMeta ? "article" : og.type);
    const twitterCard = og.twitterCard;

    const feedDescriptors = Array.isArray(feeds) ? feeds : autoFeeds(path);
    const normalizedFeeds = feedDescriptors.map((d) => ({
        rel: d.rel || "alternate",
        type: d.type,
        href: asAbsolute(d.href),
        title: d.title || `${SITE.name} feed`,
    }));

    const ldEntries = [];
    if (jsonLd) {
        if (Array.isArray(jsonLd)) ldEntries.push(...jsonLd);
        else ldEntries.push(jsonLd);
    }
    if (breadcrumbs && breadcrumbs.length > 0) {
        ldEntries.push({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((b, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "name": b.name,
                "item": `${SITE.url}${b.path}`,
            })),
        });
    }

    const keywordList =
        keywords && keywords.length > 0 ? keywords.filter(Boolean).join(", ") : "";

    // Stable serialization keys — ensure the effect re-runs only on actual
    // content change, not on every parent re-render that hands us a fresh
    // array/object reference.
    const ldKey = JSON.stringify(ldEntries);
    const feedKey = JSON.stringify(normalizedFeeds);
    const articleKey = JSON.stringify(articleMeta || null);

    useEffect(() => {
        setHtmlAttr("lang", "he");
        setHtmlAttr("dir", "rtl");

        setTitle(fullTitle);
        setMetaTag("description", metaDesc);
        setMetaTag("author", authorValue);
        setMetaTag("theme-color", themeValue);
        setCanonical(url);

        if (keywordList) setMetaTag("keywords", keywordList);
        else removeMetaTag("keywords");

        if (noindex) setMetaTag("robots", "noindex, nofollow");
        else removeMetaTag("robots");

        // Open Graph
        setPropertyTag("og:type", resolvedOgType);
        setPropertyTag("og:site_name", SITE.name);
        setPropertyTag("og:title", fullTitle);
        setPropertyTag("og:description", metaDesc);
        setPropertyTag("og:url", url);
        setPropertyTag("og:image", ogImage);
        setPropertyTag("og:image:alt", ogAltText);
        setPropertyTag("og:locale", "he_IL");

        // Article-typed OG fields — set when present, removed otherwise so
        // navigating away from an article route never leaves stale article:*.
        setOrRemoveProperty("article:published_time", articleMeta?.publishedTime);
        setOrRemoveProperty("article:modified_time", articleMeta?.modifiedTime);
        setOrRemoveProperty("article:author", articleMeta?.author);
        setOrRemoveProperty("article:section", articleMeta?.section);
        setArticleTags(Array.isArray(articleMeta?.tags) ? articleMeta.tags : []);

        // Twitter
        setMetaTag("twitter:card", twitterCard);
        setMetaTag("twitter:title", fullTitle);
        setMetaTag("twitter:description", metaDesc);
        setMetaTag("twitter:image", ogImage);
        setMetaTag("twitter:image:alt", ogAltText);

        setLinkAlternates(normalizedFeeds);
        setJsonLd(ldEntries);

        return () => {
            cleanupMeta();
        };
        // ldKey/feedKey/articleKey capture array+object content; primitives cover the rest.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        fullTitle,
        metaDesc,
        url,
        ogImage,
        ogAltText,
        resolvedOgType,
        twitterCard,
        keywordList,
        authorValue,
        themeValue,
        noindex,
        ldKey,
        feedKey,
        articleKey,
    ]);

    return null;
}

function setOrRemoveProperty(property, content) {
    if (content) setPropertyTag(property, content);
    else removePropertyTag(property);
}

function autoFeeds(path) {
    if (!path) return [];
    const descriptors = feedsForRoute(path);
    if (!descriptors || descriptors.length === 0) return [];
    return descriptors.map((d) => ({
        rel: "alternate",
        type: d.type,
        href: d.href,
        title: `${SITE.name} — ${d.slug}`,
    }));
}

function asAbsolute(href) {
    if (!href) return SITE.url;
    if (/^https?:/i.test(href)) return href;
    if (href.startsWith("/")) return `${SITE.url}${href}`;
    return `${SITE.url}/${href}`;
}

// Re-export for convenience — keeps PageMeta the single import point for
// pages that want to compose article meta inline.
export { resolveArticleOgMeta };
