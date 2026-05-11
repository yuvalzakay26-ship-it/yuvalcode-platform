// Editorial public API.
//
// Pages and components consume the editorial system through this module.
// The indirection lets us swap the storage shape (in-memory JSX → MDX
// adapter → CMS) without touching consumers.

export {
    EDITORIAL_COLLECTIONS,
    getCollectionConfig,
    getCollectionConfigByType,
    getCollectionConfigByRegistryKey,
    isKnownCollectionSlug,
    getEditorialCollectionSlugs,
} from "./collections-config";

export {
    getEntriesForCollection,
    getEntryFor,
    getCollectionNeighbors,
    getEntryHref,
    summarizeCollections,
    getEntriesForPillar,
    getLatestEditorialEntries,
    resolveEntry,
} from "./queries";

export { estimateReadingMinutes, resolveReadingMinutes } from "./reading-time";
