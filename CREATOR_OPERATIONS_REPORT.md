# CREATOR_OPERATIONS_REPORT.md

**Phase:** 3.4 — Creator Operations System
**Date:** 2026-05-07
**Status:** Shipped. Operational layer is live; runtime surface is unchanged.
**Operating contract:** Subordinate to `YUVALCODE_PLATFORM_CONTRACT.md`. Where this report and the contract conflict, the contract wins.

> Phase 3.0 shipped the *layer*. Phase 3.1 shipped the *voice*. Phase 3.2 shipped *distribution*. Phase 3.3 shipped the *creator stack*.
> Phase 3.4 turns the platform from "intelligent creator platform" into "operational creator machine" — without adding a single byte to the runtime bundle.

---

## 0. Operating thesis

The platform already publishes itself: one new entry hydrates 11+ surfaces (search, sitemap, feeds × 3, JSON-LD, breadcrumbs, OG, related rails, content hub, ecosystem graph, distribution snapshot). Phase 3.4 adds the **operational reflection** of that machinery — pure functions and CLI tools that an operator (or, eventually, an AI assistant) calls *outside the runtime* to plan, validate, and stamp the work.

Three rules govern this layer:

1. **Operations stay invisible.** No dashboard, no admin chrome, no in-page console. §14.1 forbids dashboard aesthetics. The operational surface lives in `src/lib/operations/` and `scripts/operations/` — never imported by a page or section.
2. **The contract IS the boundary.** Each subsystem ships an interface (`PublishingAssistant`, `ChangelogComposer`, `CreatorConsole`) with a `Null*` default. v1 returns deterministic, sourced values; v2 swaps in a real implementation behind the same interface.
3. **Filesystem-native.** Authoring helpers produce strings — `.jsx` skeletons the operator pastes into `src/content/<collection>/<slug>.jsx`. The medium is still files, still git, still PRs. Operations *help compose* the file; they do not *write* it.

Nothing in this phase ships a visitor-facing UI. Bundle: unaffected.

---

## 1. Publishing workflow architecture

The publishing workflow is a single, pure-function pipeline:

```
draft entry  →  validateEntryShape       (errors block merge)
             →  validateEditorialPolish  (warnings inform)
             →  derivePublicationFootprint (preview the 11+ surfaces)
             ⇣
         derivePublishingPlan
             ⇣
        { ok, issues, footprint }
```

**Module:** `src/lib/operations/publishing.js`

- **`OPERATION_SEVERITY`** — three tiers: `error` (block), `warn` (inform), `info` (nudge).
- **`validateEntryShape(entry)`** — same fields `defineCollection()` already validates, but expressed as a structured issue list rather than dev console warnings. Operational tooling (scripts, future console UI, CI) consumes this list.
- **`validateEditorialPolish(entry)`** — softer checks the existing layer didn't enforce: title length, summary band (40–220 chars; outside the band degrades OG/feed shape), ISO date format, related[] presence, body-or-href presence on live entries.
- **`derivePublicationFootprint(entry, { collectionSlug })`** — surfaces this entry will hydrate when it ships. The editorial-side reflection of §12.3.
- **`derivePublishingPlan({ entry, collectionSlug })`** — single integration point for any caller (script, CMS adapter, AI agent). Returns `{ entry, ok, issues, footprint }`.

**Integration model:**
- Today: `npm run ops:validate` runs `validateEntryShape` + `validateEditorialPolish` across the whole registry. Exits non-zero on errors. CI-wrappable.
- Tomorrow: a CMS adapter calls `derivePublishingPlan` before publishing, blocks merge on errors, surfaces warnings in the editor.
- Day after: the AI publishing assistant calls the same function, returns the same shape, annotated. Consumers don't change.

---

## 2. Editorial tooling strategy

Two layers of editorial tooling, each pure:

### 2.1 Per-entry checks → `publishing.js` (above).
Catches problems inside a single entry — shape, status, visibility, polish.

### 2.2 Registry-wide graph checks → `editorial-checks.js`.
Catches problems *between* entries:

- **`findBrokenRelations(entries)`** — `error` for related[] references that don't resolve, `warn` for references to non-live or non-public targets.
- **`findOrphans(entries)`** — `info` for entries with zero incoming references. Not a bug; an editorial nudge.
- **`findDuplicateSlugs(entries)`** — `warn` for slug collisions across collections. The dynamic route disambiguates by `:collection`, but exact slug clashes still deserve attention.
- **`findPillarImbalance(entries)`** — `info` for pillars at zero live entries. Helps spot a quiet surface.
- **`runEditorialChecks(entries)`** — composite, severity-sorted.

Combined with the per-entry checks via **`runEcosystemHealth({ entries, resolveCollectionSlug })`** (`ecosystem-health.js`) into a single normalized report consumed by:

- The `npm run ops:doctor` CLI (today).
- The future `/console` `ecosystem-health` panel (tomorrow — null today).
- The future AI publishing assistant's `lintRegistry()` method.

---

## 3. Changelog operations strategy

The changelog is the **public engineering log** (§5.3) — release-centric, real numbers, no superlatives. Phase 3.4 adds three operational primitives:

### 3.1 Draft composition
**`draftReleaseEntry({ phase, title, summary, related, tags, date })`** in `changelog.js`. Produces a ready-to-paste `.jsx` file body using the existing editorial conventions (eyebrow `Build in Public · Shipped`, pillar `creator-journey`, default tags, Hebrew Body skeleton). The operator runs:

```
npm run ops:changelog -- --phase 3.5 --title "..." --summary "..."
```

…and pastes the output into `src/content/changelogs/<slug>.jsx`.

### 3.2 Snapshot summarization
**`summarizeChangelog(entries, { limit })`** — reduces a list of changelog entries to a release-centric snapshot. One row per release: `{ id, slug, date, title, summary, eyebrow, href }`. Used by any operations surface that wants "last 5 releases at a glance" without re-deriving the timeline shape.

### 3.3 AI-ready composer contract
**`ChangelogComposer`** abstract class + **`NullChangelogComposer`** default. `compose(context)` returns `{ kind, source, draft }`. v1 always returns `{ kind: "null", source: "deterministic-skeleton", draft }`. When git-history-aware AI release-note synthesis lands, the new composer drops in behind `getChangelogComposer()`. Consumers don't change.

---

## 4. AI-assisted publishing foundations

Mirrors the existing pattern in `src/lib/ai/assistant.js`:

**`PublishingAssistant`** abstract class + **`NullPublishingAssistant`** default. Four methods, all deterministic in v1:

| Method | v1 behaviour | v2 behaviour |
|---|---|---|
| `planEntry({ entry, collectionSlug })` | Calls `derivePublishingPlan`. Returns `{ kind: "deterministic", source, plan }`. | AI-annotated plan: missing-context flags, suggested rephrasing, semantic-similarity warnings. |
| `suggestRelations({ entry, registry })` | Same-pillar fallback (top 6, sourced as `same-pillar`). | Vector cosine over embeddings, sourced as `semantic-similarity`. |
| `lintRegistry({ registry })` | Calls `runEditorialChecks`. Returns sourced issue list. | Adds editorial-tone audits: forbidden phrases (§5.1), guru-register drift, fake-metric flags. |
| `draftRelease(context)` | Calls `draftReleaseEntry`. | AI synthesis from git history + commit messages, *labelled as such*. |

**Singleton:** `getPublishingAssistant()`. **Capability check:** `isPublishingAssistantConfigured()` — false today. Surfaces hide AI affordances when false.

**Critical guardrail (§6.1):** v1 outputs are sourced (`kind: "deterministic" | "null"`). When v2 lands, AI outputs are sourced (`kind: "ai" | "rerank"`). No surface gets to label deterministic graph picks as "AI" — the source field is part of the contract.

**Env gate (planned):** `VITE_PUBLISHING_ASSISTANT`. v1 ignores; v2 branches.

---

## 5. Metadata operations architecture

Three operational metadata layers in this phase:

### 5.1 Authoring metadata → `authoring.js`.
- **`slugify(input)`** — kebab-case, ASCII, lowercase, Hebrew-safe fallback (`hebrew-content`).
- **`todayIso(now)`** — UTC YYYY-MM-DD; testable via override.
- **`composeFrontmatter(input)`** — JS object literal as a string, with the editorial defaults baked in.
- **`composeEntrySkeleton(input)`** — full file body for a new entry.
- **`registryImportLine(input)`** — the one-line addition for `src/content/collections.js`.

Pure string utilities. Run anywhere. Hand the operator strings; let them paste. The medium stays the filesystem.

### 5.2 Release metadata → `release.js`.
- **`RELEASE_PHASES`** — append-only ledger from Phase 1 to Phase 3.4.
- **`getRelease(idOrVersion)`**, **`currentRelease()`** — lookups.
- **`releaseStamp()`** — small object suitable for stamping build outputs (JSON footer in dist, optional console banner, commit-message footer).
- **`nextPhaseHint()`** — derives the next phase id and version.

### 5.3 Footprint metadata → `derivePublicationFootprint` (above).
The structured "what surfaces will this entry hit?" payload. Visible to:
- Today: `npm run ops:doctor` (composite report).
- Tomorrow: the AI publishing assistant's `planEntry()` — preview the footprint *before* merge.

---

## 6. Ecosystem maintenance strategy

`runEcosystemHealth({ entries, resolveCollectionSlug })` aggregates everything:

```
HealthReport {
  totalEntries, liveEntries
  errors, warnings, info
  issues[]          // severity-sorted
  footprints[]      // one per live entry
  byPillar { ... }
  byCollection { ... }
}
```

**Operator CLI:** `npm run ops:doctor`. Prints the issue list, then per-pillar and per-collection counts. Useful for spotting:
- Broken graph edges before they ship.
- Pillars going quiet (the build-in-public cadence is the spine — a quiet pillar is a signal).
- Collections drifting in volume.
- Orphan entries that should get a cross-link.

**Failure mode:** `ops:doctor` exits non-zero only on errors. Warnings and info do not fail the run. Editorial layer stays "fail soft, surface loud."

**Verified at ship time:**
- 11 entries hydrated.
- 0 errors. 0 warnings. 3 info-level "thin-pillar" hints (`programming`, `mahat`, `anti-gravity` — content-bound, expected).
- Distribution: `creator-journey` 5 · `building-with-ai` 2 · `ai-tools` 2 · `claude-code` 1 · `obsidian` 1.

---

## 7. Future creator-console path

**`src/lib/operations/console.js`** ships the contract for the eventual creator console:

- **`CONSOLE_PANELS`** — five descriptors: `publishing-queue`, `ecosystem-health`, `release-ledger`, `changelog-draft`, `ecosystem-graph`. Each names its data source.
- **`CreatorConsole`** abstract class + **`NullCreatorConsole`** default. `isAvailable()` returns `false` today. `listPanels()` returns the descriptors. `getPanel(id)` resolves to `{ kind: "null", reason: "console-not-configured" }`.

**Where it will live (when earned):**
- Mount: `/console`. **Not** `/dashboard`, **not** `/admin`. §1.2 forbids both.
- Composition: existing primitives only — `RelatedRail`, `EntryCard`, `Callout`, `glass-panel-2`. **No new design language.**
- Aesthetic: calm, editorial, restrained. The console is *one more reader* of public data, never a control panel.
- Auth: behind `VITE_CREATOR_CONSOLE` until earned. Local-first storage; the audience layer is enough.
- Surface count: a single page composing the five panels. Not a multi-page navigation tree.

**Why a contract today, no UI today:** When the contract lands first, the UI inherits the discipline. When the UI lands first, the discipline rots. The platform has earned the right to a console; the visual implementation has not.

---

## 8. Future automation path

Three classes of automation are now contract-ready. None ship UI in v1.

### 8.1 AI publishing automation
- `PublishingAssistant` interface (above).
- Replace `NullPublishingAssistant` → `ClaudePublishingAssistant` behind `VITE_PUBLISHING_ASSISTANT === "claude"`.
- Outputs sourced (`kind: "ai" | "deterministic"`). Surfaces label honestly.
- First wins: AI-suggested `related[]`, AI-aware `summary` polish, AI release-note synthesis from git history.

### 8.2 Build-time automation
- `ops:validate` and `ops:doctor` are CI-wrappable today (non-zero exit on errors).
- Future: `npm run build` chains `ops:validate` before `vite build` if the operator wants strict mode. Today that's not the default — the editorial layer is permitted to be in flight while the build runs.

### 8.3 Release stamping
- `releaseStamp()` → optional emit to `dist/release-stamp.json` post-build.
- Optional injection into a `<meta name="release-phase">` at build time.
- Optional commit-message footer hook.

All three are opt-in. None mandatory. **No automation that hides AI usage** (§14.4). Every automated output is sourced.

---

## 9. Architectural goals — verified

| Goal | Verified |
|---|---|
| Filesystem-native workflows | Authoring helpers emit strings; operator pastes into files. Files remain the medium. |
| Structured publishing operations | `derivePublishingPlan` is the single integration point. |
| Reusable editorial utilities | Per-entry + registry-wide checks split clean. |
| Scalable metadata tooling | `release.js`, `authoring.js`, `derivePublicationFootprint` cover the three metadata classes. |
| Release-operation foundations | Ledger + stamp + next-phase hint shipped. |
| AI-ready publishing contracts | `PublishingAssistant`, `ChangelogComposer` interfaces shipped, `Null*` defaults only. |
| Ecosystem integrity helpers | Composite `runEcosystemHealth` + four named graph checks. |
| Future automation boundaries | Env-gated singletons. Sourced outputs. Capability checks. |

---

## 10. Guardrails honoured (§14)

- ❌ No dashboard / admin chrome shipped. Operations live in `src/lib/operations/` and `scripts/operations/` only.
- ❌ No CMS-app aesthetics. No `/console`, `/admin`, `/dashboard` routes mounted.
- ❌ No productivity-app energy. No streaks, scoreboards, completion rings, success states.
- ❌ No new runtime dependencies. Everything reuses Vite + React + node:fs.
- ❌ No `console.log` monkey-patching. CLI scripts use plain `console` with ANSI styling.
- ❌ No "AI" labels on deterministic outputs. Every assistant response carries a sourced `kind` field.
- ❌ No empty `bקרוב` surfaces. The console is a *contract*, not a route.
- ❌ No bundle inflation. `src/lib/operations/` is not imported by any page; it lives next to scripts as an SSR-only module.
- ❌ No new design language. Console panels (when implemented) compose only existing primitives.

---

## 11. Files added

```
src/lib/operations/
  index.js                  ─  public barrel
  publishing.js             ─  validateEntryShape, derivePublishingPlan, footprint
  editorial-checks.js       ─  registry-wide graph checks
  authoring.js              ─  slugify, composeEntrySkeleton, registryImportLine
  changelog.js              ─  draftReleaseEntry, summarizeChangelog, ChangelogComposer
  release.js                ─  RELEASE_PHASES, currentRelease, releaseStamp, nextPhaseHint
  ai-publishing.js          ─  PublishingAssistant + NullPublishingAssistant
  ecosystem-health.js       ─  composite report
  console.js                ─  future creator-console contract (CONSOLE_PANELS, NullCreatorConsole)

scripts/operations/
  _runtime.mjs              ─  shared Vite SSR loader
  validate-content.mjs      ─  npm run ops:validate
  content-doctor.mjs        ─  npm run ops:doctor
  changelog-draft.mjs       ─  npm run ops:changelog
  release-stamp.mjs         ─  npm run ops:release
  README.md
```

`package.json` adds four `ops:*` scripts. No new dependencies. No build-pipeline changes.

---

## 12. Closing

Phase 3.4 is the operational reflection of the platform: every visitor-facing surface that publishes itself now has an operator-facing reflection in `src/lib/operations/`. The visible site has not changed. The bundle has not changed. The discipline has tightened.

The operations layer waits — calm, invisible, editorial, creator-native, systems-oriented — for the moment a creator console, an AI publishing assistant, or a CI gate earns the right to consume it. Until then, four CLI verbs are enough: `validate`, `doctor`, `changelog`, `release`.

*End of CREATOR_OPERATIONS_REPORT.md.*
