"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/content";

/** Sibling pages of the current section, shown as a quiet tab bar under the page hero. */
export default function SubNav({ group }: { group: string }) {
  const pathname = usePathname();
  const g = nav.find((n) => n.label === group);
  if (!g) return null;
  const pages = g.children.filter((c) => !c.href.includes("#"));
  if (pages.length < 2) return null;

  return (
    <nav className="subnav" aria-label={`${g.label} pages`}>
      <div className="container subnav__inner">
        <span className="subnav__label">{g.label}</span>
        <ul>
          {pages.map((c) => {
            const active = pathname === c.href || pathname.startsWith(c.href + "/");
            return (
              <li key={c.href}>
                <Link href={c.href} className={active ? "is-active" : ""} aria-current={active ? "page" : undefined}>
                  {c.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
