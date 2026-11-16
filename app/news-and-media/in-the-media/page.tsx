import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import SubNav from "@/components/page/SubNav";
import LatestNews from "@/components/page/LatestNews";
import OriginalBody from "@/components/page/OriginalBody";
import YearList from "@/components/page/YearList";
import { banners, inTheMedia, pageMeta } from "@/lib/original";
import { routes } from "@/lib/content";

export const metadata: Metadata = pageMeta("In the Media", routes.media);

export default function MediaPage() {
  return (
    <>
      <PageHero
        eyebrow="News & Media"
        title="In the Media"
        crumbs={[{ label: "News & Media", href: routes.news }, { label: "In the Media" }]}
        image={banners.news}
      />
      <SubNav group="News & Media" />

      {/* The official list has no year tabs; items are shown newest first. */}
      <OriginalBody label="In the Media" wide>
        <YearList label="In the Media" items={inTheMedia} tabs={false} />
      </OriginalBody>

      <LatestNews title="News" />
    </>
  );
}
