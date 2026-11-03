"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "../ui/primitives";
import { milestones, ORIGIN } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function Partnership() {
  const trackWrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const wrap = trackWrap.current!, t = track.current!;
      const distance = () => Math.max(0, t.scrollWidth - wrap.clientWidth);
      const tween = gsap.to(t, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: ".partner__timeline",
          start: "center center",
          end: () => `+=${distance()}`,
          pin: ".partner__timeline",
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      gsap.fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".partner__timeline", start: "center center", end: () => `+=${distance()}`, scrub: 0.8 } });
      return () => tween.kill();
    });
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".split-bar__blu", { scaleX: 0 }, { scaleX: 1, transformOrigin: "left", duration: 1.6, ease: "expo.inOut", scrollTrigger: { trigger: ".split-bar", start: "top 85%" } });
      gsap.fromTo(".split-bar__tte", { scaleX: 0 }, { scaleX: 1, transformOrigin: "right", duration: 1.6, ease: "expo.inOut", scrollTrigger: { trigger: ".split-bar", start: "top 85%" } });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="partnership" className="partner section--light" aria-labelledby="partner-title">
      <div className="container">
        <div className="partner__grid">
          <div className="partner__head">
            <SectionLabel>Partnership &amp; Progress</SectionLabel>
            <h2 id="partner-title" className="display-xl" data-reveal="lines">
              Strategic Partnerships. <br />
              <em>Disciplined Execution.</em>
            </h2>
          </div>

          <div className="partner__split">
            <div className="split-figures">
              <div>
                <span className="mono-label">BluEnergies Ltd.</span>
                <p className="split-figures__num"><span className="num" data-count="35">35</span><span>%</span></p>
              </div>
              <div className="split-figures__div" aria-hidden />
              <div>
                <span className="mono-label">TotalEnergies</span>
                <p className="split-figures__num split-figures__num--muted"><span className="num" data-count="65">65</span><span>%</span></p>
              </div>
            </div>
            <div className="split-bar" role="img" aria-label="Participating interest in RL-003: BluEnergies 35%, TotalEnergies 65%">
              <span className="split-bar__blu" style={{ flexBasis: "35%" }} />
              <span className="split-bar__tte" style={{ flexBasis: "65%" }} />
            </div>
            <p className="mono-label split-bar__caption">Participating interest · Reconnaissance Licence RL-003</p>
          </div>
        </div>

        <div className="partner__body">
          <div className="partner__copy" data-reveal="fade">
            <p className="lead">
              In January 2026, BluEnergies entered into an industry-standard joint study and application agreement with the
              Liberian upstream subsidiary of TotalEnergies SE (NYSE: TTE). The aim is to further explore the prospectivity of the
              Harper basin fan play.
            </p>
            <p>
              The two companies have jointly committed an immediate budget for an 18-month work programme. If economically viable
              drillable prospects are established, they intend to apply for one or more production sharing contracts covering the
              blocks. Expenditures under the reconnaissance licences would be recoverable under any future production sharing
              contract.
            </p>
            <p className="partner__note">
              BluEnergies Ltd. is an independent, Canadian-based company listed on the TSX Venture Exchange. TotalEnergies is its
              partner in RL-003 with a 65% participating interest.
            </p>
          </div>

          <blockquote className="partner__quote" data-reveal="fade">
            <p>
              “The recent, hectic activity by major oil companies in securing licenses for deepwater acreage along the entire Africa
              west margin is confirmation that the early move by BluEnergies in the Harper basin (2023) was a valid one.”
            </p>
            <footer>
              <span className="partner__quote-name">Sergio Laura</span>
              <span className="mono-label">VP Exploration · Operations update, July 6, 2026</span>
            </footer>
          </blockquote>
        </div>
      </div>

      <div className="partner__timeline">
        <div className="container partner__timeline-head">
          <span className="mono-label">Milestones · 2021 → 2027</span>
          <a className="text-link" href={`${ORIGIN}/news-and-media/news/totalenergies-partners-with-bluenergies-in-its-harper-basin-fan-play-offshore-liberia`} target="_blank" rel="noopener noreferrer">
            Read the partnership release
          </a>
        </div>
        <div className="partner__track-wrap" ref={trackWrap}>
          <ol className="partner__track" ref={track}>
            {milestones.map((m) => (
              <li key={m.title} className={`milestone ${m.upcoming ? "milestone--upcoming" : ""}`}>
                <span className="milestone__node" aria-hidden />
                <span className="milestone__date">{m.date.replace(/,?\s*\d{4}$/, "") || "—"}</span>
                <span className="milestone__year">{m.date.slice(-4)}</span>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </li>
            ))}
          </ol>
          <div className="partner__rail" aria-hidden>
            <div ref={bar} className="partner__rail-fill" />
          </div>
        </div>
      </div>
    </section>
  );
}
