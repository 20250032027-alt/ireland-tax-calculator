"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { calculate, toAnnual } from "@/lib/taxEngine";
import { formatEuro, formatPct } from "@/lib/format";
import type { Frequency, FilingStatus } from "@/lib/taxEngine";

const card: React.CSSProperties = {
  background: "#111d35",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 20,
  padding: 24,
  boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
};

const label: React.CSSProperties = {
  display: "block", fontSize: 12, color: "#8899bb", marginBottom: 6,
};

const row: React.CSSProperties = {
  display: "flex", justifyContent: "space-between", alignItems: "center",
};

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
    <div style={card}>
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: "#f0f4ff", marginBottom: 2 }}>Quick Tax Calculator</p>
        <p style={{ fontSize: 13, color: "#8899bb" }}>Calculate your take-home pay in seconds</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
        <div>
          <label style={label}>Gross Salary (€)</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#8899bb", fontSize: 15, pointerEvents: "none" }}>€</span>
            <input type="number" value={salary} onChange={e => setSalary(e.target.value)} style={{ paddingLeft: 28 }} placeholder="45000" min="0" />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div>
            <label style={label}>Frequency</label>
            <select value={frequency} onChange={e => setFrequency(e.target.value as Frequency)}>
              <option value="year">Per year</option>
              <option value="month">Per month</option>
              <option value="week">Per week</option>
              <option value="hour">Per hour</option>
            </select>
          </div>
          <div>
            <label style={label}>Status</label>
            <select value={status} onChange={e => setStatus(e.target.value as FilingStatus)}>
              <option value="single">Single</option>
              <option value="married1">Married (1 income)</option>
              <option value="married2">Married (2 incomes)</option>
              <option value="spccc">Single parent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      {gross > 0 && (
        <div style={{ background: "#0f1f3d", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 16, marginBottom: 16 }}>
          <div style={{ ...row, marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: "#8899bb" }}>Take-home (annual)</span>
            <span style={{ fontSize: 20, fontWeight: 700, color: "#00d084", fontFamily: "DM Mono, monospace" }}>{formatEuro(result.net)}</span>
          </div>
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 10 }} />
          {[
            { label: "Monthly", value: formatEuro(result.netMonthly), color: "#f0f4ff" },
            { label: "Income tax", value: `−${formatEuro(result.incomeTax)}`, color: "#f87171" },
            { label: "USC", value: `−${formatEuro(result.usc)}`, color: "#fb923c" },
            { label: "PRSI", value: `−${formatEuro(result.prsi)}`, color: "#fbbf24" },
            { label: "Effective rate", value: formatPct(result.effectiveRate), color: "#8899bb" },
          ].map(({ label: l, value, color }) => (
            <div key={l} style={{ ...row, marginBottom: 7 }}>
              <span style={{ fontSize: 12, color: "#8899bb" }}>{l}</span>
              <span style={{ fontSize: 13, fontWeight: 500, color, fontFamily: "DM Mono, monospace" }}>{value}</span>
            </div>
          ))}
        </div>
      )}

      <Link href={`/salary-calculator?salary=${salary}&freq=${frequency}&status=${status}`} style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        width: "100%", padding: "12px 0", borderRadius: 12,
        background: "#00a86b", color: "#fff", fontWeight: 600, fontSize: 14,
        textDecoration: "none", boxShadow: "0 4px 16px rgba(0,168,107,0.25)",
        transition: "opacity 0.15s",
      }}>
        Full Breakdown <ArrowRight size={14} />
      </Link>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, marginTop: 14 }}>
        {["Revenue.ie rates", "Instant Results", "No Registration"].map(t => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <CheckCircle size={11} style={{ color: "#00a86b" }} />
            <span style={{ fontSize: 11, color: "#4a5980" }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
