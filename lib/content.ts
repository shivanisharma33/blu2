/**
 * BluEnergies — verified content.
 *
 * Every figure, name and date below is taken from the official website
 * (https://www.blu-energies.com) or the company's own news releases published there.
 * The source page is noted beside each block. Do not add figures that are not
 * traceable to a company disclosure.
 */

/** Base URL for corporate sub-pages that live on the official site. */
export const ORIGIN = "https://www.blu-energies.com";
const o = (path: string) => `${ORIGIN}${path}`;

export const company = {
  name: "BluEnergies Ltd.",
  tagline: "A West Africa Deepwater Oil & Gas Explorer",
  // /corporate/about-us/
  about:
    "BluEnergies Ltd. is a West Africa Deepwater Oil and Gas explorer. High success rates in basin floor fan plays have sparked an exploration boom along the West African Margin.",
  tickers: [
    { exchange: "TSXV", symbol: "BLU" },
    { exchange: "OTCQX", symbol: "BLUGF" },
    { exchange: "FSE", symbol: "66E" },
  ],
  email: "info@blu-energies.com",
  // /contact/contact-details/
  offices: [
    {
      country: "Canada",
      lines: ["Suite 2200 – 885 West Georgia Street", "Vancouver, BC V6C 3E8"],
    },
    {
      country: "United Kingdom",
      lines: ["Level 1, Devonshire House", "One Mayfair Place, London W1J 8AJ"],
    },
  ],
  social: {
    linkedin: "https://www.linkedin.com/company/bluenergies-ltd",
    youtube: "https://www.youtube.com/@BluEnergies",
    x: "https://x.com/bluenergiesltd",
  },
  video: "https://www.youtube.com/watch?v=-ZmxXdsUQsU",
};

/** Internal routes mirror the official site paths, so existing links keep working. */
export const routes = {
  about: "/corporate/about-us",
  board: "/corporate/board-management",
  governance: "/corporate/corporate-governance",
  overview: "/assets-and-operations/overview",
  outlook: "/investors/outlook",
  stock: "/investors/stock-information",
  financials: "/investors/financials",
  presentations: "/investors/presentations",
  agm: "/investors/agm",
  news: "/news-and-media/news",
  media: "/news-and-media/in-the-media",
  contact: "/contact/contact-details",
  rfi: "/contact/request-for-information",
  legal: "/legal",
};

export type NavGroup = { label: string; href: string; intro: string; children: { label: string; href: string }[] };

export const nav: NavGroup[] = [
  {
    label: "Corporate",
    href: routes.about,
    intro: "Who we are, how we are governed and the people leading the company.",
    children: [
      { label: "About Us", href: routes.about },
      { label: "Board & Management", href: routes.board },
      { label: "Corporate Governance", href: routes.governance },
    ],
  },
  {
    label: "Assets & Operations",
    href: routes.overview,
    intro: "Reconnaissance Licence RL-003 in the Harper basin, offshore Liberia, and lease block SS-59 in the Gulf of America.",
    children: [
      { label: "Overview", href: routes.overview },
      { label: "Harper Basin Map", href: `${routes.overview}#map` },
      { label: "2026 Work Programme", href: `${routes.overview}#programme` },
      { label: "Gulf of America · SS-59", href: `${routes.overview}#ss-59` },
    ],
  },
  {
    label: "Investors",
    href: routes.outlook,
    intro: "Outlook, live stock information, filings, presentations and AGM materials.",
    children: [
      { label: "Outlook", href: routes.outlook },
      { label: "Stock Information", href: routes.stock },
      { label: "Financials", href: routes.financials },
      { label: "Presentations", href: routes.presentations },
      { label: "AGM", href: routes.agm },
    ],
  },
  {
    label: "News & Media",
    href: routes.news,
    intro: "Company news releases and media coverage.",
    children: [
      { label: "News", href: routes.news },
      { label: "In the Media", href: routes.media },
    ],
  },
  {
    label: "Contact",
    href: routes.contact,
    intro: "Offices in Vancouver and London, and investor enquiries.",
    children: [
      { label: "Contact Details", href: routes.contact },
      { label: "Request for Information", href: routes.rfi },
    ],
  },
];

/* ---------------------------------------------------------------- Assets ---- */
// /assets-and-operations/overview/  and  news release 2026-01-15
export const licence = {
  name: "Reconnaissance Licence LPRA-003 (RL-003)",
  regulator: "Liberia Petroleum Regulatory Authority (LPRA)",
  term: "Up to June 30, 2027",
  blocks: ["LB-26", "LB-30", "LB-31"],
  areaKm2: 8924,
  areaAcres: "2.2 million acres",
  basinShare: "~40% of the Harper basin",
  seismicKm2: 6167,
  seismicNote: "3D seismic originally acquired by TGS in 2013",
  bluInterest: 35,
  partnerInterest: 65,
  distanceToShoreKm: 50,
  fans: 6,
};

export const assetFacts = [
  {
    value: 8924,
    unit: "km²",
    label: "Licence area",
    note: "RL-003 · Blocks LB-26, LB-30 & LB-31 · ≈2.2 million acres",
  },
  {
    value: 6167,
    unit: "km²",
    label: "3D seismic coverage",
    note: "Being fully reprocessed by TGS for BLU & TotalEnergies",
  },
  {
    value: 35,
    unit: "%",
    label: "Participating interest",
    note: "BluEnergies in RL-003, alongside TotalEnergies (65%)",
  },
  {
    value: 50,
    unit: "km",
    label: "Approximate proximity to shore",
    note: "Per company overview",
  },
];

/** Analogues exactly as stated on the official Assets overview page. */
export const analogues = [
  { name: "Calao", where: "Côte d'Ivoire", size: "1–1.5 billion boe (in place)" },
  { name: "Jubilee", where: "Ghana", size: "0.8 billion boe" },
  { name: "Venus", where: "Namibia", size: "4+ billion boe" },
  { name: "Mopane", where: "Namibia", size: "10 billion boe (in place)" },
  { name: "Stabroek", where: "Guyana · conjugate margin", size: "16+ billion barrels" },
];

/* ------------------------------------------------- Exploration programme ---- */
// news releases 2026-01-15 and 2026-07-06
export const programme = [
  {
    id: "reprocessing",
    index: "01",
    title: "3D seismic reprocessing",
    contractor: "TGS ASA, Oslo",
    body:
      "The entire 6,167 km² 3D dataset is being reprocessed to sharpen seismic character and definition and enhance AVO content, a direct hydrocarbon indicator.",
    status: "Commenced Nov 28, 2025 · over 50% complete as of July 6, 2026",
    layer: 3,
  },
  {
    id: "mbes",
    index: "02",
    title: "Multi-beam echo sounder survey",
    contractor: "GeoPartners Ltd · R/V GYRE (TDI-Brooks)",
    body:
      "Mapping 4,045 km² of seabed in 500 m to 3,500 m of water. Seabed features and water-column anomalies are identified to support the safe selection of future drilling locations.",
    status: "Acquisition commenced June 19, 2026",
    layer: 1,
  },
  {
    id: "geochem",
    index: "03",
    title: "Seabed geochemical sampling",
    contractor: "Piston coring",
    body:
      "Cores are collected to look for evidence of migrated mature hydrocarbons, such as fluorescent oil compounds, hydrocarbon chromatography and thermogenic origin.",
    status: "Part of the sea-bottom programme",
    layer: 2,
  },
  {
    id: "heatflow",
    index: "04",
    title: "Heat-flow measurements",
    contractor: "Sea-bottom programme",
    body:
      "Measures relative sediment temperature and the thermal history of the undrilled Harper basin. The data feeds a refined interpretation of the basin-floor fan leads.",
    status: "Project completion expected 4Q 2026",
    layer: 4,
  },
];

/* ------------------------------------------------------------- Timeline ---- */
export const milestones = [
  { date: "2021", title: "BluEnergies founded", body: "A proactive, technology-driven selection process, evaluating more than 30 African and South American basins." },
  { date: "2023", title: "Early move into the Harper basin", body: "BluEnergies secures its position in the deepwater Harper basin, offshore Liberia." },
  { date: "Mar 28, 2025", title: "Independent resource report", body: "Prospective resource potential is independently certified in six deepwater fans in Blocks LB-30 and LB-31." },
  { date: "Apr 14, 2025", title: "TSX Venture listing", body: "Trading begins on the TSX Venture Exchange under the symbol BLU." },
  { date: "Nov 28, 2025", title: "Seismic reprocessing begins", body: "TGS begins reprocessing 6,167 km² of 3D seismic data." },
  { date: "Jan 15, 2026", title: "TotalEnergies partnership", body: "A joint study and application agreement is signed, and RL-003 is issued with BLU at 35% and TotalEnergies at 65%." },
  { date: "Mar 19, 2026", title: "Gulf of America top bid", body: "BluEnergies is the successful top bidder for lease block SS-59, offshore Louisiana, at the BOEM lease sale of March 11, 2026." },
  { date: "Mar 30, 2026", title: "OTCQX Best Market", body: "Trading begins in the United States under the symbol BLUGF." },
  { date: "Jun 19, 2026", title: "Sea-bottom survey under way", body: "MBES, geochemical and heat-flow acquisition begins aboard the R/V GYRE." },
  { date: "Jul 23, 2026", title: "C$20.7M placement closed", body: "Proceeds go to exploration and asset advancement, and to working capital." },
  { date: "4Q 2026", title: "Sea-bottom programme completion", body: "Expected completion, followed by integration into a refined 3D interpretation.", upcoming: true },
  { date: "Jun 30, 2027", title: "RL-003 term", body: "The reconnaissance licence term runs up to this date.", upcoming: true },
];

/* ----------------------------------------------------------------- News ---- */
// /news-and-media/news/
const n = (slug: string) => `/news-and-media/news/${slug}`;
export type NewsItem = {
  date: string;
  category: string;
  /** "exploration" items feed the Exploration Updates section; "corporate" items feed Latest Developments. */
  stream: "corporate" | "exploration";
  title: string;
  excerpt: string;
  href: string;
  asset?: string;
};

export const news: NewsItem[] = [
  {
    date: "2026-09-14",
    category: "Corporate",
    stream: "corporate",
    title: "BluEnergies Announces Advisory Agreements",
    excerpt: "The Financial Advisory Agreement with Canaccord Genuity Corp. is extended, and the agreement with Haywood Securities Inc. is amended.",
    href: n("bluenergies-announces-advisory-agreements"),
  },
  {
    date: "2026-07-23",
    category: "Financing",
    stream: "corporate",
    title: "BluEnergies Announces Closing of Non-Brokered Private Placement of Units for Gross Proceeds of C$20.7 Million",
    excerpt: "9,202,027 units were issued at C$2.25 per unit. Net proceeds go to exploration and the advancement of the Company's assets.",
    href: n("bluenergies-announces-closing-of-non-brokered-private-placement-of-units-for-gross-proceeds-of-c207-million"),
  },
  {
    date: "2026-07-06",
    category: "Operations",
    stream: "exploration",
    asset: "RL-003 · Harper basin, offshore Liberia",
    title: "BluEnergies and TotalEnergies Progress Operations, Harper Basin, Offshore Liberia",
    excerpt: "The work programme is on schedule. Seismic reprocessing is over 50% complete, and sea-bottom survey acquisition began June 19, 2026.",
    href: n("bluenergies-and-totalenergies-progress-operations-harper-basin-offshore-liberia"),
  },
  {
    date: "2026-04-27",
    category: "Markets",
    stream: "corporate",
    title: "BluEnergies Announces DTC Eligibility, Engagement of Market Maker and Initiation of Research Coverage",
    excerpt: "Shares are now DTC eligible in the U.S. Independent Trading Group (ITG) Inc. is engaged as market maker, and Granite Point Research Inc. for sponsored research, subject to TSXV approval.",
    href: n("bluenergies-announces-dtc-eligibility-engagement-of-market-maker-and-initiation-of-research-coverage"),
  },
  {
    date: "2026-03-30",
    category: "Markets",
    stream: "corporate",
    title: "BluEnergies Announces Trading on OTCQX Best Market Under the Trading Symbol “BLUGF”",
    excerpt: "BluEnergies shares are now available to U.S. investors on the OTCQX Best Market.",
    href: n("bluenergies-announces-trading-on-otcqx-best-market-under-the-trading-symbol--blugf"),
  },
  {
    date: "2026-03-19",
    category: "Assets",
    stream: "exploration",
    asset: "SS-59 · Gulf of America, offshore Louisiana",
    title: "BluEnergies Secures Top Bid in Gulf of America Lease Sale, Engages Independent Houston Firm for Reserve Evaluation",
    excerpt: "BluEnergies was the successful top bidder for lease block SS-59, a 5,000-acre block in the Crown Royal prospect, at the BOEM lease sale of March 11, 2026.",
    href: n("bluenergies-secures-top-bid-in-gulf-of-america-lease-sale--engages-independent-houston-firm-for-reserve-evaluation"),
  },
  {
    date: "2026-03-16",
    category: "Corporate",
    stream: "corporate",
    title: "BluEnergies Announces Engagement of Curzio Research, Inc. and Appointment of Doug Allen, Senior Manager of Investor Relations",
    excerpt: "Curzio Research, Inc. is engaged, and Doug Allen is appointed Senior Manager of Investor Relations.",
    href: n("bluenergies-announces-engagement-of-curzio-research-inc-and-appointment-of-doug-allen-senior-manager-of-investor-relations"),
  },
  {
    date: "2026-01-15",
    category: "Partnership",
    stream: "exploration",
    asset: "RL-003 · Harper basin, offshore Liberia",
    title: "TotalEnergies Partners With BluEnergies in Its Harper Basin Fan Play, Offshore Liberia",
    excerpt: "A joint study and application agreement is signed, and the new Reconnaissance Licence RL-003 covers Blocks LB-26, LB-30 and LB-31.",
    href: n("totalenergies-partners-with-bluenergies-in-its-harper-basin-fan-play-offshore-liberia"),
  },
];

/* ---------------------------------------------------- Gulf of America ---- */
// news release 2026-03-19. Not yet listed on the official Assets overview page,
// so status is stated exactly as of that release.
export const gulfAsset = {
  name: "Lease Block SS-59",
  region: "Gulf of America · offshore Louisiana",
  prospect: "Crown Royal prospect",
  area: "5,000 acres",
  term: "5-year term",
  interest: 100,
  waterDepth: "Less than 20 ft",
  status: "Top bid at the BOEM lease sale of March 11, 2026. Lease execution pending as of the March 19, 2026 release.",
  quote:
    "The new 5,000-acre lease (SS-59), encompassing approximately 50% of the Crown Royal prospect, represents untapped value in today's market.",
  href: n("bluenergies-secures-top-bid-in-gulf-of-america-lease-sale--engages-independent-houston-firm-for-reserve-evaluation"),
};

/* ----------------------------------------------------- Investor details ---- */
// news release 2026-03-16 and /investors/agm/
export const investorContact = {
  name: "Doug Allen",
  role: "Senior Manager, Investor Relations",
  email: "info@blu-energies.com",
};

export const agm = {
  title: "2026 Annual General Meeting",
  when: "June 23, 2026 · 11:00 am PST",
  docs: [
    { label: "Notice of Meeting & Information Circular", href: o("/_resources/agm/BLU-NOM-Information-Circular.pdf") },
    { label: "Form of Proxy", href: o("/_resources/agm/BLU-Proxy.pdf") },
    { label: "Financial Statement Return Card", href: o("/_resources/agm/BLU-Return-Card.pdf") },
  ],
  page: "/investors/agm",
};

/* ---------------------------------------------------------- In the Media ---- */
// /news-and-media/in-the-media/
export const media = [
  { date: "2026-05-14", outlet: "SmithWeekly Research", type: "Video", title: "SmithWeekly Research Discussion with Craig Steinke, CEO and Doug Allen, Senior Manager, Investor Relations", href: "https://youtu.be/XUNiuHwe3kc" },
  { date: "2026-05-06", outlet: "Wall Street Unplugged", type: "Podcast", title: "Wall Street Unplugged podcast with host, Frank Curzio, and BluEnergies CEO, Craig Steinke", href: "https://www.curzioresearch.com/this-tiny-offshore-driller-is-ahead-of-the-majors-in-the-global-energy-race/" },
  { date: "2026-04-15", outlet: "BNN Bloomberg", type: "Video", title: "The Race to Discover Offshore Oil & Gas Reserves", href: "https://www.bnnbloomberg.ca/video/shows/commodities/2026/04/15/the-race-to-discover-offshore-oil-gas-reserves/" },
  { date: "2026-02-04", outlet: "Reuters", type: "Article", title: "Oil majors snap up West African blocks in hunt for next Brazil", href: o("/news-and-media/in-the-media/oil-majors-snap-up-west-african-blocks-in-hunt-for-next-brazil") },
  { date: "2024-11-27", outlet: "The Vaultz News", type: "Article", title: "Liberia Emerges as Africa's Next Deep-Water Oil Hub", href: "https://thevaultznews.com/business/extractives-energy/liberia-emerges-as-africas-next-deep-water-oil-hub/" },
  { date: "2024-11-26", outlet: "African Energy Council", type: "Article", title: "Liberia: Africa's Top Deepwater Hydrocarbon Hotspot", href: "https://africanenergycouncil.org/liberia-africas-top-deepwater-hydrocarbon-hotspot/" },
  { date: "2024-11-25", outlet: "FrontPageAfrica", type: "Article", title: "Liberia Named Top Destination for Deepwater Hydrocarbon Exploration in Africa", href: "https://frontpageafricaonline.com/news/liberia-named-top-destination-for-deepwater-hydrocarbon-exploration-in-africa/" },
];

/* ----------------------------------------------------------- Leadership ---- */
// /corporate/board-management/
export const board = [
  {
    name: "Craig Steinke",
    role: "CEO & Director",
    photo: "/images/team/craig-steinke.jpg",
    bio: "Extensive experience identifying, developing and financing oil and gas exploration and production projects across North America, Africa, Latin America, Europe and Asia. He has guided BluEnergies since its inception in 2021.",
  },
  {
    name: "Carol Law",
    role: "Director",
    photo: "/images/team/carol-law.jpg",
    bio: "40 years in the petroleum industry with Amoco, BP, Kerr McGee and Anadarko, including work in 28 African countries. As Exploration Manager, she led the team behind the world-class gas discovery in Mozambique's Rovuma Basin.",
  },
  {
    name: "Cyrus Driver",
    role: "Director & Audit Committee Chair",
    photo: "/images/team/cyrus-driver.jpg",
    bio: "Chartered Accountant and retired partner of Davidson & Company. He has over 30 years of public-company accounting experience and has served as CFO or director of numerous junior resource companies.",
  },
  {
    name: "Don Crossley",
    role: "Director",
    photo: "/images/team/don-crossley.jpg",
    bio: "UBC Bachelor of Commerce and Canadian CPA, formerly with KPMG. Over 35 years as a director, CEO and CFO of public companies.",
  },
];

export const management = [
  {
    name: "Sergio Laura",
    role: "Vice President, Exploration",
    photo: "/images/team/sergio-laura.jpg",
    bio: "A 40-year international career with Eni, ending as Managing Director of Eni Côte d'Ivoire. He made a major contribution to the Baleine deepwater discovery and was decorated by the Ivorian Government in 2023.",
  },
  {
    name: "Vivien Chuang",
    role: "Chief Financial Officer",
    photo: null,
    bio: "Chartered Professional Accountant with more than fifteen years in the resource sector. She has served as CFO, director and audit committee chair of TSX-V and CSE companies.",
  },
  {
    name: "Michelle Borthwick",
    role: "Corporate Secretary",
    photo: null,
    bio: "Over 25 years in corporate finance and governance for TSX, TSXV, CSE and OTC issuers. Formerly VP Corporate Affairs and Corporate Secretary of Endeavour Mining.",
  },
];

/* ------------------------------------------------------------ Investors ---- */
export const investorResources = [
  { label: "Corporate Presentation", meta: "PDF", href: o("/_resources/presentations/corporate-presentation.pdf") },
  { label: "Fact Sheet", meta: "PDF", href: o("/_resources/factsheets/Blu-Energies-Fact-Sheet.pdf") },
  { label: "Research Report · June 1, 2026", meta: "PDF · Granite Point", href: o("/_resources/reports/Granite-Point-Tectonic-Shift-FOCUS-Report-20260601-C.pdf") },
  { label: "Research Report · March 30, 2026", meta: "PDF · Granite Point", href: o("/_resources/reports/Granite-Point-BluEnergies-In-Pursui-of-a-Giant-Resource-in-Offshore-Liberia.pdf") },
  { label: "Financial Statements & Filings", meta: "SEDAR+", href: "https://www.sedarplus.ca/" },
  { label: "Insider Filings", meta: "SEDI", href: "https://www.sedi.ca/sedi/" },
  { label: "Corporate Video", meta: "YouTube", href: "https://www.youtube.com/watch?v=-ZmxXdsUQsU" },
];

export const governanceDocs = [
  { label: "Code of Conduct & Ethics", href: o("/_resources/governance/Code_of_Conduct_and_Ethics_BluEnergies.pdf") },
  { label: "Anti-Bribery & Corruption Policy", href: o("/_resources/governance/Anti-Bribery_and_Corruption_Policy_Blu_Energies.pdf") },
  { label: "ESTMA Report 2025", href: o("/_resources/estma/BLU-ESTMA-Reporting-Jan-3-2026.pdf") },
];

export const legal = {
  privacy: "/legal#privacy-policy",
  terms: "/legal#terms-of-use",
};
