"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * One motion controller for the whole page. Sections stay server-rendered and opt in
 * through data attributes, so the page ships very little per-section JavaScript.
 *
 *   data-reveal="lines"   split heading into masked lines that rise in
 *   data-reveal="fade"    soft rise + fade
 *   data-reveal="mask"    image wipes open through a clip-path
 *   data-reveal="rule"    hairline draws from the left
 *   data-stagger          children fade/rise in sequence
 *   data-count="8924"     number counts up when visible
 *   data-parallax="0.15"  vertical drift relative to scroll
 */
export default function MotionProvider() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("js");

    if (reduce) {
      document.documentElement.classList.add("reduced-motion");
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        el.textContent = Number(el.dataset.count).toLocaleString("en-US");
      });
      return;
    }

    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 3.2) });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // anchor links → smooth scroll with header offset
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: id === "#top" ? 0 : -64 });
      history.replaceState(null, "", id);
    };
    document.addEventListener("click", onClick);

    const splits: SplitText[] = [];
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal='lines']").forEach((el) => {
        const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "line" });
        splits.push(split);
        gsap.from(split.lines, {
          yPercent: 115,
          duration: 1.25,
          ease: "expo.out",
          stagger: 0.09,
          delay: Number(el.dataset.delay || 0),
          scrollTrigger: el.dataset.immediate ? undefined : { trigger: el, start: "top 88%" },
        });
        gsap.set(el, { autoAlpha: 1 });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='fade']").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            delay: Number(el.dataset.delay || 0),
            scrollTrigger: el.dataset.immediate ? undefined : { trigger: el, start: "top 90%" },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
        gsap.fromTo(
          el.children,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: "top 88%" },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='mask']").forEach((el) => {
        const img = el.querySelector("img, video");
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%" } });
        tl.fromTo(el, { clipPath: "inset(18% 12% 18% 12%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" });
        if (img) tl.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 2, ease: "expo.out" }, 0);
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='rule']").forEach((el) => {
        gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 92%" } });
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const obj = { v: 0 };
        el.textContent = "0";
        gsap.to(obj, {
          v: end,
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => (el.textContent = Math.round(obj.v).toLocaleString("en-US")),
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amt = Number(el.dataset.parallax || 0.15);
        gsap.fromTo(
          el,
          { yPercent: -amt * 50 },
          { yPercent: amt * 50, ease: "none", scrollTrigger: { trigger: el.parentElement || el, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
    });

    // fonts change line metrics → refresh once they're ready
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      document.removeEventListener("click", onClick);
      ctx.revert();
      splits.forEach((s) => s.revert());
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
