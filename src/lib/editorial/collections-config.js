// Editorial collection registry.
//
// Each collection has a URL slug (used in /content/<slug>), a Hebrew + English
// label pair, an eyebrow tagline, an icon, and an accent RGB. The dynamic
// /content/:collection and /content/:collection/:slug routes resolve their
// metadata + entries through this single registry.
//
// Adding a collection is two lines: register it here and call
// defineCollection() in src/content/collections.js. Rendering, routing,
// search indexing, recommendations, and JSON-LD all derive from the registry.

import { CONTENT_TYPES } from "../content/schema";

export const EDITORIAL_COLLECTIONS = Object.freeze([
    {
        // URL slug — appears in /content/<slug>
        slug: "articles",
        // Programmatic id used to look up entries inside src/content/collections.js
        registryKey: "articles",
        // The CONTENT_TYPE every entry in this collection MUST carry
        type: CONTENT_TYPES.ARTICLE,
        // Identity
        labelHe: "מאמרים",
        labelEn: "Articles",
        eyebrow: "Editorial",
        tagline: "מאמרים טכניים. מערכות, החלטות, תובנות מהבנייה.",
        // Visual identity (kept in line with the existing track palettes)
        accent: "129,140,248",        // primary-400
        accentBorder: "rgba(129,140,248,0.30)",
        // Lucide icon name — resolved by the icon map in editorial/icons.js
        iconName: "BookOpen",
        // Schema.org subtype
        schemaType: "Article",
    },
    {
        slug: "ai-experiments",
        registryKey: "aiExperiments",
        type: CONTENT_TYPES.AI_EXPERIMENT,
        labelHe: "ניסויי AI",
        labelEn: "AI Experiments",
        eyebrow: "Lab Notes",
        tagline: "ניסויים. למידה אמיתית. כישלונות שמלמדים.",
        accent: "236,72,153",         // accent-500
        accentBorder: "rgba(236,72,153,0.30)",
        iconName: "FlaskConical",
        schemaType: "TechArticle",
    },
    {
        slug: "workflows",
        registryKey: "workflows",
        type: CONTENT_TYPES.WORKFLOW,
        labelHe: "Workflows",
        labelEn: "Workflow Docs",
        eyebrow: "Operating System",
        tagline: "השגרות שמייצרות את הקצב. מ-prompt ל-shipping.",
        accent: "168,85,247",         // secondary-500
        accentBorder: "rgba(168,85,247,0.30)",
        iconName: "Workflow",
        schemaType: "HowTo",
    },
    {
        slug: "case-studies",
        registryKey: "caseStudies",
        type: CONTENT_TYPES.CASE_STUDY,
        labelHe: "Case Studies",
        labelEn: "Case Studies",
        eyebrow: "Architecture",
        tagline: "מערכות שעובדות בייצור. מה היה, מה למדנו, מה הלאה.",
        accent: "192,132,252",         // secondary-400
        accentBorder: "rgba(192,132,252,0.30)",
        iconName: "Layers",
        schemaType: "Article",
    },
    {
        slug: "changelog",
        registryKey: "changelogs",
        type: CONTENT_TYPES.CHANGELOG,
        labelHe: "Changelog",
        labelEn: "Changelog",
        eyebrow: "Build in Public",
        tagline: "עדכוני פלטפורמה. מה שיגרנו, ולמה.",
        accent: "16,185,129",          // signal-green
        accentBorder: "rgba(16,185,129,0.30)",
        iconName: "GitCommit",
        schemaType: "Article",
    },
    {
        slug: "research-notes",
        registryKey: "researchNotes",
        type: CONTENT_TYPES.RESEARCH_NOTE,
        labelHe: "Research Notes",
        labelEn: "Research Notes",
        eyebrow: "Reading Notes",
        tagline: "מחשבות פתוחות. מה אני בודק, מה לא ברור.",
        accent: "245,158,11",          // signal-amber
        accentBorder: "rgba(245,158,11,0.30)",
        iconName: "Microscope",
        schemaType: "Article",
    },
]);

const BY_SLUG = new Map(EDITORIAL_COLLECTIONS.map((c) => [c.slug, c]));
const BY_TYPE = new Map(EDITORIAL_COLLECTIONS.map((c) => [c.type, c]));
const BY_REGISTRY = new Map(EDITORIAL_COLLECTIONS.map((c) => [c.registryKey, c]));

export function getCollectionConfig(slug) {
    return BY_SLUG.get(slug) || null;
}

export function getCollectionConfigByType(type) {
    return BY_TYPE.get(type) || null;
}

export function getCollectionConfigByRegistryKey(key) {
    return BY_REGISTRY.get(key) || null;
}

export function isKnownCollectionSlug(slug) {
    return BY_SLUG.has(slug);
}

export function getEditorialCollectionSlugs() {
    return EDITORIAL_COLLECTIONS.map((c) => c.slug);
}
