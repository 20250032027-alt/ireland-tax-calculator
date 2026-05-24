import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About",
  description: "About Ireland Tax Calculator — free, accurate Irish tax tools based on Revenue.ie rates.",
};

export default function AboutPage() {
  const wrap = { maxWidth: 720, margin: "0 auto", padding: "48px 24px" };
  return (
    <>
      <Navbar />
      <main style={wrap}>
        <h1 style={{ marginBottom: 32 }}>About this site</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, fontSize: 14, color: "var(--text-1)", lineHeight: 1.85 }}>
          <p>Ireland Tax Calculator is a free tool that helps Irish workers, contractors, and investors understand their tax position. Every calculator on the site runs in your browser using tax rates published by the Irish Revenue Commissioners.</p>

          <div style={{ paddingTop: 24, borderTop: "1px solid var(--border-0)" }}>
            <h2 style={{ fontSize: 18, color: "var(--text-0)", marginBottom: 12 }}>What we built and why</h2>
            <p>The Irish tax system — with its combination of PAYE, USC, and PRSI — is genuinely confusing, particularly for people arriving from the UK or US where the mechanics are different. Most official resources tell you the rates but not what they actually mean for your payslip.</p>
            <p style={{ marginTop: 12 }}>We built simple, specific calculators that answer the questions people actually have: what will I take home from this salary, what day rate do I need as a contractor, is my payslip deducting the right amount.</p>
          </div>

          <div style={{ paddingTop: 24, borderTop: "1px solid var(--border-0)" }}>
            <h2 style={{ fontSize: 18, color: "var(--text-0)", marginBottom: 12 }}>Accuracy and limitations</h2>
            <p>All rates, bands, and credits are sourced from Revenue.ie and updated after each Budget. The calculators apply standard credits and assume Class A PRSI. They do not account for non-standard tax codes, benefit-in-kind, share options, foreign income, or complex pension arrangements.</p>
            <p style={{ marginTop: 12 }}>For anything beyond a standard PAYE situation, speak to a qualified Irish tax adviser or use Revenue's myAccount service directly.</p>
          </div>

          <div style={{ paddingTop: 24, borderTop: "1px solid var(--border-0)" }}>
            <h2 style={{ fontSize: 18, color: "var(--text-0)", marginBottom: 12 }}>Privacy</h2>
            <p>No salary figures or personal details are stored, logged, or transmitted. All calculations happen locally in your browser. There are no accounts and no registration.</p>
          </div>

          <div style={{ paddingTop: 24, borderTop: "1px solid var(--border-0)" }}>
            <h2 style={{ fontSize: 18, color: "var(--text-0)", marginBottom: 12 }}>Advertising</h2>
            <p>This site is supported by Google AdSense advertising. Ads are clearly separated from calculator content and do not influence the results or rates used.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
