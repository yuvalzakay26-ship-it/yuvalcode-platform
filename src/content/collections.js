// Collection registry — the editorial inventory of YuvalCode.
//
// Each entry is its own JSX module under src/content/<collection>/<slug>.jsx.
// The module exports `entry` (frontmatter conforming to schema.js) plus a
// `Body` component (rendered inside <Prose> on the entry page).
//
// This shape is the JSX-as-MDX architecture documented in
// EDITORIAL_ACTIVATION_REPORT.md §1: zero new dependencies, full JSX, future
// MDX adapter is a one-line swap (compile MDX to a React component, assign
// it to entry.Body, push through defineCollection() — consumers unchanged).
//
// Adding an entry:
//   1. Create src/content/<collection>/<slug>.jsx exporting `entry` + Body.
//   2. Import the module here and append `<module>.entry` to the collection.
//   3. defineCollection() validates the shape in dev and freezes it for prod.

import { defineCollection } from "../lib/content/defineCollection";

// ─── Articles ────────────────────────────────────────────────────────
import { entry as articlePublication } from "./articles/why-yuvalcode-is-a-publication-not-a-portfolio";
import { entry as articleHebrewRtl } from "./articles/hebrew-rtl-typography-deep-dive";

// ─── AI Experiments ──────────────────────────────────────────────────
import { entry as expEvalHarness } from "./ai-experiments/agent-eval-harness-v1";
import { entry as expSubagents } from "./ai-experiments/claude-code-subagents-in-production";

// ─── Workflows ───────────────────────────────────────────────────────
import { entry as wfObsidianClaude } from "./workflows/obsidian-claude-publishing-flow";
import { entry as wfShippingCadence } from "./workflows/shipping-cadence-weekly";

// ─── Case Studies ────────────────────────────────────────────────────
import { entry as csYuvalCodePlatform } from "./case-studies/yuvalcode-platform-architecture";

// ─── Changelog ───────────────────────────────────────────────────────
import { entry as cl31EditorialActivation } from "./changelogs/phase-3-1-editorial-activation";
import { entry as cl30PlatformIntelligence } from "./changelogs/phase-3-platform-intelligence";
import { entry as cl25WorkWithMe } from "./changelogs/phase-2-5-work-with-me";

// ─── Research Notes ──────────────────────────────────────────────────
import { entry as rnRagRerank } from "./research-notes/rag-rerank-observations";

export const articles = defineCollection("articles", [
    articlePublication,
    articleHebrewRtl,
]);

export const caseStudies = defineCollection("case-studies", [
    csYuvalCodePlatform,
]);

export const aiExperiments = defineCollection("ai-experiments", [
    expEvalHarness,
    expSubagents,
]);

export const workflows = defineCollection("workflows", [
    wfObsidianClaude,
    wfShippingCadence,
]);

export const changelogs = defineCollection("changelogs", [
    cl31EditorialActivation,
    cl30PlatformIntelligence,
    cl25WorkWithMe,
]);

export const researchNotes = defineCollection("research-notes", [
    rnRagRerank,
]);

// Newsletters collection is preserved from Phase 3.0 — empty by design.
// Newsletter ISSUES will be authored as standard editorial entries when the
// real newsletter provider lands; until then, the deferred funnel via
// /contact?subject=newsletter is the canonical signup surface.
export const newsletters = defineCollection("newsletters", []);

export const COLLECTIONS = Object.freeze({
    articles,
    caseStudies,
    aiExperiments,
    workflows,
    changelogs,
    researchNotes,
    newsletters,
});

// Useful for content/index queries that don't care about collection boundaries.
export function flatEntries() {
    return [
        ...articles.entries,
        ...caseStudies.entries,
        ...aiExperiments.entries,
        ...workflows.entries,
        ...changelogs.entries,
        ...researchNotes.entries,
        ...newsletters.entries,
    ];
}
