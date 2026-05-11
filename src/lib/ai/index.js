// Public AI namespace.
//
// All future intelligent-system code lives here. v1 ships graph-derived
// helpers and a null assistant — no chatbot, no embeddings, no vendor SDKs.

export { buildEcosystemGraph, neighborsOf, pillarNodeId, entryNodeId } from "./graph";
export {
    extractSemanticMetadata,
    embedEntry,
    cosineSimilarity,
    rankKey,
} from "./metadata";
export {
    recommendForEntry,
    recommendForPillar,
    recommendForUser,
    recommendSurfacesFrom,
    useRecommendations,
} from "./recommend";
export {
    CreatorAssistant,
    NullAssistant,
    getAssistant,
    isAssistantConfigured,
} from "./assistant";
