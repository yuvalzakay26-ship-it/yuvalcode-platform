// Editorial query helpers.
//
// Thin wrappers over src/lib/content that resolve URL-shaped lookups
// (e.g. "/content/articles/foo") into typed entries + collection metadata.
// Keeps every editorial route component tiny and consistent.

import { getAllEntries, getEntryById, getEntriesByPillar } from "../content";
import {
    getCollectionConfig,
    getCollectionConfigByType,
    EDITORIAL_COLLECTIONS,
} from "./collections-config";

/**
 * Resolve every entry that belongs in the given collection slug.
 * Sorted recent-first; entries without a date sink to the bottom.
 */
export function getEntriesForCollection(slug) {
    const config = getCollectionConfig(slug);
    if (!config) return [];
    return getAllEntries()
        .filter((e) => e.type === config.type)
        .slice()
        .sort(byDateDesc);
}

/**
 * Resolve a single entry by collection slug + entry slug.
 * Returns null if either doesn't resolve.
 */
export function getEntryFor(collectionSlug, entrySlug) {
    const config = getCollectionConfig(collectionSlug);
    if (!config) return null;
    const entries = getAllEntries().filter((e) => e.type === config.type);
    return entries.find((e) => e.slug === entrySlug || e.id === entrySlug) || null;
}

/**
 * Cross-collection neighbors — given an entry, return the prev/next sibling
 * within the same collection (recency order). Powers the in-article footer.
 */
export function getCollectionNeighbors(entry) {
    if (!entry) return { prev: null, next: null };
    const config = getCollectionConfigByType(entry.type);
    if (!config) return { prev: null, next: null };
    const list = getEntriesForCollection(config.slug);
    const idx = list.findIndex((e) => e.id === entry.id);
    if (idx === -1) return { prev: null, next: null };
    return {
        prev: idx > 0 ? list[idx - 1] : null,
        next: idx < list.length - 1 ? list[idx + 1] : null,
    };
}

/**
 * Get the canonical /content/<collection>/<slug> URL for an entry.
 * Falls back to /content if the entry's type isn't a known editorial type.
 */
export function getEntryHref(entry) {
    if (!entry) return "/content";
    if (entry.href && entry.href.startsWith("/")) return entry.href;
    const config = getCollectionConfigByType(entry.type);
    if (!config) return "/content";
    return `/content/${config.slug}/${entry.slug}`;
}

/**
 * High-level summary used by the /content hub to surface every collection's
 * latest activity at a glance. Returns one row per editorial collection.
 */
export function summarizeCollections({ perCollection = 3 } = {}) {
    return EDITORIAL_COLLECTIONS.map((config) => {
        const entries = getEntriesForCollection(config.slug);
        return {
            config,
            entries: entries.slice(0, perCollection),
            total: entries.length,
        };
    });
}

/**
 * Pillar-aware: given a pillar id, return all editorial entries that target
 * that pillar — irrespective of which collection they live in. Powers the
 * pillar landing rail and cross-pillar discovery.
 */
export function getEntriesForPillar(pillarId, { limit = 6 } = {}) {
    return getEntriesByPillar(pillarId).slice().sort(byDateDesc).slice(0, limit);
}

/**
 * Return the most recently published entries across the entire library —
 * sorted recency-first. Used by the editorial hub's "Latest" rail.
 */
export function getLatestEditorialEntries({ limit = 6 } = {}) {
    return getAllEntries().slice().sort(byDateDesc).slice(0, limit);
}

/**
 * Resolve a typed entry id → full entry (passthrough; named so editorial
 * components can import a stable surface even if the storage layer moves).
 */
export function resolveEntry(id) {
    return getEntryById(id);
}

function byDateDesc(a, b) {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.localeCompare(a.date);
}
