/**
 * Content taken verbatim from the official inner pages of https://www.blu-energies.com
 * (extracted 2026-11-16; full record in docs/inner-pages-content.md). Wording, spelling,
 * capitalisation and punctuation are kept exactly as published.
 */
export const ORIGIN = "https://www.blu-energies.com";

/** Every inner page on the official site uses this meta description and "BluEnergies Ltd. - <Page>" as its title. */
export const SITE_DESCRIPTION =
  "BluEnergies Ltd. is a publically traded Canadian Oil & Gas company that creates value and opportunity for all stakeholders through disciplined and responsible investment across the energy spectrum.";

export const pageMeta = (page: string, canonical: string) => ({
  title: { absolute: `BluEnergies Ltd. - ${page}` },
  description: SITE_DESCRIPTION,
  alternates: { canonical },
  openGraph: { title: `BluEnergies Ltd. - ${page}`, description: SITE_DESCRIPTION },
});

/** Section banner photographs, downloaded from the official site's /_resources/banners/. */
export const banners = {
  corporate: "/images/site/corporate-v2.jpg",
  assets: "/images/site/assets-and-operations.jpg",
  investors: "/images/site/investors-v2.jpg",
  news: "/images/site/news-and-media.jpg",
  contact: "/images/site/contact.jpg",
  legal: "/images/site/hero_home.jpg",
};

/** /news-and-media/in-the-media/ — dates as MM.DD.YY on the source, stored here as ISO. */
export const inTheMedia = [
  { date: "2026-05-14", title: "SmithWeekly Research Discussion with Craig Steinke, CEO and Doug Allen, Senior Manager, Investor Relations", href: "https://youtu.be/XUNiuHwe3kc" },
  { date: "2026-05-06", title: "Wall Street Unplugged podcast with host, Frank Curzio, and BluEnergies CEO, Craig Steinke", href: "https://www.curzioresearch.com/this-tiny-offshore-driller-is-ahead-of-the-majors-in-the-global-energy-race/" },
  { date: "2026-04-15", title: "The Race to Discover Offshore Oil & Gas Reserves - BNN Bloomberg", href: "https://www.bnnbloomberg.ca/video/shows/commodities/2026/04/15/the-race-to-discover-offshore-oil-gas-reserves/" },
  { date: "2026-02-04", title: "Oil majors snap up West African blocks in hunt for next Brazil", href: `${ORIGIN}/news-and-media/in-the-media/oil-majors-snap-up-west-african-blocks-in-hunt-for-next-brazil/` },
  { date: "2024-11-27", title: "Liberia Emerges as Africa's Next Deep-Water Oil Hub - The Vaultz News", href: "https://thevaultznews.com/business/extractives-energy/liberia-emerges-as-africas-next-deep-water-oil-hub/" },
  { date: "2024-11-26", title: "Liberia: Africa's Top Deepwater Hydrocarbon Hotspot - African Energy Council", href: "https://africanenergycouncil.org/liberia-africas-top-deepwater-hydrocarbon-hotspot/" },
  { date: "2024-11-25", title: "Liberia Named Top Destination for Deepwater Hydrocarbon Exploration in Africa - FrontPageAfrica", href: "https://frontpageafricaonline.com/news/liberia-named-top-destination-for-deepwater-hydrocarbon-exploration-in-africa/" },
];

/** Source date format on the official listings, e.g. 05.14.26. */
export const siteDate = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${m}.${d}.${y.slice(2)}`;
};
