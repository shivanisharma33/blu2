import { Logo, ExternalArrow } from "./ui/primitives";
import { company, nav, legal } from "@/lib/content";

const ext = (href: string) => (/^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {});

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="footer" aria-labelledby="footer-title">
      <h2 id="footer-title" className="visually-hidden">Contact and site information</h2>
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo />
            <p>{company.about}</p>
          </div>
          <div className="footer__tickers">
            {company.tickers.map((t) => (
              <p key={t.symbol}>
                <span className="mono-label">{t.exchange}</span>
                <b>{t.symbol}</b>
              </p>
            ))}
          </div>
        </div>

        <div className="footer__grid">
          {nav.slice(0, 4).map((col) => (
            <nav key={col.label} aria-label={col.label} className="footer__col">
              <h3 className="mono-label">{col.label}</h3>
              <ul>
                {col.children.map((c) => (
                  <li key={c.label}>
                    <a href={c.href} {...ext(c.href)}>{c.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="footer__col footer__col--contact">
            <h3 className="mono-label">Contact</h3>
            {company.offices.map((o) => (
              <address key={o.country}>
                <span className="footer__office">{o.country}</span>
                {o.lines.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </address>
            ))}
            <a className="footer__mail" href={`mailto:${company.email}`}>{company.email}</a>
          </div>
        </div>

        <div className="footer__social">
          <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ExternalArrow /></a>
          <a href={company.social.youtube} target="_blank" rel="noopener noreferrer">YouTube <ExternalArrow /></a>
          <a href={company.social.x} target="_blank" rel="noopener noreferrer">X <ExternalArrow /></a>
        </div>

        <p className="footer__disclaimer">
          This website contains forward-looking information, including statements about the planned work programme, its timing and
          its expected results, potential production sharing contracts and the prospectivity of the Harper basin. Such statements
          involve known and unknown risks and uncertainties, and actual results may differ materially. Readers should refer to
          BluEnergies&apos; continuous disclosure documents available on SEDAR+. Neither the TSX Venture Exchange nor its Regulation
          Services Provider accepts responsibility for the adequacy or accuracy of this website.
        </p>

        <div className="footer__base">
          <p>© {year} BluEnergies Ltd. All rights reserved.</p>
          <div>
            <a href={legal.privacy} {...ext(legal.privacy)}>Privacy Policy</a>
            <a href={legal.terms} {...ext(legal.terms)}>Terms of Use</a>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
