import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import LatestNews from "@/components/page/LatestNews";
import { legalSections } from "@/lib/releases";
import { banners, pageMeta } from "@/lib/original";
import { routes } from "@/lib/content";

export const metadata: Metadata = pageMeta("Legal", routes.legal);

const toId = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Section bodies come verbatim from the official /legal/ page via scripts/import-site.mjs. */
export default function LegalPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Legal" crumbs={[{ label: "Legal" }]} image={banners.legal} />

      <section className="section section--white" aria-label="Legal">
        <div className="container article__grid">
          <aside className="article__aside">
            <nav className="article__aside-inner toc" aria-label="Contents">
              <ul>
                {legalSections.map((s) => (
                  <li key={s.title}>
                    <a href={`#${toId(s.title)}`}>{s.title}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <div>
            {legalSections.map((s) => (
              <article key={s.title} id={toId(s.title)} className="prose legal-section">
                <h2>{s.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: s.html }} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <LatestNews title="News" />
    </>
  );
}
