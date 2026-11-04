import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import SubNav from "@/components/page/SubNav";
import LatestNews from "@/components/page/LatestNews";
import IrContact from "@/components/page/IrContact";
import { Eyebrow, ExternalArrow } from "@/components/ui/primitives";
import { routes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Financials",
  description: "BluEnergies financial statements, regulatory filings on SEDAR+ and insider filings on SEDI.",
  alternates: { canonical: routes.financials },
};

const sources = [
  {
    title: "Regulatory filings",
    org: "SEDAR+",
    body: "BluEnergies' regulatory filings, including financial statements, can be found on SEDAR+ or by contacting Investor Relations.",
    cta: "BluEnergies company reports",
    href: "https://www.sedar.com/DisplayCompanyDocuments.do?lang=EN&issuerNo=00008235",
  },
  {
    title: "Insider filings",
    org: "SEDI",
    body: "Insider filings can be found on the System for Electronic Disclosure by Insiders (SEDI) by searching the Company or specific insiders.",
    cta: "Search SEDI",
    href: "https://www.sedi.ca/sedi/",
  },
];

export default function FinancialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Investors"
        title="Financials."
        intro={<p>Company reports, financial statements and regulatory filings for BluEnergies Ltd.</p>}
        crumbs={[{ label: "Investors", href: routes.outlook }, { label: "Financials" }]}
        image="/images/ocean-surface.jpg"
        imagePosition="center 40%"
      />
      <SubNav group="Investors" />

      <section className="section section--white" aria-labelledby="reporting-title">
        <div className="container grid">
          <div className="col-head" data-reveal>
            <Eyebrow>Reporting</Eyebrow>
            <h2 id="reporting-title" className="h2">Prepared Under IFRS.</h2>
          </div>
          <div className="col-body prose-plain" data-reveal>
            <p className="lead">
              All company reports and financial statements of BluEnergies Ltd. have been approved by the Board of Directors of the
              Company.
            </p>
            <p>
              The consolidated financial statements have been prepared by management in accordance with International Financial
              Reporting Standards (IFRS).
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="filings-title">
        <div className="container">
          <header className="row-head" data-reveal>
            <div>
              <Eyebrow>Filings</Eyebrow>
              <h2 id="filings-title" className="h2">Where to Find Them.</h2>
            </div>
          </header>
          <div className="source-grid" data-stagger>
            {sources.map((s) => (
              <a key={s.org} href={s.href} target="_blank" rel="noopener noreferrer" className="source-card">
                <span className="source-card__org">{s.org}</span>
                <span className="h3">{s.title}</span>
                <span className="source-card__body">{s.body}</span>
                <span className="read-more">{s.cta} <ExternalArrow /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <IrContact />
      <LatestNews />
    </>
  );
}
