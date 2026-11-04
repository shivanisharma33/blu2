import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LatestNews from "@/components/page/LatestNews";
import { Arrow, ExternalArrow, formatDate } from "@/components/ui/primitives";
import { releases, getRelease, releaseHref } from "@/lib/releases";
import { routes, investorContact } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams() {
  return releases.map((r) => ({ slug: r.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const r = getRelease(slug);
  if (!r) return {};
  return {
    title: r.title,
    description: r.excerpt,
    alternates: { canonical: releaseHref(r.slug) },
    openGraph: { type: "article", title: r.title, description: r.excerpt, publishedTime: r.date },
  };
}

export default async function ReleasePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const r = getRelease(slug);
  if (!r) notFound();

  const i = releases.indexOf(r);
  const newer = releases[i - 1];
  const older = releases[i + 1];

  const ld = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: r.title,
    datePublished: r.date,
    publisher: { "@type": "Organization", name: "BluEnergies Ltd." },
    mainEntityOfPage: `https://www.blu-energies.com${releaseHref(r.slug)}`,
  };

  return (
    <>
      <section className="article-hero" aria-labelledby="page-title">
        <div className="container article-hero__inner">
          <nav aria-label="Breadcrumb" className="crumbs hero-in">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href={routes.news}>News</Link></li>
              <li><span aria-current="page">Release</span></li>
            </ol>
          </nav>
          <p className="article-hero__meta hero-in" style={{ ["--d" as string]: "0.05s" }}>
            <time dateTime={r.date}>{formatDate(r.date)}</time>
            <span>{r.category}</span>
          </p>
          <h1 id="page-title" className="article-hero__title hero-in" style={{ ["--d" as string]: "0.12s" }}>
            {r.title}
          </h1>
        </div>
      </section>

      <section className="section section--white article" aria-label="Release">
        <div className="container article__grid">
          <aside className="article__aside">
            <div className="article__aside-inner">
              <p className="article__aside-label">Published</p>
              <p className="article__aside-value">{formatDate(r.date)}</p>
              <p className="article__aside-label">Topic</p>
              <p className="article__aside-value">{r.category}</p>
              <p className="article__aside-label">Media &amp; IR enquiries</p>
              <a className="article__aside-value u-link" href={`mailto:${investorContact.email}`}>{investorContact.email}</a>
              <a className="read-more article__source" href={r.source} target="_blank" rel="noopener noreferrer">
                Original release <ExternalArrow />
              </a>
            </div>
          </aside>

          <article className="prose" dangerouslySetInnerHTML={{ __html: r.html }} />
        </div>

        <nav className="container pager" aria-label="More releases">
          {older ? (
            <Link href={releaseHref(older.slug)} className="pager__link">
              <span className="pager__dir">Previous release</span>
              <span className="pager__title">{older.title}</span>
            </Link>
          ) : <span />}
          {newer ? (
            <Link href={releaseHref(newer.slug)} className="pager__link pager__link--next">
              <span className="pager__dir">Next release</span>
              <span className="pager__title">{newer.title}</span>
            </Link>
          ) : <span />}
        </nav>
        <div className="container">
          <Link href={routes.news} className="btn btn--secondary btn--on-light">
            <span>All News Releases</span>
            <Arrow />
          </Link>
        </div>
      </section>

      <LatestNews exclude={r.slug} title="More News" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
