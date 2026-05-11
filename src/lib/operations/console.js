// Future creator-console foundation.
//
// PHASE 3.4 SHIPS NO CONSOLE UI. This file is a contract — the boundary
// between "operations live in scripts" today and "operations live in a
// calm in-platform surface" tomorrow.
//
// The console, when it ships, will live at /console (NOT /dashboard,
// NOT /admin — see §1.2 of the contract: no dashboard chrome). It will
// be:
//   - Read-only for visitors. Always.
//   - Local-first for the creator: same audience-layer storage, no
//     server-of-record. The console is one more reader of public data.
//   - A *single* surface composing existing primitives (RelatedRail,
//     EntryCard, Callout, glass-panel-2). No new design language.
//   - Behind a feature flag (VITE_CREATOR_CONSOLE) until earned.
//
// This file ships only the descriptors and the null implementation. It
// is NOT imported by any page in v1.

/**
 * @typedef {Object} ConsolePanel
 * @property {string}  id          — stable id, kebab-case
 * @property {string}  title       — Hebrew title
 * @property {string}  source      — operations module that feeds it
 * @property {string}  description — one-line intent
 */

export const CONSOLE_PANELS = Object.freeze([
    Object.freeze({
        id: "publishing-queue",
        title: "תור פרסום",
        source: "publishing.derivePublishingPlan",
        description: "Drafts that pass shape, with footprint preview before merge.",
    }),
    Object.freeze({
        id: "ecosystem-health",
        title: "תקינות מערכת",
        source: "ecosystem-health.runEcosystemHealth",
        description: "Errors, warnings, info — sorted, with one-line remediation per row.",
    }),
    Object.freeze({
        id: "release-ledger",
        title: "יומן שיגורים",
        source: "release.RELEASE_PHASES",
        description: "Phase ledger with active-phase callout. No fake metrics.",
    }),
    Object.freeze({
        id: "changelog-draft",
        title: "טיוטת שיגור",
        source: "changelog.ChangelogComposer",
        description: "Compose-ready release-note skeleton from the active phase.",
    }),
    Object.freeze({
        id: "ecosystem-graph",
        title: "גרף האקוסיסטם",
        source: "ai/recommend.recommendForEntry",
        description: "Read-only view of related[] and same-pillar adjacency.",
    }),
]);

/**
 * The contract every concrete creator console must satisfy.
 * v1: NullCreatorConsole — every method resolves to a closed-state response.
 */
export class CreatorConsole {
    /** Capability check used by the surface to render-or-hide. */
    isAvailable() {
        return false;
    }
    /** List the panels exposed by this console implementation. */
    listPanels() {
        return [];
    }
    /** Resolve data for a single panel. */
    // eslint-disable-next-line no-unused-vars
    async getPanel(id) {
        throw new Error("CreatorConsole.getPanel not implemented.");
    }
}

export class NullCreatorConsole extends CreatorConsole {
    constructor() {
        super();
        this.kind = "null";
    }
    isAvailable() {
        return false;
    }
    listPanels() {
        return CONSOLE_PANELS;
    }
    async getPanel(id) {
        return {
            kind: "null",
            id,
            reason: "console-not-configured",
            data: null,
        };
    }
}

let _consoleSingleton = null;
export function getCreatorConsole() {
    if (_consoleSingleton) return _consoleSingleton;
    _consoleSingleton = new NullCreatorConsole();
    return _consoleSingleton;
}

export function isCreatorConsoleConfigured() {
    return false;
}
