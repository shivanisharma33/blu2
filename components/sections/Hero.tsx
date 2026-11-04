"use client";

import { useEffect, useRef } from "react";
import { Button } from "../ui/primitives";

export default function Hero() {
  const video = useRef<HTMLVideoElement>(null);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const v = video.current;
    const el = root.current;
    if (!v || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    // Pause the background video when the hero is off-screen.
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="hero" ref={root} className="hero" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden>
        <video ref={video} autoPlay muted loop playsInline preload="metadata" poster="/video/survey-vessel-poster.jpg">
          <source src="/video/survey-vessel-720.mp4" type="video/mp4" media="(max-width: 900px)" />
          <source src="/video/survey-vessel-1080.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero__overlay" aria-hidden />

      <div className="container hero__content">
        <p className="hero__kicker hero-in" style={{ ["--d" as string]: "0.1s" }}>
          <span className="hero__ticker">TSXV: BLU</span>
          <span className="hero__kicker-sep" aria-hidden />
          <span>West Africa Deepwater Oil &amp; Gas Exploration</span>
        </p>

        <h1 id="hero-title" className="hero__title hero-in" style={{ ["--d" as string]: "0.2s" }}>
          Unlocking the Next Frontier in Deepwater Energy.
        </h1>

        <div className="hero__foot">
          <p className="hero__lede hero-in" style={{ ["--d" as string]: "0.35s" }}>
            BluEnergies is exploring the Harper basin, offshore Liberia, one of the last undrilled basins on the West African
            Margin to contain the basin floor fan play. It is advancing Reconnaissance Licence RL-003 in partnership with
            TotalEnergies.
          </p>
          <div className="hero__actions hero-in" style={{ ["--d" as string]: "0.45s" }}>
            <Button href="#assets" on="dark">Explore Our Assets</Button>
            <Button href="#investors" variant="secondary" on="dark">Investor Information</Button>
          </div>
        </div>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll to company introduction">
        <span className="hero__scroll-line" aria-hidden />
        <span>Scroll</span>
      </a>
    </section>
  );
}
