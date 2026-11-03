import { SectionLabel, Button, ExternalArrow } from "../ui/primitives";
import MarketWidget from "./MarketWidget";
import { investorResources, ORIGIN, company } from "@/lib/content";

const highlights = [
  {
    k: "Frontier position",
    v: "The Harper basin is one of the last remaining undrilled West African margin basins containing the prolific deepwater basin floor fan play.",
  },
  {
    k: "Scale of the opportunity",
    v: "A Harper basin discovery of even 1 bbo would rank among offshore Africa's top 5% by volume in the past decade.",
  },
  {
    k: "Development fundamentals",
    v: "Potential development is supported by low break-even thresholds, high NPV/boe, a benign and secure operating environment, proximity to shore and competitive fiscal terms.",
  },
  {
    k: "2026 work programme",
    v: "BluEnergies and TotalEnergies are working to build the portfolio, mitigate and diversify risk, and accelerate the selection and drilling of the first test of the play.",
  },
];

export default function Investors() {
  return (
    <section id="investors" className="inv section--dark" aria-labelledby="inv-title">
      <div className="container">
        <header className="inv__head">
          <div>
            <SectionLabel>Investor Relations</SectionLabel>
            <h2 id="inv-title" className="display-xl" data-reveal="lines">
              A Compelling <br />
              <em>Exploration Opportunity.</em>
            </h2>
          </div>
          <div className="inv__listings" data-stagger>
            {company.tickers.map((t) => (
              <div key={t.symbol} className="listing">
                <span className="mono-label">{t.exchange}</span>
                <span className="listing__sym">{t.symbol}</span>
              </div>
            ))}
          </div>
        </header>

        <div className="inv__board">
          <div className="inv__quote inv__quote--main">
            <div className="inv__panel-head">
              <span className="mono-label">TSX Venture Exchange · BLU</span>
              <span className="mono-label inv__delayed">Live · TradingView</span>
            </div>
            <MarketWidget symbol="TSXV:BLU" fallbackHref={`${ORIGIN}/investors/stock-information/`} />
          </div>
          <div className="inv__quote">
            <div className="inv__panel-head">
              <span className="mono-label">OTCQX Best Market · BLUGF</span>
              <span className="mono-label inv__delayed">USD</span>
            </div>
            <MarketWidget symbol="OTC:BLUGF" fallbackHref={`${ORIGIN}/investors/stock-information/`} />
          </div>

          <div className="inv__capital">
            <span className="mono-label">Capital markets · per company releases</span>
            <dl>
              <div>
                <dt>Common shares outstanding</dt>
                <dd><span className="num" data-count="82154849">82,154,849</span></dd>
                <dd className="inv__asof">As of July 23, 2026</dd>
              </div>
              <div>
                <dt>Private placement closed</dt>
                <dd><span className="inv__ccy">C$</span><span className="num">20.7</span><span className="inv__ccy">M</span></dd>
                <dd className="inv__asof">Gross proceeds · July 23, 2026</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="inv__lower">
          <div className="inv__highlights">
            <span className="mono-label">Investment highlights</span>
            <ol>
              {highlights.map((h) => (
                <li key={h.k} data-reveal="fade">
                  <div>
                    <h3>{h.k}</h3>
                    <p>{h.v}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="inv__resources">
            <span className="mono-label">Documents &amp; filings</span>
            <ul>
              {investorResources.map((r) => (
                <li key={r.label}>
                  <a href={r.href} target="_blank" rel="noopener noreferrer">
                    <span className="inv__res-label">{r.label}</span>
                    <span className="inv__res-meta">{r.meta}</span>
                    <ExternalArrow />
                  </a>
                </li>
              ))}
            </ul>

            <div className="inv__contact">
              <span className="mono-label">Investor relations contact</span>
              <p className="inv__contact-name">Doug Allen</p>
              <p className="inv__contact-role">Senior Manager, Investor Relations</p>
              <a href={`mailto:${company.email}`} className="inv__contact-mail">{company.email}</a>
              <div className="inv__contact-cta">
                <Button href={`${ORIGIN}/investors/outlook/`} tone="dark">Investor Outlook</Button>
                <Button href={`${ORIGIN}/contact/request-for-information/`} variant="ghost" tone="dark">Request Information</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
