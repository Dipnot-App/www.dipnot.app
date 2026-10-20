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
          "Dipnot'un gelir modelinden sorumlu; sponsorluk anlaşmalarını, uygulama içi reklam alanlarını ve dalış merkezleriyle iş birliklerini yürütüyor.",
        bio: [
          "CCR eğitmen eğitmeni. Kapalı devre solunum cihazlarıyla derin dalış eğitimleri veriyor ve yeni eğitmenler yetiştiriyor.",
          "Shearwater, Poseidon, Divesoft, Scuba Force, Seacraft ve MPS gibi teknik dalış markalarının Türkiye distribütörlüğünü yürütüyor. Sektördeki bu ağı Dipnot'un sponsorluk ve iş birliklerinde kullanıyor.",
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
          "Dipnot'un yayın çizgisini belirliyor ve yayın akışını yönetiyor; konu seçiminden yazım, çeviri ve editörlüğe kadar içerik sürecinden sorumlu.",
        bio: [
          "İstanbul Üniversitesi İletişim Fakültesi'nde eğitim aldı. Türkiye ile Mısır'ın Dahab kenti arasında yaşıyor.",
          "IANTD Sidemount ve Recreational Trimix eğitmeni. Scuba Helpdesk markasıyla Mısır'da bireysel ve grup dalış organizasyonları düzenliyor.",
          "25 yıl boyunca atv, Habertürk TV, NTV ve ulusal dergilerde muhabir ve editör olarak çalıştı. Gece Haberleri Ekip Şefi olarak atv'de son dakika yayınlarının editoryal operasyonunu yönetti. Uzun yıllar adliye ve adli tıp muhabirliği yaptı; 2014'te Labirent Yayınları'ndan çıkan <em>Süleyman'ın Kuyuları</em> adlı bir polisiye romanı var. Bu deneyimini Dipnot'un yayın çizgisinde ve editoryal süreçlerinde kullanıyor.",
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
          "Sualtıyla 2008'de, üniversitesinin dalış kulübünde tanıştı. 2011'de eğitmen oldu; 2021'den bu yana tam zamanlı dalış eğitmenliği yapıyor.",
          "Türkiye'nin ilk GUE eğitmeni, GUE Türkiye'nin kurucusu ve ülke yöneticisi; bugün eğitmen yetiştiren Instructor Trainer seviyesinde eğitim veriyor. Üç yıl boyunca dünyanın en derin havuzu Deep Dive Dubai'de operasyon ve teknik ekiplerde çeşitli rollerde görev aldı. Kapalı devre solunum cihazları (CCR), mağara dalışları ve karışım gazlarla derin dalışlar konusunda deneyimli.",
          "Ghost Diving Türkiye'nin koordinatörü olarak denizlerdeki hayalet ağların temizlenmesine yönelik projeler yürütüyor. Project Baseline'ın Ayvalık ve Marmara çalışmalarına destek veriyor, sualtı arkeolojisi araştırmalarına katılıyor ve mağara haritalama projelerinde yer alıyor.",
          "2010–2021 yılları arasında D&amp;R gibi şirketlerde yazılım geliştirme uzmanı, Doğuş Teknoloji ve SabancıDx'te yazılım mimarı olarak çalıştı. Bugün kendi yazılım projelerini geliştiriyor; bu birikimini Dipnot'un teknoloji altyapısında kullanıyor.",
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
          "Arkeoloji bölümünü bitirdi, yüksek lisansını da arkeoloji üzerine yapıyor. Bir yandan da Kültürel Miras ve Turizm alanında eğitimine devam ediyor.",
          "TSSF/CMAS iki yıldızlı dalıcı. Çalışmalarını sualtı arkeolojisi üzerine yoğunlaştırıyor. Bu birikimini Dipnot'un arkeoloji yazılarında kullanıyor.",
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
          "Responsible for Dipnot's revenue model; runs sponsorship deals, in-app ad placements and partnerships with dive centres.",
        bio: [
          "CCR Instructor Trainer. Teaches deep diving on closed-circuit rebreathers and trains new instructors.",
          "Distributes technical diving brands in Turkey, including Shearwater, Poseidon, Divesoft, Scuba Force, Seacraft and MPS, and uses that industry network for Dipnot's sponsorships and partnerships.",
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
          "Sets Dipnot's editorial line and manages the publishing schedule; responsible for the content process from choosing topics to writing, translating and editing.",
        bio: [
          "Studied at Istanbul University's Faculty of Communication. Lives between Türkiye and Dahab, Egypt.",
          "IANTD Sidemount and Recreational Trimix Instructor. Organises individual and group diving trips in Egypt under the Scuba Helpdesk brand.",
          "Spent 25 years as a reporter and editor at atv, Habertürk TV, NTV and national magazines. As atv's Night News Team Chief, ran the editorial side of breaking-news broadcasts. Was a court and forensic-medicine reporter for many years, and published a crime novel, <em>Süleyman'ın Kuyuları</em>, with Labirent in 2014. Brings that experience to Dipnot's editorial line and processes.",
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
          "Discovered the underwater world in 2008 at the university diving club. Became an instructor in 2011 and has been a full-time dive instructor since 2021.",
          "Turkey's first GUE instructor and the founder and country manager of GUE Turkey, now teaching at Instructor Trainer level, training new instructors. Spent three years in various roles in the operations and technical teams at Deep Dive Dubai, the world's deepest pool. Experienced in closed-circuit rebreathers (CCR), cave diving and deep mixed-gas diving.",
          "As coordinator of Ghost Diving Turkey, runs projects to remove ghost nets from the sea. Supports Project Baseline's work in Ayvalık and the Sea of Marmara, takes part in underwater archaeology research and works on cave survey projects.",
          "From 2010 to 2021 worked as a software development specialist at companies such as D&amp;R, and as a software architect at Doğuş Teknoloji and SabancıDx. Now develops independent software projects and uses that experience in Dipnot's technology.",
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
          "Graduated in archaeology and is doing a master's in the same field, while also studying Cultural Heritage and Tourism.",
          "TSSF/CMAS two-star diver. Focuses on underwater archaeology. Uses that background in Dipnot's archaeology articles.",
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
