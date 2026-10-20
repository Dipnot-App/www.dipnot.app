// Exports the landing's raster images as AVIF + WebP into img/opt/.
// Run with `npm run build:images` after replacing a source image; the
// outputs are committed (the Eleventy build only copies them).
const path = require("path");
const fs = require("fs/promises");
const sharp = require("sharp");

// Sources live outside img/ so the full-size originals aren't deployed
// (Eleventy copies img/ wholesale).
const SRC = path.resolve(__dirname, "..", "img-src");
const OUT = path.resolve(__dirname, "..", "img", "opt");

// `extract` (optional) crops the source before resizing.
const JOBS = [
  // App screenshots for the 3D iPhone (macros/iphone.njk): full
  // 1290×2796 iPhone captures, status bar included.
  ...["feed", "article", "categories", "saved", "signin", "appstore"].map(
    (name) => ({
      src: `screens/${name}.png`,
      name: `screen-${name}`,
      widths: [450, 640, 900],
    }),
  ),
  // Team portraits (ekip.html): square crops around the face, shown as a
  // 6–8rem circle, so 256 covers 2x and 384 covers 3x.
  {
    src: "team/nevcan.jpg",
    name: "team-nevcan",
    extract: { left: 190, top: 20, width: 1200, height: 1200 },
    widths: [256, 384],
  },
  {
    src: "team/birgul.jpg",
    name: "team-birgul",
    extract: { left: 410, top: 600, width: 1700, height: 1700 },
    widths: [256, 384],
  },
];

async function main() {
  await fs.mkdir(OUT, { recursive: true });

  for (const job of JOBS) {
    for (const width of job.widths) {
      const base = () => {
        let img = sharp(path.join(SRC, job.src));
        if (job.extract) img = img.extract(job.extract);
        return img.resize({ width, withoutEnlargement: true });
      };
      const stem = path.join(OUT, `${job.name}-${width}`);
      await base().avif({ quality: 55, effort: 6 }).toFile(`${stem}.avif`);
      await base().webp({ quality: 78, effort: 6 }).toFile(`${stem}.webp`);
      console.log(`Wrote ${path.relative(OUT, stem)}.{avif,webp}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
