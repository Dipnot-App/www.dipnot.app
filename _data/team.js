// Team page (ekip.html / en/team.html): one template
// (_includes/partials/team.njk). Turkish is primary; keep the two
// blocks in lockstep.
//
// Member: name, initials (avatar until a photo exists), role, summary
// (one or two sentences, always on the card), bio (paragraphs behind
// "Özgeçmişi oku"). Optional: photo (path under /img/team/),
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
          "Türkiye'nin ilk GUE eğitmeni; mağara ve teknik dalış eğitmeni, sualtı görüntü yönetmeni ve yazılım mimarı. Dipnot'un ürününü ve teknolojisini yönetir.",
        bio: [
          "[Doğum yılı], [şehir]. [Üniversite ve bölüm]. [Dalış öncesi kariyer, varsa].",
          "Sualtı dünyasıyla 2008'de üniversitesinin dalış kulübünde tanıştı; üç yıl sonra, 2011'de dalış eğitmeni oldu. Türkiye'nin ilk GUE (Global Underwater Explorers) eğitmeni; bugün GUE Türkiye'nin ülke yöneticisi.",
          "Başta mağara dalışı olmak üzere teknik derin dalış, karışım gazlar, kapalı devre solunum cihazları (CCR) ve serbest dalış alanlarında eğitim veriyor. Dubai'deki Deep Dive Dubai'de [rol] olarak çalışıyor; Halcyon, Shearwater ve SUEX'in marka elçisi.",
          "V.A.C. Studio'da görüntü yönetmeni ve yazılım mimarı. Dipnot'ta ürün ve teknolojiden sorumlu: mobil uygulamayı, yönetim panelini, web sitesini ve marka sistemini tasarlayıp geliştirdi.",
        ],
        links: [
          { icon: "globe", label: "nevcan.com", href: "https://nevcan.com/" },
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
          "Gazeteci, editör ve romancı; IANTD eğitmeni. Dipnot'un yazılarını yazar, çevirir ve yayına hazırlar.",
        bio: [
          "1980'de Balıkesir İvrindi'de doğdu. İstanbul Üniversitesi İletişim Fakültesi'nde eğitim aldı.",
          "Türkiye'nin önde gelen haber dergileri, televizyon kanalları ve radyolarında muhabir ve editör olarak çalıştı; NTV ve Habertürk bunlar arasında. İlk romanı <em>Süleyman'ın Kuyuları</em> 2014'te Labirent Yayınları'ndan çıktı ve aynı yıl İzmir Saint Joseph Lisesi kitap günlerinde yılın kitabı seçildi.",
          "IANTD Sidemount ve Recreational Trimix eğitmeni. Dipnot'ta yazıları yazıyor, çeviriyor ve yayına hazırlıyor.",
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
          "Turkey's first GUE instructor; cave and technical diving instructor, underwater cinematographer and software architect. Leads Dipnot's product and technology.",
        bio: [
          "[Birth year], [city]. [University and field]. [Career before diving, if any].",
          "First breathed underwater in 2008 with the university diving club and became a dive instructor three years later, in 2011. Turkey's first GUE (Global Underwater Explorers) instructor and today GUE Turkey's country manager.",
          "Teaches cave diving above all, plus technical deep diving, mixed gases, closed-circuit rebreathers (CCR) and freediving. Works at Deep Dive Dubai as [role]; brand ambassador for Halcyon, Shearwater and SUEX.",
          "Cinematographer and software architect at V.A.C. Studio. At Dipnot, responsible for product and technology: designed and built the mobile app, the admin panel, the website and the brand system.",
        ],
        links: [
          { icon: "globe", label: "nevcan.com", href: "https://nevcan.com/" },
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
          "Journalist, editor and novelist; IANTD instructor. Writes, translates and edits Dipnot's articles.",
        bio: [
          "Born in 1980 in İvrindi, Balıkesir. Studied at Istanbul University's Faculty of Communication.",
          "Worked as a reporter and editor for leading Turkish news magazines, TV channels and radio stations, including NTV and Habertürk. First novel, <em>Süleyman'ın Kuyuları</em>, was published by Labirent in 2014 and named book of the year at the İzmir Saint Joseph High School book days that year.",
          "IANTD Sidemount and Recreational Trimix Instructor. At Dipnot: writes, translates and edits the articles.",
        ],
      },
    ],
  },
};
