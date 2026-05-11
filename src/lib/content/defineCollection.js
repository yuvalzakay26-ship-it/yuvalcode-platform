// Collection definition helper.
//
// Each entry in src/content/collections.js calls defineCollection() to register
// a typed list. The helper enforces the schema contract (REQUIRED_FIELDS), fills
// in defaults where the editorial layer is allowed to omit them, and returns a
// frozen list so consumers cannot mutate collection state at runtime.
//
// Future MDX/CMS adapters will hand their parsed entries to this same helper —
// the contract is the integration boundary.

import { isPillarId } from "./pillars";
import { isValidTag } from "./taxonomy";
import {
    CONTENT_STATUS,
    CONTENT_VISIBILITY,
    REQUIRED_FIELDS,
} from "./schema";

const isDev = import.meta.env?.DEV ?? false;

function warnDev(message, entry) {
    if (!isDev) return;
    console.warn(`[content] ${message}`, entry);
}

function withDefaults(entry) {
    // The Body field is a React component (or null). It is preserved as-is —
    // never frozen/cloned — so JSX renderers can call it. Object.freeze on the
    // wrapper is enough; the component reference inside stays callable.
    return Object.freeze({
        status: CONTENT_STATUS.LIVE,
        visibility: CONTENT_VISIBILITY.PUBLIC,
        date: null,
        tags: [],
        related: [],
        eyebrow: null,
        coverImage: null,
        externalSource: null,
        href: null,
        readingMinutes: null,
        Body: null,
        author: null,
        updatedAt: null,
        ...entry,
    });
}

/**
 * defineCollection(name, entries) — validates, normalizes, and freezes a collection.
 *
 * @param {string} name           collection slug (e.g. "articles", "case-studies")
 * @param {Array}  rawEntries     entries conforming to schema.js
 * @returns {{ name, entries, byId }}
 */
export function defineCollection(name, rawEntries = []) {
    if (!Array.isArray(rawEntries)) {
        throw new TypeError(`Collection "${name}" must be an array.`);
    }

    const seen = new Set();
    const normalized = [];

    for (const raw of rawEntries) {
        for (const field of REQUIRED_FIELDS) {
            if (!raw?.[field]) {
                warnDev(`Skipping entry missing required field "${field}" in "${name}".`, raw);
                continue;
            }
        }

        if (seen.has(raw.id)) {
            warnDev(`Duplicate id "${raw.id}" in "${name}" — skipping later occurrence.`, raw);
            continue;
        }
        seen.add(raw.id);

        if (raw.pillar && !isPillarId(raw.pillar)) {
            warnDev(`Unknown pillar "${raw.pillar}" on entry "${raw.id}" in "${name}".`, raw);
        }

        if (Array.isArray(raw.tags)) {
            for (const tag of raw.tags) {
                if (!isValidTag(tag)) warnDev(`Unknown tag "${tag}" on entry "${raw.id}".`, raw);
            }
        }

        normalized.push(withDefaults(raw));
    }

    const byId = new Map(normalized.map((e) => [e.id, e]));

    return Object.freeze({
        name,
        entries: Object.freeze(normalized),
        byId,
    });
}
