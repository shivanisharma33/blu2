import { SectionLabel, Button } from "../ui/primitives";
import HarperMap from "./HarperMap";
import { assetFacts, analogues, ORIGIN } from "@/lib/content";

export default function Assets() {
  return (
    <section id="assets" className="assets section--dark" aria-labelledby="assets-title">
      <div className="container">
        <header className="assets__head">
          <div>
            <SectionLabel>Assets &amp; Operations</SectionLabel>
            <h2 id="assets-title" className="display-xl" data-reveal="lines">
              Positioned in a <br />
              <em>World-Class</em> Exploration Frontier.
            </h2>
          </div>
          <p className="assets__intro" data-reveal="fade">
            BluEnergies holds a 35% participating interest in Reconnaissance Licence LPRA-003 in the Harper basin, offshore
            Liberia. TotalEnergies holds the other 65%. The licence was issued by the Liberia Petroleum Regulatory Authority
            and runs up to June 30, 2027. It covers about 40% of the basin.
          </p>
        </header>

        <HarperMap />

        <div className="assets__figures" data-stagger>
          {assetFacts.map((f) => (
            <div className="figure-stat" key={f.label}>
              <span className="mono-label">{f.label}</span>
              <p className="figure-stat__value">
                <span className="num" data-count={f.value}>{f.value.toLocaleString("en-US")}</span>
                <span className="figure-stat__unit">{f.unit}</span>
              </p>
              <p className="figure-stat__note">{f.note}</p>
            </div>
          ))}
        </div>

        <div className="assets__play">
          <div className="assets__play-copy">
            <span className="mono-label">The play</span>
            <p className="assets__play-lead" data-reveal="fade">
              The Harper basin contains a Cretaceous deepwater fan play. It shares the same source rocks and depositional environment
              as the Stabroek Block in Guyana, on the conjugate margin.
            </p>
            <p data-reveal="fade">
              As context, a 1 billion boe recoverable discovery in the Harper basin would rank among offshore Africa's top 5%
              by volume in the past decade (Westwood, 2024).
            </p>
            <div data-reveal="fade">
              <Button href={`${ORIGIN}/assets-and-operations/overview/`} tone="dark">Discover Our Assets</Button>
            </div>
          </div>

          <div className="analogues">
            <p className="mono-label">Analogue fields on the West African margin, as cited by the company</p>
            <ul data-stagger>
              {analogues.map((a) => (
                <li key={a.name}>
                  <span className="analogues__name">{a.name}</span>
                  <span className="analogues__where">{a.where}</span>
                  <span className="analogues__size">{a.size}</span>
                </li>
              ))}
            </ul>
            <p className="caution">
              Analogues are third-party discoveries shown for geological context only. They are not indicative of volumes on
              BluEnergies&apos; blocks. boe = barrels of oil equivalent.
            </p>
          </div>
        </div>

        <aside className="disclosure" aria-label="Cautionary note regarding prospective resources">
          <span className="mono-label">Cautionary note · Prospective resources</span>
          <p>
            BluEnergies&apos; blocks are undrilled exploration acreage. They contain no discovered resources or reserves. Prospective
            resources are quantities of petroleum estimated, as of a given date, to be potentially recoverable from undiscovered
            accumulations by applying future development projects. There is no certainty that any portion of the resources will be
            discovered. If discovered, there is no certainty that it will be commercially viable to produce any portion of them.
            Unrisked estimates have not been adjusted for the chance of discovery or the chance of development. See the
            company&apos;s{" "}
            <a href={`${ORIGIN}/_resources/presentations/corporate-presentation.pdf`} target="_blank" rel="noopener noreferrer">
              corporate presentation
            </a>{" "}
            and its filings on SEDAR+ for full disclosure.
          </p>
        </aside>
      </div>
    </section>
  );
}
