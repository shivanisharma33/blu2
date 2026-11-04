/**
 * Full biographies, verbatim from https://www.blu-energies.com/corporate/board-management/
 * (only whitespace and typographic quotes normalised).
 */
export type Bio = { name: string; role: string; photo: string | null; paragraphs: string[] };

export const boardBios: Bio[] = [
  {
    name: "Craig Steinke",
    role: "CEO and Director",
    photo: "/images/team/craig-steinke.jpg",
    paragraphs: [
      "Mr. Steinke has a wealth of experience in identifying, successfully developing and financing oil and natural gas exploration and production projects in North America, Africa, Latin America, Europe and Asia, and has successfully held numerous senior executive roles throughout his career.",
      "Since the inception of BluEnergies in 2021, Mr. Steinke, together with long-time partners, guided the Company through a thorough, proactive, and technology-driven selection process, privately funding its growth prior to the go-public transaction in April 2025.",
    ],
  },
  {
    name: "Carol Law",
    role: "Director",
    photo: "/images/team/carol-law.jpg",
    paragraphs: [
      "Carol Law brings 40 years of experience in the petroleum industry with roles in leadership, strategic decision making, exploration geology, research, and consulting. Carol spent the majority of her technical career developing and applying state of the art petroleum systems technology and leading teams in exploration efforts in over 50 countries around the world with major and independent oil companies including Amoco, BP, Kerr McGee and Anadarko. She has worked in 28 African countries, where she was involved in exploration drilling and international government relations.",
      "Carol retired in 2011 from her role as Exploration Manager for East Africa and Caribbean at Anadarko Petroleum, where she led the team which discovered the world class gas discovery in the offshore Mozambique Rovuma Basin. Over the last 14 years Carol has had roles as CEO/COO/Board Member, and advisor for a number of small cap oil and gas companies.",
      "Carol is passionate about being part of a successful world class organization, leading people and working with them to achieve their highest potential, creating effective but efficient business practices, and building business success.",
    ],
  },
  {
    name: "Cyrus Driver",
    role: "Director and Audit Committee Chair",
    photo: "/images/team/cyrus-driver.jpg",
    paragraphs: [
      "Cyrus is a Chartered Accountant and a retired partner from the firm of Davidson & Company of Vancouver, BC. Prior to March 2002 he was a partner with the accounting firm of Driver Anderson which he co-founded in 1982. Cyrus has over 30 years of accounting experience with public companies; and is and has been the Chief Financial Officer and/or director of a number of junior natural resource companies listed on the Exchange. While providing general accounting and tax services to a wide range of clients, he specializes in managing and servicing publicly traded companies and members of the brokerage community.",
    ],
  },
  {
    name: "Don Crossley",
    role: "Director",
    photo: "/images/team/don-crossley.jpg",
    paragraphs: [
      "After graduating with a Bachelor of Commerce degree from UBC, Don obtained his Canadian CPA designation and worked for several years with KPMG. He has been involved with a variety of public companies over the past 35 years holding positions as a Director, CEO, and CFO, while also providing management services. Most recently Don has been semi-retired while still providing some services to resource companies.",
    ],
  },
];

export const managementBios: Bio[] = [
  {
    name: "Sergio Laura",
    role: "Vice President, Exploration",
    photo: "/images/team/sergio-laura.jpg",
    paragraphs: [
      "Sergio is a senior oil & gas exploration executive advisor; he holds a degree in Geological Sciences (Hons.) from the University of Genoa, Italy.",
      "He spent his entire 40 year international career with the Italian major energy company Eni (formerly AGIP), working and living in: Italy, UK, China, Egypt, Indonesia, India, Poland, Ghana, and Cote d'Ivoire, gradually taking increasing responsibilities as Chief Geologist, Exploration Manager, Sr. Business Advisor, Vice President, Director and since 2006 as Managing Director of several foreign Eni' subsidiaries in Africa, South Asia, Middle & Far East and Europe. In 2004, he was the Project Manager of the Eni' Exploration Management System.",
      "Sergio has gained experience in most oil & gas basins worldwide as a leading member of several exploration new venture and successful project teams: he took part in several major oil & gas discoveries, in Egypt, Indonesia, Mozambique, Ghana, Cote d'Ivoire and in successful E&P business projects as VP Exploration and Business Advisor for the Sub Sahara Africa region.",
      "He concluded his international career as Managing Director of Eni Cote d'Ivoire and retired, after providing a major contribution to the historical discovery of the Baleine oil & gas deep-water giant field, for which he was also decorated to the merit by the Ivorian Government, in November 2023.",
    ],
  },
  {
    name: "Vivien Chuang",
    role: "CFO",
    photo: null,
    paragraphs: [
      "Ms. Chuang is a Chartered Professional Accountant with more than fifteen years of experience in the resource and mining sector. She has served as Chief Financial Officer, director and audit committee chair of various public companies listed on the TSX-V and CSE. Her professional experience includes financial reporting, budgeting, equity financing, internal controls and risk management. Ms. Chuang articled with PricewaterhouseCoopers LLP and was a senior manager at a medium sized audit firm.",
    ],
  },
  {
    name: "Michelle Borthwick",
    role: "Corporate Secretary",
    photo: null,
    paragraphs: [
      "Ms. Borthwick is a corporate finance and governance professional with over 25 years of experience in senior corporate finance and governance roles providing advice and support to various Canadian publicly listed issuers on the Toronto Stock Exchange, TSXV, CSE and OTC markets. She has extensive experience in the areas of equity and debt financings, domestic and cross-border M&A and general corporate and commercial transactions and has provided executive leadership teams with strategic advice and hands-on support in all phases of corporate growth. Additionally, Michelle is well versed in all areas of public company governance, administration and reporting requirements and advises boards and management on best practices. She is the founder and principal of Peakshore Consulting Inc. since January 2013 and Senior Vice President, Corporate Finance of Fiore Management & Advisory Corp. since July 2020. Prior to this time, she was Vice President, Corporate Affairs and Corporate Secretary of Endeavour Mining Corporation (TSX: EDV), one of the world's leading gold producers and the largest in West Africa.",
    ],
  },
];

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
