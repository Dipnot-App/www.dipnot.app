// Team page (ekip.html / en/team.html): one template
// (_includes/partials/team.njk). Turkish is primary; keep the two
// blocks in lockstep.
//
// Member: name, initials (avatar until a photo exists), role, bio.
// Optional: photo (path under /img/team/), links [{ icon, label, href }].

module.exports = {
  tr: {
    title: "Ekibimizle tanış",
    lead: "Dipnot'u, dalış dünyasının içinden gelen küçük bir ekip hazırlıyor.",
    members: [
      {
        name: "Hesna Onbaşı",
        initials: "HO",
        role: "Kurucu Ortak · Yayın Yönetmeni",
        bio: "Gazeteci ve editör. NTV ve Habertürk'ün de aralarında olduğu haber kanalları, dergiler ve radyolarda muhabir ve editör olarak çalıştı; ilk romanı <em>Süleyman'ın Kuyuları</em> 2014'te yayımlandı. IANTD Sidemount ve Recreational Trimix eğitmeni. Dipnot'ta yazıları yazıyor, çeviriyor ve yayına hazırlıyor.",
      },
    ],
  },

  en: {
    title: "Meet the team",
    lead: "Dipnot is made by a small team from the diving world.",
    members: [
      {
        name: "Hesna Onbaşı",
        initials: "HO",
        role: "Co-founder · Editor-in-Chief",
        bio: "Journalist and editor. Has worked as a reporter and editor for Turkish news channels, magazines and radio stations, including NTV and Habertürk; first novel, <em>Süleyman'ın Kuyuları</em>, published in 2014. IANTD Sidemount and Recreational Trimix Instructor. At Dipnot: writes, translates and edits the articles.",
      },
    ],
  },
};
