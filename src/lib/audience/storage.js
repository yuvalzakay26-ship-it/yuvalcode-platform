// Versioned, migration-safe localStorage wrapper for the audience layer.
//
// Phase 3.3 introduces ecosystem memory: a persistent record of what the
// visitor has explored, the pillars they have leaned into, the videos they
// have watched, and a small set of preferences that drive returning-user UX.
//
// Design constraints:
//   - Local-first. Nothing leaves the browser. No cookies, no fingerprinting,
//     no third-party identifiers. Future cross-device sync slots in behind
//     the same `read()` / `write()` API (see §11 of AUDIENCE_RETENTION_REPORT).
//   - SSR-safe. Every accessor short-circuits when `window` / `localStorage`
//     are unavailable. The architecture is React 19-compatible and ready
//     for any future SSR/SSG migration.
//   - Quota-resilient. Storage failures (Safari private mode, quota
//     exceeded) degrade silently — the platform still renders, the visitor
//     just gets a cold-start experience.
//   - Version-safe. Every read passes through a migration step. When the
//     shape evolves, old payloads upgrade rather than reset.
//   - Privacy-conscious. The visitor can wipe everything in one call
//     (`resetAudienceMemory`); a "forget me" affordance is exposed via
//     the AudienceProvider hooks.

const ROOT_KEY = "yc_audience_v1";
const CURRENT_VERSION = 1;

// Bounded buffers — never let a hot tab grow unbounded.
export const LIMITS = Object.freeze({
    visits: 20,        // recently visited routes
    watched: 10,       // recently watched videos
    entries: 12,       // recently read editorial entries
});

// Affinity decay window — pillar weights age out over time so a 6-month-old
// session doesn't permanently bias today's recommendations.
const AFFINITY_HALF_LIFE_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

function isBrowser() {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readRaw() {
    if (!isBrowser()) return null;
    try {
        const raw = window.localStorage.getItem(ROOT_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== "object") return null;
        return parsed;
    } catch {
        // Malformed JSON or localStorage unreadable. Treat as cold start.
        return null;
    }
}

function writeRaw(value) {
    if (!isBrowser()) return false;
    try {
        window.localStorage.setItem(ROOT_KEY, JSON.stringify(value));
        return true;
    } catch {
        // Quota exceeded, private mode, etc. — fail silently.
        return false;
    }
}

/**
 * Default empty memory shape. New shape fields must be added here AND in the
 * migration step below so older payloads pick them up.
 */
function emptyMemory() {
    const now = Date.now();
    return {
        version: CURRENT_VERSION,
        identity: {
            firstSeen: now,
            lastSeen: now,
            visitCount: 0,
            sessionStart: now,
        },
        visits: [],
        watched: [],
        entries: [],
        pillars: {},
        preferences: {
            entryPath: null,
            onboardingDismissed: false,
            welcomeBackDismissedAt: null,
            followsCreator: false,
            lastSeenChangelogTs: null,
        },
        pathways: {
            bookmarked: [],
            started: {},
        },
    };
}

/**
 * Migration step. The current shape is small, so v1 → v1 is identity. Future
 * versions add a switch case per bump and write the upgraded shape back.
 */
function migrate(stored) {
    if (!stored || typeof stored !== "object") return emptyMemory();
    const version = stored.version || 0;
    const fresh = emptyMemory();

    // v1 → v1: pass-through; just merge any missing top-level keys so
    // downstream code can rely on every nested shape existing.
    if (version === 1) {
        return {
            version: CURRENT_VERSION,
            identity: { ...fresh.identity, ...(stored.identity || {}) },
            visits: Array.isArray(stored.visits) ? stored.visits : [],
            watched: Array.isArray(stored.watched) ? stored.watched : [],
            entries: Array.isArray(stored.entries) ? stored.entries : [],
            pillars: stored.pillars && typeof stored.pillars === "object" ? stored.pillars : {},
            preferences: { ...fresh.preferences, ...(stored.preferences || {}) },
            pathways: {
                bookmarked: Array.isArray(stored.pathways?.bookmarked) ? stored.pathways.bookmarked : [],
                started: stored.pathways?.started && typeof stored.pathways.started === "object"
                    ? stored.pathways.started
                    : {},
            },
        };
    }

    // Unknown / older versions → treat as cold start. Preserve identity if
    // present so a long-time visitor still feels recognized after a schema
    // evolution.
    if (stored.identity?.firstSeen) {
        return {
            ...fresh,
            identity: { ...fresh.identity, firstSeen: stored.identity.firstSeen },
        };
    }
    return fresh;
}

/**
 * Read-with-migration. Always returns a complete shape. Never throws.
 */
export function readMemory() {
    const stored = readRaw();
    if (!stored) return emptyMemory();
    return migrate(stored);
}

/**
 * Persist a memory shape. Does not throw on quota errors.
 */
export function writeMemory(memory) {
    if (!memory) return false;
    return writeRaw({ ...memory, version: CURRENT_VERSION });
}

/**
 * Apply a mutator to the current memory shape and persist the result.
 * The mutator MAY return either a new memory object or mutate in place;
 * we always persist the returned value, falling back to the argument if
 * the mutator returns nothing.
 */
export function mutateMemory(mutator) {
    const current = readMemory();
    const next = mutator(current) || current;
    writeMemory(next);
    return next;
}

/**
 * Privacy-respecting wipe. Returns the visitor to cold-start state.
 */
export function resetAudienceMemory() {
    if (!isBrowser()) return false;
    try {
        window.localStorage.removeItem(ROOT_KEY);
        return true;
    } catch {
        return false;
    }
}

/**
 * Time-decay helper used by the affinity scorer. A pillar weight ages by
 * roughly half every AFFINITY_HALF_LIFE_MS so old sessions don't bias today's
 * recommendations forever.
 */
export function decayAffinity(score, lastTouchedTs, now = Date.now()) {
    if (!Number.isFinite(score) || score <= 0) return 0;
    if (!Number.isFinite(lastTouchedTs)) return score;
    const elapsed = Math.max(0, now - lastTouchedTs);
    if (elapsed === 0) return score;
    const halfLives = elapsed / AFFINITY_HALF_LIFE_MS;
    return score * Math.pow(0.5, halfLives);
}

export const AUDIENCE_STORAGE_KEY = ROOT_KEY;
