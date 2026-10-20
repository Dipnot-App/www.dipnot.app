// Team page (ekip.html / en/team.html): one template
// (_includes/partials/team.njk). Turkish is primary; keep the two
// blocks in lockstep.
//
// Member: name, initials (avatar until a photo exists), role, summary
// (what they do at Dipnot, always on the card), bio (relevant background
// only, max three paragraphs, behind "Özgeçmişi oku"; no birth year). Optional: photo (path under /img/team/),
// links [{ icon, label, href }].

module.exports = {
  tr: {
    title: "Ekibimizle tanış",
    lead: "Dipnot'un arkasında dalış eğitmenleri, bir gazeteci-editör ve bir arkeolog var.",
    more: "Özgeçmişi oku",
    members: [
      {
        name: "Nevcan Uludaş",
        initials: "NU",
        role: "Kurucu Ortak · Ürün ve Teknoloji",
        summary:
          "Dipnot'un ürününü ve teknolojisini yönetir: mobil uygulamayı, yönetim panelini ve web sitesini tasarlayıp geliştirdi, marka sistemini kurdu.",
        bio: [
          "2008'den beri dalıyor, 2011'den bu yana dalış eğitmeni; 7.000'i aşkın dalışının 1.000'den fazlası batıklarda. Türkiye'nin ilk GUE (Global Underwater Explorers) eğitmeni ve GUE Türkiye'nin kurucusu. Türkiye ile Dubai arasında temel, teknik ve kapalı devre (CCR) dalış eğitimleri veriyor.",
          "Çalışmalarının merkezinde sualtı kültürel mirası var: Akdeniz Üniversitesi'nde Akdeniz Sualtı Kültürel Mirası yüksek lisansını tamamlıyor; 2025'te Adrasan, Kumluca ve Fethiye'deki batıklarda arkeolojik araştırma dalışlarına katıldı. Ghost Diving Türkiye koordinatörü ve Project Baseline Marmara proje dalıcısı; mağara haritalama ve 3D fotogrametri üzerine çalışıyor.",
          "Yazılım mimarı ve sualtı görüntü yönetmeni. Halcyon, Shearwater, SUEX ve Big Blue marka elçisi.",
        ],
        links: [
          { icon: "globe", label: "nevcan.com", href: "https://nevcan.com/" },
          {
            icon: "id-card",
            label: "Nevcan Uludaş, GUE eğitmen özgeçmişi",
            href: "https://gue.com/diver-training/gue-instructors/instructor-resume?id=20397",
          },
          {
            icon: "brands:linkedin",
            label: "Nevcan Uludaş, LinkedIn",
            href: "https://www.linkedin.com/in/nevcanuludas/",
          },
          {
            icon: "brands:instagram",
            label: "Nevcan Uludaş, Instagram",
            href: "https://www.instagram.com/nevcanuludas/",
          },
        ],
      },
      {
        name: "Hesna Onbaşı",
        initials: "HO",
        role: "Kurucu Ortak · Yayın Yönetmeni",
        summary:
          "Dipnot'un yayın yönetmeni: yazıları yazar, çevirir, düzenler ve yayına hazırlar.",
        bio: [
          "Gazeteci ve editör. İstanbul Üniversitesi İletişim Fakültesi'nde eğitim aldı; NTV ve Habertürk'ün de aralarında olduğu haber dergileri, televizyon kanalları ve radyolarda muhabir ve editör olarak çalıştı.",
          "İlk romanı <em>Süleyman'ın Kuyuları</em> 2014'te Labirent Yayınları'ndan çıktı ve aynı yıl İzmir Saint Joseph Lisesi kitap günlerinde yılın kitabı seçildi.",
          "IANTD Sidemount ve Recreational Trimix eğitmeni.",
        ],
      },
    ],
  },

  en: {
    title: "Meet the team",
    lead: "Behind Dipnot are dive instructors, a journalist and editor, and an archaeologist.",
    more: "Read bio",
    members: [
      {
        name: "Nevcan Uludaş",
        initials: "NU",
        role: "Co-founder · Product & Technology",
        summary:
          "Leads Dipnot's product and technology: designed and built the mobile app, the admin panel and the website, and set up the brand system.",
        bio: [
          "Diving since 2008 and a dive instructor since 2011, with 7,000+ dives, more than 1,000 of them on wrecks. Turkey's first GUE (Global Underwater Explorers) instructor and founder of GUE Turkey. Teaches fundamentals, technical and closed-circuit rebreather (CCR) diving between Turkey and Dubai.",
          "Underwater cultural heritage is at the centre of the work: completing an MA in Mediterranean Underwater Cultural Heritage Studies at Akdeniz University, and in 2025 took part in archaeological research dives on wrecks at Adrasan, Kumluca and Fethiye. Coordinator of Ghost Diving Turkey and project diver for Project Baseline Marmara; works on cave survey and 3D photogrammetry.",
          "Software architect and underwater cinematographer. Brand ambassador for Halcyon, Shearwater, SUEX and Big Blue.",
        ],
        links: [
          { icon: "globe", label: "nevcan.com", href: "https://nevcan.com/" },
          {
            icon: "id-card",
            label: "Nevcan Uludaş, GUE instructor resume",
            href: "https://gue.com/diver-training/gue-instructors/instructor-resume?id=20397",
          },
          {
            icon: "brands:linkedin",
            label: "Nevcan Uludaş on LinkedIn",
            href: "https://www.linkedin.com/in/nevcanuludas/",
          },
          {
            icon: "brands:instagram",
            label: "Nevcan Uludaş on Instagram",
            href: "https://www.instagram.com/nevcanuludas/",
          },
        ],
      },
      {
        name: "Hesna Onbaşı",
        initials: "HO",
        role: "Co-founder · Editor-in-Chief",
        summary:
          "Dipnot's editor-in-chief: writes, translates, edits and publishes the articles.",
        bio: [
          "Journalist and editor. Studied at Istanbul University's Faculty of Communication and worked as a reporter and editor for Turkish news magazines, TV channels and radio stations, including NTV and Habertürk.",
          "First novel, <em>Süleyman'ın Kuyuları</em>, was published by Labirent in 2014 and named book of the year at the İzmir Saint Joseph High School book days that year.",
          "IANTD Sidemount and Recreational Trimix Instructor.",
        ],
      },
    ],
  },
};
