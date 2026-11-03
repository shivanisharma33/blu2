"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Button } from "../ui/primitives";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      video.current?.pause();
      el.classList.add("is-ready");
      return;
    }

    let split: SplitText | undefined;
    const ctx = gsap.context(() => {
      split = SplitText.create(".hero__title", { type: "lines", mask: "lines", linesClass: "line" });
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, onStart: () => el.classList.add("is-ready") });
      tl.fromTo(".hero__media", { scale: 1.18, autoAlpha: 0 }, { scale: 1.04, autoAlpha: 1, duration: 2.8, ease: "power2.out" })
        .from(".hero__frame-line--base", { scaleX: 0, duration: 1.6, ease: "expo.inOut" }, 0.2)
        .from(".hero__eyebrow", { y: 16, autoAlpha: 0, duration: 1 }, 0.5)
        .from(split.lines, { yPercent: 118, duration: 1.5, stagger: 0.12 }, 0.7)
        .from(".hero__lede", { y: 20, autoAlpha: 0, duration: 1.1 }, 1.1)
        .from(".hero__actions .btn", { y: 20, autoAlpha: 0, duration: 1, stagger: 0.1 }, 1.25)
        .from(".hero__rail", { x: 24, autoAlpha: 0, duration: 1.1 }, 1.4)
        .from(".hero__base > *", { y: 12, autoAlpha: 0, duration: 1, stagger: 0.06 }, 1.6);

      // coordinate digits tick up like an instrument readout
      el.querySelectorAll<HTMLElement>("[data-coord]").forEach((c) => {
        const end = Number(c.dataset.coord);
        const o = { v: 0 };
        tl.to(o, { v: end, duration: 2, ease: "power3.out", onUpdate: () => (c.textContent = String(Math.round(o.v)).padStart(2, "0")) }, 1.6);
      });

      // scroll: media drifts slower than content, content lifts and fades
      gsap.to(".hero__media", { yPercent: 14, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      gsap.fromTo(".hero__content", { yPercent: 0, autoAlpha: 1 }, { yPercent: -10, autoAlpha: 0.15, ease: "none", immediateRender: false, scrollTrigger: { trigger: el, start: "30% top", end: "bottom top", scrub: true } });
    }, el);

    // pause video when out of view (battery + CPU)
    const io = new IntersectionObserver(([e]) => {
      if (!video.current) return;
      if (e.isIntersecting) video.current.play().catch(() => {});
      else video.current.pause();
    });
    io.observe(el);

    return () => {
      io.disconnect();
      ctx.revert();
      split?.revert();
    };
  }, []);

  return (
    <section id="top" ref={root} className="hero" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden>
        <video ref={video} autoPlay muted loop playsInline preload="metadata" poster="/video/survey-vessel-poster.jpg">
          <source src="/video/survey-vessel-720.mp4" type="video/mp4" media="(max-width: 900px)" />
          <source src="/video/survey-vessel-1080.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero__scrim" aria-hidden />
      <div className="hero__ambient" aria-hidden />
      <div className="hero__grain" aria-hidden />

      <div className="hero__frame" aria-hidden>
        <span className="hero__frame-line hero__frame-line--base" />
      </div>

      <div className="hero__content container">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-pill">
            <span className="hero__eyebrow-dot" aria-hidden />
            <span>Offshore Exploration</span>
          </span>
          <span className="hero__eyebrow-sep" aria-hidden />
          <span className="hero__eyebrow-loc">West Africa Margin</span>
        </div>

        <h1 id="hero-title" className="hero__title">
          Unlocking the <br />
          <em>Next Frontier</em> <br />
          in Deepwater Energy.
        </h1>

        <div className="hero__lead-group">
          <p className="hero__lede">
            BluEnergies is advancing high-potential offshore exploration opportunities through technical expertise,
            strategic partnerships and a disciplined approach to resource development.
          </p>
          <div className="hero__actions">
            <Button href="#assets" tone="dark" className="hero__btn hero__btn--primary">Explore Our Assets</Button>
            <Button href="#investors" variant="ghost" tone="dark" className="hero__btn hero__btn--secondary">Investor Relations</Button>
          </div>
        </div>
      </div>

      <aside className="hero__rail" aria-label="Licence summary">
        <div className="hero__rail-header">
          <span className="hero__rail-dot" aria-hidden />
          <span className="mono-label">Active Exploration</span>
        </div>
        <div className="hero__rail-item">
          <span className="mono-label">Reference</span>
          <span className="hero__coord">
            <span data-coord="4">04</span>°22′ N &nbsp;<span data-coord="7">07</span>°43′ W
          </span>
          <span className="hero__rail-note">Harper, Liberia</span>
        </div>
        <div className="hero__rail-item">
          <span className="mono-label">Licence</span>
          <span className="hero__rail-value">RL-003</span>
          <span className="hero__rail-note">LB-26 · LB-30 · LB-31</span>
        </div>
        <div className="hero__rail-item">
          <span className="mono-label">Survey depths</span>
          <span className="hero__rail-value">500–3,500 m</span>
          <span className="hero__rail-note">Seabed survey water depths</span>
        </div>
      </aside>

      <div className="hero__base container">
        <a href="#about" className="hero__scroll">
          <span className="hero__scroll-line" aria-hidden />
          <span>Scroll to explore</span>
        </a>
        <p className="hero__base-item"><span className="mono-label">Harper basin</span> Offshore Liberia</p>
        <p className="hero__base-item"><span className="mono-label">Partner</span> TotalEnergies · 65%</p>
        <p className="hero__base-item hero__base-item--ticker"><span className="mono-label">Listed</span> TSXV: BLU</p>
      </div>
    </section>
  );
}
