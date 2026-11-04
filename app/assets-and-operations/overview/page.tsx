import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/page/PageHero";
import LatestNews from "@/components/page/LatestNews";
import HarperMap from "@/components/sections/HarperMap";
import Strategy from "@/components/sections/Strategy";
import Partnership from "@/components/sections/Partnership";
import { Eyebrow, Button } from "@/components/ui/primitives";
import { analogues, assetFacts, gulfAsset, licence, ORIGIN, routes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Assets & Operations",
  description:
    "Reconnaissance Licence RL-003 (Blocks LB-26, LB-30 and LB-31) in the Harper basin, offshore Liberia, held 35% by BluEnergies and 65% by TotalEnergies, and lease block SS-59 in the Gulf of America.",
  alternates: { canonical: routes.overview },
};

/** Verbatim factors from the official overview page; only the 50 km note is expanded, also from that page. */
const fundamentals: { title: string; body?: string }[] = [
  { title: "Low break-even price thresholds" },
  { title: "High NPV/boe" },
  { title: "A benign and secure operating environment" },
  { title: "Proximity to shore", body: "Approximately 50 km." },
  { title: "Competitive fiscal and contractual terms" },
  { title: "An accommodating host Government" },
];

export default function OverviewPage() {
  return (
    <>
      <PageHero
        eyebrow="Assets & Operations"
        title="The Harper Basin, Offshore Liberia."
        intro={
          <p>
            BluEnergies holds a 35% interest and TotalEnergies holds a 65% interest in Reconnaissance License No. LPRA-003 in the Harper
            basin, offshore Liberia.
          </p>
        }
        crumbs={[{ label: "Assets & Operations", href: routes.overview }, { label: "Overview" }]}
        image="/video/survey-vessel-poster.jpg"
        imagePosition="65% center"
      >
        <dl className="hero-stats hero-in" style={{ ["--d" as string]: "0.35s" }}>
          {assetFacts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>
                {f.label.startsWith("Approximate") ? "~" : ""}
                {f.value.toLocaleString("en-US")}
                <span>{f.unit}</span>
              </dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <nav className="subnav" aria-label="On this page">
        <div className="container subnav__inner">
          <span className="subnav__label">On this page</span>
          <ul>
            <li><a href="#licence">Licence</a></li>
            <li><a href="#map">Map</a></li>
            <li><a href="#play">Fan play</a></li>
            <li><a href="#programme">Work programme</a></li>
            <li><a href="#partnership">Partnership</a></li>
            <li><a href="#ss-59">Gulf of America</a></li>
          </ul>
        </div>
      </nav>

      <section id="licence" className="section section--white" aria-labelledby="licence-title">
        <div className="container grid">
          <div className="col-head" data-reveal>
            <Eyebrow>Reconnaissance Licence RL-003</Eyebrow>
            <h2 id="licence-title" className="h2">Three Blocks, ~40% of the Harper Basin.</h2>
          </div>
          <div className="col-body prose-plain" data-reveal>
            <p className="lead">
              The licence comprises Blocks LB-26, LB-30 and LB-31, with an areal extent of 8,924 km² (2.2 million acres), which is ~40%
              of the Harper basin.
            </p>
            <p>
              The licence was issued by the Liberia Petroleum Regulatory Authority (LPRA) for a duration up to June 30, 2027.
              BluEnergies is positioned in the Harper basin following a proactive, strategy-led, data-intensive evaluation of more than
              30 African and South American basins. These blocks provide BluEnergies a material, high-value, repeatable growth asset and
              a transformational opportunity for the country of Liberia.
            </p>
            <dl className="terms terms--plain">
              <div><dt>Licence</dt><dd>{licence.name}</dd></div>
              <div><dt>Regulator</dt><dd>{licence.regulator}</dd></div>
              <div><dt>Blocks</dt><dd>{licence.blocks.join(" · ")}</dd></div>
              <div><dt>Interests</dt><dd>BluEnergies {licence.bluInterest}% · TotalEnergies {licence.partnerInterest}%</dd></div>
              <div><dt>Term</dt><dd>{licence.term}</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section id="map" className="section" aria-labelledby="map-heading">
        <div className="container">
          <header className="row-head" data-reveal>
            <div>
              <Eyebrow>Licence Map</Eyebrow>
              <h2 id="map-heading" className="h2">Blocks, Fans &amp; 3D Seismic.</h2>
            </div>
            <p className="row-head__note">
              Location of RL-003, its component blocks and the lead inventory as of April 2025. Select a feature to learn more.
            </p>
          </header>
          <div className="map-surface">
            <HarperMap />
          </div>
        </div>
      </section>

      <section id="play" className="section section--white" aria-labelledby="play-title">
        <div className="container">
          <div className="grid">
            <div className="col-head" data-reveal>
              <Eyebrow>The Play</Eyebrow>
              <h2 id="play-title" className="h2">A Cretaceous Deepwater Fan Play.</h2>
            </div>
            <div className="col-body prose-plain" data-reveal>
              <p className="lead">
                The Harper basin fan play shares the same source rocks and depositional environment as the 16+ billion bls Stabroek
                Block in Guyana on the conjugate margin.
              </p>
              <p>
                Based on regional subsurface work and the interpretation of 6,167 km² of 3D seismic data, significant independently
                certified unrisked recoverable prospective resource potential has been recognized in six deepwater fans thus far. All of
                these fans are in Blocks LB-30 and LB-31. As context, a 1 billion boe recoverable discovery in the Harper basin would rank
                among offshore Africa&apos;s top 5% (by volume) in the past decade (Westwood, 2024). An assessment of Block LB-26 is
                underway.
              </p>
            </div>
          </div>

          <div className="analogues analogues--page" data-reveal>
            <p className="eyebrow">The Harper basin play is analogous to</p>
            <ul>
              {analogues.map((a) => (
                <li key={a.name}>
                  <span className="analogues__name">{a.name}</span>
                  <span className="analogues__where">{a.where}</span>
                  <span className="analogues__size">{a.size}</span>
                </li>
              ))}
            </ul>
            <p className="fineprint">
              Calao and Jubilee lie on the same West African Transform; Venus and Mopane are in Namibia. Analogues are third-party
              discoveries shown for geological context only and are not indicative of volumes on BluEnergies&apos; blocks. boe =
              barrels of oil equivalent.
            </p>
          </div>
        </div>
      </section>

      <Strategy />

      <section className="section" aria-labelledby="fund-title">
        <div className="container">
          <div className="grid">
            <div className="col-head" data-reveal>
              <Eyebrow>Development</Eyebrow>
              <h2 id="fund-title" className="h2">Fundamentals for Development.</h2>
            </div>
            <p className="col-body lead muted" data-reveal>
              Development of potential Harper basin discoveries is facilitated by the following factors, as set out by the company.
            </p>
          </div>
          <ul className="fund-grid" data-stagger>
            {fundamentals.map((f, i) => (
              <li key={f.title}>
                <span className="numbered__no">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h4">{f.title}</h3>
                {f.body && <p>{f.body}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Partnership />

      <section id="ss-59" className="section" aria-labelledby="ss59-title">
        <div className="container">
          <div className="split-media split-media--flip">
            <figure className="split-media__figure" data-reveal="image">
              <Image src="/images/coastline-aerial.jpg" alt="Aerial view of shallow coastal water" fill sizes="(max-width: 1024px) 100vw, 640px" style={{ objectFit: "cover" }} />
            </figure>
            <div className="split-media__body" data-reveal>
              <Eyebrow>{gulfAsset.region}</Eyebrow>
              <h2 id="ss59-title" className="h2">Lease Block SS-59.</h2>
              <p className="lead">
                BluEnergies was the successful top bidder for SS-59, a 5,000-acre lease block under a 5-year term, at the Bureau of Ocean
                Energy Management&apos;s March 11, 2026 lease sale for federal waters in the Gulf of America.
              </p>
              <blockquote className="mini-quote">
                <p>“{gulfAsset.quote}”</p>
                <footer>Craig Steinke, CEO · March 19, 2026</footer>
              </blockquote>
              <dl className="terms terms--plain">
                <div><dt>Area</dt><dd>{gulfAsset.area} · {gulfAsset.term}</dd></div>
                <div><dt>Interest</dt><dd>{gulfAsset.interest}% working interest</dd></div>
                <div><dt>Water depth</dt><dd>{gulfAsset.waterDepth}</dd></div>
                <div><dt>Status</dt><dd>{gulfAsset.status}</dd></div>
              </dl>
              <Button href={gulfAsset.href} variant="link">Read the release</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--white" aria-label="Cautionary note">
        <div className="container">
          <aside className="disclosure disclosure--boxed">
            <p>
              <strong>Cautionary note.</strong> BluEnergies&apos; blocks are undrilled exploration acreage. They contain no discovered
              resources or reserves. Prospective resources are quantities of petroleum estimated, as of a given date, to be potentially
              recoverable from undiscovered accumulations by applying future development projects. There is no certainty that any
              portion of the resources will be discovered. If discovered, there is no certainty that it will be commercially viable to
              produce any portion of them. Unrisked estimates have not been adjusted for the chance of discovery or the chance of
              development. See the company&apos;s{" "}
              <a href={`${ORIGIN}/_resources/presentations/corporate-presentation.pdf`} target="_blank" rel="noopener noreferrer">
                corporate presentation
              </a>{" "}
              and its filings on SEDAR+ for full disclosure.
            </p>
          </aside>
        </div>
      </section>

      <LatestNews />
    </>
  );
}
