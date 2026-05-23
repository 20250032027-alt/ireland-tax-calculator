"use client";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatEuro } from "@/lib/format";
import { Info } from "lucide-react";

const ASSET_TYPES = [
  { label: "Shares / ETFs", rate: 0.33 },
  { label: "Property (Irish)", rate: 0.33 },
  { label: "Cryptocurrency", rate: 0.33 },
  { label: "Other assets", rate: 0.33 },
];

// Special 40% rate for certain funds (ETFs subject to 41% Exit Tax — note separately)
const ANNUAL_EXEMPTION = 1270;

export default function CGTCalculatorPage() {
  const [proceeds, setProceeds] = useState("50000");
  const [costBasis, setCostBasis] = useState("30000");
  const [expenses, setExpenses] = useState("500");
  const [assetType, setAssetType] = useState(0);
  const [isETF, setIsETF] = useState(false);

  const result = useMemo(() => {
    const p = parseFloat(proceeds) || 0;
    const c = parseFloat(costBasis) || 0;
    const e = parseFloat(expenses) || 0;
    const gain = Math.max(0, p - c - e);
    const afterExemption = Math.max(0, gain - ANNUAL_EXEMPTION);
    const rate = isETF ? 0.41 : ASSET_TYPES[assetType].rate;
    const tax = afterExemption * rate;
    const netProceeds = p - c - e - tax;
    return { gain, afterExemption, tax, rate, netProceeds, p, c, e };
  }, [proceeds, costBasis, expenses, assetType, isETF]);

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.25)", color: "#c084fc" }}>
            Investment Tax
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "#f0f4ff" }}>
            Capital Gains Tax Calculator 2026
          </h1>
          <p className="text-base" style={{ color: "#8899bb" }}>
            Calculate Irish CGT at 33% on gains from property, shares, and crypto. Includes the €1,270 annual exemption. ETF Exit Tax (41%) also supported.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="rounded-2xl p-6" style={{ background: "#111d35", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 className="text-sm font-semibold mb-5" style={{ color: "#f0f4ff" }}>Asset details</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#8899bb" }}>Asset type</label>
                <select value={assetType} onChange={(e) => setAssetType(Number(e.target.value))} disabled={isETF}>
                  {ASSET_TYPES.map((a, i) => <option key={i} value={i}>{a.label}</option>)}
                </select>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={isETF} onChange={(e) => setIsETF(e.target.checked)} />
                <div>
                  <span className="text-sm" style={{ color: "#f0f4ff" }}>ETF / Investment fund (Exit Tax)</span>
                  <span className="block text-xs" style={{ color: "#4a5980" }}>Irish-domiciled funds subject to 41% Exit Tax</span>
                </div>
              </label>

              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#8899bb" }}>Sale proceeds</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8899bb" }}>€</span>
                  <input type="number" value={proceeds} onChange={(e) => setProceeds(e.target.value)} className="pl-7" placeholder="50000" min="0" />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#8899bb" }}>Original cost (inc. purchase costs)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8899bb" }}>€</span>
                  <input type="number" value={costBasis} onChange={(e) => setCostBasis(e.target.value)} className="pl-7" placeholder="30000" min="0" />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#8899bb" }}>Allowable expenses (solicitor, agent fees)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8899bb" }}>€</span>
                  <input type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} className="pl-7" placeholder="500" min="0" />
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="rounded-2xl p-6" style={{ background: "#111d35", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-xs mb-1" style={{ color: "#8899bb" }}>CGT payable</p>
              <p className="text-4xl font-bold mb-1" style={{ color: result.tax === 0 ? "#00d084" : "#f0f4ff" }}>
                {formatEuro(result.tax)}
              </p>
              <p className="text-sm" style={{ color: "#8899bb" }}>
                at {(result.rate * 100).toFixed(0)}% on {formatEuro(result.afterExemption)} chargeable gain
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden" style={{ background: "#111d35", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="px-5 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <p className="text-sm font-semibold" style={{ color: "#f0f4ff" }}>Breakdown</p>
              </div>
              {[
                { label: "Sale proceeds", amount: result.p, neutral: true },
                { label: "Less: cost basis", amount: -result.c },
                { label: "Less: allowable expenses", amount: -result.e },
                { label: "Gross gain", amount: result.gain, neutral: true },
                { label: `Less: annual exemption`, amount: -Math.min(result.gain, ANNUAL_EXEMPTION), credit: true },
                { label: "Chargeable gain", amount: result.afterExemption, neutral: true },
                { label: `CGT at ${(result.rate * 100).toFixed(0)}%`, amount: -result.tax },
              ].map(({ label, amount, neutral, credit }, i) => (
                <div key={i} className="flex justify-between px-5 py-2.5 border-b text-sm" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <span style={{ color: "#8899bb" }}>{label}</span>
                  <span className="font-mono font-medium" style={{ color: neutral ? "#f0f4ff" : credit ? "#00d084" : amount < 0 ? "#f87171" : "#f0f4ff" }}>
                    {amount < 0 ? `−${formatEuro(Math.abs(amount))}` : formatEuro(amount)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between px-5 py-3" style={{ background: "#0f1f3d" }}>
                <span className="text-sm font-semibold" style={{ color: "#f0f4ff" }}>Net after CGT</span>
                <span className="text-sm font-bold font-mono" style={{ color: "#00d084" }}>{formatEuro(result.netProceeds)}</span>
              </div>
            </div>

            <div className="flex gap-2.5 rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <Info size={14} className="shrink-0 mt-0.5" style={{ color: "#4a5980" }} />
              <p className="text-xs leading-relaxed" style={{ color: "#4a5980" }}>
                Principal Private Residence (PPR) relief may reduce or eliminate CGT on your main home. Indexation relief may apply to assets acquired before 2003. CGT returns are due by 31 October. Verify with <a href="https://www.revenue.ie" target="_blank" rel="noopener noreferrer" className="underline">Revenue.ie</a>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
