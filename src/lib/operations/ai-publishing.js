// AI-assisted publishing — contract only.
//
// Mirrors the pattern from src/lib/ai/assistant.js: the contract ships
// before the implementation. v1 has zero AI — every method resolves to a
// deterministic value derived from existing operations primitives. When
// AI publishing arrives, the `ClaudePublishingAssistant` (env-gated) drops
// in behind this interface and consumers do not change.
//
// Forbidden by §6.1: hand-tuned heuristics labeled as AI. Every response
// here is sourced ("kind" field) — consumers know exactly what they got.

import { derivePublishingPlan } from "./publishing";
import { runEditorialChecks } from "./editorial-checks";
import { draftReleaseEntry } from "./changelog";

/**
 * @typedef {Object} PublishingContext
 * @property {object}  [entry]           — the draft entry being prepared
 * @property {string}  [collectionSlug]  — its target collection
 * @property {Array}   [registry]        — full editorial registry, for graph checks
 * @property {string}  [locale]          — "he" | "en" — defaults to Hebrew
 * @property {AbortSignal} [signal]      — caller-provided cancellation
 */

/**
 * The contract every concrete publishing assistant must satisfy.
 */
export class PublishingAssistant {
    /** Validate + plan a single draft entry. */
    // eslint-disable-next-line no-unused-vars
    async planEntry(context) {
        throw new Error("PublishingAssistant.planEntry not implemented.");
    }

    /** Suggest related[] cross-links from the existing registry. */
    // eslint-disable-next-line no-unused-vars
    async suggestRelations(context) {
        throw new Error("PublishingAssistant.suggestRelations not implemented.");
    }

    /** Run an editorial integrity sweep across the registry. */
    // eslint-disable-next-line no-unused-vars
    async lintRegistry(context) {
        throw new Error("PublishingAssistant.lintRegistry not implemented.");
    }

    /** Draft a release-note entry from a release context. */
    // eslint-disable-next-line no-unused-vars
    async draftRelease(context) {
        throw new Error("PublishingAssistant.draftRelease not implemented.");
    }
}

/**
 * NullPublishingAssistant — the only concrete implementation in v1.
 * Deterministic, side-effect-free, sourced. Annotated outputs always carry
 * `kind: "null" | "deterministic"` so UI can label results honestly.
 */
export class NullPublishingAssistant extends PublishingAssistant {
    constructor() {
        super();
        this.kind = "null";
    }

    async planEntry({ entry, collectionSlug } = {}) {
        return {
            kind: "deterministic",
            source: "publishing.derivePublishingPlan",
            plan: derivePublishingPlan({ entry, collectionSlug }),
        };
    }

    async suggestRelations({ entry, registry } = {}) {
        if (!entry || !Array.isArray(registry)) {
            return { kind: "null", suggestions: [] };
        }
        // Same-pillar fallback. The vector ranker drops in here later.
        const candidates = registry
            .filter((e) => e.id !== entry.id && e.pillar === entry.pillar)
            .slice(0, 6)
            .map((e) => ({ id: e.id, title: e.title, source: "same-pillar" }));
        return {
            kind: "deterministic",
            source: "graph.same-pillar",
            suggestions: candidates,
        };
    }

    async lintRegistry({ registry } = {}) {
        if (!Array.isArray(registry)) {
            return { kind: "null", issues: [] };
        }
        return {
            kind: "deterministic",
            source: "editorial-checks.runEditorialChecks",
            issues: runEditorialChecks(registry),
        };
    }

    async draftRelease(context = {}) {
        if (!context.phase || !context.title || !context.summary) {
            return { kind: "null", draft: null };
        }
        return {
            kind: "deterministic",
            source: "changelog.draftReleaseEntry",
            draft: draftReleaseEntry(context),
        };
    }
}

let _publishingSingleton = null;

/**
 * getPublishingAssistant() — singleton factory. Reads
 * VITE_PUBLISHING_ASSISTANT at build time. v1 always returns the null
 * implementation. v2 will branch when the env var is configured.
 */
export function getPublishingAssistant() {
    if (_publishingSingleton) return _publishingSingleton;
    _publishingSingleton = new NullPublishingAssistant();
    return _publishingSingleton;
}

/** Capability check — surfaces hide AI affordances when this is false. */
export function isPublishingAssistantConfigured() {
    return false;
}
