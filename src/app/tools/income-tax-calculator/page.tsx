"use client";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { calcIncomeTax, getCredits, getStandardBand } from "@/lib/taxEngine";
import { formatEuro } from "@/lib/format";
import type { FilingStatus } from "@/lib/taxEngine";

export default function IncomeTaxCalculatorPage() {
  const [income, setIncome] = useState("45000");
  const [status, setStatus] = useState<FilingStatus>("single");

  const gross = parseFloat(income) || 0;
  const credits = getCredits(status, false, false, false);
  const band = getStandardBand(status);
  const { tax, bands } = useMemo(() => calcIncomeTax(gross, status, credits), [gross, status, credits]);

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.25)", color: "#60a5fa" }}>
            Income Tax
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "#f0f4ff" }}>
            Irish Income Tax Calculator 2026
          </h1>
          <p className="text-base" style={{ color: "#8899bb" }}>
            Estimate your PAYE income tax across the 20% standard rate and 40% higher rate bands. Includes tax credits for 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6" style={{ background: "#111d35", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 className="text-sm font-semibold mb-5" style={{ color: "#f0f4ff" }}>Your income</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#8899bb" }}>Annual taxable income</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8899bb" }}>€</span>
                  <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} className="pl-7" placeholder="45000" min="0" />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#8899bb" }}>Filing status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value as FilingStatus)}>
                  <option value="single">Single</option>
                  <option value="married1">Married — one income</option>
                  <option value="married2">Married — two incomes</option>
                  <option value="spccc">Single parent (SPCCC)</option>
                </select>
              </div>

              <div className="rounded-xl p-4" style={{ background: "#0f1f3d", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "#4a5980" }}>Standard rate band</p>
                <p className="text-sm" style={{ color: "#8899bb" }}>
                  Your 20% band: <span className="font-mono font-semibold" style={{ color: "#00d084" }}>{formatEuro(band)}</span>
                </p>
                <p className="text-xs mt-1" style={{ color: "#4a5980" }}>Income above this is taxed at 40%</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl p-6" style={{ background: "#111d35", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-xs mb-1" style={{ color: "#8899bb" }}>Income tax payable</p>
              <p className="text-4xl font-bold" style={{ color: "#f0f4ff" }}>{formatEuro(tax)}</p>
              {gross > 0 && <p className="text-sm mt-1" style={{ color: "#8899bb" }}>{((tax / gross) * 100).toFixed(1)}% of income</p>}
            </div>

            <div className="rounded-2xl overflow-hidden" style={{ background: "#111d35", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="px-5 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <p className="text-sm font-semibold" style={{ color: "#f0f4ff" }}>Tax calculation</p>
              </div>
              {bands.map((b, i) => (
                <div key={i} className="flex justify-between px-5 py-2.5 border-b text-sm" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <span style={{ color: "#8899bb" }}>{b.label} on {formatEuro(b.income)}</span>
                  <span className="font-mono" style={{ color: "#f87171" }}>−{formatEuro(b.amount)}</span>
                </div>
              ))}
              <div className="flex justify-between px-5 py-2.5 border-b text-sm" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <span style={{ color: "#8899bb" }}>Gross tax</span>
                <span className="font-mono font-medium" style={{ color: "#f0f4ff" }}>{formatEuro(bands.reduce((a, b) => a + b.amount, 0))}</span>
              </div>
              <div className="flex justify-between px-5 py-2.5 border-b text-sm" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <span style={{ color: "#8899bb" }}>Less: tax credits</span>
                <span className="font-mono" style={{ color: "#00d084" }}>+{formatEuro(credits)}</span>
              </div>
              <div className="flex justify-between px-5 py-3" style={{ background: "#0f1f3d" }}>
                <span className="text-sm font-semibold" style={{ color: "#f0f4ff" }}>Tax payable</span>
                <span className="text-sm font-bold font-mono" style={{ color: "#f87171" }}>−{formatEuro(tax)}</span>
              </div>
            </div>

            <div className="rounded-2xl p-4" style={{ background: "#111d35", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "#4a5980" }}>Credits applied</p>
              {[
                { label: "Personal Tax Credit", amount: 2000 },
                { label: "PAYE / Employee Credit", amount: 2000 },
                ...(status === "married1" || status === "married2" ? [{ label: "Spouse Personal Credit", amount: 2000 }] : []),
                ...(status === "spccc" ? [{ label: "Single Person Child Carer Credit", amount: 1900 }] : []),
              ].map(({ label, amount }) => (
                <div key={label} className="flex justify-between text-xs py-1.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ color: "#8899bb" }}>{label}</span>
                  <span className="font-mono" style={{ color: "#00d084" }}>+{formatEuro(amount)}</span>
                </div>
              ))}
              <div className="flex justify-between text-xs pt-2">
                <span className="font-medium" style={{ color: "#f0f4ff" }}>Total credits</span>
                <span className="font-mono font-bold" style={{ color: "#00d084" }}>+{formatEuro(credits)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
