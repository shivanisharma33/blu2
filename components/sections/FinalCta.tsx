import Image from "next/image";
import { Button } from "../ui/primitives";

export default function FinalCta() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="cta__media" aria-hidden>
        <Image src="/images/ocean-surface.jpg" alt="" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "center 75%" }} />
      </div>
      <div className="cta__overlay" aria-hidden />
      <div className="container cta__inner" data-reveal>
        <p className="eyebrow eyebrow--light">Harper basin · Offshore Liberia</p>
        <h2 id="cta-title" className="h1">Discover the Opportunity Beneath the Surface.</h2>
        <div className="cta__actions">
          <Button href="#assets" on="dark">Explore Our Assets</Button>
          <Button href="#contact" variant="secondary" on="dark">Contact BluEnergies</Button>
        </div>
      </div>
    </section>
  );
}
