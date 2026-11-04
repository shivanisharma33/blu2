"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Live, exchange-delayed quote from TradingView's official embed. No price is hard-coded.
 * The script loads only when the panel nears the viewport. If it fails, the fallback links to
 * the company's official stock page.
 */
export default function MarketWidget({ symbol, fallbackHref }: { symbol: string; fallbackHref: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let loaded = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || loaded) return;
        loaded = true;
        io.disconnect();
        const wrap = document.createElement("div");
        wrap.className = "tradingview-widget-container__widget";
        el.appendChild(wrap);
        const s = document.createElement("script");
        s.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
        s.async = true;
        s.onerror = () => setFailed(true);
        s.innerHTML = JSON.stringify({
          symbol,
          width: "100%",
          height: "100%",
          locale: "en",
          dateRange: "12M",
          colorTheme: "light",
          isTransparent: true,
          autosize: true,
          largeChartUrl: "",
          chartOnly: false,
          noTimeScale: false,
          trendLineColor: "rgba(22, 78, 104, 1)",
          underLineColor: "rgba(57, 137, 168, 0.16)",
          underLineBottomColor: "rgba(57, 137, 168, 0)",
        });
        el.appendChild(s);
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [symbol]);

  return (
    <div className="market-widget">
      <div ref={host} className="tradingview-widget-container" />
      {failed && (
        <a className="market-widget__fallback" href={fallbackHref} target="_blank" rel="noopener noreferrer">
          Live quote unavailable. View stock information on blu-energies.com
        </a>
      )}
    </div>
  );
}
