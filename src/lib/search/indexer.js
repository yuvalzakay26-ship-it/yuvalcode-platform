// Search indexer — flattens every searchable surface into one corpus.
//
// Sources: routes, content collections, pillars, optionally videos. Each
// source contributes entries shaped { id, kind, title, subtitle, href,
// keywords, eyebrow }. The matcher in match.js is deliberately schema-only;
// adding a new source means adding a normaliser here.
//
// The architecture is designed so that the future semantic-search layer can
// drop in without rewriting consumers — the corpus keeps the same shape and
// match.js is the only file that grows new logic.

import { PILLARS } from "../content/pillars";
import { getAllEntries } from "../content";
import { ROUTE_ENTRIES } from "./routes";

function normalizePillar(pillar) {
    return {
        id: `pillar:${pillar.id}`,
        kind: "pillar",
        title: pillar.title,
        subtitle: pillar.eyebrow,
        href: pillar.route,
        keywords: [pillar.id, pillar.eyebrow, pillar.title],
        eyebrow: "Pillar",
        pillarId: pillar.id,
    };
}

function normalizeContentEntry(entry) {
    return {
        id: `entry:${entry.id}`,
        kind: "entry",
        title: entry.title,
        subtitle: entry.summary || entry.eyebrow || "",
        href: entry.href || `/content/${entry.slug}`,
        keywords: [
            entry.title,
            entry.summary,
            entry.eyebrow,
            entry.pillar,
            entry.type,
            ...(entry.tags || []),
        ].filter(Boolean),
        eyebrow: entryEyebrow(entry.type),
        pillarId: entry.pillar,
        type: entry.type,
        tags: entry.tags || [],
        date: entry.date || null,
    };
}

function entryEyebrow(type) {
    switch (type) {
        case "article": return "Article";
        case "case-study": return "Case Study";
        case "ai-experiment": return "Experiment";
        case "workflow": return "Workflow";
        case "changelog": return "Changelog";
        case "newsletter": return "Newsletter";
        default: return "Content";
    }
}

function normalizeVideo(video) {
    if (!video) return null;
    return {
        id: `video:${video.id || video.youtubeUrl}`,
        kind: "video",
        title: video.title || video.examTitle || "סרטון",
        subtitle: video.examTitle && video.title !== video.examTitle ? video.examTitle : (video.durationLabel || ""),
        href: video.youtubeUrl,
        external: true,
        keywords: [video.title, video.examTitle, video.questionLabel].filter(Boolean),
        eyebrow: "Video",
        date: video.publishedAt || null,
    };
}

/**
 * buildSearchIndex({ videos? }) — synchronous, deterministic, side-effect-free.
 * Call once per search-modal session and keep the result around (the search
 * provider memoises it via useMemo).
 */
export function buildSearchIndex({ videos = [] } = {}) {
    const corpus = [];
    corpus.push(...ROUTE_ENTRIES);
    corpus.push(...PILLARS.map(normalizePillar));
    corpus.push(...getAllEntries().map(normalizeContentEntry));
    if (Array.isArray(videos)) {
        for (const v of videos) {
            const normalized = normalizeVideo(v);
            if (normalized) corpus.push(normalized);
        }
    }
    return corpus;
}

export const KIND_ORDER = Object.freeze([
    "route",
    "pillar",
    "entry",
    "video",
]);

export const KIND_LABEL = Object.freeze({
    route: "ניווט",
    pillar: "Pillars",
    entry: "תוכן",
    video: "סרטונים",
});
