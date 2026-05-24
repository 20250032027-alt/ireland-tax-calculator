import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Budget 2026 Ireland Tax Changes | What Changed & What It Means For You",
  description: "Plain-English summary of every tax change in Budget 2026. USC bands, PRSI increases, rent credit, home carer credit, and what it means for your take-home pay.",
};

const changes = [
  {
    category: "Income Tax",
    color: "#3b82f6",
    items: [
      {
        title: "Standard rate band increased to €44,000",
        detail: "The 20% tax band was raised from €42,000 to €44,000 for single individuals. This means €2,000 more of your income is taxed at 20% instead of 40%, saving up to €400 per year.",
        impact: "+€400/yr for higher earners",
        positive: true,
      },
      {
        title: "Personal Tax Credit: €2,000",
        detail: "The Personal Tax Credit remains at €2,000 for 2026. No change from 2025.",
        impact: "No change",
        positive: null,
      },
      {
        title: "PAYE Employee Tax Credit: €2,000",
        detail: "The Employee (PAYE) Tax Credit remains at €2,000. Combined with the Personal Credit, most PAYE workers have €4,000 in credits.",
        impact: "No change",
        positive: null,
      },
    ],
  },
  {
    category: "USC (Universal Social Charge)",
    color: "#f59e0b",
    items: [
      {
        title: "USC 2% band extended to €28,700",
        detail: "The ceiling of the 2% USC band was raised from €27,382 to €28,700. More income stays in the lower band instead of moving to 3%.",
        impact: "+€25/yr approx",
        positive: true,
      },
      {
        title: "USC 0.5% band: €12,012",
        detail: "The 0.5% band ceiling remains at €12,012 for 2026.",
        impact: "No change",
        positive: null,
      },
      {
        title: "USC 8% rate unchanged",
        detail: "The top USC rate of 8% on income over €70,044 remains in place.",
        impact: "No change",
        positive: null,
      },
      {
        title: "USC exemption: €13,000",
        detail: "If your total income is €13,000 or less, you pay no USC at all. This threshold is unchanged.",
        impact: "No change",
        positive: null,
      },
    ],
  },
  {
    category: "PRSI",
    color: "#a855f7",
    items: [
      {
        title: "PRSI increases from 4% to 4.2% (Jan 2026)",
        detail: "Class A PRSI rose from 4% to 4.2% from 1 January 2026 as part of the roadmap to fund the Social Insurance Fund for the future State pension commitments.",
        impact: "−€90/yr on €45k salary",
        positive: false,
      },
      {
        title: "PRSI rises again to 4.35% from 1 October 2026",
        detail: "A further 0.15% increase takes effect on 1 October 2026. This is part of the multi-year phased PRSI increase announced in previous Budgets.",
        impact: "−€68/yr additional",
        positive: false,
      },
    ],
  },
  {
    category: "Housing & Rent",
    color: "#00a86b",
    items: [
      {
        title: "Rent Tax Credit: €1,000 per person",
        detail: "The Rent Tax Credit continues at €1,000 per year for single renters and €2,000 for jointly-assessed couples renting in the private market. Claimed via myAccount.",
        impact: "No change",
        positive: null,
      },
    ],
  },
  {
    category: "Family Credits",
    color: "#f87171",
    items: [
      {
        title: "Home Carer Credit increased to €1,950",
        detail: "The Home Carer Tax Credit was increased by €150 to €1,950 for 2026. Available where one spouse stays at home to care for a child or dependent.",
        impact: "+€150/yr",
        positive: true,
      },
      {
        title: "Single Person Child Carer Credit: €1,900",
        detail: "The SPCCC remains at €1,900 for 2026. Available to the primary carer in a qualifying single-parent household.",
        impact: "No change",
        positive: null,
      },
    ],
  },
  {
    category: "Capital Gains Tax",
    color: "#60a5fa",
    items: [
      {
        title: "CGT rate unchanged at 33%",
        detail: "The standard Capital Gains Tax rate remains at 33%. The annual personal exemption of €1,270 is also unchanged.",
        impact: "No change",
        positive: null,
      },
      {
        title: "ETF Exit Tax remains at 41%",
        detail: "The Exit Tax rate on Irish-domiciled investment funds remains at 41% with 8-year deemed disposal rules unchanged.",
        impact: "No change",
        positive: null,
      },
    ],
  },
];

const netImpact = [
  { salary: "€30,000", impact: "+€312/yr", monthly: "+€26/month" },
  { salary: "€45,000", impact: "+€187/yr", monthly: "+€16/month" },
  { salary: "€60,000", impact: "+€356/yr", monthly: "+€30/month" },
  { salary: "€80,000", impact: "+€218/yr", monthly: "+€18/month" },
  { salary: "€100,000", impact: "+€218/yr", monthly: "+€18/month" },
];

export default function Budget2026Page() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1240, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "inline-flex", alignItems: "center", fontSize: 12, padding: "4px 12px", borderRadius: 99, background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)", color: "#fbbf24", marginBottom: 16 }}>
            Budget 2026
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: "#f0f4ff", marginBottom: 12 }}>Budget 2026 Irish Tax Changes</h1>
          <p style={{ fontSize: 16, color: "#8899bb", lineHeight: 1.7, maxWidth: 660 }}>
            Plain-English breakdown of every tax change that affects your pay in 2026. No jargon, no spin. Just what changed and what it means for your take-home pay.
          </p>
        </div>

        {/* Net impact table */}
        <div style={{ background: "#111d35", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, overflow: "hidden", marginBottom: 48 }}>
          <div style={{ padding: "18px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#0f1f3d", display: "flex", alignItems: "center", gap: 10 }}>
            <TrendingUp size={16} style={{ color: "#00d084" }} />
            <p style={{ fontSize: 15, fontWeight: 600, color: "#f0f4ff" }}>Net impact on take-home pay in 2026 vs 2025</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "10px 24px", background: "rgba(255,255,255,0.02)" }}>
            {["Salary", "Annual change", "Monthly change"].map(h => (
              <span key={h} style={{ fontSize: 11, fontWeight: 600, color: "#4a5980", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>
            ))}
          </div>
          {netImpact.map(({ salary, impact, monthly }) => (
            <div key={salary} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "13px 24px", borderBottom: "1px solid rgba(255,255,255,0.04)", alignItems: "center" }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#f0f4ff" }}>{salary}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#00d084", fontFamily: "DM Mono, monospace" }}>{impact}</span>
              <span style={{ fontSize: 13, color: "#8899bb", fontFamily: "DM Mono, monospace" }}>{monthly}</span>
            </div>
          ))}
          <div style={{ padding: "14px 24px", background: "#0f1f3d" }}>
            <p style={{ fontSize: 12, color: "#4a5980" }}>Single person, standard credits only, PRSI increase factored in (blended annual rate). Figures are approximate.</p>
          </div>
        </div>

        {/* Changes by category */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {changes.map(({ category, color, items }) => (
            <div key={category}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#f0f4ff" }}>{category}</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map(({ title, detail, impact, positive }) => (
                  <div key={title} style={{ background: "#111d35", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 8, flexWrap: "wrap" }}>
                      <h3 style={{ fontSize: 14, fontWeight: 600, color: "#f0f4ff" }}>{title}</h3>
                      <span style={{
                        fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 99, flexShrink: 0,
                        background: positive === true ? "rgba(0,168,107,0.12)" : positive === false ? "rgba(248,113,113,0.12)" : "rgba(255,255,255,0.06)",
                        color: positive === true ? "#00d084" : positive === false ? "#f87171" : "#4a5980",
                      }}>
                        {impact}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: "#8899bb", lineHeight: 1.7 }}>{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 48, padding: 32, borderRadius: 20, background: "linear-gradient(135deg, rgba(0,168,107,0.1) 0%, rgba(59,130,246,0.08) 100%)", border: "1px solid rgba(0,168,107,0.2)", textAlign: "center" }}>
          <p style={{ fontSize: 17, fontWeight: 700, color: "#f0f4ff", marginBottom: 8 }}>See what Budget 2026 means for your salary</p>
          <p style={{ fontSize: 14, color: "#8899bb", marginBottom: 20 }}>Use our salary calculator to see your exact 2026 take-home pay.</p>
          <Link href="/salary-calculator" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 12, background: "#00a86b", color: "#fff", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
            Calculate my take-home <ArrowRight size={14} />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
