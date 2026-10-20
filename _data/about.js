// About page (hakkimizda.html / en/about.html): page copy and team
// cards, one template (_includes/partials/about.njk). Turkish is
// primary; keep the two blocks in lockstep.
//
// Team member: name, initials (avatar until a photo exists), role,
// bio. Optional: photo (path under /img/team/), links [{ icon, label,
// href }].

module.exports = {
  tr: {
    hero: "Hakkımızda",
    title: "Biz kimiz?",
    intro: [
      "<strong>Dipnot</strong>, dalış ve su altı dünyasına ilgi duyan herkes için hazırlanmış bağımsız bir içerik platformudur. Dalış gündeminden güvenliğe, ekipman ve teknolojiden mağara ve batıklara, çevreden seyahate kadar özenle yazılmış makaleleri tek bir uygulamada topluyoruz.",
      "2025'te İstanbul'da yola çıktık. Amacımız, dalış dünyasında olup biteni sade ve güvenilir bir şekilde takip edebileceğin bir kaynak olmak: yeni başlayanlardan deneyimli dalıcılara kadar herkes için.",
    ],
    nameTitle: "Neden “Dipnot”?",
    name: "Dipnot, bir metnin altına düşülen kısa ama değerli nottur. Bizim için bir kelime oyunu da: <em>dip</em>, denizin dibi. Su altında öğrenilen her şeyin bir dipnotu var; biz onları yazıyoruz.",
    teamTitle: "Ekip",
    teamLead:
      "Dipnot'u, dalış dünyasının içinden gelen küçük bir ekip hazırlıyor.",
    devTitle: "Geliştirici",
    dev: "Dipnot, <strong>V.A.C. Studio</strong> tarafından geliştirilmektedir. V.A.C. Studio, 2009'dan bu yana görsel üretim, ses ve yazılım alanlarında çalışan bir yaratıcı stüdyodur.",
    contactTitle: "Bize ulaş",
    contact:
      'Görüş, öneri ve iş birlikleri için <a href="mailto:info@dipnot.app">info@dipnot.app</a> adresine yazabilirsin. Adres ve diğer bilgiler <a href="/iletisim.html">İletişim</a> sayfasında.',
    team: [
      {
        name: "Hesna Onbaşı",
        initials: "HO",
        role: "Kurucu Ortak · Yayın Yönetmeni",
        bio: "Gazeteci ve editör. NTV ve Habertürk'ün de aralarında olduğu haber kanalları, dergiler ve radyolarda muhabir ve editör olarak çalıştı; ilk romanı <em>Süleyman'ın Kuyuları</em> 2014'te yayımlandı. IANTD Sidemount ve Recreational Trimix eğitmeni. Dipnot'ta yazıları yazıyor, çeviriyor ve yayına hazırlıyor.",
      },
    ],
  },

  en: {
    hero: "About us",
    title: "Who we are",
    intro: [
      "<strong>Dipnot</strong> is an independent platform for anyone interested in diving and the underwater world. From diving news and safety to gear and technology, caves and wrecks, the environment and travel, we bring carefully written articles together in one app. The articles are in Turkish.",
      "We started in Istanbul in 2025. Our aim is to be a simple, reliable place to follow what's happening in the diving world, for everyone from beginners to experienced divers.",
    ],
    nameTitle: "Why “Dipnot”?",
    name: "<em>Dipnot</em> is Turkish for footnote: a short but valuable note at the bottom of a page. It's also a play on words, since <em>dip</em> means the bottom of the sea. Everything learned underwater has a footnote, and we write them.",
    teamTitle: "Team",
    teamLead: "Dipnot is made by a small team from the diving world.",
    devTitle: "Developer",
    dev: "Dipnot is developed by <strong>V.A.C. Studio</strong>, a creative studio working in visual production, audio and software since 2009.",
    contactTitle: "Get in touch",
    contact:
      'For feedback, ideas and partnerships, write to <a href="mailto:info@dipnot.app">info@dipnot.app</a>. Our address and other details are on the <a href="/en/contact.html">Contact</a> page.',
    team: [
      {
        name: "Hesna Onbaşı",
        initials: "HO",
        role: "Co-founder · Editor-in-Chief",
        bio: "Journalist and editor. Has worked as a reporter and editor for Turkish news channels, magazines and radio stations, including NTV and Habertürk; first novel, <em>Süleyman'ın Kuyuları</em>, published in 2014. IANTD Sidemount and Recreational Trimix Instructor. At Dipnot: writes, translates and edits the articles.",
      },
    ],
  },
};
