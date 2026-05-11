# BRAND_V2.md — Creator HQ thesis
**Project:** YuvalCode — premium HQ of Yuval Zakai's YouTube ecosystem and AI/tech brand
**Date:** 2026-04-30
**Supersedes:** `BRAND_BLUEPRINT.md` (2026-04-29) on every point where the two conflict.
**Companion:** `PROJECT_BRAIN.md` (technical audit — still valid for bugs/SEO/a11y/performance debt).

> The 2026-04-29 blueprint reframed YuvalCode as a person-centric recruiter portfolio with the catalog as one proof section. The user explicitly rejected that on 2026-04-30. This document is the new contract.

---

## 1. Thesis

YuvalCode is **the premium headquarters of Yuval Zakai's YouTube + AI creator brand**.

It is not primarily a recruiter portfolio. Recruiters are welcome and served, but the site is built first to:

1. **Drive YouTube subscriptions.**
2. **Drive content discovery + bingeing.**
3. **Establish brand authority** (modern, AI-native, builder-creator).
4. **Build community trust.**
5. **Position Yuval as a credible AI builder.**
6. **Open future career opportunities** — the byproduct, not the goal.

The site reads like a premium creator-lab × modern AI startup, not like a job-hunt CV.

## 2. Identity

**Name:** יובל זכאי / Yuval Zakai
**Brand wordmark:** YuvalCode (kept — it has YouTube + domain equity)
**Three roles:** Creator · Software Educator · AI Builder
**One-line positioning:** Software + AI Creator — building with AI in public, teaching what I learn, shipping every week.
**Tone:** confident, AI-native, builder-energy, Hebrew-first, hype-light.

## 3. Eight content pillars

Every piece of content + every section maps to one of these:
1. C# / programming education
2. MAT exam solutions (Mahat catalog — the existing library stays, gets reframed as the "Programming" pillar's flagship)
3. AI tools education
4. Claude Code workflows
5. Anti Gravity systems
6. Obsidian productivity / knowledge systems
7. Building with AI publicly
8. The growth journey (the creator's own arc)

## 4. New homepage section order (the spine of the redesign)

1. **Hero** — Yuval Zakay / YuvalCode · Software + AI Creator. Subscribe + Watch latest as primary CTAs.
2. **Latest Content Hub** — live YT pull, hero video + 3-strip, designed to make a first-time visitor binge.
3. **Learn Programming** — C# / Mahat / fundamentals entry. Routes into existing exams catalog.
4. **Learn AI Tools** — Claude Code · Anti Gravity · Obsidian · agent workflows. New track.
5. **My Creator Stack** — the tools I use, integrated as ecosystem badges + animated icon strip. Tasteful, not logo spam.
6. **Featured Projects** — 3 projects, builder credibility (this site, Mahat library, an AI build).
7. **Why Follow Me** — 3-card differentiator block (creator-energy version of the recruiter "why work with me").
8. **Work With Me** — recruiter + private-lessons + collab paths, consolidated. Not the lead.
9. **Join the Journey** — newsletter / subscribe / WhatsApp community CTA. Final conversion bar.

The footer keeps real socials, real ORT credit, privacy/terms.

## 5. Routes (after pivot)

```
/                          → New creator-HQ home (the spine above)
/content                   → Content hub: filter by pillar (programming / AI / build-in-public / journey)
/programming               → Learn Programming track (Mahat catalog + fundamentals)
/programming/exams         → existing /exams (preserved, redirected)
/programming/exams/:slug   → existing /videos?pid= (made crawlable later)
/ai                        → Learn AI Tools track (Claude Code / Anti Gravity / Obsidian / agent workflows)
/stack                     → My Creator Stack (deep version of the home section)
/projects                  → Featured Projects (replaces /work in v2 thesis)
/about                     → Long-form story, creator origin, AI direction
/work-with-me              → Hire / private lessons / collab (replaces /contact's "hire me" framing)
/contact                   → Generic contact (kept simple)
/privacy /terms            → unchanged
```

`/cv` from the v1 blueprint is **deferred** — not removed, but no longer a primary route. If recruiter traffic warrants it later, add it as a hidden route linked from `/work-with-me`.

`/coming-soon` is removed. Anything that doesn't ship doesn't get an empty page.

## 6. Visual language

- **Aesthetic:** premium creator lab × futuristic tech content hub × elite YouTube brand × AI productivity ecosystem × modern innovation workspace.
- **Surface:** single canonical `#0A0B10`-class deep navy/black. Stop the 3-shade drift.
- **Accent:** restrained indigo (`primary: #6366f1`) used as glow, not wash. Secondary purple used sparingly. Accent pink reserved for one or two AI/creator highlights.
- **Tool ecosystem treatment:**
  - Ecosystem badges in the Creator Stack section.
  - Animated icon strip ("trusted workflow wall") on home + about.
  - Subtle ambient visuals on AI track pages.
  - **Never** scatter logos as decoration. Every logo must have a labeled context.
- **Type:** Heebo for body, Inter for display, JetBrains Mono for stats/code chips. Strict scale.
- **Motion:** one easing curve, four duration steps. Reduced-motion guard everywhere.
- **RTL:** must remain perfect. Logical properties, not `left/right`.

## 7. Recruiter handling (downgraded but not ignored)

Per the v1 blueprint, recruiters got a dedicated `/cv` page, status pill in the hero, ATS-friendly PDF. In v2:
- Hero does **not** open with a status pill. The hero opens with creator identity.
- `/work-with-me` consolidates recruiter / private-lessons / collab paths. A small "Open to opportunities" note lives there, not in the hero.
- A downloadable CV link belongs in `/work-with-me`, not in the global nav.
- Tech-stack chips show up in `/stack` and in featured-projects cards, not as a recruiter scan strip on home.

## 8. Constraints (non-negotiable)

- **Hebrew-first** copy. English mirrors only where genuinely useful.
- **RTL perfect** at every screen size.
- **Mobile elite** — 375 px is the design target, not an afterthought.
- **Performance high** — Lighthouse mobile Performance ≥ 90, JS ≤ 180 kB gzipped, LCP ≤ 2.5 s.
- **Accessibility** — WCAG 2.2 AA minimum. Keyboard, screen-reader, prefers-reduced-motion all must work.
- **No childish, no random, no logo spam.** Premium bar.

## 9. What stays from v1

- `PROJECT_BRAIN.md` technical audit (bugs, SEO, a11y, performance debt) is still authoritative.
- The YouTube service layer, video normalizer, exam sort, and React/Vite/Tailwind/Framer baseline.
- Existing Mahat catalog content and routing — re-skinned and re-homed under `/programming`, not deleted.
- Tailwind shade scales + animation tokens (already added in `tailwind.config.js` since the v1 audit).

## 10. What changes from v1

- Hero copy → creator identity, not "developer for hire."
- Section order → creator-HQ spine, not recruiter-scan order.
- Routes → content + creator + AI tracks, not /work + /teaching + /cv.
- `/cv` deferred.
- `/coming-soon` removed.
- AI track is now a first-class pillar, not a "future" mention in About.
- Creator-stack section is a first-class home block, not a Skills tier table.

## 11. Execution order (proposed phases)

Each phase is a discrete PR-sized chunk. None breaks main.

**Phase A — Foundation reframe (1 PR)**
- Replace `HeroSection` copy + structure with creator-HQ hero (subscribe-led).
- Build `LatestContentHub` component (re-uses existing `fetchLatestVideos`) replacing the current "חדש בערוץ" strip.
- Build `MyCreatorStack` component (badges + animated icon strip; no real tracking yet, just the visual block).
- Reorder home sections to the v2 spine.

**Phase B — New tracks (1 PR)**
- New `/ai` page (Learn AI Tools) — placeholder content + section structure.
- Rename `LearningPathways` block to "Learn Programming + Learn AI" dual-track on home.
- Add `/projects` page (Featured Projects) — start with this site + Mahat library + 1 AI build.

**Phase C — Identity + community (1 PR)**
- "Why Follow Me" block.
- "Join the Journey" final CTA block (newsletter + WhatsApp + subscribe).
- Update About page tone from teacher-CV → creator origin story + AI direction.

**Phase D — Routing + redirects (1 PR)**
- `/exams` → `/programming/exams` (with redirect).
- `/work-with-me` route created; `/contact` simplified.
- Remove `/coming-soon`.

**Phase E — Polish (1 PR)**
- Surface-color standardization (`#0A0B10`).
- Tool-logo asset set (SVG, dark-mode-tuned).
- Reduced-motion + a11y pass on the new components.
- Mobile-first review at 375 px.

Phases A–C are the visible work. D–E are the cleanup.

---

*End of BRAND_V2.md.*
