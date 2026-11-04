"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { searchIndex } from "@/lib/search";
import { Arrow, ExternalArrow, SmartLink } from "./ui/primitives";

const SUGGESTED = ["Harper basin", "TotalEnergies", "Stock", "Presentation", "Board", "AGM"];

export default function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQ("");
      requestAnimationFrame(() => input.current?.focus());
    }
  }, [open]);

  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return searchIndex
      .filter((r) => {
        const hay = `${r.label} ${r.meta} ${r.keywords ?? ""}`.toLowerCase();
        return terms.every((t) => hay.includes(t));
      })
      .slice(0, 8);
  }, [q]);

  if (!open) return null;

  return (
    <div className="search" role="dialog" aria-modal="true" aria-label="Search BluEnergies" onClick={onClose}>
      <div className="search__panel" onClick={(e) => e.stopPropagation()}>
        <div className="container">
          <div className="search__bar">
            <label htmlFor="site-search" className="visually-hidden">Search</label>
            <input
              id="site-search"
              ref={input}
              type="search"
              autoComplete="off"
              placeholder="Search assets, news, documents…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button className="search__close" onClick={onClose}>Close</button>
          </div>

          {q.trim() === "" ? (
            <div className="search__suggest">
              <p className="eyebrow">Suggested</p>
              <div>
                {SUGGESTED.map((s) => (
                  <button key={s} onClick={() => setQ(s)}>{s}</button>
                ))}
              </div>
            </div>
          ) : results.length ? (
            <ul className="search__results" aria-live="polite">
              {results.map((r) => (
                <li key={r.href + r.label}>
                  <SmartLink href={r.href} onClick={onClose}>
                    <span className="search__meta">{r.meta}</span>
                    <span className="search__label">{r.label}</span>
                    {/^https?:/.test(r.href) ? <ExternalArrow /> : <Arrow />}
                  </SmartLink>
                </li>
              ))}
            </ul>
          ) : (
            <p className="search__empty" aria-live="polite">No results for “{q}”.</p>
          )}
        </div>
      </div>
    </div>
  );
}
