// Public content API.
//
// Pages and components consume content through this module — never by
// importing collections directly. The indirection lets us swap the storage
// layer (in-memory → MDX → CMS) without touching consumers.

import { COLLECTIONS, flatEntries } from "../../content/collections";
import { CONTENT_STATUS, CONTENT_VISIBILITY } from "./schema";

export { CONTENT_TYPES, CONTENT_STATUS, CONTENT_VISIBILITY, isValidEntry } from "./schema";
export { PILLARS, getPillar, getPillarNeighbors, isPillarId } from "./pillars";
export { TAGS, AUDIENCES, LEVELS, SURFACES, getTag, getTagsByPillar, isValidTag } from "./taxonomy";
export { defineCollection } from "./defineCollection";

const PUBLIC_FILTER = (e) =>
    e.status === CONTENT_STATUS.LIVE && e.visibility === CONTENT_VISIBILITY.PUBLIC;

export function getAllEntries({ includeDrafts = false } = {}) {
    const all = flatEntries();
    return includeDrafts ? all : all.filter(PUBLIC_FILTER);
}

export function getCollection(name) {
    return COLLECTIONS[name] || null;
}

export function getEntryById(id) {
    for (const collection of Object.values(COLLECTIONS)) {
        const found = collection.byId.get(id);
        if (found) return found;
    }
    return null;
}

export function getEntriesByPillar(pillarId, opts) {
    return getAllEntries(opts).filter((e) => e.pillar === pillarId);
}

export function getEntriesByTag(tagId, opts) {
    return getAllEntries(opts).filter((e) => Array.isArray(e.tags) && e.tags.includes(tagId));
}

export function getEntriesByType(typeId, opts) {
    return getAllEntries(opts).filter((e) => e.type === typeId);
}

/**
 * Resolves the related-by-id graph for a given entry id.
 * Powers the recommendation engine in src/lib/ai/recommend.js.
 */
export function getRelated(id) {
    const entry = getEntryById(id);
    if (!entry) return [];
    return (entry.related || [])
        .map(getEntryById)
        .filter(Boolean)
        .filter(PUBLIC_FILTER);
}

/**
 * Recent-first listing across the entire library.
 * Entries without a date are pushed to the end of the list deterministically.
 */
export function getRecent({ limit = 12 } = {}) {
    return getAllEntries()
        .slice()
        .sort((a, b) => {
            if (!a.date && !b.date) return 0;
            if (!a.date) return 1;
            if (!b.date) return -1;
            return b.date.localeCompare(a.date);
        })
        .slice(0, limit);
}
