import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DisclaimerPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold mb-8" style={{ color: "#f0f4ff" }}>
          Disclaimer
        </h1>
        <div className="space-y-6 text-sm leading-relaxed" style={{ color: "#8899bb" }}>
          <p>
            Ireland Tax Calculator provides tax estimates for general informational and educational
            purposes only. The figures produced are estimates based on the standard tax rates, bands,
            and credits published by the Irish Revenue Commissioners for the 2026 tax year.
          </p>
          <p>
            These calculations do <strong style={{ color: "#f0f4ff" }}>not</strong>{" "}
            constitute tax advice. They do not account for every individual circumstance — including
            but not limited to: non-standard tax codes, multiple sources of income, foreign income,
            back pay or lump sums, share options, benefit-in-kind, complex pension arrangements,
            tax debts, or Revenue interventions.
          </p>
          <p>
            We make every effort to keep our rates accurate and up to date, but we cannot guarantee
            that the information is complete, current, or error-free. Tax legislation can change
            mid-year following emergency Finance Acts.
          </p>
          <p>
            For advice specific to your situation, consult a qualified Irish tax adviser, accountant,
            or contact{" "}
            <a
              href="https://www.revenue.ie"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Revenue.ie
            </a>{" "}
            directly.
          </p>
          <div
            className="rounded-xl p-4 mt-6"
            style={{ background: "#111d35", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-xs" style={{ color: "#4a5980" }}>
              PRSI note: The Class A PRSI rate is 4.2% from 1 January 2026, rising to 4.35% from 1
              October 2026. Our calculator uses the 4.2% rate throughout. The blended annual figure
              will differ slightly for income earned across the full year.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
