"use client";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { calculate } from "@/lib/taxEngine";
import { formatEuro } from "@/lib/format";
import type { FilingStatus } from "@/lib/taxEngine";
import { Info } from "lucide-react";

// Binary search to find gross that yields target net
function findGross(targetNet: number, status: FilingStatus): number {
  let lo = targetNet;
  let hi = targetNet * 3;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    const result = calculate({ grossSalary: mid, frequency: "year", status, pensionPct: 0, rentCredit: false, homeCarerCredit: false, selfEmployed: false });
    if (result.net < targetNet) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

export default function GrossSalaryCalculatorPage() {
  const [targetNet, setTargetNet] = useState("35000");
  const [status, setStatus] = useState<FilingStatus>("single");

  const gross = useMemo(() => {
    const net = parseFloat(targetNet) || 0;
    if (net <= 0) return 0;
    return findGross(net, status);
  }, [targetNet, status]);

  const result = useMemo(() => {
    if (gross <= 0) return null;
    return calculate({ grossSalary: gross, frequency: "year", status, pensionPct: 0, rentCredit: false, homeCarerCredit: false, selfEmployed: false });
  }, [gross, status]);

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(0,168,107,0.12)", border: "1px solid rgba(0,168,107,0.25)", color: "#00d084" }}>
            Income Tax
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "#f0f4ff" }}>
            Gross Salary Calculator 2026
          </h1>
          <p className="text-base" style={{ color: "#8899bb" }}>
            Work backwards from your desired take-home pay. Enter the net salary you want to earn and we&apos;ll calculate the gross you need to negotiate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6" style={{ background: "#111d35", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 className="text-sm font-semibold mb-5" style={{ color: "#f0f4ff" }}>Desired take-home</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#8899bb" }}>Target net annual salary</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8899bb" }}>€</span>
                  <input type="number" value={targetNet} onChange={(e) => setTargetNet(e.target.value)} className="pl-7" placeholder="35000" min="0" />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#8899bb" }}>Filing status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value as FilingStatus)}>
                  <option value="single">Single</option>
                  <option value="married1">Married — one income</option>
                  <option value="married2">Married — two incomes</option>
                  <option value="spccc">Single parent</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {result && gross > 0 && (
              <>
                <div className="rounded-2xl p-6" style={{ background: "rgba(0,168,107,0.08)", border: "1px solid rgba(0,168,107,0.25)" }}>
                  <p className="text-xs mb-1" style={{ color: "#8899bb" }}>Gross salary required</p>
                  <p className="text-4xl font-bold" style={{ color: "#00d084" }}>{formatEuro(gross)}</p>
                  <p className="text-sm mt-1" style={{ color: "#8899bb" }}>{formatEuro(gross / 12)} per month gross</p>
                </div>

                <div className="rounded-2xl overflow-hidden" style={{ background: "#111d35", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="px-5 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    <p className="text-sm font-semibold" style={{ color: "#f0f4ff" }}>Deductions at that salary</p>
                  </div>
                  {[
                    { label: "Income tax (PAYE)", amount: result.incomeTax, color: "#f87171" },
                    { label: "USC", amount: result.usc, color: "#fb923c" },
                    { label: "PRSI", amount: result.prsi, color: "#fbbf24" },
                  ].map(({ label, amount, color }) => (
                    <div key={label} className="flex justify-between px-5 py-2.5 border-b text-sm" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                      <span style={{ color: "#8899bb" }}>{label}</span>
                      <span className="font-mono font-medium" style={{ color }}>−{formatEuro(amount)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between px-5 py-3" style={{ background: "#0f1f3d" }}>
                    <span className="text-sm font-semibold" style={{ color: "#f0f4ff" }}>Take-home</span>
                    <span className="text-sm font-bold font-mono" style={{ color: "#00d084" }}>{formatEuro(result.net)}</span>
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-2.5 rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <Info size={14} className="shrink-0 mt-0.5" style={{ color: "#4a5980" }} />
              <p className="text-xs leading-relaxed" style={{ color: "#4a5980" }}>
                Standard credits only (Personal + PAYE). No pension, rent credit, or other reliefs included. Use the Salary Calculator for a full breakdown.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
