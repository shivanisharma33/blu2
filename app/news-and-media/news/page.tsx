import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import SubNav from "@/components/page/SubNav";
import OriginalBody from "@/components/page/OriginalBody";
import LatestNews from "@/components/page/LatestNews";
import YearList from "@/components/page/YearList";
import { releases, releaseHref } from "@/lib/releases";
import { banners, pageMeta } from "@/lib/original";
import { routes } from "@/lib/content";

export const metadata: Metadata = pageMeta("News", routes.news);

export default function NewsPage() {
  return (
    <>
      <PageHero eyebrow="News & Media" title="News" crumbs={[{ label: "News & Media", href: routes.news }, { label: "News" }]} image={banners.news} />
      <SubNav group="News & Media" />

      <OriginalBody label="News" wide>
        <YearList label="News" items={releases.map((r) => ({ date: r.date, title: r.title, href: releaseHref(r.slug) }))} />
      </OriginalBody>

      <LatestNews title="News" />
    </>
  );
}
