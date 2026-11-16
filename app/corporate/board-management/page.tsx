import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/page/PageHero";
import SubNav from "@/components/page/SubNav";
import LatestNews from "@/components/page/LatestNews";
import { boardBios, managementBios, slugify, type Bio } from "@/lib/people";
import { routes } from "@/lib/content";
import { banners, pageMeta } from "@/lib/original";

export const metadata: Metadata = pageMeta("Board & Management", routes.board);

/** Management in the order shown on the official page. */
const MANAGEMENT_ORDER = ["Vivien Chuang", "Michelle Borthwick", "Sergio Laura"];
const management = [...managementBios].sort((a, b) => MANAGEMENT_ORDER.indexOf(a.name) - MANAGEMENT_ORDER.indexOf(b.name));

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
        title="Board & Management"
        crumbs={[{ label: "Corporate", href: routes.about }, { label: "Board & Management" }]}
        image={banners.corporate}
      />
      <SubNav group="Corporate" />

      <div className="section section--white">
        <div className="container">
          <Group id="board" title="Board of Directors" people={boardBios} />
          <Group id="management" title="Management" people={management} />
        </div>
      </div>

      <LatestNews title="News" />
    </>
  );
}
