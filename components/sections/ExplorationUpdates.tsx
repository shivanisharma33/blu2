import Image from "next/image";
import Link from "next/link";
import { Eyebrow, Arrow, formatDate } from "../ui/primitives";
import { news } from "@/lib/content";

const imageFor: Record<string, { src: string; fit: "cover" | "contain"; plate?: boolean }> = {
  Operations: { src: "/video/survey-vessel-poster.jpg", fit: "cover" },
  Partnership: { src: "/images/seismic-turonian-fans.jpg", fit: "contain", plate: true },
  Assets: { src: "/images/coastline-aerial.jpg", fit: "cover" },
};

export default function ExplorationUpdates() {
  const items = news.filter((n) => n.stream === "exploration");
  const [featured, ...rest] = items;
  const fImg = imageFor[featured.category];

  return (
    <section id="exploration-updates" className="section updates" aria-labelledby="updates-title">
      <div className="container">
        <header className="row-head" data-reveal>
          <div>
            <Eyebrow>Exploration Updates</Eyebrow>
            <h2 id="updates-title" className="h2">Latest Exploration Developments.</h2>
          </div>
        </header>

        <Link className="update-feature" href={featured.href}>
          <div className="update-feature__media" data-reveal="image">
            <Image src={fImg.src} alt="" fill sizes="(max-width: 900px) 100vw, 820px" style={{ objectFit: fImg.fit }} />
          </div>
          <div className="update-feature__body" data-reveal>
            <p className="tag">{featured.asset}</p>
            <time className="meta" dateTime={featured.date}>{formatDate(featured.date)}</time>
            <h3 className="h3">{featured.title}</h3>
            <p>{featured.excerpt}</p>
            <span className="read-more">Read more <Arrow /></span>
          </div>
        </Link>

        <div className="update-grid">
          {rest.map((n) => {
            const img = imageFor[n.category];
            return (
              <Link key={n.href} className="update-card" href={n.href} data-reveal>
                <div className={`update-card__media ${img.plate ? "update-card__media--plate" : ""}`}>
                  <Image src={img.src} alt="" fill sizes="(max-width: 900px) 100vw, 640px" style={{ objectFit: img.fit }} />
                </div>
                <p className="tag">{n.asset}</p>
                <time className="meta" dateTime={n.date}>{formatDate(n.date)}</time>
                <h3 className="update-card__title">{n.title}</h3>
                <p>{n.excerpt}</p>
                <span className="read-more">Read more <Arrow /></span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
