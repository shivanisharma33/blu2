import { routes, investorResources, governanceDocs, agm, media } from "./content";
import { releases, releaseHref } from "./releases";

export type SearchEntry = { label: string; meta: string; href: string; keywords?: string };

/** Static index for the header search: pages first, then releases, documents and media. */
export const searchIndex: SearchEntry[] = [
  { label: "Home", meta: "Page", href: "/", keywords: "bluenergies west africa deepwater oil gas explorer" },
  { label: "About Us", meta: "Corporate", href: routes.about, keywords: "company overview strategy basins founded 2021" },
  { label: "Board & Management", meta: "Corporate", href: routes.board, keywords: "craig steinke carol law cyrus driver don crossley sergio laura vivien chuang michelle borthwick directors" },
  { label: "Corporate Governance", meta: "Corporate", href: routes.governance, keywords: "code of conduct ethics anti-bribery corruption ESTMA" },
  { label: "Assets & Operations Overview", meta: "Assets & Operations", href: routes.overview, keywords: "harper basin liberia RL-003 LB-26 LB-30 LB-31 map fan play analogues stabroek seismic" },
  { label: "2026 Work Programme", meta: "Assets & Operations", href: `${routes.overview}#programme`, keywords: "seismic reprocessing TGS MBES geochemical heat flow GYRE" },
  { label: "Gulf of America · SS-59", meta: "Assets & Operations", href: `${routes.overview}#ss-59`, keywords: "louisiana crown royal BOEM lease" },
  { label: "Investor Outlook", meta: "Investors", href: routes.outlook, keywords: "investment highlights totalenergies 35% 65%" },
  { label: "Stock Information", meta: "Investors", href: routes.stock, keywords: "share price quote TSXV BLU OTCQX BLUGF FSE 66E chart" },
  { label: "Financials", meta: "Investors", href: routes.financials, keywords: "IFRS financial statements SEDAR SEDI filings" },
  { label: "Presentations", meta: "Investors", href: routes.presentations, keywords: "corporate presentation research report granite point fact sheet" },
  { label: "AGM", meta: "Investors", href: routes.agm, keywords: "annual general meeting proxy circular" },
  { label: "News Releases", meta: "News & Media", href: routes.news },
  { label: "In the Media", meta: "News & Media", href: routes.media, keywords: "reuters bnn bloomberg podcast interview" },
  { label: "Contact Details", meta: "Contact", href: routes.contact, keywords: "address office vancouver london email" },
  { label: "Request for Information", meta: "Contact", href: routes.rfi, keywords: "enquiry form email list" },
  { label: "Privacy Policy & Terms of Use", meta: "Legal", href: routes.legal },
  ...releases.map((r) => ({ label: r.title, meta: `News · ${r.date}`, href: releaseHref(r.slug), keywords: r.excerpt })),
  ...investorResources.map((r) => ({ label: r.label, meta: `Document · ${r.meta}`, href: r.href })),
  ...agm.docs.map((d) => ({ label: d.label, meta: "Document · AGM 2026", href: d.href })),
  ...governanceDocs.map((d) => ({ label: d.label, meta: "Document · Governance", href: d.href })),
  ...media.map((m) => ({ label: m.title, meta: `Media · ${m.outlet}`, href: m.href })),
];
