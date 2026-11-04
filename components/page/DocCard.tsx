import { ExternalArrow } from "../ui/primitives";

/** A downloadable document: a quiet card with a PDF-style mark, title, short note and link. */
export default function DocCard({ title, meta, text, href, wide = false }: { title: string; meta: string; text?: string; href: string; wide?: boolean }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`doc-card ${wide ? "doc-card--wide" : ""}`}>
      <span className="doc-card__mark" aria-hidden>
        <svg width="28" height="34" viewBox="0 0 28 34" fill="none">
          <path d="M1 1h18l8 8v24H1z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M19 1v8h8" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6 18h16M6 23h16M6 28h10" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </span>
      <span className="doc-card__meta">{meta}</span>
      <span className="doc-card__title">{title}</span>
      {text && <span className="doc-card__text">{text}</span>}
      <span className="read-more">
        Open document <ExternalArrow />
      </span>
    </a>
  );
}
