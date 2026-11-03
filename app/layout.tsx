import type { Metadata, Viewport } from "next";
import { Manrope, Inter, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const display = Manrope({ subsets: ["latin"], variable: "--font-display", weight: ["300", "400", "500", "600"], display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"], display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], variable: "--font-serif", weight: "400", style: ["normal", "italic"], display: "swap" });

const title = "BluEnergies Ltd. | West Africa Deepwater Oil & Gas Exploration";
const description =
  "BluEnergies Ltd. (TSXV: BLU | OTCQX: BLUGF) is a West Africa deepwater oil and gas explorer. In partnership with TotalEnergies, it is advancing Reconnaissance Licence RL-003, covering Blocks LB-26, LB-30 and LB-31 in the Harper basin, offshore Liberia.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.blu-energies.com"),
  title,
  description,
  keywords: ["BluEnergies", "TSXV BLU", "BLUGF", "Harper basin", "offshore Liberia", "deepwater exploration", "basin floor fan", "West Africa oil and gas", "RL-003"],
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "BluEnergies Ltd.",
    images: [{ url: "/video/survey-vessel-poster.jpg", width: 1920, height: 1080, alt: "Survey vessel at sea" }],
  },
  twitter: { card: "summary_large_image", title, description, site: "@bluenergiesltd" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#071522",
  width: "device-width",
  initialScale: 1,
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Corporation",
  name: "BluEnergies Ltd.",
  url: "https://www.blu-energies.com",
  logo: "https://www.blu-energies.com/_templates/1/source/img/logo.svg",
  tickerSymbol: "TSXV:BLU",
  email: "info@blu-energies.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Suite 2200 - 885 West Georgia Street",
    addressLocality: "Vancouver",
    addressRegion: "BC",
    postalCode: "V6C 3E8",
    addressCountry: "CA",
  },
  sameAs: ["https://www.linkedin.com/company/bluenergies-ltd", "https://www.youtube.com/@BluEnergies", "https://x.com/bluenergiesltd"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      </body>
    </html>
  );
}
