import Image from "next/image";
import { SectionLabel, Button } from "../ui/primitives";
import { ORIGIN } from "@/lib/content";

export default function Intro() {
  return (
    <section id="about" className="intro section--light" aria-labelledby="intro-title">
      <div className="container">
        <div className="intro__head">
          <SectionLabel>About BluEnergies</SectionLabel>
          <h2 id="intro-title" className="display-xl" data-reveal="lines">
            Built on Insight. <br />
            <em>Focused on Opportunity.</em>
          </h2>
        </div>

        <div className="intro__grid">
          <div className="intro__copy">
            <p className="lead" data-reveal="fade">
              BluEnergies Ltd. is a West Africa deepwater oil and gas exploration company focused on identifying and
              advancing high-quality opportunities across prospective offshore basins.
            </p>
            <p data-reveal="fade">
              BluEnergies chose the Harper basin after a proactive, strategy-led, data-intensive evaluation of more than 30
              African and South American basins. High success rates in basin floor fan plays have sparked an exploration
              boom along the West African Margin. The Harper basin, offshore Liberia, is one of the last remaining undrilled
              basins on that margin to contain the play.
            </p>
            <div data-reveal="fade">
              <Button href={`${ORIGIN}/corporate/about-us/`} variant="text" tone="light">Corporate overview</Button>
            </div>
          </div>

          <dl className="intro__ledger" data-stagger>
            <div>
              <dt className="mono-label">Basins evaluated</dt>
              <dd><span className="num">30</span><sup>+</sup></dd>
            </div>
            <div>
              <dt className="mono-label">Founded</dt>
              <dd><span className="num">2021</span></dd>
            </div>
            <div>
              <dt className="mono-label">Listed · TSXV</dt>
              <dd><span className="num">2025</span></dd>
            </div>
            <div>
              <dt className="mono-label">Headquarters</dt>
              <dd className="intro__ledger-text">Vancouver <span>·</span> London</dd>
            </div>
          </dl>
        </div>
      </div>

      <figure className="intro__figure">
        <div className="intro__image" data-reveal="mask">
          <Image
            src="/images/ocean-horizon.jpg"
            alt="Calm open ocean stretching to the horizon"
            fill
            sizes="(max-width: 900px) 100vw, 82vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <figcaption className="intro__caption container">
          <span className="mono-label">Perspective</span>
          <span>Independents like BluEnergies continue to play a critical role in unlocking the world's few remaining billion-barrel deepwater provinces.</span>
        </figcaption>
        <div className="intro__depth" aria-hidden>
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} data-depth={i % 2 === 0 ? `${i * 500} m` : undefined} />
          ))}
        </div>
      </figure>
    </section>
  );
}
