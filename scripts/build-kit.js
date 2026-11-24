// Builds the competition candidates' share kit, served from
// /yarisma-aday-bilgilendirme.html:
//   img/kit/yarisma-2026-story.png   1080×1920 (Instagram / WhatsApp story)
//   img/kit/yarisma-2026-post.png    1080×1350 (feed post, 4:5)
//   img/kit/dipnot-qr.svg / .png     QR code → https://get.dipnot.app
//   img/kit/*-onizleme.webp          small previews for the page itself
//
// Run with `npm run build:kit` after the copy or the brand changes; the
// outputs are committed (like build:images). Hand-run only, never in CI.
//
// The visuals are drawn as HTML and screenshotted with the Puppeteer that
// pa11y-ci already installs (no extra browser), so they use the real
// self-hosted Inter and the canon logo master instead of whatever fonts
// librsvg finds on the machine.
const path = require("path");
const fs = require("fs");
const QRCode = require("qrcode");
const sharp = require("sharp");
const puppeteer = require("puppeteer");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "img", "kit");
const QR_URL = "https://get.dipnot.app";

// Canon colours (dna-core-docs product-design/color.md; gold is the app's
// brand.gold, used for the competition trophy).
const C = {
  teal: "#13A3B9",
  tealBright: "#5CC6D6",
  skyCaptain: "#131B26",
  deep: "#0B1F2E",
  gold: "#FFD700",
  white: "#FFFFFF",
};

const b64 = (file) => fs.readFileSync(path.join(ROOT, file)).toString("base64");
const svgFile = (file) => fs.readFileSync(path.join(ROOT, file), "utf8");

const fontCss = `
@font-face { font-family: "Inter"; font-weight: 400 700;
  src: url(data:font/woff2;base64,${b64("fonts/inter-latin-tr.woff2")}) format("woff2");
  unicode-range: U+011E-011F, U+0130, U+015E-015F; }
@font-face { font-family: "Inter"; font-weight: 400 700;
  src: url(data:font/woff2;base64,${b64("fonts/inter-latin.woff2")}) format("woff2"); }`;

const logo = svgFile("img/logos/logo-white.svg").replace(
  /width="\d+" height="\d+"/,
  'width="100%" height="100%"',
);
const trophy = svgFile(
  "node_modules/@fortawesome/fontawesome-free/svgs/solid/trophy.svg",
).replace("<svg", `<svg style="color:${C.gold}" width="100%" height="100%"`);

// One template, two formats. `s` scales the type so the post (shorter
// canvas) keeps the story's proportions.
function page({ w, h, qr, story }) {
  const s = story ? 1 : 0.86;
  return `<!doctype html><html lang="tr"><head><meta charset="utf-8"><style>
${fontCss}
* { box-sizing: border-box; margin: 0; }
html, body { width: ${w}px; height: ${h}px; }
body {
  font-family: "Inter", sans-serif; color: ${C.white};
  background:
    radial-gradient(120% 60% at 50% 0%, ${C.teal}66 0%, transparent 60%),
    radial-gradient(80% 50% at 85% 100%, ${C.teal}33 0%, transparent 70%),
    linear-gradient(180deg, ${C.deep} 0%, ${C.skyCaptain} 100%);
  display: flex; flex-direction: column; align-items: center;
  justify-content: space-between; text-align: center;
  padding: ${story ? "150px 90px 120px" : "84px 90px 72px"};
}
.top { display: flex; flex-direction: column; align-items: center; gap: ${28 * s}px; }
.trophy { width: ${150 * s}px; height: ${150 * s}px; padding: ${32 * s}px;
  border-radius: 50%; background: rgba(255,255,255,0.12); }
.eyebrow { font-size: ${30 * s}px; font-weight: 700; letter-spacing: 0.16em; color: ${C.tealBright}; }
h1 { font-size: ${148 * s}px; font-weight: 700; letter-spacing: -0.04em; line-height: 1; }
.comp { font-size: ${54 * s}px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.15; max-width: 16ch; }
.body { font-size: ${38 * s}px; line-height: 1.4; color: rgba(255,255,255,0.86); max-width: 22ch; }
.body strong { color: ${C.white}; }
.qr { display: flex; align-items: center; gap: ${36 * s}px; padding: ${28 * s}px;
  border-radius: ${36 * s}px; background: rgba(255,255,255,0.08);
  box-shadow: inset 0 0 0 2px rgba(255,255,255,0.14); text-align: left; }
.qr__code { width: ${220 * s}px; height: ${220 * s}px; padding: ${14 * s}px;
  border-radius: ${20 * s}px; background: ${C.white}; flex: none; }
.qr__code svg { display: block; width: 100%; height: 100%; }
.qr__text { font-size: ${32 * s}px; line-height: 1.35; color: rgba(255,255,255,0.86); max-width: 15ch; }
.qr__text strong { display: block; white-space: nowrap; font-size: ${38 * s}px; color: ${C.white}; margin-bottom: 6px; }
.foot { display: flex; flex-direction: column; align-items: center; gap: ${18 * s}px; }
.date { font-size: ${30 * s}px; color: rgba(255,255,255,0.72); }
.brand { display: flex; align-items: center; gap: 20px; font-size: ${44 * s}px; font-weight: 700; letter-spacing: -0.02em; }
.brand__logo { width: ${72 * s}px; height: ${72 * s}px; }
</style></head><body>
<div class="top">
  <div class="trophy">${trophy}</div>
  <p class="eyebrow">YARIŞMA · 2026</p>
  <h1>Biz de adayız!</h1>
  <p class="comp">Türkiye'nin En Sevilen Dalış Merkezi 2026</p>
</div>
<p class="body">Dipnot uygulamasında <strong>bize oy verebilirsiniz.</strong></p>
<div class="qr">
  <div class="qr__code">${qr}</div>
  <p class="qr__text"><strong>Dipnot'u indirin</strong>Yarışma kartına dokunun, merkezimizi arayın.</p>
</div>
<div class="foot">
  <p class="date">Oylama 31 Aralık 2026, 23:59'a (TSİ) kadar sürer.</p>
  <div class="brand"><span class="brand__logo">${logo}</span>Dipnot</div>
</div>
</body></html>`;
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  // QR: Sky Captain on white, quiet zone built in for the standalone file
  const qrOpts = {
    errorCorrectionLevel: "M",
    color: { dark: C.skyCaptain, light: C.white },
  };
  const qrSvg = await QRCode.toString(QR_URL, {
    ...qrOpts,
    type: "svg",
    margin: 4,
  });
  fs.writeFileSync(path.join(OUT, "dipnot-qr.svg"), qrSvg);
  await sharp(Buffer.from(qrSvg), { density: 600 })
    .resize(1200, 1200, { kernel: "nearest" })
    .png()
    .toFile(path.join(OUT, "dipnot-qr.png"));
  const qrInline = await QRCode.toString(QR_URL, {
    ...qrOpts,
    type: "svg",
    margin: 0,
  });

  const browser = await puppeteer.launch();
  try {
    for (const f of [
      {
        name: "yarisma-2026-story",
        w: 1080,
        h: 1920,
        story: true,
        preview: 360,
      },
      {
        name: "yarisma-2026-post",
        w: 1080,
        h: 1350,
        story: false,
        preview: 432,
      },
    ]) {
      const tab = await browser.newPage();
      await tab.setViewport({ width: f.w, height: f.h, deviceScaleFactor: 1 });
      await tab.setContent(page({ ...f, qr: qrInline }), { waitUntil: "load" });
      await tab.evaluate(() => document.fonts.ready);
      const png = path.join(OUT, `${f.name}.png`);
      await tab.screenshot({ path: png, type: "png" });
      await tab.close();
      await sharp(png)
        .png({ compressionLevel: 9, palette: false })
        .toFile(png + ".tmp");
      fs.renameSync(png + ".tmp", png);
      await sharp(png)
        .resize({ width: f.preview * 2 })
        .webp({ quality: 80 })
        .toFile(path.join(OUT, `${f.name}-onizleme.webp`));
      console.log(`Wrote img/kit/${f.name}.png + preview`);
    }
  } finally {
    await browser.close();
  }
  console.log("Wrote img/kit/dipnot-qr.svg + .png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
