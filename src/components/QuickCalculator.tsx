"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { calculate, toAnnual } from "@/lib/taxEngine";
import { formatEuro, formatPct } from "@/lib/format";
import type { Frequency, FilingStatus } from "@/lib/taxEngine";

export default function QuickCalculator() {
  const [salary, setSalary] = useState("45000");
  const [frequency, setFrequency] = useState<Frequency>("year");
  const [status, setStatus] = useState<FilingStatus>("single");

  const result = useMemo(() => calculate({
    grossSalary: parseFloat(salary) || 0,
    frequency, status,
    pensionPct: 0, rentCredit: false, homeCarerCredit: false, selfEmployed: false,
  }), [salary, frequency, status]);

  const gross = toAnnual(parseFloat(salary) || 0, frequency);

  return (
    <div className="card" style={{ padding: 28 }}>
      <div style={{ marginBottom: 22 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-0)", letterSpacing: "-0.01em" }}>Quick calculator</p>
        <p style={{ fontSize: 12, color: "var(--text-2)", marginTop: 3 }}>Instant take-home estimate</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
        <div>
          <label style={{ display: "block", fontSize: 11, color: "var(--text-2)", marginBottom: 5, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>Gross salary</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-2)", fontSize: 14, pointerEvents: "none" }}>€</span>
            <input type="number" value={salary} onChange={e => setSalary(e.target.value)} style={{ paddingLeft: 26 }} placeholder="45000" />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div>
            <label style={{ display: "block", fontSize: 11, color: "var(--text-2)", marginBottom: 5, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>Paid</label>
            <select value={frequency} onChange={e => setFrequency(e.target.value as Frequency)}>
              <option value="year">Per year</option>
              <option value="month">Per month</option>
              <option value="week">Per week</option>
              <option value="hour">Per hour</option>
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11, color: "var(--text-2)", marginBottom: 5, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>Status</label>
            <select value={status} onChange={e => setStatus(e.target.value as FilingStatus)}>
              <option value="single">Single</option>
              <option value="married1">Married (1)</option>
              <option value="married2">Married (2)</option>
              <option value="spccc">Single parent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      {gross > 0 && (
        <div style={{ background: "var(--bg-1)", borderRadius: 12, padding: 18, marginBottom: 16 }}>
          {/* Hero number */}
          <div style={{ marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid var(--border-0)" }}>
            <p style={{ fontSize: 11, color: "var(--text-2)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Annual take-home</p>
            <p className="num-hero" style={{ fontSize: 34, letterSpacing: "-0.04em" }}>{formatEuro(result.net)}</p>
            <p style={{ fontSize: 12, color: "var(--text-2)", marginTop: 3 }}>{formatEuro(result.netMonthly)} per month</p>
          </div>

          {/* Breakdown rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {[
              { label: "Income tax", value: `−${formatEuro(result.incomeTax)}`, color: "#f87171" },
              { label: "USC", value: `−${formatEuro(result.usc)}`, color: "#fb923c" },
              { label: "PRSI", value: `−${formatEuro(result.prsi)}`, color: "#fbbf24" },
              { label: "Effective rate", value: formatPct(result.effectiveRate), color: "var(--text-1)" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "var(--text-1)" }}>{label}</span>
                <span className="num-body" style={{ fontSize: 12, color }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link href={`/salary-calculator?salary=${salary}&freq=${frequency}&status=${status}`} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
        Full breakdown <ArrowRight size={13} />
      </Link>
    </div>
  );
}
