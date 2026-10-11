// Turns the public-domain deep-sea plates in img-src/abyss/ into alpha
// masks for the 404 page (img/abyss/*.webp). Paper → transparent, ink →
// opaque; the colour comes from CSS (mask-image + background), so the
// same file serves both themes. Run `npm run build:abyss` after
// changing a source; outputs are committed.
//
// Sources (all public domain, via Wikimedia Commons):
//   anglerfish  Melanocetus murrayi — R. Mintern, Challenger report, 1887
//   fangtooth   Anoplogaster cornuta — Résultats des campagnes
//               scientifiques (Albert I of Monaco), 1911
//   viperfish   Chauliodus sloani — Goode & Bean, Oceanic Ichthyology
//   gulper      Eurypharynx pelecanoides — Carl Chun, 1903
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const SRC = path.resolve(__dirname, "..", "img-src", "abyss");
const OUT = path.resolve(__dirname, "..", "img", "abyss");

// paper: luminance treated as fully transparent; ink: fully opaque
const JOBS = [
  { name: "anglerfish", width: 900, paper: 228, ink: 70 },
  // colour plate: a solid body would mask to a blob, so keep a faint
  // silhouette and draw the linework (local darkness) bright
  { name: "fangtooth", width: 900, paper: 236, ink: 60, detail: true },
  { name: "viperfish", width: 1000, paper: 225, ink: 60 },
  { name: "gulper", width: 1200, paper: 225, ink: 50 },
];

async function build({ name, width, paper, ink, detail }) {
  const gray = sharp(path.join(SRC, `${name}.jpg`)).grayscale();
  const { data, info } = await gray
    .clone()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const blur = detail
    ? (await gray.clone().blur(5).raw().toBuffer({ resolveWithObject: true }))
        .data
    : null;

  const clamp = (v) => Math.min(1, Math.max(0, v));
  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    let t = clamp((paper - data[i]) / (paper - ink));
    if (detail) {
      const inside = data[i] < paper - 12 ? 1 : 0;
      const line = clamp((blur[i] - data[i]) / 28); // darker than surroundings
      const edge =
        clamp((paper - data[i]) / 40) *
        (1 - clamp((paper - data[i] - 40) / 60));
      t = Math.max(inside * 0.22, line, edge * 0.9);
    }
    rgba[i * 4] = rgba[i * 4 + 1] = rgba[i * 4 + 2] = 255;
    rgba[i * 4 + 3] = Math.round(Math.pow(t, 0.85) * 255);
  }

  const out = path.join(OUT, `${name}.webp`);
  const trimmed = await sharp(rgba, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 1 })
    .png()
    .toBuffer();
  await sharp(trimmed)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 70, alphaQuality: 72, effort: 6 })
    .toFile(out);
  const m = await sharp(out).metadata();
  console.log(
    `Wrote img/abyss/${name}.webp ${m.width}x${m.height} (${(fs.statSync(out).size / 1024).toFixed(0)} KB)`,
  );
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  for (const job of JOBS) await build(job);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
