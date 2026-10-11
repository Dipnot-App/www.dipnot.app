// Builds the public logo pack served from the brand book:
// img/brand/dipnot-logo-paketi.zip = every logo variant (SVG + PNG) plus
// a short bilingual usage note. Run with `npm run build:brand` after the
// logos change; the zip is committed. Needs the `zip` CLI (macOS/Linux).
const path = require("path");
const fs = require("fs");
const os = require("os");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const LOGOS = path.join(ROOT, "img", "logos");
const OUT_DIR = path.join(ROOT, "img", "brand");
const OUT = path.join(OUT_DIR, "dipnot-logo-paketi.zip");

const NOTE = `Dipnot — logo paketi / logo pack
==================================

TR
- Tek işaretler (logo*.svg/png, saydam zemin): her yanında işaret
  yüksekliğinin en az 1/6'sı kadar boşluk bırak.
- Birleşik varyantlar (logo-*-on-*.svg/png): boşluk içinde gelir,
  ek boşluk ekleme.
- En küçük boyut: 16 px (favicon), 20 px (satır içi), 40 px
  (bağımsız), 80 px (vitrin), 8 mm (baskı).
- Esnetme, döndürme, yeniden renklendirme, gölge/parıltı ekleme yok.
- Ayrıntılar: https://dipnot.app/marka-kitabi.html

EN
- Solo marks (logo*.svg/png, transparent): keep at least 1/6 of the
  mark's height clear on every side.
- Composed variants (logo-*-on-*.svg/png): clear space is built in;
  don't add more.
- Minimum size: 16 px (favicon), 20 px (inline), 40 px (standalone),
  80 px (display), 8 mm (print).
- No stretching, rotating, recoloring, shadows or glows.
- Details: https://dipnot.app/brand-book.html
`;

const files = fs
  .readdirSync(LOGOS)
  .filter((f) => /^logo.*\.(svg|png)$/.test(f))
  .sort()
  .map((f) => path.join(LOGOS, f));

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "dipnot-pack-"));
const note = path.join(tmp, "OKU-README.txt");
fs.writeFileSync(note, NOTE);

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.rmSync(OUT, { force: true });
// -j flattens paths, -X drops OS-specific attributes
execFileSync("zip", ["-q", "-j", "-X", OUT, ...files, note]);
fs.rmSync(tmp, { recursive: true, force: true });

console.log(`Wrote ${path.relative(ROOT, OUT)} (${files.length} logos + note)`);
