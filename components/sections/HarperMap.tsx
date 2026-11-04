"use client";

import { useEffect, useState } from "react";

/*
 * Geometry is traced from the company's official licence map
 * ("Map showing the location of Reconnaissance License No. LPRA-003 … as of April 2025"),
 * using that map's own pixel space. It is a stylised redraw: the official map opens in a lightbox.
 */
const P = {
  land: "M650,100 L720,128 L790,170 L850,200 L900,215 L960,232 L1050,262 L1130,290 L1200,312 L1280,345 L1340,362 L1420,385 L1500,410 L1580,440 L1650,465 L1690,505 L1760,525 L1850,540 L1940,550 L2000,552 L2000,100 Z",
  coast: "M650,100 L720,128 L790,170 L850,200 L900,215 L960,232 L1050,262 L1130,290 L1200,312 L1280,345 L1340,362 L1420,385 L1500,410 L1580,440 L1650,465 L1690,505 L1760,525 L1850,540 L1940,550 L2000,552",
  basin: "M575,690 L1160,305 L1300,355 L1910,600 L1975,840 L1925,1070 L1520,1250 L1175,1300 L1085,1315 L770,1450 L615,1465 L585,1080 Z",
  lb26: "M935,215 L1240,340 L1240,735 L935,735 Z",
  lb30: "M640,580 L930,580 L935,1330 L640,1250 Z",
  lb31: "M935,735 L1240,735 L1240,1295 L1175,1300 L1155,1385 L935,1330 Z",
  seismic: "M820,468 L1495,668 L1375,1145 L1195,1150 L680,1025 Z",
  c1000: "M945,492 C990,470 1060,468 1120,470 C1160,472 1185,480 1195,500 L1215,550 C1240,560 1290,575 1330,590 L1345,625",
  c2000: "M640,632 C700,648 760,662 800,690 C840,670 900,650 940,655 C1000,628 1080,618 1170,640 L1270,682 C1285,700 1290,720 1295,745",
  c3000: "M640,742 C690,748 740,720 790,760 C820,778 840,790 850,800",
  saturn: "M682,1025 L702,925 L742,862 L790,822 L802,782 L830,770 L862,772 L866,802 L848,842 L800,882 L790,942 L760,985 Z",
  thea: "M752,922 L802,862 L872,812 L940,808 L935,842 L882,852 L852,882 L812,950 L782,962 Z",
  apollo: "M790,1042 L802,962 L862,902 L952,862 L1002,842 L1062,852 L1142,822 L1152,872 L1102,942 L1002,1002 L932,1042 L882,1050 Z",
  neptune: "M932,962 L972,892 L1002,832 L1042,772 L1082,762 L1112,702 L1132,692 L1122,742 L1102,802 L1062,832 L1062,972 L942,1032 Z",
  diana: "M922,952 L962,922 L1042,918 L1110,918 L1100,946 L1062,970 L962,992 Z",
  zeus: "M1142,702 L1252,692 L1242,722 L1202,762 L1202,802 L1242,872 L1222,902 L1162,902 L1142,942 L1122,882 L1152,802 L1152,742 Z",
};

/* --------------------------------------------------- West Africa locator -- */
const coastLL: [number, number][] = [
  [-17, 21], [-16.5, 19], [-16.1, 17], [-16.6, 15.2], [-17.4, 14.7], [-16.8, 13.5], [-16.7, 12.3], [-15.5, 11.5], [-14.7, 10.7],
  [-13.7, 9.5], [-13.2, 8.5], [-12.5, 7.5], [-11.5, 6.9], [-10.8, 6.3], [-9.5, 5.4], [-8.3, 4.6], [-7.5, 4.35], [-6.5, 4.6],
  [-5.5, 5.1], [-4, 5.25], [-2.5, 4.9], [-2.1, 4.75], [-1, 5.1], [0, 5.6], [1.2, 6.1], [2.4, 6.35], [3.4, 6.4], [4.5, 6.3],
  [5.5, 5.3], [6, 4.3], [7, 4.4], [8.3, 4.6], [9.2, 3.9], [9.6, 3], [9.8, 2], [9.5, 1], [9.3, 0], [8.8, -0.8], [9.5, -2.5],
  [11, -4], [12, -5], [12.3, -6.5],
];
const proj = ([lon, lat]: [number, number]) => [((lon + 19) / 33) * 300, ((22 - lat) / 30) * 260] as const;
const coastPath = coastLL.map((p, i) => `${i ? "L" : "M"}${proj(p)[0].toFixed(1)},${proj(p)[1].toFixed(1)}`).join(" ");
const landPath = `${coastPath} L300,${proj([14, -6.5])[1].toFixed(1)} L300,0 L${proj([-17, 22])[0].toFixed(1)},0 Z`;
const harper = proj([-7.9, 3.9]);

type Spot = {
  id: string;
  x: number;
  y: number;
  title: string;
  kicker: string;
  body: string;
  facts?: [string, string][];
};

const spots: Spot[] = [
  {
    id: "fans",
    x: 975,
    y: 905,
    kicker: "Play Fairway",
    title: "Cretaceous Fan Systems",
    body: "Seven Cretaceous fan systems are identified across Cenomanian and Turonian intervals. Six of them, all in Blocks LB-30 and LB-31, carry independently certified, unrisked, recoverable prospective resource potential (report dated March 28, 2025).",
    facts: [
      ["Intervals", "Cenomanian · Turonian"],
      ["Certified Fans", "6 Independently Audited"],
      ["Source Rock", "Cretaceous Marine Shale"],
      ["Gross Thickness", "Up to 300m Reservoir Columns"],
    ],
  },
  {
    id: "lb30",
    x: 787,
    y: 1180,
    kicker: "Licence Block",
    title: "Block LB-30",
    body: "Deepwater basin floor fans are identified here on 3D seismic, including the Turonian Saturn fan, the Cenomanian Thea fan, and the giant Apollo fan, which extends eastward into LB-31.",
    facts: [
      ["Licence", "RL-003 (Liberia)"],
      ["Working Interest", "35% BluEnergies · 65% TotalEnergies"],
      ["Water Depths", "1,500 m – 3,200 m"],
      ["Status", "Fans Identified · Drill Target Prep"],
    ],
  },
  {
    id: "lb31",
    x: 1088,
    y: 1180,
    kicker: "Licence Block",
    title: "Block LB-31",
    body: "The Turonian Neptune fan and the Cenomanian Diana and Zeus fans lie here. Like LB-30, this block hosts high-confidence fan systems with multi-hundred-million barrel prospective resource potential.",
    facts: [
      ["Licence", "RL-003 (Liberia)"],
      ["Working Interest", "35% BluEnergies · 65% TotalEnergies"],
      ["Water Depths", "1,800 m – 3,400 m"],
      ["Status", "Fans Identified · Drill Target Prep"],
    ],
  },
  {
    id: "lb26",
    x: 1088,
    y: 560,
    kicker: "Licence Block",
    title: "Block LB-26",
    body: "The northernmost block, closest to the Liberian coastline in shallow-to-intermediate water depths. An intensive geological and geophysical assessment of Block LB-26 is currently underway.",
    facts: [
      ["Licence", "RL-003 (Liberia)"],
      ["Working Interest", "35% BluEnergies · 65% TotalEnergies"],
      ["Water Depths", "500 m – 2,000 m"],
      ["Status", "Reprocessing & Interpretation Underway"],
    ],
  },
  {
    id: "seismic",
    x: 1440,
    y: 880,
    kicker: "Subsurface Dataset",
    title: "3D Seismic Coverage (6,167 km²)",
    body: "High-resolution 3D seismic survey acquired by TGS, covering the core exploration fairway across Blocks LB-26, LB-30, and LB-31. The full volume has undergone state-of-the-art PSTM/PSDM reprocessing.",
    facts: [
      ["Coverage", "6,167 km² Full Fold"],
      ["Acquisition", "TGS Modern 3D Data"],
      ["Reprocessing", "Advanced PSTM/PSDM Fast-Track"],
      ["Resolution", "Stratigraphic-Grade Reservoir Imaging"],
    ],
  },
];

const TAB_ORDER = ["fans", "lb30", "lb31", "lb26", "seismic"];
const tabs = TAB_ORDER.map((id) => spots.find((s) => s.id === id)!);

export default function HarperMap() {
  const [active, setActive] = useState<string>("fans");
  const [lightbox, setLightbox] = useState(false);
  const spot = spots.find((s) => s.id === active)!;
  const on = (id: string) => (active === id ? "is-active" : "");

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <div className="harper">
      {/* Map Interactive Canvas */}
      <figure className="harper__map" data-reveal="image">
        {/* Top Tactical Telemetry HUD Bar */}
        <div className="harper__map-hud">
          <div className="harper__map-hud-left">
            <span className="hud-beacon" />
            <span className="hud-title">OFFSHORE LIBERIA · HARPER BASIN RL-003</span>
            <span className="hud-sep">/</span>
            <span className="hud-tag">3D SEISMIC & RESERVOIR GIS</span>
          </div>
          <div className="harper__map-hud-right">
            <span className="hud-coords">4°20&apos;N · 8°15&apos;W</span>
            <span className="hud-depth">500m – 3,500m ISO</span>
            <button
              type="button"
              className="hud-btn-expand"
              onClick={() => setLightbox(true)}
              aria-label="View official licence map in high resolution"
            >
              <span>Licence Map</span>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M1 5V1h4M13 9v4H9M1 1l5 5M13 13L8 8" />
              </svg>
            </button>
          </div>
        </div>

        {/* High-Precision Interactive SVG Map */}
        <div className="harper__svg-wrap">
          <svg
            viewBox="470 100 1530 1400"
            className="harper__svg"
            role="img"
            aria-labelledby="map-title map-desc"
          >
            <title id="map-title">Exploration Map of Reconnaissance Licence RL-003, Harper basin, offshore Liberia</title>
            <desc id="map-desc">
              High-resolution cartographic map showing Blocks LB-26, LB-30, and LB-31 within the Harper basin offshore Liberia.
              Includes 3D seismic coverage of 6,167 km² and Cenomanian and Turonian Cretaceous basin floor fan systems.
            </desc>

            <defs>
              {/* Ocean Bathymetry Gradient */}
              <linearGradient id="oceanBathymetry" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#132a3a" />
                <stop offset="35%" stopColor="#0d2130" />
                <stop offset="70%" stopColor="#081724" />
                <stop offset="100%" stopColor="#040e17" />
              </linearGradient>

              {/* Onshore Land Gradient & Pattern */}
              <linearGradient id="landGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1e3342" />
                <stop offset="100%" stopColor="#152632" />
              </linearGradient>

              {/* Seismic Survey Grid Hatch */}
              <pattern id="seismicPattern" width="28" height="28" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="28" y2="28" stroke="rgba(56, 189, 248, 0.12)" strokeWidth="1" />
                <line x1="28" y1="0" x2="0" y2="28" stroke="rgba(56, 189, 248, 0.08)" strokeWidth="1" />
              </pattern>

              {/* Turonian Fan Gradient */}
              <linearGradient id="fanTuronianGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>

              {/* Top Cenomanian Fan Gradient */}
              <linearGradient id="fanTopGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>

              {/* Upper Cenomanian Fan Gradient */}
              <linearGradient id="fanUpperGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>

              {/* Luminous Glow Filter */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Ocean Floor Canvas Base */}
            <rect x="470" y="100" width="1530" height="1400" fill="url(#oceanBathymetry)" />

            {/* Latitude & Longitude Graticule Grid */}
            <g className="m-graticule" opacity="0.35">
              <line x1="470" y1="350" x2="2000" y2="350" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 6" />
              <line x1="470" y1="650" x2="2000" y2="650" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 6" />
              <line x1="470" y1="950" x2="2000" y2="950" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 6" />
              <line x1="470" y1="1250" x2="2000" y2="1250" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 6" />

              <line x1="750" y1="100" x2="750" y2="1500" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 6" />
              <line x1="1050" y1="100" x2="1050" y2="1500" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 6" />
              <line x1="1350" y1="100" x2="1350" y2="1500" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 6" />
              <line x1="1650" y1="100" x2="1650" y2="1500" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 6" />

              <text x="485" y="345" className="m-coord">5°00&apos;N</text>
              <text x="485" y="645" className="m-coord">4°30&apos;N</text>
              <text x="485" y="945" className="m-coord">4°00&apos;N</text>
              <text x="485" y="1245" className="m-coord">3°30&apos;N</text>

              <text x="755" y="1485" className="m-coord">9°00&apos;W</text>
              <text x="1055" y="1485" className="m-coord">8°30&apos;W</text>
              <text x="1355" y="1485" className="m-coord">8°00&apos;W</text>
              <text x="1655" y="1485" className="m-coord">7°30&apos;W</text>
            </g>

            {/* Basin Play Fairway Outline */}
            <path d={P.basin} className="m-basin" />

            {/* Depth Contours (Isobaths) */}
            <path d={P.c1000} className="m-contour m-contour--1000" />
            <path d={P.c2000} className="m-contour m-contour--2000" />
            <path d={P.c3000} className="m-contour m-contour--3000" />

            {/* Contour depth labels with pill backgrounds */}
            <g className="m-contour-tag" transform="translate(1040, 442)">
              <rect x="-8" y="-14" width="76" height="20" rx="4" fill="rgba(10,24,36,0.85)" stroke="rgba(56,189,248,0.3)" />
              <text x="30" y="0" textAnchor="middle" className="m-text m-text--contour">1,000 m</text>
            </g>
            <g className="m-contour-tag" transform="translate(1000, 596)">
              <rect x="-8" y="-14" width="76" height="20" rx="4" fill="rgba(10,24,36,0.85)" stroke="rgba(14,165,233,0.3)" />
              <text x="30" y="0" textAnchor="middle" className="m-text m-text--contour">2,000 m</text>
            </g>
            <g className="m-contour-tag" transform="translate(640, 706)">
              <rect x="-8" y="-14" width="76" height="20" rx="4" fill="rgba(10,24,36,0.85)" stroke="rgba(2,132,199,0.3)" />
              <text x="30" y="0" textAnchor="middle" className="m-text m-text--contour">3,000 m</text>
            </g>

            {/* 3D Seismic Survey Polygons */}
            <path d={P.seismic} fill="url(#seismicPattern)" className="m-seismic-fill" />
            <path
              d={P.seismic}
              className={`m-seismic ${on("seismic")}`}
              onClick={() => setActive("seismic")}
              role="button"
              tabIndex={0}
              aria-label="3D Seismic Survey 6,167 km²"
            />

            {/* Exploration Blocks LB-26, LB-30, LB-31 */}
            {(["lb26", "lb30", "lb31"] as const).map((b) => (
              <g key={b} className={`m-block-group ${on(b)}`}>
                <path
                  d={P[b]}
                  className={`m-block ${on(b)}`}
                  onClick={() => setActive(b)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Exploration Block ${b.toUpperCase()}`}
                />
              </g>
            ))}

            {/* Cretaceous Turbidite Fan Systems */}
            <g
              className={`m-fans ${on("fans")}`}
              onClick={() => setActive("fans")}
              role="button"
              tabIndex={0}
              aria-label="Cretaceous fan systems"
            >
              {/* Upper Cenomanian */}
              <path d={P.apollo} className="m-fan m-fan--upper" fill="url(#fanUpperGrad)" />
              <path d={P.zeus} className="m-fan m-fan--upper" fill="url(#fanUpperGrad)" />

              {/* Top Cenomanian */}
              <path d={P.thea} className="m-fan m-fan--top" fill="url(#fanTopGrad)" />
              <path d={P.diana} className="m-fan m-fan--top" fill="url(#fanTopGrad)" />

              {/* Turonian */}
              <path d={P.saturn} className="m-fan m-fan--turonian" fill="url(#fanTuronianGrad)" />
              <path d={P.neptune} className="m-fan m-fan--turonian" fill="url(#fanTuronianGrad)" />
            </g>

            {/* Onshore Liberia Landmass & Coastline */}
            <path d={P.land} className="m-land" fill="url(#landGrad)" />
            <path d={P.coast} className="m-coast" />

            {/* Onshore & Geological Typography */}
            <g className="m-labels">
              {/* Liberia Title Block */}
              <g transform="translate(1480, 230)">
                <circle cx="-16" cy="-10" r="4" fill="#34d399" />
                <text x="0" y="0" className="m-text m-text--country">LIBERIA</text>
                <text x="0" y="24" className="m-text m-text--country-sub">WEST AFRICAN COASTLINE</text>
              </g>

              {/* Harper Basin Label */}
              <g transform="translate(1720, 910)">
                <text x="0" y="0" className="m-text m-text--basin">HARPER BASIN</text>
                <text x="0" y="22" className="m-text m-text--basin-sub">DEEPWATER CRETACEOUS PLAY</text>
              </g>

              {/* Block Identifiers */}
              <g className={`m-label-block ${on("lb26")}`} onClick={() => setActive("lb26")}>
                <rect x="1038" y="470" width="100" height="34" rx="6" className="m-label-bg" />
                <text x="1088" y="493" className="m-text m-text--block">LB-26</text>
              </g>

              <g className={`m-label-block ${on("lb30")}`} onClick={() => setActive("lb30")}>
                <rect x="737" y="1235" width="100" height="34" rx="6" className="m-label-bg" />
                <text x="787" y="1258" className="m-text m-text--block">LB-30</text>
              </g>

              <g className={`m-label-block ${on("lb31")}`} onClick={() => setActive("lb31")}>
                <rect x="1038" y="1235" width="100" height="34" rx="6" className="m-label-bg" />
                <text x="1088" y="1258" className="m-text m-text--block">LB-31</text>
              </g>

              {/* Fan Feature Labels with Depth / Period Tags */}
              <g className="m-fan-labels">
                <text x="710" y="1065" className="m-text m-text--fan">Saturn</text>
                <text x="1070" y="1005" className="m-text m-text--fan">Neptune</text>
                <text x="835" y="800" className="m-text m-text--fan">Thea</text>
                <text x="1130" y="955" className="m-text m-text--fan">Diana</text>
                <text x="835" y="1085" className="m-text m-text--fan">Apollo</text>
                <text x="1265" y="795" className="m-text m-text--fan">Zeus</text>
              </g>
            </g>

            {/* Cartographic Compass Rose */}
            <g className="m-compass" transform="translate(560, 200)">
              <circle cx="0" cy="0" r="30" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="2" fill="#38bdf8" />
              <path d="M0 -26 L6 -6 L0 0 L-6 -6 Z" fill="#38bdf8" />
              <path d="M0 26 L6 6 L0 0 L-6 6 Z" fill="rgba(255,255,255,0.3)" />
              <path d="M-26 0 L-6 6 L0 0 L-6 -6 Z" fill="rgba(255,255,255,0.3)" />
              <path d="M26 0 L6 6 L0 0 L6 -6 Z" fill="rgba(255,255,255,0.3)" />
              <text x="0" y="-32" textAnchor="middle" className="m-compass-text">N</text>
            </g>

            {/* Precision Nautical Scale Bar */}
            <g className="m-scale" transform="translate(1500, 1420)">
              <rect x="-12" y="-36" width="374" height="48" rx="6" fill="rgba(10,24,36,0.85)" stroke="rgba(255,255,255,0.1)" />
              <path d="M0 0 H350" stroke="#38bdf8" strokeWidth="2.5" />
              <line x1="0" y1="-6" x2="0" y2="6" stroke="#38bdf8" strokeWidth="2" />
              <line x1="175" y1="-4" x2="175" y2="4" stroke="#38bdf8" strokeWidth="1.5" />
              <line x1="350" y1="-6" x2="350" y2="6" stroke="#38bdf8" strokeWidth="2" />
              <text x="0" y="-12" textAnchor="start">0</text>
              <text x="175" y="-12" textAnchor="middle">25 km</text>
              <text x="350" y="-12" textAnchor="end">50 km</text>
            </g>
          </svg>
        </div>

        {/* Tactical Inset Mini-Globe */}
        <div className="harper__locator" aria-hidden>
          <div className="loc-label">REGIONAL CONTEXT</div>
          <svg viewBox="0 0 300 260">
            <rect width="300" height="260" fill="#0b1b26" rx="6" />
            <path d={landPath} className="loc-land" />
            <circle cx={harper[0]} cy={harper[1]} r="6" className="loc-dot" />
            <circle cx={harper[0]} cy={harper[1]} r="14" className="loc-pulse" />
            <text x={harper[0] + 12} y={harper[1] + 24} className="loc-text">
              Harper Basin
            </text>
          </svg>
        </div>

        {/* High-Tech Frosted Interactive Legend Bar */}
        <figcaption className="harper__legend">
          <div className="harper__legend-item">
            <span className="lg lg--turonian" />
            <span>Turonian Fans (Saturn · Neptune)</span>
          </div>
          <div className="harper__legend-item">
            <span className="lg lg--top" />
            <span>Top Cenomanian (Thea · Diana)</span>
          </div>
          <div className="harper__legend-item">
            <span className="lg lg--upper" />
            <span>Upper Cenomanian (Apollo · Zeus)</span>
          </div>
          <div className="harper__legend-item">
            <span className="lg lg--seismic" />
            <span>3D Seismic Survey (6,167 km²)</span>
          </div>
          <div className="harper__legend-item">
            <span className="lg lg--contour" />
            <span>Water Depth (1,000m – 3,000m)</span>
          </div>
        </figcaption>
      </figure>

      {/* Right Control & Exploration Details Panel */}
      <div className="harper__panel">
        <div className="harper__panel-header">
          <span className="harper__panel-badge">RESERVOIR & LICENCE SELECTOR</span>
          <h3 className="h4 harper__panel-title">Explore Subsurface Features</h3>
        </div>

        <div className="harper__tabs" role="tablist" aria-label="Map features">
          {tabs.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              id={`tab-${s.id}`}
              aria-selected={active === s.id}
              aria-controls="harper-detail"
              className={`harper__tab-btn ${active === s.id ? "is-active" : ""}`}
              onClick={() => setActive(s.id)}
            >
              <div className="harper__tab-info">
                <span className="harper__tab-kicker">{s.kicker}</span>
                <span className="harper__tab-name">{s.title}</span>
              </div>
              <span className="harper__tab-status" />
            </button>
          ))}
        </div>

        {/* Selected Layer Detail Card */}
        <div
          id="harper-detail"
          role="tabpanel"
          aria-labelledby={`tab-${spot.id}`}
          className="harper__detail"
          key={spot.id}
        >
          <div className="harper__detail-badge">
            <span>{spot.kicker}</span>
          </div>
          <h4 className="harper__detail-title">{spot.title}</h4>
          <p className="harper__detail-desc">{spot.body}</p>

          {spot.facts && (
            <div className="harper__facts-grid">
              {spot.facts.map(([k, v]) => (
                <div key={k} className="harper__fact-card">
                  <span className="harper__fact-k">{k}</span>
                  <span className="harper__fact-v">{v}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          className="btn btn--secondary btn--on-light harper__official-btn"
          onClick={() => setLightbox(true)}
        >
          <span>View Official LPRA-003 Licence Map</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M1 5V1h4M13 9v4H9M1 1l5 5M13 13L8 8" />
          </svg>
        </button>
      </div>

      {/* High-Resolution Official Map Lightbox */}
      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Official RL-003 licence map"
          onClick={() => setLightbox(false)}
        >
          <figure onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/rl-003-licence-map.png"
              alt="Official map of Reconnaissance Licence LPRA-003 showing Blocks LB-26, LB-30 and LB-31, the 3D seismic outline and the lead inventory as of April 2025"
            />
            <figcaption>
              Map showing the location of Reconnaissance License No. LPRA-003, its component Blocks LB-26, LB-30 and LB-31,
              and the lead inventory as of April 2025. Source: BluEnergies Ltd.
            </figcaption>
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
    </div>
  );
}
