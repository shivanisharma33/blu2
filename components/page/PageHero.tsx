import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = { label: string; href?: string };

const PRESENTATION = "https://www.blu-energies.com/_resources/presentations/corporate-presentation.pdf";

/**
 * Opening band for every inner page: navy, a quiet photograph, breadcrumb, title and a short
 * introduction. It sits under the transparent header, which turns white on scroll.
 */
export default function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  image = "/images/ocean-surface.jpg",
  imagePosition = "center 60%",
  children,
  bannerLinks = true,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs: Crumb[];
  image?: string;
  imagePosition?: string;
  children?: ReactNode;
  /** The two buttons every banner carries on the official site. */
  bannerLinks?: boolean;
}) {
  return (
    <section className="page-hero" aria-labelledby="page-title">
      <div className="page-hero__media" aria-hidden>
        <Image src={image} alt="" fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: imagePosition }} />
      </div>
      <div className="page-hero__overlay" aria-hidden />
      <div className="container page-hero__inner">
        <nav aria-label="Breadcrumb" className="crumbs hero-in" style={{ ["--d" as string]: "0.05s" }}>
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label}>{c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow eyebrow--light hero-in" style={{ ["--d" as string]: "0.1s" }}>{eyebrow}</p>
        <h1 id="page-title" className="page-hero__title hero-in" style={{ ["--d" as string]: "0.15s" }}>
          {title}
        </h1>
        {intro && (
          <div className="page-hero__intro hero-in" style={{ ["--d" as string]: "0.25s" }}>
            {intro}
          </div>
        )}
        {children}
        {bannerLinks && (
          <div className="btn-row page-hero__links hero-in" style={{ ["--d" as string]: "0.3s" }}>
            {/* The official site's "Newsletter Signup" scrolls to its subscribe form; here the
                equivalent opt-in lives on the Request for Information form. */}
            <Link href="/contact/request-for-information" className="btn btn--secondary btn--on-dark">
              <span>Newsletter Signup</span>
            </Link>
            <a href={PRESENTATION} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--on-dark" aria-label="Corporate Presentation">
              <span>Corporate Presentation</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
