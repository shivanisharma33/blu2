import type { ReactNode } from "react";

export function SectionLabel({ children, className = "" }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={`section-label ${className}`} data-reveal="fade">
      <span className="section-label__rule" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={`arrow ${className}`} width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden>
      <path d="M0 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ExternalArrow({ className = "" }: { className?: string }) {
  return (
    <svg className={`arrow arrow--ext ${className}`} width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <path d="M1 10L10 1M3 1h7v7" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost" | "text";
  tone?: "light" | "dark";
  external?: boolean;
  className?: string;
};

export function Button({ href, children, variant = "solid", tone = "dark", external, className = "" }: BtnProps) {
  const ext = external ?? /^https?:/.test(href);
  return (
    <a
      href={href}
      className={`btn btn--${variant} btn--on-${tone} ${className}`}
      {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="btn__label">{children}</span>
      <span className="btn__icon">{ext ? <ExternalArrow /> : <Arrow />}</span>
    </a>
  );
}

export function Logo({ variant = "white", className = "" }: { variant?: "white" | "color"; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={variant === "white" ? "/brand/bluenergies-logo-white.svg" : "/brand/bluenergies-logo.svg"}
      alt="BluEnergies Ltd."
      width={252}
      height={47}
      className={`logo ${className}`}
    />
  );
}

export function formatDate(iso: string, style: "long" | "short" = "long") {
  const d = new Date(iso + "T12:00:00Z");
  return d.toLocaleDateString("en-US", style === "long" ? { month: "long", day: "numeric", year: "numeric" } : { month: "short", day: "2-digit", year: "numeric" });
}
