import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import SubNav from "@/components/page/SubNav";
import LatestNews from "@/components/page/LatestNews";
import DocCard from "@/components/page/DocCard";
import { Eyebrow, Button } from "@/components/ui/primitives";
import { ORIGIN, routes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Corporate Governance",
  description: "BluEnergies governance policies and ESTMA reporting.",
  alternates: { canonical: routes.governance },
};

const policies = [
  {
    title: "Code of Conduct and Ethics",
    meta: "Policy · PDF",
    text: "The standards of business conduct and ethics adopted by BluEnergies Ltd.",
    href: `${ORIGIN}/_resources/governance/Code_of_Conduct_and_Ethics_BluEnergies.pdf`,
  },
  {
    title: "Anti-Bribery and Corruption Policy",
    meta: "Policy · PDF",
    text: "The company's policy on the prevention of bribery and corruption.",
    href: `${ORIGIN}/_resources/governance/Anti-Bribery_and_Corruption_Policy_Blu_Energies.pdf`,
  },
];

export default function GovernancePage() {
  return (
    <>
      <PageHero
        eyebrow="Corporate"
        title="Corporate Governance."
        intro={<p>The policies that guide how BluEnergies conducts its business, and its reporting under Canada&apos;s Extractive Sector Transparency Measures Act.</p>}
        crumbs={[{ label: "Corporate", href: routes.about }, { label: "Corporate Governance" }]}
        image="/images/ocean-horizon.jpg"
        imagePosition="center 80%"
      />
      <SubNav group="Corporate" />

      <section className="section section--white" aria-labelledby="policies-title">
        <div className="container grid">
          <div className="col-head" data-reveal>
            <Eyebrow>Policies</Eyebrow>
            <h2 id="policies-title" className="h2">Policies &amp; Codes.</h2>
          </div>
          <div className="col-body">
            <div className="doc-grid doc-grid--two" data-stagger>
              {policies.map((p) => (
                <DocCard key={p.title} {...p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="estma-title">
        <div className="container grid">
          <div className="col-head" data-reveal>
            <Eyebrow>ESTMA</Eyebrow>
            <h2 id="estma-title" className="h2">Extractive Sector Transparency.</h2>
          </div>
          <div className="col-body" data-reveal>
            <p className="lead muted">
              Canada&apos;s Extractive Sector Transparency Measures Act (ESTMA) requires reporting entities to publicly disclose
              certain payments made to governments in Canada and abroad.
            </p>
            <div className="doc-grid">
              <DocCard
                title="2025 ESTMA Report"
                meta="Report · PDF"
                text="Reporting period April 8, 2025 to September 30, 2025."
                href={`${ORIGIN}/_resources/estma/BLU-ESTMA-Reporting-Jan-3-2026.pdf`}
                wide
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--white" aria-labelledby="oversight-title">
        <div className="container grid">
          <div className="col-head" data-reveal>
            <Eyebrow>Oversight</Eyebrow>
            <h2 id="oversight-title" className="h2">Board Oversight.</h2>
          </div>
          <div className="col-body" data-reveal>
            <p className="lead muted">
              The board of directors brings together exploration leadership, public-company accounting and capital markets experience.
              The Audit Committee is chaired by Cyrus Driver, a Chartered Accountant with over 30 years of public-company accounting
              experience.
            </p>
            <div className="btn-row">
              <Button href={routes.board}>Board &amp; Management</Button>
              <Button href={routes.financials} variant="secondary">Financials</Button>
            </div>
          </div>
        </div>
      </section>

      <LatestNews />
    </>
  );
}
