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
          "[Önceki kariyer]den dalışa; 2008'den beri dalıyor, çok disiplinli dalış eğitmeni. Dipnot'un ürününü ve teknolojisini yönetir.",
        bio: [
          "[Doğum yılı], [şehir]. [Üniversite ve bölüm]. [Dalış öncesi kariyer: sektör, kaç yıl, rol].",
          "Sualtı dünyasıyla 2008'de tanıştı. [İlk eğitmenlik yılı ve ajansı]. Sportif dalış (SCUBA), serbest dalış, sidemount, mağara, batık ve teknik dalış alanlarında eğitim veriyor; engelli dalıcılar için özel dalış eğitimleri düzenliyor.",
          "Neptün Sualtı Merkezi'ni kurdu. [GUE Türkiye ve ProTec Türkiye temsilciliği: yıllar, güncel mi?] [Deep Dive Dubai'de dalış amirliği: yıllar].",
          "Dipnot'ta ürün ve teknolojiden sorumlu: mobil uygulamayı, yönetim panelini, web sitesini ve marka sistemini tasarlayıp geliştirdi.",
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
          "From [previous career] to diving; diving since 2008, multidisciplinary dive instructor. Leads Dipnot's product and technology.",
        bio: [
          "[Birth year], [city]. [University and field]. [Career before diving: industry, years, role].",
          "First dived in 2008. [First instructor year and agency]. Teaches recreational scuba, freediving, sidemount, cave, wreck and technical diving, and runs adaptive diving courses for divers with disabilities.",
          "Founded Neptün Sualtı Merkezi. [GUE Turkey and ProTec Turkey representation: years, current?] [Dive supervisor at Deep Dive Dubai: years].",
          "At Dipnot, responsible for product and technology: designed and built the mobile app, the admin panel, the website and the brand system.",
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
