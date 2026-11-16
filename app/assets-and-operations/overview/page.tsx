import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import LatestNews from "@/components/page/LatestNews";
import OriginalBody from "@/components/page/OriginalBody";
import { banners, pageMeta } from "@/lib/original";
import { routes } from "@/lib/content";

export const metadata: Metadata = pageMeta("Overview", routes.overview);

/** Figures from the official page; each opens the full-size image, as on the source. */
function Figure({ src, alt, caption, id }: { src: string; alt: string; caption?: string; id?: string }) {
  return (
    <figure id={id} className="original__figure">
      <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size image: ${alt}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" />
      </a>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export default function OverviewPage() {
  return (
    <>
      <PageHero
        eyebrow="Assets & Operations"
        title="Overview"
        crumbs={[{ label: "Assets & Operations", href: routes.overview }, { label: "Overview" }]}
        image={banners.assets}
      />

      <OriginalBody label="Overview" wide>
        <p>
          BluEnergies Ltd. holds a 35% interest and TotalEnergies holds a 65% interest in Reconnaissance License No. LPRA-003 (the
          “RL”), in the Harper basin, offshore Liberia. The RL was issued by the Liberia Petroleum Regulatory Authority (“LPRA”) for a
          duration up to June 30, 2027.
        </p>
        <p>
          This RL comprises Blocks LB-26, LB-30, and LB-31, with an areal extent of 8,924 km2 (2.2 million acres), which is ~40% of the
          Harper basin. The Harper basin contains a Cretaceous <strong>deepwater fan play</strong> analogous to:
        </p>
        <ul>
          <li>
            The 1 to 1.5 billion boe* (in place) Calao discovery (Cote d’Ivoire) and the 0.8 billion boe* Jubilee Field (Ghana) on the
            same West African Transform
          </li>
          <li>The 4+ billion boe* Venus discovery and the 10 billion boe* (in place) Mopane discovery in Namibia</li>
        </ul>
        <p>
          The Harper basin fan play shares the same source rocks and depositional environment as the 16+ billion bls Stabroek Block in
          Guyana on the conjugate margin.
        </p>

        <Figure
          id="map"
          src="/images/site/MAP_BluEnergies.png"
          alt="BluEnergies Map"
          caption="Map showing the location of Reconnaissance License No. LPRA – 003; its component Blocks LB-26, LB-30 and LB-31; and the Lead inventory as of April, 2025."
        />

        <p>
          BluEnergies is positioned in the Harper basin following a proactive, strategy-led, data-intensive evaluation of more than 30
          African and South America basins. These Blocks provide BluEnergies a material, high-value, repeatable growth asset and a
          transformational opportunity for the country of Liberia.
        </p>
        <p>
          Based on regional subsurface work and the interpretation of 6,167 km2 of 3D seismic data, significant independently certified
          unrisked recoverable prospective resource potential has been recognized in six (6) deepwater fans thus far. All of these fans
          are in Blocks LB-30 and LB-31. As context, a 1 billion boe* recoverable discovery in the Harper basin would rank among offshore
          Africa’s top 5% (by volume) in the past decade (Westwood, 2024). An assessment of Block LB-26, is underway.
        </p>

        <Figure
          src="/images/site/Fan_Play_image_v2.jpg"
          alt="3D Seismic Images of the seven Cretaceous Fan systems"
          caption="3D Seismic Images of the seven Cretaceous Fan systems identified in BluEnergies’ Harper Basin License (Cenomanian: top; Turonian: bottom)"
        />
        <Figure src="/images/site/Deep_Fan_Play_image_v1.jpg" alt="Deep Fan Play image" />

        <p>
          Development of potential Harper basin discoveries is facilitated by low break-even price thresholds, high NPV/boe, a benign and
          secure operating environment, proximity to shore (50 km), competitive fiscal and contractual terms, and an accommodating host
          Government.
        </p>
        <p>
          As was the case with the giant Venus discovery in the Orange basin, offshore Namibia, BluEnergies and other Independents
          continue to play a critical role in unlocking the world’s few remaining billion-barrel deepwater provinces.
        </p>
        <p className="original__note">*boe - barrels of oil equivalent</p>
      </OriginalBody>

      <LatestNews title="News" />
    </>
  );
}
