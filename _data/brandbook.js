// Brand book copy, both languages side by side so the TR page
// (marka-kitabi.html) and the EN mirror (brand-book.html) can't drift:
// one template renders both. Source of truth for every value is
// dna_core_docs/product-design (logo.md, color.md, typography.md,
// voice.md); this is a curated public subset.

const solo = [
  { file: "logo", name: "Dipnot Teal", hex: "#338596", bg: "light" },
  { file: "logo-gold", name: "Gold", hex: "#C49B3A", bg: "light" },
  { file: "logo-white", name: "White", hex: "#FFFFFF", bg: "dark" },
  { file: "logo-black", name: "Black", hex: "#000000", bg: "light" },
  {
    file: "logo-winter-bloom",
    name: "Winter Bloom",
    hex: "#2E162C",
    bg: "light",
  },
  {
    file: "logo-sky-captain",
    name: "Sky Captain",
    hex: "#131B26",
    bg: "light",
  },
];

const composed = [
  {
    file: "logo-white-on-teal",
    name: { tr: "Teal üzerinde beyaz", en: "White on Teal" },
  },
  {
    file: "logo-white-on-sky-captain",
    name: { tr: "Sky Captain üzerinde beyaz", en: "White on Sky Captain" },
  },
  {
    file: "logo-teal-on-sky-captain",
    name: { tr: "Sky Captain üzerinde teal", en: "Teal on Sky Captain" },
  },
];

const colors = [
  {
    name: "Dipnot Teal",
    hex: "#338596",
    rgb: "51 133 150",
    oklch: "oklch(0.547 0.076 210)",
    role: {
      tr: "Ana vurgu rengi, tüm yüzeylerde",
      en: "Primary accent, every surface",
    },
  },
  {
    name: "Dipnot Teal (dark)",
    hex: "#6AD0E3",
    rgb: "106 208 227",
    oklch: "oklch(0.7 0.1 208)",
    role: { tr: "Koyu temada ana vurgu", en: "Primary accent in dark mode" },
  },
  {
    name: "Sky Captain",
    hex: "#131B26",
    rgb: "19 27 38",
    cmyk: "50 29 0 85",
    pantone: "5605C",
    role: {
      tr: "Yalnızca birleşik varlık arka planı",
      en: "Composed-asset background only",
    },
  },
  {
    name: "Winter Bloom",
    hex: "#2E162C",
    rgb: "46 22 44",
    cmyk: "0 52 4 82",
    pantone: "643C",
    role: {
      tr: "Yalnızca birleşik varlık arka planı",
      en: "Composed-asset background only",
    },
  },
  {
    name: "Gold",
    hex: "#C49B3A",
    rgb: "196 155 58",
    role: {
      tr: "Yönetici / operatör bağlamları",
      en: "Admin / operator contexts",
    },
  },
];

const sizes = [
  {
    px: "16 × 16 px",
    ctx: { tr: "Favicon / tarayıcı sekmesi", en: "Favicon / browser tab" },
  },
  {
    px: "20 × 20 px",
    ctx: {
      tr: "Satır içi arayüz (buton ikonu, menü, etiket)",
      en: "Inline UI (button icon, nav item, chip)",
    },
  },
  {
    px: "40 × 40 px",
    ctx: {
      tr: "Bağımsız arayüz (avatar, kart köşesi)",
      en: "Standalone UI (avatar, card corner)",
    },
  },
  {
    px: "80 × 80 px",
    ctx: {
      tr: "Vitrin (hero, açılış ekranı, pazarlama)",
      en: "Display (hero, splash, marketing)",
    },
  },
  { px: "8 mm", ctx: { tr: "Baskı", en: "Print" } },
];

module.exports = {
  solo,
  composed,
  colors,
  sizes,
  pack: "/img/brand/dipnot-logo-paketi.zip",
  gingersauce: "https://app.gingersauce.co/my/view-new-v3/72228",

  tr: {
    lang: "tr",
    title: "Marka kitabı",
    accent: "kitabı",
    lead: "Dipnot markasını tutarlı kullanmak için herkese açık rehber: logo, renk, yazı tipi, ses ve kullanım kuralları.",
    download: "Logo paketini indir",
    downloadNote: "SVG + PNG, tüm varyantlar",
    reference: "Geniş kapsamlı iç rehber (referans):",
    toc: "Bu sayfada",
    sections: {
      character: "Marka karakteri",
      logo: "Logo",
      rules: "Kullanım kuralları",
      misuse: "Yanlış kullanım",
      colors: "Renkler",
      type: "Tipografi",
      voice: "Ses ve ton",
      assets: "İkon ve paylaşım görselleri",
    },
    character: {
      kicker: "Kaşif, Bilge omurgasıyla",
      quote:
        "Dipnot, derinliklere bir rehber: yarısı keşif, yarısı başvuru kaynağı. Su altı dünyasının hikayelerini, bilimini ve pratik bilgisini yüzeye taşıyoruz; güvenilecek kadar açık, seni de dalmaya heveslendirecek kadar canlı anlatıyoruz.",
      body: "Dipnot keşfin heyecanıyla öne çıkar, güvenilir bilgiyle ayakta durur. Adı da buradan gelir: dip, yani deniz tabanı; dipnot, yani metni destekleyen kaynak.",
    },
    logo: {
      intro:
        "Dipnot işareti iki biçimde gelir: saydam zeminli tek işaretler (sayfa içinde kullanım için) ve düz renk zeminli birleşik varyantlar (uygulama ikonu, paylaşım kartı, sosyal medya avatarı). Zemininde en net okunan varyantı seç.",
      solo: "Tek işaretler",
      composed: "Birleşik varyantlar",
      composedNote:
        "Düz zemin + işaret, karonun 1/6'sı kadar boşluk içinde gelir. Etraflarına ek boşluk ekleme.",
      soloUse: {
        logo: "Varsayılan. Okur yüzeyleri ve yönetim paneli.",
        "logo-gold": "Yönetici / operatör bağlamları.",
        "logo-white": "Koyu ya da fotoğraflı zeminler.",
        "logo-black": "Açık zeminler, baskı, az mürekkep.",
        "logo-winter-bloom":
          "Koyu mürdüm tek renk; sıcak ya da soluk zeminlerle.",
        "logo-sky-captain":
          "Siyaha yakın lacivert tek renk; parlak zeminlerle.",
      },
      svg: "SVG",
      png: "PNG",
    },
    rules: {
      clearTitle: "Boşluk alanı",
      clear:
        "Tek işaretlerin her yanında, işaret yüksekliğinin en az 1/6'sı kadar boş alan bırak. Bu alana metin, buton ya da kap kenarı giremez. İşaret 60 px ise her yanda 10 px boşluk kalmalı. Bu bir alt sınır: fazlası olur, azı olmaz.",
      clearLabel: "1/6 yükseklik",
      sizeTitle: "En küçük boyut",
      sizeIntro:
        "İşaret basit bir geometriye sahip ama 16 px'in altında iç detayı bulanıklaşır. Bağlama göre alt sınırlar:",
      sizeCol: ["Bağlam", "En az"],
    },
    misuse: {
      intro: "İşareti olduğu gibi kullan. Aşağıdakilerin hiçbiri yapılmamalı:",
      items: [
        "Esnetme ya da eğme",
        "Onaylı paletin dışında renklendirme",
        "Gölge, parıltı ya da dış çizgi ekleme",
        "Düşük kontrastlı zemine koyma",
        "Döndürme ya da ters çevirme",
        "Winter Bloom ya da Sky Captain'ı arayüz zemini olarak kullanma",
      ],
    },
    colors: {
      intro:
        "Dipnot Teal her yüzeyde tek ana vurgu rengidir: butonlar, etkin durumlar, odak halkaları, bağlantılar. Sky Captain ve Winter Bloom yalnızca birleşik varlıkların (uygulama ikonu, paylaşım kartı) zeminidir, arayüz zemini olarak kullanılmaz.",
      copy: "Kopyala",
      copied: "Kopyalandı",
    },
    type: {
      intro:
        "Başlık ve metinler için her yüzeyde tek bir aile: Inter (SIL OFL 1.1, ücretsiz). Logo yazısı ayrı bir görüntü yazı tipi kullanır: Gabarito Semibold. Logo çiziminin içine gömülüdür, sitede ya da uygulamada yüklenmez.",
      inter: "Arayüz yazı tipi",
      interMeta: "Başlık ve metin · 400 / 500 / 600 / 700",
      sample: "Su altını okumaya hazır mısın?",
      glyphs: "ÇĞİÖŞÜ çğıöşü 0123456789",
      gabarito: "Yalnızca logo yazısı",
      gabaritoMeta: "Semibold 600 · logo çiziminde",
      rulesTitle: "Türkçe tipografi",
      rules: [
        'Cümle düzeni büyük harf: yalnızca ilk kelime ve özel adlar büyük ("Hesabını oluştur", "Hesabını Oluştur" değil).',
        'Düz tırnak kullan: "…" — « » değil.',
        "Otomatik heceleme yok; kelimeler bölünmez.",
      ],
    },
    voice: {
      intro:
        "Dipnot karşılar, biraz da maceraya davet eder; ama asla bunaltmaz. Okurla konuşurken bunlar geçerli:",
      items: [
        {
          t: 'Okura "sen" diye seslen',
          d: 'Sıcak ve doğrudan: "Dalış dünyasını keşfet". Hukuki metinler resmi kalır.',
        },
        {
          t: "Önce olumlu eylem",
          d: 'Boş durumlarda özür dileme: "Henüz makale yok — ilkini keşfet", "Üzgünüz, bulunamadı" değil.',
        },
        {
          t: "Hata mesajı üç parça",
          d: "Ne oldu, neden oldu, şimdi ne yapmalı. Okuru asla suçlama.",
        },
        {
          t: "İddialar ürünle örtüşsün",
          d: "Uygulamanın yapmadığı bir şeyi vaat etme.",
        },
      ],
      circumflexTitle: "Düzeltme işareti (â, î, û)",
      circumflex:
        "Varsayılan: kullanma. Yalnızca işaretin yokluğu anlamı değiştiriyorsa yaz.",
      circumflexCol: ["Yaz", "Neden"],
      circumflexRows: [
        ["kâr", "kâr = kazanç, kar = yağan kar"],
        ["hâlâ", "hâlâ = henüz, hala = babanın kız kardeşi"],
        ["âdet", "âdet = gelenek, adet = sayı"],
      ],
      plain: "Her yerde işaretsiz: halinde, dahil, rüzgar, mekan, kağıt.",
    },
    assets: {
      intro:
        "Web sitesi ikonu yuvarlak Sky Captain disk üzerinde teal işarettir. Uygulama ikonu Sky Captain üzerinde teal birleşik varyanttır. Paylaşım görselleri her yerde güvenli kırpılan yığılmış düzeni, X için yatay düzeni kullanır.",
      webIcon: "Web sitesi ikonu",
      appIcon: "Uygulama ikonu",
      ogDefault: "Paylaşım görseli (varsayılan)",
      ogWide: "Paylaşım görseli (X, yatay)",
    },
    footer:
      "Bu sayfa Dipnot'un iç marka kılavuzunun herkese açık özetidir. Sorular için:",
    other: { label: "English version", href: "/brand-book.html", lang: "en" },
  },

  en: {
    lang: "en",
    title: "Brand book",
    accent: "book",
    lead: "A public reference for using the Dipnot brand consistently: logo, color, type, voice and usage rules.",
    download: "Download the logo pack",
    downloadNote: "SVG + PNG, every variant",
    reference: "Extended internal guide (reference):",
    toc: "On this page",
    sections: {
      character: "Brand character",
      logo: "Logo",
      rules: "Usage rules",
      misuse: "Misuse",
      colors: "Colors",
      type: "Typography",
      voice: "Voice and tone",
      assets: "Icons and share images",
    },
    character: {
      kicker: "The Explorer, with a Sage backbone",
      quote:
        "Dipnot is a guide to the deep — equal parts expedition and reference. We bring back the stories, science, and practical knowledge of the underwater world and present them clearly enough to trust and vividly enough to make you want to dive in yourself.",
      body: "Dipnot leads with the thrill of discovery and stands on trustworthy knowledge. The name says both: dip is Turkish for the seabed, and dipnot means footnote, the source behind the text.",
    },
    logo: {
      intro:
        "The Dipnot mark comes in solo marks (transparent background, for in-layout use) and composed variants (mark on a solid background, for app icons, share cards and social avatars). Pick the variant that reads most cleanly against its background.",
      solo: "Solo marks",
      composed: "Composed variants",
      composedNote:
        "Solid background + mark, with a baked-in clear-space border of 1/6 of the tile. Don't add extra padding around them.",
      soloUse: {
        logo: "Default. Reader-facing surfaces and the admin panel.",
        "logo-gold": "Admin / operator contexts.",
        "logo-white": "Dark or photographic backgrounds.",
        "logo-black": "Light backgrounds, print, low ink.",
        "logo-winter-bloom":
          "Deep-plum monochrome; pairs with warm or pale backgrounds.",
        "logo-sky-captain":
          "Near-black navy monochrome; pairs with bright backgrounds.",
      },
      svg: "SVG",
      png: "PNG",
    },
    rules: {
      clearTitle: "Clear space",
      clear:
        "Leave at least 1/6 of the mark's height empty on every side of a solo mark. No text, button or container edge may enter this zone. At 60 px, keep 10 px clear on each side. It's a minimum, not a target: more is fine, less is not.",
      clearLabel: "1/6 height",
      sizeTitle: "Minimum size",
      sizeIntro:
        "The mark's geometry is simple, but its inner detail muddies below 16 px. Floors per context:",
      sizeCol: ["Context", "Minimum"],
    },
    misuse: {
      intro: "Use the mark as it is. Never:",
      items: [
        "Stretch or skew it",
        "Recolor it outside the approved palette",
        "Add shadows, glows or outlines",
        "Place it on a low-contrast background",
        "Rotate or flip it",
        "Use Winter Bloom or Sky Captain as UI backgrounds",
      ],
    },
    colors: {
      intro:
        "Dipnot Teal is the single primary accent on every surface: buttons, active states, focus rings, links. Sky Captain and Winter Bloom are backgrounds for composed assets only (app icon, share cards), never for UI.",
      copy: "Copy",
      copied: "Copied",
    },
    type: {
      intro:
        "One family for titles and body on every surface: Inter (SIL OFL 1.1, free). The wordmark uses a separate display face, Gabarito Semibold. It's outlined into the logo artwork and never loaded on the site or in the app.",
      inter: "UI typeface",
      interMeta: "Titles and body · 400 / 500 / 600 / 700",
      sample: "Su altını okumaya hazır mısın?",
      glyphs: "ÇĞİÖŞÜ çğıöşü 0123456789",
      gabarito: "Wordmark only",
      gabaritoMeta: "Semibold 600 · in the logo artwork",
      rulesTitle: "Turkish typography",
      rules: [
        'Sentence case: only the first word and proper nouns are capitalised ("Hesabını oluştur", not "Hesabını Oluştur").',
        'Straight quotes: "…", not « ».',
        "No automatic hyphenation; words don't break.",
      ],
    },
    voice: {
      intro:
        "Dipnot is welcoming and a little adventurous, but never overwhelming. When writing for readers (Dipnot's copy is Turkish):",
      items: [
        {
          t: 'Address the reader as "sen"',
          d: 'Warm and direct: "Dalış dünyasını keşfet". Legal texts stay formal.',
        },
        {
          t: "Lead with the positive action",
          d: 'Don\'t apologise in empty states: "Henüz makale yok — ilkini keşfet", not "Üzgünüz, bulunamadı".',
        },
        {
          t: "Errors in three parts",
          d: "What happened, why, what to do next. Never blame the reader.",
        },
        {
          t: "Claims match the product",
          d: "Never promise something the app doesn't do.",
        },
      ],
      circumflexTitle: "Circumflex (â, î, û)",
      circumflex:
        "Default: don't use it. Write it only where leaving it out changes the meaning.",
      circumflexCol: ["Write", "Why"],
      circumflexRows: [
        ["kâr", "kâr = profit, kar = snow"],
        ["hâlâ", "hâlâ = still, hala = paternal aunt"],
        ["âdet", "âdet = custom, adet = count"],
      ],
      plain: "Unmarked everywhere else: halinde, dahil, rüzgar, mekan, kağıt.",
    },
    assets: {
      intro:
        "The website icon is the teal mark on a round Sky Captain disc. The app icon is the teal-on-Sky-Captain composed variant. Share images use the stacked layout, safe in any crop, and the horizontal layout for X.",
      webIcon: "Website icon",
      appIcon: "App icon",
      ogDefault: "Share image (default)",
      ogWide: "Share image (X, horizontal)",
    },
    footer:
      "This page is the public summary of Dipnot's internal brand guide. Questions:",
    other: { label: "Türkçe sürüm", href: "/marka-kitabi.html", lang: "tr" },
  },
};
