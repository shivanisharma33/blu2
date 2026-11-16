import type { ReactNode } from "react";
import { ExternalArrow } from "../ui/primitives";

/** Main content band for inner pages that reproduce the official page content verbatim. */
export default function OriginalBody({ children, label, wide = false }: { children: ReactNode; label: string; wide?: boolean }) {
  return (
    <section className="section section--white" aria-label={label}>
      <div className="container">
        <div className={`prose original ${wide ? "original--wide" : ""}`} data-reveal>
          {children}
        </div>
      </div>
    </section>
  );
}

/** A row of document links, labelled exactly as on the official site. */
export function DocLinks({ items }: { items: { label: string; href: string }[] }) {
  return (
    <ul className="doc-links">
      {items.map((d) => (
        <li key={d.href}>
          <a href={d.href} target="_blank" rel="noopener noreferrer">
            <span>{d.label}</span>
            <ExternalArrow />
          </a>
        </li>
      ))}
    </ul>
  );
}
