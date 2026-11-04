import type { ReactNode } from "react";
import Link from "next/link";

export const isExternal = (href: string) => /^(https?:|mailto:)/.test(href);
export const extProps = (href: string) => (/^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {});

/** Internal routes use client-side navigation; external URLs, mailto and in-page anchors use a plain anchor. */
export function SmartLink({ href, children, className, onClick, ...rest }: { href: string; children: ReactNode; className?: string; onClick?: () => void; "aria-label"?: string }) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} onClick={onClick} {...extProps(href)} {...rest}>
      {children}
    </a>
  );
}

/** Small uppercase label that sits above a section heading. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

/** Standard section heading block: eyebrow, title, optional intro. */
export function SectionHead({
  eyebrow,
  title,
  id,
  intro,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  id: string;
  intro?: ReactNode;
  className?: string;
}) {
  return (
    <header className={`section-head ${className}`}>
      <div className="section-head__title" data-reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id} className="h2">{title}</h2>
      </div>
      {intro && (
        <div className="section-head__intro" data-reveal>
          {intro}
        </div>
      )}
    </header>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={`icon-arrow ${className}`} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ExternalArrow({ className = "" }: { className?: string }) {
  return (
    <svg className={`icon-arrow icon-arrow--ext ${className}`} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M4 10L10 4M5 4h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "link";
  /** "light" = sits on a light background, "dark" = sits on navy or a photo. */
  on?: "light" | "dark";
  className?: string;
};

export function Button({ href, children, variant = "primary", on = "light", className = "" }: BtnProps) {
  const ext = /^https?:/.test(href);
  return (
    <SmartLink href={href} className={`btn btn--${variant} btn--on-${on} ${className}`}>
      <span>{children}</span>
      {ext ? <ExternalArrow /> : <Arrow />}
    </SmartLink>
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
  return d.toLocaleDateString(
    "en-US",
    style === "long" ? { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" } : { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" },
  );
}
