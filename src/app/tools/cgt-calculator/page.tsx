"use client";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatEuro } from "@/lib/format";
import { Info } from "lucide-react";

const wrap: React.CSSProperties = { maxWidth: 1240, margin: "0 auto", padding: "48px 24px" };
const card: React.CSSProperties = { background: "var(--bg-2)", border: "1px solid var(--border-0)", borderRadius: "var(--radius-lg)", padding: 24 };
const lbl: React.CSSProperties = { display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 6 };

const ANNUAL_EXEMPTION = 1270;

export default function CGTCalculatorPage() {
  const [proceeds, setProceeds] = useState("50000");
  const [costBasis, setCostBasis] = useState("30000");
  const [expenses, setExpenses] = useState("500");
  const [isETF, setIsETF] = useState(false);

  const result = useMemo(() => {
    const p = parseFloat(proceeds) || 0;
    const c = parseFloat(costBasis) || 0;
    const e = parseFloat(expenses) || 0;
    const gain = Math.max(0, p - c - e);
    const afterExemption = Math.max(0, gain - ANNUAL_EXEMPTION);
    const rate = isETF ? 0.41 : 0.33;
    const tax = afterExemption * rate;
    return { gain, afterExemption, tax, rate, netProceeds: p - c - e - tax, p, c, e };
  }, [proceeds, costBasis, expenses, isETF]);

  return (
    <>
      <Navbar />
      <main style={wrap}>
        <div style={{ marginBottom: 40 }}>
          <span className="badge badge-neutral" style={{ marginBottom: 16 }}>Investment Tax</span>
          <h1 style={{ marginBottom: 10 }}>CGT calculator 2026</h1>
          <p style={{ fontSize: 15, color: "var(--text-1)", maxWidth: 520 }}>
            Calculate Irish Capital Gains Tax at 33% on property, shares, and crypto. Includes the €1,270 annual exemption. ETF Exit Tax (41%) also supported.
          </p>
        </div>

        <div className="calc-grid">
          {/* Inputs */}
          <div style={card}>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-0)", marginBottom: 20 }}>Asset details</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Sale proceeds", value: proceeds, set: setProceeds, placeholder: "50000" },
                { label: "Original cost (inc. purchase costs)", value: costBasis, set: setCostBasis, placeholder: "30000" },
                { label: "Allowable expenses (agent, solicitor fees)", value: expenses, set: setExpenses, placeholder: "500" },
              ].map(({ label, value, set, placeholder }) => (
                <div key={label}>
                  <label style={lbl}>{label}</label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-2)", pointerEvents: "none" }}>€</span>
                    <input type="number" value={value} onChange={e => set(e.target.value)} style={{ paddingLeft: 28 }} placeholder={placeholder} />
                  </div>
                </div>
              ))}

              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", padding: "14px", borderRadius: "var(--radius-md)", background: "var(--bg-1)", border: "1px solid var(--border-0)" }}>
                <input type="checkbox" checked={isETF} onChange={e => setIsETF(e.target.checked)} style={{ marginTop: 2 }} />
                <div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-0)", display: "block" }}>ETF / Investment fund (Exit Tax)</span>
                  <span style={{ fontSize: 11, color: "var(--text-2)" }}>Irish-domiciled funds subject to 41% Exit Tax</span>
                </div>
              </label>
            </div>
          </div>

          {/* Results */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={card}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 10 }}>CGT payable</p>
              <p className="num-hero" style={{ fontSize: 44, marginBottom: 4 }}>{formatEuro(result.tax)}</p>
              <p style={{ fontSize: 13, color: "var(--text-1)" }}>
                {(result.rate * 100).toFixed(0)}% on {formatEuro(result.afterExemption)} chargeable gain
              </p>
            </div>

            <div style={{ ...card, padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border-0)", background: "var(--bg-1)" }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-0)" }}>Calculation</p>
              </div>
              {[
                { label: "Sale proceeds", value: result.p, type: "neutral" },
                { label: "Less: cost basis", value: -result.c, type: "deduct" },
                { label: "Less: expenses", value: -result.e, type: "deduct" },
                { label: "Gross gain", value: result.gain, type: "neutral" },
                { label: `Less: annual exemption`, value: -Math.min(result.gain, ANNUAL_EXEMPTION), type: "credit" },
                { label: "Chargeable gain", value: result.afterExemption, type: "neutral" },
                { label: `CGT at ${(result.rate * 100).toFixed(0)}%`, value: -result.tax, type: "deduct" },
              ].map(({ label, value, type }, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "11px 20px", borderBottom: "1px solid var(--border-0)" }}>
                  <span style={{ fontSize: 13, color: "var(--text-1)" }}>{label}</span>
                  <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: type === "neutral" ? "var(--text-0)" : type === "credit" ? "var(--accent-hi)" : "#f87171" }}>
                    {value < 0 ? `−${formatEuro(Math.abs(value))}` : formatEuro(value)}
                  </span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 20px", background: "var(--bg-1)" }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-0)" }}>Net after CGT</span>
                <span className="mono" style={{ fontSize: 16, fontWeight: 700, color: "var(--accent-hi)" }}>{formatEuro(result.netProceeds)}</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, padding: 14, borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-0)" }}>
              <Info size={13} style={{ color: "var(--text-2)", flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 11, color: "var(--text-2)", lineHeight: 1.7 }}>
                PPR relief may reduce CGT on your main home. Indexation applies to assets acquired before 2003. CGT returns due by 31 October. Verify with <a href="https://www.revenue.ie" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-1)", textDecoration: "underline" }}>Revenue.ie</a>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
