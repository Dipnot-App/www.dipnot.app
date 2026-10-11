// IIFE — see contact.js for why plain scripts keep their names local.
// Runs on every page. Animation lives in motion.js (home page only);
// this file is the behavior that must work everywhere, with or without it.
(() => {
  const root = document.documentElement;

  // Mobile menu sheet
  const burger = document.querySelector(".dn-burger[data-target]");
  const sheet = burger && document.getElementById(burger.dataset.target);

  if (burger && sheet) {
    const setOpen = (open) => {
      burger.classList.toggle("is-active", open);
      sheet.classList.toggle("is-active", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
    };

    burger.addEventListener("click", () => {
      setOpen(!sheet.classList.contains("is-active"));
    });
    sheet.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && sheet.classList.contains("is-active")) {
        setOpen(false);
        burger.focus();
      }
    });
  }

  // Theme toggle. The head script in base.njk already applied the stored
  // or system theme before paint; this only flips it. Transitions are
  // suspended for one frame so colors swap instantly (motion.md).
  const toggle = document.getElementById("theme-toggle");

  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      root.classList.add("dn-no-transition");
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        // Private mode: the choice just isn't remembered.
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => root.classList.remove("dn-no-transition"));
      });
    });
  }

  // Nav: the glass thickens once the page leaves the top. A single
  // class flip at a threshold — the bar itself never moves, so it can't
  // jitter against the scroll.
  const nav = document.querySelector("[data-nav]");

  if (nav) {
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText =
      "position:absolute;top:0;left:0;width:1px;height:24px;pointer-events:none";
    document.body.prepend(sentinel);
    new IntersectionObserver(([entry]) => {
      nav.classList.toggle("is-scrolled", !entry.isIntersecting);
    }).observe(sentinel);
  }

  // Specular sheen: each glass surface tracks the pointer (fine pointers
  // only — on touch the sheen stays at its resting position).
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    let frame = 0;
    let event = null;

    const paint = () => {
      frame = 0;
      const glass = event.target.closest && event.target.closest(".dn-glass");
      if (!glass) return;
      const r = glass.getBoundingClientRect();
      glass.style.setProperty("--mx", `${event.clientX - r.left}px`);
      glass.style.setProperty("--my", `${event.clientY - r.top}px`);
    };

    document.addEventListener(
      "pointermove",
      (e) => {
        event = e;
        if (!frame) frame = requestAnimationFrame(paint);
      },
      { passive: true },
    );
  }
})();
