import Image from "next/image";
import { Button } from "../ui/primitives";

export default function FinalCta() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="cta__media" data-parallax="0.2">
        <Image src="/images/ocean-dusk.jpg" alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
      </div>
      <div className="cta__scrim" aria-hidden />
      <div className="container cta__inner">
        <p className="mono-label cta__eyebrow" data-reveal="fade">Harper basin · Offshore Liberia</p>
        <h2 id="cta-title" className="display-xxl" data-reveal="lines">
          Discover the Opportunity <br />
          <em>Beneath the Surface.</em>
        </h2>
        <div className="cta__row">
          <p data-reveal="fade">
            Explore BluEnergies&apos; strategy, assets and commitment to advancing high-potential deepwater opportunities.
          </p>
          <div data-reveal="fade">
            <Button href="#assets" tone="dark">Explore BluEnergies</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
