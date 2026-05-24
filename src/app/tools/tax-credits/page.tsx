"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatEuro } from "@/lib/format";
import { CheckCircle, XCircle } from "lucide-react";

const wrap: React.CSSProperties = { maxWidth: 1240, margin: "0 auto", padding: "48px 24px" };

const ALL_CREDITS = [
  {
    category: "Universal",
    credits: [
      { name: "Personal Tax Credit", amount: 2000, who: "Everyone", desc: "The basic personal tax credit available to all Irish taxpayers. Applied automatically against your income tax bill." },
      { name: "Employee (PAYE) Tax Credit", amount: 2000, who: "PAYE employees", desc: "Available to employees taxed under the PAYE system. Equivalent to the Earned Income Credit for self-employed." },
      { name: "Earned Income Tax Credit", amount: 2000, who: "Self-employed", desc: "For self-employed individuals and proprietary directors not eligible for the PAYE credit." },
    ],
  },
  {
    category: "Family",
    credits: [
      { name: "Married Person / Civil Partner Credit", amount: 2000, who: "Married couples & civil partners", desc: "Additional personal credit for the spouse or civil partner. Both partners receive the Personal Tax Credit." },
      { name: "Single Person Child Carer Credit", amount: 1900, who: "Qualifying single parents", desc: "For the primary carer of a qualifying child. Cannot be claimed alongside the Married credit." },
      { name: "Home Carer Tax Credit", amount: 1950, who: "Married — one spouse cares at home", desc: "Where one spouse cares for a child, incapacitated person, or person aged 65+. Subject to income limits on the carer." },
      { name: "Widowed Person / Surviving Civil Partner Credit", amount: 2190, who: "Widowed without dependent children", desc: "For the year of bereavement and subsequent years. Higher amount applies in the year of bereavement itself." },
    ],
  },
  {
    category: "Housing",
    credits: [
      { name: "Rent Tax Credit (single)", amount: 1000, who: "Private renters — single", desc: "€1,000 per year for single renters in the private market. Claimed via myAccount. Must be actively claimed." },
      { name: "Rent Tax Credit (married)", amount: 2000, who: "Private renters — married", desc: "€2,000 for jointly-assessed married couples renting privately. Claimed via myAccount each year." },
    ],
  },
  {
    category: "Age & Disability",
    credits: [
      { name: "Age Tax Credit", amount: 245, who: "Aged 65 or over", desc: "An additional credit for individuals (and spouses) aged 65 or older. €490 for a jointly-assessed couple." },
      { name: "Blind Person's Tax Credit", amount: 1650, who: "Blind or visually impaired", desc: "€1,650 where one spouse is blind, €3,300 where both spouses are blind." },
      { name: "Incapacitated Child Credit", amount: 3300, who: "Parent of an incapacitated child", desc: "For parents or guardians of a child who is permanently incapacitated, physically or mentally." },
      { name: "Dependent Relative Credit", amount: 245, who: "Supporting a dependent relative", desc: "Where you maintain a relative unable to maintain themselves. Subject to income limits." },
    ],
  },
];

const RELIEFS = [
  { name: "Pension contributions", detail: "Full relief at your marginal rate (20% or 40%) up to age-related percentage limits of gross income." },
  { name: "Medical expenses", detail: "20% relief on qualifying medical and dental expenses not covered by insurance. Claimed via myAccount at year end." },
  { name: "Flat-rate expenses", detail: "Certain professions qualify for flat-rate deductions against employment income. Full list on Revenue.ie." },
  { name: "Remote working", detail: "€3.20 per day worked from home is tax-free from your employer, or claim 30% of heating and electricity costs." },
  { name: "Tuition fees", detail: "20% relief on qualifying third-level tuition fees above €3,000 (single course) or €1,500 (part-time)." },
];

const CATS = ["All", ...ALL_CREDITS.map(c => c.category)];

export default function TaxCreditsPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? ALL_CREDITS : ALL_CREDITS.filter(c => c.category === active);

  return (
    <>
      <Navbar />
      <main style={wrap}>
        <div style={{ marginBottom: 40 }}>
          <span className="badge badge-neutral" style={{ marginBottom: 16 }}>Reference</span>
          <h1 style={{ marginBottom: 10 }}>Irish tax credits 2026</h1>
          <p style={{ fontSize: 15, color: "var(--text-1)", maxWidth: 560 }}>
            Every tax credit available in 2026. Unlike the UK personal allowance, Irish credits directly reduce your tax bill, not your taxable income.
          </p>
        </div>

        {/* How credits work — no card, divider style */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "var(--border-0)", border: "1px solid var(--border-0)", borderRadius: "var(--radius-xl)", overflow: "hidden", marginBottom: 48 }} className="features-grid">
          {[
            { label: "Standard rate taxpayer saves", value: "€2,000", sub: "on Personal Credit" },
            { label: "Higher rate taxpayer saves", value: "€2,000", sub: "same amount. That is the key difference" },
            { label: "Most PAYE workers get", value: "€4,000+", sub: "in combined credits" },
          ].map(({ label, value, sub }) => (
            <div key={label} style={{ background: "var(--bg-1)", padding: "28px 24px" }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 10 }}>{label}</p>
              <p className="num-hero" style={{ fontSize: 32, marginBottom: 4 }}>{value}</p>
              <p style={{ fontSize: 12, color: "var(--text-2)" }}>{sub}</p>
            </div>
          ))}
        </div>

        {/* Category filter */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
          {CATS.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{
              padding: "7px 16px", borderRadius: 99, fontSize: 13, fontWeight: 500, cursor: "pointer",
              background: active === cat ? "var(--accent)" : "var(--bg-2)",
              color: active === cat ? "#fff" : "var(--text-1)",
              border: `1px solid ${active === cat ? "transparent" : "var(--border-0)"}`,
              transition: "all 0.15s",
            }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Credits */}
        {filtered.map(({ category, credits }) => (
          <div key={category} style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "var(--text-0)", marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid var(--border-0)" }}>{category}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }} className="calc-grid">
              {credits.map(({ name, amount, who, desc }) => (
                <div key={name} style={{ background: "var(--bg-2)", border: "1px solid var(--border-0)", borderRadius: "var(--radius-md)", padding: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-0)", lineHeight: 1.4 }}>{name}</p>
                    <span className="num-hero" style={{ fontSize: 20, flexShrink: 0 }}>{formatEuro(amount)}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <CheckCircle size={11} style={{ color: "var(--accent)", flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: "var(--text-2)" }}>{who}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--text-2)", lineHeight: 1.65 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Reliefs section */}
        {active === "All" && (
          <div style={{ marginTop: 16 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "var(--text-0)", marginBottom: 6 }}>Tax reliefs</p>
            <p style={{ fontSize: 13, color: "var(--text-1)", marginBottom: 20 }}>
              Reliefs reduce your taxable income, not your tax bill directly. At the 40% rate, a €1,000 relief saves €400; at 20%, it saves €200.
            </p>
            <div style={{ background: "var(--bg-2)", border: "1px solid var(--border-0)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
              {RELIEFS.map(({ name, detail }, i) => (
                <div key={name} style={{ padding: "16px 20px", borderBottom: i < RELIEFS.length - 1 ? "1px solid var(--border-0)" : "none" }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-0)", marginBottom: 4 }}>{name}</p>
                  <p style={{ fontSize: 12, color: "var(--text-1)", lineHeight: 1.65 }}>{detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Not included notice */}
        <div style={{ marginTop: 32, display: "flex", gap: 12, padding: 18, borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-0)" }}>
          <XCircle size={14} style={{ color: "#f87171", flexShrink: 0, marginTop: 1 }} />
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-0)", marginBottom: 4 }}>Not automatically included in our calculators</p>
            <p style={{ fontSize: 12, color: "var(--text-1)", lineHeight: 1.7 }}>
              Medical expenses, flat-rate expenses, remote working relief, and tuition fees require individual claims via{" "}
              <a href="https://www.revenue.ie/en/online-services/services/paye-services/myaccount.aspx" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-hi)", textDecoration: "underline" }}>myAccount on Revenue.ie</a>.
              These vary too much by individual to calculate generically.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
