# /public assets

Files dropped here are served at the site root.

## Required for production (drop in before launch)

- **`cv.pdf`** — Public résumé. Linked from the navbar, the hero, and the
  upcoming `/work-with-me` page. The site references `/cv.pdf` (see
  `SITE.cvUrl` in `src/lib/constants.js`). No phone number — email +
  LinkedIn + GitHub only, per brand decision.

- **`og-image.png`** — Open-graph share card. **1200 × 630 px**, dark
  background (`#07080d`), with the YZ monogram, the wordmark
  "Yuval Zakay", and the tagline "Software Educator · AI Builder ·
  Modern Tech Creator". Referenced from `index.html` and `PageMeta.jsx`.

Until those two land, the site will still build and run — the CV button
will 404 and shared links will render without a preview image.

## Already present

- `favicon.svg` — YZ monogram (gradient on dark capsule).
- `grid.svg`, `grid-pattern.svg` — atmospheric grids used in hero/about/contact.
- `logo.png` — legacy raster logo (kept for now; consider removing once all
  references migrate to `<YZMonogram />`).
