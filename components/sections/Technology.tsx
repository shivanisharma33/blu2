"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SubsurfaceCanvas from "./SubsurfaceCanvas";
import { SectionLabel } from "../ui/primitives";
import { programme } from "@/lib/content";

export default function Technology() {
  const [step, setStep] = useState(0);
  const stepsRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const items = stepsRef.current?.querySelectorAll<HTMLElement>("[data-step]");
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setStep(Number((e.target as HTMLElement).dataset.step)));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  return (
    <section id="technology" className="tech section--abyss" aria-labelledby="tech-title">
      <div className="tech__descent" aria-hidden />
      <div className="container">
        <header className="tech__head">
          <SectionLabel>Technical Expertise</SectionLabel>
          <h2 id="tech-title" className="display-xl" data-reveal="lines">
            Seeing Beneath <br />
            <em>the Surface.</em>
          </h2>
          <p className="tech__intro" data-reveal="fade">
            BluEnergies and TotalEnergies have jointly committed a work programme that uses state-of-the-art seismic reprocessing and
            new sea-bottom data to evaluate prospectivity and de-risk the hydrocarbon potential before selecting a drilling location.
          </p>
        </header>

        <div className="tech__stage">
          <div className="tech__viz">
            <div className="tech__viz-frame">
              <div className="tech__viz-head">
                <span className="mono-label">Exploration methods</span>
                <span className="mono-label tech__viz-step">
                  {programme[step].title}
                </span>
              </div>
              <SubsurfaceCanvas step={step} />
              <div className="tech__viz-progress" aria-hidden>
                {programme.map((p, i) => (
                  <span key={p.id} className={i === step ? "is-active" : i < step ? "is-done" : ""} />
                ))}
              </div>
            </div>
          </div>

          <ol className="tech__steps" ref={stepsRef}>
            {programme.map((p, i) => (
              <li key={p.id} data-step={i} className={`tech__step ${i === step ? "is-active" : ""}`}>
                <button className="tech__step-hit" onClick={() => setStep(i)} aria-pressed={i === step}>
                  <span className="tech__step-bullet" aria-hidden />
                  <span className="visually-hidden">Show {p.title} in the illustration</span>
                </button>
                <div>
                  <span className="mono-label">{p.contractor}</span>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                  <p className="tech__status">
                    <i aria-hidden /> {p.status}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="tech__evidence">
          <div className="tech__evidence-copy">
            <span className="mono-label">From the 3D seismic</span>
            <p className="tech__evidence-lead" data-reveal="fade">
              Interpreting 6,167 km² of 3D seismic has revealed seven Cretaceous fan systems across the licence, imaged at Cenomanian
              and Turonian levels.
            </p>
          </div>
          <figure className="seis seis--a">
            <div className="seis__img" data-reveal="mask">
              <Image src="/images/seismic-cenomanian-fans.jpg" alt="3D seismic relative acoustic impedance at the Cenomanian top, showing the Thea, Apollo, Diana and Zeus fan systems with reservoir sand in red" fill sizes="(max-width: 900px) 100vw, 58vw" style={{ objectFit: "cover" }} />
            </div>
            <figcaption>
              <span className="mono-label">Cenomanian</span> Relative acoustic impedance, Cenomanian top 100 m. Reservoir sand shown in red. Data property of TGS.
            </figcaption>
          </figure>
          <figure className="seis seis--b">
            <div className="seis__img" data-reveal="mask">
              <Image src="/images/seismic-turonian-fans.jpg" alt="3D seismic relative acoustic impedance at Turonian level, showing the Saturn, Neptune and Jupiter fans between the Grand Cess and Cape Palmas transforms" fill sizes="(max-width: 900px) 100vw, 46vw" style={{ objectFit: "cover" }} />
            </div>
            <figcaption>
              <span className="mono-label">Turonian</span> Saturn, Neptune and Jupiter fans between the Grand Cess and Cape Palmas transforms.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
