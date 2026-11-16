"use client";

import { useEffect, useRef } from "react";
import { Button } from "../ui/primitives";
import { licence } from "@/lib/content";

const proof = [
  { value: `${licence.areaKm2.toLocaleString("en-US")} km²`, label: "Licence area, RL-003" },
  { value: `${licence.bluInterest}%`, label: "BluEnergies working interest" },
  { value: "TotalEnergies", label: `Operator, ${licence.partnerInterest}% interest` },
];

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
    v.play().catch(() => {});
    // Pause the background video when the hero is off-screen.
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="hero" ref={root} className="hero" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden>
        <video ref={video} autoPlay muted loop playsInline preload="auto" poster="/video/survey-vessel-poster.jpg">
          <source src="/video/survey-vessel-720.mp4" type="video/mp4" media="(max-width: 900px)" />
          <source src="/video/survey-vessel-1080.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="container hero__content">
        <div className="hero__copy">
          <p className="hero__kicker hero-in" style={{ ["--d" as string]: "0.1s" }}>
            <span className="hero__ticker">TSXV: BLU</span>
            <span className="hero__kicker-sep" aria-hidden />
            <span>Offshore Liberia · Harper basin</span>
          </p>

          <h1 id="hero-title" className="hero__title hero-in" style={{ ["--d" as string]: "0.2s" }}>
            Unlocking the next frontier in deepwater energy.
          </h1>

          <p className="hero__lede hero-in" style={{ ["--d" as string]: "0.3s" }}>
            Exploring one of the last undrilled basin floor fan plays on the West African Margin, in partnership with
            TotalEnergies.
          </p>

          <dl className="hero__proof hero-in" style={{ ["--d" as string]: "0.4s" }}>
            {proof.map((p) => (
              <div key={p.label} className="hero__proof-item">
                <dt>{p.label}</dt>
                <dd>{p.value}</dd>
              </div>
            ))}
          </dl>

          <div className="hero__actions hero-in" style={{ ["--d" as string]: "0.5s" }}>
            <Button href="#assets" on="dark">Explore the RL-003 licence</Button>
            <Button href="#investors" variant="link" on="dark" className="hero__link">
              Investor information
            </Button>
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
