# Creator operations scripts

Operator-facing tooling. Phase 3.4 layer. Every script here:

- Hydrates the editorial registry via Vite's SSR loader.
- Calls into `src/lib/operations/*` — pure functions, no DOM, no React.
- Writes to stdout / stderr only. No build artifacts.
- Exits non-zero on errors so a CI gate can wrap it.

Nothing here is imported by visitor-facing pages. The runtime bundle is unaffected.

## Scripts

| Command | Script | Intent |
|---|---|---|
| `npm run ops:validate` | `validate-content.mjs` | Per-entry shape + polish check across the whole registry. |
| `npm run ops:doctor`   | `content-doctor.mjs`   | Composite ecosystem health: validation + graph integrity + distribution. |
| `npm run ops:changelog -- --phase X.Y --title "…" --summary "…"` | `changelog-draft.mjs` | Compose a ready-to-paste changelog entry skeleton. |
| `npm run ops:release` | `release-stamp.mjs` | Print the active release ledger row + build stamp. |

Run nothing here in CI without explicit reason — these are operator tools, not pre-build gates. If you want a gate, wrap `ops:validate` and `ops:doctor`; they exit non-zero on errors only.
