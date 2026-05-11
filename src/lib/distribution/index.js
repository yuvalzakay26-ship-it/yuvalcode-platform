// Distribution public API.
//
// Pages and components consume the distribution layer through this module.
// Build scripts (sitemap, feeds, OG renderer) consume the same exports — the
// modules are pure, with no React or Vite-specific bindings.

export {
    SURFACES,
    SURFACE_KIND,
    UPDATE_FREQ,
    getSurface,
    getStaticSurfaces,
    getCollectionSurfaces,
    getFeedSlugs,
    getCollectionForFeedSlug,
} from "./routes";

export {
    buildWebSiteSchema,
    buildOrganizationSchema,
    buildPersonSchema,
    buildBreadcrumbList,
    buildWebPageSchema,
    buildCollectionPageSchema,
    buildArticleSchema,
    buildCreativeWorkSchema,
    entriesToHasPart,
} from "./schema";

export {
    buildFeedModel,
    renderRss,
    renderAtom,
    renderJsonFeed,
} from "./feeds";

export {
    buildSitemap,
    buildFeedIndex,
} from "./sitemap";

export {
    resolveOpenGraph,
    resolveArticleOgMeta,
} from "./og";

export {
    cdnUrl,
    youTubeThumbnailUrl,
    youTubeThumbnailSrcSet,
    resolveCoverImage,
    responsiveImage,
    fontPreloadHref,
    preloadHints,
} from "./images";

export {
    derivePageMeta,
} from "./metadata";

export {
    feedsForRoute,
    relatedSurfacesFor,
    surfacesForPillar,
    surfacesForEntry,
    distributionSnapshot,
    pickAdaptiveSurfaces,
} from "./distribution";
