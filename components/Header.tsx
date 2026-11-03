"use client";

import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/content";
import { Logo, ExternalArrow } from "./ui/primitives";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const [menu, setMenu] = useState(false);
  const [mobileSection, setMobileSection] = useState<number | null>(null);
  const lastY = useRef(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 600 && y > lastY.current + 4);
      if (y < lastY.current - 4) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
    document.documentElement.classList.toggle("menu-open", menu);
    if (menu) lenis?.stop();
    else lenis?.start();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        setOpen(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  const enter = (i: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(i);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  };

  const linkProps = (href: string) => (/^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {});

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${hidden && !menu && open === null ? "is-hidden" : ""} ${menu ? "is-menu" : ""}`}>
      <div className="site-header__inner">
        <a href="#top" className="site-header__logo" aria-label="BluEnergies — home">
          <Logo />
        </a>

        <nav className="primary-nav" aria-label="Primary">
          <ul>
            {nav.map((item, i) => (
              <li key={item.label} onMouseEnter={() => enter(i)} onMouseLeave={leave} className={open === i ? "is-open" : ""}>
                <a
                  href={item.href}
                  className="primary-nav__link"
                  aria-haspopup="true"
                  aria-expanded={open === i}
                  onFocus={() => enter(i)}
                  onClick={() => setOpen(null)}
                >
                  {item.label}
                </a>
                <div className="dropdown" onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && leave()}>
                  <p className="dropdown__eyebrow">
                    {item.label}
                  </p>
                  <ul>
                    {item.children.map((c) => (
                      <li key={c.label}>
                        <a href={c.href} {...linkProps(c.href)} onClick={() => setOpen(null)}>
                          <span>{c.label}</span>
                          {/^https?:/.test(c.href) ? <ExternalArrow /> : <span className="dropdown__dot" aria-hidden />}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__aside">
          <a href="#investors" className="ticker-chip" aria-label="Investor information: TSXV BLU, OTCQX BLUGF">
            <span className="ticker-chip__pulse" aria-hidden />
            <span>TSXV&nbsp;<b>BLU</b></span>
            <span className="ticker-chip__sep" aria-hidden />
            <span>OTCQX&nbsp;<b>BLUGF</b></span>
          </a>
          <a href="#investors" className="site-header__cta">
            Investor Centre
          </a>
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
        <div className="mobile-menu__body">
          <ul className="mobile-menu__list">
            {nav.map((item, i) => (
              <li key={item.label} className={mobileSection === i ? "is-open" : ""} style={{ ["--i" as string]: i }}>
                <button onClick={() => setMobileSection(mobileSection === i ? null : i)} aria-expanded={mobileSection === i}>
                  <span className="mobile-menu__label">{item.label}</span>
                  <span className="mobile-menu__plus" aria-hidden />
                </button>
                <div className="mobile-menu__sub">
                  <div>
                    {item.children.map((c) => (
                      <a key={c.label} href={c.href} {...linkProps(c.href)} onClick={() => setMenu(false)}>
                        {c.label}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mobile-menu__foot">
            <p>TSXV: BLU · OTCQX: BLUGF · FSE: 66E</p>
            <a href="mailto:info@blu-energies.com">info@blu-energies.com</a>
          </div>
        </div>
      </div>
    </header>
  );
}
