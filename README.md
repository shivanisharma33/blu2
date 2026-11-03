# BluEnergies — corporate website (v2)

Next.js 15 (App Router) · React 19 · TypeScript · GSAP + ScrollTrigger + SplitText · Lenis

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure
```
app/            layout (fonts, metadata, JSON-LD), page, globals.css (design system + all section styles)
components/
  Header.tsx, Footer.tsx
  motion/MotionProvider.tsx   one scroll/reveal controller driven by data-attributes
  sections/                   Hero, Intro, Assets (+HarperMap), Technology (+SubsurfaceCanvas),
                              Partnership, Responsible, Investors (+MarketWidget), News, Leadership, FinalCta
  ui/primitives.tsx           SectionLabel, Button, Logo, arrows, date formatting
lib/content.ts                ALL copy, figures, people, news and links (single source of truth)
public/                       brand, images, video
```

## Content & accuracy rules
- Every fact in `lib/content.ts` comes from blu-energies.com or the company's own news releases.
- **No stock prices are hard-coded.** Quotes come from the official TradingView embed (TSXV:BLU, OTC:BLUGF),
  lazy-loaded, with a fallback link to the official stock page.
- Prospective-resource language follows the standard cautionary definition. Analogues are labelled as context only.
- The Harper basin map is a stylised redraw of the company's official RL-003 licence map. The original is
  available in a lightbox from the map panel.
- Sub-pages (governance, financials, AGM and so on) link to the existing official site via `ORIGIN` in
  `lib/content.ts`. Change it when those pages move into this app.

## Assets: need client confirmation
- Hero video `public/video/survey-vessel-*` and poster: carried over from the previous redesign. Confirm the licence.
- Ocean photography (`ocean-*.jpg`, `coastline-aerial.jpg`): Unsplash licence.
- Seismic images: company assets, "Data property of TGS". Confirm web-use permission with TGS.
- TotalEnergies is referenced in text only. No partner logo is used without an approved file.

## Accessibility & performance
- Semantic landmarks, one h1, skip link, keyboard-operable map hotspots, accordions and menus.
- `prefers-reduced-motion`: animations, smooth scroll and pinning are disabled, and content shows statically.
- The video pauses off-screen, the canvas only animates while visible, and the TradingView script loads on approach.
