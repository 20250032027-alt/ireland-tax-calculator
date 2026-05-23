"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatEuro } from "@/lib/format";
import { CheckCircle, XCircle } from "lucide-react";

const ALL_CREDITS = [
  {
    category: "Universal",
    credits: [
      { name: "Personal Tax Credit", amount: 2000, who: "Everyone", desc: "The basic personal tax credit available to all taxpayers in Ireland. Applied against your income tax bill." },
      { name: "Employee (PAYE) Tax Credit", amount: 2000, who: "PAYE employees", desc: "Available to employees taxed under the PAYE system. Equivalent to the Earned Income Credit for the self-employed." },
      { name: "Earned Income Tax Credit", amount: 2000, who: "Self-employed", desc: "Available to self-employed individuals and proprietary directors who are not eligible for the PAYE credit." },
    ],
  },
  {
    category: "Family & Relationship",
    credits: [
      { name: "Married Person / Civil Partner Credit", amount: 2000, who: "Married couples & civil partners", desc: "Additional personal credit for the spouse or civil partner. Both partners receive the Personal Tax Credit." },
      { name: "Single Person Child Carer Credit (SPCCC)", amount: 1900, who: "Qualifying single parents", desc: "For the primary carer of a qualifying child. Cannot be claimed alongside the Married credit. One parent can relinquish to the other." },
      { name: "Home Carer Tax Credit", amount: 1950, who: "Married — one spouse cares at home", desc: "Where one spouse cares for a child, incapacitated person, or person aged 65+. Subject to an income limit on the carer's income." },
      { name: "Widowed Person / Surviving Civil Partner Credit", amount: 2190, who: "Widowed without dependent children", desc: "For the year of bereavement and subsequent years. A higher amount applies in the year of bereavement." },
    ],
  },
  {
    category: "Housing",
    credits: [
      { name: "Rent Tax Credit", amount: 1000, who: "Private renters (single)", desc: "€1,000 for a single person, €2,000 for a jointly-assessed couple, renting in the private market. Claimed via myAccount." },
      { name: "Rent Tax Credit (married)", amount: 2000, who: "Private renters (married)", desc: "€2,000 for jointly-assessed married couples renting in the private market." },
    ],
  },
  {
    category: "Age & Incapacity",
    credits: [
      { name: "Age Tax Credit", amount: 245, who: "Aged 65 or over", desc: "An additional credit for individuals (and spouses) aged 65 or older. €490 for a jointly-assessed couple." },
      { name: "Blind Person's Tax Credit", amount: 1650, who: "Blind or visually impaired", desc: "€1,650 where one spouse is blind, €3,300 where both spouses are blind." },
      { name: "Incapacitated Child Credit", amount: 3300, who: "Parent of an incapacitated child", desc: "For parents or guardians of a child who is permanently incapacitated, physically or mentally." },
      { name: "Dependent Relative Credit", amount: 245, who: "Supporting a dependent relative", desc: "Where you maintain a relative who is unable to maintain themselves. Subject to income limits." },
    ],
  },
];

const INCOME_RELIEFS = [
  { name: "Pension contributions", detail: "Full tax relief at your marginal rate (20% or 40%) up to age-related percentage limits of gross income." },
  { name: "Medical expenses", detail: "20% relief on qualifying medical and dental expenses not covered by insurance. Claimed via myAccount." },
  { name: "Flat-rate expenses", detail: "Certain professions qualify for flat-rate deductions against employment income. Listed on Revenue.ie." },
  { name: "Remote working relief", detail: "€3.20 per day worked from home is tax-free from your employer, or you can claim 30% of heating & electricity costs." },
  { name: "Tuition fees", detail: "20% relief on qualifying third-level tuition fees above €3,000 (single course) or €1,500 (part-time)." },
];

export default function TaxCreditsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const categories = ["All", ...ALL_CREDITS.map((c) => c.category)];

  const filtered =
    activeCategory === "All"
      ? ALL_CREDITS
      : ALL_CREDITS.filter((c) => c.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <div
            className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full mb-4"
            style={{
              background: "rgba(245,158,11,0.12)",
              border: "1px solid rgba(245,158,11,0.25)",
              color: "#fbbf24",
            }}
          >
            Other
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "#f0f4ff" }}>
            Irish Tax Credits 2026
          </h1>
          <p className="text-base max-w-2xl" style={{ color: "#8899bb" }}>
            A complete guide to every Irish tax credit available in 2026. Unlike the UK personal
            allowance, Irish tax credits directly reduce your tax bill — not your taxable income.
          </p>
        </div>

        {/* Explainer box */}
        <div
          className="rounded-2xl p-6 mb-10"
          style={{
            background: "rgba(0,168,107,0.06)",
            border: "1px solid rgba(0,168,107,0.18)",
          }}
        >
          <h2 className="text-sm font-semibold mb-2" style={{ color: "#f0f4ff" }}>
            How tax credits work in Ireland
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "#8899bb" }}>
            Ireland&apos;s system is different from the UK. You first calculate your gross tax on all
            income, then subtract your tax credits from that figure. A credit of €2,000 reduces your
            tax bill by €2,000 — regardless of whether you are a standard or higher rate taxpayer. This
            makes credits more valuable in absolute terms than deductions or allowances.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Standard rate taxpayer saves", value: "€2,000", sub: "on Personal Credit" },
              { label: "Higher rate taxpayer saves", value: "€2,000", sub: "on Personal Credit (same!)" },
              { label: "Most employees get", value: "€4,000+", sub: "in credits total" },
            ].map(({ label, value, sub }) => (
              <div
                key={label}
                className="rounded-xl p-3"
                style={{ background: "#111d35", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <p className="text-xs mb-1" style={{ color: "#8899bb" }}>
                  {label}
                </p>
                <p className="text-xl font-bold" style={{ color: "#00d084" }}>
                  {value}
                </p>
                <p className="text-xs" style={{ color: "#4a5980" }}>
                  {sub}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: activeCategory === cat ? "#00a86b" : "#111d35",
                color: activeCategory === cat ? "#fff" : "#8899bb",
                border: `1px solid ${activeCategory === cat ? "transparent" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Credit cards */}
        {filtered.map(({ category, credits }) => (
          <div key={category} className="mb-10">
            <h2 className="text-base font-semibold mb-4" style={{ color: "#f0f4ff" }}>
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {credits.map(({ name, amount, who, desc }) => (
                <div
                  key={name}
                  className="rounded-2xl p-5"
                  style={{ background: "#111d35", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-sm font-semibold pr-4" style={{ color: "#f0f4ff" }}>
                      {name}
                    </h3>
                    <span
                      className="text-base font-bold font-mono shrink-0"
                      style={{ color: "#00d084" }}
                    >
                      {formatEuro(amount)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <CheckCircle size={12} style={{ color: "#00a86b" }} />
                    <span className="text-xs" style={{ color: "#8899bb" }}>
                      {who}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "#4a5980" }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Income reliefs section */}
        {(activeCategory === "All") && (
          <div className="mb-10">
            <h2 className="text-base font-semibold mb-2" style={{ color: "#f0f4ff" }}>
              Tax reliefs (reduce taxable income)
            </h2>
            <p className="text-sm mb-4" style={{ color: "#8899bb" }}>
              Unlike credits, reliefs reduce your taxable income. At 40% marginal rate, a €1,000
              relief saves you €400 in tax; at 20% it saves €200.
            </p>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
              {INCOME_RELIEFS.map(({ name, detail }, i) => (
                <div
                  key={name}
                  className="px-5 py-4 border-b"
                  style={{
                    borderColor: "rgba(255,255,255,0.06)",
                    background: i % 2 === 0 ? "#111d35" : "#0f1f3d",
                  }}
                >
                  <p className="text-sm font-medium mb-1" style={{ color: "#f0f4ff" }}>
                    {name}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "#8899bb" }}>
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Not included notice */}
        <div
          className="rounded-2xl p-5 flex gap-3"
          style={{ background: "#111d35", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <XCircle size={16} className="shrink-0 mt-0.5" style={{ color: "#f87171" }} />
          <div>
            <p className="text-sm font-medium mb-1" style={{ color: "#f0f4ff" }}>
              Not included in our calculator
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#8899bb" }}>
              Medical expenses relief, flat-rate expenses, remote working relief, and tuition fees
              require individual claims via{" "}
              <a
                href="https://www.revenue.ie/en/online-services/services/paye-services/myaccount.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                myAccount on Revenue.ie
              </a>
              . These vary significantly between individuals and cannot be calculated generically.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
