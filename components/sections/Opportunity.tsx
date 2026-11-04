import HarperMap from "./HarperMap";
import { SectionHead } from "../ui/primitives";
import { analogues } from "@/lib/content";

const insights = [
  {
    badge: "Play Architecture",
    metric: "Stratigraphic Traps",
    title: "The Basin Floor Fan Play",
    desc: "Basin floor fans are high-quality sand bodies carried down the continental slope by deepwater gravity flows and deposited across the basin floor. Where charged by mature Cretaceous source rock and sealed, they form giant stratigraphic reservoirs with prolific flow rates and world-class recovery factors.",
    tags: ["Cretaceous Fan Play", "Atlantic Conjugate Analogue"],
    accent: "ocean",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m2 9 10-5 10 5-10 5Z" />
        <path d="m2 14 10 5 10-5" />
        <path d="m2 19 10 5 10-5" />
      </svg>
    ),
  },
  {
    badge: "Subsurface Imaging",
    metric: "6,167 km² 3D",
    title: "What the 3D Seismic Shows",
    desc: "Rigorous interpretation of 6,167 km² of high-resolution 3D seismic has identified seven Cretaceous fan systems across Cenomanian and Turonian levels. Six of them, all located in Blocks LB-30 and LB-31, carry independently certified prospective resource potential, with LB-26 assessment underway.",
    tags: ["7 Mapped Fans", "6 Certified Prospects"],
    accent: "azure",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 12h3l3-8 4 16 3-8h7" />
        <circle cx="12" cy="12" r="10" strokeDasharray="3 3" />
      </svg>
    ),
  },
  {
    badge: "Commercial Scale",
    metric: "1B+ BOE Prize",
    title: "Why the Scale Matters",
    desc: "A 1 billion boe recoverable discovery in the Harper Basin would rank among offshore Africa's top 5% by volume in the past decade (Westwood, 2024). Positioned approximately 50 km from shore in favourable water depths, the prospects offer exceptional standalone commercial viability.",
    tags: ["Top 5% African Province", "50 km From Shoreline"],
    accent: "amber",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="m16 10-4 4-4-4" />
        <path d="M12 6v8" />
        <path d="M8 18h8" />
      </svg>
    ),
  },
];

export default function Opportunity() {
  return (
    <section id="opportunity" className="section section--white opportunity" aria-labelledby="opp-title">
      <div className="container">
        <SectionHead
          eyebrow="The Harper Basin · Offshore Liberia"
          id="opp-title"
          title="Positioned in a World-Class Exploration Frontier."
          intro={
            <p className="lead">
              The Harper basin contains a Cretaceous deepwater fan play. It shares the same source rocks and depositional environment
              as the Stabroek Block in Guyana, on the conjugate margin.
            </p>
          }
        />

        <div className="opportunity__stage">
          <HarperMap />
        </div>

        {/* 3 Executive Insight Cards */}
        <div className="opportunity__cards-grid" data-reveal>
          {insights.map((item) => (
            <div key={item.title} className={`opportunity__card opportunity__card--${item.accent}`}>
              <div className="opportunity__card-top">
                <div className="opportunity__card-icon">{item.icon}</div>
                <span className="opportunity__card-metric">{item.metric}</span>
              </div>

              <div className="opportunity__card-meta">
                <span className="opportunity__card-badge">{item.badge}</span>
                <h3 className="h4 opportunity__card-title">{item.title}</h3>
              </div>

              <p className="opportunity__card-desc">{item.desc}</p>

              <div className="opportunity__card-tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="opportunity__card-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="analogues" data-reveal>
          <p className="eyebrow">Regional analogues cited by the company</p>
          <ul>
            {analogues.map((a) => (
              <li key={a.name}>
                <span className="analogues__name">{a.name}</span>
                <span className="analogues__where">{a.where}</span>
                <span className="analogues__size">{a.size}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
