# Changelog

Notable changes to the `www.dipnot.app` landing site.

Format: reverse chronological, one heading per date (`## YYYY-MM-DD`),
one bullet per change with a PR link when available. Keep entries
terse — the commit message and PR body carry the full reasoning.

## 2026-10-10

- **Legal / competition** — Updated
  [`yarisma-kosullari.html`](yarisma-kosullari.html) (Son Güncelleme
  10 Ekim 2026) with Nev's new calendar and prize. **Madde 4:** voting
  opens 10 Ekim 2026 00:00 (was 15 Eylül), closes 31 Aralık 2026 23:59
  TSİ (was 15 Aralık), winner announced 15 Ocak 2027 (was 5 Ocak; also
  Madde 8). **Madde 5:** the candidate list stays frozen at TSSF's
  **15 Eylül 2026** register (Nev; the imported list is that
  snapshot). The sentence no longer calls it "the date voting
  started", since voting now opens 10 Ekim. **Madde 7:** the 10.000 TL diver.com.tr discount is
  replaced by a **Shearwater Peregrine dive computer (690 €)**; the
  badge and certificate stay (Nev chose replacing only the discount over
  replacing the whole list). **Madde 6 tie rule:** a device can't be
  split, so the old "split the discount equally" no longer works. Nev
  chose **every tied winner gets the full prize set, including a
  Peregrine each**, over one device plus an equivalent-value prize for
  the others, and over going back to "Dipnot decides" (rejected in #121
  as the weakest if challenged). `sitemap.xml` `lastmod` bumped.
- **Brand assets** — Favicons are round again, at Nev's request, and
  **diverge from canon**. The canonical web icons in
  `dna_core_docs/assets/app-icon/` (adopted earlier today) are an
  opaque square Sky Captain tile; landing goes back to the pre-10-09
  look: a full-bleed Sky Captain disc with transparent corners, and
  the teal mark at 88 % so its ring sits just inside the disc edge.
  Source: [`img/icons/icon-round.svg`](img/icons/icon-round.svg),
  which reuses the `logo.svg` master's two paths unchanged. Rendered
  with `rsvg-convert` at 16/32/48/180/192/512; `favicon.ico` packs
  16/32/48 as PNG entries. The variance has been reported to core-docs.
- **Brand assets** — Re-exported every logo copy from the new
  `dna_core_docs` artwork
  ([dna_core_docs#176](https://github.com/Dipnot-App/dna_core_docs/pull/176)).
  The 9 `img/logos/*.svg` are copied byte-for-byte from
  `assets/logo/` (now 2160-unit coordinates), and the 9 PNGs are
  re-rendered from them at 708 px with `rsvg-convert`. The favicon set in
  `img/icons/` is copied from `assets/app-icon/` and renamed to the
  existing filenames, so no references change. **Visible change:**
  the old icons were a full-bleed transparent circle; the canonical
  web icons are an opaque Sky Captain square tile with the mark
  inside 1/6 clear space, per that README. `img/og/og-default.png` is
  **held**: mobile has asked core-docs to switch the OG default to
  Option B, so it is re-exported once that is decided.
- **Repo** — `.gitignore` now ignores `.claude/` (per-machine Claude
  Code permission approvals), matching `dna_core_docs`.
- **Runtime** — Adopted the project's Node 24 rule
  (`dna_core_docs` → `development-rules/code-quality.md`): new
  [`.nvmrc`](.nvmrc) `24.20.0`, `engines.node: ^24` in
  [`package.json`](package.json), and CI reads `node-version-file:
.nvmrc` instead of a hardcoded `22`. Landing was the last repo
  without it, and the gap had already bitten: `html-validate` 11
  needs `fs.globSync` (Node 22+), so `check:html` crashed on a Node
  20 local shell while CI on 22 stayed green.
- **Docs** — Swept the 14 stale `core_docs` references in this file
  after the local `core_docs` → `dna_core_docs` rename (2026-09-14).
  One pointed at the inbox, which moved to `dna_communication` on
  2026-09-13, and was repointed there rather than renamed. Every
  rewritten path was checked against the filesystem. Entry text is
  unchanged; only paths move, per `dna_core_docs`'s 2026-09-14
  ruling that historical entries are swept.
- **Deps** — `npm audit fix` (non-breaking, lockfile only) to clear
  the one critical advisory that fails the `--audit-level=critical`
  gate: `proxy-addr` 2.0.7 → 2.0.8 (IP spoofing via IPv4-mapped IPv6,
  dev-only via `@lhci/cli` → `express`). Also pulls `sharp` 0.35.5,
  superseding Dependabot #141.

## 2026-05-13

- **SEO** — Added a proper 1200×630 social-preview master at
  [`img/og/og-default.png`](img/og/og-default.png) (27 KB, sRGB,
  white logo centered on Sky Captain `#131B26`). Pointed
  `_data/site.json` → `ogImage` at the new URL — all six pages
  pick it up automatically since none override `og.image`. Added
  [`scripts/build-og.js`](scripts/build-og.js) +
  [`npm run build:og`](package.json) for re-running when the logo
  master changes; introduces `sharp` as a devDep. Closes
  [#72](https://github.com/Dipnot-App/www.dipnot.app/issues/72).
  Mirror to `dna_core_docs/assets/og/` requested via inbox.
- **Assets** — Moved the six favicon files from the repo root into
  [`img/icons/`](img/icons/) and updated references in
  [`_includes/layouts/base.njk`](_includes/layouts/base.njk),
  [`site.webmanifest`](site.webmanifest), and the `ogImage` URL in
  [`_data/site.json`](_data/site.json). Dropped the now-unused
  `*.png` and `*.ico` root passthroughs in
  [`eleventy.config.js`](eleventy.config.js). Closes
  [#11](https://github.com/Dipnot-App/www.dipnot.app/issues/11).
- **Landing** — Added a CSS-only hero entrance animation (rising
  bubbles, staggered column fade-rise, one-shot "okumaya" glow
  pulse). Disabled under `prefers-reduced-motion: reduce`.
  [#80](https://github.com/Dipnot-App/www.dipnot.app/pull/80).

## 2026-04-25

- **Tooling** — Added Prettier (`^3.8.3`) plus `format`, `format:check`,
  and `audit` scripts in [`package.json`](package.json), a minimal
  [`.prettierrc.json`](.prettierrc.json) (mirrors admin's config minus
  the Tailwind plugin), and a [`.prettierignore`](.prettierignore)
  covering `_site/`, `node_modules`, `package-lock.json`, `.claude/`,
  `*.njk` (Nunjucks — no built-in Prettier parser), `sitemap.xml`,
  `*.svg`, and `img/`. Closes the first half of the `dna_core_docs`
  2026-04-24 code-quality-gaps ask (formatter + audit script);
  Dependabot was already wired via
  [`.github/dependabot.yml`](.github/dependabot.yml). No repo-wide
  reformat yet — `format:check` reports 13 pre-existing files; that
  reformat ships as a separate PR for clean review.
- **Formatting** — Repo-wide `prettier --write .` over the 13
  previously-flagged files (4 HTML pages + 4 legal pages + 3 JS
  files + `css/styles.css` + `CHANGELOG.md` + `site.webmanifest`).
  Pure-whitespace + quote-style changes — no semantic diffs, save
  two incidental fixes Prettier caught: a stray double-semicolon
  in [`css/styles.css`](css/styles.css) (`rgba(…);;` → `rgba(…);`)
  and a trailing-newline miss on the same file. Bumped
  `cssVersion` and `jsVersion` to `260425_1` in
  [`_data/site.json`](_data/site.json) to cache-bust.
- **Layout fix** — Stripped the 2-space indent in front of
  `{{ content | safe }}` in [`_includes/layouts/base.njk`](_includes/layouts/base.njk).
  Prettier's YAML-frontmatter canonicalization inserts a blank
  line after the closing `---`, which combined with the old indent
  produced a rendered line with trailing whitespace (tripped
  `html-validate`'s `no-trailing-whitespace` rule on every page).
  Left-aligning the expression eliminates the issue; rendered
  HTML whitespace is inconsequential.

## 2026-04-24

- **Design** — Equal-height cards in `#features` and `#how-it-works`
  on [`index.html`](index.html). Bulma columns stretch to row height
  by default, but `.card` stays at content height — so varying text
  lengths produced uneven card rows. Added a small rule in
  [`css/styles.css`](css/styles.css) making each card `flex: 1`
  inside its flex column. Bumped `cssVersion` for cache-bust.
- **Privacy (Phase D)** — Regenerated the Firebase Cloud Functions
  (contact form) entry in [`gizlilik-politikasi.html`](gizlilik-politikasi.html)
  and [`privacy-policy.html`](privacy-policy.html) to reflect the
  `us-central1` → `europe-west1` migration (Belgium, EU). Dropped the
  KVKK art. 9 cross-border framing from the contact-form snippet —
  processing is now inside EU/EEA, matching the `eur3` Firebase entry
  pattern. Snippets pulled verbatim from the registry at
  [`dna_core_docs/data-processors.md`](../dna_core_docs/data-processors.md).
  Bumped `Son Güncelleme` / `Last updated` to 2026-04-24 in both
  files. Closes the `dna_core_docs` 2026-04-21 Phase D ask.
- **Issue infra** — Provisioned the status axis (`status:triage`,
  `status:blocked`, `status:wontfix`, `status:good-first-issue`) by
  renaming the bare `blocked` label to `status:blocked` and adding
  the missing three. Deleted GitHub's 9 default labels (`bug`,
  `enhancement`, `documentation`, `duplicate`, `good first issue`,
  `help wanted`, `invalid`, `question`, `wontfix`) per the
  Replacement policy. Added [`.github/ISSUE_TEMPLATE/bug_report.md`](.github/ISSUE_TEMPLATE/bug_report.md)
  and [`.github/ISSUE_TEMPLATE/feature_request.md`](.github/ISSUE_TEMPLATE/feature_request.md)
  with `status:triage` front-matter so new issues auto-tag for triage.
  Landing's diverged `type:` / `priority:` / `area:` taxonomy
  (finer-grained than the `dna_core_docs` canonical — `p0..p3` vs.
  `high/medium/low`, and landing-specific areas `a11y`, `seo`,
  `privacy`, `ci`, `brand`) is preserved as intentional drift;
  variance to be formalized in `dna_core_docs/development-rules/issues.md`
  (ask queued).

## 2026-04-21

- **CI** — Removed `continue-on-error: true` from the `Validate HTML`
  step in [`.github/workflows/ci.yml`](.github/workflows/ci.yml) — now
  a hard gate. Enabled by [PR #60](https://github.com/Dipnot-App/www.dipnot.app/pull/60)
  clearing all 30 pre-existing errors. Pa11y + Lighthouse remain soft
  until their own backlogs are cleared (tracked under epic
  [#32](https://github.com/Dipnot-App/www.dipnot.app/issues/32)).
- **Brand assets** — Audited every brand-logo reference against the
  [asset-naming rule](../dna_core_docs/product-design/logo.md#naming-rule)
  ratified in `dna_core_docs` on 2026-04-20. Result: **0 renames needed.**
  [`img/logos/`](img/logos/) already carries all 9 master filenames
  (6 solo + 3 composed) as both SVG and PNG exports, matching
  [`dna_core_docs/assets/logo/`](../dna_core_docs/assets/logo/). All
  references in code ([`_includes/partials/nav.njk`](_includes/partials/nav.njk),
  [`_includes/partials/footer.njk`](_includes/partials/footer.njk),
  [`brand-book.html`](brand-book.html)) already use the master names
  (`logo.svg`, `logo-gold.svg`, `logo-white-on-teal.svg`,
  `logo-white-on-sky-captain.svg`). Favicon set at repo root
  (`favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`,
  `apple-touch-icon.png`, `android-chrome-192x192.png`,
  `android-chrome-512x512.png`) keeps its platform-standard filenames
  per the rule's exception clause.
- **Privacy policy** — Mirrored the Expo (Push + OTA Updates) and
  Google Analytics US-servers additions from
  [`dna_core_docs/data-processors.md`](../dna_core_docs/data-processors.md)
  into [`gizlilik-politikasi.html`](gizlilik-politikasi.html) (TR,
  authoritative) and [`privacy-policy.html`](privacy-policy.html) (EN
  mirror). Expo entry now covers OTA launch-time pings to
  `u.expo.dev` (app install ID, runtime version, update channel)
  alongside push tokens + stability metadata. GA entry gained a
  closing sentence disclosing USA processing (no user-configurable
  region on standard Firebase projects). Bumped `Son Güncelleme` /
  `Last updated` to 2026-04-21. Contributes to epic
  [#30](https://github.com/Dipnot-App/www.dipnot.app/issues/30).
- **HTML quality** — Cleared every error surfaced by
  `npm run check:html` (30 → 0). Root causes: Nunjucks `{% if %}`
  conditional meta tags leaving trailing whitespace when a frontmatter
  key was unset (base.njk); Bulma's legacy `<a role="button"
class="navbar-burger">` (nav.njk → swapped to `<button>`);
  `<th>` cells missing `scope` attributes in the KVKK personal-data
  processor tables (gizlilik-politikasi.html + privacy-policy.html).
  Contributes to epic [#32](https://github.com/Dipnot-App/www.dipnot.app/issues/32).
  Landed via [PR #60](https://github.com/Dipnot-App/www.dipnot.app/pull/60).
- **Typography** — Added `.text-caption` (12 px), `.text-small` (14 px),
  and `.text-lead` (18 px) helper classes in [`css/styles.css`](css/styles.css)
  for the canonical type-scale tokens Bulma doesn't cover (Bulma jumps
  16 → 20 with no 18 step). Completes the Inter adoption ask from
  `dna_communication/to-landing.md` (2026-04-19). Spec:
  [`dna_core_docs/product-design/typography.md`](../dna_core_docs/product-design/typography.md).
  Closes [#52](https://github.com/Dipnot-App/www.dipnot.app/issues/52).
  Landed via [PR #58](https://github.com/Dipnot-App/www.dipnot.app/pull/58).
- **Repo hygiene** — Added `.DS_Store` + `**/.DS_Store` to
  [`.gitignore`](.gitignore). Landed via
  [PR #57](https://github.com/Dipnot-App/www.dipnot.app/pull/57).

## 2026-04-19

- **Typography** — Loaded **Inter** via Google Fonts CDN in
  [`_includes/layouts/base.njk`](_includes/layouts/base.njk) (with
  preconnect hints) and overrode Bulma's default font stack in
  [`css/styles.css`](css/styles.css) so body, headings, `.title`, and
  `.subtitle` all pick up Inter. Cross-surface font ratified in
  [`dna_core_docs/product-design/typography.md`](../dna_core_docs/product-design/typography.md)
  (landed via dna_core_docs PR #67 / issue #18). Landed via
  [PR #50](https://github.com/Dipnot-App/www.dipnot.app/pull/50).
