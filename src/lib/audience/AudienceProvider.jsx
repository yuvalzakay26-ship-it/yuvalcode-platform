// AudienceProvider — the React surface for the ecosystem-memory layer.
//
// The provider mounts once at the app root. It does NOT own the audience
// snapshot (that lives in the module-scoped store at `./store`); the provider
// is responsible only for the side-effects that translate router events
// into memory mutations:
//
//   - Bumping the session counter on first mount.
//   - Recording a route visit on every navigation.
//
// Consumers read memory via `useSyncExternalStore` through the hooks
// exported below. This pattern eliminates the React 18+ `set-state-in-effect`
// anti-pattern entirely — every render reads a fresh snapshot from the store,
// every mutation updates the store and broadcasts to subscribers.
//
// The hooks degrade gracefully when no provider is mounted (e.g. tests,
// Storybook frames): the snapshot reads continue to work because the store
// is module-scoped, and the actions become no-op-only-on-write.

import { createContext, useContext, useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { useLocation } from "react-router-dom";
import { resetAudienceMemory } from "./storage";
import {
    applyMutation,
    getSnapshot,
    refreshFromStorage,
    subscribe,
} from "./store";
import {
    bookmarkPathway,
    dismissOnboarding,
    dismissWelcomeBack,
    getVisitorTier,
    recordEntryRead,
    recordPathwayProgress,
    recordSession,
    recordVisit,
    recordWatched,
    setEntryPath,
    setFollowing,
    shouldShowOnboarding,
    shouldShowWelcomeBack,
    unbookmarkPathway,
    VISITOR_TIER,
} from "./memory";
import {
    buildExploreNextRail,
    continueExploringSurface,
    rankedPillarSurfaces,
    suggestNextSurface,
} from "./progression";

const AudienceContext = createContext(null);

export function AudienceProvider({ children }) {
    const location = useLocation();
    const sessionRecordedRef = useRef(false);
    const lastRecordedPathRef = useRef(null);

    // Record a session bump exactly once per provider mount. The store
    // notifies subscribers automatically — no setState here.
    useEffect(() => {
        if (sessionRecordedRef.current) return;
        sessionRecordedRef.current = true;
        applyMutation((mem) => recordSession(mem));
    }, []);

    // Route-change recorder. Records every navigation (including the initial
    // route) into the audience continuity log, debounced by path so a
    // re-render of the same path doesn't churn storage.
    useEffect(() => {
        const path = location.pathname;
        if (!path) return;
        if (lastRecordedPathRef.current === path) return;
        lastRecordedPathRef.current = path;
        applyMutation((mem) => recordVisit(mem, path));
    }, [location.pathname]);

    // ------------------------------------------------------------------
    // Action set — wraps the store's `applyMutation`. Stable reference so
    // memoising consumers don't re-render on every action change.
    // ------------------------------------------------------------------

    const actions = useMemo(() => ({
        recordEntryRead: (payload) => applyMutation((mem) => recordEntryRead(mem, payload)),
        recordWatched: (payload) => applyMutation((mem) => recordWatched(mem, payload)),
        bookmarkPathway: (id) => applyMutation((mem) => bookmarkPathway(mem, id)),
        unbookmarkPathway: (id) => applyMutation((mem) => unbookmarkPathway(mem, id)),
        recordPathwayProgress: (id, step) => applyMutation((mem) => recordPathwayProgress(mem, id, step)),
        setEntryPath: (entryPath) => applyMutation((mem) => setEntryPath(mem, entryPath)),
        dismissOnboarding: () => applyMutation((mem) => dismissOnboarding(mem)),
        dismissWelcomeBack: () => applyMutation((mem) => dismissWelcomeBack(mem)),
        setFollowing: (value) => applyMutation((mem) => setFollowing(mem, value)),
        forgetMe: () => {
            resetAudienceMemory();
            refreshFromStorage();
        },
    }), []);

    return (
        <AudienceContext.Provider value={actions}>
            {children}
        </AudienceContext.Provider>
    );
}

// ---------------------------------------------------------------------------
// Hooks — every consumer goes through these so the storage layer stays
// invisible to UI surfaces.
// ---------------------------------------------------------------------------

const noopActions = Object.freeze({
    recordEntryRead: () => {},
    recordWatched: () => {},
    bookmarkPathway: () => {},
    unbookmarkPathway: () => {},
    recordPathwayProgress: () => {},
    setEntryPath: () => {},
    dismissOnboarding: () => {},
    dismissWelcomeBack: () => {},
    setFollowing: () => {},
    forgetMe: () => {},
});

export function useAudience() {
    return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function useAudienceActions() {
    return useContext(AudienceContext) || noopActions;
}

export function useVisitorTier() {
    const memory = useAudience();
    return useMemo(() => getVisitorTier(memory), [memory]);
}

export function useShouldShowOnboarding() {
    const memory = useAudience();
    return useMemo(() => shouldShowOnboarding(memory), [memory]);
}

export function useShouldShowWelcomeBack() {
    const memory = useAudience();
    return useMemo(() => shouldShowWelcomeBack(memory), [memory]);
}

export function useExploreNext(currentPath, { limit = 3 } = {}) {
    const memory = useAudience();
    return useMemo(
        () => buildExploreNextRail(memory, currentPath, { limit }),
        [memory, currentPath, limit]
    );
}

export function useContinueExploring(currentPath) {
    const memory = useAudience();
    return useMemo(
        () => continueExploringSurface(memory, currentPath),
        [memory, currentPath]
    );
}

export function useSuggestedNextSurface(currentPath, opts) {
    const memory = useAudience();
    // Note: `opts` is unstable across renders by reference; the sub-fields
    // are accepted as-is. Callers should memoise when passing complex opts.
    return useMemo(
        () => suggestNextSurface(memory, currentPath, opts),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [memory, currentPath, JSON.stringify(opts || null)]
    );
}

export function useRankedPillarSurfaces({ limit = 4 } = {}) {
    const memory = useAudience();
    return useMemo(() => rankedPillarSurfaces(memory, { limit }), [memory, limit]);
}

// Convenience callback re-export for any consumer that wants to imperatively
// peek at the current snapshot (e.g. analytics events that fire outside
// React render). Reads through the same store as the hooks.
export { getSnapshot as readAudienceSnapshot };

// Phase 3.4-ready: the visitor-tier enum is part of the public contract.
export { VISITOR_TIER };
