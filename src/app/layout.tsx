import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geist = localFont({
  src: [
    { path: "../../node_modules/geist/dist/fonts/geist-sans/Geist-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../node_modules/geist/dist/fonts/geist-sans/Geist-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../../node_modules/geist/dist/fonts/geist-sans/Geist-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = localFont({
  src: [
    { path: "../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-geist-mono",
  display: "swap",
});

const BASE_URL = "https://ireland-tax-calculator-g5uifnze4.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Ireland Tax Calculator 2026 | Free PAYE, USC & PRSI Calculator",
    template: "%s | Ireland Tax Calculator",
  },
  description: "Calculate your Irish take-home pay instantly. Accurate 2026 PAYE income tax, Universal Social Charge (USC), and PRSI calculations based on Revenue.ie rates. Free, no registration.",
  keywords: "ireland tax calculator, irish salary calculator, paye calculator, usc calculator, prsi calculator, take home pay ireland, net salary ireland 2026",
  openGraph: {
    type: "website",
    siteName: "Ireland Tax Calculator",
    title: "Ireland Tax Calculator 2026 | Free PAYE, USC & PRSI",
    description: "Free Irish tax calculators updated for Budget 2026. Calculate PAYE, USC, and PRSI instantly based on Revenue.ie rates.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ireland Tax Calculator 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ireland Tax Calculator 2026",
    description: "Free Irish tax calculators. PAYE, USC, PRSI. Updated for Budget 2026.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IE" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        {/* AdSense publisher verification */}
        <meta name="google-adsense-account" content="ca-pub-7492388540350253" />
        {/* AdSense script */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7492388540350253" crossOrigin="anonymous" />
        {/* Google Analytics — replace G-XXXXXXXXXX with real ID after setup */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" /> */}

        {/* WebSite + Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${BASE_URL}/#website`,
                  "url": BASE_URL,
                  "name": "Ireland Tax Calculator",
                  "description": "Free Irish tax calculators for PAYE, USC, PRSI, and capital gains. Updated for Budget 2026.",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": { "@type": "EntryPoint", "urlTemplate": `${BASE_URL}/tools?q={search_term_string}` },
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "Organization",
                  "@id": `${BASE_URL}/#organization`,
                  "name": "Ireland Tax Calculator",
                  "url": BASE_URL,
                  "description": "Free, accurate Irish tax calculators based on Revenue.ie rates.",
                },
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
