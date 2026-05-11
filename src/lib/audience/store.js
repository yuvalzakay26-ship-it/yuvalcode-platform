// External mutable store for the audience layer.
//
// Wraps the storage module with a `useSyncExternalStore`-friendly subscribe
// surface so React re-renders flow automatically when memory changes —
// no setState-in-effect, no cascading re-renders, no React 19 lint warnings.
//
// The store is module-scoped so every consumer reads the same snapshot
// regardless of where the provider is mounted (or whether the provider is
// mounted at all — `useAudience` falls back gracefully to read-only mode).

import { mutateMemory, readMemory } from "./storage";

let snapshot = null;
const listeners = new Set();

function ensureSnapshot() {
    if (snapshot === null) snapshot = readMemory();
    return snapshot;
}

/**
 * Re-read storage and notify all subscribers if the snapshot has changed.
 * Called by the provider on mount (after a session bump) and after every
 * mutator. The reference equality check prevents redundant re-renders.
 */
function refresh() {
    const next = readMemory();
    if (next === snapshot) return next;
    snapshot = next;
    for (const listener of listeners) listener();
    return next;
}

export function getSnapshot() {
    return ensureSnapshot();
}

export function subscribe(listener) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

/**
 * Apply a mutator and broadcast the change to every subscriber.
 * Mirrors the public API of `storage.mutateMemory`, layered with subscriber
 * notification so React consumers see updates without manual setState calls.
 */
export function applyMutation(mutator) {
    const next = mutateMemory(mutator);
    snapshot = next;
    for (const listener of listeners) listener();
    return next;
}

/**
 * Force a re-read from storage and notify subscribers. Used after a
 * "forget me" wipe so consumers see the cold-start state immediately.
 */
export function refreshFromStorage() {
    return refresh();
}
