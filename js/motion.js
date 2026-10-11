// Home-page motion — GSAP + ScrollTrigger + SplitText (cdnjs, SRI-pinned
// in _data/site.json). IIFE for the same reason as contact.js.
//
// Contract with the CSS: base.njk adds html.dn-motion before first paint
// when motion is allowed, which hides [data-reveal] and the hero's
// [data-hero] parts. Everything here animates those to opacity 1. If this
// file or GSAP never loads, the head script's timeout removes the class
// and the page simply shows, static.
(() => {
  const root = document.documentElement;
  const { gsap, ScrollTrigger, SplitText } = window;

  if (!gsap || !ScrollTrigger || !SplitText) {
    root.classList.remove("dn-motion");
    return;
  }
  window.__dnMotionReady = true;
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const EASE = "power3.out";
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => gsap.utils.toArray(sel, ctx);
  const rest = (phone) => phone.dataset.rot.split(",").map(Number);

  // Accordion height animation — progressive enhancement over native
  // <details>, independent of the reduced-motion split below because a
  // collapse is a state change, not decoration. Duration drops to 0 when
  // the user asks for less motion.
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  $$(".dn-qa").forEach((details) => {
    const summary = $("summary", details);
    const body = $(".dn-qa__body", details);
    summary.addEventListener("click", (e) => {
      e.preventDefault();
      const d = reduced.matches ? 0 : 1;
      if (details.open) {
        gsap.to(body, {
          height: 0,
          duration: 0.35 * d,
          ease: "power2.inOut",
          onComplete: () => {
            details.open = false;
            gsap.set(body, { clearProps: "height" });
          },
        });
      } else {
        details.open = true;
        gsap.fromTo(
          body,
          { height: 0 },
          {
            height: "auto",
            duration: 0.5 * d,
            ease: EASE,
            clearProps: "height",
          },
        );
      }
    });
  });

  const mm = gsap.matchMedia();

  // The user switched reduced motion on mid-visit: drop the hidden states.
  mm.add("(prefers-reduced-motion: reduce)", () => {
    root.classList.remove("dn-motion");
  });

  mm.add(
    {
      full: "(prefers-reduced-motion: no-preference) and (min-width: 1024px)",
      lite: "(prefers-reduced-motion: no-preference) and (max-width: 1023px)",
    },
    (ctx) => {
      const { full } = ctx.conditions;
      root.classList.add("dn-motion");

      /* ---------------------------------------------------------------
         Depth — the ocean darkens as the page descends
         --------------------------------------------------------------- */
      const depth = {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
      };
      gsap.fromTo(
        ".dn-ocean__deep",
        { opacity: 0 },
        { opacity: 1, ease: "none", scrollTrigger: depth },
      );
      gsap.fromTo(
        ".dn-ocean__rays",
        { opacity: 0.75 },
        { opacity: 0.1, ease: "power1.in", scrollTrigger: depth },
      );

      /* ---------------------------------------------------------------
         Hero intro
         --------------------------------------------------------------- */
      // The entrance itself (text, visual, phone turn, back phone,
      // chips) is CSS (`html.dn-intro`, see styles.css) so it starts on
      // first paint instead of waiting for GSAP; it uses translate/scale/
      // opacity, which never collide with the transforms animated here.
      // Scroll animates the phones' wrappers, not the phones.
      const hero = $(".dn-hero");
      const chips = $$("[data-chip]", hero);
      const heroFront = $("[data-hero-front]", hero);
      const heroBackScroll = $("[data-hero-back-scroll]", hero);
      const heroTilt = $("[data-iphone-tilt]", hero);

      // GSAP reads the current computed scale when it first touches an
      // element; mid CSS pop that is 0.6, and it would bake that into its
      // own transform for good. Pin it to 1 — the CSS `scale` animation
      // still plays on its own property.
      gsap.set(chips, { scale: 1 });

      // Chips bob like they're floating (yPercent, so it composes with
      // the scroll parallax on y)
      chips.forEach((chip, i) => {
        gsap.to(chip, {
          yPercent: -10,
          rotation: i % 2 ? 1 : -1,
          duration: 2.6 + i * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 2.2 + i * 0.2,
        });
      });

      // Scroll-out parallax: phones and chips drift at different speeds,
      // the copy rises and fades as the hero leaves.
      $$("[data-parallax]", hero).forEach((el) => {
        gsap.to(el, {
          y: () => parseFloat(el.dataset.parallax) * (full ? 4 : 2),
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
      gsap.to(heroFront, {
        rotationY: 18,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(heroBackScroll, {
        x: -50,
        y: 30,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Pointer: the phone leans toward the cursor (desktop)
      if (full && heroTilt) {
        gsap.set(heroTilt, { transformPerspective: 2000 });
        const tx = gsap.quickTo(heroTilt, "rotationX", {
          duration: 1.2,
          ease: EASE,
        });
        const ty = gsap.quickTo(heroTilt, "rotationY", {
          duration: 1.2,
          ease: EASE,
        });
        const onMove = (e) => {
          tx((e.clientY / window.innerHeight - 0.5) * -8);
          ty((e.clientX / window.innerWidth - 0.5) * 12);
        };
        hero.addEventListener("pointermove", onMove);
        ctx.add(() => () => hero.removeEventListener("pointermove", onMove));
      }

      if (full) {
        gsap.to($(".dn-hero__copy", hero), {
          y: 90,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      /* ---------------------------------------------------------------
         Generic reveals + split headings
         --------------------------------------------------------------- */
      const seen = new WeakSet();
      const reveal = (batch) => {
        const fresh = batch.filter((el) => !seen.has(el));
        fresh.forEach((el) => seen.add(el));
        if (!fresh.length) return;
        gsap.fromTo(
          fresh,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: EASE,
            stagger: 0.09,
            overwrite: true,
          },
        );
      };
      ScrollTrigger.batch("main [data-reveal]", {
        start: "top 90%",
        onEnter: reveal,
        onEnterBack: reveal,
        onLeave: reveal,
      });

      $$("main [data-split]").forEach((heading) => {
        SplitText.create(heading, {
          type: "lines",
          mask: "lines",
          linesClass: "dnline",
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.lines,
              { yPercent: 110 },
              {
                yPercent: 0,
                duration: 1.1,
                ease: "expo.out",
                stagger: 0.1,
                scrollTrigger: { trigger: heading, start: "top 88%" },
              },
            ),
        });
      });

      /* ---------------------------------------------------------------
         About — the phone rises out of the depth; its feed scrolls
         --------------------------------------------------------------- */
      // Opacity goes on the stage, never the phone: opacity < 1 forces a
      // preserve-3d element flat, so fading the phone itself collapsed its
      // edge until it hit 1 and snapped back into 3D (the scroll "jump").
      const aboutStage = $("[data-about-stage]");
      const aboutPhone = aboutStage && $("[data-iphone]", aboutStage);
      if (aboutPhone) {
        const [rx, ry, rz] = rest(aboutPhone);
        const trigger = {
          trigger: "#about",
          start: "top 95%",
          end: "bottom 35%",
          scrub: 1,
        };
        gsap.fromTo(
          aboutStage,
          { opacity: 0 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: { ...trigger, end: "top 45%" },
          },
        );
        gsap
          .timeline({ scrollTrigger: trigger })
          .fromTo(
            aboutPhone,
            {
              y: 160,
              rotationX: rx + 30,
              rotationY: ry + 45,
              rotationZ: rz - 6,
            },
            {
              y: 0,
              rotationX: rx,
              rotationY: ry,
              rotationZ: rz,
              ease: "power2.out",
              duration: 1,
            },
          )
          .to(aboutPhone, {
            rotationY: ry - 14,
            y: -30,
            ease: "none",
            duration: 0.8,
          });
      }

      /* ---------------------------------------------------------------
         Features — tiles tilt toward the pointer (desktop)
         --------------------------------------------------------------- */
      if (full) {
        $$("[data-tile]").forEach((tile) => {
          gsap.set(tile, { transformPerspective: 1000 });
          const rx = gsap.quickTo(tile, "rotationX", {
            duration: 0.6,
            ease: EASE,
          });
          const ry = gsap.quickTo(tile, "rotationY", {
            duration: 0.6,
            ease: EASE,
          });
          const onMove = (e) => {
            const r = tile.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            rx(py * -6);
            ry(px * 6);
          };
          const onLeave = () => {
            rx(0);
            ry(0);
          };
          tile.addEventListener("pointermove", onMove);
          tile.addEventListener("pointerleave", onLeave);
          ctx.add(() => () => {
            tile.removeEventListener("pointermove", onMove);
            tile.removeEventListener("pointerleave", onLeave);
          });
        });
      }

      /* ---------------------------------------------------------------
         How it works — pinned on desktop, the path draws through the
         three steps; on mobile the vertical rail fills as you pass
         --------------------------------------------------------------- */
      const how = $("[data-how]");
      const fill = $("[data-steps-fill]");
      const steps = $$("[data-step]");
      if (how && fill && steps.length) {
        const howPhone = $("[data-iphone]", how);
        const screens = howPhone ? $$("[data-screen]", howPhone) : [];
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: full
            ? {
                trigger: how,
                start: "center center",
                end: "+=150%",
                pin: true,
                anticipatePin: 1,
                scrub: 1,
              }
            : {
                trigger: "[data-steps]",
                start: "top 75%",
                end: "bottom 55%",
                scrub: 1,
              },
        });
        tl.fromTo(
          fill,
          { scaleY: 0 },
          { scaleY: 1, ease: "none", duration: steps.length },
          0,
        );
        steps.forEach((step, i) => {
          const at = i === 0 ? 0 : i - 0.15;
          tl.fromTo(
            step,
            full ? { opacity: 0.25, x: 24 } : { opacity: 0.25, y: 24 },
            { opacity: 1, x: 0, y: 0, duration: 0.6 },
            at,
          ).fromTo(
            $(".dn-step__orb", step),
            { scale: 0.6 },
            { scale: 1, duration: 0.6, ease: "back.out(2)" },
            at,
          );
          // The phone shows this step's screen, turning slightly each time
          if (i > 0 && screens[i]) {
            tl.fromTo(
              screens[i],
              { opacity: 0, scale: 1.04 },
              { opacity: 1, scale: 1, duration: 0.5 },
              at,
            );
          }
          if (howPhone) {
            const [rx, ry, rz] = rest(howPhone);
            tl.to(
              howPhone,
              {
                rotationX: rx,
                rotationY: ry - i * 10,
                rotationZ: rz,
                duration: 0.8,
              },
              at,
            );
          }
        });
      }

      /* ---------------------------------------------------------------
         Download CTA — the panel surfaces from the deep
         --------------------------------------------------------------- */
      const cta = $("[data-cta]");
      if (cta) {
        gsap.fromTo(
          cta,
          { y: 80, scale: 0.94 },
          {
            y: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: cta,
              start: "top bottom",
              end: "top 45%",
              scrub: 1,
            },
          },
        );
        gsap.to($(".dn-cta__rays", cta), {
          rotation: 6,
          transformOrigin: "50% 0%",
          duration: 9,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    },
  );

  // Fonts and lazy images change layout; re-measure triggers once settled.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
  window.addEventListener("load", () => ScrollTrigger.refresh());
})();
