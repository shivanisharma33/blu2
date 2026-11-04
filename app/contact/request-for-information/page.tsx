import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import SubNav from "@/components/page/SubNav";
import RfiForm from "@/components/page/RfiForm";
import { company, investorContact, routes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Request for Information",
  description: "Request information from BluEnergies Ltd. or join the email list.",
  alternates: { canonical: routes.rfi },
};

export default function RfiPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Request for Information."
        intro={<p>Investors, analysts, shareholders, journalists and industry professionals can reach BluEnergies here.</p>}
        crumbs={[{ label: "Contact", href: routes.contact }, { label: "Request for Information" }]}
        image="/images/ocean-surface.jpg"
        imagePosition="center 70%"
      />
      <SubNav group="Contact" />

      <section className="section section--white" aria-labelledby="form-title">
        <div className="container rfi">
          <div className="rfi__form" data-reveal>
            <h2 id="form-title" className="h3">Your details</h2>
            <RfiForm />
          </div>
          <aside className="rfi__aside" data-reveal>
            <p className="eyebrow">Direct contact</p>
            <a className="big-mail big-mail--sm" href={`mailto:${company.email}`}>{company.email}</a>
            <p className="muted">
              {investorContact.name}
              <br />
              {investorContact.role}
            </p>
            {company.offices.map((o) => (
              <address key={o.country} className="rfi__office">
                <strong>{o.country}</strong>
                {o.lines.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </address>
            ))}
          </aside>
        </div>
      </section>
    </>
  );
}
