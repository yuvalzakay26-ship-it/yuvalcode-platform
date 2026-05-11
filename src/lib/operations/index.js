// Operations public API.
//
// Phase 3.4 layer. Every export here is operational — used by scripts, by
// the future creator console, and by AI publishing assistants. None of
// these are imported by visitor-facing pages or components. Operations
// must NOT inflate the runtime bundle.
//
// If a page or section ever imports from this barrel, that's a regression:
// the operational surface bled into the visitor surface.

export {
    OPERATION_SEVERITY,
    validateEntryShape,
    validateEditorialPolish,
    derivePublicationFootprint,
    derivePublishingPlan,
} from "./publishing";

export {
    findBrokenRelations,
    findOrphans,
    findDuplicateSlugs,
    findPillarImbalance,
    runEditorialChecks,
} from "./editorial-checks";

export {
    slugify,
    todayIso,
    composeFrontmatter,
    composeEntrySkeleton,
    registryImportLine,
} from "./authoring";

export {
    draftReleaseEntry,
    summarizeChangelog,
    ChangelogComposer,
    NullChangelogComposer,
    getChangelogComposer,
    isChangelogComposerConfigured,
} from "./changelog";

export {
    RELEASE_PHASES,
    getRelease,
    currentRelease,
    releaseStamp,
    nextPhaseHint,
} from "./release";

export {
    PublishingAssistant,
    NullPublishingAssistant,
    getPublishingAssistant,
    isPublishingAssistantConfigured,
} from "./ai-publishing";

export { runEcosystemHealth } from "./ecosystem-health";

export {
    CONSOLE_PANELS,
    CreatorConsole,
    NullCreatorConsole,
    getCreatorConsole,
    isCreatorConsoleConfigured,
} from "./console";
