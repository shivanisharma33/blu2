import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import SubNav from "@/components/page/SubNav";
import LatestNews from "@/components/page/LatestNews";
import { ExternalArrow, formatDate } from "@/components/ui/primitives";
import { media, routes } from "@/lib/content";

export const metadata: Metadata = {
  title: "In the Media",
  description: "BluEnergies and the Harper basin in the media: interviews, podcasts and coverage.",
  alternates: { canonical: routes.media },
};

const byYear = media.reduce<Record<string, typeof media>>((acc, m) => {
  (acc[m.date.slice(0, 4)] ??= []).push(m);
  return acc;
}, {});

export default function MediaPage() {
  const [featured, ...rest] = media;
  return (
    <>
      <PageHero
        eyebrow="News & Media"
        title="In the Media."
        intro={<p>Interviews, podcasts and coverage of BluEnergies and Liberia&apos;s deepwater potential.</p>}
        crumbs={[{ label: "News & Media", href: routes.news }, { label: "In the Media" }]}
        image="/images/ocean-surface.jpg"
        imagePosition="center 30%"
      />
      <SubNav group="News & Media" />

      <section className="section section--white" aria-label="Media coverage">
        <div className="container">
          <a href={featured.href} target="_blank" rel="noopener noreferrer" className="media-feature" data-reveal>
            <span className="media-feature__type">{featured.type}</span>
            <span className="media-feature__outlet">{featured.outlet} · {formatDate(featured.date)}</span>
            <span className="media-feature__title">{featured.title}</span>
            <span className="read-more read-more--light">Watch <ExternalArrow /></span>
          </a>

          {Object.entries(byYear)
            .sort(([a], [b]) => b.localeCompare(a))
            .map(([year, items]) => {
              const list = items.filter((m) => rest.includes(m));
              if (!list.length) return null;
              return (
                <div key={year} className="media-year">
                  <h2 className="media-year__label">{year}</h2>
                  <ul className="media-list" data-stagger>
                    {list.map((m) => (
                      <li key={m.href}>
                        <a href={m.href} target="_blank" rel="noopener noreferrer">
                          <span className="media-list__meta">
                            <span className="media-list__type">{m.type}</span>
                            {m.outlet}
                          </span>
                          <span className="media-list__title">{m.title}</span>
                          <time dateTime={m.date}>{formatDate(m.date)}</time>
                          <ExternalArrow />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
        </div>
      </section>

      <LatestNews />
    </>
  );
}
