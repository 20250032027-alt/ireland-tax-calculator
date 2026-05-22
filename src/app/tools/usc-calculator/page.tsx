"use client";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { calcUSC } from "@/lib/taxEngine";
import { formatEuro } from "@/lib/format";
import { Info } from "lucide-react";

export default function USCCalculatorPage() {
  const [income, setIncome] = useState("45000");

  const gross = parseFloat(income) || 0;
  const { total, bands } = useMemo(() => calcUSC(gross), [gross]);
  const exempt = gross <= 13000;

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)", color: "#fbbf24" }}>
            Income Tax
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
            USC Calculator 2026
          </h1>
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>
            Calculate your Universal Social Charge based on 2026 Revenue.ie rates. Exempt if total income ≤ €13,000.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input */}
          <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <h2 className="text-sm font-semibold mb-5" style={{ color: "var(--text-primary)" }}>Your income</h2>
            <div className="mb-4">
              <label className="block text-sm mb-1.5" style={{ color: "var(--text-secondary)" }}>Annual gross income</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-secondary)" }}>€</span>
                <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} className="pl-7" placeholder="45000" min="0" />
              </div>
            </div>

            {/* USC band table */}
            <div className="rounded-xl overflow-hidden mt-6" style={{ border: "1px solid var(--border)" }}>
              <div className="px-4 py-2.5" style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>2026 USC Bands</p>
              </div>
              {[
                { band: "Up to €13,000", rate: "Exempt" },
                { band: "€0 – €12,012", rate: "0.5%" },
                { band: "€12,013 – €28,700", rate: "2%" },
                { band: "€28,701 – €70,044", rate: "3%" },
                { band: "Above €70,044", rate: "8%" },
              ].map(({ band, rate }) => (
                <div key={band} className="flex justify-between px-4 py-2.5" style={{ borderBottom: "1px solid var(--border)" }}>
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{band}</span>
                  <span className="text-xs font-mono font-medium" style={{ color: "var(--accent-green-light)" }}>{rate}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="rounded-2xl p-6" style={{ background: exempt ? "rgba(0,168,107,0.08)" : "var(--bg-card)", border: `1px solid ${exempt ? "rgba(0,168,107,0.25)" : "var(--border)"}` }}>
              <p className="text-xs mb-1" style={{ color: "var(--text-secondary)" }}>Total USC</p>
              <p className="text-4xl font-bold mb-1" style={{ color: exempt ? "var(--accent-green-light)" : "var(--text-primary)" }}>
                {exempt ? "Exempt" : formatEuro(total)}
              </p>
              {exempt && <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Income ≤ €13,000 — no USC payable</p>}
              {!exempt && gross > 0 && (
                <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                  {((total / gross) * 100).toFixed(1)}% of gross income
                </p>
              )}
            </div>

            {!exempt && bands.length > 0 && (
              <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="px-5 py-3 border-b" style={{ borderColor: "var(--border)" }}>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Band breakdown</p>
                </div>
                {bands.map((b, i) => (
                  <div key={i} className="px-5 py-3 border-b flex justify-between" style={{ borderColor: "var(--border)" }}>
                    <div>
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{b.rate}% on {formatEuro(b.income)}</p>
                    </div>
                    <p className="text-sm font-mono font-medium" style={{ color: "var(--text-primary)" }}>−{formatEuro(b.amount)}</p>
                  </div>
                ))}
                <div className="px-5 py-3 flex justify-between" style={{ background: "var(--bg-secondary)" }}>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Total USC</p>
                  <p className="text-sm font-bold font-mono" style={{ color: "#f87171" }}>−{formatEuro(total)}</p>
                </div>
              </div>
            )}

            <div className="flex gap-2.5 rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}>
              <Info size={14} className="shrink-0 mt-0.5" style={{ color: "var(--text-muted)" }} />
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                USC is charged on gross income before pension relief. Medical card holders aged 70+ pay a reduced rate of 2% on all income. Verify with <a href="https://www.revenue.ie" target="_blank" rel="noopener noreferrer" className="underline">Revenue.ie</a>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
