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

  // In-page anchors: land the section's heading just under the floating
  // nav. Native anchoring aligns the section box, and its top padding
  // left the heading 170–260px down the screen.
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const GAP = 32;
  const targetOf = (section) =>
    section.querySelector(".dn-kicker, .dn-cta__panel, h2") || section;

  // Document position from layout, ignoring transforms: reveal
  // animations hold headings 36px low until they play, and measuring
  // that in-between state overshot the scroll by exactly that much.
  const layoutTop = (el) => {
    let y = 0;
    for (let node = el; node; node = node.offsetParent) y += node.offsetTop;
    return y;
  };

  const scrollToSection = (id, smooth) => {
    const section = id && document.getElementById(id);
    if (!section || !section.matches(".dn-section, .dn-cta")) return false;
    const bar = document.querySelector(".dn-nav__bar");
    const navBottom = bar ? bar.getBoundingClientRect().bottom : 0;
    const top = layoutTop(targetOf(section)) - navBottom - GAP;
    window.scrollTo({
      top,
      behavior: smooth && !reduceMotion.matches ? "smooth" : "instant",
    });
    return true;
  };

  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href*="#"]');
    if (!link || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const url = new URL(link.href);
    if (url.pathname !== window.location.pathname) return;
    const id = decodeURIComponent(url.hash.slice(1));
    if (scrollToSection(id, true)) {
      e.preventDefault();
      history.pushState(null, "", `#${id}`);
    }
  });

  // Arriving from another page with a hash (e.g. /#faq from a legal page):
  // correct the browser's jump once layout has settled. ScrollTrigger
  // re-measures after load (pin spacing shifts everything below it), so
  // re-run after each refresh in the first few seconds, debounced.
  if (window.location.hash) {
    const id = decodeURIComponent(window.location.hash.slice(1));
    let timer = 0;
    const settle = () => {
      clearTimeout(timer);
      timer = setTimeout(() => scrollToSection(id, false), 150);
    };
    window.addEventListener("load", () => {
      settle();
      const st = window.ScrollTrigger;
      if (st) {
        st.addEventListener("refresh", settle);
        setTimeout(() => st.removeEventListener("refresh", settle), 3000);
      }
    });
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
