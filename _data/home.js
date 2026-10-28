// Home page copy in both languages, rendered by partials/home.njk for
// index.html (tr) and en/index.html (en). Keep the two blocks in
// lockstep; Turkish is primary.

// Category labels as shown in the app (Kategoriler screen, 2026-10-11).
// The full list lives in Firestore; only these six are confirmed.
const categories = [
  { icon: "fire", tr: "Gündem", en: "News" },
  { icon: "leaf", tr: "Çevre & Koruma", en: "Environment & Conservation" },
  { icon: "shield-halved", tr: "Dalış Güvenliği", en: "Dive Safety" },
  { icon: "microchip", tr: "Ekipman & Teknoloji", en: "Gear & Technology" },
  { icon: "mountain", tr: "Mağara & Batık", en: "Caves & Wrecks" },
  { icon: "plane", tr: "Seyahat & Yaşam", en: "Travel & Lifestyle" },
];

// App screenshots for the 3D iPhones (img-src/screens → img/opt). The
// app is Turkish, so the screenshots are too, in both languages.
const alts = {
  feed: ["Dipnot ana sayfa akışı", "The Dipnot home feed"],
  article: ["Dipnot uygulamasında bir makale", "An article in the Dipnot app"],
  saved: ["Dipnot kaydedilen makaleler ekranı", "Saved articles in Dipnot"],
  signin: ["Dipnot giriş ekranı", "The Dipnot sign-in screen"],
  appstore: ["App Store'da Dipnot uygulama sayfası", "Dipnot on the App Store"],
};
// { tr: { feed: { name, alt } … }, en: { … } } — the shape the iphone
// macro takes
const screens = Object.fromEntries(
  ["tr", "en"].map((lang, i) => [
    lang,
    Object.fromEntries(
      Object.entries(alts).map(([name, a]) => [name, { name, alt: a[i] }]),
    ),
  ]),
);

module.exports = {
  categories,
  screens,

  tr: {
    eyebrow: "Dalış dünyasını her gün yeni bir yazıyla keşfet.",
    title: { pre: "Su altını", accent: "okumaya", post: "hazır mısın?" },
    lead: "Dalış güvenliğinden ekipmana, batıklardan su altı fotoğrafçılığına; dalış dünyasını derinlemesine anlatan yazılar Dipnot'ta.",
    appNote: "",
    chips: ["Özenle seçilmiş içerikler", "Kategoriler", "Sade arayüz"],
    scroll: "Aşağı kaydır",
    about: {
      title: { pre: "", accent: "Dipnot", post: "nedir?" },
      body: [
        "Dipnot, dalış ve su altı dünyasına ilgi duyan herkes için hazırlanmış bağımsız bir içerik platformudur. Uygulamada dalış gündeminden güvenliğe, ekipman ve teknolojiden mağara ve batıklara, çevreden seyahate kadar özenle yazılmış makalelere ulaşabilirsin.",
        "Dipnot, dalış dünyasında olup biteni tek bir yerden, sade ve güvenilir bir şekilde takip etmen için var. Yeni başlayanlardan deneyimli dalıcılara kadar herkes için okunabilir ve güvenilir bir kaynak oluşturur.",
      ],
    },
    features: {
      title: "Özellikler",
      lead: "Dalış odaklı, sade ve nitelikli bir içerik deneyimi",
      curated: {
        t: "Özenle seçilmiş içerikler",
        d: "Deneyimli dalıcılar tarafından hazırlanmış nitelikli yazılar.",
      },
      categories: {
        t: "Kategoriler",
        d: "Farklı başlıklar altında düzenlenmiş içerikler.",
      },
      saved: {
        t: "Kaydet, sonra oku",
        d: "Beğendiğin yazıları kaydet, istediğin zaman geri dön.",
      },
      simple: { t: "Sade arayüz", d: "Dikkat dağıtmayan, odaklı tasarım." },
    },
    how: {
      title: "Nasıl çalışır?",
      steps: [
        {
          t: "Ücretsiz indir",
          d: "App Store veya Google Play üzerinden Dipnot'u ücretsiz indir.",
        },
        {
          t: "Hesabını oluştur",
          d: "E-posta, Apple ya da Google ile saniyeler içinde giriş yap.",
        },
        {
          t: "İçerikleri keşfet",
          d: "Dalış ve su altı dünyasına dair farklı başlıklar altında hazırlanmış makalelere kolayca ulaş.",
        },
      ],
    },
    faq: {
      title: "Sıkça sorulan sorular",
      contentQ: "Dipnot'ta ne tür içerikler bulabilirim?",
      contentA: {
        pre: "Dipnot'ta",
        and: "ve",
        post: "başlıkları altında hazırlanmış, derinlikli makaleler bulabilirsin. Hemen her gün yayınlanan yeni yazılarla dalış dünyasının gündemini kaçırmazsın.",
      },
      items: [
        {
          q: "Dipnot'u diğer dalış bloglarından ayıran nedir?",
          a: "Dipnot, dağınık içerikler yerine tek bir platformda, özenle seçilmiş ve düzenli bir okuma deneyimi sunar. Reklam odaklı değil, bilgi odaklıdır.",
        },
        {
          q: "Uygulama tamamen ücretsiz mi?",
          a: "Dipnot'un temel içeriklerine ücretsiz olarak erişebilirsin. İlerleyen dönemde, özel içerikler ve araçlar için ücretli üyelik seçenekleri sunulacaktır.",
        },
        {
          q: "Yeni içerikler ne sıklıkla yayınlanıyor?",
          a: "Hemen her gün yeni bir yazı yayınlıyoruz; haftada genellikle 5–6 makale. Uygulamayı açtığında en yeni yazılar akışının en üstünde seni bekler.",
        },
      ],
    },
    contact: {
      title: "İletişim",
      lead: "Soru, öneri ya da iş birliği için bize yazabilirsin; sana en kısa sürede dönüş yapacağız.",
      name: "Ad soyad",
      namePh: "Adın ve soyadın",
      email: "E-posta",
      emailPh: "eposta@ornek.com",
      subject: "Konu",
      subjects: {
        general: "Genel bilgi",
        support: "Teknik destek",
        partnership: "İş birliği",
        feedback: "Geri bildirim",
      },
      message: "Mesaj",
      messagePh: "Mesajını buraya yaz",
      notice: {
        pre: "Gönderdiğin bilgileri mesajını yanıtlamak için işleriz. Ayrıntılar",
        link: "Gizlilik Politikası ve Aydınlatma Metni",
        post: "sayfasında.",
      },
      submit: "Gönder",
    },
    cta: {
      title: { pre: "Kullanmaya", accent: "ücretsiz", post: "başla!" },
      lead: "Uygulamayı indir, yeni yazılar yayınlandığında ilk sen oku.",
    },
  },

  en: {
    eyebrow: "Discover the diving world with a new article every day.",
    title: { pre: "Ready to", accent: "read", post: "the deep?" },
    lead: "From dive safety to gear, from wrecks to underwater photography: in-depth writing about the diving world, on Dipnot.",
    appNote: "The Dipnot app and its articles are in Turkish.",
    chips: ["Carefully curated", "Categories", "Clean interface"],
    scroll: "Scroll down",
    about: {
      title: { pre: "What is", accent: "Dipnot", post: "?" },
      body: [
        "Dipnot is an independent publication for everyone drawn to diving and the underwater world. In the app you'll find carefully written articles on everything from dive news and safety to gear and technology, caves and wrecks, the environment and travel.",
        "Dipnot is here so you can keep up with what's happening in the diving world, in one place, simply and reliably. For beginners and experienced divers alike, it's a readable and trustworthy source.",
      ],
    },
    features: {
      title: "Features",
      lead: "A focused, high-quality reading experience built around diving",
      curated: {
        t: "Carefully curated",
        d: "Quality articles written by experienced divers.",
      },
      categories: {
        t: "Categories",
        d: "Articles organised under clear topics.",
      },
      saved: {
        t: "Save it for later",
        d: "Save the articles you like and come back to them any time.",
      },
      simple: {
        t: "Clean interface",
        d: "A focused design without distractions.",
      },
    },
    how: {
      title: "How it works",
      steps: [
        {
          t: "Download for free",
          d: "Get Dipnot free on the App Store or Google Play.",
        },
        {
          t: "Create your account",
          d: "Sign in with email, Apple or Google in seconds.",
        },
        {
          t: "Start exploring",
          d: "Find articles on every corner of diving and the underwater world.",
        },
      ],
    },
    faq: {
      title: "Frequently asked questions",
      contentQ: "What kind of content will I find on Dipnot?",
      contentA: {
        pre: "In-depth articles under",
        and: "and",
        post: ". With new articles almost every day, you won't miss what's happening in diving. Articles are published in Turkish.",
      },
      items: [
        {
          q: "What makes Dipnot different from other diving blogs?",
          a: "Instead of scattered posts, Dipnot offers one carefully curated, well-organised place to read. It's built around knowledge, not ads.",
        },
        {
          q: "Is the app completely free?",
          a: "Dipnot's core content is free to read. Paid membership options for exclusive content and tools will come later.",
        },
        {
          q: "How often is new content published?",
          a: "We publish a new article almost every day, usually 5–6 a week. The newest articles are waiting at the top of your feed when you open the app.",
        },
      ],
    },
    contact: {
      title: "Contact",
      lead: "Questions, ideas or partnerships: write to us and we'll get back to you as soon as we can.",
      name: "Full name",
      namePh: "Your full name",
      email: "Email",
      emailPh: "you@example.com",
      subject: "Subject",
      subjects: {
        general: "General information",
        support: "Technical support",
        partnership: "Partnership",
        feedback: "Feedback",
      },
      message: "Message",
      messagePh: "Write your message here",
      notice: {
        pre: "We use what you send to answer your message. Details are in our",
        link: "Privacy Policy",
        post: ".",
      },
      submit: "Send",
    },
    cta: {
      title: { pre: "Get started for", accent: "free", post: "!" },
      lead: "Download the app and be the first to read new articles.",
    },
  },
};
