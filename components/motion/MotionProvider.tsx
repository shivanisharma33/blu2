"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * One restrained motion controller for the whole site. Pages stay server-rendered and opt in
 * through data attributes:
 *
 *   data-reveal           soft fade-up when the element enters the viewport
 *   data-reveal="image"   gentle image reveal: a slight scale settle plus a fade
 *   data-stagger          direct children fade up in sequence
 *   data-line             a vertical rule that grows with scroll (timeline)
 *
 * Smooth scrolling is created once; reveals are rebuilt on every route change.
 * With prefers-reduced-motion, nothing animates and native scrolling is kept.
 */
const HEADER_OFFSET = -88;

export default function MotionProvider() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const reduce = useRef(false);

  // Smooth scroll + in-page anchors: once per session.
  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce.current) {
      document.documentElement.classList.add("reduced-motion");
      return;
    }
    const lenis = new Lenis({ duration: 1.05, easing: (t) => 1 - Math.pow(1 - t, 3) });
    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a[href*='#']") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname || !url.hash) return;
      const target = url.hash === "#top" ? document.body : document.querySelector(decodeURIComponent(url.hash));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: url.hash === "#top" ? 0 : HEADER_OFFSET });
      history.replaceState(null, "", url.hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Reveals: rebuilt for every page.
  useEffect(() => {
    if (reduce.current) return;
    const lenis = lenisRef.current;

    // New page: start at the top, or at the requested anchor.
    const hash = location.hash;
    const target = hash && hash !== "#top" ? document.querySelector(decodeURIComponent(hash)) : null;
    if (lenis) {
      lenis.scrollTo(target ? (target as HTMLElement) : 0, { immediate: true, offset: target ? HEADER_OFFSET : 0, force: true });
    }

    const ease = "power2.out";
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]:not([data-reveal='image'])").forEach((el) => {
        gsap.fromTo(el, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9, ease, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='image']").forEach((el) => {
        const media = el.querySelector("img, video");
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
        tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1, ease });
        if (media) tl.fromTo(media, { scale: 1.06 }, { scale: 1, duration: 1.6, ease: "power3.out" }, 0);
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
        gsap.fromTo(
          el.children,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease, stagger: 0.07, scrollTrigger: { trigger: el, start: "top 90%", once: true } },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleY: 0 },
          { scaleY: 1, ease: "none", transformOrigin: "top center", scrollTrigger: { trigger: el.parentElement || el, start: "top 70%", end: "bottom 60%", scrub: 0.6 } },
        );
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
