import Link from "next/link";
import { ArrowRight, Shield, Zap, CheckCircle, Calculator, TrendingUp, Landmark, Coins } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import QuickCalculator from "@/components/QuickCalculator";
import { tools } from "@/lib/tools";

const allTools = tools.slice(0, 6);

const stats = [
  { value: "2026", label: "Tax year" },
  { value: "100%", label: "Free forever" },
  { value: "Revenue.ie", label: "Verified rates" },
  { value: "No reg.", label: "required" },
];

const features = [
  { icon: Shield, title: "Revenue.ie Verified", desc: "All rates, bands, and credits sourced from the Irish Revenue Commissioners. Updated for Budget 2026.", color: "#00a86b" },
  { icon: Zap, title: "Instant Results", desc: "Real-time calculations as you type. No page reloads — see your take-home pay update instantly.", color: "#f59e0b" },
  { icon: CheckCircle, title: "No Registration", desc: "Use every calculator free, forever. No account, no email required.", color: "#3b82f6" },
];

const faqs = [
  { q: "How is Irish income tax calculated?", a: "Ireland uses a two-rate system: 20% on income up to the standard rate band (€44,000 for single individuals in 2026) and 40% on income above that. Your tax credits are then subtracted from the gross tax figure to give your actual tax payable." },
  { q: "What is USC and do I have to pay it?", a: "USC (Universal Social Charge) is a separate charge from income tax. You are exempt if your total income is €13,000 or less. Above that, rates are 0.5%, 2%, 3%, and 8% across four bands." },
  { q: "What PRSI rate do I pay?", a: "Most employees pay Class A PRSI at 4.2% of gross earnings in 2026, rising to 4.35% from 1 October 2026. If your weekly earnings are €352 or less you are exempt from PRSI for that week." },
  { q: "What tax credits does everyone get?", a: "Every taxpayer gets the Personal Tax Credit (€2,000). PAYE workers also get the Employee Tax Credit (€2,000). These directly reduce your tax bill after it is calculated." },
  { q: "Does the calculator include pension contributions?", a: "Yes. Enter a pension contribution percentage and it will be deducted from your gross income before tax, USC, and PRSI are calculated — giving you the correct tax relief." },
];

const popularCards = [
  { label: "Salary Calculator", desc: "Take-home after PAYE, USC & PRSI", href: "/salary-calculator", Icon: TrendingUp, color: "#00a86b" },
  { label: "Income Tax", desc: "PAYE tax across all bands", href: "/tools/income-tax-calculator", Icon: Calculator, color: "#3b82f6" },
  { label: "USC Calculator", desc: "Universal Social Charge", href: "/tools/usc-calculator", Icon: Coins, color: "#f59e0b" },
  { label: "Capital Gains", desc: "33% CGT on assets", href: "/tools/cgt-calculator", Icon: Landmark, color: "#a855f7" },
];

const explainer = [
  { title: "Income Tax (PAYE)", body: "Ireland taxes income at two rates. The first €44,000 (single person) is taxed at 20%. Anything above is taxed at 40%. Married couples benefit from a wider standard rate band." },
  { title: "Universal Social Charge (USC)", body: "USC is charged on gross income before pension contributions. Four bands in 2026: 0.5%, 2%, 3%, and 8%. Fully exempt if total income is €13,000 or less." },
  { title: "PRSI", body: "Most employees pay Class A PRSI at 4.2% of gross pay. It funds the Social Insurance Fund, entitling you to the State pension and social welfare benefits." },
  { title: "Tax Credits", body: "Unlike the UK's personal allowance system, Ireland uses tax credits that directly reduce your tax bill. The Personal and PAYE credits together give most workers €4,000 in annual credits." },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section style={{ background: "linear-gradient(160deg, #0f1f3d 0%, #0a1628 60%)", padding: "80px 24px 40px", position: "relative", overflow: "hidden" }}>
        {/* glow */}
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 800, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,168,107,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "flex-start" }} className="grid-cols-1 lg:grid-cols-2">
            {/* Left */}
            <div style={{ paddingTop: 16 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, padding: "6px 14px", borderRadius: 99, background: "rgba(0,168,107,0.12)", border: "1px solid rgba(0,168,107,0.25)", color: "#00d084", marginBottom: 24 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }} className="pulse-green" />
                Updated for Budget 2026
              </div>

              <h1 style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.1, color: "#f0f4ff", marginBottom: 20 }}>
                Irish Tax<br />
                <span style={{ background: "linear-gradient(90deg, #00a86b, #00d084)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Calculators
                </span>
              </h1>

              <p style={{ fontSize: 17, color: "#8899bb", lineHeight: 1.7, marginBottom: 32, maxWidth: 480 }}>
                Calculate your <strong style={{ color: "#f0f4ff" }}>take-home pay</strong>,{" "}
                <strong style={{ color: "#f0f4ff" }}>USC</strong>, and{" "}
                <strong style={{ color: "#f0f4ff" }}>capital gains tax</strong> with Ireland&apos;s most accurate free calculators. Based on Revenue.ie 2026 rates.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48 }}>
                <Link href="/salary-calculator" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", borderRadius: 12, background: "#00a86b", color: "#fff", fontWeight: 600, fontSize: 14, textDecoration: "none", boxShadow: "0 4px 20px rgba(0,168,107,0.35)" }}>
                  <Calculator size={16} /> Salary Calculator <ArrowRight size={14} />
                </Link>
                <Link href="/tools" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", borderRadius: 12, background: "#111d35", border: "1px solid rgba(255,255,255,0.08)", color: "#f0f4ff", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
                  All Calculators
                </Link>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
                {stats.map(s => (
                  <div key={s.label}>
                    <p style={{ fontSize: 18, fontWeight: 700, color: "#f0f4ff", marginBottom: 2 }}>{s.value}</p>
                    <p style={{ fontSize: 12, color: "#4a5980" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div><QuickCalculator /></div>
          </div>
        </div>
      </section>

      {/* POPULAR */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f4ff", marginBottom: 8 }}>Most Popular Calculators</h2>
            <p style={{ fontSize: 14, color: "#8899bb" }}>Start with our most-used tools for your tax obligations</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {popularCards.map(({ label, desc, href, Icon, color }) => (
              <Link key={href} href={href} style={{ display: "flex", flexDirection: "column", gap: 14, padding: 20, borderRadius: 16, background: "#111d35", border: "1px solid rgba(255,255,255,0.06)", textDecoration: "none", transition: "transform 0.2s" }}
                className="tool-card">
                <div style={{ width: 38, height: 38, borderRadius: 10, background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={17} style={{ color }} />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#f0f4ff", marginBottom: 4 }}>{label}</p>
                  <p style={{ fontSize: 12, color: "#8899bb" }}>{desc}</p>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color, marginTop: "auto" }}>Calculate Now →</span>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <Link href="/tools" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#00a86b", textDecoration: "none" }}>
              View all calculators <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* FULL GRID */}
      <section style={{ padding: "64px 24px", background: "#0a1220" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, padding: "4px 12px", borderRadius: 99, background: "#111d35", border: "1px solid rgba(255,255,255,0.06)", color: "#8899bb", marginBottom: 12 }}>
              <Calculator size={11} /> Professional Tax Tools
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f4ff", marginBottom: 8 }}>Complete Irish Tax Calculator Suite</h2>
            <p style={{ fontSize: 14, color: "#8899bb", maxWidth: 520, margin: "0 auto" }}>From salary calculations to capital gains — covering every aspect of Irish taxation for 2026</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {allTools.map(t => <ToolCard key={t.slug} tool={t} />)}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f4ff" }}>Why Use Our Calculator?</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="grid-cols-1 md:grid-cols-3">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} style={{ padding: 24, borderRadius: 20, background: "#111d35", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#f0f4ff", marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 13, color: "#8899bb", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLAINER */}
      <section style={{ padding: "64px 24px", background: "#0a1220" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f4ff", textAlign: "center", marginBottom: 32 }}>How Irish Tax Works in 2026</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {explainer.map(({ title, body }) => (
              <div key={title} style={{ padding: 20, borderRadius: 14, background: "#111d35", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: "#f0f4ff", marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 13, color: "#8899bb", lineHeight: 1.7 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f4ff", textAlign: "center", marginBottom: 32 }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {faqs.map(({ q, a }) => (
              <details key={q} style={{ borderRadius: 14, background: "#111d35", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <summary style={{ padding: "16px 20px", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#f0f4ff", display: "flex", justifyContent: "space-between", alignItems: "center", listStyle: "none" }}>
                  {q}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: "#4a5980" }}>
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p style={{ padding: "0 20px 16px", fontSize: 13, color: "#8899bb", lineHeight: 1.7 }}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "48px 24px 80px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <div style={{ padding: 48, borderRadius: 24, background: "linear-gradient(135deg, rgba(0,168,107,0.12) 0%, rgba(59,130,246,0.08) 100%)", border: "1px solid rgba(0,168,107,0.2)" }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#f0f4ff", marginBottom: 10 }}>Calculate your take-home pay now</h2>
            <p style={{ fontSize: 14, color: "#8899bb", marginBottom: 24 }}>Free, instant, and accurate — based on 2026 Revenue.ie rates.</p>
            <Link href="/salary-calculator" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 12, background: "#00a86b", color: "#fff", fontWeight: 600, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 20px rgba(0,168,107,0.3)" }}>
              <Calculator size={16} /> Open Salary Calculator
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
