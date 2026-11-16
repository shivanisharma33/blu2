import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import SubNav from "@/components/page/SubNav";
import LatestNews from "@/components/page/LatestNews";
import OriginalBody, { DocLinks } from "@/components/page/OriginalBody";
import { banners, ORIGIN, pageMeta } from "@/lib/original";
import { routes } from "@/lib/content";

export const metadata: Metadata = pageMeta("AGM", routes.agm);

export default function AgmPage() {
  return (
    <>
      <PageHero eyebrow="Investors" title="AGM" crumbs={[{ label: "Investors", href: routes.outlook }, { label: "AGM" }]} image={banners.investors} />
      <SubNav group="Investors" />

      <OriginalBody label="AGM">
        <h2>AGM Materials</h2>
        <p>The Annual General Meeting of Shareholders of BluEnergies Ltd. will be held on June 23, 2026 at 11:00am PST.</p>
        <DocLinks
          items={[
            { label: "Notice of Meeting & Information Circular", href: `${ORIGIN}/_resources/agm/BLU-NOM-Information-Circular.pdf?v=111611` },
            { label: "Proxy", href: `${ORIGIN}/_resources/agm/BLU-Proxy.pdf?v=111611` },
            { label: "Financial Statement Return Card", href: `${ORIGIN}/_resources/agm/BLU-Return-Card.pdf?v=111611` },
          ]}
        />
      </OriginalBody>

      <LatestNews title="News" />
    </>
  );
}
