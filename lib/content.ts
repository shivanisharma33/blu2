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

export const nav = [
  {
    label: "Corporate",
    href: "#about",
    children: [
      { label: "About Us", href: o("/corporate/about-us/") },
      { label: "Board & Management", href: "#leadership" },
      { label: "Corporate Governance", href: o("/corporate/corporate-governance/") },
    ],
  },
  {
    label: "Assets & Operations",
    href: "#assets",
    children: [
      { label: "Harper Basin Overview", href: o("/assets-and-operations/overview/") },
      { label: "Exploration Programme", href: "#technology" },
      { label: "Partnership", href: "#partnership" },
    ],
  },
  {
    label: "Investors",
    href: "#investors",
    children: [
      { label: "Outlook", href: o("/investors/outlook/") },
      { label: "Stock Information", href: o("/investors/stock-information/") },
      { label: "Financials", href: o("/investors/financials/") },
      { label: "Presentations", href: o("/investors/presentations/") },
      { label: "AGM", href: o("/investors/agm/") },
    ],
  },
  {
    label: "News & Media",
    href: "#news",
    children: [
      { label: "News Releases", href: o("/news-and-media/news/") },
      { label: "In the Media", href: o("/news-and-media/in-the-media/") },
    ],
  },
  {
    label: "Contact",
    href: "#contact",
    children: [
      { label: "Contact Details", href: o("/contact/contact-details/") },
      { label: "Request for Information", href: o("/contact/request-for-information/") },
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
  { date: "Mar 30, 2026", title: "OTCQX Best Market", body: "Trading begins in the United States under the symbol BLUGF." },
  { date: "Jun 19, 2026", title: "Sea-bottom survey under way", body: "MBES, geochemical and heat-flow acquisition begins aboard the R/V GYRE." },
  { date: "Jul 23, 2026", title: "C$20.7M placement closed", body: "Proceeds go to exploration and asset advancement, and to working capital." },
  { date: "4Q 2026", title: "Sea-bottom programme completion", body: "Expected completion, followed by integration into a refined 3D interpretation.", upcoming: true },
  { date: "Jun 30, 2027", title: "RL-003 term", body: "The reconnaissance licence term runs up to this date.", upcoming: true },
];

/* ----------------------------------------------------------------- News ---- */
// /news-and-media/news/
const n = (slug: string) => o(`/news-and-media/news/${slug}`);
export const news = [
  {
    date: "2026-09-14",
    category: "Corporate",
    title: "BluEnergies Announces Advisory Agreements",
    excerpt: "The Financial Advisory Agreement with Canaccord Genuity Corp. is extended, and the agreement with Haywood Securities Inc. is amended.",
    href: n("bluenergies-announces-advisory-agreements"),
  },
  {
    date: "2026-07-23",
    category: "Financing",
    title: "BluEnergies Announces Closing of Non-Brokered Private Placement of Units for Gross Proceeds of C$20.7 Million",
    excerpt: "9,202,027 units were issued at C$2.25 per unit. Net proceeds go to exploration and the advancement of the Company's assets.",
    href: n("bluenergies-announces-closing-of-non-brokered-private-placement-of-units-for-gross-proceeds-of-c207-million"),
  },
  {
    date: "2026-07-06",
    category: "Operations",
    title: "BluEnergies and TotalEnergies Progress Operations, Harper Basin, Offshore Liberia",
    excerpt: "The work programme is on schedule. Seismic reprocessing is over 50% complete, and sea-bottom survey acquisition began June 19, 2026.",
    href: n("bluenergies-and-totalenergies-progress-operations-harper-basin-offshore-liberia"),
  },
  {
    date: "2026-03-30",
    category: "Markets",
    title: "BluEnergies Announces Trading on OTCQX Best Market Under the Trading Symbol “BLUGF”",
    excerpt: "BluEnergies shares are now available to U.S. investors on the OTCQX Best Market.",
    href: n("bluenergies-announces-trading-on-otcqx-best-market-under-the-trading-symbol--blugf"),
  },
  {
    date: "2026-01-15",
    category: "Partnership",
    title: "TotalEnergies Partners With BluEnergies in Its Harper Basin Fan Play, Offshore Liberia",
    excerpt: "A joint study and application agreement is signed, and the new Reconnaissance Licence RL-003 covers Blocks LB-26, LB-30 and LB-31.",
    href: n("totalenergies-partners-with-bluenergies-in-its-harper-basin-fan-play-offshore-liberia"),
  },
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
  privacy: o("/legal/"),
  terms: o("/legal/"),
};
