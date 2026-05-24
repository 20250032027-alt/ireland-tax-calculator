"use client";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { calcIncomeTax, getCredits, getStandardBand } from "@/lib/taxEngine";
import { formatEuro } from "@/lib/format";
import type { FilingStatus } from "@/lib/taxEngine";

const wrap: React.CSSProperties = { maxWidth: 1240, margin: "0 auto", padding: "48px 24px" };
const card: React.CSSProperties = { background: "var(--bg-2)", border: "1px solid var(--border-0)", borderRadius: "var(--radius-lg)", padding: 24 };
const lbl: React.CSSProperties = { display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 6 };

export default function IncomeTaxCalculatorPage() {
  const [income, setIncome] = useState("45000");
  const [status, setStatus] = useState<FilingStatus>("single");

  const gross = parseFloat(income) || 0;
  const credits = useMemo(() => getCredits(status, false, false, false), [status]);
  const band = getStandardBand(status);
  const { tax, bands } = useMemo(() => calcIncomeTax(gross, status, credits), [gross, status, credits]);

  return (
    <>
      <Navbar />
      <main style={wrap}>
        <div style={{ marginBottom: 40 }}>
          <span className="badge badge-neutral" style={{ marginBottom: 16 }}>Income Tax</span>
          <h1 style={{ marginBottom: 10 }}>How much income tax do I owe in Ireland in 2026?</h1>
          <p style={{ fontSize: 15, color: "var(--text-1)", maxWidth: 520 }}>
            Estimate your PAYE income tax across the 20% and 40% rate bands. Includes standard tax credits for 2026.
          </p>
        </div>

        <div className="calc-grid">
          {/* Inputs */}
          <div style={card}>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-0)", marginBottom: 20 }}>Your income</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={lbl}>Annual taxable income</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-2)", pointerEvents: "none" }}>€</span>
                  <input type="number" value={income} onChange={e => setIncome(e.target.value)} style={{ paddingLeft: 28 }} placeholder="45000" />
                </div>
              </div>
              <div>
                <label style={lbl}>Filing status</label>
                <select value={status} onChange={e => setStatus(e.target.value as FilingStatus)}>
                  <option value="single">Single</option>
                  <option value="married1">Married — one income</option>
                  <option value="married2">Married — two incomes</option>
                  <option value="spccc">Single parent (SPCCC)</option>
                </select>
              </div>

              <div style={{ padding: 14, borderRadius: "var(--radius-md)", background: "var(--bg-1)", border: "1px solid var(--border-0)" }}>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 8 }}>Your standard rate band</p>
                <p className="num-hero" style={{ fontSize: 28 }}>{formatEuro(band)}</p>
                <p style={{ fontSize: 12, color: "var(--text-2)", marginTop: 4 }}>Income above this is taxed at 40%</p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={card}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 10 }}>Income tax payable</p>
              <p className="num-hero" style={{ fontSize: 44, marginBottom: 4 }}>{formatEuro(tax)}</p>
              {gross > 0 && <p style={{ fontSize: 13, color: "var(--text-1)" }}>{((tax / gross) * 100).toFixed(1)}% of income</p>}
            </div>

            {/* Calculation breakdown */}
            <div style={{ ...card, padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border-0)", background: "var(--bg-1)" }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-0)" }}>Tax calculation</p>
              </div>
              {bands.map((b, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderBottom: "1px solid var(--border-0)" }}>
                  <span style={{ fontSize: 13, color: "var(--text-1)" }}>{b.label} on {formatEuro(b.income)}</span>
                  <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: "#f87171" }}>−{formatEuro(b.amount)}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 20px", borderBottom: "1px solid var(--border-0)" }}>
                <span style={{ fontSize: 13, color: "var(--text-1)" }}>Gross tax</span>
                <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: "var(--text-0)" }}>{formatEuro(bands.reduce((a, b) => a + b.amount, 0))}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 20px", borderBottom: "1px solid var(--border-0)" }}>
                <span style={{ fontSize: 13, color: "var(--text-1)" }}>Less: tax credits</span>
                <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: "var(--accent-hi)" }}>+{formatEuro(credits)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 20px", background: "var(--bg-1)" }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-0)" }}>Tax payable</span>
                <span className="mono" style={{ fontSize: 16, fontWeight: 700, color: "#f87171" }}>−{formatEuro(tax)}</span>
              </div>
            </div>

            {/* Credits applied */}
            <div style={card}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 14 }}>Credits applied</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { label: "Personal Tax Credit", amount: 2000 },
                  { label: "PAYE / Employee Credit", amount: 2000 },
                  ...(status === "married1" || status === "married2" ? [{ label: "Spouse Personal Credit", amount: 2000 }] : []),
                  ...(status === "spccc" ? [{ label: "Single Person Child Carer Credit", amount: 1900 }] : []),
                ].map(({ label, amount }, i, arr) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--border-0)" : "none" }}>
                    <span style={{ fontSize: 13, color: "var(--text-1)" }}>{label}</span>
                    <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: "var(--accent-hi)" }}>+{formatEuro(amount)}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12, marginTop: 4, borderTop: "1px solid var(--border-0)" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-0)" }}>Total credits</span>
                  <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: "var(--accent-hi)" }}>+{formatEuro(credits)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
