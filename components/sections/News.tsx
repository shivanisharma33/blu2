"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { SectionLabel, ExternalArrow, Button, formatDate } from "../ui/primitives";
import { news, ORIGIN } from "@/lib/content";

const imageFor: Record<string, string> = {
  Operations: "/images/seismic-cenomanian-fans.jpg",
  Partnership: "/images/seismic-turonian-fans.jpg",
  Financing: "/images/ocean-horizon.jpg",
  Markets: "/images/ocean-dusk.jpg",
  Corporate: "/images/ocean-surface.jpg",
};

export default function News() {
  const featured = news.find((n) => n.category === "Operations")!;
  const rest = news.filter((n) => n !== featured);
  const [hover, setHover] = useState<number | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const p = preview.current, l = listRef.current;
    if (!p || !l) return;
    const r = l.getBoundingClientRect();
    p.style.transform = `translate3d(${e.clientX - r.left + 28}px, ${e.clientY - r.top - 90}px, 0)`;
  };

  return (
    <section id="news" className="news section--paper" aria-labelledby="news-title">
      <div className="container">
        <header className="news__head">
          <div>
            <SectionLabel>News &amp; Corporate Updates</SectionLabel>
            <h2 id="news-title" className="display-xl" data-reveal="lines">
              Latest <em>Developments.</em>
            </h2>
          </div>
          <Button href={`${ORIGIN}/news-and-media/news/`} variant="text" tone="light">All news releases</Button>
        </header>

        <a className="news-feature" href={featured.href} target="_blank" rel="noopener noreferrer">
          <div className="news-feature__media" data-reveal="mask">
            <Image src={imageFor[featured.category]} alt="" fill sizes="(max-width: 900px) 100vw, 60vw" style={{ objectFit: "cover" }} />
            <span className="news-feature__tag mono-label">Featured · {featured.category}</span>
          </div>
          <div className="news-feature__body">
            <time className="mono-label" dateTime={featured.date}>{formatDate(featured.date)}</time>
            <h3>{featured.title}</h3>
            <p>{featured.excerpt}</p>
            <span className="news-feature__read">
              Read release <ExternalArrow />
            </span>
          </div>
        </a>

        <div className="news-list-wrap" ref={listRef} onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
        <ul className="news-list">
          {rest.map((n, i) => (
            <li key={n.href} onMouseEnter={() => setHover(i)}>
              <a href={n.href} target="_blank" rel="noopener noreferrer">
                <time className="news-list__date" dateTime={n.date}>{formatDate(n.date, "short")}</time>
                <span className="news-list__cat mono-label">{n.category}</span>
                <span className="news-list__title">{n.title}</span>
                <span className="news-list__go" aria-hidden><ExternalArrow /></span>
              </a>
            </li>
          ))}
        </ul>
          <div ref={preview} className={`news-preview ${hover !== null ? "is-visible" : ""}`} aria-hidden>
            {rest.map((n, i) => (
              <div key={n.href} className={`news-preview__img ${hover === i ? "is-active" : ""}`}>
                <Image src={imageFor[n.category]} alt="" fill sizes="320px" style={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
