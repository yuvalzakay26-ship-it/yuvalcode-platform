// Future creator-assistant interface.
//
// PHASE 3.0 SHIPS NO ASSISTANT UI. This file is intentionally a contract,
// not an implementation. When the assistant arrives — as a Claude-backed
// learning copilot, a content recommender, or a build-in-public companion —
// it will land behind this interface and the rest of the platform will not
// need to change.

import { extractSemanticMetadata } from "./metadata";
import { recommendForEntry, recommendSurfacesFrom } from "./recommend";

/**
 * @typedef {Object} AssistantQueryOptions
 * @property {string}   [pillar]       — restrict the answer to one pillar
 * @property {string}   [entryId]      — anchor the answer in a known entry
 * @property {string}   [surface]      — current route, for context
 * @property {string}   [locale]       — "he" | "en" — defaults to Hebrew
 * @property {number}   [resultLimit]  — soft cap for recommendation surfaces
 * @property {AbortSignal} [signal]    — caller-provided cancellation
 */

/**
 * The contract every concrete assistant must satisfy. v1 ships only the
 * NullAssistant — every method is a deterministic, side-effect-free stub.
 */
export class CreatorAssistant {
    /** Free-form question against the ecosystem corpus. */
    // eslint-disable-next-line no-unused-vars
    async ask(prompt, options = {}) {
        throw new Error("CreatorAssistant.ask not implemented.");
    }

    /** Suggest content/pillars/surfaces for a partial query. */
    // eslint-disable-next-line no-unused-vars
    async suggest(query, options = {}) {
        throw new Error("CreatorAssistant.suggest not implemented.");
    }

    /** Explain a content entry in plain language. */
    // eslint-disable-next-line no-unused-vars
    async explain(entryId, options = {}) {
        throw new Error("CreatorAssistant.explain not implemented.");
    }

    /** "What should I read next?" — re-ranks recommendForEntry by intent. */
    // eslint-disable-next-line no-unused-vars
    async whatsNext(context = {}) {
        throw new Error("CreatorAssistant.whatsNext not implemented.");
    }
}

/**
 * NullAssistant — the only concrete implementation in v1. Every method
 * resolves to a deterministic, non-AI value derived from the existing graph.
 * Surfaces can call these methods today (gated behind a feature flag) and
 * trivially upgrade to a real assistant later.
 */
export class NullAssistant extends CreatorAssistant {
    constructor() {
        super();
        this.kind = "null";
    }

    async ask() {
        return {
            kind: "null",
            answer: null,
            reason: "assistant-not-configured",
            sources: [],
        };
    }

    async suggest(query) {
        return {
            kind: "null",
            query: query || "",
            suggestions: [],
        };
    }

    async explain(entryId) {
        return {
            kind: "null",
            entryId,
            metadata: extractSemanticMetadata({ id: entryId }),
            explanation: null,
        };
    }

    async whatsNext({ entryId, surface } = {}) {
        if (entryId) return { kind: "graph", recommendations: recommendForEntry(entryId) };
        if (surface) return { kind: "surface", recommendations: recommendSurfacesFrom(surface) };
        return { kind: "null", recommendations: [] };
    }
}

let _assistantSingleton = null;

/**
 * getAssistant() — singleton factory. Reads VITE_ASSISTANT_PROVIDER at
 * build time. v1 ignores the value and always returns NullAssistant; v2
 * will branch to a Claude-backed implementation when the provider is
 * configured. Call sites that need the assistant must call this and expect
 * a `CreatorAssistant` instance, never inspect the concrete class.
 */
export function getAssistant() {
    if (_assistantSingleton) return _assistantSingleton;
    _assistantSingleton = new NullAssistant();
    return _assistantSingleton;
}

/** Capability check — surfaces should hide the assistant UI when this is false. */
export function isAssistantConfigured() {
    return false;
}
