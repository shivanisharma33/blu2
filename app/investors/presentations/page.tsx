import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import SubNav from "@/components/page/SubNav";
import LatestNews from "@/components/page/LatestNews";
import OriginalBody, { DocLinks } from "@/components/page/OriginalBody";
import { banners, ORIGIN, pageMeta } from "@/lib/original";
import { routes } from "@/lib/content";

export const metadata: Metadata = pageMeta("Presentations", routes.presentations);

export default function PresentationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Investors"
        title="Presentations"
        crumbs={[{ label: "Investors", href: routes.outlook }, { label: "Presentations" }]}
        image={banners.investors}
      />
      <SubNav group="Investors" />

      <OriginalBody label="Presentations">
        <DocLinks
          items={[
            { label: "Corporate Presentation", href: `${ORIGIN}/_resources/presentations/corporate-presentation.pdf?v=111611` },
            { label: "Research Report - March 30, 2026", href: `${ORIGIN}/_resources/reports/Granite-Point-BluEnergies-In-Pursui-of-a-Giant-Resource-in-Offshore-Liberia.pdf?v=111611` },
            { label: "Research Report - June 1, 2026", href: `${ORIGIN}/_resources/reports/Granite-Point-Tectonic-Shift-FOCUS-Report-20260601-C.pdf?v=111611` },
          ]}
        />
      </OriginalBody>

      <LatestNews title="News" />
    </>
  );
}
