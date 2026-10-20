// Team page (ekip.html / en/team.html): one template
// (_includes/partials/team.njk). Turkish is primary; keep the two
// blocks in lockstep.
//
// Order: co-founders by surname, then the rest of the team.
//
// Member: name, initials (avatar until a photo exists), role, summary
// (what they do at Dipnot, always on the card). Optional: bio (relevant
// background only, max three paragraphs, no birth year; written by each
// member, shown behind "Özgeçmişi oku"), photo (img/opt stem, exported
// by scripts/build-images.js from img-src/team/),
// links [{ icon, label, href }].

module.exports = {
  tr: {
    title: "Ekibimizle tanışın",
    lead: "Dipnot, dalıştan yayıncılığa, arkeolojiden teknolojiye farklı alanlardan profesyonellerin bir araya geldiği bir ekip.",
    more: "Özgeçmişi oku",
    members: [
      {
        name: "Cüneyt Çakın",
        initials: "CÇ",
        photo: "team-cuneyt",
        role: "Kurucu Ortak · İş Geliştirme ve Sponsorluk",
        summary:
          "Dipnot'un gelir modelini yürütüyor: sponsorluk anlaşmaları, uygulama içi reklam alanları ve dalış merkezleriyle iş birlikleri onun masasında.",
        bio: [
          "CCR eğitmen eğitmeni ve PADI IDC Staff Instructor; kapalı devre solunum cihazlarıyla derin dalış eğitimleri veriyor ve yeni eğitmenler yetiştiriyor.",
          "Diver ile Shearwater, Poseidon, Divesoft, Scuba Force, Seacraft ve MPS gibi teknik dalış markalarının Türkiye distribütörlüğünü yürütüyor. Sektördeki bu geniş ağı Dipnot'un sponsorluk ve iş birliklerine taşıyor.",
        ],
        links: [
          {
            icon: "globe",
            label: "Diver, diver.com.tr",
            href: "https://www.diver.com.tr/",
          },
        ],
      },
      {
        name: "Hesna Onbaşı",
        initials: "HO",
        photo: "team-hesna",
        role: "Kurucu Ortak · Yayın Yönetmeni",
        summary:
          "Dipnot'un yayın çizgisini belirliyor ve yayın akışını yönetiyor: konu seçiminden yazım, çeviri ve editörlüğe kadar tüm içerik süreci onun elinden geçiyor.",
        bio: [
          "Gazeteci ve editör. İstanbul Üniversitesi İletişim Fakültesi'nde eğitim aldı; NTV ve Habertürk'ün de aralarında olduğu haber dergileri, televizyon kanalları ve radyolarda muhabir ve editör olarak çalıştı. Uzun yıllar adliye ve adli tıp muhabirliği yaptı.",
          "Bu deneyim kalemine de yansıdı: Kanuni ve Mimar Sinan dönemine uzanan, İstanbul'da geçen ilk polisiye romanı <em>Süleyman'ın Kuyuları</em> 2014'te Labirent Yayınları'ndan çıktı ve aynı yıl İzmir Saint Joseph Lisesi kitap günlerinde yılın kitabı seçildi.",
          "IANTD Sidemount ve Recreational Trimix eğitmeni; Çanakkale Kabatepe'deki Gallipoli Wrecks Dive Centre ekibinde, Gelibolu'nun Birinci Dünya Savaşı batıklarında dalıyor.",
        ],
      },
      {
        name: "Nevcan Uludaş",
        initials: "NU",
        photo: "team-nevcan",
        role: "Kurucu Ortak · Ürün ve Teknoloji",
        summary:
          "iOS ve Android uygulamalarından, yönetim panelinden ve web sitesinden sorumlu; genel teknoloji mimarisini kurup geliştiriyor, bulut altyapısını, veri güvenliğini ve kurumsal kimlik sistemini yönetiyor.",
        bio: [
          "Dalışa 2008'de başladı; 2011'den bu yana aktif olarak dalış eğitmenliği yapıyor. Türkiye'nin ilk GUE (Global Underwater Explorers) eğitmeni ve GUE Türkiye temsilcisi; bugün GUE'de eğitmen yetiştiren Instructor Trainer seviyesinde. Kapalı devre solunum cihazı (CCR), mağara ve karışım gazla derin dalışlar yapıyor. Dünyanın en derin havuzu Deep Dive Dubai'de operasyon ve teknik ekiplerde çeşitli rollerde görev aldı.",
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
        photo: "team-birgul",
        role: "Sosyal Medya · Arkeoloji İçerik Yazarı",
        summary:
          "Dipnot'un sosyal medya hesaplarını yönetiyor ve arkeoloji yazılarını kaleme alıyor; yeni yazıları görselleri ve özetleriyle düzenli olarak okurlarla buluşturuyor.",
        bio: [
          "Arkeoloji lisansının ardından yüksek lisansını da arkeoloji üzerine yapıyor; bir yandan da Kültürel Miras ve Turizm alanında eğitimini sürdürüyor. İlgisinin odağında sualtı arkeolojisi var: denizin altında saklı kalan geçmişin izini sürmek, çalışmalarının merkezinde.",
          "TSSF/CMAS iki yıldızlı dalıcı olarak bu ilgiyi suyun altına da taşıyor. Arkeolojiyle dalışın buluştuğu Dipnot'ta bu birikimi hem yazılarına hem de sosyal medyadaki sesine taşıyor.",
        ],
        links: [
          {
            icon: "brands:instagram",
            label: "Birgül Eker, Instagram",
            href: "https://www.instagram.com/birgul_eker/",
          },
        ],
      },
    ],
  },
  en: {
    title: "Meet the team",
    lead: "Dipnot is a team of professionals from different fields, from diving and publishing to archaeology and technology.",
    more: "Read bio",
    members: [
      {
        name: "Cüneyt Çakın",
        initials: "CÇ",
        photo: "team-cuneyt",
        role: "Co-founder · Business Development & Partnerships",
        summary:
          "Runs Dipnot's revenue model: sponsorship deals, in-app ad placements and partnerships with dive centres all sit on this desk.",
        bio: [
          "CCR Instructor Trainer and PADI IDC Staff Instructor; teaches deep diving on closed-circuit rebreathers and trains new instructors.",
          "Through Diver, distributes technical diving brands in Turkey, including Shearwater, Poseidon, Divesoft, Scuba Force, Seacraft and MPS, and brings that wide industry network to Dipnot's sponsorships and partnerships.",
        ],
        links: [
          {
            icon: "globe",
            label: "Diver, diver.com.tr",
            href: "https://www.diver.com.tr/",
          },
        ],
      },
      {
        name: "Hesna Onbaşı",
        initials: "HO",
        photo: "team-hesna",
        role: "Co-founder · Editor-in-Chief",
        summary:
          "Sets Dipnot's editorial line and manages the publishing schedule: the whole content process, from choosing topics to writing, translating and editing, goes through Hesna.",
        bio: [
          "Journalist and editor. Studied at Istanbul University's Faculty of Communication and worked as a reporter and editor for Turkish news magazines, TV channels and radio stations, including NTV and Habertürk. Spent years as a court and forensic-medicine reporter.",
          "That experience carried into fiction: the first crime novel, <em>Süleyman'ın Kuyuları</em>, set in Istanbul and reaching back to the era of Suleiman the Magnificent and the architect Sinan, was published by Labirent in 2014 and named book of the year at the İzmir Saint Joseph High School book days that year.",
          "IANTD Sidemount and Recreational Trimix Instructor; part of the Gallipoli Wrecks Dive Centre team at Kabatepe, Çanakkale, diving the First World War wrecks of Gallipoli.",
        ],
      },
      {
        name: "Nevcan Uludaş",
        initials: "NU",
        photo: "team-nevcan",
        role: "Co-founder · Product & Technology",
        summary:
          "Responsible for the iOS and Android apps, the admin panel and the website; designs and develops the overall technology architecture, and manages the cloud infrastructure, data security and the corporate identity system.",
        bio: [
          "Started diving in 2008 and has been actively teaching as a dive instructor since 2011. Turkey's first GUE (Global Underwater Explorers) instructor and GUE's representative in Turkey, now at Instructor Trainer level, training GUE instructors. Dives closed-circuit rebreathers (CCR), caves and deep mixed-gas dives. Has held various roles in the operations and technical teams at Deep Dive Dubai, the world's deepest pool.",
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
        photo: "team-birgul",
        role: "Social Media · Archaeology Writer",
        summary:
          "Runs Dipnot's social media accounts and writes its archaeology articles, regularly bringing new pieces to readers through their images and summaries.",
        bio: [
          "After a degree in archaeology, now doing a master's in the same field, while also studying Cultural Heritage and Tourism. Underwater archaeology is at the heart of the work: tracing the past the sea keeps hidden.",
          "As a TSSF/CMAS two-star diver, Birgül takes that interest below the surface too. At Dipnot, where archaeology meets diving, Birgül brings that background to both the articles and Dipnot's voice on social media.",
        ],
        links: [
          {
            icon: "brands:instagram",
            label: "Birgül Eker on Instagram",
            href: "https://www.instagram.com/birgul_eker/",
          },
        ],
      },
    ],
  },
};
