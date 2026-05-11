# YUVALCODE_PLATFORM_CONTRACT.md

**Status:** Permanent operating contract. Supersedes all prior phase reports as the source-of-truth for platform direction, design, engineering, and editorial rules.
**Audience:** Future agents and humans working on YuvalCode. Read this in full before any change.
**Operating instruction for prompts:** *"Read and obey YUVALCODE_PLATFORM_CONTRACT.md."*

> Phase reports (`PHASE1_FOUNDATION_REPORT.md`, `BRAND_V2.md`, `AI_TRACK_REPORT.md`, etc.) remain as historical artifacts. This document is what governs.

---

## 0. How to use this document

- Sections 1–13 are **descriptive**: identity, philosophy, language, direction.
- Section 14 is **prescriptive and absolute**: the non-negotiable guardrails.
- Where two sections appear to conflict, §14 wins.
- Every rule is enforceable. If a rule cannot be applied, escalate before working around it.

---

## 1. Platform Identity

### 1.1 What YuvalCode IS
- The **premium HQ of Yuval Zakai's YouTube + AI creator brand**.
- A **creator-business ecosystem** with five visible tracks (`/`, `/content`, `/programming`, `/ai`, `/stack`, `/projects`, `/work-with-me`, `/about`) and seven internal layers (data, primitives, sections, pages, distribution, audience, intelligence).
- A **living technical publication** with a knowledge graph: every entry has `pillar`, `related[]`, `tags`, `date`, and ships into search, recommendations, sitemap, feeds, JSON-LD, and breadcrumbs simultaneously.
- An **AI-native creator ecosystem** — Yuval's three roles are *Creator · Software Educator · AI Builder*.
- Hebrew-first. RTL-perfect. First-person voice (`אני`, never `אנחנו`).

### 1.2 What YuvalCode is NOT
- Not a recruiter portfolio. Not a CV site. Not a freelancer landing page.
- Not a SaaS app. Not a learning platform (YouTube is the platform; this is the HQ).
- Not a Medium clone, not a docs portal, not a generic blog.
- Not an admin dashboard. Not a CMS. Not a CRM substitute.
- Not multi-tenant. No accounts, no billing, no `/dashboard`, no `/settings`.
- Not gamified. No streaks, badges, XP, levels, certificates, quizzes.
- Not a social-media-mechanics retrofit. No follower counts, likes, shares, comments, pulse counters.

### 1.3 Creator-platform philosophy
- "**Creator who ships real systems**", not "creator with content".
- "**A publication with five tracks attached**" — center of gravity is the publication, not the marketing site.
- "**Build in public · long-term · no hype**" (`בונה עם AI · בפומבי · בלי הייפ`).
- Numbers > adjectives. Evidence > claims. Honesty > polish.
- The goal is not engagement; the goal is trust accrual.

### 1.4 Identity primitives
| Field | Value |
|---|---|
| Display name | יובל זכאי / Yuval Zakai |
| Wordmark | YuvalCode |
| Roles | Creator · Software Educator · AI Builder |
| Channel | YouTube `UC0InPimb8JxKqhrH0CFWBwA` |
| Domain | yuvalcode.co.il |
| Default language | he-IL (Hebrew) |
| English mirror | `/cv` only (deferred until needed) |

---

## 2. Architectural Philosophy

### 2.1 Systems-first
- Stabilization before redesign. Working surfaces before new ones.
- Every change must answer: "why now, why this way."
- **Stop the bleeding before adding features**: bugs, broken classes, missing assets first.
- Component upgrades, not rewrites. `Button` adds `as` prop; it does not get replaced.

### 2.2 Scalable ecosystem
- Each track is a **namespace mirror**: `pages/<Track>.jsx` (composer) + `components/<track>/` (sections) + `lib/<track>/` if data-bearing.
- Composers are sequences of imports + JSX, **under 60 lines**. Reordering or removing a section is a one-line diff.
- Sub-routes deepen, never replace, the umbrella. `/ai/{claude-code, anti-gravity, obsidian, building-with-ai}` mounts when content is ready, not before.
- "When the content is ready, the routes mount."

### 2.3 Calm intelligence
- Premium creator-lab aesthetic — **invisible** intelligence/continuity layer beneath a calm surface.
- Recommendations, search, audience continuity all work with **zero AI** today; the matcher / recommender is the swap-point. Tomorrow's vector ranker drops in with no consumer-API change.
- "Observability, not surveillance." "Premium UX, never AI theater."

### 2.4 Editorial-first
- The publication is the spine. Every track surface ultimately routes to or is annotated by editorial entries.
- Editorial review **is** code review. A new entry is a PR. The build passes or it surfaces a missing field.
- Editorial intent always wins over computed signal (`pinned` field overrides ranking).

### 2.5 Platform, not portfolio
- The site is not a static showcase. It is a **system that publishes itself**: one new entry hydrates 11+ derived surfaces (search, sitemap, feeds, JSON-LD, breadcrumbs, OG, related rails, content hub, ecosystem graph, distribution snapshot, recommendations).
- Empty pages do not ship. `/coming-soon` is gone. Dead-end "בקרוב" links are a removed practice.

---

## 3. Design Language

### 3.1 Surface & color
- **Single canonical surface**: `bg-background` / `bg-surface` driven from one CSS variable. Current canonical value: `#07080d` (formerly `#0A0B10`). No ad-hoc surface hex.
- **Forbidden surface drift**: `#02040a`, `#0a0c14`, `#0b0c15`, `#0f111a`, `#1e2230`, `bg-[#…]` literals.
- **Single brand gradient**: `text-brand-gradient` / `bg-brand-gradient`. No new gradient definitions.
- **Single accent**: `primary: #6366f1` (indigo). Used as glow, never as wash. Secondary purple sparing. Pink reserved for one or two AI/creator highlights.
- **Single border token**: `--border: rgba(255,255,255,0.08)`. Stop interleaving `border-white/5` and `border-white/10`.

### 3.2 Typography
- **Three families only**: Heebo (body), Inter (display), JetBrains Mono (stats/code/eyebrows).
- **Strict scale**: `12 / 14 / 16 / 18 / 22 / 28 / 36 / 48 / 64 / 96`. No in-between sizes.
- Hierarchy: Display 64–96/800 · H1 48/800 · H2 36/700 · H3 22/700 · Lead 18–22/400 · Body 16/400 · Caption 14/500 · Mono 14/500.
- Hero `h1` caps at `text-5xl` on mobile.
- **Body floor 16 px**. Body line-height `1.85` for Hebrew long-form.
- Font features: `ss01, cv11` on body; `tnum` on display/mono.
- Latin technical names wrapped in `<span dir="ltr">` for bidi correctness.

### 3.3 Spacing & radius
- Spacing scale: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128`.
- Radius: `8 / 12 / 16 / 24 / 32`. No `rounded-[2.5rem]`.
- Major sections separated by `var(--hairline)` or `mb-24` / `mt-24`. Sections do not bleed.

### 3.4 Motion
- **Single ease**: `EASE = [0.16, 1, 0.3, 1]` (canonical premium curve). Lives in `src/lib/motion.js`. Never duplicated per component.
- **Duration scale**: `150 / 250 / 400 / 600 ms`.
- `whileInView` everywhere with `once: true`. Sections animate once, then stop.
- **No infinite loops** except deliberate marquees, which pause under `prefers-reduced-motion` and on tab hidden.
- No new keyframes per page. Use the existing tokens.

### 3.5 Glass system
- Canonical surfaces are tier-coded: `glass-panel-1`, `glass-panel-2`, `glass-panel-3`. New components use the tier system, never ad-hoc surface colors.

### 3.6 Lighting & atmosphere
- Hero atmosphere = primary/secondary/accent blobs (`mix-blend-screen`) + `grid-pattern.svg` texture + scanline gradient + `hero-spotlight` cursor follow.
- `Tilt3D` + `CardGlow` per-card. Auto-disabled on `(hover: none)`, `(pointer: coarse)`, and reduced-motion.
- Inline SVG node graphs fade in once, then static. **No animated edges, no moving particles.**
- `FloatingTechBackground` is **forbidden on track pages** and editorial routes. The hero atmosphere is sufficient.

### 3.7 Visual hierarchy & ecosystem cohesion
- Every track page mirrors: 88vh hero · eyebrow · 3-line manifesto · 2 CTAs · ambient atmosphere · live-status badge · 3-card "Why" pillar · sticky-left + scrolling-right timeline · final CTA bar.
- Live-status badge tones: `live | building | exploring | selective | future`.
- Mirror is deliberate — visitor experiences one ecosystem, not five disconnected pages.
- One `<h1>` per page. Per-section `aria-labelledby`.

---

## 4. UX Philosophy

### 4.1 Calm UX
- Calm-confidence everywhere. Quiet by design. The article / surface IS the chrome; the chrome just frames it.
- Restrained motion. Layered, performance-safe, accessibility-safe.
- Conversation-first, not transaction-first.

### 4.2 No dopamine engineering
- No infinite scroll. No autoplay. No notification dots. No red badges. No notification permission requests.
- No toast unless triggered by an explicit user action.
- No "X spots left", no "limited time", no countdowns, no urgency theater.
- No fake "5 new" counts. When nothing is new, the rail renders nothing.

### 4.3 No gamification
- No streaks, XP, badges, levels, achievements, completion rings, "you're 80% there" bars.
- No progress trackers, no certificates, no quizzes, no leaderboards.
- The platform records signals; it never **scores** the visitor.

### 4.4 Premium editorial feel
- Reading register: "creator-publication, not Stripe Docs"; "Hebrew technical-publication, not translated boilerplate".
- No marketing chrome on a publication. No "free trial", no pricing modules, no funnel-shaped CTAs in editorial.
- Code blocks: traffic-light header, file name, lang chip, copy button.
- Reading-time visible on every entry. Author override via `readingMinutes`.

### 4.5 Continuity-oriented
- Reader is **always one step away from a binge**.
- Cross-content intelligence: editorial → track via `<Link>`; track → editorial via `EditorialCollectionsRail`.
- `RelatedRail` source-labels its picks: "Editorially related" / "Same pillar" / "Adjacent pillar". The graph is **legible**.
- Final CTA tertiary lines always offer two more cross-routes before the visitor leaves.

### 4.6 Creator-native
- One coherent visual language across all tracks.
- Order is deliberate. Each section earns the next.
- Selective intake — no "book now" energy.

---

## 5. Content & Editorial Rules

### 5.1 Voice
- Hebrew-first. English mirrors only on `/cv`.
- Tone: thoughtful, calm-confidence, technical-creator energy.
- First-person (`אני`). No collective "אנחנו" on a creator brand.
- **Forbidden phrases**: "10x productivity", "5am club", "synergy", "innovate", "trusted by 500+ companies", "join the AI revolution", "Jordan Peterson said", any guru / hustle-culture register.

### 5.2 Publication philosophy
- Seven typed collections: **Articles, AI Experiments, Workflows, Case Studies, Changelog, Research Notes, Newsletters**.
- Per-collection JSON-LD type: AI Experiments → `TechArticle`; Workflows → `HowTo`; Articles, Case Studies, Changelog → `Article`.
- Every entry is part of the graph the moment it ships.
- Not a content farm. Curated seed; future entries via review, not export.

### 5.3 Changelog philosophy
- Public engineering log. Release-centric — what shipped, on what date, with what footprint.
- Real numbers (kB gzip, lazy chunks, build time). No superlatives.
- Three timeline views, distinct intents: deliverable-centric (`BuildingInPublicTimeline`), activity-centric (`ContentTimeline`), release-centric (changelog).

### 5.4 AI experiment philosophy
- Lab notebook, not theory. Eyebrow `Lab · Active`.
- Concrete code in every entry. Honest "not solved" sections.
- Cross-link to research notes; readers can follow "tried this → still figuring out" without leaving.
- No "AI will…", no "the future of…", no rocket emoji. Callouts: `Experiment` and `Heads up`.

### 5.5 Learning / build-in-public philosophy
- Five pathways across pillars (cognitive sweet spot).
- Three principles displayed across philosophy blocks: *Learn in public · Systems over shortcuts · Documenting real growth*.
- "אופק של עשור, לא רבעון."

---

## 6. AI & Intelligence Rules

### 6.1 No fake AI
- Recommendations are graph-derived and labelled as such (`source: "related" | "same-pillar" | "adjacent-pillar"`).
- No "Recommended for you" labels on rails that aren't actually personalized.
- No chatbot UI. No `/Chat` icon, no floating bubble, no "Ask AI" CTA.
- **When the assistant is real, it earns its UI.** Until then, the interface lives in `src/lib/ai/assistant.js` with one concrete class: `NullAssistant`.

### 6.2 Architecture-first AI
- The contract ships before the implementation: namespace, interface, graph, swap-points.
- Consumers call `getAssistant().whatsNext({ surface })`; today returns deterministic graph picks, tomorrow returns AI-ranked picks. **No call-site changes.**
- The matcher (`match.js`) is the only file that changes when semantic search lands.

### 6.3 Semantic-system direction
- Shape-first: v1 fills `keywords` and `relationships`; v2 fills `embedding`.
- Consumers branch on `meta.embedding === null` for deterministic fallback today, vector-ranked tomorrow.
- Phase A: lexical → hybrid (fuse.js / mini-search, same `match()` signature).
- Phase B: build-time `dist/embeddings.json`, re-rank step.
- Phase C: server-side semantic search (vector DB), `?q=` SEO-indexable.
- Phase D: RAG + assistant (`ClaudeAssistant`, env-gated).

### 6.4 Recommendation philosophy
- Three concentric rings: **hot** (top-pillar), **warm** (adjacency), **cold** (canonical order). Rail is never empty.
- Editorial reads weigh 1.5× route taps in pillar affinity (genuine engagement signal).
- Half-life 14 days for pillar affinity (matches creator cadence).
- Reason chips explain *why* a card showed up: `top-pillar | adjacent-pillar | ecosystem-default`.

### 6.5 Future assistant boundaries
- AI annotation is **additive**: visitor sees the deterministic list always, AI annotation when configured.
- Assistant surfaces **discoverably but non-intrusively** — likely an option inside the Search modal, not a floating bubble.
- Forbidden: hand-tuned heuristics labeled as AI; recommendation widgets that lie about their source.

---

## 7. Performance Rules

### 7.1 Bundle discipline
- **Main bundle ≤ 180 kB gzipped.**
- **Each lazy route chunk ≤ 60 kB raw.**
- Cold routes (Privacy, Terms, NotFound, Exams) ≤ 6 kB raw.
- Image payload per page ≤ 600 kB (YouTube `mqdefault.jpg` mobile, `maxres` desktop).
- Manual chunk splitting: `react-vendor`, `motion-vendor`, `icons-vendor`.
- Migrate `framer-motion/m` (mini build) for non-orchestrated motion (~30–40 kB raw saved).
- **No new runtime dependencies** without an explicit, documented reason.

### 7.2 Lazy-loading philosophy
- Lazy-load every route except `/`.
- `<Suspense fallback={<RouteFallback />}>` at the route boundary.
- Lazy-load heavy sections (`FloatingTechBackground`, `LatestContentHub` live API surface) per route.
- The modal is lazy; the engine is eager but cheap.

### 7.3 Animation constraints
- `prefers-reduced-motion: reduce` is honored at **two levels**: per-utility Tailwind variant AND a global `* { transition-duration: 0.01ms; animation-iteration-count: 1; scroll-behavior: auto; }` block.
- `useReducedMotion()` honored in every motion component.
- `Tilt3D`/`CardGlow` gate on reduced-motion AND `(hover: hover) and (pointer: fine)`.
- Backgrounds pause on `IntersectionObserver` off-screen and on `visibilitychange` when tab hidden.
- **No `Math.random` for layout** — deterministic seed for stable hydration.
- No long-running atmospheric backgrounds without dwell-time guards.

### 7.4 Mobile-first
- 375 px is the design target, not an afterthought.
- Tap targets ≥ 44×44 px (WCAG 2.2 AA).
- Single column below 768 px.
- Hero `h1` capped at `text-5xl` for `< 400 px` viewports.
- Marquee 60 s on mobile (vs 40 s desktop) to reduce CPU.
- YouTube thumbnail `srcset` mobile-aware.

### 7.5 Edge / CDN readiness
- Preconnect: `https://www.googleapis.com`, `https://i.ytimg.com`.
- Self-host critical font weights (Heebo 700, Inter 800). Eliminate Google Fonts round-trip.
- `<link rel="preload">` critical fonts.
- Sourcemaps disabled in production.
- Hashed assets immutable cache; SWR for feeds + sitemap.
- localStorage cache eviction (oldest-first); migrate to IndexedDB once cache > 2 MB or > 200 videos.

### 7.6 Performance budgets
| Metric | Budget |
|---|---|
| LCP | ≤ 2.5 s on 4G |
| INP | ≤ 200 ms |
| CLS | ≤ 0.1 |
| Lighthouse Mobile Performance | ≥ 90 |
| Lighthouse A11y / BP / SEO | ≥ 95 |

---

## 8. Accessibility Rules

### 8.1 Standards
- **WCAG 2.2 AA** is the bar. **ISR 5568** (Hebrew WCAG 2.0 AA) recognised for Israeli educational platform context.
- Manual NVDA + VoiceOver pass on `/`, `/about`, `/contact`, `/programming/exams` before each release.

### 8.2 Reduced motion
- Respected universally — both via `useReducedMotion()` and the global CSS guard (§7.3).
- Smooth scroll falls back to `behavior: "auto"`.
- Site is "silent and still" under reduced-motion.

### 8.3 Semantic HTML
- **No clickable `<div onClick>`.** Every interactive surface is `<a>`, `<Link>`, or `<button>`.
- `VideoCard` is `<a target="_blank" rel="noopener noreferrer">`.
- One `<h1>` per page. Heading hierarchy never skips.
- Decorative content `aria-hidden="true"`. All Lucide icons `aria-hidden`.
- Skip-to-content anchor first focusable: `<a href="#main-content">דלג לתוכן הראשי</a>`. `<main id="main-content" tabIndex="-1">`.

### 8.4 RTL quality
- `<html lang="he" dir="rtl">` set per render.
- Logical properties only (`start`/`end`, never `left`/`right` for layout).
- Latin runs wrapped `<span dir="ltr">`. Numerals isolated with `unicode-bidi: isolate`.
- `text-align: start`.

### 8.5 Keyboard-first systems
- Mobile drawer: full focus trap, ESC closes, body scroll locked, focus restored on close.
- Trigger: `aria-expanded`, `aria-controls`, `aria-haspopup="dialog"`. Drawer: `role="dialog" aria-modal="true" aria-label="תפריט ניווט"`.
- `aria-current="page"` on active NavLink.
- `focus-visible:ring-2 ring-primary/60 ring-offset-2 ring-offset-background` on every interactive primitive.

### 8.6 Accessible editorial typography
- Body line-height `1.85` for Hebrew long-form.
- Body floor 16 px. Min contrast 4.5:1 (no `text-gray-500` for body — `text-gray-400` minimum).
- Code blocks have copy-button affordance with proper `aria-label` toggling.
- Callouts use `role="note"`. Editorial nav uses `<nav aria-label="Editorial navigation">`.

### 8.7 ARIA & live regions
- Hebrew labels everywhere — never `aria-label="Back to top"` or `"Close"` in English on a Hebrew site.
- Toast container: `role="region" aria-label="הודעות מערכת" aria-live="polite"`. Per-toast: `role="alert"` for errors, `role="status"` otherwise.
- `ConfigValidator`: `role="status" aria-live="polite"`. Synchronous read via `useMemo` (no CLS jump).
- `<noscript>` fallback on `/`.

---

## 9. SEO & Distribution Rules

### 9.1 Metadata automation
- **Single API**: `derivePageMeta(input)`. Resolves canonical, OG, breadcrumbs, JSON-LD, feed alternates, article meta, keywords, reading time from one input shape.
- Consumers never touch the registry, feed index, or schema generators directly.
- React 19-native head management. **`react-helmet-async` is fully removed** and never returns.
- DOM setters are framework-agnostic, idempotent, selector-safe, SSR-guarded.

### 9.2 Tag classification
- **Singletons** (`description`, `canonical`, `og:*`, `twitter:*`, `robots`, `keywords`, `theme-color`): marker `data-page-meta=""`. Reuse-or-create. Never duplicated.
- **Multi-tag groups** (`<link rel="alternate">`, `article:tag`): marker `data-page-meta-multi="<group>"`. Atomic clear-and-rewrite per group.
- **JSON-LD**: marker `data-page-meta-jsonld=""`. Atomic clear-and-rewrite.
- **Baseline `index.html` JSON-LD blocks** (Person, Organization, WebSite) **lack markers by design** and survive every clear cycle.

### 9.3 Schema philosophy
- Composable generators: `WebSite`, `Organization`, `Person`, `BreadcrumbList`, `WebPage`, `CollectionPage`, `Article`/`TechArticle`/`HowTo`, `CreativeWork`, `Course`, `VideoObject`, `EducationalOrganization`, `ProfessionalService`.
- Every JSON-LD payload carries `inLanguage: "he-IL"`.
- Article block emits: `headline`, `description`, `inLanguage`, `datePublished`, `dateModified`, `author`, `publisher`, `mainEntityOfPage`, `isPartOf`, `keywords`.
- `BreadcrumbList` everywhere.
- `noindex, nofollow` on `NotFound` and legacy/redirect routes.

### 9.4 Feed architecture
- One model, three serializations: **RSS 2.0, Atom 1.0, JSON Feed 1.1**.
- 7 collection slugs × 3 = 21 feeds + 1 global (`all`) variant per format.
- Feed model is **editorial-shape**: same `entry` records as search index and recommendations.
- Every feed declares `xml:lang="he-IL"`.
- Discovery: root `<link rel="alternate">` in `index.html` + per-route `feedsForRoute(path)`.
- In-page affordance: `<FeedSubscribeLink />` quiet glass-tier mono pill on `CollectionHero`.

### 9.5 Sitemap rules
- Registry-derived. Build-time generated. Never hand-maintained. Output: `dist/sitemap.xml`.
- Derived from `SURFACES` + `getCollectionSurfaces()` + `getAllEntries()`.
- Priorities: `/` 1.0 · `/content`, `/exams` 0.9 · track + collection landings 0.85 · `/work-with-me` 0.8 monthly · editorial entries 0.7 · legal 0.2.
- `lastmod = entry.updatedAt || entry.date`.
- `Cache-Control: public, max-age=3600, stale-while-revalidate=86400`.

### 9.6 OG strategy
- Resolution priority: explicit override → `entry.coverImage` → `COLLECTION_OG_OVERRIDES[slug]` → `ROUTE_OG_OVERRIDES[path]` → brand `/og-image.png` (1200×630).
- `og:locale = "he_IL"`.
- Article-typed OG: `published_time`, `modified_time`, `author`, `section` (singletons); `tag` (managed multi-group).
- **Dynamic OG image rendering deliberately deferred.** When it ships: build-time `/og/<slug>.png`; consumers stay unchanged.

### 9.7 Discoverability
- Hebrew long-tail SEO is highest-ROI: "פתרון מבחן מה״ט 2024 מועד א", "מבני נתונים שאלות פתרון", "Claude Code עברית", "Anti Gravity דוגמאות", "Yuval Zakai".
- Per-exam crawlable URLs: `/programming/exams/:slug`. Never query-string-only.
- Static SSG path: pre-render `/`, `/about`, `/projects`, `/work-with-me`, `/programming/exams/*` (vite-plugin-ssg or Astro adapter).
- "No SEO theater. No keyword stuffing, no thin pages, no doorway routes."

---

## 10. Engineering Rules

### 10.1 Dependency discipline
- **No new runtime dependencies** without explicit justification.
- A ~150 LoC vanilla solution beats a 30 kB library.
- No external hotlinked assets — same-origin only in `public/`.
- Pick ONE host. `netlify.toml` and `vercel.json` cannot both ship.

### 10.2 Framework-agnostic primitives
- `src/lib/metadata.js`: zero React imports. Drop-in usable from Service Worker, CLI, SSR adapter.
- Clean boundary: `metadata.js` (DOM utilities) ↔ `PageMeta.jsx` (React glue).
- Migration paths preserved: PageMeta → Next.js `Metadata` is near-bijective; PageMeta → React Router 7 framework `meta()` is 1:1.

### 10.3 Composable systems
- **Single source of truth** in `src/lib/constants.js`: `SITE`, `MAILTO`, `WHATSAPP_LINK`, `RECRUITER_CONTACT_PATH`, `WORK_WITH_ME_PATH`, channel/email/socials.
- Single ease in `src/lib/motion.js`. Single brand gradient. Single glass tier system.
- One pillar declaration: `pillars.js`. One taxonomy registry: `lib/content/taxonomy.js`.
- `defineCollection()` is the integration boundary. Consumers depend on the *contract*, never the source.
- Public re-exporter (`src/lib/content`) hides storage. Pages never import from `src/content/collections.js` directly.

### 10.4 Reusable primitives
- Editorial: `Prose`, `CodeBlock`, `Callout`, `EditorialEyebrow`, `EditorialHero`, `CollectionHero`, `CollectionGrid`, `EntryCard`, `RelatedRail`, `EcosystemNav`, `AuthorBlock`, `EditorialNewsletter`, `EmptyCollection`, `CollectionIcon`.
- UI: `Button` (with `as` prop), `Badge` (with `tone="status"`), `Toast`, `PrivateLessonCard`.
- Lucide icons only. No custom SVG additions to the bundle (inline SVG graphs use existing tokens).

### 10.5 No hacks
- **Never** monkey-patch `console.log`. Dev-only output (React DevTools hint, Framer reduced-motion notice) is fixed at the source, not silenced.
- **Never** `dangerouslySetInnerHTML`. All user input through React.
- **Never** `Math.random` for layout.
- **Never** HSL channels inside `rgba()` (silently broken).
- **Never** `target="_blank"` without `rel="noopener noreferrer"`.

### 10.6 No duplicated logic
- Hardcoded URLs, emails, channel IDs forbidden in component files. They live in `constants.js`.
- Conditional rendering for null socials — codebase ships without placeholder socials.
- Centralized `useScrollPast` hook for scroll thresholds.

### 10.7 Infrastructure-first
- Lazy routes, manual vendor chunks, sourcemaps off in prod, `<ErrorBoundary>` around the route outlet (Hebrew recovery UI, analytics on `window.plausible`).
- Strong data-layer isolation: `src/lib/youtubeService.js` is the single point of contact with YouTube API. Three TTL tiers (24 h / 1 h / 15 min). Stale-on-error fallback.
- Vendor-neutral analytics shim (Plausible-shaped). No-op when `VITE_PLAUSIBLE_DOMAIN` unset. Single `track(name, props)` chokepoint. Helpers normalize prop shapes.

### 10.8 Definition of done
- `npm run lint` clean.
- All routes accessible without console errors.
- Lighthouse mobile: Performance ≥ 90 / A11y ≥ 95 / BP ≥ 95 / SEO ≥ 95.
- Manual smoke test of three user journeys.
- Screenshot diff at 375 px and 1440 px.
- Hebrew copy reviewed by native reader.
- No dead code. No console warnings in happy path.

---

## 11. Audience & Retention Rules

### 11.1 Local-first continuity
- Single root key: `yc_audience_v1`. One read, one write, one wipe.
- Versioned shape, migration-safe. Quota-resilient (Safari private mode, iOS quota → silent degrade).
- Bounded buffers: `visits` (20), `watched` (10), `entries` (12). Footprint < ~10 KB.
- Pure mutators. `useSyncExternalStore` for React integration.

### 11.2 Privacy-first memory
- **Stored**: routes, videoIds tapped, entry IDs opened, pillar-affinity map, small preferences object, pathways map.
- **Never stored**: IP, user-agent, geolocation, screen size, referrer, session ID, DOM content, scroll position, time-on-page, mouse heatmaps, click coordinates, third-party identifiers, emails, names, contact info, cookies.
- **Verifiable**: visitor opens DevTools, inspects JSON, validates the claim.
- `forgetMe()` clears namespace + broadcasts → cold-start UI within one render tick. **No reload required.**
- Email never enters the analytics layer. Scrubber strips email regex matches; props capped at 80 chars.

### 11.3 Non-invasive personalization
- Two-mode by design (anonymous-of-record + opt-in extensions). Never one-mode-with-second-class-anonymous.
- Editorial intent (`pinned`) always wins over computed signal.
- Every rail dismissable or self-hides on cold-start.
- One screen / four buttons / one optional dismiss link. No "step 2 of 5", no email capture inside continuity flows.

### 11.4 Progression systems
- Pillar affinity time-decayed. Half-life 14 days.
- Editorial reads weigh 1.5× route taps.
- Two buffers (`visits` vs `entries`). One would pollute the affinity scorer.
- Returning-user tiers derived, not configured: `NEW | FRESH_RETURN (<30min) | RETURNING | DEEP_RETURN (≥5 visits)`.

### 11.5 Recommendation continuity
- `memory.visits[]` flows naturally into the existing recommend engine. No consumer-contract changes.
- Architecture is **content-keyed, not session-keyed**. Pillar affinity persists across cleared sessions because it's anchored in pillar IDs.

---

## 12. Operational Rules

### 12.1 Calm creator operations
- Vendor-neutral analytics, env-gated. No-op when unset.
- Pageview emitted on every route change via `ScrollToTop`.
- Dev-only logging (e.g. Contact `console.error`, `ConfigValidator` hints) — **never** in production.
- Every `console.warn` / `console.error` call guards a real failure path. None noisy in the happy path.

### 12.2 Filesystem-native publishing
- Editorial entry: `src/content/<collection>/<slug>.jsx`. ES module exports `entry` frontmatter + inline `Body` React component.
- New collection = one row in `collections-config.js`. New entry = one file + one import in `collections.js`.
- `defineCollection()` validates required fields, fills defaults, freezes.
- Tag registry enforced — register tags rather than strip; preserves the content graph.

### 12.3 Structured workflows
- Two dynamic routes serve all collections: `/content/:collection`, `/content/:collection/:slug`.
- Unknown `:collection` → `<Navigate to="/content" replace />`. No NotFound dead-ends.
- One new entry hydrates: search index, recommendations, sitemap, 2 feeds, JSON-LD, breadcrumbs, OG, related rails, content hub, ecosystem graph, distribution snapshot. **The platform publishes itself.**

### 12.4 Future CMS compatibility
- The contract IS the integration boundary. Three migration paths behind it:
  1. **MDX adapter** (`@mdx-js/rollup`) — drop-in.
  2. **Headless CMS** (Sanity / Contentful / Decap) — build-time fetch.
  3. **Astro Content Collections** — long-term, when `/projects` ships 6+ entries.
- **Zero consumer changes** in any path. Schema, pillars, taxonomy, registry, primitives, dynamic routes, recommendation engine, search corpus all unchanged.

### 12.5 Future AI-assisted publishing compatibility
- `recommendForEntry()` v2 (vector cosine re-rank): drop into the same neighborhood. `useRecommendations`, `RelatedRail`, source labels, analytics — all unchanged.
- `embedEntry()` is a stub today. Real model lands behind env gate; consumers fall back gracefully.
- `CreatorAssistant.whatsNext({ surface })` returns `{ entries, source, annotation? }`. Forward-compatible.

### 12.6 Build & release verification
- `vite build` mandatory pre-merge. No warnings.
- Bundle sizes recorded and compared against budgets.
- Phased delivery: diffs purely additive in track-page phases. No legacy churn.

---

## 13. Future Platform Direction

### 13.1 Semantic discovery
- Phase A — Hybrid lexical (`fuse.js`/`mini-search`), `match()` signature unchanged.
- Phase B — Build-time embeddings → `dist/embeddings.json`, re-rank step.
- Phase C — Server-side semantic search; vector DB (Supabase pgvector or Turso); `?q=` URL params SEO-indexable.
- Phase D — RAG + `ClaudeAssistant` behind `VITE_ASSISTANT_PROVIDER === "claude"`.

### 13.2 Adaptive recommendations
- Phase A — Cookieless session memory (sessionStorage; never leaves browser).
- Phase B — Pillar-anchored personalization on `/`'s `LatestContentHub`.
- Phase C — Server-side identity (only when newsletter audience exists; `?ref=` cookie scoped to platform).
- Phase D — Assistant-driven discovery.

### 13.3 AI-assisted publishing
- `recommendForEntry` vector re-rank step.
- "From the editor" subhead in `EditorialNewsletter` could surface AI annotations.
- `pickAdaptiveSurfaces({ history, limit })` swap-point — v1 deterministic, v2 traversal-aware.

### 13.4 Creator memberships
- Phase A — Magic-link or YouTube OAuth → `subscriberId` (signed JWT). Storage-adapter swap, not rewrite.
- Phase B — Last-write-wins per top-level key. No CRDT for v1.
- Phase C — Cross-device pillar weights merge (associative + commutative).
- Phase D — **Anonymous mode stays opt-in forever. Local-of-record, server-of-mirror.**

### 13.5 Intelligent ecosystem assembly
- `CROSS_ROUTE_GRAPH` mirrors actual UI cross-links. **No drift between UI and schema.**
- Distribution intelligence answers four questions per route: feed alternates, cross-links, promotion targets, publication shape.
- Future feeds: `feeds/by-pillar/<pillar>.xml` — same model, no schema change.

### 13.6 Multilingual publishing
- Surface registry has room for `alternates` array per row.
- Sitemap + PageMeta canonical resolver ready to emit `<xhtml:link rel="alternate" hreflang="en">`.
- **Architecture in place; activation is content-bound.** Activation = author English mirrors + extend `SURFACES` rows + ~10-line renderer extension.

### 13.7 SSR / edge evolution
- `resolveOpenGraph()`, `resolveArticleOgMeta()`, `feedsForRoute()`, JSON-LD schema builders are pure functions and survive SSR migration unchanged.
- `src/lib/metadata.js` and `useEffect` in `PageMeta.jsx` retire on SSR migration (replaced by `generateMetadata` or framework `meta()`).
- All distribution outputs are static files; no edge functions required to operate.

---

## 14. Non-Negotiable Platform Guardrails

This section is absolute. If any work in progress conflicts with §14, stop and escalate.

### 14.1 Forbidden aesthetics
- ❌ Dashboard / admin-panel chrome. No tables, charts, "enterprise admin" energy.
- ❌ SaaS landing-page register. No "free trial", no pricing tiers grid, no "upgrade" prompts, no comparison tables.
- ❌ Linear / Vercel / Plausible admin-clone aesthetic.
- ❌ Startup pitch-deck adjectives. No "10x productivity", no "join the AI revolution", no fake founder energy.
- ❌ Crypto-website energy. No glow-on-everything, no rainbow gradients, no excessive blur, no fake-decentralized-future motifs.
- ❌ Gamer-setup / productivity-influencer aesthetic. No "5am club", no fake metrics, no AI-influencer affect.
- ❌ Fiverr / Upwork energy. No "starting at $X", no rate cards, no "X hours included" menus, no "buy now" buttons.
- ❌ Agency landing. No "we" voice, no logo wall of clients, no "trusted by 500+ companies".
- ❌ Generic Dribbble portfolio grid. Not a screenshot gallery.
- ❌ Medium / docs-site / blog-portal chrome. No left-rail nav, no "Getting Started", no API reference layout.
- ❌ Early-portfolio aesthetic. No `FloatingTechBackground` on track or editorial pages.

### 14.2 Forbidden UX patterns
- ❌ Gamification: streaks, badges, XP, levels, achievements, completion rings, progress bars on top of pages.
- ❌ Dopamine engineering: infinite scroll, autoplay video, notification dots, red badges, urgency theater, "X spots left".
- ❌ Notification permission requests. Toast only on explicit user action.
- ❌ Cookie banner pop-up that blocks first paint.
- ❌ Multi-step SaaS onboarding, forced flows, modal spam.
- ❌ "Open in app" / PWA install prompts.
- ❌ "Personalized for you" labels on rails that aren't actually personalized.
- ❌ Empty `coming-soon` pages. Empty filter rows on 0-data pages. Premature deep-dive routes.
- ❌ Fake testimonials. Fake "trusted by" walls. Fake metrics. Fake success states.
- ❌ "Subscribe to channel" CTA on `/cv`.
- ❌ Status pill in non-`/work-with-me` heroes.

### 14.3 Forbidden architectural patterns
- ❌ Central session-id keying all signals.
- ❌ Server-of-record where local state is "just a cache".
- ❌ Real-time WebSocket sync layer.
- ❌ Required email signup to use the platform.
- ❌ Generic User entity / Sessions table / `/dashboard` / `/settings` / `/preferences`.
- ❌ RBAC, multi-tenant, "organization" abstraction.
- ❌ Fingerprinting, third-party cookies, session replay.
- ❌ Heavy SDKs: PostHog autocapture, GA4 gtag.js, Segment.
- ❌ Service worker, precache, background-sync, push-notifications.
- ❌ `react-helmet-async` re-introduction. The DOM-native metadata layer is permanent.
- ❌ Hotlinked third-party assets.
- ❌ Both `netlify.toml` AND `vercel.json` simultaneously.
- ❌ `Math.random` in render paths. HSL inside `rgba()`.
- ❌ Clickable `<div onClick>` for navigation.
- ❌ `target="_blank"` without `rel="noopener noreferrer"`.
- ❌ `dangerouslySetInnerHTML` anywhere.
- ❌ Sourcemaps in production.
- ❌ Stale JSON-LD or multi-tag metadata accumulating across navigations.
- ❌ Clearing baseline `index.html` JSON-LD blocks (they lack markers by design — they survive).
- ❌ DOM mutations on equal values (all setters short-circuit).
- ❌ Monkey-patching `console`.
- ❌ Default exports for pages while the rest of the codebase uses named exports.
- ❌ Adding new dependencies when a vanilla solution exists.
- ❌ New design systems / random aesthetics introduced per page.

### 14.4 Forbidden editorial / brand
- ❌ Voice: "אנחנו" on a first-person creator brand. Hustle-culture register. Guru language. "10x", "5am club", "synergy", "innovate", "disruption", "join the revolution".
- ❌ "AI will…", "the future of…", rocket emoji in editorial. AI-influencer affect.
- ❌ Sponsorships for tools Yuval doesn't use.
- ❌ Hiding AI usage. Transparency is mandatory.
- ❌ Hustle-culture projects. One-off Fiverr-style gigs.
- ❌ Empty metrics ("100% חומר רלוונטי", "24/7 גישה"). Replace with truthful ones (e.g. "Build-in-public · סרטון בשבוע").
- ❌ Stale references (e.g. "מבחני מה״ט 2025" in 2026).
- ❌ English aria-labels on Hebrew pages.

### 14.5 Forbidden trust patterns
- ❌ Inventing testimonials.
- ❌ Premature pricing UI. Empty "starting at" tags on a 0-data page.
- ❌ "Trusted by" logo wall before real partners exist (and only via Future Sponsorships with full disclosure).
- ❌ "Subscribed!" toast that never reached an inbox. Deferred fallbacks degrade calmly to `/contact`.
- ❌ Dead-end "בקרוב" links anywhere on the site.

---

## 15. Glossary of canonical terms

| Term | Meaning |
|---|---|
| **Track** | One of the visible top-level surfaces (`/programming`, `/ai`, `/stack`, `/projects`, `/work-with-me`, `/content`, `/about`). |
| **Collection** | One of seven editorial types (Articles, AI Experiments, Workflows, Case Studies, Changelog, Research Notes, Newsletters). |
| **Pillar** | One of eight content pillars (`pillars.js`). First-class, fixed, authoritative. |
| **Entry** | A single editorial JSX module with `entry` frontmatter + `Body` component. |
| **Surface** | Any rendered route or section (registered in `SURFACES`). |
| **Composer** | A `pages/<Track>.jsx` file: imports + JSX, < 60 lines. |
| **Primitive** | A reusable component from `src/components/ui/` or namespace folders. |
| **Glass tier** | `glass-panel-1` / `-2` / `-3` — canonical surfaces. |
| **EASE** | `[0.16, 1, 0.3, 1]` — the only motion curve. |
| **Swap-point** | A file (`match.js`, `assistant.js`, `embedEntry()`) where a real implementation drops in without consumer changes. |
| **Audience layer** | The local-first continuity store (`yc_audience_v1`). For visitor UX, never the creator's analytics. |
| **NullAssistant** | Default `CreatorAssistant` implementation. Returns deterministic graph picks. |
| **Build-in-public** | Public PRs, public lessons, public commits, public failures. The brand's core thesis. |

---

## 16. Closing clauses

- **Amendments**: This contract is amended only by direct edit to this file, with the change rationale in the commit message.
- **Conflict resolution**: When this contract conflicts with a phase report, *this contract wins*.
- **Reading order for new agents**: §1 (identity) → §14 (guardrails) → §10 (engineering) → relevant section for the work.
- **Default invocation**: `Read and obey YUVALCODE_PLATFORM_CONTRACT.md.`

*End of YUVALCODE_PLATFORM_CONTRACT.md.*
