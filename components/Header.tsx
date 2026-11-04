"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, company, routes } from "@/lib/content";
import { Logo, Arrow } from "./ui/primitives";
import SearchDialog from "./SearchDialog";

type LenisLike = { stop(): void; start(): void };
const lenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis;

function Chevron() {
  return (
    <svg className="chev" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12.2 12.2L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** The section a path belongs to, e.g. "/investors/agm" → "/investors". */
const sectionOf = (path: string) => "/" + (path.split("/")[1] ?? "");

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [mobileSection, setMobileSection] = useState<number | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close every overlay after navigating.
  useEffect(() => {
    setOpen(null);
    setMenu(false);
    setSearch(false);
    setMobileSection(null);
  }, [pathname]);

  // Lock page scroll while an overlay is open; Escape closes everything.
  useEffect(() => {
    const locked = menu || search;
    document.documentElement.classList.toggle("is-locked", locked);
    if (locked) lenis()?.stop();
    else lenis()?.start();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        setOpen(null);
        setSearch(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu, search]);

  const enter = (i: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(i);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  const solid = scrolled || menu || open !== null;
  const current = sectionOf(pathname);

  return (
    <>
      <header className={`site-header ${solid ? "is-solid" : ""} ${menu ? "is-menu" : ""}`}>
        <div className="container site-header__inner">
          <Link href="/" className="site-header__logo" aria-label="BluEnergies home">
            <Logo variant="white" className="logo--white" />
            <Logo variant="color" className="logo--color" />
          </Link>

          <nav className="primary-nav" aria-label="Primary">
            <ul>
              {nav.map((item, i) => (
                <li
                  key={item.label}
                  onMouseEnter={() => enter(i)}
                  onMouseLeave={leave}
                  className={`${open === i ? "is-open" : ""} ${sectionOf(item.href) === current ? "is-current" : ""}`}
                >
                  <button
                    className="primary-nav__link"
                    aria-expanded={open === i}
                    aria-controls={`dd-${i}`}
                    onClick={() => setOpen(open === i ? null : i)}
                  >
                    {item.label}
                    <Chevron />
                  </button>
                  <div id={`dd-${i}`} className="dropdown" onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && leave()}>
                    <p className="dropdown__intro">{item.intro}</p>
                    <ul>
                      {item.children.map((c) => (
                        <li key={c.label}>
                          <Link href={c.href} onClick={() => setOpen(null)} aria-current={pathname === c.href ? "page" : undefined}>
                            <span>{c.label}</span>
                            <Arrow />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header__aside">
            <button className="icon-btn" aria-label="Search the site" onClick={() => setSearch(true)}>
              <SearchIcon />
            </button>
            <Link href={routes.outlook} className="site-header__cta">
              Investors
            </Link>
            <button
              className="menu-toggle"
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              aria-controls="mobile-menu"
              onClick={() => setMenu((m) => !m)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>

        <div id="mobile-menu" className="mobile-menu" aria-hidden={!menu} inert={!menu}>
          <div className="container mobile-menu__body">
            <ul className="mobile-menu__list">
              {nav.map((item, i) => (
                <li key={item.label} className={mobileSection === i ? "is-open" : ""}>
                  <button onClick={() => setMobileSection(mobileSection === i ? null : i)} aria-expanded={mobileSection === i}>
                    <span>{item.label}</span>
                    <Chevron />
                  </button>
                  <div className="mobile-menu__sub">
                    <div>
                      {item.children.map((c) => (
                        <Link key={c.label} href={c.href} onClick={() => setMenu(false)}>
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mobile-menu__foot">
              <Link href={routes.outlook} className="btn btn--primary btn--on-light" onClick={() => setMenu(false)}>
                <span>Investor Information</span>
              </Link>
              <p>TSXV: BLU · OTCQX: BLUGF · FSE: 66E</p>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </div>
          </div>
        </div>
      </header>

      <SearchDialog open={search} onClose={() => setSearch(false)} />
    </>
  );
}
