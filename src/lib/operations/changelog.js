// Changelog operations.
//
// The changelog collection is the public engineering log (§5.3). Operations
// here cover three jobs:
//
//   1. Compose a draft entry skeleton for a new release.
//   2. Summarize the existing changelog feed for an at-a-glance release
//      panel (used by /content/changelog and the eventual creator console).
//   3. Future swap-point: AI-assisted release-note synthesis. The `Composer`
//      contract here mirrors the assistant pattern in src/lib/ai/assistant.js
//      — a NullChangelogComposer is the only concrete implementation today.
//
// The contract IS the boundary. When automated changelog generation lands,
// the call sites do not change.

import { composeEntrySkeleton, slugify, todayIso } from "./authoring";
import { CONTENT_STATUS, CONTENT_VISIBILITY } from "../content/schema";

/**
 * draftReleaseEntry({ phase, title, summary, ... })
 *
 * Build a ready-to-paste changelog entry skeleton. Defaults use the existing
 * editorial conventions: eyebrow "Build in Public · Shipped", `creator-journey`
 * pillar, kebab-case id derived from the phase number.
 */
export function draftReleaseEntry({
    phase,
    title,
    summary,
    related = [],
    tags = ["build-in-public", "shipping", "release-notes"],
    date = todayIso(),
} = {}) {
    if (!phase || !title || !summary) {
        throw new Error("draftReleaseEntry requires { phase, title, summary }.");
    }
    const slug = slugify(`phase-${phase}-${title}`);
    const id = slug;
    return composeEntrySkeleton({
        collection: "changelogs",
        type: "changelog",
        typeImport: "CONTENT_TYPES.CHANGELOG",
        id,
        slug,
        pillar: "creator-journey",
        title,
        summary,
        eyebrow: "Build in Public · Shipped",
        tags,
        related,
        date,
    });
}

/**
 * summarizeChangelog(entries, { limit })
 *
 * Reduce a list of changelog entries to a release-centric snapshot. Used by
 * any operations surface that wants "what's the last 5 releases at a glance"
 * without re-deriving the timeline shape inline.
 */
export function summarizeChangelog(entries, { limit = 5 } = {}) {
    if (!Array.isArray(entries)) return [];
    return entries
        .filter(
            (e) =>
                e.status === CONTENT_STATUS.LIVE &&
                e.visibility === CONTENT_VISIBILITY.PUBLIC,
        )
        .slice()
        .sort((a, b) => {
            if (!a.date && !b.date) return 0;
            if (!a.date) return 1;
            if (!b.date) return -1;
            return b.date.localeCompare(a.date);
        })
        .slice(0, limit)
        .map((entry) => ({
            id: entry.id,
            slug: entry.slug,
            date: entry.date,
            title: entry.title,
            summary: entry.summary,
            eyebrow: entry.eyebrow,
            href: entry.href || `/content/changelog/${entry.slug}`,
        }));
}

/**
 * Forward-compatible composer interface. Every concrete composer accepts a
 * `compose(context)` call and returns a draft string. Today's only concrete
 * implementation derives the draft from `draftReleaseEntry`. Tomorrow's
 * implementation may consult git history + AI summarization.
 */
export class ChangelogComposer {
    /** @param {object} context — { phase, title, summary, ... } */
    // eslint-disable-next-line no-unused-vars
    async compose(context) {
        throw new Error("ChangelogComposer.compose not implemented.");
    }
}

export class NullChangelogComposer extends ChangelogComposer {
    constructor() {
        super();
        this.kind = "null";
    }
    async compose(context) {
        return {
            kind: "null",
            source: "deterministic-skeleton",
            draft: draftReleaseEntry(context),
        };
    }
}

let _composerSingleton = null;
export function getChangelogComposer() {
    if (_composerSingleton) return _composerSingleton;
    _composerSingleton = new NullChangelogComposer();
    return _composerSingleton;
}

export function isChangelogComposerConfigured() {
    return false;
}
