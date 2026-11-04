# BluEnergies — corporate website (v2)

Next.js 15 (App Router) · React 19 · TypeScript · GSAP ScrollTrigger (restrained reveals only) · Lenis

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure
```
app/            layout (Manrope + Inter, metadata, JSON-LD), page, globals.css (design system + all section styles)
components/
  Header.tsx, SearchDialog.tsx, Footer.tsx
  motion/MotionProvider.tsx   fade-up / image reveal / stagger / timeline rule, via data-attributes
  sections/                   Hero, Intro, Opportunity (+HarperMap), Assets, Strategy, Partnership,
                              Milestones, Leadership, News, Investors (+MarketWidget), ExplorationUpdates, FinalCta
  ui/primitives.tsx           Eyebrow, SectionHead, Button, Logo, arrows, date formatting
lib/content.ts                ALL copy, figures, people, news, documents and the search index (single source of truth)
public/                       brand, images, video
```

## Pages
Routes mirror the official site paths, so existing links and bookmarks keep working.

| Section | Routes |
|---|---|
| Home | `/` |
| Corporate | `/corporate/about-us`, `/corporate/board-management`, `/corporate/corporate-governance` |
| Assets & Operations | `/assets-and-operations/overview` (anchors: `#map`, `#programme`, `#ss-59`) |
| Investors | `/investors/outlook`, `/investors/stock-information`, `/investors/financials`, `/investors/presentations`, `/investors/agm` |
| News & Media | `/news-and-media/news`, `/news-and-media/news/[slug]` (18 releases), `/news-and-media/in-the-media` |
| Contact | `/contact/contact-details`, `/contact/request-for-information` |
| Legal | `/legal` (privacy policy and terms of use) |

Shared page parts live in `components/page/` (PageHero, SubNav, LatestNews, DocCard, IrContact, VideoFeature, NewsIndex, RfiForm).
Inner-page styles are in `app/pages.css`.

## Updating news releases
Release text and the legal page are imported from the official site into `lib/data/*.json`:

```bash
node scripts/import-site.mjs
```

The importer keeps only safe tags (paragraphs, bold, italics, links, lists), so release pages render as clean article text.
Re-run it whenever a new release is published, then rebuild.

## Request-for-information form
There is no mail backend in this app yet. Submitting validates the form and opens the visitor's email app with the request
addressed to info@blu-energies.com. Replace `submit` in `components/page/RfiForm.tsx` with an API call when one exists.

## Production build next to the dev server
`next build` rewrites `.next`, which breaks a running `next dev`. To build without stopping the dev server:

```bash
NEXT_DIST_DIR=.next-build npx next build
```

## Design system
- Palette: background #F7F8F6 / #FFFFFF, text #101D27 / #697681, navy #102A3A, ocean #164E68, accent #3989A8, border #E4E9EA.
- Navy is used only for the hero, the exploration-strategy chapter, the closing CTA and the footer.
- 1320px container, 12-column grid, one section rhythm (`--section`). Tokens live at the top of `globals.css`.

## Content & accuracy rules
- Every fact in `lib/content.ts` comes from blu-energies.com or the company's own news releases.
- **No stock prices are hard-coded.** Quotes come from the official TradingView embed (TSXV:BLU, OTC:BLUGF),
  lazy-loaded, with a fallback link to the official stock page.
- Prospective-resource language follows the standard cautionary definition. Analogues are labelled as context only.
- The Harper basin map is a stylised redraw of the company's official RL-003 licence map. The original is
  available in a lightbox from the map panel.
- All pages are built in this app. Only PDFs (presentations, reports, policies, AGM materials) are still served from the
  official site via `ORIGIN` in `lib/content.ts`. Copy them into `public/` and change `ORIGIN` if that site is retired.

## Assets: need client confirmation
- Hero video `public/video/survey-vessel-*` and poster: carried over from the previous redesign. Confirm the licence.
- Ocean photography (`ocean-*.jpg`, `coastline-aerial.jpg`): Unsplash licence.
- Seismic images: company assets, "Data property of TGS". Confirm web-use permission with TGS.
- SS-59 (Gulf of America) comes from the March 19, 2026 release and is not yet on the official Assets page. Its status is shown "as of" that release. Update it once the lease is executed.
- TotalEnergies is referenced in text only. No partner logo is used without an approved file.

## Accessibility & performance
- Semantic landmarks, one h1, skip link, keyboard-operable map hotspots, accordions and menus.
- `prefers-reduced-motion`: animations, smooth scroll and pinning are disabled, and content shows statically.
- The video pauses off-screen, the canvas only animates while visible, and the TradingView script loads on approach.
