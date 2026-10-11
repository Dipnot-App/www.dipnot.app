// Analytics consent (KVKK). GA4 is never loaded before the visitor
// accepts; "Reddet" is as prominent as "Kabul et". The choice is kept in
// localStorage and can be changed from the footer ("Çerez tercihleri").
// IIFE for the same reason as contact.js.
(() => {
  const KEY = "consent.analytics";
  const banner = document.getElementById("consent");
  const id = document.currentScript && document.currentScript.dataset.ga4;
  if (!banner || !id) return;

  const read = () => {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  };
  const write = (value) => {
    try {
      localStorage.setItem(KEY, value);
    } catch (e) {
      // Private mode: the choice holds for this page view only.
    }
  };

  let loaded = false;
  const loadGa = () => {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", id, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(s);
  };

  // Withdrawing consent: stop collection now and remove GA's cookies.
  const revoke = () => {
    window[`ga-disable-${id}`] = true;
    const host = location.hostname.replace(/^www\./, "");
    document.cookie.split(";").forEach((c) => {
      const name = c.split("=")[0].trim();
      if (!/^_ga/.test(name)) return;
      for (const domain of ["", `; domain=.${host}`]) {
        document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
      }
    });
  };

  // Focus moves into the banner only when the visitor reopens it; on a
  // first visit it must not steal focus from the page.
  const show = (focus) => {
    banner.hidden = false;
    if (focus) {
      banner
        .querySelector('[data-consent="denied"]')
        .focus({ preventScroll: true });
    }
  };
  const hide = () => {
    banner.hidden = true;
  };

  banner.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-consent]");
    if (!btn) return;
    const choice = btn.dataset.consent;
    write(choice);
    hide();
    if (choice === "granted") {
      window[`ga-disable-${id}`] = false;
      loadGa();
    } else {
      revoke();
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-consent-open]")) show(true);
  });

  const choice = read();
  if (choice === "granted") loadGa();
  else if (choice !== "denied") show(false);
})();
