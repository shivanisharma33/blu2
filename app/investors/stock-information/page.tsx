import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import SubNav from "@/components/page/SubNav";
import LatestNews from "@/components/page/LatestNews";
import OriginalBody from "@/components/page/OriginalBody";
import MarketWidget from "@/components/sections/MarketWidget";
import { banners, pageMeta } from "@/lib/original";
import { routes } from "@/lib/content";

export const metadata: Metadata = pageMeta("Stock Information", routes.stock);

/**
 * The official page shows a live quote table (timestamp, Symbol: BLU, Open, Last, Change, Volume,
 * Day Hi, Day Low) from its own feed. Those values change every trade, so they are not copied here;
 * the same live, delayed quote comes from TradingView instead.
 */
export default function StockPage() {
  return (
    <>
      <PageHero
        eyebrow="Investors"
        title="Stock Information"
        crumbs={[{ label: "Investors", href: routes.outlook }, { label: "Stock Information" }]}
        image={banners.investors}
      />
      <SubNav group="Investors" />

      <OriginalBody label="Stock Information" wide>
        <p>
          <strong>Symbol: BLU</strong>
        </p>
        <div className="quote-panel quote-panel--tall original__quote">
          <MarketWidget symbol="TSXV:BLU" fallbackHref={`https://www.blu-energies.com${routes.stock}/`} />
        </div>
      </OriginalBody>

      <LatestNews title="News" />
    </>
  );
}
