// Team page (ekip.html / en/team.html): one template
// (_includes/partials/team.njk). Turkish is primary; keep the two
// blocks in lockstep.
//
// Order: co-founders by surname, then the rest of the team.
//
// Member: name, initials (avatar until a photo exists), role, summary
// (what they do at Dipnot, always on the card). Optional: bio (relevant
// background only, max three paragraphs, no birth year; written by each
// member, shown behind "Özgeçmişi oku"), photo (path under /img/team/),
// links [{ icon, label, href }].

module.exports = {
  tr: {
    title: "Ekibimizle tanış",
    lead: "Dipnot'un arkasında dalış eğitmenleri, bir gazeteci-editör ve bir arkeolog var.",
    more: "Özgeçmişi oku",
    members: [
      {
        name: "Cüneyt Çakın",
        initials: "CÇ",
        role: "Kurucu Ortak · İş Geliştirme ve Sponsorluk",
        summary:
          "Şirketin günlük yönetimini ve Dipnot'un gelir modelini yürütüyor: sponsorluk anlaşmaları, uygulama içi reklam alanları ve dalış merkezleriyle iş birlikleri onun masasında.",
      },
      {
        name: "Hesna Onbaşı",
        initials: "HO",
        role: "Kurucu Ortak · Yayın Yönetmeni",
        summary:
          "Dipnot'un yayın çizgisini belirliyor: konu seçiminden yazım, çeviri ve editörlüğe, yazıların yayına girişine kadar tüm içerik sürecini yönetiyor.",
        bio: [
          "Gazeteci ve editör. İstanbul Üniversitesi İletişim Fakültesi'nde eğitim aldı; NTV ve Habertürk'ün de aralarında olduğu haber dergileri, televizyon kanalları ve radyolarda muhabir ve editör olarak çalıştı.",
          "İlk romanı <em>Süleyman'ın Kuyuları</em> 2014'te Labirent Yayınları'ndan çıktı ve aynı yıl İzmir Saint Joseph Lisesi kitap günlerinde yılın kitabı seçildi.",
          "IANTD Sidemount ve Recreational Trimix eğitmeni.",
        ],
      },
      {
        name: "Nevcan Uludaş",
        initials: "NU",
        role: "Kurucu Ortak · Ürün ve Teknoloji",
        summary:
          "iOS ve Android uygulamasının, yönetim panelinin ve web sitesinin mimarisini kurup geliştiriyor; bulut altyapısı, veri güvenliği ve marka sistemi de onun sorumluluğunda.",
        bio: [
          "2008'den beri dalıyor, 2011'den bu yana dalış eğitmeni; 7.000'i aşkın dalışının 1.000'den fazlası batıklarda. Türkiye'nin ilk GUE (Global Underwater Explorers) eğitmeni ve GUE Türkiye'nin kurucusu. Türkiye ile Dubai arasında temel, teknik ve kapalı devre (CCR) dalış eğitimleri veriyor.",
          "Çalışmalarının merkezinde sualtı kültürel mirası var: Akdeniz Üniversitesi'nde Akdeniz Sualtı Kültürel Mirası yüksek lisansını tamamlıyor; 2025'te Adrasan, Kumluca ve Fethiye'deki batıklarda arkeolojik araştırma dalışlarına katıldı. Ghost Diving Türkiye koordinatörü ve Project Baseline Marmara proje dalıcısı; mağara haritalama ve 3D fotogrametri üzerine çalışıyor.",
          "Yazılım mimarı ve sualtı görüntü yönetmeni. Halcyon, Shearwater, SUEX ve Big Blue marka elçisi.",
        ],
        links: [
          {
            icon: "globe",
            label: "nevcan.com",
            href: "https://nevcan.com/",
          },
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
        name: "Birgül Eker",
        initials: "BE",
        role: "Sosyal Medya",
        summary:
          "Arkeolog. Dipnot'un Instagram akışını yürütüyor: yeni yazıları görselleri ve özetleriyle düzenli olarak okurlarla paylaşıyor.",
      },
    ],
  },
  en: {
    title: "Meet the team",
    lead: "Behind Dipnot are dive instructors, a journalist and editor, and an archaeologist.",
    more: "Read bio",
    members: [
      {
        name: "Cüneyt Çakın",
        initials: "CÇ",
        role: "Co-founder · Business Development & Partnerships",
        summary:
          "Runs the company day to day and Dipnot's revenue model: sponsorship deals, in-app ad placements and partnerships with dive centres all sit on this desk.",
      },
      {
        name: "Hesna Onbaşı",
        initials: "HO",
        role: "Co-founder · Editor-in-Chief",
        summary:
          "Sets Dipnot's editorial line and runs the whole content process, from choosing topics to writing, translating and editing, through to publishing.",
        bio: [
          "Journalist and editor. Studied at Istanbul University's Faculty of Communication and worked as a reporter and editor for Turkish news magazines, TV channels and radio stations, including NTV and Habertürk.",
          "First novel, <em>Süleyman'ın Kuyuları</em>, was published by Labirent in 2014 and named book of the year at the İzmir Saint Joseph High School book days that year.",
          "IANTD Sidemount and Recreational Trimix Instructor.",
        ],
      },
      {
        name: "Nevcan Uludaş",
        initials: "NU",
        role: "Co-founder · Product & Technology",
        summary:
          "Architects and builds the iOS and Android app, the admin panel and the website; the cloud infrastructure, data security and the brand system are also in this remit.",
        bio: [
          "Diving since 2008 and a dive instructor since 2011, with 7,000+ dives, more than 1,000 of them on wrecks. Turkey's first GUE (Global Underwater Explorers) instructor and founder of GUE Turkey. Teaches fundamentals, technical and closed-circuit rebreather (CCR) diving between Turkey and Dubai.",
          "Underwater cultural heritage is at the centre of the work: completing an MA in Mediterranean Underwater Cultural Heritage Studies at Akdeniz University, and in 2025 took part in archaeological research dives on wrecks at Adrasan, Kumluca and Fethiye. Coordinator of Ghost Diving Turkey and project diver for Project Baseline Marmara; works on cave survey and 3D photogrammetry.",
          "Software architect and underwater cinematographer. Brand ambassador for Halcyon, Shearwater, SUEX and Big Blue.",
        ],
        links: [
          {
            icon: "globe",
            label: "nevcan.com",
            href: "https://nevcan.com/",
          },
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
        name: "Birgül Eker",
        initials: "BE",
        role: "Social Media",
        summary:
          "Archaeologist. Runs Dipnot's Instagram feed, regularly sharing new articles with readers through their images and summaries.",
      },
    ],
  },
};
