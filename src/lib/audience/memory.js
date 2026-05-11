// Pure mutators over the audience-memory shape.
//
// Every function takes a memory snapshot + an event and returns a new memory
// snapshot. They are pure so the AudienceProvider can compose them inside
// `mutateMemory()` without storage concerns leaking into the call sites.
//
// The companion module `routePillarMap.js` resolves which pillar a route
// activates; this file stays storage-agnostic.

import { LIMITS, decayAffinity } from "./storage";
import { resolvePillarForPath, resolveSurfaceForPath } from "./routePillarMap";

const RETURN_THRESHOLD_MS = 30 * 60 * 1000; // 30 min — anything beyond is a "return"
const NEW_LOOKBACK_MS = 7 * 24 * 60 * 60 * 1000; // 7 days — "new since last visit"

// ---------------------------------------------------------------------------
// Identity progression
// ---------------------------------------------------------------------------

/**
 * Record a generic site presence — fired once per session start. Bumps the
 * visit count only when the previous session ended more than RETURN_THRESHOLD_MS
 * ago, otherwise it just refreshes lastSeen so the in-session jitter doesn't
 * inflate the counter.
 */
export function recordSession(memory, now = Date.now()) {
    const id = memory.identity || {};
    const elapsed = id.lastSeen ? now - id.lastSeen : Infinity;
    const isReturn = elapsed >= RETURN_THRESHOLD_MS;

    return {
        ...memory,
        identity: {
            firstSeen: id.firstSeen || now,
            lastSeen: now,
            visitCount: (id.visitCount || 0) + (isReturn ? 1 : 0),
            sessionStart: isReturn ? now : id.sessionStart || now,
            previousLastSeen: isReturn ? id.lastSeen : id.previousLastSeen || null,
        },
    };
}

// ---------------------------------------------------------------------------
// Recently visited routes (continuity log)
// ---------------------------------------------------------------------------

/**
 * Record a route visit. Bounded ring buffer (LIMITS.visits). Pillar affinity
 * is incremented when the route maps to a pillar.
 */
export function recordVisit(memory, path, now = Date.now()) {
    if (!path) return memory;
    const surface = resolveSurfaceForPath(path);
    if (!surface) return memory;

    const pillar = resolvePillarForPath(path);

    const entry = { path, surface, pillar: pillar || null, ts: now };
    const visits = [entry, ...(memory.visits || []).filter((v) => v.path !== path)]
        .slice(0, LIMITS.visits);

    const pillars = pillar ? bumpPillar(memory.pillars || {}, pillar, 1, now) : memory.pillars || {};

    return { ...memory, visits, pillars };
}

/**
 * Record an editorial entry (article / changelog / case study) read.
 * Bounded ring buffer; reorders an existing entry to the top instead of
 * duplicating it.
 */
export function recordEntryRead(memory, { entryId, slug, collection, pillar, title }, now = Date.now()) {
    if (!entryId) return memory;
    const entry = { entryId, slug, collection, pillar: pillar || null, title: title || null, ts: now };
    const entries = [entry, ...(memory.entries || []).filter((e) => e.entryId !== entryId)]
        .slice(0, LIMITS.entries);

    const pillars = pillar
        ? bumpPillar(memory.pillars || {}, pillar, 1.5, now) // editorial reads weigh slightly more than route taps
        : memory.pillars || {};

    return { ...memory, entries, pillars };
}

/**
 * Record a watched video (YouTube external nav). Bounded ring buffer.
 * Stores the videoId + title only — no playback position, no view duration.
 */
export function recordWatched(memory, { videoId, title, topic, examTitle }, now = Date.now()) {
    if (!videoId) return memory;
    const entry = {
        videoId,
        title: title || null,
        topic: topic || null,
        examTitle: examTitle || null,
        ts: now,
    };
    const watched = [entry, ...(memory.watched || []).filter((v) => v.videoId !== videoId)]
        .slice(0, LIMITS.watched);

    // Watching tilts the affinity toward the programming/mahat axis since
    // those are the bulk of the catalog today.
    const pillars = bumpPillar(memory.pillars || {}, "mahat", 0.5, now);

    return { ...memory, watched, pillars };
}

// ---------------------------------------------------------------------------
// Pillar affinity
// ---------------------------------------------------------------------------

function bumpPillar(pillars, pillarId, delta, now) {
    const current = pillars[pillarId];
    const decayed = current
        ? decayAffinity(current.score, current.lastTouchedTs, now)
        : 0;
    return {
        ...pillars,
        [pillarId]: {
            score: decayed + delta,
            lastTouchedTs: now,
        },
    };
}

/**
 * Snapshot of the pillar affinity ranking, decayed to `now`. Returns an
 * ordered list of `{ pillar, score }` highest-first. Empty arrays are fine —
 * the caller decides whether to fall back to a neutral default.
 */
export function rankedPillars(memory, { now = Date.now(), limit = 8 } = {}) {
    const entries = Object.entries(memory.pillars || {});
    if (entries.length === 0) return [];
    return entries
        .map(([id, raw]) => {
            const score = decayAffinity(raw?.score || 0, raw?.lastTouchedTs || 0, now);
            return { pillar: id, score };
        })
        .filter((e) => e.score > 0.01) // filter long-decayed entries
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
}

/**
 * Most-engaged pillar at the present moment. `null` if the visitor has not
 * accumulated any signal yet.
 */
export function topPillar(memory, now = Date.now()) {
    const ranked = rankedPillars(memory, { now, limit: 1 });
    return ranked[0]?.pillar || null;
}

// ---------------------------------------------------------------------------
// Returning-user signals
// ---------------------------------------------------------------------------

export const VISITOR_TIER = Object.freeze({
    NEW: "new",                 // first session, never seen before
    FRESH_RETURN: "fresh-return", // came back within 30 min (same arc)
    RETURNING: "returning",      // came back after >30 min
    DEEP_RETURN: "deep-return",  // 5+ visits, looks like a regular
});

export function getVisitorTier(memory, now = Date.now()) {
    const id = memory.identity || {};
    const visits = id.visitCount || 0;

    if (visits === 0) return VISITOR_TIER.NEW;
    if (visits >= 5) return VISITOR_TIER.DEEP_RETURN;

    const elapsedSinceLast = id.lastSeen ? now - id.lastSeen : Infinity;
    if (elapsedSinceLast < RETURN_THRESHOLD_MS) return VISITOR_TIER.FRESH_RETURN;

    return VISITOR_TIER.RETURNING;
}

/**
 * The single most recent route the visitor has visited (excluding the
 * current path, if provided). Used by the "pick up where you left off" rail.
 */
export function getMostRecentVisit(memory, { exclude } = {}) {
    const visits = memory.visits || [];
    return visits.find((v) => v.path !== exclude) || null;
}

/**
 * Returns the visits list filtered by a minimum age (default 0).
 * The "since last visit" surface uses this with a 7-day window so it doesn't
 * spam every fresh-return.
 */
export function getRecentVisits(memory, { exclude, limit = 5 } = {}) {
    return (memory.visits || [])
        .filter((v) => v.path !== exclude)
        .slice(0, limit);
}

/**
 * Was the visitor last seen long enough ago that "new since your last visit"
 * is meaningful? Returns the timestamp threshold to compare new entries
 * against, or `null` if the lookup is not interesting.
 */
export function getSinceLastVisitThreshold(memory, now = Date.now()) {
    const id = memory.identity || {};
    if (!id.previousLastSeen) return null;
    if (now - id.previousLastSeen > NEW_LOOKBACK_MS) return null;
    return id.previousLastSeen;
}

// ---------------------------------------------------------------------------
// Preferences
// ---------------------------------------------------------------------------

export function setPreferences(memory, patch) {
    return {
        ...memory,
        preferences: { ...(memory.preferences || {}), ...(patch || {}) },
    };
}

export function dismissWelcomeBack(memory, now = Date.now()) {
    return setPreferences(memory, { welcomeBackDismissedAt: now });
}

export function shouldShowWelcomeBack(memory, now = Date.now()) {
    const tier = getVisitorTier(memory, now);
    if (tier === VISITOR_TIER.NEW) return false;
    if (tier === VISITOR_TIER.FRESH_RETURN) return false;
    const dismissedAt = memory.preferences?.welcomeBackDismissedAt;
    if (!dismissedAt) return true;
    // The strip re-appears only if a true return happened after the dismissal.
    const id = memory.identity || {};
    return (id.previousLastSeen || 0) > dismissedAt;
}

export function setEntryPath(memory, entryPath) {
    return setPreferences(memory, { entryPath, onboardingDismissed: true });
}

export function dismissOnboarding(memory) {
    return setPreferences(memory, { onboardingDismissed: true });
}

export function shouldShowOnboarding(memory) {
    const tier = getVisitorTier(memory);
    if (tier !== VISITOR_TIER.NEW) return false;
    if (memory.preferences?.onboardingDismissed) return false;
    if (memory.preferences?.entryPath) return false;
    return true;
}

export function setFollowing(memory, value) {
    return setPreferences(memory, { followsCreator: !!value });
}

// ---------------------------------------------------------------------------
// Pathway progression
// ---------------------------------------------------------------------------

export function bookmarkPathway(memory, pathwayId) {
    if (!pathwayId) return memory;
    const bookmarked = Array.from(new Set([...(memory.pathways?.bookmarked || []), pathwayId]));
    return {
        ...memory,
        pathways: { ...(memory.pathways || {}), bookmarked },
    };
}

export function unbookmarkPathway(memory, pathwayId) {
    const bookmarked = (memory.pathways?.bookmarked || []).filter((id) => id !== pathwayId);
    return {
        ...memory,
        pathways: { ...(memory.pathways || {}), bookmarked },
    };
}

export function recordPathwayProgress(memory, pathwayId, step, now = Date.now()) {
    if (!pathwayId) return memory;
    const started = { ...(memory.pathways?.started || {}) };
    started[pathwayId] = { step: step ?? 0, ts: now };
    return {
        ...memory,
        pathways: { ...(memory.pathways || {}), started },
    };
}
