import Image from "next/image";
import Link from "next/link";
import { Eyebrow, Button, Arrow, formatDate } from "../ui/primitives";
import { news, routes } from "@/lib/content";

export default function News() {
  const corporate = news.filter((n) => n.stream === "corporate");
  const [featured, ...rest] = corporate;
  const secondary = rest.slice(0, 3);

  return (
    <section id="news" className="section news" aria-labelledby="news-title">
      <div className="container">
        <header className="row-head" data-reveal>
          <div>
            <Eyebrow>News &amp; Media</Eyebrow>
            <h2 id="news-title" className="h2">Latest Developments.</h2>
          </div>
          <Button href={routes.news} variant="secondary">View All News</Button>
        </header>

        <div className="news__grid">
          <Link className="news-feature" href={featured.href} data-reveal>
            <div className="news-feature__media">
              <Image src="/images/ocean-dusk.jpg" alt="" fill sizes="(max-width: 900px) 100vw, 760px" style={{ objectFit: "cover" }} />
            </div>
            <div className="news-feature__body">
              <p className="meta">
                <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                <span>{featured.category}</span>
              </p>
              <h3 className="h3">{featured.title}</h3>
              <p>{featured.excerpt}</p>
              <span className="read-more">Read more <Arrow /></span>
            </div>
          </Link>

          <ul className="news-list" data-stagger>
            {secondary.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>
                  <p className="meta">
                    <time dateTime={n.date}>{formatDate(n.date)}</time>
                    <span>{n.category}</span>
                  </p>
                  <h3 className="news-list__title">{n.title}</h3>
                  <span className="read-more">Read more <Arrow /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
