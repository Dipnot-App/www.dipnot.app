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

  // Specular sheen: each glass surface's light trails the pointer with
  // easing rather than snapping to it (fine pointers only — on touch it
  // stays at its resting position).
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const EASE = 0.12; // share of the remaining distance covered per frame
    let glass = null;
    let target = { x: 0, y: 0 };
    let pos = { x: 0, y: 0 };
    let frame = 0;

    const step = () => {
      pos.x += (target.x - pos.x) * EASE;
      pos.y += (target.y - pos.y) * EASE;
      glass.style.setProperty("--mx", `${pos.x.toFixed(1)}px`);
      glass.style.setProperty("--my", `${pos.y.toFixed(1)}px`);
      const settled =
        Math.abs(target.x - pos.x) < 0.5 && Math.abs(target.y - pos.y) < 0.5;
      frame = settled ? 0 : requestAnimationFrame(step);
    };

    document.addEventListener(
      "pointermove",
      (e) => {
        const el = e.target.closest && e.target.closest(".dn-glass");
        if (!el) return;
        const r = el.getBoundingClientRect();
        target = { x: e.clientX - r.left, y: e.clientY - r.top };
        if (el !== glass) {
          // New surface: start the light where the pointer entered
          glass = el;
          pos = { ...target };
        }
        if (!frame) frame = requestAnimationFrame(step);
      },
      { passive: true },
    );
  }
})();
