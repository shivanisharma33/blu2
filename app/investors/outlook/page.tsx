import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import SubNav from "@/components/page/SubNav";
import LatestNews from "@/components/page/LatestNews";
import IrContact from "@/components/page/IrContact";
import DocCard from "@/components/page/DocCard";
import { Eyebrow, Button } from "@/components/ui/primitives";
import { company, licence, ORIGIN, routes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Investor Outlook",
  description:
    "The Harper basin, offshore Liberia, is one of the last remaining undrilled West African margin basins containing the prolific deepwater basin floor fan play.",
  alternates: { canonical: routes.outlook },
};

const highlights = [
  {
    k: "Frontier position",
    v: "The Harper basin, offshore Liberia, is one of the last remaining undrilled West African margin basins containing the prolific deepwater basin floor fan play.",
  },
  {
    k: "Certified potential",
    v: "Significant recoverable prospective resource potential has been identified in Blocks LB-30 and LB-31, based on an independent prospective resource report dated March 28, 2025.",
  },
  {
    k: "Scale of the opportunity",
    v: "As context, a Harper basin discovery of even 1 bbo would rank among offshore Africa's top 5% (by volume) in the past decade.",
  },
  {
    k: "Major partner",
    v: "In January 2026, BluEnergies partnered with TotalEnergies in RL-003, which covers all three blocks (26, 30 & 31). BLU holds a 35% interest and TTE a 65% interest.",
  },
];

export default function OutlookPage() {
  return (
    <>
      <PageHero
        eyebrow="Investors"
        title="A Compelling Deepwater Exploration Opportunity."
        intro={
          <p>
            BluEnergies Ltd. (TSXV: BLU, OTCQX: BLUGF), a Canadian Independent, is exploring the deepwater Harper basin, offshore Liberia,
            in partnership with TotalEnergies.
          </p>
        }
        crumbs={[{ label: "Investors", href: routes.outlook }, { label: "Outlook" }]}
        image="/images/ocean-surface.jpg"
      />
      <SubNav group="Investors" />

      <section className="section section--white" aria-labelledby="thesis-title">
        <div className="container grid">
          <div className="col-head" data-reveal>
            <Eyebrow>Outlook</Eyebrow>
            <h2 id="thesis-title" className="h2">Material, High-Impact, and Partnered.</h2>
          </div>
          <div className="col-body prose-plain" data-reveal>
            <p className="lead">
              These blocks provide BluEnergies with a material, high-impact asset and a potentially transformational opportunity for the
              country of Liberia.
            </p>
            <p>
              Through 2026, BluEnergies and TotalEnergies will be executing a work program designed to build its portfolio, mitigate and
              diversify risk, and accelerate the selection and drilling of its initial test of the Harper basin deepwater fan play.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="hl-title">
        <div className="container">
          <header className="row-head" data-reveal>
            <div>
              <Eyebrow>Investment Highlights</Eyebrow>
              <h2 id="hl-title" className="h2">Why BluEnergies.</h2>
            </div>
          </header>
          <ol className="highlight-grid" data-stagger>
            {highlights.map((h, i) => (
              <li key={h.k}>
                <span className="numbered__no">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3">{h.k}</h3>
                <p>{h.v}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--white" aria-labelledby="split-title">
        <div className="container grid">
          <div className="col-head" data-reveal>
            <Eyebrow>Participating Interest · RL-003</Eyebrow>
            <h2 id="split-title" className="h2">Partnered with TotalEnergies.</h2>
            <p className="muted" style={{ marginTop: 20 }}>
              Licence term {licence.term.toLowerCase()}. Issued by the {licence.regulator}.
            </p>
          </div>
          <div className="col-body" data-reveal>
            <div className="split split--large">
              <div className="split__label" style={{ flexBasis: `${licence.bluInterest}%` }}>
                <span className="split__num">{licence.bluInterest}%</span>
                <span>BluEnergies</span>
              </div>
              <div className="split__label split__label--partner" style={{ flexBasis: `${licence.partnerInterest}%` }}>
                <span className="split__num">{licence.partnerInterest}%</span>
                <span>TotalEnergies</span>
              </div>
            </div>
            <div className="split__bar" role="img" aria-label="Participating interest in RL-003: BluEnergies 35%, TotalEnergies 65%">
              <span style={{ flexBasis: `${licence.bluInterest}%` }} />
              <span style={{ flexBasis: `${licence.partnerInterest}%` }} />
            </div>
            <div className="btn-row">
              <Button href={routes.overview}>Assets &amp; Operations</Button>
              <Button href={routes.stock} variant="secondary">Stock Information</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="docs-title">
        <div className="container">
          <header className="row-head" data-reveal>
            <div>
              <Eyebrow>Key Documents</Eyebrow>
              <h2 id="docs-title" className="h2">Learn More.</h2>
            </div>
            <Button href={routes.presentations} variant="secondary">All Presentations</Button>
          </header>
          <div className="doc-grid doc-grid--three" data-stagger>
            <DocCard title="Corporate Presentation" meta="Presentation · PDF" href={`${ORIGIN}/_resources/presentations/corporate-presentation.pdf`} />
            <DocCard title="Fact Sheet" meta="Fact sheet · PDF" href={`${ORIGIN}/_resources/factsheets/Blu-Energies-Fact-Sheet.pdf`} />
            <DocCard title="Research Report · June 1, 2026" meta="Granite Point · PDF" href={`${ORIGIN}/_resources/reports/Granite-Point-Tectonic-Shift-FOCUS-Report-20260601-C.pdf`} />
          </div>
          <p className="fineprint" style={{ marginTop: 24 }}>
            Listed on the TSX Venture Exchange ({company.tickers[0].exchange}: {company.tickers[0].symbol}), OTCQX Best Market (BLUGF) and
            Frankfurt Stock Exchange (66E).
          </p>
        </div>
      </section>

      <IrContact />
      <LatestNews />
    </>
  );
}
