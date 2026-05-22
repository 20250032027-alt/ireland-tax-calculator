import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ireland Tax Calculator 2026 | Free PAYE, USC & PRSI Calculator",
  description:
    "Calculate your Irish take-home pay instantly. Accurate 2026 PAYE income tax, Universal Social Charge (USC), and PRSI calculations based on Revenue.ie rates. Free, no registration.",
  keywords: "ireland tax calculator, irish salary calculator, paye calculator, usc calculator, prsi calculator, take home pay ireland, net salary ireland 2026",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IE">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7492388540350253"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
