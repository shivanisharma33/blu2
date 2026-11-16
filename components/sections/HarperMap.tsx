"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";

/*
 * Geometry is traced from the company's official licence map
 * ("Map showing the location of Reconnaissance License No. LPRA-003 … as of April 2025"),
 * in that map's own pixel space (2203 × 1680, where 50 km ≈ 385 units).
 * It is a stylised redraw: the official map opens in a lightbox.
 */
const KM50 = 385;

const P = {
  coast:
    "M700,0 L730,20 L790,38 L830,70 L870,105 L900,135 L950,160 L1000,178 L1060,200 L1120,232 L1180,265 L1240,298 L1300,330 L1360,362 L1430,388 L1500,404 L1580,420 L1660,440 L1740,468 L1800,494 L1840,515 L1855,545 L1890,575 L1960,592 L2040,600 L2140,606 L2260,606",
  basin:
    "M445,880 L1135,425 L1372,368 L2105,660 L2175,925 L2135,1180 L1675,1375 L1365,1425 L1195,1450 L850,1600 L680,1615 L560,1330 L440,1010 Z",
  lb26: "M1028,185 L1368,368 L1368,810 L1028,810 Z",
  lb30: "M707,638 L1026,638 L1030,1460 L707,1380 Z",
  lb31: "M1030,810 L1368,810 L1368,1425 L1295,1432 L1272,1525 L1030,1460 Z",
  seismic: "M905,515 L1645,738 L1515,1265 L1320,1268 L750,1130 Z",
  c1000:
    "M1045,565 C1070,530 1110,518 1150,522 C1200,528 1250,512 1300,522 C1335,530 1345,560 1348,600 C1352,630 1375,640 1400,612 C1425,598 1445,640 1462,668 C1472,684 1485,690 1495,690",
  c2000:
    "M708,700 C740,722 782,746 830,735 C868,726 880,772 918,786 C962,786 1002,748 1040,718 C1100,700 1200,714 1300,712 C1302,740 1300,758 1318,764 C1345,768 1365,740 1392,758 C1410,772 1412,812 1432,835",
  c3000: "M712,800 C738,822 768,832 800,826 C818,822 830,812 840,806",
  apollo:
    "M868,1100 L880,1050 L915,1005 L960,970 L1010,955 L1040,945 L1055,890 L1062,860 L1080,872 L1092,902 L1112,920 L1150,925 L1182,914 L1212,900 L1232,918 L1182,942 L1150,962 L1120,1002 L1062,1060 L1022,1112 L1010,1146 L960,1156 L910,1156 L876,1136 Z",
  zeus:
    "M1240,1035 L1246,990 L1270,960 L1300,930 L1310,882 L1300,850 L1288,828 L1278,800 L1258,770 L1272,760 L1302,780 L1332,790 L1364,770 L1386,765 L1380,782 L1355,802 L1330,830 L1322,852 L1342,882 L1360,920 L1370,960 L1350,972 L1330,1000 L1300,995 L1276,1010 Z",
  saturn:
    "M752,1130 L775,1060 L800,990 L835,950 L870,915 L888,862 L902,850 L906,874 L916,880 L936,860 L946,845 L956,850 L950,876 L930,915 L900,942 L880,986 L850,1020 L820,1060 L800,1095 L775,1126 Z",
  thea:
    "M832,1002 L848,975 L872,950 L902,935 L922,910 L946,890 L972,884 L1010,890 L1032,896 L1036,906 L1020,916 L990,922 L960,936 L936,946 L926,976 L902,1000 L882,1036 L870,1056 L850,1040 Z",
  neptune:
    "M1030,1140 L1020,1100 L1005,1060 L1030,1020 L1070,990 L1090,960 L1110,920 L1130,880 L1145,846 L1160,830 L1200,830 L1215,810 L1225,790 L1226,770 L1240,760 L1249,776 L1240,800 L1236,830 L1240,860 L1230,885 L1200,895 L1176,915 L1160,960 L1150,1010 L1165,1040 L1170,1060 L1130,1090 L1080,1116 Z",
  diana:
    "M1022,1060 L1016,1040 L1032,1020 L1062,1024 L1100,1020 L1150,1015 L1186,1010 L1216,1015 L1226,1030 L1210,1040 L1190,1046 L1170,1060 L1130,1076 L1100,1080 L1060,1080 Z",
};
const landPath = `${P.coast} L2260,0 Z`;

type FanKey = "apollo" | "zeus" | "saturn" | "thea" | "neptune" | "diana";
type Interval = "turonian" | "top" | "upper";
const FANS: { key: FanKey; name: string; interval: Interval; label: [number, number]; tip: [number, number] }[] = [
  { key: "apollo", name: "Apollo", interval: "upper", label: [905, 1236], tip: [972, 1150] },
  { key: "zeus", name: "Zeus", interval: "upper", label: [1452, 888], tip: [1352, 872] },
  { key: "saturn", name: "Saturn", interval: "turonian", label: [600, 1050], tip: [760, 1092] },
  { key: "neptune", name: "Neptune", interval: "turonian", label: [1206, 1192], tip: [1120, 1100] },
  { key: "thea", name: "Thea", interval: "top", label: [962, 808], tip: [994, 888] },
  { key: "diana", name: "Diana", interval: "top", label: [1268, 1110], tip: [1218, 1040] },
];
const INTERVAL_NAME: Record<Interval, string> = {
  turonian: "Turonian",
  top: "Top Cenomanian",
  upper: "Upper Cenomanian",
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
const locCoast = coastLL.map((p, i) => `${i ? "L" : "M"}${proj(p)[0].toFixed(1)},${proj(p)[1].toFixed(1)}`).join(" ");
const locLand = `${locCoast} L300,${proj([14, -6.5])[1].toFixed(1)} L300,0 L${proj([-17, 22])[0].toFixed(1)},0 Z`;
const harper = proj([-7.9, 3.9]);

/* ------------------------------------------------------------- content -- */
type Spot = {
  id: string;
  title: string;
  short: string;
  kicker: string;
  body: string;
  facts: [string, string][];
  box: [number, number, number, number]; // x0, y0, x1, y1 in map units
};

const spots: Spot[] = [
  {
    id: "fans",
    short: "Fan Systems",
    kicker: "Play Fairway",
    title: "Cretaceous Fan Systems",
    body: "Seven Cretaceous fan systems are identified across Cenomanian and Turonian intervals. Six of them, all in Blocks LB-30 and LB-31, carry independently certified, unrisked, recoverable prospective resource potential (report dated March 28, 2025).",
    facts: [
      ["Intervals", "Cenomanian · Turonian"],
      ["Certified Fans", "6 Independently Audited"],
      ["Source Rock", "Cretaceous Marine Shale"],
      ["Gross Thickness", "Up to 300m Reservoir Columns"],
    ],
    box: [560, 760, 1520, 1250],
  },
  {
    id: "lb30",
    short: "LB-30",
    kicker: "Licence Block",
    title: "Block LB-30",
    body: "Deepwater basin floor fans are identified here on 3D seismic, including the Turonian Saturn fan, the Cenomanian Thea fan, and the giant Apollo fan, which extends eastward into LB-31.",
    facts: [
      ["Licence", "RL-003 (Liberia)"],
      ["Working Interest", "35% BluEnergies · 65% TotalEnergies"],
      ["Water Depths", "1,500 m – 3,200 m"],
      ["Status", "Fans Identified · Drill Target Prep"],
    ],
    box: [707, 638, 1030, 1460],
  },
  {
    id: "lb31",
    short: "LB-31",
    kicker: "Licence Block",
    title: "Block LB-31",
    body: "The Turonian Neptune fan and the Cenomanian Diana and Zeus fans lie here. Like LB-30, this block hosts high-confidence fan systems with multi-hundred-million barrel prospective resource potential.",
    facts: [
      ["Licence", "RL-003 (Liberia)"],
      ["Working Interest", "35% BluEnergies · 65% TotalEnergies"],
      ["Water Depths", "1,800 m – 3,400 m"],
      ["Status", "Fans Identified · Drill Target Prep"],
    ],
    box: [1030, 810, 1368, 1525],
  },
  {
    id: "lb26",
    short: "LB-26",
    kicker: "Licence Block",
    title: "Block LB-26",
    body: "The northernmost block, closest to the Liberian coastline in shallow-to-intermediate water depths. An intensive geological and geophysical assessment of Block LB-26 is currently underway.",
    facts: [
      ["Licence", "RL-003 (Liberia)"],
      ["Working Interest", "35% BluEnergies · 65% TotalEnergies"],
      ["Water Depths", "500 m – 2,000 m"],
      ["Status", "Reprocessing & Interpretation Underway"],
    ],
    box: [1028, 185, 1368, 810],
  },
  {
    id: "seismic",
    short: "3D Seismic",
    kicker: "Subsurface Dataset",
    title: "3D Seismic Coverage (6,167 km²)",
    body: "High-resolution 3D seismic survey acquired by TGS, covering the core exploration fairway across Blocks LB-26, LB-30, and LB-31. The full volume has undergone state-of-the-art PSTM/PSDM reprocessing.",
    facts: [
      ["Coverage", "6,167 km² Full Fold"],
      ["Acquisition", "TGS Modern 3D Data"],
      ["Reprocessing", "Advanced PSTM/PSDM Fast-Track"],
      ["Resolution", "Stratigraphic-Grade Reservoir Imaging"],
    ],
    box: [750, 515, 1645, 1268],
  },
];

/* ------------------------------------------------------------- viewport -- */
type View = { x: number; y: number; w: number };
const BASE = { x: 400, y: 120, w: 1800, h: 1520 };
const RATIO = BASE.h / BASE.w;
const HOME: View = { x: BASE.x, y: BASE.y, w: BASE.w };
const MIN_W = 520;

const clampView = (v: View): View => {
  const w = Math.min(BASE.w, Math.max(MIN_W, v.w));
  const h = w * RATIO;
  return {
    w,
    x: Math.min(BASE.x + BASE.w - w, Math.max(BASE.x, v.x)),
    y: Math.min(BASE.y + BASE.h - h, Math.max(BASE.y, v.y)),
  };
};

const fitBox = ([x0, y0, x1, y1]: Spot["box"]): View => {
  const pad = 1.28;
  const w = Math.max((x1 - x0) * pad, ((y1 - y0) * pad) / RATIO);
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  return clampView({ w, x: cx - w / 2, y: cy - (w * RATIO) / 2 });
};

const ease = (t: number) => 1 - Math.pow(1 - t, 4);

type Layers = { fans: boolean; seismic: boolean; contours: boolean; blocks: boolean };

/* Pick a round scale-bar distance that renders at a comfortable length. */
function scaleBar(pxPerUnit: number) {
  const pxPerKm = (KM50 / 50) * pxPerUnit;
  const km = [5, 10, 20, 25, 50].reverse().find((d) => d * pxPerKm <= 150) ?? 5;
  return { km, px: km * pxPerKm };
}

const activate = (fn: () => void) => (e: ReactKeyboardEvent) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    fn();
  }
};

export default function HarperMap() {
  const [active, setActive] = useState<string>("fans");
  const [hover, setHover] = useState<string | null>(null);
  const [tip, setTip] = useState<{ x: number; y: number; label: string; sub?: string } | null>(null);
  const [layers, setLayers] = useState<Layers>({ fans: true, seismic: true, contours: true, blocks: true });
  const [view, setView] = useState<View>(HOME);
  const [wrapW, setWrapW] = useState(900);
  const [lightbox, setLightbox] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<View>(HOME);
  const animRef = useRef<number>(0);
  const drag = useRef<{ id: number; sx: number; sy: number; v: View; moved: boolean } | null>(null);
  const suppressClick = useRef(false);

  const spot = spots.find((s) => s.id === active)!;
  const zoom = BASE.w / view.w;
  const zoomed = zoom > 1.02;

  /* ---------------- smooth fly-to ---------------- */
  const flyTo = useCallback((target: View) => {
    cancelAnimationFrame(animRef.current);
    const to = clampView(target);
    const from = viewRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      viewRef.current = to;
      setView(to);
      return;
    }
    const start = performance.now();
    const dur = 900;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const k = ease(t);
      const v = {
        x: from.x + (to.x - from.x) * k,
        y: from.y + (to.y - from.y) * k,
        w: from.w + (to.w - from.w) * k,
      };
      viewRef.current = v;
      setView(v);
      if (t < 1) animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => () => cancelAnimationFrame(animRef.current), []);

  const select = useCallback(
    (id: string, focus = true) => {
      setActive(id);
      const s = spots.find((x) => x.id === id);
      if (id === "seismic") setLayers((l) => ({ ...l, seismic: true }));
      if (id === "fans") setLayers((l) => ({ ...l, fans: true }));
      if (id.startsWith("lb")) setLayers((l) => ({ ...l, blocks: true }));
      if (focus && s) flyTo(fitBox(s.box));
    },
    [flyTo],
  );

  const zoomBy = (f: number) => {
    const v = viewRef.current;
    const w = v.w / f;
    const cx = v.x + v.w / 2;
    const cy = v.y + (v.w * RATIO) / 2;
    flyTo({ w, x: cx - w / 2, y: cy - (w * RATIO) / 2 });
  };

  /* ---------------- container size (for scale bar & panning) ---------------- */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWrapW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* ---------------- drag to pan (only once zoomed in) ---------------- */
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 || viewRef.current.w >= BASE.w - 1) return;
    cancelAnimationFrame(animRef.current);
    drag.current = { id: e.pointerId, sx: e.clientX, sy: e.clientY, v: viewRef.current, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const wrap = wrapRef.current;
    if (wrap && !drag.current) {
      const r = wrap.getBoundingClientRect();
      if (tip) setTip((t) => (t ? { ...t, x: e.clientX - r.left, y: e.clientY - r.top } : t));
    }
    const d = drag.current;
    if (!d || d.id !== e.pointerId || !wrap) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (!d.moved && Math.hypot(dx, dy) < 5) return;
    if (!d.moved) {
      d.moved = true;
      wrap.setPointerCapture(e.pointerId);
      setTip(null);
    }
    const k = d.v.w / wrap.clientWidth;
    const v = clampView({ w: d.v.w, x: d.v.x - dx * k, y: d.v.y - dy * k });
    viewRef.current = v;
    setView(v);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    if (d?.moved) {
      suppressClick.current = true;
      setTimeout(() => (suppressClick.current = false), 0);
      wrapRef.current?.releasePointerCapture(e.pointerId);
    }
    drag.current = null;
  };

  const click = (id: string) => () => {
    if (suppressClick.current) return;
    select(id);
  };

  const showTip = (label: string, sub?: string) => (e: React.PointerEvent) => {
    if (drag.current?.moved) return;
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    setTip({ label, sub, x: e.clientX - r.left, y: e.clientY - r.top });
  };
  const hideTip = () => setTip(null);

  /* ---------------- lightbox ---------------- */
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const lit = (id: string) => [active === id ? "is-active" : "", hover === id ? "is-hover" : ""].join(" ");
  const sb = scaleBar(wrapW / view.w);
  const vb = `${view.x.toFixed(2)} ${view.y.toFixed(2)} ${view.w.toFixed(2)} ${(view.w * RATIO).toFixed(2)}`;
  const toggle = (k: keyof Layers) => setLayers((l) => ({ ...l, [k]: !l[k] }));
  const idx = spots.findIndex((s) => s.id === active);

  return (
    <div className="harper">
      {/* ================================================= Map ======= */}
      <figure className="harper__map" data-reveal="image">
        <div className="harper__hud">
          <div className="harper__hud-id">
            <span className="harper__beacon" aria-hidden />
            <span className="harper__hud-title">Harper Basin · RL-003</span>
            <span className="harper__hud-tag">Offshore Liberia</span>
          </div>
          <div className="harper__hud-meta">
            <span className="harper__hud-readout" aria-live="polite">
              <span>{spot.short}</span>
              <span className="harper__hud-dot" aria-hidden />
              <span>{zoom.toFixed(1)}×</span>
            </span>
            <button type="button" className="harper__hud-btn" onClick={() => setLightbox(true)}>
              <span>Official Map</span>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M1 5V1h4M13 9v4H9M1 1l5 5M13 13L8 8" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={wrapRef}
          className={`harper__stage ${zoomed ? "is-pannable" : ""}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={hideTip}
        >
          <svg viewBox={vb} className="harper__svg" role="group" aria-labelledby="map-title map-desc">
            <title id="map-title">Exploration map of Reconnaissance Licence RL-003, Harper basin, offshore Liberia</title>
            <desc id="map-desc">
              Blocks LB-26, LB-30 and LB-31 within the Harper basin offshore Liberia, with the 6,167 km² 3D seismic outline,
              1,000 to 3,000 m water-depth contours and the Turonian and Cenomanian basin floor fan systems. Select a feature
              to focus the map on it.
            </desc>

            <defs>
              <linearGradient id="hm-ocean" gradientUnits="userSpaceOnUse" x1="1900" y1="300" x2="500" y2="1600">
                <stop offset="0" stopColor="#f3f8fb" />
                <stop offset="1" stopColor="#fbfcfd" />
              </linearGradient>
              <radialGradient id="hm-shelf" gradientUnits="userSpaceOnUse" cx="1600" cy="380" r="700">
                <stop offset="0" stopColor="#cfe6f1" stopOpacity="0.7" />
                <stop offset="1" stopColor="#cfe6f1" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="hm-land" gradientUnits="userSpaceOnUse" x1="1200" y1="0" x2="1900" y2="600">
                <stop offset="0" stopColor="#6790ab" />
                <stop offset="1" stopColor="#557d98" />
              </linearGradient>
              <pattern id="hm-dots" width="22" height="22" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.1" fill="rgba(16,42,58,0.06)" />
              </pattern>
              <pattern id="hm-relief" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(-28)">
                <line x1="0" y1="0" x2="0" y2="16" stroke="rgba(255,255,255,0.07)" strokeWidth="2" />
              </pattern>
              <pattern id="hm-bins" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(16.8)">
                <path d="M24 0H0V24" fill="none" stroke="rgba(202,138,4,0.16)" strokeWidth="1" />
              </pattern>
              <clipPath id="hm-seis-clip">
                <path d={P.seismic} />
              </clipPath>
              <linearGradient id="hm-fan-turonian" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#4d7d9c" />
                <stop offset="1" stopColor="#2f5b78" />
              </linearGradient>
              <linearGradient id="hm-fan-top" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#8fd8da" />
                <stop offset="1" stopColor="#56b9be" />
              </linearGradient>
              <linearGradient id="hm-fan-upper" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#e6f5f8" />
                <stop offset="1" stopColor="#cbe7ee" />
              </linearGradient>
              <filter id="hm-soft" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="8" />
              </filter>
            </defs>

            {/* ---------- ocean ---------- */}
            <rect x="0" y="-200" width="2400" height="2000" fill="url(#hm-ocean)" />
            <rect x="0" y="-200" width="2400" height="2000" fill="url(#hm-shelf)" />
            <rect x="0" y="-200" width="2400" height="2000" fill="url(#hm-dots)" />

            {/* ---------- graticule frame ---------- */}
            <g className="hm-grid" aria-hidden>
              {[400, 700, 1000, 1300, 1600, 1900].map((x) => (
                <line key={`v${x}`} x1={x} y1="-200" x2={x} y2="1800" />
              ))}
              {[120, 420, 720, 1020, 1320, 1620].map((y) => (
                <line key={`h${y}`} x1="0" y1={y} x2="2400" y2={y} />
              ))}
            </g>

            {/* ---------- licence & basin ---------- */}
            <path d={P.basin} className="hm-basin" />
            <text x="742" y="602" className="hm-tag hm-tag--licence" aria-hidden>
              RL-003
            </text>

            {/* ---------- depth contours ---------- */}
            <g className={`hm-contours ${layers.contours ? "" : "is-off"}`} aria-hidden>
              <path d={P.c1000} className="hm-contour" />
              <path d={P.c2000} className="hm-contour hm-contour--mid" />
              <path d={P.c3000} className="hm-contour hm-contour--deep" />
              <text x="1182" y="508" className="hm-depth">1,000 m</text>
              <text x="1150" y="690" className="hm-depth">2,000 m</text>
              <text x="716" y="782" className="hm-depth">3,000 m</text>
            </g>

            {/* ---------- 3D seismic ---------- */}
            <g className={`hm-seismic ${layers.seismic ? "" : "is-off"} ${lit("seismic")}`}>
              <rect x="700" y="480" width="1000" height="840" fill="url(#hm-bins)" clipPath="url(#hm-seis-clip)" className="hm-seismic__bins" />
              <path
                d={P.seismic}
                className="hm-seismic__line"
                role="button"
                tabIndex={layers.seismic ? 0 : -1}
                aria-label="3D seismic survey, 6,167 km²"
                aria-pressed={active === "seismic"}
                onClick={click("seismic")}
                onKeyDown={activate(() => select("seismic"))}
                onPointerEnter={(e) => {
                  setHover("seismic");
                  showTip("3D Seismic Survey", "6,167 km² · TGS")(e);
                }}
                onPointerLeave={() => {
                  setHover(null);
                  hideTip();
                }}
              />
              <text x="1588" y="1090" transform="rotate(-76 1588 1090)" className="hm-tag hm-tag--seismic" aria-hidden>
                3D OUTLINE
              </text>
            </g>

            {/* ---------- licence blocks ---------- */}
            <g className={`hm-blocks ${layers.blocks ? "" : "is-off"}`}>
              {(["lb26", "lb30", "lb31"] as const).map((b) => (
                <path
                  key={b}
                  d={P[b]}
                  className={`hm-block ${lit(b)}`}
                  role="button"
                  tabIndex={layers.blocks ? 0 : -1}
                  aria-label={`Licence block ${b.toUpperCase().replace("LB", "LB-")}`}
                  aria-pressed={active === b}
                  onClick={click(b)}
                  onKeyDown={activate(() => select(b))}
                  onPointerEnter={(e) => {
                    setHover(b);
                    showTip(`Block ${b.toUpperCase().replace("LB", "LB-")}`, "RL-003 · 35% WI")(e);
                  }}
                  onPointerLeave={() => {
                    setHover(null);
                    hideTip();
                  }}
                />
              ))}
              <g aria-hidden className="hm-block-names">
                <text x="1198" y="398" className={`hm-block-name ${lit("lb26")}`}>LB-26</text>
                <text x="868" y="1352" className={`hm-block-name ${lit("lb30")}`}>LB-30</text>
                <text x="1199" y="1372" className={`hm-block-name ${lit("lb31")}`}>LB-31</text>
              </g>
            </g>

            {/* ---------- fan systems ---------- */}
            <g className={`hm-fans ${layers.fans ? "" : "is-off"} ${lit("fans")}`}>
              {FANS.map((f) => (
                <path
                  key={f.key}
                  d={P[f.key]}
                  fill={`url(#hm-fan-${f.interval})`}
                  className={`hm-fan hm-fan--${f.interval}`}
                  onClick={click("fans")}
                  onPointerEnter={(e) => {
                    setHover("fans");
                    showTip(`${f.name} Fan`, INTERVAL_NAME[f.interval])(e);
                  }}
                  onPointerLeave={() => {
                    setHover(null);
                    hideTip();
                  }}
                />
              ))}
              {/* keyboard / AT target for the whole fan group */}
              <rect
                x="740"
                y="760"
                width="650"
                height="400"
                className="hm-fans__hit"
                role="button"
                tabIndex={layers.fans ? 0 : -1}
                aria-label="Cretaceous fan systems: Saturn, Neptune, Thea, Diana, Apollo and Zeus"
                aria-pressed={active === "fans"}
                onKeyDown={activate(() => select("fans"))}
              />
              <g className="hm-callouts" aria-hidden>
                {FANS.map((f) => {
                  const w = f.name.length * 15 + 34;
                  return (
                    <g key={f.key} className={`hm-callout hm-callout--${f.interval}`}>
                      <line x1={f.tip[0]} y1={f.tip[1]} x2={f.label[0]} y2={f.label[1]} />
                      <circle cx={f.tip[0]} cy={f.tip[1]} r="4.5" />
                      <rect x={f.label[0] - w / 2} y={f.label[1] - 20} width={w} height="40" rx="20" />
                      <text x={f.label[0]} y={f.label[1] + 8}>
                        {f.name}
                      </text>
                    </g>
                  );
                })}
              </g>
            </g>

            {/* ---------- land ---------- */}
            <g aria-hidden>
              <path d={landPath} fill="url(#hm-land)" />
              <path d={landPath} fill="url(#hm-relief)" />
              <path d={P.coast} className="hm-surf" filter="url(#hm-soft)" />
              <path d={P.coast} className="hm-coast" />
              <text x="1560" y="196" transform="rotate(19 1560 196)" className="hm-country">
                LIBERIA
              </text>
              <text x="1928" y="960" className="hm-basin-name">HARPER</text>
              <text x="1928" y="1012" className="hm-basin-name">BASIN</text>
              <text x="1928" y="1050" className="hm-basin-sub">DEEPWATER CRETACEOUS PLAY</text>
            </g>
          </svg>

          {/* ---------- overlays ---------- */}
          <div className="harper__vignette" aria-hidden />

          <div className="harper__locator" aria-hidden>
            <svg viewBox="0 0 300 260">
              <path d={locLand} className="loc-land" />
              <path d={locCoast} className="loc-coast" />
              <circle cx={harper[0]} cy={harper[1]} r="22" className="loc-pulse" />
              <circle cx={harper[0]} cy={harper[1]} r="6" className="loc-dot" />
            </svg>
            <span className="loc-label">West Africa</span>
          </div>

          <div className="harper__compass" aria-hidden>
            <svg viewBox="0 0 40 40" width="40" height="40">
              <circle cx="20" cy="20" r="18" />
              <path d="M20 5 L24 20 L20 18 L16 20 Z" className="n" />
              <path d="M20 35 L24 20 L20 22 L16 20 Z" />
            </svg>
            <span>N</span>
          </div>

          <div className="harper__scale" aria-label={`Scale bar: ${sb.km} kilometres`}>
            <span className="harper__scale-bar" style={{ width: `${sb.px}px` }}>
              <i />
            </span>
            <span className="harper__scale-label">{sb.km} km</span>
          </div>

          <div className="harper__zoom" role="group" aria-label="Map zoom">
            <button type="button" onClick={() => zoomBy(1.5)} disabled={view.w <= MIN_W + 1} aria-label="Zoom in">
              <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M7 2v10M2 7h10" />
              </svg>
            </button>
            <button type="button" onClick={() => zoomBy(1 / 1.5)} disabled={!zoomed} aria-label="Zoom out">
              <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M2 7h10" />
              </svg>
            </button>
            <button type="button" onClick={() => flyTo(HOME)} disabled={!zoomed} aria-label="Reset map view">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <path d="M1.5 5V1.5H5M12.5 9v3.5H9M9 1.5h3.5V5M5 12.5H1.5V9" />
              </svg>
            </button>
          </div>

          {tip && (
            <div className="harper__tip" style={{ transform: `translate(${tip.x}px, ${tip.y}px)` }} aria-hidden>
              <strong>{tip.label}</strong>
              {tip.sub && <span>{tip.sub}</span>}
            </div>
          )}

          {zoomed && <span className="harper__hint" aria-hidden>Drag to pan</span>}
        </div>

        {/* ---------- legend / layer toggles ---------- */}
        <figcaption className="harper__legend">
          <span className="harper__legend-title">Layers</span>
          <button type="button" className="harper__layer" aria-pressed={layers.fans} onClick={() => toggle("fans")}>
            <span className="sw sw--stack" aria-hidden>
              <i className="sw--turonian" />
              <i className="sw--top" />
              <i className="sw--upper" />
            </span>
            Fan Systems
          </button>
          <button type="button" className="harper__layer" aria-pressed={layers.seismic} onClick={() => toggle("seismic")}>
            <span className="sw sw--seismic" aria-hidden />
            3D Seismic
          </button>
          <button type="button" className="harper__layer" aria-pressed={layers.blocks} onClick={() => toggle("blocks")}>
            <span className="sw sw--block" aria-hidden />
            Licence Blocks
          </button>
          <button type="button" className="harper__layer" aria-pressed={layers.contours} onClick={() => toggle("contours")}>
            <span className="sw sw--contour" aria-hidden />
            Water Depth
          </button>
          <span className="harper__legend-key" aria-hidden>
            <span><i className="sw--turonian" />Turonian</span>
            <span><i className="sw--top" />Top Cenomanian</span>
            <span><i className="sw--upper" />Upper Cenomanian</span>
          </span>
        </figcaption>
      </figure>

      {/* ================================================= Panel ===== */}
      <div className="harper__panel">
        <div className="harper__panel-header">
          <span className="harper__panel-badge">Interactive Licence Map</span>
          <h3 className="h4 harper__panel-title">Explore the subsurface</h3>
          <p className="harper__panel-hint">Select a feature to fly the map to it.</p>
        </div>

        <div className="harper__tabs" role="tablist" aria-label="Map features">
          {spots.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              id={`tab-${s.id}`}
              aria-selected={active === s.id}
              aria-controls="harper-detail"
              className={`harper__tab ${active === s.id ? "is-active" : ""}`}
              onClick={() => select(s.id)}
              onMouseEnter={() => setHover(s.id)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(s.id)}
              onBlur={() => setHover(null)}
            >
              <span className="harper__tab-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="harper__tab-info">
                <span className="harper__tab-kicker">{s.kicker}</span>
                <span className="harper__tab-name">{s.title}</span>
              </span>
              <svg className="harper__tab-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <path d="M6 3l5 5-5 5" />
              </svg>
            </button>
          ))}
        </div>

        <div id="harper-detail" role="tabpanel" aria-labelledby={`tab-${spot.id}`} className="harper__detail" key={spot.id}>
          <div className="harper__detail-top">
            <span className="harper__detail-badge">{spot.kicker}</span>
            <span className="harper__detail-count">
              {String(idx + 1).padStart(2, "0")} / {String(spots.length).padStart(2, "0")}
            </span>
          </div>
          <h4 className="harper__detail-title">{spot.title}</h4>
          <p className="harper__detail-desc">{spot.body}</p>
          <dl className="harper__facts-grid">
            {spot.facts.map(([k, v]) => (
              <div key={k} className="harper__fact-card">
                <dt className="harper__fact-k">{k}</dt>
                <dd className="harper__fact-v">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <button type="button" className="btn btn--secondary btn--on-light harper__official-btn" onClick={() => setLightbox(true)}>
          <span>View Official LPRA-003 Licence Map</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M1 5V1h4M13 9v4H9M1 1l5 5M13 13L8 8" />
          </svg>
        </button>
      </div>

      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Official RL-003 licence map" onClick={() => setLightbox(false)}>
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
            <button type="button" className="lightbox__close" onClick={() => setLightbox(false)} autoFocus>
              Close
            </button>
          </figure>
        </div>
      )}
    </div>
  );
}
