import Image from "next/image";
import { SectionLabel, ExternalArrow } from "../ui/primitives";
import { governanceDocs } from "@/lib/content";

const pillars = [
  {
    no: "01",
    title: "Safety-led site selection",
    body: "The multi-beam seabed survey maps pockmarks, mud volcanoes, faults and other seabed features. This supports the safe selection of any future drilling location.",
  },
  {
    no: "02",
    title: "Evidence before drilling",
    body: "Every part of the programme, from seismic reprocessing to geochemical sampling and heat-flow measurement, is designed to de-risk prospects and identify optimal drilling locations before a well is chosen.",
  },
  {
    no: "03",
    title: "A long-term partner to Liberia",
    body: "The licence is held under the Liberia Petroleum Regulatory Authority, and the company sees the blocks as a potentially transformational opportunity for Liberia. Under its earlier licence RL-002, BluEnergies spent US$1.86 million against a US$1.6 million minimum work commitment.",
  },
  {
    no: "04",
    title: "Transparency & integrity",
    body: "BluEnergies has adopted a Code of Conduct & Ethics and an Anti-Bribery & Corruption Policy. It reports payments to governments under Canada's Extractive Sector Transparency Measures Act (ESTMA).",
  },
];

export default function Responsible() {
  return (
    <section id="responsibility" className="resp" aria-labelledby="resp-title">
      <div className="resp__hero">
        <div className="resp__hero-media" data-parallax="0.18">
          <Image src="/images/ocean-surface.jpg" alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="resp__hero-copy container">
          <SectionLabel>Responsible Operations</SectionLabel>
          <h2 id="resp-title" className="display-xxl" data-reveal="lines">
            Progress <em>with</em> Purpose.
          </h2>
        </div>
      </div>

      <div className="resp__body section--light">
        <div className="container resp__grid">
          <div className="resp__aside">
            <p className="lead" data-reveal="fade">
              Frontier exploration carries a responsibility to the ocean, to host communities and to shareholders. BluEnergies
              approaches it with data, discipline and transparency.
            </p>
            <figure className="resp__portrait" data-reveal="mask">
              <Image src="/images/coastline-aerial.jpg" alt="Aerial view of waves meeting a tropical shoreline" fill sizes="(max-width: 900px) 100vw, 30vw" style={{ objectFit: "cover" }} />
            </figure>
          </div>

          <div>
            <ol className="pillars">
              {pillars.map((p) => (
                <li key={p.title} className="pillar" data-reveal="fade">
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </li>
              ))}
            </ol>
            <div className="resp__docs" data-stagger>
              {governanceDocs.map((d) => (
                <a key={d.label} href={d.href} target="_blank" rel="noopener noreferrer">
                  <span className="mono-label">PDF</span>
                  <span>{d.label}</span>
                  <ExternalArrow />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
