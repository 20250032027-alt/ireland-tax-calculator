import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SalaryCalculator from "@/components/SalaryCalculator";

export const metadata: Metadata = {
  title: "Irish Salary Calculator 2026 — Take-Home Pay After PAYE, USC & PRSI",
  description: "Calculate your Irish take-home pay for 2026. Accurate PAYE income tax, USC, and PRSI deductions. Supports single, married, contractor, and pension. Free, no registration.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How is Irish income tax calculated?", "acceptedAnswer": { "@type": "Answer", "text": "Ireland uses two rates. Income up to €44,000 (single person, 2026) is taxed at 20%. Everything above is taxed at 40%. Tax credits are then subtracted from the gross tax figure." } },
    { "@type": "Question", "name": "What is USC in Ireland?", "acceptedAnswer": { "@type": "Answer", "text": "USC (Universal Social Charge) is a separate charge on gross income. Exempt if income is €13,000 or less. Rates are 0.5%, 2%, 3%, and 8% across four bands in 2026." } },
    { "@type": "Question", "name": "What PRSI rate do employees pay in 2026?", "acceptedAnswer": { "@type": "Answer", "text": "Most employees pay Class A PRSI at 4.2% of gross earnings in 2026. This rises to 4.35% from 1 October 2026." } },
    { "@type": "Question", "name": "What is the take-home pay on a €45,000 salary in Ireland?", "acceptedAnswer": { "@type": "Answer", "text": "A single person earning €45,000 in 2026 takes home approximately €37,000 after PAYE, USC, and PRSI. The exact figure depends on tax credits and pension contributions." } },
    { "@type": "Question", "name": "Do pension contributions reduce tax in Ireland?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Pension contributions are deducted from gross income before tax, USC, and PRSI are calculated, giving full relief at your marginal rate." } },
  ],
};

export default function SalaryCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main style={{ maxWidth: 1240, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ marginBottom: 40 }}>
          <span className="badge badge-green" style={{ marginBottom: 16 }}>Most popular</span>
          <h1 style={{ marginBottom: 10 }}>How much of my Irish salary will I take home in 2026?</h1>
          <p style={{ fontSize: 15, color: "var(--text-1)", maxWidth: 580, lineHeight: 1.7 }}>
            Enter your gross salary and see exactly what you take home after PAYE income tax, Universal Social Charge (USC), and PRSI. Updated for Budget 2026 using Revenue.ie rates.
          </p>
        </div>

        <SalaryCalculator />

        <div style={{ marginTop: 64, maxWidth: 720 }}>
          <h2 style={{ fontSize: 22, marginBottom: 20 }}>How to use this calculator</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 14, color: "var(--text-1)", lineHeight: 1.8, marginBottom: 56 }}>
            <p>Enter your gross salary and select how often you are paid. If you are paid monthly, choose "Per month" and enter your monthly figure. The calculator annualises it automatically and shows both annual and monthly take-home.</p>
            <p>Select your status. Married couples assessed jointly on one income get a higher standard rate band (€53,000 vs €44,000 for single). Two-income married couples get up to €88,000 combined.</p>
            <p>Use the pension slider to enter your contribution percentage. Pension contributions come off gross income before tax — so you get relief at your highest rate.</p>
          </div>

          <h2 style={{ fontSize: 22, marginBottom: 16 }}>2026 Irish tax rates</h2>
          <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border-0)" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Tax</th><th>Rate</th><th>Threshold 2026</th>
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
                ].map(([tax, rate, threshold]) => (
                  <tr key={`${tax}-${rate}`}>
                    <td>{tax}</td>
                    <td><span className="mono" style={{ color: "var(--accent-hi)", fontWeight: 600 }}>{rate}</span></td>
                    <td>{threshold}</td>
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
