import { SectionHead, Button, ExternalArrow } from "../ui/primitives";
import MarketWidget from "./MarketWidget";
import { investorResources, governanceDocs, agm, investorContact, company, routes } from "@/lib/content";

const listingNames: Record<string, string> = {
  TSXV: "TSX Venture Exchange",
  OTCQX: "OTCQX Best Market",
  FSE: "Frankfurt Stock Exchange",
};

const presentations = investorResources.filter((r) => /Presentation|Fact Sheet|Research|Video/.test(r.label));
const filings = [
  { label: "Financials", meta: "Reporting & filings", href: routes.financials },
  { label: "Stock Information", meta: "Live quote & listings", href: routes.stock },
  ...investorResources.filter((r) => /Financial Statements|Insider/.test(r.label)),
];

function DocList({ title, items }: { title: string; items: { label: string; meta?: string; href: string }[] }) {
  return (
    <div className="doc-col">
      <h3 className="doc-col__title">{title}</h3>
      <ul>
        {items.map((d) => (
          <li key={d.label}>
            <a href={d.href} target="_blank" rel="noopener noreferrer">
              <span>
                {d.label}
                {d.meta && <small>{d.meta}</small>}
              </span>
              <ExternalArrow />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Investors() {
  return (
    <section id="investors" className="section section--white investors" aria-labelledby="inv-title">
      <div className="container">
        <SectionHead
          eyebrow="Investors"
          id="inv-title"
          title="Investor Information."
          intro={
            <p className="lead">
              BluEnergies is listed on the TSX Venture Exchange and trades in the United States on the OTCQX Best Market and in Germany
              on the Frankfurt Stock Exchange.
            </p>
          }
        />

        <dl className="listings" data-stagger>
          {company.tickers.map((t) => (
            <div key={t.symbol}>
              <dt>{listingNames[t.exchange] ?? t.exchange}</dt>
              <dd>
                <span className="listings__ex">{t.exchange}:</span> {t.symbol}
              </dd>
            </div>
          ))}
        </dl>

        <div className="investors__board">
          <div className="quote-panel" data-reveal>
            <div className="quote-panel__head">
              <p className="eyebrow">Stock information · TSXV: BLU</p>
              <span>Live data via TradingView. Quotes may be delayed.</span>
            </div>
            <MarketWidget symbol="TSXV:BLU" fallbackHref={routes.stock} />
          </div>

          <div className="investors__side" data-reveal>
            <dl className="capital">
              <div>
                <dt>Common shares outstanding</dt>
                <dd>82,154,849</dd>
                <dd className="capital__note">As of July 23, 2026, per company release</dd>
              </div>
              <div>
                <dt>Private placement closed</dt>
                <dd>C$20.7M</dd>
                <dd className="capital__note">Gross proceeds, July 23, 2026</dd>
              </div>
            </dl>

            <div className="ir-contact">
              <p className="eyebrow">Investor relations</p>
              <p className="ir-contact__name">{investorContact.name}</p>
              <p className="ir-contact__role">{investorContact.role}</p>
              <a href={`mailto:${investorContact.email}`}>{investorContact.email}</a>
              <div className="ir-contact__actions">
                <Button href={routes.outlook} variant="primary">Investor Outlook</Button>
                <Button href={routes.rfi} variant="link">Request information</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="docs" data-stagger>
          <DocList title="Presentations & Research" items={presentations} />
          <DocList title="Financials & Filings" items={filings} />
          <div className="doc-col">
            <h3 className="doc-col__title">{agm.title}</h3>
            <p className="doc-col__note">{agm.when}</p>
            <ul>
              {agm.docs.map((d) => (
                <li key={d.label}>
                  <a href={d.href} target="_blank" rel="noopener noreferrer">
                    <span>{d.label}<small>PDF</small></span>
                    <ExternalArrow />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <DocList title="Governance" items={governanceDocs.map((d) => ({ ...d, meta: "PDF" }))} />
        </div>
      </div>
    </section>
  );
}
