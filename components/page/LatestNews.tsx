import Link from "next/link";
import { latestReleases, releaseHref } from "@/lib/releases";
import { formatDate, Arrow } from "../ui/primitives";
import { routes } from "@/lib/content";

/** Closing band on inner pages: the three most recent releases. */
export default function LatestNews({ exclude, title = "Latest News" }: { exclude?: string; title?: string }) {
  const items = latestReleases(3, exclude);
  return (
    <section className="section latest" aria-labelledby="latest-title">
      <div className="container">
        <header className="row-head" data-reveal>
          <div>
            <p className="eyebrow">News &amp; Media</p>
            <h2 id="latest-title" className="h2">{title}</h2>
          </div>
          <Link href={routes.news} className="btn btn--secondary btn--on-light">
            <span>All News Releases</span>
            <Arrow />
          </Link>
        </header>
        <ul className="latest__grid" data-stagger>
          {items.map((r) => (
            <li key={r.slug}>
              <Link href={releaseHref(r.slug)} className="release-card">
                <p className="meta">
                  <time dateTime={r.date}>{formatDate(r.date)}</time>
                  <span>{r.category}</span>
                </p>
                <h3 className="release-card__title">{r.title}</h3>
                <span className="read-more">Read release <Arrow /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
