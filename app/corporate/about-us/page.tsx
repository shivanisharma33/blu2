import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import SubNav from "@/components/page/SubNav";
import LatestNews from "@/components/page/LatestNews";
import OriginalBody, { DocLinks } from "@/components/page/OriginalBody";
import { banners, pageMeta } from "@/lib/original";
import { routes } from "@/lib/content";

export const metadata: Metadata = pageMeta("About Us", routes.about);

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Corporate" title="About Us" crumbs={[{ label: "Corporate", href: routes.about }, { label: "About Us" }]} image={banners.corporate} />
      <SubNav group="Corporate" />

      <OriginalBody label="About Us">
        <p>
          BluEnergies Ltd. is a West Africa Deepwater Oil and Gas explorer. High success rates in basin floor fan plays have sparked an
          exploration boom along the West African Margin.
        </p>
        <DocLinks items={[{ label: "Corporate Video", href: "https://www.youtube.com/watch?v=-ZmxXdsUQsU" }]} />
      </OriginalBody>

      <LatestNews title="News" />
    </>
  );
}
