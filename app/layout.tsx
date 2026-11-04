import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import "./pages.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/motion/MotionProvider";

const display = Manrope({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "600", "700"], display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

const title = "BluEnergies Ltd. | West Africa Deepwater Oil & Gas Exploration";
const description =
  "BluEnergies Ltd. (TSXV: BLU | OTCQX: BLUGF) is a West Africa deepwater oil and gas explorer. In partnership with TotalEnergies, it is advancing Reconnaissance Licence RL-003, covering Blocks LB-26, LB-30 and LB-31 in the Harper basin, offshore Liberia.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.blu-energies.com"),
  title: { default: title, template: "%s | BluEnergies Ltd." },
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
  themeColor: "#102A3A",
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
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body id="top">
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MotionProvider />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      </body>
    </html>
  );
}
