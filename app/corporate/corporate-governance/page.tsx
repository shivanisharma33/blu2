import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import SubNav from "@/components/page/SubNav";
import LatestNews from "@/components/page/LatestNews";
import OriginalBody, { DocLinks } from "@/components/page/OriginalBody";
import { banners, ORIGIN, pageMeta } from "@/lib/original";
import { routes } from "@/lib/content";

export const metadata: Metadata = pageMeta("Corporate Governance", routes.governance);

export default function GovernancePage() {
  return (
    <>
      <PageHero
        eyebrow="Corporate"
        title="Corporate Governance"
        crumbs={[{ label: "Corporate", href: routes.about }, { label: "Corporate Governance" }]}
        image={banners.corporate}
      />
      <SubNav group="Corporate" />

      <OriginalBody label="Corporate Governance">
        <DocLinks
          items={[
            { label: "Anti-Bribery Corruption Policy", href: `${ORIGIN}/_resources/governance/Anti-Bribery_and_Corruption_Policy_Blu_Energies.pdf?v=111611` },
            { label: "Code of Conduct and Ethics", href: `${ORIGIN}/_resources/governance/Code_of_Conduct_and_Ethics_BluEnergies.pdf?v=111611` },
          ]}
        />
        <h2>ESTMA</h2>
        <DocLinks
          items={[{ label: "2025 ESTMA Report (Apr 8, 2025 to Sept 30, 2025)", href: `${ORIGIN}/_resources/estma/BLU-ESTMA-Reporting-Jan-3-2026.pdf?v=111611` }]}
        />
      </OriginalBody>

      <LatestNews title="News" />
    </>
  );
}
