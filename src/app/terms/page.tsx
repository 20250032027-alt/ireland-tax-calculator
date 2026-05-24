import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for Ireland Tax Calculator.",
};

export default function TermsPage() {
  const wrap = { maxWidth: 720, margin: "0 auto", padding: "48px 24px" };
  const section = { paddingTop: 24, borderTop: "1px solid var(--border-0)" };
  return (
    <>
      <Navbar />
      <main style={wrap}>
        <h1 style={{ marginBottom: 8 }}>Terms of use</h1>
        <p style={{ fontSize: 13, color: "var(--text-2)", marginBottom: 36 }}>Last updated: May 2026</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, fontSize: 14, color: "var(--text-1)", lineHeight: 1.85 }}>
          <div>
            <h2 style={{ fontSize: 16, color: "var(--text-0)", marginBottom: 10 }}>Not tax advice</h2>
            <p>The calculators and content on this site are provided for general informational purposes only. Nothing on this site constitutes tax advice, legal advice, or financial advice. Results are estimates based on standard rates and assumptions. They may not reflect your actual tax liability.</p>
            <p style={{ marginTop: 10 }}>Always verify your tax position with Revenue.ie or a qualified Irish tax adviser before making financial decisions.</p>
          </div>
          <div style={section}>
            <h2 style={{ fontSize: 16, color: "var(--text-0)", marginBottom: 10 }}>Accuracy</h2>
            <p>We make reasonable efforts to keep tax rates, bands, and credits accurate and up to date following each Budget. However, we cannot guarantee the information is complete, current, or error-free. Tax legislation can change. Use these tools as a guide, not as definitive figures.</p>
          </div>
          <div style={section}>
            <h2 style={{ fontSize: 16, color: "var(--text-0)", marginBottom: 10 }}>No liability</h2>
            <p>Ireland Tax Calculator and its operators accept no liability for any financial decisions made based on information from this site. Use of the calculators is entirely at your own risk.</p>
          </div>
          <div style={section}>
            <h2 style={{ fontSize: 16, color: "var(--text-0)", marginBottom: 10 }}>Advertising</h2>
            <p>This site displays advertisements via Google AdSense. Advertisers do not influence the tax rates or calculation results. Ad content is controlled by Google's advertising platform.</p>
          </div>
          <div style={section}>
            <h2 style={{ fontSize: 16, color: "var(--text-0)", marginBottom: 10 }}>External links</h2>
            <p>This site links to Revenue.ie and other external sources. We are not responsible for the content or accuracy of external sites.</p>
          </div>
          <div style={section}>
            <h2 style={{ fontSize: 16, color: "var(--text-0)", marginBottom: 10 }}>Changes to these terms</h2>
            <p>We may update these terms at any time. Continued use of the site after changes constitutes acceptance of the updated terms.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
