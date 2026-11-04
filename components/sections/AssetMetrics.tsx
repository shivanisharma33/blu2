"use client";

import { useState } from "react";
import { routes, ORIGIN } from "@/lib/content";

interface MetricItem {
  id: string;
  label: string;
  metricVal: string;
  metricUnit: string;
  imperialVal: string;
  imperialUnit: string;
  ratioPercent: number;
  ratioLabel: string;
  note: string;
  kicker: string;
  detailTitle: string;
  detailDesc: string;
  highlights: [string, string][];
  link: { label: string; href: string };
}

const metrics: MetricItem[] = [
  {
    id: "area",
    label: "Licence Area",
    metricVal: "8,924",
    metricUnit: "km²",
    imperialVal: "2.20M",
    imperialUnit: "Acres",
    ratioPercent: 40,
    ratioLabel: "~40% of entire Harper Basin",
    note: "RL-003 · Blocks LB-26, LB-30 & LB-31",
    kicker: "Acreage Footprint",
    detailTitle: "Offshore Liberia RL-003 Block Architecture",
    detailDesc:
      "Reconnaissance Licence RL-003 covers 8,924 square kilometres (~2.2 million gross acres) spanning deepwater Blocks LB-26, LB-30, and LB-31. It controls approximately 40% of the entire Harper Basin, capturing the premier sweet spot of undrilled Cretaceous basin floor fans.",
    highlights: [
      ["Blocks Included", "LB-26, LB-30, LB-31"],
      ["Basin Control", "~40% of Harper Basin"],
      ["Water Depths", "500m to 3,500m"],
      ["Licence Term", "Through June 30, 2027"],
    ],
    link: { label: "Inspect Harper Basin Map", href: "#opportunity" },
  },
  {
    id: "seismic",
    label: "3D Seismic Coverage",
    metricVal: "6,167",
    metricUnit: "km²",
    imperialVal: "1.52M",
    imperialUnit: "Acres",
    ratioPercent: 69,
    ratioLabel: "69% full-fold licence coverage",
    note: "Reprocessing >50% complete (TGS)",
    kicker: "Subsurface Imaging",
    detailTitle: "High-Resolution 3D Seismic Reprocessing",
    detailDesc:
      "The 6,167 km² 3D seismic volume, originally acquired by TGS, covers the vast majority of the prospective Cretaceous fan systems. The dataset has been reprocessed with advanced PSTM/PSDM fast-track imaging to delineate drill-ready stratigraphic trapping geometries.",
    highlights: [
      ["Full-Fold 3D Volume", "6,167 km² (~1.52M acres)"],
      ["Reprocessing Status", ">50% Complete (July 2026)"],
      ["Contractor", "TGS Geophysical"],
      ["Certified Fans", "6 independently audited prospects"],
    ],
    link: { label: "View Subsurface Overview", href: routes.overview },
  },
  {
    id: "interest",
    label: "Participating Interest",
    metricVal: "35",
    metricUnit: "%",
    imperialVal: "35",
    imperialUnit: "% Interest",
    ratioPercent: 35,
    ratioLabel: "Co-venturer with operator TotalEnergies (65%)",
    note: "BluEnergies 35% · TotalEnergies 65%",
    kicker: "Commercial Joint Venture",
    detailTitle: "Supermajor Strategic Co-Venture",
    detailDesc:
      "BluEnergies holds a high-equity 35% working interest in Licence RL-003 alongside global supermajor TotalEnergies SE (65% & Operator). The co-venture brings institutional operational standards, capital discipline, and deep technical validation to frontier Liberia exploration.",
    highlights: [
      ["BluEnergies Working Interest", "35%"],
      ["Operator Partner", "TotalEnergies (65%)"],
      ["Regulator", "Liberia Petroleum Regulatory Authority"],
      ["Commercial Model", "Joint Study & Application"],
    ],
    link: { label: "Explore Partnership Details", href: "#partnership" },
  },
  {
    id: "proximity",
    label: "Proximity to Shore",
    metricVal: "~50",
    metricUnit: "km",
    imperialVal: "~31",
    imperialUnit: "Miles",
    ratioPercent: 85,
    ratioLabel: "Favourable near-shore deepwater logistics",
    note: "Optimal logistics & subsea tie-back range",
    kicker: "Operational Logistics",
    detailTitle: "Near-Coast Infrastructure & Subsea Reach",
    detailDesc:
      "The core Cretaceous fan prospects lie just 50 km offshore from the Liberian coastline in water depths ranging from 500m to 3,500m. This close-in configuration significantly lowers offshore supply vessel (OSV) turnaround times and reduces future subsea tie-back capital expenditure.",
    highlights: [
      ["Distance to Coastline", "50 km (~31 nautical miles)"],
      ["Water Depth Range", "500 m – 3,500 m"],
      ["Logistics Base", "Rapid coastal turnaround"],
      ["Commercial Concept", "Deepwater FPSO / Subsea Tie-back"],
    ],
    link: { label: "Review 2026 Programme", href: `${routes.overview}#programme` },
  },
];

export default function AssetMetrics() {
  const [activeId, setActiveId] = useState<string>("area");
  const [unitMode, setUnitMode] = useState<"metric" | "imperial">("metric");
  const [disclosureOpen, setDisclosureOpen] = useState<boolean>(false);

  const selected = metrics.find((m) => m.id === activeId) || metrics[0];

  return (
    <div className="asset-telemetry">
      {/* Top Header & Unit Toggle Controls */}
      <div className="asset-telemetry__header">
        <div className="asset-telemetry__header-left">
          <span className="asset-telemetry__badge">PORTFOLIO TELEMETRY & TECHNICAL DATA</span>
          <span className="asset-telemetry__hint">Click any card to inspect technical data</span>
        </div>

        <div className="asset-telemetry__units" role="group" aria-label="Unit of Measurement">
          <span className="asset-telemetry__units-label">Units:</span>
          <div className="asset-telemetry__toggle">
            <button
              type="button"
              className={`asset-telemetry__toggle-btn ${unitMode === "metric" ? "is-active" : ""}`}
              onClick={() => setUnitMode("metric")}
              aria-pressed={unitMode === "metric"}
            >
              Metric (km² / km)
            </button>
            <button
              type="button"
              className={`asset-telemetry__toggle-btn ${unitMode === "imperial" ? "is-active" : ""}`}
              onClick={() => setUnitMode("imperial")}
              aria-pressed={unitMode === "imperial"}
            >
              Imperial (Acres / Mi)
            </button>
          </div>
        </div>
      </div>

      {/* 4 Interactive Metric Cards */}
      <div className="asset-telemetry__cards">
        {metrics.map((m) => {
          const isActive = m.id === activeId;
          const displayVal = unitMode === "metric" ? m.metricVal : m.imperialVal;
          const displayUnit = unitMode === "metric" ? m.metricUnit : m.imperialUnit;

          return (
            <button
              key={m.id}
              type="button"
              className={`asset-metric-card ${isActive ? "is-active" : ""}`}
              onClick={() => setActiveId(m.id)}
              aria-expanded={isActive}
              aria-label={`${m.label}: ${displayVal} ${displayUnit}`}
            >
              <div className="asset-metric-card__header">
                <span className="asset-metric-card__label">{m.label}</span>
                <span className={`asset-metric-card__indicator ${isActive ? "is-active" : ""}`} />
              </div>

              <div className="asset-metric-card__value">
                <span className="val-number">{displayVal}</span>
                <span className="val-unit">{displayUnit}</span>
              </div>

              {/* Proportional visual progress bar */}
              <div className="asset-metric-card__progress">
                <div
                  className="asset-metric-card__progress-bar"
                  style={{ width: `${m.ratioPercent}%` }}
                />
              </div>

              <div className="asset-metric-card__note">{m.note}</div>

              <div className="asset-metric-card__action">
                <span>{isActive ? "Currently viewing" : "Click to inspect"}</span>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Deep-Dive Inspector Panel */}
      <div className="asset-inspector" key={selected.id}>
        <div className="asset-inspector__header">
          <div className="asset-inspector__badge-wrap">
            <span className="asset-inspector__badge">{selected.kicker}</span>
            <span className="asset-inspector__ratio">{selected.ratioLabel}</span>
          </div>
          <h3 className="h4 asset-inspector__title">{selected.detailTitle}</h3>
          <p className="asset-inspector__desc">{selected.detailDesc}</p>
        </div>

        {/* 4 Technical Highlights Grid */}
        <div className="asset-inspector__grid">
          {selected.highlights.map(([k, v]) => (
            <div key={k} className="asset-inspector__item">
              <span className="asset-inspector__k">{k}</span>
              <span className="asset-inspector__v">{v}</span>
            </div>
          ))}
        </div>

        <div className="asset-inspector__footer">
          <a href={selected.link.href} className="btn btn--secondary btn--on-light asset-inspector__btn">
            <span>{selected.link.label}</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      {/* Interactive Cautionary Note Disclosure Accordion */}
      <div className={`disclosure-accordion ${disclosureOpen ? "is-open" : ""}`}>
        <button
          type="button"
          className="disclosure-accordion__trigger"
          onClick={() => setDisclosureOpen(!disclosureOpen)}
          aria-expanded={disclosureOpen}
        >
          <div className="disclosure-accordion__trigger-left">
            <span className="disclosure-accordion__icon" aria-hidden>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </span>
            <span className="disclosure-accordion__title">
              <strong>Cautionary Note Regarding Prospective Resources</strong> · Regulatory Disclosure
            </span>
          </div>
          <span className="disclosure-accordion__toggle-text">
            {disclosureOpen ? "Collapse notice" : "View full disclosure"}
          </span>
        </button>

        {disclosureOpen && (
          <div className="disclosure-accordion__content">
            <p>
              <strong>Cautionary note.</strong> BluEnergies&apos; blocks are undrilled exploration acreage. They contain no discovered resources or reserves. Prospective resources are quantities of petroleum estimated, as of a given date, to be potentially recoverable from undiscovered accumulations by applying future development projects.
            </p>
            <p>
              There is no certainty that any portion of the resources will be discovered. If discovered, there is no certainty that it will be commercially viable to produce any portion of them. Unrisked estimates have not been adjusted for the chance of discovery or the chance of development.
            </p>
            <p>
              See the company&apos;s{" "}
              <a href={`${ORIGIN}/_resources/presentations/corporate-presentation.pdf`} target="_blank" rel="noopener noreferrer">
                corporate presentation
              </a>{" "}
              and its official filings on <strong>SEDAR+</strong> for full verified public disclosure.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

