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

export const metadata: Metadata = {
  title: "Ireland Tax Calculator 2026 | Free PAYE, USC & PRSI Calculator",
  description: "Calculate your Irish take-home pay instantly. Accurate 2026 PAYE income tax, Universal Social Charge (USC), and PRSI calculations based on Revenue.ie rates. Free, no registration.",
  keywords: "ireland tax calculator, irish salary calculator, paye calculator, usc calculator, prsi calculator, take home pay ireland, net salary ireland 2026",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IE" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7492388540350253" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
