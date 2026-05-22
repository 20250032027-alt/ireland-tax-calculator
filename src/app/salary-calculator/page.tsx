import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SalaryCalculator from "@/components/SalaryCalculator";

export const metadata: Metadata = {
  title: "Irish Salary Calculator 2026 | Take-Home Pay After PAYE, USC & PRSI",
  description:
    "Calculate your Irish take-home pay for 2026. Accurate PAYE income tax, USC, and PRSI deductions. Supports single, married, and single parent statuses. Free, no registration.",
};

export default function SalaryCalculatorPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <div
            className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full mb-4"
            style={{
              background: "rgba(0,168,107,0.12)",
              border: "1px solid rgba(0,168,107,0.25)",
              color: "var(--accent-green-light)",
            }}
          >
            Income Tax
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
            Irish Salary Calculator 2026
          </h1>
          <p className="text-base max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            Calculate your take-home pay after PAYE income tax, Universal Social Charge (USC), and
            PRSI. Updated for the 2026 tax year based on Revenue.ie rates.
          </p>
        </div>

        <SalaryCalculator />

        {/* Informational content for SEO */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            How to use this calculator
          </h2>
          <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            <p>
              Enter your gross salary and select how frequently you are paid. If you are paid monthly,
              select &ldquo;Per month&rdquo; and enter your monthly gross — the calculator will
              annualise your income and show both annual and monthly take-home figures.
            </p>
            <p>
              Select your personal status. Married couples assessed jointly on one income benefit from
              a higher standard rate band of €53,000. If both spouses work, select &ldquo;Married —
              two incomes&rdquo; which applies the maximum combined band of €88,000.
            </p>
            <p>
              Pension contributions are deducted from gross income before tax, USC, and PRSI are
              calculated, giving you full tax relief at your marginal rate. Use the slider to enter
              your contribution percentage.
            </p>
          </div>

          <h2 className="text-xl font-bold mt-10 mb-4" style={{ color: "var(--text-primary)" }}>
            2026 Irish tax rates at a glance
          </h2>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid var(--border)" }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "var(--bg-card)" }}>
                  {["Tax", "Rate", "Threshold 2026"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 font-semibold"
                      style={{ color: "var(--text-primary)", borderBottom: "1px solid var(--border)" }}
                    >
                      {h}
                    </th>
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
                  <tr
                    key={i}
                    style={{
                      background: i % 2 === 0 ? "var(--bg-card)" : "var(--bg-secondary)",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>{tax}</td>
                    <td className="px-4 py-3 font-mono font-medium" style={{ color: "var(--accent-green-light)" }}>{rate}</td>
                    <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>{threshold}</td>
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
