"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
 * Geometry is traced from the company's official licence map
 * ("Map showing the location of Reconnaissance License No. LPRA-003 … as of April 2025"),
 * using that map's own pixel space. It is a stylised redraw: the official map is one click
 * away from the panel.
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

type Spot = { id: string; x: number; y: number; title: string; kicker: string; body: string; facts?: [string, string][] };

const spots: Spot[] = [
  {
    id: "lb30",
    x: 787, y: 1180,
    kicker: "Block",
    title: "LB-30",
    body: "Deepwater basin floor fans are identified here on 3D seismic, including the Turonian Saturn fan, the Cenomanian Thea fan and the Apollo fan, which extends into LB-31.",
    facts: [["Licence", "RL-003"], ["Status", "Fans identified"]],
  },
  {
    id: "lb31",
    x: 1088, y: 1180,
    kicker: "Block",
    title: "LB-31",
    body: "The Turonian Neptune fan and the Cenomanian Diana and Zeus fans lie here. Like LB-30, this block hosts fans where independently certified prospective resource potential has been recognised.",
    facts: [["Licence", "RL-003"], ["Status", "Fans identified"]],
  },
  {
    id: "lb26",
    x: 1088, y: 560,
    kicker: "Block",
    title: "LB-26",
    body: "The northernmost block, closest to shore. The company reports that an assessment of Block LB-26 is underway.",
    facts: [["Licence", "RL-003"], ["Status", "Assessment underway"]],
  },
  {
    id: "seismic",
    x: 1440, y: 880,
    kicker: "Dataset",
    title: "3D seismic outline",
    body: "Survey acquired by TGS in 2013, covering the majority of the blocks. The full dataset is now being reprocessed by TGS on behalf of BluEnergies and TotalEnergies.",
    facts: [["Coverage", "6,167 km²"], ["Reprocessing", ">50% (Jul 2026)"]],
  },
  {
    id: "fans",
    x: 975, y: 905,
    kicker: "Play",
    title: "Cretaceous fan systems",
    body: "Seven Cretaceous fan systems are identified across Cenomanian and Turonian intervals. Six of them, all in LB-30 and LB-31, carry independently certified, unrisked, recoverable prospective resource potential (report dated March 28, 2025).",
    facts: [["Intervals", "Cenomanian · Turonian"], ["Certified fans", "6"]],
  },
];

export default function HarperMap() {
  const [active, setActive] = useState<string>("fans");
  const [lightbox, setLightbox] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const spot = spots.find((s) => s.id === active)!;
  const blockActive = (id: string) => (active === id ? "is-active" : "");

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      svg.classList.add("is-drawn");
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: svg, start: "top 75%" } });
      svg.querySelectorAll<SVGGeometryElement>(".draw").forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      tl.to(".map-coast", { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" })
        .from(".map-land", { autoAlpha: 0, duration: 1.2 }, 0.4)
        .to(".map-basin", { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" }, 0.3)
        .from(".map-basin-fill", { autoAlpha: 0, duration: 1.2 }, 1)
        .to(".map-block", { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut", stagger: 0.15 }, 0.9)
        .call(() => svg.classList.add("is-drawn"), [], 1.6)
        .from(".map-seismic", { autoAlpha: 0, duration: 1 }, 2.2)
        .from(".map-label, .map-contour", { autoAlpha: 0, duration: 0.8, stagger: 0.04 }, 2.0)
        .from(".map-spot", { autoAlpha: 0, scale: 0, transformOrigin: "50% 50%", duration: 0.7, stagger: 0.08, ease: "back.out(2)" }, 2.4);
    }, svg);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <div className="harper">
      <div className="harper__map">
        <div className="harper__map-head">
          <span className="mono-label">RL-003 · Harper basin, offshore Liberia</span>
          <span className="mono-label harper__live"><i aria-hidden /> Interactive</span>
        </div>

        <svg ref={svgRef} viewBox="470 100 1530 1400" className="harper__svg" role="img" aria-labelledby="map-title map-desc">
          <title id="map-title">Map of Reconnaissance Licence RL-003, Harper basin, offshore Liberia</title>
          <desc id="map-desc">
            Blocks LB-26, LB-30 and LB-31 lie offshore Liberia within the Harper basin. Cretaceous fan systems sit in Blocks LB-30
            and LB-31 inside the 3D seismic survey outline. The map also shows the 1,000, 2,000 and 3,000 metre water depth contours.
          </desc>
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M100 0H0V100" fill="none" stroke="currentColor" strokeWidth="0.6" />
            </pattern>
            <linearGradient id="fanDeep" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#1677A8" />
              <stop offset="1" stopColor="#0E4F74" />
            </linearGradient>
            <radialGradient id="basinGlow" cx="0.45" cy="0.55" r="0.6">
              <stop offset="0" stopColor="#1677A8" stopOpacity="0.22" />
              <stop offset="1" stopColor="#1677A8" stopOpacity="0.04" />
            </radialGradient>
          </defs>

          <rect x="470" y="100" width="1530" height="1400" fill="url(#grid)" className="map-grid" />

          <path d={P.land} className="map-land" />
          <path d={P.coast} className="map-coast draw" />

          <path d={P.basin} className="map-basin-fill" fill="url(#basinGlow)" />
          <path d={P.basin} className="map-basin draw" />

          <path d={P.c1000} className="map-contour" />
          <path d={P.c2000} className="map-contour" />
          <path d={P.c3000} className="map-contour" />
          <text x="1050" y="458" className="map-contour-label map-label">1,000 m</text>
          <text x="1010" y="612" className="map-contour-label map-label">2,000 m</text>
          <text x="650" y="722" className="map-contour-label map-label">3,000 m</text>

          {(["lb26", "lb30", "lb31"] as const).map((b) => (
            <path
              key={b}
              d={P[b]}
              className={`map-block draw ${blockActive(b)}`}
              onMouseEnter={() => setActive(b)}
              onClick={() => setActive(b)}
            />
          ))}

          <g className={`map-fans ${active === "fans" ? "is-active" : ""}`}>
            <path d={P.apollo} className="map-fan map-fan--upper" />
            <path d={P.zeus} className="map-fan map-fan--upper" />
            <path d={P.thea} className="map-fan map-fan--top" />
            <path d={P.diana} className="map-fan map-fan--top" />
            <path d={P.saturn} className="map-fan map-fan--turonian" fill="url(#fanDeep)" />
            <path d={P.neptune} className="map-fan map-fan--turonian" fill="url(#fanDeep)" />
          </g>

          <path d={P.seismic} className={`map-seismic ${active === "seismic" ? "is-active" : ""}`} />

          <g className="map-labels">
            <text x="1500" y="250" className="map-label map-label--country">LIBERIA</text>
            <text x="1690" y="880" className="map-label map-label--basin">HARPER</text>
            <text x="1690" y="940" className="map-label map-label--basin">BASIN</text>
            <text x="1088" y="650" className="map-label map-label--block">LB-26</text>
            <text x="787" y="1270" className="map-label map-label--block">LB-30</text>
            <text x="1088" y="1270" className="map-label map-label--block">LB-31</text>
            <text x="720" y="1060" className="map-label map-label--fan">Saturn</text>
            <text x="1072" y="1000" className="map-label map-label--fan">Neptune</text>
            <text x="842" y="800" className="map-label map-label--fan">Thea</text>
            <text x="1125" y="955" className="map-label map-label--fan">Diana</text>
            <text x="842" y="1080" className="map-label map-label--fan">Apollo</text>
            <text x="1262" y="790" className="map-label map-label--fan">Zeus</text>
            <text x="1445" y="760" className="map-label map-label--seismic" transform="rotate(76 1445 760)">3D OUTLINE</text>
          </g>

          {/* scale bar: 350 px = 50 km on the source map */}
          <g className="map-scale map-label" transform="translate(1440 1420)">
            <path d="M0 0V-12M0 -6H350M350 0V-12M175 -3V-9" />
            <text x="0" y="28">0</text>
            <text x="175" y="28" textAnchor="middle">25</text>
            <text x="350" y="28" textAnchor="end">50 km</text>
          </g>
          <g className="map-north map-label" transform="translate(1920 1250)">
            <path d="M0 -40 L12 0 L0 -8 L-12 0 Z" />
            <text x="0" y="28" textAnchor="middle">N</text>
          </g>

          {spots.map((s) => (
            <g
              key={s.id}
              className={`map-spot ${active === s.id ? "is-active" : ""}`}
              transform={`translate(${s.x} ${s.y})`}
              tabIndex={0}
              role="button"
              aria-label={`${s.kicker}: ${s.title}`}
              aria-pressed={active === s.id}
              onMouseEnter={() => setActive(s.id)}
              onFocus={() => setActive(s.id)}
              onClick={() => setActive(s.id)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setActive(s.id))}
            >
              <circle r="34" className="map-spot__halo" />
              <circle r="11" className="map-spot__core" />
              <circle r="22" className="map-spot__ring" />
            </g>
          ))}
        </svg>

        <div className="harper__locator" aria-hidden>
          <svg viewBox="0 0 300 260">
            <path d={landPath} className="loc-land" />
            <path d={coastPath} className="loc-coast" />
            <circle cx={harper[0]} cy={harper[1]} r="16" className="loc-ring" />
            <circle cx={harper[0]} cy={harper[1]} r="4" className="loc-dot" />
            <text x={harper[0] + 22} y={harper[1] + 30} className="loc-text">Harper basin</text>
            <text x="150" y="70" className="loc-text loc-text--muted">West Africa</text>
            <text x="40" y="225" className="loc-text loc-text--muted">Atlantic Ocean</text>
          </svg>
        </div>

        <ul className="harper__legend" aria-label="Legend">
          <li><i className="lg lg--turonian" /> Turonian · Saturn &amp; Neptune</li>
          <li><i className="lg lg--top" /> Top Cenomanian · Thea &amp; Diana</li>
          <li><i className="lg lg--upper" /> Upper Cenomanian · Apollo &amp; Zeus</li>
          <li><i className="lg lg--seismic" /> 3D seismic outline</li>
        </ul>
      </div>

      <aside className="harper__panel" aria-live="polite">
        <div className="harper__tabs" role="tablist" aria-label="Map features">
          {spots.map((s) => (
            <button key={s.id} role="tab" aria-selected={active === s.id} className={active === s.id ? "is-active" : ""} onClick={() => setActive(s.id)}>
              {s.title}
            </button>
          ))}
        </div>
        <div className="harper__card" key={spot.id}>
          <span className="mono-label">{spot.kicker}</span>
          <h3>{spot.title}</h3>
          <p>{spot.body}</p>
          {spot.facts && (
            <dl>
              {spot.facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="mono-label">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        <button className="harper__official" onClick={() => setLightbox(true)}>
          <span>View the official licence map</span>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M1 5V1h4M13 9v4H9M1 1l5 5M13 13L8 8" stroke="currentColor" fill="none" strokeWidth="1.2" /></svg>
        </button>
      </aside>

      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Official RL-003 licence map" onClick={() => setLightbox(false)}>
          <figure onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/rl-003-licence-map.png" alt="Official map of Reconnaissance Licence LPRA-003 showing Blocks LB-26, LB-30 and LB-31, the 3D seismic outline and the lead inventory as of April 2025" />
            <figcaption>
              Map showing the location of Reconnaissance License No. LPRA-003, its component Blocks LB-26, LB-30 and LB-31, and the lead
              inventory as of April 2025. Source: BluEnergies Ltd.
            </figcaption>
            <button className="lightbox__close" onClick={() => setLightbox(false)} autoFocus>Close</button>
          </figure>
        </div>
      )}
    </div>
  );
}
