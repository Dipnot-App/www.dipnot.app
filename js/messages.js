// UI messages for the page's language (html[lang]), shared by main.js,
// newsletter.js, contact.js and the account-deletion modules via
// window.dnI18n. Loaded before them in base.njk. Turkish is primary;
// the TR strings here are the ones the scripts showed before i18n.
//
// The Cloud Functions answer in Turkish. On English pages, server()
// maps every known response to English (current "siz" wording and the
// "sen" wording requested from functions on 2026-10-11); anything
// unknown falls back to a generic English line.
(() => {
  const lang = document.documentElement.lang === "en" ? "en" : "tr";

  const UI = {
    tr: {
      menuOpen: "Menüyü aç",
      menuClose: "Menüyü kapat",
      offline: "Şu an bağlantı kurulamadı. Lütfen biraz sonra tekrar dene.",
      offlineFormal:
        "Şu an bağlantı kurulamadı. Lütfen biraz sonra tekrar deneyin.",
      emailEmpty: "Lütfen e-posta adresini yaz.",
      emailInvalid: "Geçerli bir e-posta adresi yaz (ör. ad@ornek.com).",
      nameEmpty: "Lütfen adını ve soyadını yaz.",
      messageEmpty: "Lütfen mesajını yaz.",
      messageShort: "Mesajın en az 10 karakter olmalı.",
      termsRequired:
        "Göndermek için kullanım koşullarını ve gizlilik politikasını kabul etmelisin.",
      sent: "Mesajın iletildi.",
      deletionSent:
        "Onay e-postası gönderildi. Hesabınızın silinmesi için e-postadaki bağlantıya tıklayın.",
      genericError: "Bir hata oluştu. Lütfen tekrar dene.",
    },
    en: {
      menuOpen: "Open menu",
      menuClose: "Close menu",
      offline: "We couldn't connect just now. Please try again in a moment.",
      offlineFormal:
        "We couldn't connect just now. Please try again in a moment.",
      emailEmpty: "Please enter your email address.",
      emailInvalid: "Enter a valid email address (e.g. name@example.com).",
      nameEmpty: "Please enter your full name.",
      messageEmpty: "Please write your message.",
      messageShort: "Your message needs at least 10 characters.",
      termsRequired:
        "Please accept the terms of use and the privacy policy to send.",
      sent: "Your message was sent.",
      deletionSent:
        "If an account exists for this email, we've sent a link to confirm the deletion. Please check your inbox.",
      genericError: "Something went wrong. Please try again.",
    },
  };

  // Turkish server text (whitespace-normalised, no trailing period) → English
  const SERVER_EN = {
    "Başarıyla abone oldunuz": "You're subscribed. Thank you!",
    "Bültene abone oldun, teşekkürler!": "You're subscribed. Thank you!",
    "Bu e-posta adresi zaten kayıtlı":
      "This email address is already subscribed.",
    "Bu e-posta adresi zaten bültene kayıtlı":
      "This email address is already subscribed.",
    "Geçersiz e-posta adresi": "That email address isn't valid.",
    "Geçersiz isim": "Please enter your full name.",
    "Lütfen adını ve soyadını yaz": "Please enter your full name.",
    "Geçersiz konu": "Please choose a subject.",
    "Mesaj en az 10, en fazla 2000 karakter olmalıdır":
      "Your message must be between 10 and 2000 characters.",
    "Mesajın 10 ile 2000 karakter arasında olmalı":
      "Your message must be between 10 and 2000 characters.",
    "Mesajınız başarıyla gönderildi":
      "Message sent. Thank you, we'll get back to you soon.",
    "Mesajınız alındı": "Message sent. Thank you, we'll get back to you soon.",
    "Mesajın iletildi, teşekkürler! En kısa sürede dönüş yapacağız":
      "Message sent. Thank you, we'll get back to you soon.",
    "Çok fazla istek gönderildi, lütfen daha sonra tekrar deneyin":
      "Too many attempts. Please try again later.",
    "Çok fazla deneme yapıldı. Lütfen biraz sonra tekrar dene":
      "Too many attempts. Please try again later.",
    "Eğer bu e-posta adresine ait bir hesap varsa, hesap silme işlemini onaylamanız için bir bağlantı gönderdik. Lütfen e-postanızı kontrol edin":
      "If an account exists for this email, we've sent a link to confirm the deletion. Please check your inbox.",
    "Doğrulama başarısız":
      "Verification failed. Please reload the page and try again.",
  };

  const norm = (s) =>
    String(s || "")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/[.!]+$/, (m) => (m === "!" ? "!" : ""));

  window.dnI18n = {
    lang,
    t: (key) => UI[lang][key],
    // Text from a Cloud Function → text to show. `ok` picks the generic
    // English fallback (success vs error) for responses not in the table.
    server: (text, ok) => {
      if (lang === "tr") return text;
      const hit =
        SERVER_EN[norm(text)] || SERVER_EN[norm(text).replace(/!$/, "")];
      if (hit) return hit;
      return ok ? UI.en.sent : UI.en.genericError;
    },
  };
})();
