import Image from "next/image";
import { SectionHead, Button } from "../ui/primitives";
import { board, management, routes } from "@/lib/content";

type Person = (typeof board)[number] | (typeof management)[number];

function PersonCard({ p }: { p: Person }) {
  const initials = p.name.split(" ").map((s) => s[0]).join("");
  return (
    <li className="person">
      <div className="person__photo">
        {p.photo ? (
          <Image src={p.photo} alt={`Portrait of ${p.name}`} fill sizes="(max-width: 600px) 50vw, 280px" style={{ objectFit: "cover" }} />
        ) : (
          <span className="person__initials" aria-hidden>{initials}</span>
        )}
      </div>
      <h4 className="person__name">{p.name}</h4>
      <p className="person__role">{p.role}</p>
      <details className="person__bio">
        <summary>Biography</summary>
        <p>{p.bio}</p>
      </details>
    </li>
  );
}

export default function Leadership() {
  return (
    <section id="leadership" className="section section--white leadership" aria-labelledby="lead-title">
      <div className="container">
        <SectionHead
          eyebrow="Board & Management"
          id="lead-title"
          title="Experienced Stewardship."
          intro={
            <>
              <p className="lead">
                Decades of international exploration, discovery, capital markets and public-company governance experience, from
                Amoco, BP, Anadarko and Eni to TSX and TSXV boardrooms.
              </p>
              <Button href={routes.board} variant="link">Full biographies</Button>
            </>
          }
        />

        <h3 className="group-label">Board of Directors</h3>
        <ul className="people" data-stagger>
          {board.map((p) => <PersonCard key={p.name} p={p} />)}
        </ul>

        <h3 className="group-label">Management</h3>
        <ul className="people" data-stagger>
          {management.map((p) => <PersonCard key={p.name} p={p} />)}
        </ul>
      </div>
    </section>
  );
}
