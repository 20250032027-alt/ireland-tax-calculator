"use client";
import { useState, useMemo } from "react";
import { CheckCircle, ChevronDown, ChevronUp, Info } from "lucide-react";
import { calculate } from "@/lib/taxEngine";
import { formatEuro, formatPct } from "@/lib/format";
import type { TaxInput, FilingStatus, Frequency } from "@/lib/taxEngine";

const FREQ_LABELS: Record<Frequency, string> = {
  year: "Per year",
  month: "Per month",
  week: "Per week",
  day: "Per day",
  hour: "Per hour",
};

const STATUS_LABELS: Record<FilingStatus, string> = {
  single: "Single",
  married1: "Married — one income",
  married2: "Married — two incomes",
  spccc: "Single parent (SPCCC)",
};

function MetricCard({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: highlight ? "rgba(0,168,107,0.1)" : "var(--bg-card)",
        border: `1px solid ${highlight ? "rgba(0,168,107,0.25)" : "var(--border)"}`,
      }}
    >
      <p className="text-xs mb-1" style={{ color: "var(--text-secondary)" }}>
        {label}
      </p>
      <p
        className="text-xl font-semibold"
        style={{ color: highlight ? "var(--accent-green-light)" : "var(--text-primary)" }}
      >
        {value}
      </p>
      {sub && (
        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

function BandBar({ label, amount, pct, color }: { label: string; amount: number; pct: number; color: string }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
          {label}
        </span>
        <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>
          {formatEuro(amount)}
        </span>
      </div>
      <div className="h-1.5 rounded-full w-full" style={{ background: "var(--border-hover)" }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${Math.min(100, pct)}%`, background: color }}
        />
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

  const input: TaxInput = {
    grossSalary: parseFloat(salary) || 0,
    frequency,
    status,
    pensionPct,
    rentCredit,
    homeCarerCredit,
    selfEmployed,
  };

  const result = useMemo(() => calculate(input), [
    salary, frequency, status, pensionPct, rentCredit, homeCarerCredit, selfEmployed,
  ]);

  const showHomeCarer = status === "married1" || status === "married2";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* LEFT — Inputs */}
      <div
        className="rounded-2xl p-6"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        <h2 className="text-base font-semibold mb-5" style={{ color: "var(--text-primary)" }}>
          Your details
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1.5" style={{ color: "var(--text-secondary)" }}>
              Gross salary
            </label>
            <div className="relative">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                €
              </span>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="pl-7"
                placeholder="45000"
                min="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "var(--text-secondary)" }}>
                Frequency
              </label>
              <select value={frequency} onChange={(e) => setFrequency(e.target.value as Frequency)}>
                {Object.entries(FREQ_LABELS).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "var(--text-secondary)" }}>
                Tax year
              </label>
              <select disabled>
                <option>2026</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1.5" style={{ color: "var(--text-secondary)" }}>
              Personal status
            </label>
            <select value={status} onChange={(e) => setStatus(e.target.value as FilingStatus)}>
              {Object.entries(STATUS_LABELS).map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Pension contribution
              </label>
              <span
                className="text-sm font-medium font-mono"
                style={{ color: "var(--accent-green-light)" }}
              >
                {pensionPct}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={40}
              step={1}
              value={pensionPct}
              onChange={(e) => setPensionPct(Number(e.target.value))}
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>0%</span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>40% max</span>
            </div>
          </div>

          {/* Optional credits */}
          <div
            className="rounded-xl p-4 space-y-3"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
          >
            <p className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
              Optional tax credits
            </p>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selfEmployed}
                onChange={(e) => setSelfEmployed(e.target.checked)}
              />
              <div>
                <span className="text-sm" style={{ color: "var(--text-primary)" }}>
                  Self-employed
                </span>
                <span className="block text-xs" style={{ color: "var(--text-muted)" }}>
                  Earned Income Credit instead of PAYE
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={rentCredit}
                onChange={(e) => setRentCredit(e.target.checked)}
              />
              <div>
                <span className="text-sm" style={{ color: "var(--text-primary)" }}>
                  Rent Tax Credit
                </span>
                <span className="block text-xs" style={{ color: "var(--text-muted)" }}>
                  €1,000 single / €2,000 married (private renters)
                </span>
              </div>
            </label>

            {showHomeCarer && (
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={homeCarerCredit}
                  onChange={(e) => setHomeCarerCredit(e.target.checked)}
                />
                <div>
                  <span className="text-sm" style={{ color: "var(--text-primary)" }}>
                    Home Carer Credit
                  </span>
                  <span className="block text-xs" style={{ color: "var(--text-muted)" }}>
                    €1,950 — spouse cares at home
                  </span>
                </div>
              </label>
            )}
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-3 mt-5">
          {["Revenue.ie rates", "Budget 2026", "No registration"].map((t) => (
            <div key={t} className="flex items-center gap-1.5">
              <CheckCircle size={13} style={{ color: "var(--accent-green)" }} />
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                {t}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — Results */}
      <div className="space-y-4">
        {/* Top metrics */}
        <div className="grid grid-cols-2 gap-3">
          <MetricCard
            label="Annual take-home"
            value={formatEuro(result.net)}
            sub={`${formatEuro(result.netMonthly)} / month`}
            highlight
          />
          <MetricCard
            label="Total deductions"
            value={formatEuro(result.totalDeductions)}
            sub={`${formatPct(result.effectiveRate)} effective rate`}
          />
          <MetricCard
            label="Weekly take-home"
            value={formatEuro(result.netWeekly)}
            sub={`${formatEuro(result.netHourly)} per hour`}
          />
          <MetricCard
            label="Marginal tax rate"
            value={`${result.marginalRate}%`}
            sub="Next €1 earned"
          />
        </div>

        {/* Breakdown card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <div className="px-5 py-3 border-b" style={{ borderColor: "var(--border)" }}>
            <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              Annual breakdown
            </h3>
          </div>

          <div className="px-5 py-4 space-y-0">
            {[
              { label: "Gross salary", amount: result.gross, neutral: true },
              ...(result.pensionRelief > 0
                ? [{ label: "Pension contribution (pre-tax)", amount: -result.pensionRelief }]
                : []),
              { label: "Income tax (PAYE)", amount: -result.incomeTax },
              { label: "Universal Social Charge (USC)", amount: -result.usc },
              { label: "PRSI (4.2% Class A)", amount: -result.prsi },
              { label: "Tax credits applied", amount: result.totalCredits, credit: true },
            ].map(({ label, amount, neutral, credit }, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-2.5 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {label}
                </span>
                <span
                  className="text-sm font-medium font-mono"
                  style={{
                    color: neutral
                      ? "var(--text-primary)"
                      : credit
                      ? "var(--accent-green-light)"
                      : amount < 0
                      ? "#f87171"
                      : "var(--text-primary)",
                  }}
                >
                  {credit ? `+${formatEuro(amount)}` : amount < 0 ? `−${formatEuro(Math.abs(amount))}` : formatEuro(amount)}
                </span>
              </div>
            ))}

            <div className="flex justify-between items-center pt-3">
              <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                Take-home pay
              </span>
              <span
                className="text-lg font-bold font-mono"
                style={{ color: "var(--accent-green-light)" }}
              >
                {formatEuro(result.net)}
              </span>
            </div>
          </div>
        </div>

        {/* Tax bands breakdown toggle */}
        <button
          className="w-full flex items-center justify-between px-5 py-3 rounded-xl text-sm transition-colors"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
          }}
          onClick={() => setShowBands(!showBands)}
        >
          <span>View detailed band breakdown</span>
          {showBands ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showBands && (
          <div
            className="rounded-2xl p-5"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <p className="text-xs font-medium uppercase tracking-wide mb-4" style={{ color: "var(--text-muted)" }}>
              Income tax bands
            </p>
            {result.itBands.map((b, i) => (
              <BandBar
                key={i}
                label={`${b.label} on ${formatEuro(b.income)}`}
                amount={b.amount}
                pct={(b.amount / result.gross) * 100}
                color="#3b82f6"
              />
            ))}

            <p className="text-xs font-medium uppercase tracking-wide mb-4 mt-5" style={{ color: "var(--text-muted)" }}>
              USC bands
            </p>
            {result.uscBands.length === 0 ? (
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Exempt — income under €13,000
              </p>
            ) : (
              result.uscBands.map((b, i) => (
                <BandBar
                  key={i}
                  label={`${b.rate}% on ${formatEuro(b.income)}`}
                  amount={b.amount}
                  pct={(b.amount / result.gross) * 100}
                  color="var(--accent-orange)"
                />
              ))
            )}
          </div>
        )}

        {/* Disclaimer */}
        <div
          className="flex gap-2.5 rounded-xl p-3"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}
        >
          <Info size={14} className="shrink-0 mt-0.5" style={{ color: "var(--text-muted)" }} />
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Estimates only. Standard credits applied. Medical expenses, mortgage interest, and
            flat-rate reliefs are not included. PRSI rises to 4.35% from 1 Oct 2026. Verify with{" "}
            <a
              href="https://www.revenue.ie"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80"
            >
              Revenue.ie
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
