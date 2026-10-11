// Exports the landing's raster images as AVIF + WebP into img/opt/.
// Run with `npm run build:images` after replacing a source image; the
// outputs are committed (the Eleventy build only copies them).
const path = require("path");
const fs = require("fs/promises");
const sharp = require("sharp");

const IMG = path.resolve(__dirname, "..", "img");
const OUT = path.join(IMG, "opt");

// `extract` crops the source before resizing. about-screen is the app
// screen cut out of deviceframes-about.png, whose baked-in background
// doesn't fit the glass design; the CSS device frame replaces it.
const JOBS = [
  {
    src: "deviceframes-hero.png",
    name: "hero-phones",
    widths: [640, 941],
  },
  {
    src: "deviceframes-about.png",
    name: "about-screen",
    extract: { left: 548, top: 190, width: 900, height: 1310 },
    widths: [450, 900],
  },
];

async function main() {
  await fs.mkdir(OUT, { recursive: true });

  for (const job of JOBS) {
    for (const width of job.widths) {
      const base = () => {
        let img = sharp(path.join(IMG, job.src));
        if (job.extract) img = img.extract(job.extract);
        return img.resize({ width, withoutEnlargement: true });
      };
      const stem = path.join(OUT, `${job.name}-${width}`);
      await base().avif({ quality: 55, effort: 6 }).toFile(`${stem}.avif`);
      await base().webp({ quality: 78, effort: 6 }).toFile(`${stem}.webp`);
      console.log(`Wrote ${path.relative(IMG, stem)}.{avif,webp}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
