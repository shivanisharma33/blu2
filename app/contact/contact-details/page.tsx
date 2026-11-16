import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import SubNav from "@/components/page/SubNav";
import LatestNews from "@/components/page/LatestNews";
import OriginalBody from "@/components/page/OriginalBody";
import { banners, pageMeta } from "@/lib/original";
import { routes } from "@/lib/content";

export const metadata: Metadata = pageMeta("Contact Details", routes.contact);

const offices = [
  { country: "CANADA", lines: ["Suite 2200 - 885 West Georgia Street", "Vancouver, BC Canada", "V6C 3E8"] },
  { country: "UNITED KINGDOM", lines: ["Level 1, Devonshire House", "One Mayfair Place", "London, UK", "W1J 8AJ"] },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact Details"
        crumbs={[{ label: "Contact", href: routes.contact }, { label: "Contact Details" }]}
        image={banners.contact}
      />
      <SubNav group="Contact" />

      <OriginalBody label="Contact Details" wide>
        <div className="original__offices">
          {offices.map((o) => (
            <address key={o.country}>
              <strong>{o.country}</strong>
              {o.lines.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
          ))}
        </div>
      </OriginalBody>

      <LatestNews title="News" />
    </>
  );
}
