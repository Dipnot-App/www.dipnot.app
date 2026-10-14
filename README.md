# dipnot.app Landing Page

Organization:
https://theorg.com/org/dipnot-1

App screenshots are shown in CSS 3D device frames
(`_includes/macros/iphone.njk`). Source captures live in `img-src/screens/`;
`npm run build:images` exports them to `img/opt/`.

The deep-sea creatures on the 404 page are public-domain natural-history
plates from Wikimedia Commons, turned into masks by
`npm run build:abyss` (sources in `img-src/abyss/`):

- _Melanocetus murrayi_, R. Mintern, Report on the deep-sea fishes of
  H.M.S. Challenger (Günther, 1887)
- _Anoplogaster cornuta_, Résultats des campagnes scientifiques
  accomplies par Albert I<sup>er</sup> de Monaco (1911)
- _Chauliodus sloani_, Goode & Bean, Oceanic Ichthyology (1896)
- _Eurypharynx pelecanoides_, Carl Chun, Aus den Tiefen des Weltmeeres
  (1903)

The 3D models on the 404 page are licensed under CC BY 4.0
(http://creativecommons.org/licenses/by/4.0/):

- "Animated Swimming Great White Shark Loop"
  (https://sketchfab.com/3d-models/animated-swimming-great-white-shark-loop-297ed35c6a5f43749b0ae189d991a3f1)
  by LasquetiSpice (https://sketchfab.com/LasquetiSpice)
- "Anglerfish"
  (https://sketchfab.com/3d-models/anglerfish-5e2f4b2d2e1a4613a008b6caaf40d50c)
  by Abby_Holzworth1 (https://sketchfab.com/Abby_Holzworth1)

Both were optimised for the web (meshopt geometry, WebP textures;
licence texts in `img-src/abyss/*-LICENSE.txt`) and are rendered with
three.js (MIT), bundled by `npm run build:shark` from `src/shark3d.js`.

Icons are Font Awesome Free 7.3.1 by Fonticons, Inc.
(https://fontawesome.com), icons licensed under CC BY 4.0
(https://fontawesome.com/license/free). They are inlined as SVG at
build time from the `@fortawesome/fontawesome-free` package by the
`icon` shortcode in `eleventy.config.js`.

Home-page motion uses GSAP (GreenSock, https://gsap.com) under its
standard no-charge license (https://gsap.com/standard-license),
self-hosted from the pinned `gsap` package at build time.

Text is set in Inter (SIL OFL 1.1, `fonts/OFL.txt`); the 404 dive
computer uses DSEG7 (SIL OFL 1.1, `fonts/DSEG-LICENSE.txt`).
