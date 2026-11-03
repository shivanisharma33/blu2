"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionLabel, Button } from "../ui/primitives";
import { board, management, ORIGIN } from "@/lib/content";

type Person = (typeof board)[number] | (typeof management)[number];

function Row({ p, id, open, onToggle }: { p: Person; id: string; open: boolean; onToggle: () => void }) {
  const initials = p.name.split(" ").map((s) => s[0]).join("");
  return (
    <li className={`person ${open ? "is-open" : ""}`}>
      <button className="person__row" aria-expanded={open} aria-controls={`${id}-bio`} onClick={onToggle}>
        <span className="person__name">{p.name}</span>
        <span className="person__role mono-label">{p.role}</span>
        <span className="person__toggle" aria-hidden />
      </button>
      <div id={`${id}-bio`} className="person__panel" role="region" aria-label={`${p.name} biography`}>
        <div className="person__panel-inner">
          <div className="person__photo">
            {p.photo ? (
              <Image src={p.photo} alt={`Portrait of ${p.name}`} fill sizes="200px" style={{ objectFit: "cover" }} />
            ) : (
              <span className="person__initials" aria-hidden>{initials}</span>
            )}
          </div>
          <p>{p.bio}</p>
        </div>
      </div>
    </li>
  );
}

export default function Leadership() {
  const [open, setOpen] = useState<string | null>(null);
  const toggle = (id: string) => setOpen((o) => (o === id ? null : id));

  return (
    <section id="leadership" className="lead-sec section--white" aria-labelledby="lead-title">
      <div className="container">
        <div className="lead-sec__grid">
          <header className="lead-sec__head">
            <SectionLabel>Board &amp; Management</SectionLabel>
            <h2 id="lead-title" className="display-lg" data-reveal="lines">
              Experienced <em>Stewardship.</em>
            </h2>
            <p data-reveal="fade">
              The board and management team bring decades of international exploration, discovery, capital markets and public
              company governance experience, from Amoco, BP, Anadarko and Eni to TSX and TSXV boardrooms.
            </p>
            <div data-reveal="fade">
              <Button href={`${ORIGIN}/corporate/board-management/`} variant="text" tone="light">Full biographies</Button>
            </div>
          </header>

          <div className="lead-sec__lists">
            <div>
              <h3 className="mono-label lead-sec__group">Board of Directors</h3>
              <ul className="people">
                {board.map((p, i) => (
                  <Row key={p.name} p={p} id={`board-${i}`} open={open === `board-${i}`} onToggle={() => toggle(`board-${i}`)} />
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mono-label lead-sec__group">Management</h3>
              <ul className="people">
                {management.map((p, i) => (
                  <Row key={p.name} p={p} id={`mgmt-${i}`} open={open === `mgmt-${i}`} onToggle={() => toggle(`mgmt-${i}`)} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
