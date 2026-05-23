"use client";
import { useState, useMemo } from "react";
import { CheckCircle, ChevronDown, ChevronUp, Info } from "lucide-react";
import { calculate } from "@/lib/taxEngine";
import { formatEuro, formatPct } from "@/lib/format";
import type { TaxInput, FilingStatus, Frequency } from "@/lib/taxEngine";

const S = {
  card: { background: "#111d35", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 24 } as React.CSSProperties,
  label: { display: "block", fontSize: 13, color: "#8899bb", marginBottom: 6 } as React.CSSProperties,
  row: { display: "flex", justifyContent: "space-between", alignItems: "center" } as React.CSSProperties,
  mono: { fontFamily: "DM Mono, monospace" } as React.CSSProperties,
};

function MetricCard({ label, value, sub, highlight }: { label: string; value: string; sub?: string; highlight?: boolean }) {
  return (
    <div style={{
      background: highlight ? "rgba(0,168,107,0.1)" : "#111d35",
      border: `1px solid ${highlight ? "rgba(0,168,107,0.25)" : "rgba(255,255,255,0.06)"}`,
      borderRadius: 16, padding: "16px",
    }}>
      <p style={{ fontSize: 12, color: "#8899bb", marginBottom: 4 }}>{label}</p>
      <p style={{ fontSize: 22, fontWeight: 700, color: highlight ? "#00d084" : "#f0f4ff", ...S.mono }}>{value}</p>
      {sub && <p style={{ fontSize: 11, color: "#4a5980", marginTop: 3 }}>{sub}</p>}
    </div>
  );
}

function BandBar({ label, amount, pct, color }: { label: string; amount: number; pct: number; color: string }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ ...S.row, marginBottom: 5 }}>
        <span style={{ fontSize: 12, color: "#8899bb" }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#f0f4ff", ...S.mono }}>{formatEuro(amount)}</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.08)" }}>
        <div style={{ height: "100%", borderRadius: 3, width: `${Math.min(100, pct)}%`, background: color, transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
}

export default function SalaryCalculator() {
  const [salary, setSalary] = useState("45000");
  const [frequency, setFrequency] = useState<Frequency>("year");
  const [status, setStatus] = useState<FilingStatus>("single");
  const [pensionPct, setPensionPct] = useState(0);
  const [rentCredit, setRentCredit] = useState(false);
  const [homeCarerCredit, setHomeCarerCredit] = useState(false);
  const [selfEmployed, setSelfEmployed] = useState(false);
  const [showBands, setShowBands] = useState(false);

  const input: TaxInput = { grossSalary: parseFloat(salary) || 0, frequency, status, pensionPct, rentCredit, homeCarerCredit, selfEmployed };
  const result = useMemo(() => calculate(input), [salary, frequency, status, pensionPct, rentCredit, homeCarerCredit, selfEmployed]);
  const showHomeCarer = status === "married1" || status === "married2";

  const CheckboxRow = ({ checked, onChange, title, sub }: { checked: boolean; onChange: (v: boolean) => void; title: string; sub: string }) => (
    <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} style={{ marginTop: 2 }} />
      <div>
        <span style={{ fontSize: 13, color: "#f0f4ff", display: "block" }}>{title}</span>
        <span style={{ fontSize: 11, color: "#4a5980" }}>{sub}</span>
      </div>
    </label>
  );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="grid-cols-1 lg:grid-cols-2">
      {/* LEFT */}
      <div style={S.card}>
        <p style={{ fontSize: 15, fontWeight: 600, color: "#f0f4ff", marginBottom: 20 }}>Your details</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={S.label}>Gross salary</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#8899bb", pointerEvents: "none" }}>€</span>
              <input type="number" value={salary} onChange={e => setSalary(e.target.value)} style={{ paddingLeft: 28 }} placeholder="45000" />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={S.label}>Frequency</label>
              <select value={frequency} onChange={e => setFrequency(e.target.value as Frequency)}>
                <option value="year">Per year</option>
                <option value="month">Per month</option>
                <option value="week">Per week</option>
                <option value="day">Per day</option>
                <option value="hour">Per hour</option>
              </select>
            </div>
            <div>
              <label style={S.label}>Tax year</label>
              <select disabled><option>2026</option></select>
            </div>
          </div>

          <div>
            <label style={S.label}>Personal status</label>
            <select value={status} onChange={e => setStatus(e.target.value as FilingStatus)}>
              <option value="single">Single</option>
              <option value="married1">Married — one income</option>
              <option value="married2">Married — two incomes</option>
              <option value="spccc">Single parent (SPCCC)</option>
            </select>
          </div>

          <div>
            <div style={{ ...S.row, marginBottom: 8 }}>
              <label style={{ ...S.label, marginBottom: 0 }}>Pension contribution</label>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#00d084", ...S.mono }}>{pensionPct}%</span>
            </div>
            <input type="range" min={0} max={40} step={1} value={pensionPct} onChange={e => setPensionPct(Number(e.target.value))} />
            <div style={{ ...S.row, marginTop: 4 }}>
              <span style={{ fontSize: 11, color: "#4a5980" }}>0%</span>
              <span style={{ fontSize: 11, color: "#4a5980" }}>40% max</span>
            </div>
          </div>

          {/* Optional credits */}
          <div style={{ background: "#0f1f3d", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4a5980", marginBottom: 14 }}>Optional tax credits</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <CheckboxRow checked={selfEmployed} onChange={setSelfEmployed} title="Self-employed" sub="Earned Income Credit instead of PAYE" />
              <CheckboxRow checked={rentCredit} onChange={setRentCredit} title="Rent Tax Credit" sub="€1,000 single / €2,000 married (private renters)" />
              {showHomeCarer && <CheckboxRow checked={homeCarerCredit} onChange={setHomeCarerCredit} title="Home Carer Credit" sub="€1,950 — spouse cares at home" />}
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 20 }}>
          {["Revenue.ie rates", "Budget 2026", "No registration"].map(t => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <CheckCircle size={13} style={{ color: "#00a86b" }} />
              <span style={{ fontSize: 12, color: "#8899bb" }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Metrics grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <MetricCard label="Annual take-home" value={formatEuro(result.net)} sub={`${formatEuro(result.netMonthly)} / month`} highlight />
          <MetricCard label="Total deductions" value={formatEuro(result.totalDeductions)} sub={`${formatPct(result.effectiveRate)} effective rate`} />
          <MetricCard label="Weekly take-home" value={formatEuro(result.netWeekly)} sub={`${formatEuro(result.netHourly)} per hour`} />
          <MetricCard label="Marginal tax rate" value={`${result.marginalRate}%`} sub="Next €1 earned" />
        </div>

        {/* Breakdown */}
        <div style={{ ...S.card, padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#f0f4ff" }}>Annual breakdown</p>
          </div>
          {[
            { label: "Gross salary", amount: result.gross, type: "neutral" },
            ...(result.pensionRelief > 0 ? [{ label: "Pension (pre-tax)", amount: -result.pensionRelief, type: "deduct" }] : []),
            { label: "Income tax (PAYE)", amount: -result.incomeTax, type: "deduct" },
            { label: "Universal Social Charge (USC)", amount: -result.usc, type: "deduct" },
            { label: "PRSI (4.2% Class A)", amount: -result.prsi, type: "deduct" },
            { label: "Tax credits applied", amount: result.totalCredits, type: "credit" },
          ].map(({ label, amount, type }, i) => (
            <div key={i} style={{ ...S.row, padding: "11px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <span style={{ fontSize: 13, color: "#8899bb" }}>{label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: type === "neutral" ? "#f0f4ff" : type === "credit" ? "#00d084" : "#f87171", ...S.mono }}>
                {type === "credit" ? `+${formatEuro(amount)}` : amount < 0 ? `−${formatEuro(Math.abs(amount))}` : formatEuro(amount)}
              </span>
            </div>
          ))}
          <div style={{ ...S.row, padding: "14px 20px", background: "#0f1f3d" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#f0f4ff" }}>Take-home pay</span>
            <span style={{ fontSize: 20, fontWeight: 700, color: "#00d084", ...S.mono }}>{formatEuro(result.net)}</span>
          </div>
        </div>

        {/* Band toggle */}
        <button onClick={() => setShowBands(!showBands)} style={{
          ...S.row, width: "100%", padding: "12px 20px", borderRadius: 14,
          background: "#111d35", border: "1px solid rgba(255,255,255,0.06)",
          color: "#8899bb", fontSize: 13, cursor: "pointer",
        }}>
          <span>View detailed band breakdown</span>
          {showBands ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showBands && (
          <div style={{ ...S.card }}>
            <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4a5980", marginBottom: 16 }}>Income tax bands</p>
            {result.itBands.map((b, i) => (
              <BandBar key={i} label={`${b.label} on ${formatEuro(b.income)}`} amount={b.amount} pct={(b.amount / result.gross) * 100} color="#3b82f6" />
            ))}
            <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4a5980", margin: "20px 0 16px" }}>USC bands</p>
            {result.uscBands.length === 0
              ? <p style={{ fontSize: 13, color: "#8899bb" }}>Exempt — income under €13,000</p>
              : result.uscBands.map((b, i) => (
                  <BandBar key={i} label={`${b.rate}% on ${formatEuro(b.income)}`} amount={b.amount} pct={(b.amount / result.gross) * 100} color="#f59e0b" />
                ))
            }
          </div>
        )}

        {/* Disclaimer */}
        <div style={{ display: "flex", gap: 10, padding: 14, borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <Info size={14} style={{ color: "#4a5980", flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: 11, color: "#4a5980", lineHeight: 1.7 }}>
            Estimates only. Standard credits applied. PRSI rises to 4.35% from 1 Oct 2026. Verify with{" "}
            <a href="https://www.revenue.ie" target="_blank" rel="noopener noreferrer" style={{ color: "#8899bb", textDecoration: "underline" }}>Revenue.ie</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
