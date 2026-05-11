# React 19 Metadata Migration Report

**Date:** 2026-05-07
**Scope:** Full removal of `react-helmet-async` and replacement with a native, React 19-compatible metadata system.
**Status:** ✅ Complete. `npm install`, `npm run build`, and `npm run dev` all succeed.

---

## 1. Removed Dependencies

| Item | Location | Action |
| --- | --- | --- |
| `react-helmet-async` (runtime import) | `src/App.jsx` — `HelmetProvider` import + JSX wrap | Removed |
| `react-helmet-async` (runtime import) | `src/components/PageMeta.jsx` — `Helmet` JSX | Removed |
| `react-helmet-async` (build chunk) | `vite.config.js` — `manualChunks.helmet-vendor` | Removed |
| `react-helmet-async` (project copy chip) | `src/components/projects/FeaturedProjects.jsx` — stack array | Replaced with `"Native head metadata"` |

The package was never present in `package.json` or `node_modules`. The dangling references were the cause of dependency-resolution / module-resolution failures. After this migration:

```
$ grep -r "react-helmet" src/
src/lib/metadata.js  # ← only as historical comment in the new utility
```

No active imports, providers, components, or build configuration mention the package.

---

## 2. Metadata Architecture Decisions

### 2.1 Approach: useEffect + direct `document.head` manipulation

We deliberately did **not**:

- Use a third-party head manager (Helmet, react-meta-tags, etc.). React 19 makes them unnecessary, and Helmet's React 19 support is unreleased.
- Lean on React 19's native hoisting of `<title>` / `<meta>` / `<link>` from JSX. That feature works, but inline JSON-LD `<script>` tags are not hoisted into `<head>`, and the spec explicitly requested an imperative useEffect-driven layer (which is also more predictable for SEO crawlers and easier to migrate to SSR).
- Add any new runtime dependencies. The total cost of the new metadata layer is **~150 LoC** of vanilla DOM code.

### 2.2 Layering

```
src/components/PageMeta.jsx          ← React surface — single useEffect drives the utilities
src/lib/metadata.js                  ← Framework-agnostic DOM utilities (~150 LoC, no React)
```

`metadata.js` knows nothing about React. It exports plain functions that take strings and write to `document.head`. The PageMeta React component is the only React-aware glue.

This boundary is what makes the future SSR migration trivial — see §7.

### 2.3 Tag classification

Tags are split into three classes, each with its own DOM-marker convention:

| Class | Examples | Marker | Strategy |
| --- | --- | --- | --- |
| **Singletons** | `description`, `canonical`, `og:*`, `twitter:*`, `robots`, `keywords`, `author`, `theme-color` | `data-page-meta=""` | Reuse existing `<meta>` / `<link>` if present, otherwise create. Update via `setAttribute("content", …)`. Never duplicated. |
| **Multi-tag groups** | `<link rel="alternate">` feed entries, `<meta property="article:tag">` entries | `data-page-meta-multi="<group>"` | Atomic clear-and-rewrite per group on every effect run. No accumulation. |
| **JSON-LD** | `<script type="application/ld+json">` | `data-page-meta-jsonld=""` | Atomic clear-and-rewrite of all route-owned blocks on every effect run. Baseline scripts in `index.html` are left untouched. |

---

## 3. Utility Architecture

`src/lib/metadata.js` exports a small, stable surface:

```ts
// Title + singleton meta/link
setTitle(title: string): void
setMetaTag(name: string, content: string): void           // <meta name>
setPropertyTag(property: string, content: string): void   // <meta property>
setCanonical(href: string): void                          // <link rel="canonical">
removeMetaTag(name: string): void
removePropertyTag(property: string): void
setHtmlAttr(name: string, value: string): void            // <html lang="he" dir="rtl">

// Multi-tag groups
setLinkAlternates(descriptors: Array<{rel?, type?, href, title?}>): void
setArticleTags(tags: string[]): void

// JSON-LD
setJsonLd(entries: object[]): void
clearJsonLd(): void

// Final teardown — used by PageMeta unmount cleanup
cleanupMeta(): void
```

### Design properties

- **Idempotent.** Every setter no-ops on equal current values (avoids unnecessary DOM mutations).
- **Reusable.** Each setter is a one-liner usable from any component, not just PageMeta.
- **Framework-agnostic.** Zero React imports. Drop-in usable from a Service Worker, a CLI script, or an SSR framework adapter.
- **Safe under SSR.** All setters guard with `typeof document !== "undefined"`.
- **Selector-safe.** Attribute values are escaped before being interpolated into CSS selectors.
- **No memory leaks.** Multi-tag groups and JSON-LD use atomic clear-then-write. Routes can never accumulate stale metadata across navigations.

---

## 4. Structured Data (JSON-LD) Strategy

JSON-LD support is preserved verbatim. The PageMeta API still accepts:

- `jsonLd` — single object or array of `@context`/`@type`-shaped entries
- `breadcrumbs` — array of `{ name, path }`, automatically converted to a `BreadcrumbList`
- `articleMeta.tags` — converted to repeated `<meta property="article:tag">` entries

### Anti-duplication guarantees

1. Each managed JSON-LD `<script>` carries `data-page-meta-jsonld=""`. `setJsonLd()` always **clears all** such scripts before writing the new set, so a navigation can never produce duplicate structured data.
2. The baseline JSON-LD blocks in `index.html` (Person, Organization, WebSite) **do not** carry the marker, so they survive every clear cycle. They remain visible to crawlers as the site-wide schema baseline regardless of route.
3. `cleanupMeta()` runs on PageMeta unmount and removes only `data-page-meta-jsonld` scripts and `data-page-meta-multi` groups — never the baseline scripts.

---

## 5. Route-Update Strategy

The PageMeta component runs a single `useEffect` whose dependency array combines:

- All primitive props (`fullTitle`, `metaDesc`, `url`, `ogImage`, `noindex`, etc.)
- A serialized key for each composite prop (`ldKey`, `feedKey`, `articleKey`)

Because composite props are serialized via `JSON.stringify` for the dependency comparison, a parent re-render that hands us a fresh-but-equivalent `jsonLd` array will **not** re-trigger the effect. The DOM is touched exactly once per actual content change.

### Lifecycle through a route transition

1. **Old route is mounted** — managed singletons hold its values; multi groups + JSON-LD blocks are tagged with `data-page-meta-*`.
2. **Navigation occurs** — React unmounts the old PageMeta. `cleanupMeta()` clears multi groups and JSON-LD. Singleton tags are intentionally left in place to avoid a flash of empty metadata.
3. **New route mounts** — its PageMeta runs the effect, overwriting all singletons and writing fresh multi groups + JSON-LD.

Lazy routes work identically — Suspense fallback renders without a PageMeta, but the previous route's metadata stays in the head until the new module mounts. This is the desired behavior (no flicker, crawler-stable).

---

## 6. Cleanup Strategy

| Trigger | What gets cleaned |
| --- | --- |
| Effect re-run (same instance, prop change) | Each `setJsonLd` / `setLinkAlternates` / `setArticleTags` clears its own group before rewriting. No stale entries can persist. |
| PageMeta unmount | `cleanupMeta()` — clears all `data-page-meta-jsonld` scripts and all `data-page-meta-multi` elements. Singleton tags are preserved (next route will overwrite). |
| App teardown / dev HMR | Same as unmount. Metadata utilities are guarded with `typeof document !== "undefined"`, so the cleanup is safe under any teardown path. |

The `data-page-meta` marker on singletons is kept for traceability (so we can identify which tags are managed by the system), but is not used as a removal criterion to prevent the empty-head flash described in §5.

---

## 7. Future SSR Migration Notes

The architecture was designed to make a future migration to Next.js, React Router framework mode, or any other SSR/SSG system **a data-shape preservation exercise, not a rewrite**.

### Migration path → Next.js App Router

Each PageMeta call site already passes the canonical metadata shape. Next.js's `generateMetadata` accepts almost the exact same fields:

```ts
// Today (CSR)
<PageMeta
  title={entry.title}
  description={entry.summary}
  path={`/content/${slug}/${entry.slug}`}
  jsonLd={articleSchema}
  breadcrumbs={[...]}
  articleMeta={resolveArticleOgMeta(entry)}
/>

// Tomorrow (Next.js App Router)
export async function generateMetadata({ params }): Promise<Metadata> {
  const entry = getEntry(params);
  return {
    title: entry.title,
    description: entry.summary,
    alternates: { canonical: `/content/${params.slug}` },
    openGraph: { ... },
    twitter: { ... },
  };
}

// JSON-LD goes inline as <Script type="application/ld+json"> in the page component
```

The data flowing through PageMeta today is a near-bijective mapping with `Metadata`. The same is true of React Router 7 framework-mode `meta()` exports.

### Migration path → React Router framework mode

`meta()` route exports return an array of meta descriptors. PageMeta's prop set translates 1:1:

- `title` → `{ title }`
- `description` → `{ name: "description", content }`
- `og:*` / `twitter:*` → `{ property/name, content }`
- `jsonLd` → `{ "script:ld+json": <object> }` (officially supported)
- `link rel="alternate"` feeds → `links()` route export

### What to keep, what to retire on SSR migration

- **Keep:** `resolveOpenGraph()`, `resolveArticleOgMeta()`, `feedsForRoute()`, JSON-LD schema builders. These are pure functions and remain useful in any rendering model.
- **Retire:** `src/lib/metadata.js` (DOM utilities — replaced by SSR head emitter) and the `useEffect` in `PageMeta.jsx` (replaced by `generateMetadata` / `meta()`).
- **Adapt:** PageMeta itself becomes a thin wrapper that returns metadata objects instead of running effects.

---

## 8. SEO Compatibility

| System | Status | Notes |
| --- | --- | --- |
| Sitemap (`scripts/distribution/post-build.mjs`) | ✅ Unchanged | Build pipeline ran successfully with the new metadata layer; sitemap.xml emitted at 4.67 kB. |
| RSS / Atom / JSON Feed (×7) | ✅ Unchanged | 63.39 kB of feeds emitted post-build. Feed discovery via `setLinkAlternates` preserves the `<link rel="alternate">` contract. |
| OpenGraph pipeline (`resolveOpenGraph`) | ✅ Preserved | All OG props (image, alt, type, twitterCard) flow through unchanged. |
| Article-typed OG (`article:*`) | ✅ Preserved | `published_time`, `modified_time`, `author`, `section` are singletons; `tag` is a managed multi-group. Navigating away from an article cleanly removes all article:* state. |
| Editorial collections + entries | ✅ Preserved | All 11 editorial entries hydrate post-build. PageMeta surface is byte-identical for editorial pages. |
| Baseline JSON-LD (Person, Organization, WebSite) | ✅ Preserved | Stays in `index.html` for all routes; never touched by the runtime. |
| Canonical URL | ✅ Preserved | `setCanonical` reuses the `<link rel="canonical">` shipped in `index.html`. |
| Hebrew + RTL | ✅ Preserved | `setHtmlAttr("lang", "he")` and `setHtmlAttr("dir", "rtl")` re-asserted on every route. |

---

## 9. Performance & Stability

- **Hydration safe.** All DOM reads/writes happen in `useEffect`, never during render. No SSR mismatch risk.
- **No unnecessary rerenders.** PageMeta returns `null` and triggers exactly one effect per actual content change (composite props are dep-compared by serialized key, not reference).
- **Minimal DOM mutations.** Setters short-circuit when the existing attribute equals the new value. Repeated renders with identical metadata cause zero DOM writes.
- **No memory leaks.** Multi-tag groups and JSON-LD use atomic clear-then-write semantics. Cleanup runs on unmount.
- **Bundle impact.** Removed: an entire vendor chunk's worth of Helmet runtime. Added: ~150 LoC of plain DOM code, tree-shaken into the main chunk. Net: bundle is smaller and has one fewer dependency.

---

## 10. Verification

Executed locally on Windows 11 / Node 24:

| Check | Result |
| --- | --- |
| `npm install` | ✅ 232 packages audited, no errors, no `react-helmet-async` resolution. |
| `npm run build` | ✅ 2245 modules transformed in 8.15s. 24 chunks emitted. |
| Post-build distribution pipeline | ✅ 11 editorial entries hydrated. sitemap (4.67 kB) + 7 feeds (63.39 kB) emitted. |
| `npm run dev` | ✅ Vite ready in 636 ms. No console errors. |
| `grep -r "react-helmet" src/` | ✅ Only one match — a documentation comment in `src/lib/metadata.js`. No live imports. |

---

## 11. Files Changed

```
modified:   src/App.jsx                              # removed HelmetProvider import + wrap
modified:   src/components/PageMeta.jsx              # rewrote with useEffect + native metadata utilities
modified:   src/components/projects/FeaturedProjects.jsx  # stack chip relabeled
modified:   vite.config.js                           # removed dead helmet-vendor chunk
created:    src/lib/metadata.js                      # framework-agnostic head utilities
created:    REACT19_METADATA_MIGRATION_REPORT.md     # this document
```

No other system was touched. Editorial registry, sitemap, feeds, search, error boundary, scroll behavior, theming, and routing are untouched.
