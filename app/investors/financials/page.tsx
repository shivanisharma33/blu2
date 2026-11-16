import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import SubNav from "@/components/page/SubNav";
import LatestNews from "@/components/page/LatestNews";
import OriginalBody from "@/components/page/OriginalBody";
import { banners, pageMeta } from "@/lib/original";
import { routes } from "@/lib/content";

export const metadata: Metadata = pageMeta("Financials", routes.financials);

export default function FinancialsPage() {
  return (
    <>
      <PageHero eyebrow="Investors" title="Financials" crumbs={[{ label: "Investors", href: routes.outlook }, { label: "Financials" }]} image={banners.investors} />
      <SubNav group="Investors" />

      <OriginalBody label="Financials">
        <p>
          All company reports and financial statements of BluEnergies Ltd. have been approved by the Board of Directors of the Company.
          The consolidated financial statements have been prepared by management in accordance with International Financial Reporting
          Standards (IFRS).
        </p>
        <p>
          BluEnergies’ regulatory filings can be found on Sedar+ at{" "}
          <a href="https://www.sedar.com/DisplayCompanyDocuments.do?lang=EN&issuerNo=00008235" target="_blank" rel="noopener noreferrer">
            BluEnergies Company Reports (sedarplus.ca)
          </a>{" "}
          or by contacting Investor Relations.
        </p>
        <p>
          Insider filings can be found on the{" "}
          <a href="https://www.sedi.ca/sedi/" target="_blank" rel="noopener noreferrer">
            System for Electronic Disclosure by Insiders (&quot;SEDI&quot;)
          </a>{" "}
          by searching the Company or specific insiders.
        </p>
        <p>
          <strong>Investor Relations Contact</strong>
          <br />
          <a href="mailto:info@blu-energies.com">info@blu-energies.com</a>
        </p>
      </OriginalBody>

      <LatestNews title="News" />
    </>
  );
}
