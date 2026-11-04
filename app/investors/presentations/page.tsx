import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import SubNav from "@/components/page/SubNav";
import LatestNews from "@/components/page/LatestNews";
import IrContact from "@/components/page/IrContact";
import DocCard from "@/components/page/DocCard";
import VideoFeature from "@/components/page/VideoFeature";
import { Eyebrow } from "@/components/ui/primitives";
import { ORIGIN, routes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Presentations",
  description: "BluEnergies corporate presentation, fact sheet and independent research reports.",
  alternates: { canonical: routes.presentations },
};

export default function PresentationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Investors"
        title="Presentations & Research."
        intro={<p>The corporate presentation, fact sheet and sponsored research coverage of BluEnergies Ltd.</p>}
        crumbs={[{ label: "Investors", href: routes.outlook }, { label: "Presentations" }]}
        image="/images/ocean-dusk.jpg"
        imagePosition="center 70%"
      />
      <SubNav group="Investors" />

      <section className="section section--white" aria-labelledby="corp-title">
        <div className="container">
          <header className="row-head" data-reveal>
            <div>
              <Eyebrow>Company Materials</Eyebrow>
              <h2 id="corp-title" className="h2">Corporate Presentation.</h2>
            </div>
          </header>
          <div className="doc-grid doc-grid--two" data-stagger>
            <DocCard
              title="Corporate Presentation"
              meta="Presentation · PDF"
              text="The company's current corporate presentation, including the Harper basin opportunity and prospective resource disclosure."
              href={`${ORIGIN}/_resources/presentations/corporate-presentation.pdf`}
              wide
            />
            <DocCard
              title="Fact Sheet"
              meta="Fact sheet · PDF"
              text="The BluEnergies Ltd. company fact sheet."
              href={`${ORIGIN}/_resources/factsheets/Blu-Energies-Fact-Sheet.pdf`}
              wide
            />
          </div>
        </div>
      </section>

      <VideoFeature />

      <section className="section" aria-labelledby="research-title">
        <div className="container">
          <header className="row-head" data-reveal>
            <div>
              <Eyebrow>Independent Research</Eyebrow>
              <h2 id="research-title" className="h2">Research Reports.</h2>
            </div>
            <p className="row-head__note">
              Sponsored equity research by Granite Point Research Inc., engaged as announced on April 27, 2026.
            </p>
          </header>
          <div className="doc-grid doc-grid--two" data-stagger>
            <DocCard
              title="Research Report · June 1, 2026"
              meta="Granite Point · PDF"
              href={`${ORIGIN}/_resources/reports/Granite-Point-Tectonic-Shift-FOCUS-Report-20260601-C.pdf`}
              wide
            />
            <DocCard
              title="Research Report · March 30, 2026"
              meta="Granite Point · PDF"
              href={`${ORIGIN}/_resources/reports/Granite-Point-BluEnergies-In-Pursui-of-a-Giant-Resource-in-Offshore-Liberia.pdf`}
              wide
            />
          </div>
        </div>
      </section>

      <IrContact />
      <LatestNews />
    </>
  );
}
