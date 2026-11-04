import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/page/PageHero";
import SubNav from "@/components/page/SubNav";
import LatestNews from "@/components/page/LatestNews";
import { boardBios, managementBios, slugify, type Bio } from "@/lib/people";
import { routes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Board & Management",
  description: "The BluEnergies board of directors and management team.",
  alternates: { canonical: routes.board },
};

function Profile({ p }: { p: Bio }) {
  const initials = p.name.split(" ").map((s) => s[0]).join("");
  return (
    <article id={slugify(p.name)} className="profile" data-reveal>
      <div className="profile__photo">
        {p.photo ? (
          <Image src={p.photo} alt={`Portrait of ${p.name}`} fill sizes="(max-width: 767px) 100vw, 300px" style={{ objectFit: "cover", objectPosition: "center 18%" }} />
        ) : (
          <span className="person__initials" aria-hidden>{initials}</span>
        )}
      </div>
      <div className="profile__body">
        <h3 className="h3">{p.name}</h3>
        <p className="profile__role">{p.role}</p>
        <div className="profile__bio">
          {p.paragraphs.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </div>
      </div>
    </article>
  );
}

function Group({ id, title, people }: { id: string; title: string; people: Bio[] }) {
  return (
    <section id={id} className="profiles" aria-labelledby={`${id}-title`}>
      <div className="profiles__head">
        <h2 id={`${id}-title`} className="h2">{title}</h2>
        <ul className="profiles__index">
          {people.map((p) => (
            <li key={p.name}>
              <a href={`#${slugify(p.name)}`}>
                {p.name}
                <span>{p.role}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="profiles__list">
        {people.map((p) => (
          <Profile key={p.name} p={p} />
        ))}
      </div>
    </section>
  );
}

export default function BoardPage() {
  return (
    <>
      <PageHero
        eyebrow="Corporate"
        title="Board & Management."
        intro={
          <p>
            Decades of international exploration, discovery, capital markets and public-company governance experience, from Amoco, BP,
            Anadarko and Eni to TSX and TSXV boardrooms.
          </p>
        }
        crumbs={[{ label: "Corporate", href: routes.about }, { label: "Board & Management" }]}
        image="/images/ocean-dusk.jpg"
        imagePosition="center 65%"
      />
      <SubNav group="Corporate" />

      <div className="section section--white">
        <div className="container">
          <Group id="board" title="Board of Directors" people={boardBios} />
          <Group id="management" title="Management" people={managementBios} />
        </div>
      </div>

      <LatestNews />
    </>
  );
}
