"use client";

import { useState } from "react";
import Image from "next/image";
import { Eyebrow } from "../ui/primitives";
import { programme } from "@/lib/content";

type Horizon = "cenomanian" | "turonian";

interface Hotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  desc: string;
}

const cenomanianHotspots: Hotspot[] = [
  {
    id: "thea-apollo",
    x: 32,
    y: 54,
    title: "Thea & Apollo Fan Fairway",
    desc: "High-amplitude Cretaceous reservoir sands (imaged in red) fed down-slope by discrete point-source feeder channels.",
  },
  {
    id: "diana-zeus",
    x: 68,
    y: 62,
    title: "Diana & Zeus Fan Leads",
    desc: "Eastern fan complex showing strong acoustic impedance contrast and favorable stratigraphic trapping geometry.",
  },
  {
    id: "migration",
    x: 48,
    y: 78,
    title: "Interpreted Oil Migration",
    desc: "Direct charge pathway interpreted from mature Cenomanian-Turonian marine source kitchens beneath the fans.",
  },
];

const turonianHotspots: Hotspot[] = [
  {
    id: "saturn-neptune",
    x: 38,
    y: 48,
    title: "Saturn & Neptune Turbidite Fans",
    desc: "Thick, multi-stacked Turonian sand bodies ponded within deepwater structural corridors.",
  },
  {
    id: "cape-palmas",
    x: 74,
    y: 58,
    title: "Cape Palmas Transform Backstop",
    desc: "Oceanic transform fault forming a reverse-slope backstop where high-porosity sands pond and seal stratigraphically.",
  },
  {
    id: "grand-cess",
    x: 22,
    y: 35,
    title: "Grand Cess Structural Margin",
    desc: "Regional tectonic lineament bounding the northern depositional fairway of the Harper Basin.",
  },
];

const programmeExtras = [
  {
    id: "reprocessing",
    progress: 75,
    tag: "Subsurface Focus",
    why: "Sharpens amplitude vs offset (AVO) response to identify trapped hydrocarbons before drilling.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 12h3l3-8 4 16 3-8h7" />
        <circle cx="12" cy="12" r="10" strokeDasharray="3 3" />
      </svg>
    ),
  },
  {
    id: "mbes",
    progress: 55,
    tag: "Seabed Topography",
    why: "Maps sea-bottom geohazards and acoustic water-column anomalies to pinpoint exact drilling rig anchors.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: "geochem",
    progress: 40,
    tag: "Direct Evidence",
    why: "Piston cores recover micro-seep liquid hydrocarbons, validating that an active petroleum charge exists.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 2v7.31M14 9.3V1.99M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0" />
      </svg>
    ),
  },
  {
    id: "heatflow",
    progress: 30,
    tag: "Thermal Maturity",
    why: "Measures sediment temperatures to accurately calibrate oil vs gas generation windows across the basin.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
      </svg>
    ),
  },
];

export default function Strategy() {
  const [activeHorizon, setActiveHorizon] = useState<Horizon>("cenomanian");
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [lightboxImg, setLightboxImg] = useState<{ src: string; title: string } | null>(null);

  const currentHotspots = activeHorizon === "cenomanian" ? cenomanianHotspots : turonianHotspots;

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
            BluEnergies and TotalEnergies have jointly committed to an integrated multi-tiered work programme combining advanced 3D
            seismic reprocessing and sea-bottom geochemical surveys. The objective is to rigorously de-risk the Cretaceous fan play and
            confidently select the optimal first drilling location.
          </p>
        </header>

        {/* Interactive De-risking Pathway Ribbon */}
        <div className="derisking-ribbon" data-reveal>
          <div className="derisking-ribbon__header">
            <span className="derisking-ribbon__badge">JOINT OPERATIONAL ROADMAP</span>
            <span className="derisking-ribbon__sub">Four Integrated Datasets Converging on Well Selection</span>
          </div>
          <div className="derisking-ribbon__steps">
            <div className="derisk-step is-active">
              <span className="derisk-step__dot" />
              <div className="derisk-step__info">
                <span className="derisk-step__k">Layer 1</span>
                <span className="derisk-step__t">6,167 km² 3D Seismic Reprocessing</span>
              </div>
            </div>
            <div className="derisk-step is-active">
              <span className="derisk-step__dot" />
              <div className="derisk-step__info">
                <span className="derisk-step__k">Layer 2</span>
                <span className="derisk-step__t">4,045 km² Multi-Beam Sonar (MBES)</span>
              </div>
            </div>
            <div className="derisk-step is-active">
              <span className="derisk-step__dot" />
              <div className="derisk-step__info">
                <span className="derisk-step__k">Layer 3</span>
                <span className="derisk-step__t">Seabed Geochemical Coring</span>
              </div>
            </div>
            <div className="derisk-step is-active">
              <span className="derisk-step__dot" />
              <div className="derisk-step__info">
                <span className="derisk-step__k">Layer 4</span>
                <span className="derisk-step__t">Heat-Flow Basin Thermal History</span>
              </div>
            </div>
            <div className="derisk-step derisk-step--target">
              <span className="derisk-step__target-dot" />
              <div className="derisk-step__info">
                <span className="derisk-step__k">Target Outcome</span>
                <span className="derisk-step__t">First Exploration Well Selection</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Seismic Workstation Studio */}
        <div className="seismic-studio" data-reveal>
          {/* Workstation Top Control HUD */}
          <div className="seismic-studio__hud">
            <div className="seismic-studio__hud-left">
              <div className="seismic-studio__switcher" role="tablist" aria-label="Seismic Horizons">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeHorizon === "cenomanian"}
                  className={`seismic-tab ${activeHorizon === "cenomanian" ? "is-active" : ""}`}
                  onClick={() => {
                    setActiveHorizon("cenomanian");
                    setActiveHotspot(null);
                  }}
                >
                  <span className="seismic-tab__dot" />
                  <span>Cenomanian Fan Architecture (Top 100m)</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeHorizon === "turonian"}
                  className={`seismic-tab ${activeHorizon === "turonian" ? "is-active" : ""}`}
                  onClick={() => {
                    setActiveHorizon("turonian");
                    setActiveHotspot(null);
                  }}
                >
                  <span className="seismic-tab__dot" />
                  <span>Turonian Structural Confinement</span>
                </button>
              </div>
            </div>

            <div className="seismic-studio__hud-right">
              <button
                type="button"
                className={`hud-toggle-btn ${showHotspots ? "is-active" : ""}`}
                onClick={() => setShowHotspots(!showHotspots)}
                aria-pressed={showHotspots}
              >
                <span>{showHotspots ? "Annotations: ON" : "Annotations: OFF"}</span>
              </button>
              <button
                type="button"
                className="hud-expand-btn"
                onClick={() =>
                  setLightboxImg({
                    src:
                      activeHorizon === "cenomanian"
                        ? "/images/seismic-cenomanian-fans.jpg"
                        : "/images/seismic-turonian-fans.jpg",
                    title:
                      activeHorizon === "cenomanian"
                        ? "3D Seismic Relative Acoustic Impedance (Cenomanian Top 100m)"
                        : "3D Seismic Relative Acoustic Impedance (Turonian Ponded Fans)",
                  })
                }
              >
                <span>Inspect Full Frame</span>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M1 5V1h4M13 9v4H9M1 1l5 5M13 13L8 8" />
                </svg>
              </button>
            </div>
          </div>

          {/* Interactive Screen Viewport */}
          <div className="seismic-viewport">
            <div className="seismic-viewport__media">
              <Image
                src={
                  activeHorizon === "cenomanian"
                    ? "/images/seismic-cenomanian-fans.jpg"
                    : "/images/seismic-turonian-fans.jpg"
                }
                alt={
                  activeHorizon === "cenomanian"
                    ? "3D seismic relative acoustic impedance at the Cenomanian top"
                    : "3D seismic relative acoustic impedance at Turonian level"
                }
                fill
                sizes="(max-width: 1200px) 100vw, 1100px"
                style={{ objectFit: "contain" }}
                priority
              />

              {/* Interactive Geological Hotspots */}
              {showHotspots &&
                currentHotspots.map((h) => {
                  const isOpened = activeHotspot?.id === h.id;
                  return (
                    <div
                      key={h.id}
                      className="seismic-hotspot"
                      style={{ left: `${h.x}%`, top: `${h.y}%` }}
                    >
                      <button
                        type="button"
                        className={`seismic-hotspot__beacon ${isOpened ? "is-active" : ""}`}
                        onClick={() => setActiveHotspot(isOpened ? null : h)}
                        aria-label={h.title}
                      >
                        <span className="beacon-ring" />
                        <span className="beacon-core" />
                      </button>

                      {isOpened && (
                        <div className="seismic-hotspot__popover">
                          <div className="popover-badge">GEOLOGICAL FEATURE</div>
                          <div className="popover-title">{h.title}</div>
                          <div className="popover-desc">{h.desc}</div>
                          <button
                            type="button"
                            className="popover-close"
                            onClick={() => setActiveHotspot(null)}
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="seismic-viewport__bar">
              <div className="seismic-viewport__legend">
                <span className="color-chip" />
                <span className="legend-text">
                  Relative Acoustic Impedance (AI) · Warm Red Tones Indicate High-Porosity Reservoir Sands
                </span>
              </div>
              <div className="seismic-viewport__meta">
                <span>Contractor: TGS ASA</span>
                <span className="sep">·</span>
                <span>Dataset: 6,167 km² 3D</span>
                <span className="sep">·</span>
                <span>Resolution: High-Res PSTM/PSDM</span>
              </div>
            </div>
          </div>

          {/* Descriptive Context Below Screen */}
          <div className="seismic-studio__summary">
            {activeHorizon === "cenomanian" ? (
              <div className="seismic-summary-card">
                <div className="summary-badge">CENOMANIAN HORIZON · HIGH-IMPACT PROSPECTS</div>
                <h3 className="h3 summary-title">Seven Fan Systems Imaged Across High-Porosity Sand Fairways</h3>
                <p className="summary-p">
                  Interpretation of 6,167 km² of high-resolution 3D seismic reveals seven Cretaceous fan systems across the RL-003 licence.
                  At the Cenomanian top (100 m interval), the Thea, Apollo, Diana, and Zeus fan bodies are fed by multiple point-source
                  gravity channels, with interpreted direct hydrocarbon charge from mature underlying marine source rocks.
                </p>
                <div className="summary-chips">
                  <span className="chip">Thea Fan</span>
                  <span className="chip">Apollo Fan (Multi-Block)</span>
                  <span className="chip">Diana Fan</span>
                  <span className="chip">Zeus Fan</span>
                  <span className="chip chip--accent">Independently Certified (LB-30 &amp; LB-31)</span>
                </div>
              </div>
            ) : (
              <div className="seismic-summary-card">
                <div className="summary-badge">TURONIAN HORIZON · STRUCTURAL TRAPPING</div>
                <h3 className="h3 summary-title">Structural Confinement &amp; Sand Ponding Against Transform Faults</h3>
                <p className="summary-p">
                  At the Turonian horizon, the Saturn, Neptune, and Jupiter fan complexes are bounded between the regional Grand Cess and
                  Cape Palmas oceanic transform faults. The Cape Palmas transform serves as an impermeable structural backstop, forcing
                  turbidite sands to pond and stack into thick, multi-reservoir columns against its reverse slope.
                </p>
                <div className="summary-chips">
                  <span className="chip">Saturn Fan</span>
                  <span className="chip">Neptune Fan</span>
                  <span className="chip">Jupiter Fan</span>
                  <span className="chip chip--accent">Cape Palmas Structural Backstop</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 2026 Work Programme: Interactive Exploration Cards */}
        <div className="programme" id="programme">
          <div className="programme__head" data-reveal>
            <div className="programme__badge">2026 WORK PROGRAMME</div>
            <h3 className="h3">Systematic Technical De-risking in Progress</h3>
            <p>Four synchronized operational datasets advancing the Harper Basin toward drilling sanction.</p>
          </div>

          <div className="programme__interactive-grid" data-reveal>
            {programme.map((p) => {
              const extra = programmeExtras.find((e) => e.id === p.id) || programmeExtras[0];
              return (
                <div key={p.id} className="programme-card">
                  <div className="programme-card__top">
                    <div className="programme-card__icon">{extra.icon}</div>
                    <span className="programme-card__tag">{extra.tag}</span>
                  </div>

                  <h4 className="programme-card__title">{p.title}</h4>
                  <p className="programme-card__by">{p.contractor}</p>
                  <p className="programme-card__body">{p.body}</p>

                  <div className="programme-card__why">
                    <span className="why-label">Exploration Value:</span>
                    <span className="why-text">{extra.why}</span>
                  </div>

                  {/* Progress Indicator */}
                  <div className="programme-card__progress">
                    <div className="progress-labels">
                      <span>Operational Progress</span>
                      <span className="progress-pct">{extra.progress}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-bar" style={{ width: `${extra.progress}%` }} />
                    </div>
                  </div>

                  <div className="programme-card__status">
                    <span className="status-dot" />
                    <span>{p.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox for High-Resolution Seismic Image */}
      {lightboxImg && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxImg.title}
          onClick={() => setLightboxImg(null)}
        >
          <figure onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lightboxImg.src} alt={lightboxImg.title} />
            <figcaption>
              {lightboxImg.title} · Data property of TGS ASA / BluEnergies Ltd.
            </figcaption>
            <button
              type="button"
              className="lightbox__close"
              onClick={() => setLightboxImg(null)}
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
