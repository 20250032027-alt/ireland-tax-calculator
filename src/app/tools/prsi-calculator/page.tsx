"use client";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { calcPRSI } from "@/lib/taxEngine";
import { formatEuro } from "@/lib/format";
import { Info } from "lucide-react";

const PRSI_CLASSES = [
  { label: "Class A — Employees", rate: 4.2, desc: "Most private sector & public sector employees" },
  { label: "Class S — Self-employed", rate: 4.0, desc: "Self-employed individuals, directors" },
  { label: "Class K — Officeholders", rate: 4.0, desc: "Officeholders, unearned income" },
];

export default function PRSICalculatorPage() {
  const [income, setIncome] = useState("45000");
  const [prsiClass, setPrsiClass] = useState(0);

  const gross = parseFloat(income) || 0;
  const weeklyThreshold = 352 * 52;
  const exempt = gross <= weeklyThreshold;

  const prsi = useMemo(() => {
    if (exempt) return 0;
    return gross * (PRSI_CLASSES[prsiClass].rate / 100);
  }, [gross, prsiClass, exempt]);

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.25)", color: "#60a5fa" }}>
            Income Tax
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "#f0f4ff" }}>
            PRSI Calculator 2026
          </h1>
          <p className="text-base" style={{ color: "#8899bb" }}>
            Calculate your Pay Related Social Insurance contribution. PRSI funds the Social Insurance Fund, entitling you to the State pension and other benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6" style={{ background: "#111d35", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 className="text-sm font-semibold mb-5" style={{ color: "#f0f4ff" }}>Your details</h2>

            <div className="mb-4">
              <label className="block text-sm mb-1.5" style={{ color: "#8899bb" }}>Annual gross income</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8899bb" }}>€</span>
                <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} className="pl-7" placeholder="45000" min="0" />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2" style={{ color: "#8899bb" }}>PRSI class</label>
              <div className="space-y-2">
                {PRSI_CLASSES.map((c, i) => (
                  <button key={i} onClick={() => setPrsiClass(i)} className="w-full text-left rounded-xl p-3 transition-all" style={{ background: prsiClass === i ? "rgba(0,168,107,0.1)" : "#0f1f3d", border: `1px solid ${prsiClass === i ? "rgba(0,168,107,0.3)" : "rgba(255,255,255,0.06)"}` }}>
                    <p className="text-sm font-medium" style={{ color: "#f0f4ff" }}>{c.label} <span className="font-mono" style={{ color: "#00d084" }}>{c.rate}%</span></p>
                    <p className="text-xs mt-0.5" style={{ color: "#8899bb" }}>{c.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-3 text-xs" style={{ background: "#0f1f3d", border: "1px solid rgba(255,255,255,0.06)", color: "#8899bb" }}>
              Weekly threshold: €352 (€18,304/yr) — exempt below this
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl p-6" style={{ background: exempt ? "rgba(0,168,107,0.08)" : "#111d35", border: `1px solid ${exempt ? "rgba(0,168,107,0.25)" : "rgba(255,255,255,0.06)"}` }}>
              <p className="text-xs mb-1" style={{ color: "#8899bb" }}>Annual PRSI</p>
              <p className="text-4xl font-bold mb-1" style={{ color: exempt ? "#00d084" : "#f0f4ff" }}>
                {exempt ? "Exempt" : formatEuro(prsi)}
              </p>
              {!exempt && gross > 0 && (
                <>
                  <p className="text-sm" style={{ color: "#8899bb" }}>{PRSI_CLASSES[prsiClass].rate}% of gross income</p>
                  <div className="mt-4 pt-4 border-t space-y-2" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    <div className="flex justify-between">
                      <span className="text-xs" style={{ color: "#8899bb" }}>Monthly</span>
                      <span className="text-xs font-mono font-medium" style={{ color: "#f0f4ff" }}>−{formatEuro(prsi / 12)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs" style={{ color: "#8899bb" }}>Weekly</span>
                      <span className="text-xs font-mono font-medium" style={{ color: "#f0f4ff" }}>−{formatEuro(prsi / 52)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="rounded-2xl p-5" style={{ background: "#111d35", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "#4a5980" }}>PRSI rate changes 2026</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#8899bb" }}>Jan – Sep 2026</span>
                  <span className="font-mono" style={{ color: "#f0f4ff" }}>4.2%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#8899bb" }}>Oct – Dec 2026</span>
                  <span className="font-mono" style={{ color: "#fbbf24" }}>4.35%</span>
                </div>
              </div>
              <p className="text-xs mt-3" style={{ color: "#4a5980" }}>This calculator uses 4.2%. Blended annual rate may differ slightly.</p>
            </div>

            <div className="flex gap-2.5 rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <Info size={14} className="shrink-0 mt-0.5" style={{ color: "#4a5980" }} />
              <p className="text-xs leading-relaxed" style={{ color: "#4a5980" }}>
                PRSI entitles you to the Contributory State Pension, Jobseeker&apos;s Benefit, and other social welfare payments. Verify with <a href="https://www.revenue.ie" target="_blank" rel="noopener noreferrer" className="underline">Revenue.ie</a>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
