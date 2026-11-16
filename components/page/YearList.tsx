"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { siteDate } from "@/lib/original";
import { ExternalArrow, Arrow, SmartLink } from "../ui/primitives";

type Item = { date: string; title: string; href: string };

/**
 * Dated list with year tabs, matching the official News and In the Media listings
 * (date shown as MM.DD.YY, then the title).
 */
export default function YearList({ items, label, tabs = true }: { items: Item[]; label: string; tabs?: boolean }) {
  const years = Array.from(new Set(items.map((i) => i.date.slice(0, 4))));
  const [year, setYear] = useState(years[0]);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const shown = tabs ? items.filter((i) => i.date.startsWith(year)) : items;

  const onKey = (e: KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const n = (i + (e.key === "ArrowRight" ? 1 : -1) + years.length) % years.length;
    setYear(years[n]);
    refs.current[n]?.focus();
  };

  return (
    <div className="year-list">
      {tabs && (
        <div className="year-list__tabs" role="tablist" aria-label={`${label} by year`}>
          {years.map((y, i) => (
            <button
              key={y}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`yl-tab-${y}`}
              aria-selected={year === y}
              aria-controls="yl-panel"
              tabIndex={year === y ? 0 : -1}
              className={`chip ${year === y ? "is-active" : ""}`}
              onClick={() => setYear(y)}
              onKeyDown={(e) => onKey(e, i)}
            >
              {y}
            </button>
          ))}
        </div>
      )}
      <ul id="yl-panel" role={tabs ? "tabpanel" : undefined} aria-labelledby={tabs ? `yl-tab-${year}` : undefined} className="release-list">
        {shown.map((r) => {
          const external = /^https?:/.test(r.href);
          return (
            <li key={r.href}>
              <SmartLink href={r.href}>
                <time dateTime={r.date}>{siteDate(r.date)}</time>
                <span className="release-list__title">{r.title}</span>
                {external ? <ExternalArrow /> : <Arrow />}
              </SmartLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
