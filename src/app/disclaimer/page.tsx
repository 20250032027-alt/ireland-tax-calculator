import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DisclaimerPage() {
  const wrap = { maxWidth: 720, margin: "0 auto", padding: "48px 24px" };
  return (
    <>
      <Navbar />
      <main style={wrap}>
        <h1 style={{ marginBottom: 32 }}>Disclaimer</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 14, color: "var(--text-1)", lineHeight: 1.8 }}>
          <p>Ireland Tax Calculator provides tax estimates for general informational purposes only. Figures are based on standard rates, bands, and credits published by the Irish Revenue Commissioners for the 2026 tax year.</p>
          <p>These calculations do <strong style={{ color: "var(--text-0)" }}>not</strong> constitute tax advice. They do not account for non-standard tax codes, multiple income sources, foreign income, back pay, share options, benefit-in-kind, complex pension arrangements, or Revenue interventions.</p>
          <p>We make every effort to keep rates accurate and up to date, but cannot guarantee the information is complete, current, or error-free. Tax legislation can change mid-year.</p>
          <p>For advice specific to your situation, consult a qualified Irish tax adviser or contact <a href="https://www.revenue.ie" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-hi)", textDecoration: "underline" }}>Revenue.ie</a> directly.</p>
          <div style={{ marginTop: 8, padding: 16, borderRadius: "var(--radius-md)", background: "var(--bg-2)", border: "1px solid var(--border-0)" }}>
            <p style={{ fontSize: 12, color: "var(--text-2)" }}>PRSI note: The Class A rate is 4.2% from 1 January 2026, rising to 4.35% from 1 October 2026. Our calculator uses 4.2% throughout. The blended annual figure will differ slightly for income earned across the full year.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
