# Changelog

Notable changes to the `www.dipnot.app` landing site.

Format: reverse chronological, one heading per date (`## YYYY-MM-DD`),
one bullet per change with a PR link when available. Keep entries
terse — the commit message and PR body carry the full reasoning.

## 2026-10-14

- **Competition rules Madde 10: cheating checks disclosed** — Appended
  the registry's "Hile tespiti" paragraph to `yarisma-kosullari.html`
  → 10. Kişisel Verilerin Korunması (what is compared, who sees it,
  KVKK m. 5/2-f, kept 3 months after the winner is announced, deleted
  accounts included). Both privacy policies gain only the one-sentence
  pointer to Madde 10, so their 30-day deletion doesn't contradict it.
  Copied verbatim from `data-processors.md` → Competition vote data
  (core-docs#222). Dates bumped on all three pages and in the sitemap.
- **Release 2.0.3** — ships the Chrome 109 CSS fix (#175, below), Font
  Awesome 7.3.1 (2026-10-13) and the pa11y-ci 5 / html-validate bump
  (#170).
- **CSS compiled for older browsers (#175)** — On Chrome/Edge 109 (the
  last release for Windows 7/8, reported by a visitor) the site
  rendered black: no background, invisible text. Every colour token is
  `oklch()` and many tints are `color-mix()`, both Chrome 111+.
  `css/styles.css` is now an Eleventy template run through Lightning
  CSS (targets Chrome 109, Firefox 115, Safari 15.4): hex fallbacks
  for every token, modern colours kept behind `@supports`, minified
  (gzip 20.2 → 15.4 KB). Verified in Chromium 109.0.5414 (old CSS:
  black page; new: full render) and pixel-diffed in current Chrome
  (light identical, dark max ±14/765 rounding). `color-mix()` over
  `var()` can't be resolved at build time, so some glows and tints
  stay missing on 109; accepted. Rejected: a hand-written
  `@supports not (color: oklch(…))` block (only a basic readable
  page, and 133 values to keep in sync by hand). JS minification left
  out: our JS already runs on 109 and the gain is a few KB.

## 2026-10-13

- **`agent-state.md` is gitignored** — core-docs now asks each repo
  for an `agent-state.md` (standards watermark + handoff). This repo is
  public and the file names a private repo's commit, so it stays
  local like `CLAUDE.md` rather than being committed.
- **Font Awesome 7.3.1** — Dependabot (#171) moved FA Free 6.5.2 →
  7.3.1 and broke the build: FA 7 SVGs put `fill="currentColor"` before
  `d`, so the `icon` shortcode's path regex matched nothing. The regex
  now accepts attributes in any order. All 27 icons in use exist in 7
  and each is still one `<path>`. Nev chose to keep FA 7 over reverting
  to 6.5.2; the rejected option was revert + ignore FA majors, because
  canon (`brand-usage.md`) still names FA 6 for every surface. That
  deviation is reported to core-docs as an `ask`.

## 2026-10-12

- **2.0.2: mobile performance** — Font Awesome no longer loads: the
  ~25 icons in use are inlined as SVG at build time by an `icon`
  shortcode (`eleventy.config.js`, from the `@fortawesome/fontawesome-free`
  devDependency; CC BY 4.0, credited in the README). That drops 275 KB of
  icon fonts and their CSS from every page. Inter's 85 KB latin-ext
  subset is replaced by a 3 KB file with only the Turkish letters
  outside latin (Ğ ğ İ Ş ş). Page weight: home 595 → 232 KB, legal
  pages 459 → 93 KB. Measured locally, same method before and after.
  ([#166](https://github.com/Dipnot-App/www.dipnot.app/issues/166))
- **Dev dependencies, audit** — Patched the dev-only advisories that
  have a fix, via scoped `overrides`: `tmp` ^0.2.6 and `uuid` ^11.1.1
  inside `@lhci/cli`, and `basic-ftp` ^6.2.3 (pulled in through
  Lighthouse CI's proxy agent). The three left (`braces`, `extract-zip`,
  `sprintf-js`) have no patched release; they're build/CI-only and
  unreachable with our inputs, and are recorded as accepted. No
  site-facing change; pa11y and Lighthouse pass unchanged.

## 2026-10-11

- **get.dipnot.app / app.dipnot.app restyled** to match the v2 look
  ([app.dipnot.app#8](https://github.com/Dipnot-App/app.dipnot.app/pull/8)).
  The two domains are one Vercel project serving the same pages. The
  repo is mobile-owned and changes normally go through `to-mobile.md`;
  Nev approved this one-off **UI-only** edit by landing (styles, Inter
  self-hosted, app-icon tile). Scripts, manifests and `vercel.json` are
  byte-identical. `fyi` to mobile, deviation `ask` to core-docs
  (dna_communication `7c9725c`).
- **Uptime monitoring** — UptimeRobot (free) watches `dipnot.app` and
  `get.dipnot.app`. The form functions answer GET with 405, which the
  free plan can't count as up (custom status codes are paid), so those
  two monitors are paused and function monitoring is handed to the
  functions agent (health response or Cloud Monitoring checks;
  dna_communication `5c5875e`). Tracked in #161.
- **Decisions (Nev)** — Nav label **"SSS"** without dots, since Turkish
  multi-word initialisms take none (TBMM, ABD); "S.S.S." dropped. The
  theme toggle's sun stays **warm amber**, not the brand Gold `#C49B3A`.
  Gold is reserved for admin/operator contexts in `logo.md` and is
  likely under 3:1 on the light glass. Active-section highlighting in
  the nav reuses the hover pill (Nev's call, no new style).
- **CI fixes found by the v2.0.0 PR run** (#162) — lychee's
  `--base _site` had always been invalid (lychee 0.24 needs an
  absolute path), hidden while the step was report-only; it now uses
  `--root-dir ${{ github.workspace }}/_site`. pa11y timed out once on
  `404.html` when software WebGL stalled the page while drawing the 3D
  scene; the scene now skips automated browsers (`navigator.webdriver`),
  which get the SVG shark.
- **2.0.1 follow-ups** — Mobile menu links were not tappable on the
  live 2.0.0 (the sheet inherited the nav's click-through); fixed. The
  nav now marks the section in view (same look as hover,
  `aria-current="location"`). "S.S.S." → "SSS". The download card
  shows the app icon (teal on Sky Captain, iOS-rounded) instead of the
  bare mark.
  ([#163](https://github.com/Dipnot-App/www.dipnot.app/pull/163))
- **Release 2.0.0: landing redesign ("Dalış")** — The landing is
  rebuilt from the ground up; `package.json` goes `1.0.0` → `2.0.0`.
  The previous site is tagged **`v1.0.0`** (`9b4ec4a`, the 2026-10-10
  deploy); `v2.0.0` is tagged once this deploy completes.
  - **Design system** — own `dn-` component layer in
    [`css/styles.css`](css/styles.css) on canon OKLCH tokens. Retires the
    `#04d1b2` accent drift for the ratified teal `#338596` / `#6ad0e3`.
    Liquid-glass surfaces (frost; refraction in Chromium; solid fallback
    for reduced transparency) over a fixed "ocean" that deepens as the
    page scrolls. **Bulma is gone** from every page (legal content,
    tables and forms restyled on `dn-`); its CDN link is removed.
  - **Motion** — GSAP 3.13 + ScrollTrigger + SplitText from cdnjs, SRI
    pinned in [`_data/site.json`](_data/site.json), driven by
    [`js/motion.js`](js/motion.js) on the home page only. Everything is
    visible without JS; `prefers-reduced-motion` gets a static page.
  - **3D iPhones** — [`_includes/macros/iphone.njk`](_includes/macros/iphone.njk)
    renders real app screenshots (`img-src/screens/` → `npm run
build:images` → `img/opt/`, AVIF + WebP) in a CSS 3D frame. Status
    bars normalized to 14:00 / full battery. Replaces the baked
    deviceframes PNGs; first-load images drop from ~3.5 MB to ~0.4 MB.
  - **Home page** — hero with two phones and ambient bubbles; about;
    bento features; a pinned "Nasıl çalışır?" whose phone follows the
    steps (App Store → sign-in → feed); glass FAQ on `<details>`;
    contact; download CTA. Nav is a floating glass bar; footer keeps the
    newsletter form only. Theme is applied before first paint.
  - **Copy** — claims aligned with the app (no interest picker, the
    feed is chronological): "Kaydet, sonra oku", "Hesabını oluştur".
    One address form ("sen") on the home page, nav, footer and 404;
    legal pages stay formal. FAQ cadence: almost daily, usually 5–6
    articles a week. Category labels come from the app itself.
  - **Sub-pages** keep their content and pick up the new shell: header
    and glass reading panels at the nav bar's width, Bulma forms /
    notifications / code restyled, the account-deletion form in its own
    panel. 404 rebuilt (3D phone, bubbles, nav shown). The footer links
    **Yarışma koşulları**, which wasn't linked anywhere before.
  - **Forms** — newsletter and contact validate in Turkish (no
    browser-language tooltips); the contact form mirrors the backend's
    10–2000 character rule. Network failures show a Turkish fallback
    instead of the raw "Failed to fetch" on all four forms.
  - **English** — an English version under `/en/` (home, contact,
    account deletion), with the existing EN legal pages and the brand
    book (`marka-kitabi.html` TR + `brand-book.html` EN). Each pair
    renders one template from one bilingual data file
    (`_data/home.js`, `_data/brandbook.js`, shell strings in
    `_data/i18n.js`), so TR and EN can't drift. A TR/EN switch in the
    nav goes to the page's counterpart; Turkish pages offer the
    English version to English-browser visitors (no redirect). Script
    messages come from `js/messages.js`, which also maps the Turkish
    Cloud Function replies to English. The EN hero says the app and
    its articles are in Turkish. Competition rules stay Turkish only.
  - **Performance** — Lighthouse mobile on the home page goes 69 → 98
    (gzip, as served by Pages). The hero entrance is CSS (no wait on
    GSAP), Bulma no longer loads on the home page or 404, **Inter is
    self-hosted** (`fonts/`, OFL; the Google Fonts origin is gone),
    and Font Awesome loads without blocking first paint.
  - **404** — a deep-water scene: a dive computer reading 404 m with a
    live dive timer (MM:SS, DSEG7 LCD font, OFL, `fonts/`) and a
    blinking DECO alarm; real 3D models (three.js 0.186, bundled with
    esbuild via `npm run build:shark` → `js/shark3d.js`) of a great
    white that circles in the back and makes one attack per 50 s loop,
    and an anglerfish with a glowing lure. Loaded only after the page
    is idle, never with reduced motion or without WebGL (SVG shark
    fallback). Models are CC BY 4.0, credited on the page and in
    `img-src/abyss/*-LICENSE.txt`. Bilingual (TR + `/en/` paths).
  - **Analytics (off)** — GA4 behind a KVKK consent banner
    (`js/consent.js`, footer "Çerez tercihleri"), plus Search Console /
    Bing / Yandex verification tags, all gated in
    [`_data/site.json`](_data/site.json) and **disabled** until the
    processor lands in the KVKK policy.
  - **OG** — one default `og:image` from the new set (`og-square`
    dropped).
  - **CI** — pa11y-ci (15 URLs), Lighthouse CI (error asserts) and
    lychee are now **hard gates**, joining html-validate and
    `format:check` (#34).

- **CI, faster checks** — Lighthouse now gates releases only (every
  push to `main`, before the deploy), or a PR with the `lighthouse`
  label, or a manual run; other PRs finish in about a minute. It audits
  five representative pages (home, `/en/`, privacy, contact, brand
  book) instead of 13. Checks queue per branch and the deploy has its
  own `pages` queue, so PRs no longer wait on each other and a release
  can't be cancelled by another branch's run (#123).

## 2026-10-10

- **OG test pages (temporary)** — Added unlinked, `noindex`
  `og-test/default.html` (`og-default` + `og-square`) and
  `og-test/horizontal.html` (`og-horizontal`, `summary_large_image`)
  with PNGs in `img/og-test/`, on core-docs' ask, so Nev can test the
  new OG set on real clients
  ([dna_core_docs#185](https://github.com/Dipnot-App/dna_core_docs/issues/185)).
  Standalone HTML, not the base layout, so its default og/twitter tags
  can't interfere. Not in the sitemap, not blocked in `robots.txt`
  (crawlers must reach them). `og-test/` is in `.prettierignore`
  because Prettier lowercases the doctype and `html-validate` rejects
  that. Remove the pages, images and ignore line when #185 closes.
  Landing's own default OG tags move to the new set separately.
- **Legal / competition** — Wording fixes to
  [`yarisma-kosullari.html`](yarisma-kosullari.html), same-day so Son
  Güncelleme stays 10 Ekim 2026. **Madde 6:** dropped "tek" from the
  winner rule, which contradicted the tie rule below it. **Madde 8:**
  Dipnot now contacts the winner _before_ the 15 Ocak announcement
  (was after); a centre that doesn't answer within **7 days** of the
  first attempt loses the win to the next-highest. No clause for an
  unreached chain past 15 Ocak (Nev: centres are reachable). The
  announcement drops Facebook: Instagram + in-app only. **Madde 11:**
  changes are announced in-app and on Instagram, no longer "the Madde 8
  channels". **Madde 13:** dropped "dalış merkezi başvuruları", an
  undefined term that implied centres could apply to join, which
  Madde 5 rules out.
  ([#153](https://github.com/Dipnot-App/www.dipnot.app/pull/153))
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

## 2026-09-13

_(backfilled 2026-10-11 from PR bodies and commit messages)_

- **CI** — `format:check` is now a **hard gate** in
  [`ci.yml`](.github/workflows/ci.yml), run before the build so a
  formatting-only failure reports in seconds. The script existed in
  `package.json` but no workflow ran it, "which is exactly how nine
  files drifted out of format"
  ([#136](https://github.com/Dipnot-App/www.dipnot.app/pull/136)).
- **Tooling** — Ran Prettier across the repo, formatting only: nine
  files, including all four legal pages, `css/styles.css` and
  `js/account-deletion-confirm.js`. Checked on rendered output, not
  source: every built page compared before/after with tags stripped
  and nothing inserted at tag boundaries, all 11 byte-identical,
  because Prettier reflowing `<strong>x</strong>y` across lines would
  render as `x y` in a KVKK policy. `cssVersion` / `jsVersion` →
  `260913_1`. The seven compact `.hero-bubbles` rules expand from 7
  lines to 49; `.prettierignore` was offered as the alternative
  ([#135](https://github.com/Dipnot-App/www.dipnot.app/pull/135)).
- **Privacy policy** — Competition vote data added to section 2 of
  [`gizlilik-politikasi.html`](gizlilik-politikasi.html) and
  [`privacy-policy.html`](privacy-policy.html), mirrored verbatim from
  `data-processors.md` → Google Firebase → Competition vote data: a
  Yarışma Verileri / Competition Data table row (explicit consent)
  plus four paragraphs (participation optional; only per-centre totals
  published; vote records visible to admin-role staff only for
  clause-9 fraud detection, on legitimate interest, KVKK art. 5/2-f;
  account deletion cancels every vote). Urgent because
  `yarisma-kosullari.html` Madde 10 already pointed readers at a
  policy with no mention of voting, and voting opened 15 Eylül.
  Section 2, not 3, so nothing was renumbered and TR/EN stay in
  lockstep. Dates → 13 Eylül 2026. Same PR applies the ratified
  circumflex rule (only where its absence changes meaning):
  `hâliyle` / `hâlinde` / `hâle` / `dâhil` unmarked across the legal
  pages, `kâr` kept. Released to main in
  [#134](https://github.com/Dipnot-App/www.dipnot.app/pull/134)
  ([#133](https://github.com/Dipnot-App/www.dipnot.app/pull/133)).
- **Legal / competition** — Applied core_docs' 2026-09-13 ask to
  [`yarisma-kosullari.html`](yarisma-kosullari.html). **Name:** back
  to "Türkiye'nin En Sevilen Dalış Merkezi 2026" (an earlier commit
  on the branch had renamed it the other way). **Madde 4:** voting
  15 Eylül 2026 00:00 → 15 Aralık 2026 23:59 TSİ (was 1 Eylül → 30
  Kasım), winner announced 5 Ocak 2027 (was 15 Aralık; also Madde
  8). **Madde 5:** list frozen at 15 Eylül. **Madde 6:** tie-break
  decided — ties produce multiple winners, badge and certificate to
  each, the discount split equally; the `TBD` comment is gone, closes
  [#121](https://github.com/Dipnot-App/www.dipnot.app/issues/121).
  **Madde 3:** new clause — deleting your account cancels your votes
  (real `hardDeleteUser` behaviour, not written down before).
  `info@` → `help@dipnot.app` throughout, Madde 13's two contact
  blocks merged
  ([#124](https://github.com/Dipnot-App/www.dipnot.app/pull/124)).
- **Repo** — Back-merged `main` into `dev` so `dev` carries the
  security fixes from #131, which had gone straight to `main`
  ([#132](https://github.com/Dipnot-App/www.dipnot.app/pull/132)).
- **Dependencies** — Dependabot: `sharp` 0.35.3 → 0.35.4, `prettier`
  3.9.5 → 3.9.6, ci-tools (`html-validate` 11.5.6 → 11.15.0,
  `wait-on` 9.1.0); security group on `main`: `brace-expansion`,
  `ip-address`, `js-yaml`, `fast-uri`, `joi`, `undici`
  ([#129](https://github.com/Dipnot-App/www.dipnot.app/pull/129),
  [#126](https://github.com/Dipnot-App/www.dipnot.app/pull/126),
  [#127](https://github.com/Dipnot-App/www.dipnot.app/pull/127),
  [#128](https://github.com/Dipnot-App/www.dipnot.app/pull/128),
  [#131](https://github.com/Dipnot-App/www.dipnot.app/pull/131)).

## 2026-07-25

_(backfilled 2026-10-11 from PR bodies and commit messages)_

- **Legal / competition** — Inline `TBD` comment next to the Madde 6
  tie-break clause in
  [`yarisma-kosullari.html`](yarisma-kosullari.html); published
  wording unchanged. Nev asked for the open decision to be visible in
  the source rather than silently settled; tracked in
  [#121](https://github.com/Dipnot-App/www.dipnot.app/issues/121)
  ([#122](https://github.com/Dipnot-App/www.dipnot.app/pull/122)).
- **Legal / competition** — New
  [`yarisma-kosullari.html`](yarisma-kosullari.html) for the 2026
  dive centre competition, at the URL mobile had already hardcoded
  into the 1.6.0 competition screen. A launch blocker for DipnotAPP
  epic #477: Turkish advertising rules require the terms to be
  published before the campaign opens. 11 sections following
  `kullanim-kosullari.html`; Turkish only, no EN mirror. Added to the
  sitemap, not the footer (seasonal page, mobile links directly).
  Judgement calls flagged in the PR: tie-break left to Dipnot, close
  published as 30 Kasım 23:59 TSİ, removed centres' votes void.
  Closes [#119](https://github.com/Dipnot-App/www.dipnot.app/issues/119)
  ([#120](https://github.com/Dipnot-App/www.dipnot.app/pull/120)).
- **Dependencies** — Dependabot: `actions/setup-node` 6 → 7; security
  group on `main`: `ws`, `axios`, `fast-uri`, `linkify-it`
  ([#116](https://github.com/Dipnot-App/www.dipnot.app/pull/116),
  [#117](https://github.com/Dipnot-App/www.dipnot.app/pull/117),
  [#118](https://github.com/Dipnot-App/www.dipnot.app/pull/118)).

## 2026-07-13

_(backfilled 2026-10-11 from PR bodies and commit messages)_

- **Assets** — Sponsor ad images in `img/ads/`: added
  `derinshop-beuchat-turkiye-distributoru.jpg` and
  `turk-balikadamlar-spor-kulubu-1954.jpg`
  ([#113](https://github.com/Dipnot-App/www.dipnot.app/pull/113));
  replaced `derinshop-01.jpeg` with
  `the-divers-club-bodrum-dalis-merkezi.jpg`
  ([#114](https://github.com/Dipnot-App/www.dipnot.app/pull/114));
  added `divefan-club-dalis-fanatiklerinin-bulusma-noktasi.jpg` and
  `diveservis.jpg` and re-exported the other three smaller
  ([#115](https://github.com/Dipnot-App/www.dipnot.app/pull/115)).
  Asset-only, not referenced by any page.
- **Dependencies** — Dependabot: `html-validate` 11.5.3 → 11.5.6,
  `prettier` 3.9.4 → 3.9.5
  ([#110](https://github.com/Dipnot-App/www.dipnot.app/pull/110),
  [#111](https://github.com/Dipnot-App/www.dipnot.app/pull/111));
  released to main in
  [#112](https://github.com/Dipnot-App/www.dipnot.app/pull/112).

## 2026-07-08

_(backfilled 2026-10-11 from PR bodies and commit messages)_

- **Assets** — Added `img/ads/derinshop-01.jpeg`, a derinshop.com ad
  banner. Not referenced by any page
  ([#108](https://github.com/Dipnot-App/www.dipnot.app/pull/108)).
- **Dependencies** — Dependabot: `html-validate` 11.3.0 → 11.5.3,
  `actions/checkout` 6 → 7, `sharp` 0.34.5 → 0.35.3, `prettier`
  3.8.3 → 3.9.4, `@11ty/eleventy` 3.1.5 → 3.1.6; security group on
  `main`: `markdown-it`, `form-data`, `undici`
  ([#99](https://github.com/Dipnot-App/www.dipnot.app/pull/99),
  [#103](https://github.com/Dipnot-App/www.dipnot.app/pull/103),
  [#106](https://github.com/Dipnot-App/www.dipnot.app/pull/106),
  [#107](https://github.com/Dipnot-App/www.dipnot.app/pull/107),
  [#98](https://github.com/Dipnot-App/www.dipnot.app/pull/98),
  [#102](https://github.com/Dipnot-App/www.dipnot.app/pull/102),
  [#109](https://github.com/Dipnot-App/www.dipnot.app/pull/109)).

## 2026-06-03

_(backfilled 2026-10-11 from PR bodies and commit messages)_

- **Privacy policy** — Mirrored two new registry entries into
  [`gizlilik-politikasi.html`](gizlilik-politikasi.html) and
  [`privacy-policy.html`](privacy-policy.html). **Newsletter signup**
  gets its own entry (Nev, 2026-06-03), by analogy with the
  contact-form precedent: distinct legal basis, data category and
  opt-out lifecycle; closes
  [#71](https://github.com/Dipnot-App/www.dipnot.app/issues/71).
  **Google reCAPTCHA Enterprise** (via Firebase App Check), which the
  account-deletion flow introduced and which sends IP and interaction
  signals to Google; region / legal basis was a first cut pending
  functions' confirmation (relates to #67). Dates → 2026-06-03;
  sitemap `lastmod` bumped
  ([#97](https://github.com/Dipnot-App/www.dipnot.app/pull/97)).
- **Pages** — New [`iletisim.html`](iletisim.html): publisher
  identity (Dipnot / V.A.C. Studio), registered address,
  `info@` / `help@dipnot.app`. Requested by mobile for the Play
  Console News & Magazine entity declaration, which needs a canonical
  URL with the publisher's contact info. Also resolves the previously
  404ing `/iletisim`. Linked from the footer legal line; in the
  sitemap ([#96](https://github.com/Dipnot-App/www.dipnot.app/pull/96)).
- **Store links** — All four Google Play buttons (nav, footer, hero,
  download CTA) now point at the Play Store listing
  (`com.vacstudio.dipnot`) instead of the old Expo build URL, and get
  `rel="noopener noreferrer"`. Refs
  [#5](https://github.com/Dipnot-App/www.dipnot.app/issues/5)
  ([#95](https://github.com/Dipnot-App/www.dipnot.app/pull/95)).
- **Account deletion** — Public deletion flow, the Google Play Data
  Safety blocker for the Android production submission (mobile
  #302). New [`hesap-silme.html`](hesap-silme.html) (no login;
  deletion steps, what is deleted vs. retained, 30-day window, request
  form with double opt-in) and `noindex`
  [`hesap-silme-onayi.html`](hesap-silme-onayi.html) (confirms the
  email link's `id` + `token`). First Firebase on landing:
  `js/firebase-app-check.js` inits App Check (reCAPTCHA Enterprise)
  for the `X-Firebase-AppCheck` header, loaded as an ES module via a
  new `pageModule` hook in `base.njk`. The Firebase SDK (11.6.1,
  gstatic) is the one CDN dep without SRI, since ES module imports
  can't carry it. Privacy policies mirror the **Brevo** processor
  snippet (dates → 2026-06-02, core_docs #119). Linked from the footer
  and both policies; in the sitemap; `jsVersion` bumped. Closes
  [#92](https://github.com/Dipnot-App/www.dipnot.app/issues/92)
  ([#94](https://github.com/Dipnot-App/www.dipnot.app/pull/94)).
- **Dependencies** — Dependabot security group on `main`: `liquidjs`
  10.25.5 → 10.27.0
  ([#93](https://github.com/Dipnot-App/www.dipnot.app/pull/93)).

## 2026-06-02

_(backfilled 2026-10-11 from PR bodies and commit messages)_

- **Dependencies** — Dependabot: `html-validate` 11.2.0 → 11.3.0;
  security group on `main`: `qs` 6.14.2 → 6.15.2
  ([#91](https://github.com/Dipnot-App/www.dipnot.app/pull/91),
  [#90](https://github.com/Dipnot-App/www.dipnot.app/pull/90)).

## 2026-05-22

_(backfilled 2026-10-11 from PR bodies and commit messages)_

- **CI** — Node 20 → 22 in [`ci.yml`](.github/workflows/ci.yml).
  Node 20 reached EOL 2026-04, and `html-validate` 11.1+ uses the
  Node-native `fs.globSync` (Node 22+), so Dependabot #86 failed on 20
  ([#89](https://github.com/Dipnot-App/www.dipnot.app/pull/89)).
- **Dependencies** — Dependabot ci-tools: `html-validate` 10.16.0 →
  11.2.0 (major; needs Node 22, see above), `pa11y-ci` 4.1.1,
  `wait-on` 9.0.10
  ([#86](https://github.com/Dipnot-App/www.dipnot.app/pull/86)).
- **SEO** — [`scripts/build-og.js`](scripts/build-og.js) now emits an
  RGB PNG (`.removeAlpha()`), dropping the manual flatten step
  core_docs applied when adopting `og-default.png` (their 2026-05-15
  ack). Regenerated `img/og/og-default.png`: pixel-identical, alpha
  dropped, 32 KB → 24.9 KB
  ([#88](https://github.com/Dipnot-App/www.dipnot.app/pull/88)).

## 2026-05-15

_(backfilled 2026-10-11 from PR bodies and commit messages)_

- **CSS** — Removed the unused `--color-logo` token (referenced
  nowhere). `--color-primary: #04d1b2` left untouched; its divergence
  stays a deferred decision under epic #31. `cssVersion` →
  `260515_1`
  ([#85](https://github.com/Dipnot-App/www.dipnot.app/pull/85)).
- **Brand book** — Rewrote [`brand-book.html`](brand-book.html) to
  match the ratified core_docs tokens. Scope decisions (#21): fully
  English (partner/press audience), curated subset (no full OKLCH /
  chart palette), Gingersauce link kept (Nev's call) as the extended
  internal spec. Full logo set (6 marks + 3 composed variants);
  Algiers Blue `#348698` → Dipnot Teal `#338596`; Inter as the single
  UI family, Gabarito wordmark-only; Rules and Misuse filled from
  `logo.md`; Brand Archetype dropped as `voice.md` has none. Closes
  [#53](https://github.com/Dipnot-App/www.dipnot.app/issues/53),
  resolves [#21](https://github.com/Dipnot-App/www.dipnot.app/issues/21)
  ([#84](https://github.com/Dipnot-App/www.dipnot.app/pull/84)).

## 2026-05-14

_(backfilled 2026-10-11 from PR bodies and commit messages)_

- **CI fix** — Removed a stray newline inside the App Store `href` in
  `nav.njk`, `footer.njk` and two spots in `index.html`;
  `html-validate` rejected all 7 pages (`attribute-allowed-values`),
  breaking CI on `dev`. Added `rel="noopener noreferrer"` to the same
  four anchors, as CLAUDE.md requires for `target="_blank"`
  ([#83](https://github.com/Dipnot-App/www.dipnot.app/pull/83)).
- **Store links** — App Store buttons in the nav, footer and both
  `index.html` CTAs became links to
  `apps.apple.com/app/id6757102330` (were inert `<button>`s). Direct
  commit `5ec36c8`, no PR; it introduced the stray newline fixed in
  #83.
- **Copy** — Home page `title` and hero `h1`: "hazır mısınız" →
  "hazır mısın?", "for consistency in language" per the commit. Direct
  commit `3c63baf`, no PR.

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
