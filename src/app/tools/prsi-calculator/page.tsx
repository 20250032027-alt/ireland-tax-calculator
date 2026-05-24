"use client";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { calcPRSI } from "@/lib/taxEngine";
import { formatEuro } from "@/lib/format";

const wrap: React.CSSProperties = { maxWidth: 1240, margin: "0 auto", padding: "48px 24px" };
const card: React.CSSProperties = { background: "var(--bg-2)", border: "1px solid var(--border-0)", borderRadius: "var(--radius-lg)", padding: 24 };
const lbl: React.CSSProperties = { display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 6 };

const PRSI_CLASSES = [
  { label: "Class A — Employees", rate: 4.2, desc: "Most private and public sector employees" },
  { label: "Class S — Self-employed", rate: 4.0, desc: "Self-employed individuals and directors" },
  { label: "Class K — Officeholders", rate: 4.0, desc: "Officeholders, unearned income" },
];

export default function PRSICalculatorPage() {
  const [income, setIncome] = useState("45000");
  const [prsiClass, setPrsiClass] = useState(0);

  const gross = parseFloat(income) || 0;
  const weeklyThreshold = 352 * 52;
  const exempt = gross <= weeklyThreshold;
  const prsi = useMemo(() => exempt ? 0 : gross * (PRSI_CLASSES[prsiClass].rate / 100), [gross, prsiClass, exempt]);

  return (
    <>
      <Navbar />
      <main style={wrap}>
        <div style={{ marginBottom: 40 }}>
          <span className="badge badge-neutral" style={{ marginBottom: 16 }}>Income Tax</span>
          <h1 style={{ marginBottom: 10 }}>How much PRSI do I pay in 2026?</h1>
          <p style={{ fontSize: 15, color: "var(--text-1)", maxWidth: 520 }}>
            Calculate your Pay Related Social Insurance contribution. PRSI funds the Social Insurance Fund and qualifies you for the State pension.
          </p>
        </div>

        <div className="calc-grid">
          <div style={card}>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-0)", marginBottom: 20 }}>Your details</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={lbl}>Annual gross income</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-2)", pointerEvents: "none" }}>€</span>
                  <input type="number" value={income} onChange={e => setIncome(e.target.value)} style={{ paddingLeft: 28 }} placeholder="45000" />
                </div>
              </div>

              <div>
                <label style={lbl}>PRSI class</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {PRSI_CLASSES.map((c, i) => (
                    <button key={i} onClick={() => setPrsiClass(i)} style={{
                      textAlign: "left", padding: "12px 14px", borderRadius: "var(--radius-md)", cursor: "pointer",
                      background: prsiClass === i ? "var(--accent-dim)" : "var(--bg-1)",
                      border: `1px solid ${prsiClass === i ? "var(--accent-border)" : "var(--border-0)"}`,
                      transition: "all 0.15s",
                    }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-0)", marginBottom: 2 }}>
                        {c.label} <span className="mono" style={{ color: "var(--accent-hi)" }}>{c.rate}%</span>
                      </p>
                      <p style={{ fontSize: 11, color: "var(--text-2)" }}>{c.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ padding: 12, borderRadius: "var(--radius-sm)", background: "var(--bg-1)", border: "1px solid var(--border-0)" }}>
                <p style={{ fontSize: 12, color: "var(--text-2)" }}>Weekly threshold: €352 (€18,304/yr). Exempt below this.</p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ ...card, background: exempt ? "rgba(0,168,107,0.08)" : "var(--bg-2)", borderColor: exempt ? "var(--accent-border)" : "var(--border-0)" }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 10 }}>Annual PRSI</p>
              <p className="num-hero" style={{ fontSize: 44, marginBottom: 6 }}>{exempt ? "Exempt" : formatEuro(prsi)}</p>
              {!exempt && gross > 0 && (
                <>
                  <p style={{ fontSize: 13, color: "var(--text-1)", marginBottom: 16 }}>{PRSI_CLASSES[prsiClass].rate}% of gross income</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 16, borderTop: "1px solid var(--border-0)" }}>
                    {[
                      { l: "Monthly", v: formatEuro(prsi / 12) },
                      { l: "Weekly", v: formatEuro(prsi / 52) },
                    ].map(({ l, v }) => (
                      <div key={l} style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 13, color: "var(--text-1)" }}>{l}</span>
                        <span className="mono" style={{ fontSize: 13, fontWeight: 500, color: "var(--text-0)" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div style={card}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 16 }}>Rate changes 2026</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { period: "Jan – Sep 2026", rate: "4.2%", color: "var(--text-0)" },
                  { period: "Oct – Dec 2026", rate: "4.35%", color: "#fbbf24" },
                ].map(({ period, rate, color }) => (
                  <div key={period} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 13, color: "var(--text-1)" }}>{period}</span>
                    <span className="mono" style={{ fontSize: 13, fontWeight: 600, color }}>{rate}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 11, color: "var(--text-2)", marginTop: 12 }}>This calculator uses 4.2%. Blended annual figure will differ slightly.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
