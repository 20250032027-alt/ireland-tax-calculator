import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SalaryCalculator from "@/components/SalaryCalculator";

export const metadata: Metadata = {
  title: "Irish Salary Calculator 2026 | Take-Home Pay After PAYE, USC & PRSI",
  description: "Calculate your Irish take-home pay for 2026. Accurate PAYE income tax, USC, and PRSI deductions. Free, no registration.",
};

export default function SalaryCalculatorPage() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", fontSize: 12, padding: "4px 12px", borderRadius: 99, background: "rgba(0,168,107,0.12)", border: "1px solid rgba(0,168,107,0.25)", color: "#00d084", marginBottom: 16 }}>
            Income Tax
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: "#f0f4ff", marginBottom: 10 }}>Irish Salary Calculator 2026</h1>
          <p style={{ fontSize: 15, color: "#8899bb", maxWidth: 580 }}>
            Calculate your take-home pay after PAYE income tax, Universal Social Charge (USC), and PRSI. Updated for the 2026 tax year based on Revenue.ie rates.
          </p>
        </div>

        <SalaryCalculator />

        <div style={{ marginTop: 64, maxWidth: 720 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#f0f4ff", marginBottom: 20 }}>How to use this calculator</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 14, color: "#8899bb", lineHeight: 1.8, marginBottom: 48 }}>
            <p>Enter your gross salary and select how frequently you are paid. If you are paid monthly, select &ldquo;Per month&rdquo; and enter your monthly gross — the calculator will annualise it and show both annual and monthly take-home.</p>
            <p>Select your personal status. Married couples assessed jointly on one income benefit from a higher standard rate band of €53,000. Two-income married couples get up to €88,000.</p>
            <p>Pension contributions are deducted from gross income before tax, USC, and PRSI are calculated, giving you full tax relief at your marginal rate.</p>
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#f0f4ff", marginBottom: 16 }}>2026 Irish tax rates at a glance</h2>
          <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#111d35" }}>
                  {["Tax", "Rate", "Threshold 2026"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "#f0f4ff", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Income tax", "20%", "Up to €44,000 (single)"],
                  ["Income tax", "40%", "Above €44,000 (single)"],
                  ["USC", "0.5%", "First €12,012"],
                  ["USC", "2%", "€12,013 – €28,700"],
                  ["USC", "3%", "€28,701 – €70,044"],
                  ["USC", "8%", "Above €70,044"],
                  ["PRSI", "4.2%", "Class A employees"],
                ].map(([tax, rate, threshold], i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#111d35" : "#0f1a2e", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td style={{ padding: "11px 16px", color: "#8899bb" }}>{tax}</td>
                    <td style={{ padding: "11px 16px", color: "#00d084", fontFamily: "DM Mono, monospace", fontWeight: 600 }}>{rate}</td>
                    <td style={{ padding: "11px 16px", color: "#8899bb" }}>{threshold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
