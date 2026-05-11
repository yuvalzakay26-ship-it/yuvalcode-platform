# NAVBAR_RESTRUCTURE_REPORT.md

**Pass:** Navigation cleanup — responsive hierarchy, calmer bilingual balance, premium density.
**Scope:** `src/components/Navbar.jsx` only. No other files touched.
**Goal:** A breathable, editorial, AI-native navigation that feels intentional at every viewport.

---

## 1. Navigation hierarchy decisions

The previous navbar treated nine routes as equal-weight desktop items. The publication is the spine of the platform (§2.4) — three quarters of those items don't deserve a top-level slot competing with it. Hierarchy now splits cleanly into three layers:

### Primary (desktop top-level at `lg+`)

The four editorial tracks — the ones a returning visitor actually navigates *between*:

| Slot | Path        | Label       | Reason it's primary                                      |
|------|-------------|-------------|----------------------------------------------------------|
| 01   | `/content`  | תוכן        | Publication spine. Highest reread frequency.             |
| 02   | `/ai`       | AI          | Active track. Brand-defining. Technical English term.    |
| 03   | `/projects` | פרויקטים    | Build-in-public surface. Ships frequently.               |
| 04   | `/stack`    | Stack       | Tooling/technical brand surface. Stays English.          |

### Secondary (drawer-only, calmer mono register)

Surfaces that visitors hit by intent, not by browse:

- בית (`/`) — already covered by the brand logo on desktop, kept in the drawer for mobile parity.
- קטלוג מה״ט (`/exams`) — Hebrew long-tail SEO surface, important but task-driven.
- אודות (`/about`)
- צור קשר (`/contact`)

### Utility actions (right cluster, persistent)

- **Search trigger** (lg+ full pill with ⌘K hint; `<lg` collapses to a single icon button).
- **להעסיק אותי CTA** (lg+; mirrored at the top of the drawer below `lg`).
- **LinkedIn** (lg+, conditional — `SITE.linkedinUrl` is currently `null`, so the slot is invisible until configured).
- **Hamburger trigger** (`<lg` only).

### Why CTA stays — even in a "less crowded" navbar

The recruiter CTA is the platform's primary commercial action. Removing it would push the contract-defined path (`WORK_WITH_ME_PATH`, §10.3) one click deeper. It earned its persistent slot. Everything else negotiated for theirs.

---

## 2. Responsive breakpoint changes

The single biggest UX defect on the previous navbar was tablet-range crowding: nine pill links crammed into ~768px–1023px before the hamburger kicked in. Every gating class shifted up one tier:

| Element                       | Before           | After            |
|-------------------------------|------------------|------------------|
| Desktop nav rail              | `hidden md:flex` | `hidden lg:flex` |
| Search pill (with ⌘K hint)    | `hidden md:block`| `hidden lg:block`|
| LinkedIn icon                 | `hidden md:flex` | `hidden lg:flex` |
| להעסיק אותי CTA (desktop)      | `hidden md:block`| `hidden lg:block`|
| Mobile search icon            | `md:hidden`      | `lg:hidden`      |
| Hamburger trigger             | `md:hidden`      | `lg:hidden`      |
| Drawer + scrim                | `md:hidden`      | `lg:hidden`      |

Tablets and most laptops below 1024px now get the drawer experience. The desktop rail only commits to the screen when there's actually room to breathe (≥1024px).

### Container width tuning

The pill widths for the scrolled state were also tightened — the previous `lg:w-[64%]` ran wide once the link count dropped to four:

| State          | Before                            | After                                       |
|----------------|-----------------------------------|---------------------------------------------|
| Scrolled       | `md:w-[78%] lg:w-[64%]`           | `md:w-[88%] lg:w-[68%] xl:w-[60%]`          |
| Default (top)  | `md:w-[84%]`                      | `md:w-[90%] lg:w-[82%]`                     |

Net effect: more room in the drawer-mode breakpoints (md/sm) where the bar shows brand + CTA + utilities only, tighter centering on large desktops (xl) where four pills + utilities fit comfortably.

---

## 3. Desktop cleanup rationale

### Visual density

Four primary links instead of nine. Pill gap relaxed from `gap-1` to `gap-2`. The active-state spring layoutId animation now sweeps a much shorter horizontal distance, which reads as calm rather than busy.

### Why the demoted items moved, not deleted

- **בית** — the wordmark + monogram is already a click-home affordance. Carrying both was redundant on desktop. Mobile drawer keeps the labeled link for clarity.
- **קטלוג מה״ט** — task-driven Hebrew SEO surface (§9.7). It earns its URL and breadcrumb; it doesn't need to fight `Content` for top-level real estate.
- **אודות / צור קשר** — every site has these; they belong in the drawer's "more" section and the footer, not the primary rail.
- **Work With Me** — already represented by the persistent CTA. Listing both was double-promotion that crowded the right cluster.

### Motion philosophy preserved

- Single ease curve (§3.4) — `ease-premium` token used for CTA hover (unchanged).
- `whileInView` not introduced (navbar is always-present; doesn't apply).
- The active-link `layoutId="nav-active"` spring stays — it's the only deliberate motion in the rail and it earns its keep by orienting the visitor.
- The hover-bg transition was tightened from `transition-all duration-300` to `transition-colors duration-300` on the rail items — `transition-all` was animating layout-adjacent properties unnecessarily.

---

## 4. Label / language adjustments

Per the platform contract (§5.1: Hebrew-first; English mirrors only on `/cv`) and the prompt's "calmer bilingual balance" directive, labels were rebalanced:

| Path        | Before        | After       | Reason                                                            |
|-------------|---------------|-------------|-------------------------------------------------------------------|
| `/`         | בית           | בית         | unchanged (drawer only)                                           |
| `/content`  | Content       | תוכן        | Hebrew-first; navbar usage is the visitor-facing label, breadcrumbs/JSON-LD elsewhere keep "Content" as the registry key. |
| `/ai`       | AI            | AI          | technical brand term; preserved                                   |
| `/projects` | Projects      | פרויקטים    | general route, no technical justification for English             |
| `/stack`    | Stack         | Stack       | technical brand term; preserved                                   |
| `/exams`    | קטלוג מה״ט    | קטלוג מה״ט  | unchanged                                                         |
| `/work-with-me` | Work With Me link | (removed as link) | The CTA "להעסיק אותי" already serves this surface. |
| `/about`    | אודות         | אודות       | unchanged                                                         |
| `/contact`  | צור קשר       | צור קשר     | unchanged                                                         |

Final desktop rhythm: **תוכן · AI · פרויקטים · Stack** — two Hebrew, two technical-English, alternating. Reads calmly in both directions.

---

## 5. Spacing improvements

- Desktop rail gap: `gap-1` → `gap-2` (more breath between four items than was needed between nine).
- Drawer nav gap: `gap-2` → `gap-1` (tighter list, calmer rhythm) with section eyebrows (`tracks`, `more`) as visual rests.
- Drawer: `w-[85%]` → `w-[85%] max-w-md` — caps width on tablet so the drawer doesn't become a near-full overlay at 768px.
- Section divider (`border-white/[0.06]`) replaces what was a single flat list — primary tracks read as the spine, secondary surfaces read as references.
- Scrolled pill widths: tighter at `xl` (`w-[60%]`) so the navbar feels intentional, not stretched, on large desktops.

---

## 6. Accessibility verification

All §8 contract requirements preserved or strengthened:

| Concern                                | Status                                                                                                |
|----------------------------------------|-------------------------------------------------------------------------------------------------------|
| Focus trap in drawer                    | ✅ unchanged — `useEffect` with Tab/Shift+Tab handler, body scroll lock, focus restore on close       |
| ESC closes drawer                       | ✅ unchanged                                                                                          |
| Focus restore to trigger                | ✅ unchanged — `lastFocusedRef` + `triggerRef` fallback                                               |
| `aria-expanded` / `aria-controls` / `aria-haspopup="dialog"` on trigger | ✅ unchanged                                                                |
| `role="dialog" aria-modal="true" aria-label="תפריט ניווט"` on drawer | ✅ unchanged                                                                  |
| `aria-current="page"` on active NavLink | ✅ preserved on both desktop rail and drawer (primary + secondary lists)                              |
| Keyboard-visible focus rings            | ✅ `focus-visible:ring-2 ring-primary/60` retained on every interactive primitive                     |
| Hebrew aria-labels                      | ✅ all aria-labels Hebrew (no English regression — §8.7)                                              |
| Skip-to-content                         | ✅ unaffected (lives in `App.jsx`)                                                                    |
| Reduced motion                          | ✅ no new keyframes; relies on existing global `prefers-reduced-motion` guard (§7.3)                  |
| RTL                                     | ✅ logical `ps-1` for eyebrow padding; drawer remains anchored `right-0` (Hebrew-natural side)        |
| Tap target ≥ 44×44 px                   | ✅ drawer items 44px+; mobile icon buttons unchanged at 36px+ (within existing site convention)       |
| Touch device gating                     | n/a — no Tilt3D / hover-only affordances added                                                        |

---

## 7. Before / after structure summary

### Before

```
[Logo + wordmark]     [בית · Content · AI · Projects · Stack · קטלוג מה״ט · Work With Me · אודות · צור קשר]     [Search · LinkedIn · להעסיק אותי · ☰]
                                                                ▲
                                                       9 equal-weight pills
                                                       crowded md/lg, mixed-language
```

Hamburger appeared only `< md` (< 768px). Tablet range squeezed all nine pills into ~770–1023px.

### After

```
Desktop (≥ 1024px):
[Logo + wordmark]              [תוכן · AI · פרויקטים · Stack]              [Search ⌘K · להעסיק אותי]

Tablet / mobile (< 1024px):
[Logo + wordmark]                                              [🔍 · ☰]

Drawer (< 1024px):
┌──────────────────────────────┐
│ Yuval Zakay              [✕] │
│                              │
│ ┌──────────────────────────┐ │
│ │   להעסיק אותי            │ │   ← persistent CTA
│ └──────────────────────────┘ │
│                              │
│ tracks                       │   ← eyebrow (mono, dim)
│ 01  תוכן                     │
│ 02  AI                       │
│ 03  פרויקטים                 │
│ 04  Stack                    │
│ ────────────────────────     │   ← hairline divider
│ more                         │
│     בית                      │
│     קטלוג מה״ט               │
│     אודות                    │
│     צור קשר                  │
└──────────────────────────────┘
```

### Net diff

- **Top-level desktop links:** 9 → 4 (–55%).
- **Languages mixed in primary rail:** 4 (Hebrew, English, Hebrew-with-quote, English) → 2 (Hebrew, English) in alternating rhythm.
- **Hamburger active range:** `< md` (< 768px) → `< lg` (< 1024px). Tablet experience now matches mobile.
- **Drawer hierarchy:** flat 9-item list → primary-tracks block + secondary-surfaces block, separated by a hairline.
- **Build:** clean. Bundle size stable (Navbar collapses into the eager `index` chunk; no measurable delta).

---

## 8. Verification checklist

- [x] `vite build` — clean, no warnings, no size regression.
- [x] `<lg` viewports (≤ 1023px): hamburger + drawer active.
- [x] `lg+` viewports (≥ 1024px): four-pill rail + utilities visible.
- [x] RTL: drawer anchors right, eyebrows use `ps-1` (logical), no `left-/right-` layout violations introduced.
- [x] Active-state ring still uses `layoutId="nav-active"` spring (single source of motion in the rail).
- [x] Focus trap, scroll lock, ESC close, focus restore all preserved.
- [x] `aria-current="page"` propagated to both primary and secondary drawer lists.
- [x] Hebrew aria-labels throughout; no English regression.
- [x] `SITE.linkedinUrl === null` → LinkedIn slots render nothing (no placeholder).
- [x] No new dependencies. No new keyframes. No new design tokens.

---

*End of NAVBAR_RESTRUCTURE_REPORT.md.*
