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
          "Dipnot'un gelir modelini yürütüyor: sponsorluk anlaşmaları, uygulama içi reklam alanları ve dalış merkezleriyle iş birlikleri onun masasında.",
      },
      {
        name: "Hesna Onbaşı",
        initials: "HO",
        role: "Kurucu Ortak · Yayın Yönetmeni",
        summary:
          "Dipnot'un yayın çizgisini belirliyor ve yayın akışını yönetiyor: konu seçiminden yazım, çeviri ve editörlüğe kadar tüm içerik süreci onun elinden geçiyor.",
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
          "iOS ve Android uygulamalarından, yönetim panelinden ve web sitesinden sorumlu; genel teknoloji mimarisini kurup geliştiriyor, bulut altyapısını, veri güvenliğini ve kurumsal kimlik sistemini yönetiyor.",
        bio: [
          "2008'de dalmaya başladı, 2011'den bu yana dalış eğitmeni. Türkiye'nin ilk GUE (Global Underwater Explorers) eğitmeni ve GUE Türkiye temsilcisi; bugün GUE'de eğitmen yetiştiren Instructor Trainer seviyesinde. Kapalı devre solunum cihazı (CCR), mağara ve karışım gazla derin dalışlar yapıyor.",
          "Sualtı projelerinde aktif: Ghost Diving Türkiye koordinatörü olarak hayalet ağ projeleri yürütüyor, Project Baseline'ın Ayvalık ve Marmara çalışmalarına destek veriyor, arkeolojik araştırmalara katılıyor ve mağara haritalama projeleri yapıyor. Sualtı arkeolojisi yüksek lisansını tamamlıyor.",
          "Doğuş Teknoloji ve SabancıDx gibi şirketlerde yazılım mimarı olarak çalıştı; bu deneyimini Dipnot'un teknoloji altyapısına taşıyor.",
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
          "Dipnot'un sosyal medya hesaplarını yürütüyor: yeni yazıları görselleri ve özetleriyle düzenli olarak okurlarla paylaşıyor.",
        bio: [
          "Lisansını arkeoloji bölümünde tamamladı, yüksek lisansında da aynı alanda derinleşiyor. İlgisinin odağında sualtı arkeolojisi var: denizin altında saklı kalan geçmişin izini sürmek, çalışmalarının merkezinde.",
          "TSSF/CMAS iki yıldızlı dalıcı olarak bu ilgiyi suyun altına da taşıyor. Arkeolojiyle dalışın buluştuğu Dipnot'ta hem arkeoloji yazıları kaleme alıyor hem de yazıların sosyal medyadaki sesi oluyor.",
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
        name: "Cüneyt Çakın",
        initials: "CÇ",
        role: "Co-founder · Business Development & Partnerships",
        summary:
          "Runs Dipnot's revenue model: sponsorship deals, in-app ad placements and partnerships with dive centres all sit on this desk.",
      },
      {
        name: "Hesna Onbaşı",
        initials: "HO",
        role: "Co-founder · Editor-in-Chief",
        summary:
          "Sets Dipnot's editorial line and manages the publishing schedule: the whole content process, from choosing topics to writing, translating and editing, goes through Hesna.",
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
          "Responsible for the iOS and Android apps, the admin panel and the website; designs and develops the overall technology architecture, and manages the cloud infrastructure, data security and the corporate identity system.",
        bio: [
          "Started diving in 2008 and has been a dive instructor since 2011. Turkey's first GUE (Global Underwater Explorers) instructor and GUE's representative in Turkey, now at Instructor Trainer level, training GUE instructors. Dives closed-circuit rebreathers (CCR), caves and deep mixed-gas dives.",
          "Active in underwater projects: coordinates Ghost Diving Turkey's ghost-net projects, supports Project Baseline's work in Ayvalık and the Sea of Marmara, takes part in archaeological research and runs cave survey projects. Completing an MA in underwater archaeology.",
          "Has worked as a software architect at companies such as Doğuş Teknoloji and SabancıDx, and brings that experience to Dipnot's technology.",
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
          "Runs Dipnot's social media accounts, regularly sharing new articles with readers through their images and summaries.",
        bio: [
          "Took a degree in archaeology and is now going deeper into the field with a master's. Underwater archaeology is at the heart of the work: tracing the past the sea keeps hidden.",
          "As a TSSF/CMAS two-star diver, Birgül takes that interest below the surface too. At Dipnot, where archaeology meets diving, Birgül writes archaeology articles and is the voice of Dipnot's stories on social media.",
        ],
      },
    ],
  },
};
