import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import { legalSections } from "@/lib/releases";
import { routes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy & Terms of Use",
  description: "BluEnergies Ltd. privacy policy and website terms of use.",
  alternates: { canonical: routes.legal },
};

const toId = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const SMALL = new Set(["of", "and", "the", "to", "in", "for"]);
const titleCase = (t: string) =>
  t
    .toLowerCase()
    .split(" ")
    .map((w, i) => (i > 0 && SMALL.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");

export default function LegalPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy & Terms of Use."
        intro={<p>How BluEnergies Ltd. handles personal information, and the terms that govern use of this website.</p>}
        crumbs={[{ label: "Legal" }]}
        image="/images/ocean-horizon.jpg"
        imagePosition="center 90%"
      />

      <section className="section section--white" aria-label="Legal">
        <div className="container article__grid">
          <aside className="article__aside">
            <nav className="article__aside-inner toc" aria-label="Contents">
              <p className="article__aside-label">Contents</p>
              <ul>
                {legalSections.map((s) => (
                  <li key={s.title}>
                    <a href={`#${toId(s.title)}`}>{titleCase(s.title)}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <div>
            {legalSections.map((s) => (
              <article key={s.title} id={toId(s.title)} className="prose legal-section">
                <h2>{titleCase(s.title)}</h2>
                <div dangerouslySetInnerHTML={{ __html: s.html }} />
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
