"use client";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { calculate } from "@/lib/taxEngine";
import { formatEuro } from "@/lib/format";
import { Info } from "lucide-react";

const S = {
  card: { background: "#111d35", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 24 } as React.CSSProperties,
  label: { display: "block", fontSize: 13, color: "#8899bb", marginBottom: 6 } as React.CSSProperties,
  row: { display: "flex", justifyContent: "space-between", alignItems: "center" } as React.CSSProperties,
  mono: { fontFamily: "DM Mono, monospace" } as React.CSSProperties,
};

export default function ContractorDayRatePage() {
  const [payeSalary, setPayeSalary] = useState("60000");
  const [daysPerYear, setDaysPerYear] = useState("220");
  const [pensionPct, setPensionPct] = useState(5);
  const [accountancyCost, setAccountancyCost] = useState("2500");
  const [insuranceCost, setInsuranceCost] = useState("800");
  const [holidayWeeks, setHolidayWeeks] = useState("4");

  const result = useMemo(() => {
    const paye = parseFloat(payeSalary) || 0;
    const days = parseFloat(daysPerYear) || 220;
    const holidays = parseFloat(holidayWeeks) || 4;
    const pension = pensionPct / 100;
    const accountancy = parseFloat(accountancyCost) || 0;
    const insurance = parseFloat(insuranceCost) || 0;

    // PAYE take-home
    const payeResult = calculate({
      grossSalary: paye, frequency: "year",
      status: "single", pensionPct,
      rentCredit: false, homeCarerCredit: false, selfEmployed: false,
    });

    // Billable days (minus holidays)
    const billableDays = days - (holidays * 5);

    // What the contractor needs to earn to match PAYE net
    // Plus: accountancy, insurance, employer PRSI they now pay themselves (~11.15%)
    // Contractor pays no employer PRSI but loses it as a benefit
    // Rough model: gross needed = net target / (1 - effective tax rate as self-employed)
    const targetNet = payeResult.net;

    // Contractor effective costs on top of income tax
    // Self-employed: income tax + USC + PRSI (4%) + accountancy + insurance + pension
    const contractorResult = calculate({
      grossSalary: paye * 1.3, frequency: "year", // start estimate
      status: "single", pensionPct,
      rentCredit: false, homeCarerCredit: false, selfEmployed: true,
    });

    // Binary search for gross that covers target + overheads
    let lo = targetNet;
    let hi = targetNet * 3;
    for (let i = 0; i < 60; i++) {
      const mid = (lo + hi) / 2;
      const r = calculate({ grossSalary: mid, frequency: "year", status: "single", pensionPct, rentCredit: false, homeCarerCredit: false, selfEmployed: true });
      const netAfterOverheads = r.net - accountancy - insurance;
      if (netAfterOverheads < targetNet) lo = mid;
      else hi = mid;
    }
    const breakEvenGross = (lo + hi) / 2;
    const breakEvenDay = breakEvenGross / billableDays;

    // At that day rate, what does take-home look like
    const breakEvenResult = calculate({
      grossSalary: breakEvenGross, frequency: "year",
      status: "single", pensionPct,
      rentCredit: false, homeCarerCredit: false, selfEmployed: true,
    });

    return {
      payeNet: payeResult.net,
      payeMonthly: payeResult.netMonthly,
      billableDays,
      breakEvenDay,
      breakEvenGross,
      breakEvenNet: breakEvenResult.net - accountancy - insurance,
      totalOverheads: accountancy + insurance,
      pensionContrib: breakEvenGross * pension,
    };
  }, [payeSalary, daysPerYear, pensionPct, accountancyCost, insuranceCost, holidayWeeks]);

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", fontSize: 12, padding: "4px 12px", borderRadius: 99, background: "rgba(0,168,107,0.12)", border: "1px solid rgba(0,168,107,0.25)", color: "#00d084", marginBottom: 16 }}>
            Income Tax
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: "#f0f4ff", marginBottom: 10 }}>Contractor Day Rate Calculator 2026</h1>
          <p style={{ fontSize: 15, color: "#8899bb", maxWidth: 600 }}>
            Find the day rate you need to match your current PAYE salary. Factors in holidays, pension, accountancy fees, and Irish tax as a self-employed contractor.
          </p>
        </div>

        <div className="calc-grid">
          {/* Inputs */}
          <div style={S.card}>
            <p style={{ fontSize: 15, fontWeight: 600, color: "#f0f4ff", marginBottom: 20 }}>Your current situation</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              <div>
                <label style={S.label}>Current PAYE salary (gross annual)</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#8899bb", pointerEvents: "none" }}>€</span>
                  <input type="number" value={payeSalary} onChange={e => setPayeSalary(e.target.value)} style={{ paddingLeft: 28 }} placeholder="60000" />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={S.label}>Working days per year</label>
                  <input type="number" value={daysPerYear} onChange={e => setDaysPerYear(e.target.value)} placeholder="220" />
                </div>
                <div>
                  <label style={S.label}>Holiday weeks</label>
                  <input type="number" value={holidayWeeks} onChange={e => setHolidayWeeks(e.target.value)} placeholder="4" />
                </div>
              </div>

              <div>
                <div style={{ ...S.row, marginBottom: 8 }}>
                  <label style={{ ...S.label, marginBottom: 0 }}>Pension contribution</label>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#00d084", ...S.mono }}>{pensionPct}%</span>
                </div>
                <input type="range" min={0} max={40} step={1} value={pensionPct} onChange={e => setPensionPct(Number(e.target.value))} />
              </div>

              <div style={{ background: "#0f1f3d", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 16 }}>
                <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4a5980", marginBottom: 14 }}>Annual contractor overheads</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div>
                    <label style={S.label}>Accountancy fees</label>
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#8899bb", pointerEvents: "none" }}>€</span>
                      <input type="number" value={accountancyCost} onChange={e => setAccountancyCost(e.target.value)} style={{ paddingLeft: 28 }} placeholder="2500" />
                    </div>
                  </div>
                  <div>
                    <label style={S.label}>Professional insurance</label>
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#8899bb", pointerEvents: "none" }}>€</span>
                      <input type="number" value={insuranceCost} onChange={e => setInsuranceCost(e.target.value)} style={{ paddingLeft: 28 }} placeholder="800" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Hero result */}
            <div style={{ background: "rgba(0,168,107,0.1)", border: "1px solid rgba(0,168,107,0.25)", borderRadius: 20, padding: 28, textAlign: "center" }}>
              <p style={{ fontSize: 13, color: "#8899bb", marginBottom: 8 }}>Break-even day rate</p>
              <p style={{ fontSize: 52, fontWeight: 700, color: "#00d084", ...S.mono, lineHeight: 1 }}>
                {formatEuro(result.breakEvenDay)}
              </p>
              <p style={{ fontSize: 13, color: "#8899bb", marginTop: 8 }}>per day to match your PAYE take-home</p>
            </div>

            {/* Comparison */}
            <div style={{ ...S.card, padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#f0f4ff" }}>PAYE vs contractor comparison</p>
              </div>
              {[
                { label: "PAYE take-home (annual)", value: formatEuro(result.payeNet), color: "#f0f4ff" },
                { label: "PAYE take-home (monthly)", value: formatEuro(result.payeMonthly), color: "#8899bb" },
                { label: "Billable days per year", value: `${result.billableDays} days`, color: "#8899bb" },
                { label: "Break-even gross (contractor)", value: formatEuro(result.breakEvenGross), color: "#f0f4ff" },
                { label: "Contractor overheads", value: `−${formatEuro(result.totalOverheads)}`, color: "#f87171" },
                { label: "Pension contribution", value: `−${formatEuro(result.pensionContrib)}`, color: "#fb923c" },
                { label: "Contractor net (after tax + costs)", value: formatEuro(result.breakEvenNet), color: "#00d084" },
              ].map(({ label, value, color }, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ fontSize: 13, color: "#8899bb" }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color, ...S.mono }}>{value}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "#111d35", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 16 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#f0f4ff", marginBottom: 8 }}>What this doesn&apos;t include</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  "Employer PRSI you no longer receive as a benefit (~11.15%)",
                  "No paid sick leave or maternity/paternity leave",
                  "No employer pension contributions",
                  "Revenue preliminary tax (pay tax in advance)",
                  "Business expenses you can legitimately claim",
                ].map(item => (
                  <li key={item} style={{ fontSize: 12, color: "#8899bb", paddingLeft: 16, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: "#4a5980" }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: "flex", gap: 10, padding: 14, borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <Info size={14} style={{ color: "#4a5980", flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 11, color: "#4a5980", lineHeight: 1.7 }}>
                This is a simplified model using single-person tax rates and Earned Income Credit. Most contractors operate through a limited company — your accountant will give you the exact figures for your structure. Verify with <a href="https://www.revenue.ie" target="_blank" rel="noopener noreferrer" style={{ color: "#8899bb", textDecoration: "underline" }}>Revenue.ie</a>.
              </p>
            </div>
          </div>
        </div>

        {/* Explainer */}
        <div style={{ marginTop: 64, maxWidth: 720 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#f0f4ff", marginBottom: 20 }}>Why your day rate needs to be higher than you think</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 14, color: "#8899bb", lineHeight: 1.8 }}>
            <p>When you are PAYE, your employer pays 11.15% employer PRSI on top of your salary. That money never appears on your payslip but it is a real cost of employing you. As a contractor, you lose that benefit — so a €60k PAYE salary actually costs your employer about €66,690 in total.</p>
            <p>On top of that, contractors pay for things that are invisible as an employee: accountancy (typically €1,500–€3,500/year for a contractor), professional indemnity insurance, and Revenue&apos;s preliminary tax system which requires you to pay tax before you have earned it.</p>
            <p>The general rule of thumb in Ireland is that your day rate should be roughly 1.5× to 2× what a PAYE employee earns per day. This calculator helps you find exactly where your break-even sits.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
