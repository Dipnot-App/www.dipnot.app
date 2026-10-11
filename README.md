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

The 3D shark on the 404 page is based on "Great White Shark Attack
Bite Animation Loop"
(https://sketchfab.com/3d-models/great-white-shark-attack-bite-animation-loop-936d4110b39945f5a46cb2d831ece920)
by LasquetiSpice (https://sketchfab.com/LasquetiSpice), licensed under
CC BY 4.0 (http://creativecommons.org/licenses/by/4.0/). It was
optimised for the web (meshopt geometry, WebP textures; licence text in
`img-src/abyss/shark-LICENSE.txt`) and is rendered with three.js
(MIT), bundled by `npm run build:shark` from `src/shark3d.js`.
