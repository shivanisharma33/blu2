import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/page/PageHero";
import SubNav from "@/components/page/SubNav";
import { Eyebrow, Button, ExternalArrow } from "@/components/ui/primitives";
import { company, investorContact, routes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Details",
  description: "BluEnergies offices in Vancouver and London, and investor relations contact.",
  alternates: { canonical: routes.contact },
};

const offices = [
  {
    country: "Canada",
    city: "Vancouver",
    lines: ["Suite 2200 - 885 West Georgia Street", "Vancouver, BC Canada", "V6C 3E8"],
    map: "https://www.google.com/maps/search/?api=1&query=885+West+Georgia+Street+Vancouver+BC+V6C+3E8",
  },
  {
    country: "United Kingdom",
    city: "London",
    lines: ["Level 1, Devonshire House", "One Mayfair Place", "London, UK", "W1J 8AJ"],
    map: "https://www.google.com/maps/search/?api=1&query=Devonshire+House+One+Mayfair+Place+London+W1J+8AJ",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact BluEnergies."
        intro={<p>Offices in Vancouver and London. For investor and general enquiries, email us or send a request for information.</p>}
        crumbs={[{ label: "Contact", href: routes.contact }, { label: "Contact Details" }]}
        image="/images/coastline-aerial.jpg"
        imagePosition="center 40%"
      />
      <SubNav group="Contact" />

      <section className="section section--white" aria-labelledby="offices-title">
        <div className="container">
          <h2 id="offices-title" className="visually-hidden">Offices</h2>
          <div className="office-grid" data-stagger>
            {offices.map((o) => (
              <address key={o.country} className="office">
                <span className="eyebrow">{o.country}</span>
                <span className="office__city">{o.city}</span>
                <span className="office__lines">
                  {o.lines.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </span>
                <a className="read-more" href={o.map} target="_blank" rel="noopener noreferrer">
                  View on map <ExternalArrow />
                </a>
              </address>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="email-title">
        <div className="container">
          <div className="split-media">
            <figure className="split-media__figure" data-reveal="image">
              <Image src="/images/ocean-horizon.jpg" alt="Calm open ocean" fill sizes="(max-width: 1024px) 100vw, 640px" style={{ objectFit: "cover" }} />
            </figure>
            <div className="split-media__body" data-reveal>
              <Eyebrow>Email</Eyebrow>
              <h2 id="email-title" className="h2">General &amp; Investor Enquiries.</h2>
              <a className="big-mail" href={`mailto:${company.email}`}>{company.email}</a>
              <dl className="terms terms--plain">
                <div><dt>Investor relations</dt><dd>{investorContact.name}, {investorContact.role}</dd></div>
                <div><dt>Listings</dt><dd>TSXV: BLU · OTCQX: BLUGF · FSE: 66E</dd></div>
              </dl>
              <div className="btn-row">
                <Button href={routes.rfi}>Request Information</Button>
              </div>
              <div className="social-row">
                <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ExternalArrow /></a>
                <a href={company.social.youtube} target="_blank" rel="noopener noreferrer">YouTube <ExternalArrow /></a>
                <a href={company.social.x} target="_blank" rel="noopener noreferrer">X <ExternalArrow /></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
