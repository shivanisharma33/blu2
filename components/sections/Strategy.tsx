"use client";

import { useState } from "react";
import Image from "next/image";
import { Eyebrow } from "../ui/primitives";
import { programme } from "@/lib/content";

type HorizonKey = "cenomanian" | "turonian";

interface HorizonData {
  key: HorizonKey;
  tabLabel: string;
  tag: string;
  title: string;
  image: string;
  caption: string;
  desc: string;
  points: { label: string; text: string }[];
}

const horizons: Record<HorizonKey, HorizonData> = {
  cenomanian: {
    key: "cenomanian",
    tabLabel: "Cenomanian Fans",
    tag: "Cretaceous Fan Architecture · Top 100m",
    title: "Seven Fan Systems Imaged in 3D",
    image: "/images/seismic-cenomanian-fans.jpg",
    caption: "Relative acoustic impedance, Cenomanian top 100 m. Reservoir sand shown in red. Data property of TGS ASA.",
    desc: "Interpreting 6,167 km² of high-resolution 3D seismic reveals seven Cretaceous fan systems across the licence. At the Cenomanian top, the Thea, Apollo, Diana, and Zeus fans are fed by several point-source sand inputs, with oil migration interpreted from the underlying mature source rock.",
    points: [
      {
        label: "Independently Certified",
        text: "6 fan systems in Blocks LB-30 & LB-31 carry audited prospective resource potential.",
      },
      {
        label: "Reservoir Sand Presence",
        text: "Warm red acoustic impedance anomalies clearly delineate porous reservoir sand fairways.",
      },
      {
        label: "Source & Migration",
        text: "Direct vertical hydrocarbon migration interpreted from mature Cenomanian source rock kitchens.",
      },
    ],
  },
  turonian: {
    key: "turonian",
    tabLabel: "Turonian Play",
    tag: "Structural Confinement · Transform Margin",
    title: "Structural Confinement & Sand Ponding",
    image: "/images/seismic-turonian-fans.jpg",
    caption: "Relative acoustic impedance, Turonian horizon. Saturn, Neptune and Jupiter fans between regional transform faults.",
    desc: "At the Turonian level, the Saturn, Neptune, and Jupiter fan complexes lie confined between the regional Grand Cess and Cape Palmas transforms. The Cape Palmas transform forms a natural reverse-slope backstop, trapping and ponding thick, multi-storey stacked turbidite reservoirs.",
    points: [
      {
        label: "Structural Barrier",
        text: "Cape Palmas oceanic transform fault provides an effective structural backstop.",
      },
      {
        label: "Stacked Sand Columns",
        text: "Sand ponding against reverse slope promotes exceptionally thick, stacked reservoir geometries.",
      },
      {
        label: "AVO Hydrocarbon Indicators",
        text: "Reprocessed seismic highlights strong amplitude-versus-offset anomalies across target leads.",
      },
    ],
  },
};

const programmeIcons: Record<string, React.ReactNode> = {
  reprocessing: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12h3l3-8 4 16 3-8h7" />
      <circle cx="12" cy="12" r="10" strokeDasharray="3 3" />
    </svg>
  ),
  mbes: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  geochem: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 2v7.31M14 9.3V1.99M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0" />
    </svg>
  ),
  heatflow: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
  ),
};

export default function Strategy() {
  const [activeKey, setActiveKey] = useState<HorizonKey>("cenomanian");
  const [lightbox, setLightbox] = useState<boolean>(false);

  const active = horizons[activeKey];

  return (
    <section id="strategy" className="section section--navy strategy" aria-labelledby="strategy-title">
      <div className="container">
        {/* Section Header */}
        <header className="grid strategy__head">
          <div className="strategy__title" data-reveal>
            <Eyebrow>Exploration Strategy &amp; Technical Insights</Eyebrow>
            <h2 id="strategy-title" className="h2">Building the Evidence Before the First Well.</h2>
          </div>
          <p className="lead strategy__intro" data-reveal>
            BluEnergies and TotalEnergies have jointly committed to a methodical technical work programme utilizing advanced 3D
            seismic reprocessing and sea-bottom data to de-risk prospects and identify optimal drilling targets.
          </p>
        </header>

        {/* Clean Side-by-Side Horizon Explorer */}
        <div className="horizon-showcase" data-reveal>
          {/* Left: Clean Seismic Media Frame */}
          <div className="horizon-showcase__media">
            <div className="horizon-showcase__frame">
              <Image
                src={active.image}
                alt={active.title}
                fill
                sizes="(max-width: 1024px) 100vw, 720px"
                style={{ objectFit: "contain" }}
                priority
              />
              <button
                type="button"
                className="horizon-showcase__expand-btn"
                onClick={() => setLightbox(true)}
                aria-label="Expand high-resolution seismic view"
              >
                <span>Expand View</span>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M1 5V1h4M13 9v4H9M1 1l5 5M13 13L8 8" />
                </svg>
              </button>
            </div>
            <figcaption className="horizon-showcase__caption">
              {active.caption}
            </figcaption>
          </div>

          {/* Right: Minimalist Tabbed Story Card */}
          <div className="horizon-showcase__content">
            {/* Pill Tabs Switcher */}
            <div className="horizon-tabs" role="tablist" aria-label="Seismic Horizon Selection">
              {(["cenomanian", "turonian"] as const).map((key) => {
                const item = horizons[key];
                const isActive = activeKey === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`horizon-tab ${isActive ? "is-active" : ""}`}
                    onClick={() => setActiveKey(key)}
                  >
                    <span className="horizon-tab__dot" />
                    <span>{item.tabLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Content Details */}
            <div className="horizon-details" key={active.key}>
              <span className="horizon-details__tag">{active.tag}</span>
              <h3 className="h3 horizon-details__title">{active.title}</h3>
              <p className="horizon-details__desc">{active.desc}</p>

              {/* Key Geological Takeaways */}
              <ul className="horizon-points">
                {active.points.map((pt) => (
                  <li key={pt.label} className="horizon-point">
                    <span className="horizon-point__bullet" />
                    <div>
                      <strong className="horizon-point__label">{pt.label}: </strong>
                      <span className="horizon-point__text">{pt.text}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 2026 Work Programme: Clean 4-Card Deck */}
        <div className="programme-deck" id="programme" data-reveal>
          <div className="programme-deck__header">
            <span className="programme-deck__badge">2026 WORK PROGRAMME</span>
            <h3 className="h3 programme-deck__title">Four Complementary De-risking Streams</h3>
            <p className="programme-deck__lead">
              A synchronized operational campaign designed to de-risk hydrocarbon potential and accelerate drilling site selection.
            </p>
          </div>

          <div className="programme-deck__cards">
            {programme.map((p) => {
              const icon = programmeIcons[p.id] || programmeIcons.reprocessing;
              return (
                <div key={p.id} className="programme-deck-card">
                  <div className="programme-deck-card__icon">{icon}</div>
                  <h4 className="programme-deck-card__title">{p.title}</h4>
                  <p className="programme-deck-card__contractor">{p.contractor}</p>
                  <p className="programme-deck-card__body">{p.body}</p>
                  <div className="programme-deck-card__status">
                    <span className="status-indicator" />
                    <span>{p.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox for Seismic Inspection */}
      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setLightbox(false)}
        >
          <figure onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={active.image} alt={active.title} />
            <figcaption>{active.caption}</figcaption>
            <button
              type="button"
              className="lightbox__close"
              onClick={() => setLightbox(false)}
              autoFocus
            >
              Close
            </button>
          </figure>
        </div>
      )}
    </section>
  );
}
