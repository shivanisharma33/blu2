"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Arrow, formatDate } from "../ui/primitives";
import { releaseHref } from "@/lib/releases";

type Item = { slug: string; date: string; title: string; category: string; excerpt: string };

const CATEGORIES = ["All", "Operations", "Financing", "Markets", "Corporate"];

/** Filterable release list: year and category. The newest release is featured above the list. */
export default function NewsIndex({ items }: { items: Item[] }) {
  const years = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.date.slice(0, 4))))], [items]);
  const [year, setYear] = useState("All");
  const [cat, setCat] = useState("All");

  const filtered = items.filter((i) => (year === "All" || i.date.startsWith(year)) && (cat === "All" || i.category === cat));
  const showFeature = year === "All" && cat === "All";
  const [featured, ...rest] = filtered;
  const list = showFeature ? rest : filtered;

  return (
    <section className="section section--white news-index" aria-label="News releases">
      <div className="container">
        <div className="filters" role="group" aria-label="Filter releases">
          <div className="filters__group">
            <span className="filters__label">Year</span>
            {years.map((y) => (
              <button key={y} className={`chip ${year === y ? "is-active" : ""}`} aria-pressed={year === y} onClick={() => setYear(y)}>
                {y}
              </button>
            ))}
          </div>
          <div className="filters__group">
            <span className="filters__label">Topic</span>
            {CATEGORIES.map((c) => (
              <button key={c} className={`chip ${cat === c ? "is-active" : ""}`} aria-pressed={cat === c} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>
          <p className="filters__count" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "release" : "releases"}
          </p>
        </div>

        {showFeature && featured && (
          <Link href={releaseHref(featured.slug)} className="release-feature">
            <div className="release-feature__date">
              <span>{formatDate(featured.date).split(",")[0]}</span>
              <strong>{featured.date.slice(0, 4)}</strong>
            </div>
            <div className="release-feature__body">
              <p className="tag">Latest · {featured.category}</p>
              <h2 className="h2 release-feature__title">{featured.title}</h2>
              <p className="muted">{featured.excerpt}</p>
              <span className="read-more">Read release <Arrow /></span>
            </div>
          </Link>
        )}

        {list.length ? (
          <ul className="release-list">
            {list.map((r) => (
              <li key={r.slug}>
                <Link href={releaseHref(r.slug)}>
                  <time dateTime={r.date}>{formatDate(r.date)}</time>
                  <span className="release-list__cat">{r.category}</span>
                  <span className="release-list__title">{r.title}</span>
                  <Arrow />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          !featured && <p className="empty">No releases match these filters.</p>
        )}
      </div>
    </section>
  );
}
