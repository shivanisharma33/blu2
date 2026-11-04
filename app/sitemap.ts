import type { MetadataRoute } from "next";
import { routes } from "@/lib/content";
import { releases, releaseHref } from "@/lib/releases";

const BASE = "https://www.blu-energies.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", ...Object.values(routes)].map((p) => ({ url: BASE + p, changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.7 }));
  const news = releases.map((r) => ({ url: BASE + releaseHref(r.slug), lastModified: r.date, changeFrequency: "yearly" as const, priority: 0.5 }));
  return [...pages, ...news];
}
