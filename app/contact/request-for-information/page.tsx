import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import SubNav from "@/components/page/SubNav";
import LatestNews from "@/components/page/LatestNews";
import OriginalBody from "@/components/page/OriginalBody";
import RfiForm from "@/components/page/RfiForm";
import { banners, pageMeta } from "@/lib/original";
import { routes } from "@/lib/content";

export const metadata: Metadata = pageMeta("Request for Information", routes.rfi);

export default function RfiPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Request for Information"
        crumbs={[{ label: "Contact", href: routes.contact }, { label: "Request for Information" }]}
        image={banners.contact}
      />
      <SubNav group="Contact" />

      <OriginalBody label="Request for Information">
        <RfiForm />
      </OriginalBody>

      <LatestNews title="News" />
    </>
  );
}
