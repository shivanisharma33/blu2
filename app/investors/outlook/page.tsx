import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import SubNav from "@/components/page/SubNav";
import LatestNews from "@/components/page/LatestNews";
import OriginalBody from "@/components/page/OriginalBody";
import { banners, pageMeta } from "@/lib/original";
import { routes } from "@/lib/content";

export const metadata: Metadata = pageMeta("Outlook", routes.outlook);

export default function OutlookPage() {
  return (
    <>
      <PageHero eyebrow="Investors" title="Outlook" crumbs={[{ label: "Investors", href: routes.outlook }, { label: "Outlook" }]} image={banners.investors} />
      <SubNav group="Investors" />

      <OriginalBody label="Outlook">
        <p>
          The Harper basin, offshore Liberia, is one of the last remaining undrilled West African margin basins containing the prolific
          deepwater basin floor fan play.
        </p>
        <p>
          BluEnergies Ltd. (TSXV: BLU, OTCQX:BLUGF), a Canadian Independent, has identified significant recoverable prospective resource
          potential in its deepwater Harper basin Blocks LB-30 and LB-31, based on an independent prospective resource report dated
          March 28, 2025. As context, a Harper basin discovery of even 1 bbo would rank among offshore Africa’s top 5% (by volume) in the
          past decade.
        </p>
        <p>
          These blocks provide BluEnergies with a material, high-impact asset and a potentially transformational opportunity for the
          country of Liberia.
        </p>
        <p>
          Through 2026, BluEnergies and TotalEnergies will be executing a work program designed to build its portfolio, mitigate and
          diversify risk, and accelerate the selection and drilling of its initial test of the Harper basin deepwater fan play. In
          January 2026, BluEnergies partnered with TotalEnergies in RL-003 which covers all three blocks (26, 30 &amp; 31) where BLU holds
          35% interest and TTE 65% interest.
        </p>
      </OriginalBody>

      <LatestNews title="News" />
    </>
  );
}
