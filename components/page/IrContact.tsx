import { Button } from "../ui/primitives";
import { investorContact, routes } from "@/lib/content";

/** Navy band with the investor-relations contact, used across the Investors pages. */
export default function IrContact() {
  return (
    <section className="section section--navy ir-band" aria-labelledby="ir-title">
      <div className="container ir-band__inner">
        <div data-reveal>
          <p className="eyebrow">Investor Relations</p>
          <h2 id="ir-title" className="h2">Questions? Speak with Investor Relations.</h2>
        </div>
        <div className="ir-band__card" data-reveal>
          <p className="ir-contact__name">{investorContact.name}</p>
          <p className="ir-contact__role">{investorContact.role}</p>
          <a className="ir-band__mail" href={`mailto:${investorContact.email}`}>{investorContact.email}</a>
          <div className="btn-row">
            <Button href={routes.rfi} on="dark">Request Information</Button>
            <Button href={routes.contact} variant="secondary" on="dark">Contact Details</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
