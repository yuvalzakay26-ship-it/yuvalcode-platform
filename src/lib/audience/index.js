// Public surface for the audience / retention layer.
//
// Consumers MUST import from this module — never reach into the internal
// modules directly. Keeps the storage shape and the public contract
// independent so future migrations (cross-device sync, server identity)
// land behind the same hooks.

export {
    AudienceProvider,
    useAudience,
    useAudienceActions,
    useVisitorTier,
    useShouldShowOnboarding,
    useShouldShowWelcomeBack,
    useExploreNext,
    useContinueExploring,
    useSuggestedNextSurface,
    useRankedPillarSurfaces,
    VISITOR_TIER,
} from "./AudienceProvider";

export {
    SURFACE_META,
    surfaceForPillar,
    suggestNextSurface,
    buildExploreNextRail,
    continueExploringSurface,
    entryPathToSurface,
    rankedPillarSurfaces,
} from "./progression";

export {
    SURFACES,
    TRACK_SURFACE_ORDER,
    resolvePillarForPath,
    resolveSurfaceForPath,
    isTrackSurface,
} from "./routePillarMap";

export {
    AUDIENCE_STORAGE_KEY,
    LIMITS,
    resetAudienceMemory,
} from "./storage";
