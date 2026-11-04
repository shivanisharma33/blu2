import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/page/PageHero";
import SubNav from "@/components/page/SubNav";
import LatestNews from "@/components/page/LatestNews";
import VideoFeature from "@/components/page/VideoFeature";
import Milestones from "@/components/sections/Milestones";
import { Eyebrow, Button, SmartLink } from "@/components/ui/primitives";
import { company, routes } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description: company.about,
  alternates: { canonical: routes.about },
};

const facts = [
  { k: "Founded", v: "2021" },
  { k: "Listed", v: "TSXV, April 2025" },
  { k: "Basins evaluated", v: "30+" },
  { k: "Offices", v: "Vancouver · London" },
];

const priorities = [
  { no: "01", title: "Build the portfolio", body: "Advance the deepwater Harper basin blocks with TotalEnergies. In March 2026 the company also secured the top bid for shallow-water lease block SS-59 in the Gulf of America." },
  { no: "02", title: "Mitigate and diversify risk", body: "A work programme of seismic reprocessing and new sea-bottom data, designed to de-risk prospects before a drilling location is chosen." },
  { no: "03", title: "Accelerate the first test", body: "Accelerate the selection and drilling of the initial test of the Harper basin deepwater fan play." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Corporate"
        title="A West Africa Deepwater Oil & Gas Explorer."
        intro={<p>{company.about}</p>}
        crumbs={[{ label: "Corporate", href: routes.about }, { label: "About Us" }]}
        image="/images/ocean-horizon.jpg"
        imagePosition="center 70%"
      />
      <SubNav group="Corporate" />

      <section className="section section--white" aria-labelledby="who-title">
        <div className="container grid">
          <div className="col-head" data-reveal>
            <Eyebrow>Who We Are</Eyebrow>
            <h2 id="who-title" className="h2">Positioned in One of the Last Undrilled Fan-Play Basins.</h2>
          </div>
          <div className="col-body prose-plain" data-reveal>
            <p className="lead">
              BluEnergies is positioned in the Harper basin following a proactive, strategy-led, data-intensive evaluation of more than
              30 African and South American basins.
            </p>
            <p>
              These blocks provide BluEnergies with a material, high-value, repeatable growth asset and a transformational opportunity
              for the country of Liberia. In January 2026, BluEnergies partnered with TotalEnergies in Reconnaissance Licence RL-003,
              which covers Blocks LB-26, LB-30 and LB-31. BLU holds a 35% interest and TotalEnergies holds 65%.
            </p>
            <p>
              As was the case with the giant Venus discovery in the Orange basin, offshore Namibia, BluEnergies and other Independents
              continue to play a critical role in unlocking the world&apos;s few remaining billion-barrel deepwater provinces.
            </p>
            <dl className="facts facts--four">
              {facts.map((f) => (
                <div key={f.k}>
                  <dt>{f.k}</dt>
                  <dd>{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="priorities-title">
        <div className="container">
          <div className="split-media">
            <figure className="split-media__figure" data-reveal="image">
              <Image src="/video/survey-vessel-poster.jpg" alt="Aerial view of a survey vessel at sea" fill sizes="(max-width: 1024px) 100vw, 640px" style={{ objectFit: "cover", objectPosition: "60% center" }} />
            </figure>
            <div className="split-media__body" data-reveal>
              <Eyebrow>Strategy</Eyebrow>
              <h2 id="priorities-title" className="h2">A Disciplined Path to the First Well.</h2>
              <p className="muted">
                Through 2026, BluEnergies and TotalEnergies are executing a work programme designed to build the portfolio, mitigate
                and diversify risk, and accelerate the selection and drilling of the initial test of the Harper basin deepwater fan
                play.
              </p>
              <ol className="numbered">
                {priorities.map((p) => (
                  <li key={p.no}>
                    <span className="numbered__no">{p.no}</span>
                    <div>
                      <h3 className="h4">{p.title}</h3>
                      <p>{p.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Button href={routes.overview} variant="link">Assets &amp; operations</Button>
            </div>
          </div>
        </div>
      </section>

      <VideoFeature />

      <Milestones />

      <section className="section section--white" aria-label="Explore the company">
        <div className="container">
          <ul className="link-cards" data-stagger>
            <li>
              <SmartLink href={routes.board} className="link-card">
                <span className="eyebrow">Corporate</span>
                <span className="link-card__title">Board &amp; Management</span>
                <span className="link-card__text">Decades of international exploration, discovery and public-company experience.</span>
              </SmartLink>
            </li>
            <li>
              <SmartLink href={routes.governance} className="link-card">
                <span className="eyebrow">Corporate</span>
                <span className="link-card__title">Corporate Governance</span>
                <span className="link-card__text">Code of Conduct, Anti-Bribery &amp; Corruption Policy and ESTMA reporting.</span>
              </SmartLink>
            </li>
            <li>
              <SmartLink href={routes.outlook} className="link-card">
                <span className="eyebrow">Investors</span>
                <span className="link-card__title">Investor Outlook</span>
                <span className="link-card__text">TSXV: BLU · OTCQX: BLUGF · FSE: 66E.</span>
              </SmartLink>
            </li>
          </ul>
        </div>
      </section>

      <LatestNews />
    </>
  );
}
