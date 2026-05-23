"use client";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { calculate } from "@/lib/taxEngine";
import { formatEuro } from "@/lib/format";
import type { FilingStatus } from "@/lib/taxEngine";

const S = {
  card: { background: "#111d35", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 24 } as React.CSSProperties,
  label: { display: "block", fontSize: 13, color: "#8899bb", marginBottom: 6 } as React.CSSProperties,
  mono: { fontFamily: "DM Mono, monospace" } as React.CSSProperties,
};

function JobInput({
  label, color, salary, setSalary, extras, setExtras
}: {
  label: string; color: string;
  salary: string; setSalary: (v: string) => void;
  extras: number; setExtras: (v: number) => void;
}) {
  return (
    <div style={{ ...S.card, borderColor: `${color}33` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: color }} />
        <p style={{ fontSize: 15, fontWeight: 600, color: "#f0f4ff" }}>{label}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <label style={S.label}>Gross annual salary</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#8899bb", pointerEvents: "none" }}>€</span>
            <input type="number" value={salary} onChange={e => setSalary(e.target.value)} style={{ paddingLeft: 28 }} placeholder="50000" />
          </div>
        </div>
        <div>
          <label style={S.label}>Extra benefits (annual value)</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#8899bb", pointerEvents: "none" }}>€</span>
            <input type="number" value={extras || ""} onChange={e => setExtras(parseFloat(e.target.value) || 0)} style={{ paddingLeft: 28 }} placeholder="0" />
          </div>
          <p style={{ fontSize: 11, color: "#4a5980", marginTop: 4 }}>Pension, health insurance, car allowance, bonuses</p>
        </div>
      </div>
    </div>
  );
}

export default function SalaryComparisonPage() {
  const [salary1, setSalary1] = useState("55000");
  const [salary2, setSalary2] = useState("48000");
  const [extras1, setExtras1] = useState(0);
  const [extras2, setExtras2] = useState(3000);
  const [status, setStatus] = useState<FilingStatus>("single");
  const [pensionPct, setPensionPct] = useState(5);

  const r1 = useMemo(() => calculate({ grossSalary: parseFloat(salary1) || 0, frequency: "year", status, pensionPct, rentCredit: false, homeCarerCredit: false, selfEmployed: false }), [salary1, status, pensionPct]);
  const r2 = useMemo(() => calculate({ grossSalary: parseFloat(salary2) || 0, frequency: "year", status, pensionPct, rentCredit: false, homeCarerCredit: false, selfEmployed: false }), [salary2, status, pensionPct]);

  const totalValue1 = r1.net + extras1;
  const totalValue2 = r2.net + extras2;
  const diff = totalValue1 - totalValue2;
  const winner = diff > 0 ? 1 : diff < 0 ? 2 : 0;

  const COLORS = { a: "#3b82f6", b: "#a855f7" };

  const CompareRow = ({ label, v1, v2, highlight }: { label: string; v1: number; v2: number; highlight?: boolean }) => {
    const better = v1 > v2 ? 1 : v2 > v1 ? 2 : 0;
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 120px", gap: 8, padding: "11px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)", background: highlight ? "rgba(255,255,255,0.02)" : "transparent", alignItems: "center" }}>
        <span style={{ fontSize: 13, color: "#8899bb" }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: better === 1 ? COLORS.a : "#f0f4ff", ...S.mono, textAlign: "right" }}>{formatEuro(v1)}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: better === 2 ? COLORS.b : "#f0f4ff", ...S.mono, textAlign: "right" }}>{formatEuro(v2)}</span>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", fontSize: 12, padding: "4px 12px", borderRadius: 99, background: "rgba(0,168,107,0.12)", border: "1px solid rgba(0,168,107,0.25)", color: "#00d084", marginBottom: 16 }}>
            Income Tax
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: "#f0f4ff", marginBottom: 10 }}>Salary Comparison Calculator 2026</h1>
          <p style={{ fontSize: 15, color: "#8899bb", maxWidth: 580 }}>
            Got two job offers? Enter both salaries and see what you actually take home from each after Irish tax. Add benefits to get the full picture.
          </p>
        </div>

        {/* Shared settings */}
        <div style={{ ...S.card, marginBottom: 24, display: "flex", flexWrap: "wrap", gap: 20, alignItems: "flex-end" }}>
          <div style={{ flex: 1, minWidth: 160 }}>
            <label style={S.label}>Filing status (same for both)</label>
            <select value={status} onChange={e => setStatus(e.target.value as FilingStatus)}>
              <option value="single">Single</option>
              <option value="married1">Married — one income</option>
              <option value="married2">Married — two incomes</option>
              <option value="spccc">Single parent</option>
            </select>
          </div>
          <div style={{ flex: 1, minWidth: 160 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <label style={{ ...S.label, marginBottom: 0 }}>Pension %</label>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#00d084", ...S.mono }}>{pensionPct}%</span>
            </div>
            <input type="range" min={0} max={40} step={1} value={pensionPct} onChange={e => setPensionPct(Number(e.target.value))} />
          </div>
        </div>

        {/* Job inputs */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }} className="calc-grid">
          <JobInput label="Job A" color={COLORS.a} salary={salary1} setSalary={setSalary1} extras={extras1} setExtras={setExtras1} />
          <JobInput label="Job B" color={COLORS.b} salary={salary2} setSalary={setSalary2} extras={extras2} setExtras={setExtras2} />
        </div>

        {/* Winner banner */}
        {winner !== 0 && (
          <div style={{ marginBottom: 24, padding: "20px 28px", borderRadius: 16, background: winner === 1 ? `${COLORS.a}18` : `${COLORS.b}18`, border: `1px solid ${winner === 1 ? COLORS.a : COLORS.b}44`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#f0f4ff", marginBottom: 4 }}>
                Job {winner === 1 ? "A" : "B"} is worth more
              </p>
              <p style={{ fontSize: 13, color: "#8899bb" }}>
                By {formatEuro(Math.abs(diff))} per year ({formatEuro(Math.abs(diff) / 12)}/month) after tax and benefits
              </p>
            </div>
            <div style={{ fontSize: 36, fontWeight: 700, color: winner === 1 ? COLORS.a : COLORS.b, ...S.mono }}>
              {winner === 1 ? "A" : "B"}
            </div>
          </div>
        )}

        {/* Comparison table */}
        <div style={{ ...S.card, padding: 0, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 120px", gap: 8, padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#0f1f3d" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#4a5980", textTransform: "uppercase", letterSpacing: "0.06em" }}>Breakdown</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.a, textAlign: "right" }}>Job A</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.b, textAlign: "right" }}>Job B</span>
          </div>
          <CompareRow label="Gross salary" v1={r1.gross} v2={r2.gross} />
          <CompareRow label="Income tax (PAYE)" v1={-r1.incomeTax} v2={-r2.incomeTax} />
          <CompareRow label="USC" v1={-r1.usc} v2={-r2.usc} />
          <CompareRow label="PRSI" v1={-r1.prsi} v2={-r2.prsi} />
          <CompareRow label="Pension deduction" v1={-r1.pensionRelief} v2={-r2.pensionRelief} />
          <CompareRow label="Take-home pay" v1={r1.net} v2={r2.net} highlight />
          <CompareRow label="Extra benefits value" v1={extras1} v2={extras2} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 120px", gap: 8, padding: "14px 20px", background: "#0f1f3d", alignItems: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#f0f4ff" }}>Total package value</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: winner === 1 ? COLORS.a : "#f0f4ff", ...S.mono, textAlign: "right" }}>{formatEuro(totalValue1)}</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: winner === 2 ? COLORS.b : "#f0f4ff", ...S.mono, textAlign: "right" }}>{formatEuro(totalValue2)}</span>
          </div>
        </div>

        {/* Rate comparison */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }} className="calc-grid">
          {[
            { label: "Job A", color: COLORS.a, r: r1 },
            { label: "Job B", color: COLORS.b, r: r2 },
          ].map(({ label, color, r }) => (
            <div key={label} style={{ padding: 20, borderRadius: 16, background: "#111d35", border: `1px solid ${color}33` }}>
              <p style={{ fontSize: 13, fontWeight: 600, color, marginBottom: 12 }}>{label} rates</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { l: "Effective tax rate", v: `${r.effectiveRate.toFixed(1)}%` },
                  { l: "Marginal rate", v: `${r.marginalRate}%` },
                  { l: "Monthly take-home", v: formatEuro(r.netMonthly) },
                  { l: "Weekly take-home", v: formatEuro(r.netWeekly) },
                ].map(({ l, v }) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, color: "#8899bb" }}>{l}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#f0f4ff", ...S.mono }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
