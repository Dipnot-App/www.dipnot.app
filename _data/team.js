// Team page (ekip.html / en/team.html): one template
// (_includes/partials/team.njk). Turkish is primary; keep the two
// blocks in lockstep.
//
// Order: co-founders by surname, then the rest of the team.
//
// Member: name, initials (avatar until a photo exists), role, summary
// (what they do at Dipnot, always on the card). Optional: bio, shown
// behind "Özgeçmiş", as paragraphs in this order: personal, how they
// started diving, diving expertise and achievements, expertise for their
// Dipnot role (no birth year); photo (img/opt stem, exported by
// scripts/build-images.js from img-src/team/); links [{ icon, label,
// href }].

module.exports = {
  tr: {
    title: "Ekibimizle tanışın",
    lead: "Dipnot, dalıştan yayıncılığa, arkeolojiden teknolojiye farklı alanlardan profesyonellerin bir araya geldiği bir ekip.",
    more: "Özgeçmiş",
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
          "Shearwater, Poseidon, Divesoft, Scuba Force, Seacraft ve MPS gibi teknik dalış markalarının Türkiye distribütörlüğünü yürütüyor. Sektördeki bu geniş ağı Dipnot'un sponsorluk ve iş birliklerine taşıyor.",
        ],
        links: [
          {
            icon: "globe",
            label: "Diver, diver.com.tr",
            href: "https://www.diver.com.tr/",
          },
          {
            icon: "brands:linkedin",
            label: "Cüneyt Çakın, LinkedIn",
            href: "https://www.linkedin.com/in/c%C3%BCneyt-%C3%A7ak%C4%B1n-7546851a6/",
          },
          {
            icon: "brands:instagram",
            label: "Cüneyt Çakın, Instagram",
            href: "https://www.instagram.com/cuneytcakin/",
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
          "25 yıllık deneyime sahip bir gazeteci ve editör. atv, Habertürk TV, NTV ve ulusal dergilerde muhabir ve editör olarak çalıştı; atv'de Gece Haberleri Ekip Şefi olarak son dakika yayınlarının editoryal operasyonunu yönetti. Uzun yıllar adliye ve adli tıp muhabirliği yaptı.",
          "Bu deneyim kalemine de yansıdı: Kanuni ve Mimar Sinan dönemine uzanan, İstanbul'da geçen ilk polisiye romanı <em>Süleyman'ın Kuyuları</em> 2014'te Labirent Yayınları'ndan çıktı ve aynı yıl İzmir Saint Joseph Lisesi kitap günlerinde yılın kitabı seçildi.",
          "IANTD Sidemount ve Recreational Trimix eğitmeni. Türkiye ile Mısır'ın Dahab kenti arasında yaşıyor; editoryal birikimini dalışa ve dalış turizmine dair ilk elden bilgisiyle birleştiriyor.",
        ],
        links: [
          {
            icon: "brands:linkedin",
            label: "Hesna Onbaşı, LinkedIn",
            href: "https://www.linkedin.com/in/seval-hesna-onbasi-351b9716/",
          },
          {
            icon: "brands:instagram",
            label: "Hesna Onbaşı, Instagram (@scubahelpdesk)",
            href: "https://www.instagram.com/scubahelpdesk/",
          },
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
          "Eskişehir Osmangazi Üniversitesi'nde maden mühendisliği okudu, Akdeniz Üniversitesi'nde sualtı arkeolojisi üzerine yüksek lisans yapıyor. Türkiye ile Dubai arasında yaşıyor.",
          "Sualtıyla 2008'de, üniversitesinin dalış kulübünde tanıştı. 2011'de eğitmen oldu ve o günden bu yana aktif olarak dalış eğitmenliği yapıyor.",
          "Türkiye'nin ilk GUE (Global Underwater Explorers) eğitmeni ve GUE Türkiye temsilcisi; bugün GUE'de eğitmen yetiştiren Instructor Trainer seviyesinde. Kapalı devre solunum cihazı (CCR), mağara ve karışım gazla derin dalışlar yapıyor. Dünyanın en derin havuzu Deep Dive Dubai'de operasyon ve teknik ekiplerde çeşitli rollerde görev aldı.",
          "Sualtı projelerinde de aktif: Ghost Diving Türkiye koordinatörü olarak hayalet ağ projeleri yürütüyor, Project Baseline'ın Ayvalık ve Marmara çalışmalarına destek veriyor, arkeolojik araştırmalara katılıyor ve mağara haritalama projeleri yapıyor.",
          "2010–2021 yılları arasında D&amp;R gibi şirketlerde yazılım geliştirme uzmanı, Doğuş Teknoloji ve SabancıDx'te yazılım mimarı olarak çalıştı. 2021'den bu yana tam zamanlı dalış eğitmenliği yapıyor; bir yandan da kendi yazılım projelerini geliştiriyor ve bu birikimini Dipnot'un teknoloji altyapısına taşıyor.",
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
    more: "Bio",
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
          "Distributes technical diving brands in Turkey, including Shearwater, Poseidon, Divesoft, Scuba Force, Seacraft and MPS, and brings that wide industry network to Dipnot's sponsorships and partnerships.",
        ],
        links: [
          {
            icon: "globe",
            label: "Diver, diver.com.tr",
            href: "https://www.diver.com.tr/",
          },
          {
            icon: "brands:linkedin",
            label: "Cüneyt Çakın on LinkedIn",
            href: "https://www.linkedin.com/in/c%C3%BCneyt-%C3%A7ak%C4%B1n-7546851a6/",
          },
          {
            icon: "brands:instagram",
            label: "Cüneyt Çakın on Instagram",
            href: "https://www.instagram.com/cuneytcakin/",
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
          "A journalist and editor with 25 years of experience. Worked as a reporter and editor at atv, Habertürk TV, NTV and national magazines, and as atv's Night News Team Chief ran the editorial side of breaking-news broadcasts. Spent years as a court and forensic-medicine reporter.",
          "That experience carried into fiction: the first crime novel, <em>Süleyman'ın Kuyuları</em>, set in Istanbul and reaching back to the era of Suleiman the Magnificent and the architect Sinan, was published by Labirent in 2014 and named book of the year at the İzmir Saint Joseph High School book days that year.",
          "IANTD Sidemount and Recreational Trimix Instructor. Based in Türkiye and seasonally in Dahab, Egypt, combining editorial experience with first-hand knowledge of diving and dive tourism.",
        ],
        links: [
          {
            icon: "brands:linkedin",
            label: "Hesna Onbaşı on LinkedIn",
            href: "https://www.linkedin.com/in/seval-hesna-onbasi-351b9716/",
          },
          {
            icon: "brands:instagram",
            label: "Hesna Onbaşı on Instagram (@scubahelpdesk)",
            href: "https://www.instagram.com/scubahelpdesk/",
          },
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
          "Studied mining engineering at Eskişehir Osmangazi University and is doing an MA in underwater archaeology at Akdeniz University. Lives between Türkiye and Dubai.",
          "Discovered the underwater world in 2008 at the university diving club. Became an instructor in 2011 and has been actively teaching ever since.",
          "Turkey's first GUE (Global Underwater Explorers) instructor and GUE's representative in Turkey, now at Instructor Trainer level, training GUE instructors. Dives closed-circuit rebreathers (CCR), caves and deep mixed-gas dives. Has held various roles in the operations and technical teams at Deep Dive Dubai, the world's deepest pool.",
          "Also active in underwater projects: coordinates Ghost Diving Turkey's ghost-net projects, supports Project Baseline's work in Ayvalık and the Sea of Marmara, takes part in archaeological research and runs cave survey projects.",
          "From 2010 to 2021 worked as a software development specialist at companies such as D&amp;R, and as a software architect at Doğuş Teknoloji and SabancıDx. Has been a full-time dive instructor since 2021, while developing independent software projects and bringing that experience to Dipnot's technology.",
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
