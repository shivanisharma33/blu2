import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import SubNav from "@/components/page/SubNav";
import LatestNews from "@/components/page/LatestNews";
import IrContact from "@/components/page/IrContact";
import DocCard from "@/components/page/DocCard";
import { Eyebrow } from "@/components/ui/primitives";
import { agm, routes } from "@/lib/content";

export const metadata: Metadata = {
  title: "AGM",
  description: "Annual General Meeting of Shareholders of BluEnergies Ltd.: date and meeting materials.",
  alternates: { canonical: routes.agm },
};

export default function AgmPage() {
  return (
    <>
      <PageHero
        eyebrow="Investors"
        title="Annual General Meeting."
        intro={<p>Meeting details and materials for shareholders of BluEnergies Ltd.</p>}
        crumbs={[{ label: "Investors", href: routes.outlook }, { label: "AGM" }]}
        image="/images/ocean-horizon.jpg"
        imagePosition="center 85%"
      />
      <SubNav group="Investors" />

      <section className="section section--white" aria-labelledby="agm-title">
        <div className="container grid">
          <div className="col-head" data-reveal>
            <Eyebrow>AGM Materials</Eyebrow>
            <h2 id="agm-title" className="h2">{agm.title}.</h2>
          </div>
          <div className="col-body" data-reveal>
            <div className="event-card">
              <div className="event-card__date" aria-hidden>
                <span>Jun</span>
                <strong>23</strong>
                <span>2026</span>
              </div>
              <div>
                <p className="event-card__label">Annual General Meeting of Shareholders</p>
                <p className="event-card__when">June 23, 2026 at 11:00 am PST</p>
                <p className="muted">The Annual General Meeting of Shareholders of BluEnergies Ltd. was scheduled for this date.</p>
              </div>
            </div>
            <div className="doc-grid" data-stagger>
              {agm.docs.map((d) => (
                <DocCard key={d.label} title={d.label} meta="AGM 2026 · PDF" href={d.href} wide />
              ))}
            </div>
          </div>
        </div>
      </section>

      <IrContact />
      <LatestNews />
    </>
  );
}
