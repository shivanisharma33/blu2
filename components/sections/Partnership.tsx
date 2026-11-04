import { Eyebrow, Button } from "../ui/primitives";
import { licence } from "@/lib/content";

const terms: [string, string][] = [
  ["Agreement", "Joint study and application agreement, January 2026"],
  ["Partner", "Liberian upstream subsidiary of TotalEnergies SE (NYSE: TTE)"],
  ["Licence", `${licence.name}, issued by the ${licence.regulator}`],
  ["Programme", "Immediate budget jointly committed for an 18-month work programme"],
  ["Term", licence.term],
];

export default function Partnership() {
  return (
    <section id="partnership" className="section section--white partnership" aria-labelledby="partner-title">
      <div className="container">
        <div className="grid">
          <div className="partnership__copy" data-reveal>
            <Eyebrow>Strategic Partnership</Eyebrow>
            <h2 id="partner-title" className="h2">Partnered with TotalEnergies in the Harper Basin.</h2>
            <p className="lead">
              In January 2026, BluEnergies entered into an industry-standard joint study and application agreement with the Liberian
              upstream subsidiary of TotalEnergies SE to further explore the prospectivity of the Harper basin fan play.
            </p>
            <p>
              If economically viable drillable prospects are established, the partners intend to apply for one or more production
              sharing contracts covering the blocks. Expenditures under the reconnaissance licences would be recoverable under any
              future production sharing contract.
            </p>
            <Button
              href="/news-and-media/news/totalenergies-partners-with-bluenergies-in-its-harper-basin-fan-play-offshore-liberia"
              variant="link"
            >
              Read the partnership release
            </Button>
          </div>

          <div className="partnership__split" data-reveal>
            <p className="eyebrow">Participating interest · RL-003</p>
            <div className="split">
              <div className="split__label" style={{ flexBasis: `${licence.bluInterest}%` }}>
                <span className="split__num">{licence.bluInterest}%</span>
                <span>BluEnergies</span>
              </div>
              <div className="split__label split__label--partner" style={{ flexBasis: `${licence.partnerInterest}%` }}>
                <span className="split__num">{licence.partnerInterest}%</span>
                <span>TotalEnergies</span>
              </div>
            </div>
            <div
              className="split__bar"
              role="img"
              aria-label={`Participating interest in RL-003: BluEnergies ${licence.bluInterest}%, TotalEnergies ${licence.partnerInterest}%`}
            >
              <span style={{ flexBasis: `${licence.bluInterest}%` }} />
              <span style={{ flexBasis: `${licence.partnerInterest}%` }} />
            </div>

            <dl className="terms">
              {terms.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <blockquote className="pullquote" data-reveal>
          <p>
            “The recent, hectic activity by major oil companies in securing licenses for deepwater acreage along the entire Africa
            west margin is confirmation that the early move by BluEnergies in the Harper basin (2023) was a valid one.”
          </p>
          <footer>
            <span className="pullquote__name">Sergio Laura</span>
            <span>Vice President, Exploration · Operations update, July 6, 2026</span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
