import Link from "next/link";
import { ArrowRight, Shield, Zap, CheckCircle, Calculator, TrendingUp, Landmark, Coins } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import QuickCalculator from "@/components/QuickCalculator";
import ToolSearch from "@/components/ToolSearch";
import { tools } from "@/lib/tools";

const allTools = tools.slice(0, 6);

const stats = [
  { value: "2026", label: "Tax year" },
  { value: "100%", label: "Free forever" },
  { value: "Revenue.ie", label: "Verified rates" },
  { value: "No reg.", label: "required" },
];

const features = [
  { icon: Shield, title: "Revenue.ie Verified", desc: "Rates, bands, and credits come straight from the Irish Revenue Commissioners. We update them every year after the Budget, not when we get around to it.", color: "#00a86b" },
  { icon: Zap, title: "Instant Results", desc: "Numbers update as you type. No submit button, no spinner, no waiting. Just change the salary and the result changes.", color: "#f59e0b" },
  { icon: CheckCircle, title: "No Account Needed", desc: "Every calculator on this site is free with no login required. Your salary figures never leave your browser.", color: "#3b82f6" },
];

const faqs = [
  { q: "How is Irish income tax calculated?", a: "Ireland uses two rates. Income up to €44,000 (for a single person in 2026) is taxed at 20%. Everything above that is taxed at 40%. You then subtract your tax credits from the total, which is different from how the UK system works." },
  { q: "What is USC and do I have to pay it?", a: "USC stands for Universal Social Charge. If your total income is €13,000 or less you pay nothing. Above that it kicks in across four bands: 0.5%, 2%, 3%, and 8%. It is charged on gross income, before pension relief." },
  { q: "What PRSI rate do I pay?", a: "Most employees pay Class A PRSI at 4.2% of gross earnings in 2026. That rises to 4.35% from 1 October 2026. You are exempt in any week where your earnings are €352 or less." },
  { q: "What tax credits does everyone get?", a: "Every taxpayer gets the Personal Tax Credit (€2,000). PAYE employees also get the Employee Tax Credit (€2,000). Both credits reduce your tax bill directly, after the tax has been calculated on your income." },
  { q: "Does the calculator include pension contributions?", a: "Yes. Drag the pension slider to your contribution percentage. Pension contributions come off your gross before tax, USC, and PRSI are worked out, so you get relief at your top rate." },
];

const explainer = [
  { title: "Income Tax (PAYE)", body: "Ireland taxes income at two rates. The first €44,000 goes through at 20%. Anything above that is taxed at 40%. Married couples get a bigger standard rate band, which is why the married one-income result can be significantly better than single." },
  { title: "Universal Social Charge (USC)", body: "USC is a separate charge on top of income tax. It has four bands in 2026 (0.5%, 2%, 3%, 8%) and is charged on gross income. If you earn €13,000 or less in the year, you pay no USC at all." },
  { title: "PRSI", body: "Class A PRSI is 4.2% of gross pay for most employees. It goes into the Social Insurance Fund, which is what pays your State pension and Jobseeker's Benefit if you need them. There is a weekly earnings floor below which it does not apply." },
  { title: "Tax Credits", body: "This is the part most people find confusing when coming from the UK. Ireland does not give you a tax-free allowance. Instead, you get credits that come off your tax bill after it has been calculated. A €2,000 credit saves you €2,000 in tax regardless of your rate." },
];

const popularCards = [
  { label: "Salary Calculator", desc: "Take-home after PAYE, USC & PRSI", href: "/salary-calculator", Icon: TrendingUp, color: "#00a86b" },
  { label: "Income Tax", desc: "PAYE tax across all bands", href: "/tools/income-tax-calculator", Icon: Calculator, color: "#3b82f6" },
  { label: "USC Calculator", desc: "Universal Social Charge", href: "/tools/usc-calculator", Icon: Coins, color: "#f59e0b" },
  { label: "Capital Gains", desc: "33% CGT on assets", href: "/tools/cgt-calculator", Icon: Landmark, color: "#a855f7" },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section style={{ background: "linear-gradient(160deg, #0f1f3d 0%, #0a1628 60%)", padding: "80px 24px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 800, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,168,107,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="hero-grid">
            <div style={{ paddingTop: 16 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, padding: "6px 14px", borderRadius: 99, background: "rgba(0,168,107,0.12)", border: "1px solid rgba(0,168,107,0.25)", color: "#00d084", marginBottom: 24 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }} className="pulse-green" />
                Updated for Budget 2026
              </div>
              <h1 style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.1, color: "#f0f4ff", marginBottom: 20 }}>
                Irish Tax<br />
                <span style={{ background: "linear-gradient(90deg, #00a86b, #00d084)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Calculators</span>
              </h1>
              <p style={{ fontSize: 17, color: "#8899bb", lineHeight: 1.7, marginBottom: 32, maxWidth: 480 }}>
                Calculate your <strong style={{ color: "#f0f4ff" }}>take-home pay</strong>, <strong style={{ color: "#f0f4ff" }}>USC</strong>, and <strong style={{ color: "#f0f4ff" }}>capital gains tax</strong>. Based on Revenue.ie 2026 rates. Free.
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
            <div><QuickCalculator /></div>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section style={{ padding: "48px 24px 0" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <ToolSearch />
        </div>
      </section>

      {/* POPULAR */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f4ff", marginBottom: 8 }}>Most Popular Calculators</h2>
            <p style={{ fontSize: 14, color: "#8899bb" }}>The ones most people come here for</p>
          </div>
          <div className="popular-grid" style={{ marginBottom: 24 }}>
            {popularCards.map(({ label, desc, href, Icon, color }) => (
              <Link key={href} href={href} className="tool-card" style={{ display: "flex", flexDirection: "column", gap: 14, padding: 20, borderRadius: 16, background: "#111d35", border: "1px solid rgba(255,255,255,0.06)", textDecoration: "none" }}>
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
            <p style={{ fontSize: 14, color: "#8899bb", maxWidth: 520, margin: "0 auto" }}>Six calculators covering the main ways Irish workers and investors interact with Revenue</p>
          </div>
          <div className="tools-grid">
            {allTools.map(t => <ToolCard key={t.slug} tool={t} />)}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f4ff" }}>Why use this?</h2>
          </div>
          <div className="features-grid">
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
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f4ff", textAlign: "center", marginBottom: 32 }}>How Irish tax works in 2026</h2>
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
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f0f4ff", textAlign: "center", marginBottom: 32 }}>Common questions</h2>
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
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#f0f4ff", marginBottom: 10 }}>Work out your take-home pay</h2>
            <p style={{ fontSize: 14, color: "#8899bb", marginBottom: 24 }}>Free, instant, based on 2026 Revenue.ie rates.</p>
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
