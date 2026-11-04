import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import SubNav from "@/components/page/SubNav";
import LatestNews from "@/components/page/LatestNews";
import IrContact from "@/components/page/IrContact";
import MarketWidget from "@/components/sections/MarketWidget";
import { Eyebrow } from "@/components/ui/primitives";
import { routes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Stock Information",
  description: "BluEnergies trades on the TSX Venture Exchange (BLU), the OTCQX Best Market (BLUGF) and the Frankfurt Stock Exchange (66E).",
  alternates: { canonical: routes.stock },
};

const listings = [
  { ex: "TSX Venture Exchange", sym: "TSXV: BLU", since: "Trading since April 14, 2025", ccy: "CAD" },
  { ex: "OTCQX Best Market", sym: "OTCQX: BLUGF", since: "Trading since March 30, 2026", ccy: "USD" },
  { ex: "Frankfurt Stock Exchange", sym: "FSE: 66E", since: "Germany", ccy: "EUR" },
];

const capital = [
  { k: "Common shares outstanding", v: "82,154,849", note: "As of July 23, 2026, per company release" },
  { k: "Private placement closed", v: "C$20.7M", note: "Gross proceeds, July 23, 2026 · 9,202,027 units at C$2.25" },
  { k: "U.S. settlement", v: "DTC eligible", note: "Announced April 27, 2026" },
];

export default function StockPage() {
  return (
    <>
      <PageHero
        eyebrow="Investors"
        title="Stock Information."
        intro={<p>Live market data for BluEnergies Ltd. on the TSX Venture Exchange and the OTCQX Best Market.</p>}
        crumbs={[{ label: "Investors", href: routes.outlook }, { label: "Stock Information" }]}
        image="/images/ocean-horizon.jpg"
        imagePosition="center 75%"
      />
      <SubNav group="Investors" />

      <section className="section section--white" aria-labelledby="quotes-title">
        <div className="container">
          <h2 id="quotes-title" className="visually-hidden">Live quotes</h2>
          <div className="quote-grid">
            <div className="quote-panel quote-panel--tall" data-reveal>
              <div className="quote-panel__head">
                <p className="eyebrow">TSX Venture Exchange · BLU</p>
                <span>CAD · via TradingView, may be delayed</span>
              </div>
              <MarketWidget symbol="TSXV:BLU" fallbackHref="https://www.tradingview.com/symbols/TSXV-BLU/" />
            </div>
            <div className="quote-panel quote-panel--tall" data-reveal>
              <div className="quote-panel__head">
                <p className="eyebrow">OTCQX Best Market · BLUGF</p>
                <span>USD · via TradingView, may be delayed</span>
              </div>
              <MarketWidget symbol="OTC:BLUGF" fallbackHref="https://www.tradingview.com/symbols/OTC-BLUGF/" />
            </div>
          </div>
          <p className="fineprint" style={{ marginTop: 16 }}>
            Market data is provided by TradingView and may be delayed. It is shown for information only and is not investment advice.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="listings-title">
        <div className="container">
          <header className="row-head" data-reveal>
            <div>
              <Eyebrow>Listings</Eyebrow>
              <h2 id="listings-title" className="h2">Where BluEnergies Trades.</h2>
            </div>
          </header>
          <dl className="listing-cards" data-stagger>
            {listings.map((l) => (
              <div key={l.sym}>
                <dt>{l.ex}</dt>
                <dd className="listing-cards__sym">{l.sym}</dd>
                <dd className="listing-cards__meta">{l.since} · {l.ccy}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section--white" aria-labelledby="cap-title">
        <div className="container grid">
          <div className="col-head" data-reveal>
            <Eyebrow>Capital Markets</Eyebrow>
            <h2 id="cap-title" className="h2">Share Structure.</h2>
            <p className="muted" style={{ marginTop: 20 }}>Figures as reported in the company&apos;s news releases.</p>
          </div>
          <dl className="col-body capital capital--rows" data-stagger>
            {capital.map((c) => (
              <div key={c.k}>
                <dt>{c.k}</dt>
                <dd>{c.v}</dd>
                <dd className="capital__note">{c.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <IrContact />
      <LatestNews />
    </>
  );
}
