import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import SubNav from "@/components/page/SubNav";
import NewsIndex from "@/components/page/NewsIndex";
import { releases } from "@/lib/releases";
import { routes } from "@/lib/content";

export const metadata: Metadata = {
  title: "News Releases",
  description: "News releases from BluEnergies Ltd. (TSXV: BLU | OTCQX: BLUGF).",
  alternates: { canonical: routes.news },
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News & Media"
        title="News Releases."
        intro={<p>Company announcements from BluEnergies Ltd., newest first.</p>}
        crumbs={[{ label: "News & Media", href: routes.news }, { label: "News" }]}
        image="/images/ocean-dusk.jpg"
        imagePosition="center 60%"
      />
      <SubNav group="News & Media" />
      <NewsIndex
        items={releases.map(({ slug, date, title, category, excerpt }) => ({ slug, date, title, category, excerpt }))}
      />
    </>
  );
}
