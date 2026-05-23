"use client";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { calculate, toAnnual } from "@/lib/taxEngine";
import { formatEuro } from "@/lib/format";
import { CheckCircle, AlertTriangle, Info } from "lucide-react";
import type { FilingStatus, Frequency } from "@/lib/taxEngine";

const S = {
  card: { background: "#111d35", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 24 } as React.CSSProperties,
  label: { display: "block", fontSize: 13, color: "#8899bb", marginBottom: 6 } as React.CSSProperties,
  mono: { fontFamily: "DM Mono, monospace" } as React.CSSProperties,
};

const TOLERANCE = 0.05; // 5% tolerance before flagging

function StatusBadge({ ok, label }: { ok: boolean | null; label: string }) {
  if (ok === null) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 99, background: ok ? "rgba(0,168,107,0.12)" : "rgba(251,146,60,0.12)", border: `1px solid ${ok ? "rgba(0,168,107,0.3)" : "rgba(251,146,60,0.3)"}` }}>
      {ok
        ? <CheckCircle size={12} style={{ color: "#00d084" }} />
        : <AlertTriangle size={12} style={{ color: "#fb923c" }} />}
      <span style={{ fontSize: 11, fontWeight: 600, color: ok ? "#00d084" : "#fb923c" }}>{label}</span>
    </div>
  );
}

export default function PayslipCheckerPage() {
  const [grossPay, setGrossPay] = useState("3750");
  const [payeDeducted, setPayeDeducted] = useState("633");
  const [uscDeducted, setUscDeducted] = useState("74");
  const [prsiDeducted, setPrsiDeducted] = useState("158");
  const [frequency, setFrequency] = useState<Frequency>("month");
  const [status, setStatus] = useState<FilingStatus>("single");
  const [pensionPct, setPensionPct] = useState(0);

  const result = useMemo(() => {
    const gross = parseFloat(grossPay) || 0;
    const r = calculate({ grossSalary: gross, frequency, status, pensionPct, rentCredit: false, homeCarerCredit: false, selfEmployed: false });

    const freqDiv = frequency === "month" ? 12 : frequency === "week" ? 52 : frequency === "year" ? 1 : 52;

    const expectedPAYE = r.incomeTax / freqDiv;
    const expectedUSC = r.usc / freqDiv;
    const expectedPRSI = r.prsi / freqDiv;

    const actualPAYE = parseFloat(payeDeducted) || 0;
    const actualUSC = parseFloat(uscDeducted) || 0;
    const actualPRSI = parseFloat(prsiDeducted) || 0;

    const check = (actual: number, expected: number) => {
      if (expected === 0 && actual === 0) return { ok: true, diff: 0, pct: 0 };
      if (expected === 0) return { ok: false, diff: actual, pct: 100 };
      const diff = actual - expected;
      const pct = Math.abs(diff / expected);
      return { ok: pct <= TOLERANCE, diff, pct };
    };

    return {
      expectedPAYE, expectedUSC, expectedPRSI,
      payeCheck: check(actualPAYE, expectedPAYE),
      uscCheck: check(actualUSC, expectedUSC),
      prsiCheck: check(actualPRSI, expectedPRSI),
      expectedNet: r.net / freqDiv,
      actualNet: gross - actualPAYE - actualUSC - actualPRSI - (r.pensionRelief / freqDiv),
    };
  }, [grossPay, payeDeducted, uscDeducted, prsiDeducted, frequency, status, pensionPct]);

  const allOk = result.payeCheck.ok && result.uscCheck.ok && result.prsiCheck.ok;

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", fontSize: 12, padding: "4px 12px", borderRadius: 99, background: "rgba(0,168,107,0.12)", border: "1px solid rgba(0,168,107,0.25)", color: "#00d084", marginBottom: 16 }}>
            Income Tax
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: "#f0f4ff", marginBottom: 10 }}>Payslip Checker 2026</h1>
          <p style={{ fontSize: 15, color: "#8899bb", maxWidth: 580 }}>
            Enter the figures from your payslip to check whether your employer is deducting the right amount of PAYE, USC, and PRSI. Works for weekly and monthly pay.
          </p>
        </div>

        <div className="calc-grid">
          {/* Inputs */}
          <div style={S.card}>
            <p style={{ fontSize: 15, fontWeight: 600, color: "#f0f4ff", marginBottom: 20 }}>Your payslip figures</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={S.label}>Pay frequency</label>
                  <select value={frequency} onChange={e => setFrequency(e.target.value as Frequency)}>
                    <option value="month">Monthly</option>
                    <option value="week">Weekly</option>
                  </select>
                </div>
                <div>
                  <label style={S.label}>Filing status</label>
                  <select value={status} onChange={e => setStatus(e.target.value as FilingStatus)}>
                    <option value="single">Single</option>
                    <option value="married1">Married (1 income)</option>
                    <option value="married2">Married (2 incomes)</option>
                    <option value="spccc">Single parent</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={S.label}>Gross pay this period</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#8899bb", pointerEvents: "none" }}>€</span>
                  <input type="number" value={grossPay} onChange={e => setGrossPay(e.target.value)} style={{ paddingLeft: 28 }} placeholder="3750" />
                </div>
              </div>

              <div style={{ background: "#0f1f3d", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 16 }}>
                <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4a5980", marginBottom: 14 }}>Deductions from your payslip</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { label: "PAYE deducted", value: payeDeducted, setValue: setPayeDeducted, placeholder: "633" },
                    { label: "USC deducted", value: uscDeducted, setValue: setUscDeducted, placeholder: "74" },
                    { label: "PRSI deducted", value: prsiDeducted, setValue: setPrsiDeducted, placeholder: "158" },
                  ].map(({ label, value, setValue, placeholder }) => (
                    <div key={label}>
                      <label style={S.label}>{label}</label>
                      <div style={{ position: "relative" }}>
                        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#8899bb", pointerEvents: "none" }}>€</span>
                        <input type="number" value={value} onChange={e => setValue(e.target.value)} style={{ paddingLeft: 28 }} placeholder={placeholder} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <label style={{ ...S.label, marginBottom: 0 }}>Pension %</label>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#00d084", ...S.mono }}>{pensionPct}%</span>
                </div>
                <input type="range" min={0} max={40} step={1} value={pensionPct} onChange={e => setPensionPct(Number(e.target.value))} />
              </div>
            </div>
          </div>

          {/* Results */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Overall verdict */}
            <div style={{
              padding: 24, borderRadius: 20, textAlign: "center",
              background: allOk ? "rgba(0,168,107,0.1)" : "rgba(251,146,60,0.1)",
              border: `1px solid ${allOk ? "rgba(0,168,107,0.25)" : "rgba(251,146,60,0.25)"}`,
            }}>
              {allOk
                ? <CheckCircle size={36} style={{ color: "#00d084", margin: "0 auto 12px" }} />
                : <AlertTriangle size={36} style={{ color: "#fb923c", margin: "0 auto 12px" }} />}
              <p style={{ fontSize: 17, fontWeight: 700, color: "#f0f4ff", marginBottom: 6 }}>
                {allOk ? "Your deductions look correct" : "Something looks off"}
              </p>
              <p style={{ fontSize: 13, color: "#8899bb" }}>
                {allOk
                  ? "Within 5% tolerance on all three deductions"
                  : "One or more deductions differ from what we expect. Check the breakdown below."}
              </p>
            </div>

            {/* Line by line */}
            <div style={{ ...S.card, padding: 0, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px 80px", gap: 4, padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#0f1f3d" }}>
                {["Deduction", "Your payslip", "Expected", "Status"].map(h => (
                  <span key={h} style={{ fontSize: 11, fontWeight: 600, color: "#4a5980", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>
                ))}
              </div>

              {[
                { label: "PAYE", actual: parseFloat(payeDeducted) || 0, expected: result.expectedPAYE, check: result.payeCheck },
                { label: "USC", actual: parseFloat(uscDeducted) || 0, expected: result.expectedUSC, check: result.uscCheck },
                { label: "PRSI", actual: parseFloat(prsiDeducted) || 0, expected: result.expectedPRSI, check: result.prsiCheck },
              ].map(({ label, actual, expected, check }) => (
                <div key={label} style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px 80px", gap: 4, padding: "13px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)", alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: "#8899bb" }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#f0f4ff", ...S.mono }}>{formatEuro(actual)}</span>
                  <span style={{ fontSize: 13, color: "#8899bb", ...S.mono }}>{formatEuro(expected)}</span>
                  <StatusBadge ok={check.ok} label={check.ok ? "OK" : check.diff > 0 ? "Over" : "Under"} />
                </div>
              ))}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px 80px", gap: 4, padding: "13px 20px", background: "#0f1f3d", alignItems: "center" }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#f0f4ff" }}>Net take-home</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#00d084", ...S.mono }}>{formatEuro(result.actualNet)}</span>
                <span style={{ fontSize: 13, color: "#8899bb", ...S.mono }}>{formatEuro(result.expectedNet)}</span>
                <span />
              </div>
            </div>

            {!allOk && (
              <div style={{ padding: 16, borderRadius: 14, background: "rgba(251,146,60,0.08)", border: "1px solid rgba(251,146,60,0.2)" }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#fb923c", marginBottom: 8 }}>What to do if something is wrong</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    "Check your tax credit certificate in myAccount on Revenue.ie",
                    "Confirm your tax code with your employer's payroll department",
                    "If you changed jobs mid-year, emergency tax may apply temporarily",
                    "Contact Revenue directly via MyEnquiries in myAccount",
                  ].map(item => (
                    <li key={item} style={{ fontSize: 12, color: "#8899bb", paddingLeft: 16, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: "#fb923c" }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ display: "flex", gap: 10, padding: 14, borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <Info size={14} style={{ color: "#4a5980", flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 11, color: "#4a5980", lineHeight: 1.7 }}>
                This uses standard credits only. If you have a non-standard tax code, illness benefit, or benefit-in-kind, your actual deductions will differ. Within 5% is considered normal. Always verify with <a href="https://www.revenue.ie" target="_blank" rel="noopener noreferrer" style={{ color: "#8899bb", textDecoration: "underline" }}>Revenue.ie</a>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
