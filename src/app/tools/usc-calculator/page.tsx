"use client";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { calcUSC } from "@/lib/taxEngine";
import { formatEuro } from "@/lib/format";
import { Info } from "lucide-react";

const wrap: React.CSSProperties = { maxWidth: 1240, margin: "0 auto", padding: "48px 24px" };
const card: React.CSSProperties = { background: "var(--bg-2)", border: "1px solid var(--border-0)", borderRadius: "var(--radius-lg)", padding: 24 };
const lbl: React.CSSProperties = { display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 6 };

export default function USCCalculatorPage() {
  const [income, setIncome] = useState("45000");
  const gross = parseFloat(income) || 0;
  const { total, bands } = useMemo(() => calcUSC(gross), [gross]);
  const exempt = gross <= 13000;

  return (
    <>
      <Navbar />
      <main style={wrap}>
        <div style={{ marginBottom: 40 }}>
          <span className="badge badge-neutral" style={{ marginBottom: 16 }}>Income Tax</span>
          <h1 style={{ marginBottom: 10 }}>How much USC will I pay in 2026?</h1>
          <p style={{ fontSize: 15, color: "var(--text-1)", maxWidth: 520 }}>
            Calculate your Universal Social Charge based on 2026 Revenue.ie rates. Exempt if income is €13,000 or less.
          </p>
        </div>

        <div className="calc-grid">
          {/* Input */}
          <div style={card}>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-0)", marginBottom: 20 }}>Your income</p>
            <div style={{ marginBottom: 24 }}>
              <label style={lbl}>Annual gross income</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-2)", pointerEvents: "none" }}>€</span>
                <input type="number" value={income} onChange={e => setIncome(e.target.value)} style={{ paddingLeft: 28 }} placeholder="45000" />
              </div>
            </div>

            {/* Band reference */}
            <div style={{ background: "var(--bg-1)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
              <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--border-0)" }}>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-2)" }}>2026 USC bands</p>
              </div>
              {[
                { band: "Income ≤ €13,000", rate: "Exempt" },
                { band: "€0 – €12,012", rate: "0.5%" },
                { band: "€12,013 – €28,700", rate: "2%" },
                { band: "€28,701 – €70,044", rate: "3%" },
                { band: "Above €70,044", rate: "8%" },
              ].map(({ band, rate }, i) => (
                <div key={band} style={{ display: "flex", justifyContent: "space-between", padding: "10px 16px", borderBottom: i < 4 ? "1px solid var(--border-0)" : "none" }}>
                  <span style={{ fontSize: 13, color: "var(--text-1)" }}>{band}</span>
                  <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: "var(--accent-hi)" }}>{rate}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ ...card, background: exempt ? "rgba(0,168,107,0.08)" : "var(--bg-2)", borderColor: exempt ? "var(--accent-border)" : "var(--border-0)" }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 10 }}>Total USC</p>
              <p className="num-hero" style={{ fontSize: 44, marginBottom: 6 }}>{exempt ? "€0" : formatEuro(total)}</p>
              <p style={{ fontSize: 13, color: "var(--text-1)" }}>
                {exempt ? "Exempt — income under €13,000" : `${((total / gross) * 100).toFixed(1)}% of gross income`}
              </p>
            </div>

            {!exempt && bands.length > 0 && (
              <div style={{ ...card, padding: 0, overflow: "hidden" }}>
                <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border-0)", background: "var(--bg-1)" }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-0)" }}>Band breakdown</p>
                </div>
                {bands.map((b, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderBottom: "1px solid var(--border-0)" }}>
                    <span style={{ fontSize: 13, color: "var(--text-1)" }}>{b.rate}% on {formatEuro(b.income)}</span>
                    <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: "#f87171" }}>−{formatEuro(b.amount)}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 20px", background: "var(--bg-1)" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-0)" }}>Total USC</span>
                  <span className="mono" style={{ fontSize: 16, fontWeight: 700, color: "#f87171" }}>−{formatEuro(total)}</span>
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 10, padding: 14, borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-0)" }}>
              <Info size={13} style={{ color: "var(--text-2)", flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 11, color: "var(--text-2)", lineHeight: 1.7 }}>
                Medical card holders aged 70+ pay a reduced 2% rate on all income. USC is charged on gross income before pension relief. Verify with <a href="https://www.revenue.ie" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-1)", textDecoration: "underline" }}>Revenue.ie</a>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
