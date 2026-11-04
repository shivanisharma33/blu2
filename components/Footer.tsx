import { Logo, ExternalArrow, SmartLink } from "./ui/primitives";
import { company, nav, legal, investorContact } from "@/lib/content";

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
            <p className="footer__tickers">
              {company.tickers.map((t) => (
                <span key={t.symbol}>
                  {t.exchange}: <b>{t.symbol}</b>
                </span>
              ))}
            </p>
          </div>

          <div className="footer__contact">
            <p className="footer__heading">Contact</p>
            <div className="footer__offices">
              {company.offices.map((o) => (
                <address key={o.country}>
                  <span className="footer__office">{o.country}</span>
                  {o.lines.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </address>
              ))}
            </div>
            <p className="footer__mail">
              <span>General &amp; investor relations</span>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </p>
            <p className="footer__ir">
              {investorContact.name}, {investorContact.role}
            </p>
          </div>
        </div>

        <div className="footer__nav">
          {nav.map((col) => (
            <nav key={col.label} aria-label={col.label}>
              <p className="footer__heading">{col.label}</p>
              <ul>
                {col.children.map((c) => (
                  <li key={c.label}>
                    <SmartLink href={c.href}>{c.label}</SmartLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="footer__disclaimer">
          This website contains forward-looking information, including statements about the planned work programme, its timing and
          its expected results, potential production sharing contracts, the status of lease block SS-59 and the prospectivity of the
          Harper basin. Such statements involve known and unknown risks and uncertainties, and actual results may differ materially.
          Readers should refer to BluEnergies&apos; continuous disclosure documents available on SEDAR+. Neither the TSX Venture
          Exchange nor its Regulation Services Provider accepts responsibility for the adequacy or accuracy of this website.
        </p>

        <div className="footer__base">
          <p>© {year} BluEnergies Ltd. All rights reserved.</p>
          <div className="footer__links">
            <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ExternalArrow /></a>
            <a href={company.social.youtube} target="_blank" rel="noopener noreferrer">YouTube <ExternalArrow /></a>
            <a href={company.social.x} target="_blank" rel="noopener noreferrer">X <ExternalArrow /></a>
            <SmartLink href={legal.privacy}>Privacy Policy</SmartLink>
            <SmartLink href={legal.terms}>Terms of Use</SmartLink>
            <a href="#top">Back to top</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
