"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { calculate, toAnnual } from "@/lib/taxEngine";
import { formatEuro, formatPct } from "@/lib/format";
import type { Frequency, FilingStatus } from "@/lib/taxEngine";

export default function QuickCalculator() {
  const [salary, setSalary] = useState("45000");
  const [frequency, setFrequency] = useState<Frequency>("year");
  const [status, setStatus] = useState<FilingStatus>("single");

  const result = useMemo(
    () =>
      calculate({
        grossSalary: parseFloat(salary) || 0,
        frequency,
        status,
        pensionPct: 0,
        rentCredit: false,
        homeCarerCredit: false,
        selfEmployed: false,
      }),
    [salary, frequency, status]
  );

  const gross = toAnnual(parseFloat(salary) || 0, frequency);

  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.3)",
      }}
    >
      <div className="mb-5">
        <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>
          Quick Tax Calculator
        </p>
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          Calculate your take-home pay in seconds
        </p>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <label className="block text-xs mb-1.5" style={{ color: "var(--text-secondary)" }}>
            Gross Salary (€)
          </label>
          <div className="relative">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              €
            </span>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="pl-7 text-sm"
              placeholder="45000"
              min="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs mb-1.5" style={{ color: "var(--text-secondary)" }}>
              Frequency
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as Frequency)}
              className="text-sm"
            >
              <option value="year">Per year</option>
              <option value="month">Per month</option>
              <option value="week">Per week</option>
              <option value="hour">Per hour</option>
            </select>
          </div>
          <div>
            <label className="block text-xs mb-1.5" style={{ color: "var(--text-secondary)" }}>
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as FilingStatus)}
              className="text-sm"
            >
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
        <div
          className="rounded-xl p-4 mb-4 space-y-2.5"
          style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
        >
          <div className="flex justify-between items-center">
            <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Take-home (annual)
            </span>
            <span className="text-base font-bold" style={{ color: "var(--accent-green-light)" }}>
              {formatEuro(result.net)}
            </span>
          </div>
          <div className="h-px" style={{ background: "var(--border)" }} />
          <div className="flex justify-between items-center">
            <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Monthly</span>
            <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
              {formatEuro(result.netMonthly)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Income tax</span>
            <span className="text-sm font-medium" style={{ color: "#f87171" }}>
              −{formatEuro(result.incomeTax)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs" style={{ color: "var(--text-secondary)" }}>USC</span>
            <span className="text-sm font-medium" style={{ color: "#fb923c" }}>
              −{formatEuro(result.usc)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs" style={{ color: "var(--text-secondary)" }}>PRSI</span>
            <span className="text-sm font-medium" style={{ color: "#fbbf24" }}>
              −{formatEuro(result.prsi)}
            </span>
          </div>
          <div className="h-px" style={{ background: "var(--border)" }} />
          <div className="flex justify-between items-center">
            <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Effective rate</span>
            <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
              {formatPct(result.effectiveRate)}
            </span>
          </div>
        </div>
      )}

      <Link
        href={`/salary-calculator?salary=${salary}&freq=${frequency}&status=${status}`}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
        style={{
          background: "var(--accent-green)",
          color: "#fff",
          boxShadow: "0 4px 16px rgba(0,168,107,0.25)",
        }}
      >
        Full Breakdown <ArrowRight size={14} />
      </Link>

      <div className="flex items-center justify-center gap-4 mt-4">
        {["Revenue.ie rates", "Instant Results", "No Registration"].map((t) => (
          <div key={t} className="flex items-center gap-1">
            <CheckCircle size={11} style={{ color: "var(--accent-green)" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {t}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
