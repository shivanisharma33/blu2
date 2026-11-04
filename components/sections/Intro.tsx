import Image from "next/image";
import { Button } from "../ui/primitives";
import { routes } from "@/lib/content";

const stats = [
  {
    value: "30+",
    label: "Basins Evaluated",
    sub: "Data-led regional screening across conjugate Atlantic margins",
  },
  {
    value: "35%",
    label: "RL-003 Working Interest",
    sub: "Co-venturer with operator TotalEnergies (65%)",
  },
  {
    value: "6,167 km²",
    label: "3D Seismic Dataset",
    sub: "High-resolution subsurface coverage over Cretaceous fan systems",
  },
  {
    value: "TSXV: BLU",
    label: "Public Governance",
    sub: "Listed on TSX Venture & OTCQX (BLUGF) · Founded 2021",
  },
];

const pillars = [
  {
    title: "Strategy-Led Basin Selection",
    desc: "Rigorous geological screening across 30+ African and South American basins, targeting derisked Cretaceous fan systems with multi-billion barrel hydrocarbon potential.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    title: "Tier-1 Supermajor Partnership",
    desc: "Co-venturing alongside TotalEnergies SE on Licence RL-003 offshore Liberia, combining agile independent agility with world-class deepwater execution standards.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "High-Impact Acreage Scale",
    desc: "Securing ~40% of the undrilled Harper Basin across 8,924 km² with water depths of 500m to 3,500m, on trend with proven Equatorial Atlantic discovery fairways.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 20h20" />
        <path d="M5 20V8l7-5 7 5v12" />
        <path d="M9 12h6" />
        <path d="M12 9v6" />
      </svg>
    ),
  },
];

export default function Intro() {
  return (
    <section id="about" className="section intro" aria-labelledby="intro-title">
      <div className="container">
        {/* Top Header Block */}
        <div className="intro__header" data-reveal>
          <div className="intro__badge">
            <span className="intro__badge-dot" />
            <span className="intro__badge-text">ABOUT BLUENERGIES · DEEPWATER ATLANTIC MARGINS</span>
          </div>
          <h2 id="intro-title" className="h2 intro__headline">
            Turning Exploration Potential Into Proven Value.
          </h2>
        </div>

        {/* Narrative & Context Split */}
        <div className="intro__split" data-reveal>
          <div className="intro__lead-block">
            <p className="lead intro__lead-text">
              BluEnergies Ltd. is an agile deepwater exploration company focused on high-reward Cretaceous basin floor fan plays along the prolific West African Margin.
            </p>
            <div className="intro__actions">
              <Button href={routes.about} variant="primary" on="light">
                About Our Company
              </Button>
              <Button href={routes.overview} variant="secondary" on="light">
                Exploration Portfolio
              </Button>
            </div>
          </div>

          <div className="intro__story-block">
            <p>
              The company secured its flagship position in the Harper Basin offshore Liberia following a data-intensive evaluation of more than 30 African and South American basins. As one of the last remaining undrilled deepwater provinces containing the prolific Cretaceous fan play, the basin represents an exceptional frontier prize.
            </p>
            <p>
              Today, BluEnergies holds a 35% working interest in the RL-003 licence alongside operator TotalEnergies (65%). With strategic expansions including being top bidder for offshore lease acreage in the Gulf of America, BluEnergies continues to build a focused, high-impact exploration pipeline.
            </p>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="intro__stats-grid" data-reveal>
          {stats.map((s) => (
            <div key={s.label} className="intro__stat-card">
              <div className="intro__stat-value">{s.value}</div>
              <div className="intro__stat-label">{s.label}</div>
              <div className="intro__stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Strategic Pillars */}
        <div className="intro__pillars-grid" data-reveal>
          {pillars.map((p) => (
            <div key={p.title} className="intro__pillar-card">
              <div className="intro__pillar-icon">{p.icon}</div>
              <h3 className="h4 intro__pillar-title">{p.title}</h3>
              <p className="intro__pillar-desc">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Showcase Visual Media */}
        <figure className="intro__figure" data-reveal="image">
          <div className="intro__media-frame">
            <div className="media intro__media">
              <Image
                src="/images/ocean-horizon.jpg"
                alt="Open ocean stretching across the Harper Basin offshore Liberia"
                fill
                sizes="(max-width: 1360px) 100vw, 1320px"
                style={{ objectFit: "cover" }}
              />
              <div className="intro__media-gradient" />
            </div>

            {/* Floating Glass Telemetry Card */}
            <div className="intro__telemetry-card">
              <div className="intro__telemetry-header">
                <span className="intro__telemetry-pulse" />
                <span className="intro__telemetry-title">FLAGSHIP ASSET · HARPER BASIN</span>
              </div>
              <div className="intro__telemetry-grid">
                <div className="intro__telemetry-item">
                  <span className="intro__telemetry-label">Licence</span>
                  <span className="intro__telemetry-val">Offshore RL-003</span>
                </div>
                <div className="intro__telemetry-item">
                  <span className="intro__telemetry-label">Water Depths</span>
                  <span className="intro__telemetry-val">500 m – 3,500 m</span>
                </div>
                <div className="intro__telemetry-item">
                  <span className="intro__telemetry-label">Gross Acreage</span>
                  <span className="intro__telemetry-val">8,924 km² (2.2M Acres)</span>
                </div>
                <div className="intro__telemetry-item">
                  <span className="intro__telemetry-label">Operator</span>
                  <span className="intro__telemetry-val">TotalEnergies (65%)</span>
                </div>
              </div>
            </div>
          </div>

          <figcaption className="intro__caption-bar">
            <div className="intro__caption-quote">
              Independents like BluEnergies continue to play a critical role in unlocking the world&apos;s few remaining billion-barrel deepwater provinces.
            </div>
            <Button href={routes.overview} variant="link" className="intro__caption-link">
              Explore Harper Basin
            </Button>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
