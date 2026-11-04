import data from "./data/releases.json";
import legalData from "./data/legal.json";

/**
 * News releases imported from the official site by `node scripts/import-site.mjs`.
 * `html` is already reduced to a safe allowlist of tags (p, strong, em, a, ul, ol, li, br, h3, h4).
 */
export type Release = {
  slug: string;
  date: string;
  title: string;
  category: "Operations" | "Financing" | "Markets" | "Corporate";
  dateline: string | null;
  excerpt: string;
  html: string;
  source: string;
};

export const releases = data as Release[];
export const releaseHref = (slug: string) => `/news-and-media/news/${slug}`;
export const getRelease = (slug: string) => releases.find((r) => r.slug === slug);
export const latestReleases = (n = 3, exclude?: string) => releases.filter((r) => r.slug !== exclude).slice(0, n);

export type LegalSection = { title: string; html: string };
export const legalSections = legalData as LegalSection[];
