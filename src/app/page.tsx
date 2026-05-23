import Link from "next/link";
import { ArrowRight, Calculator, TrendingUp, Landmark, Coins, Briefcase, GitCompare, ClipboardCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import QuickCalculator from "@/components/QuickCalculator";
import ToolSearch from "@/components/ToolSearch";
import { tools } from "@/lib/tools";

const featuredTools = tools.slice(0, 6);

const popularCards = [
  { label: "Salary Calculator", desc: "Take-home after PAYE, USC & PRSI", href: "/salary-calculator", Icon: TrendingUp, color: "#00a86b" },
  { label: "Contractor Rate", desc: "Break-even day rate vs PAYE", href: "/tools/contractor-day-rate", Icon: Briefcase, color: "#3b82f6" },
  { label: "Salary Comparison", desc: "Two offers, side by side", href: "/tools/salary-comparison", Icon: GitCompare, color: "#a855f7" },
  { label: "Payslip Checker", desc: "Spot overtaxing fast", href: "/tools/payslip-checker", Icon: ClipboardCheck, color: "#f59e0b" },
];

const features = [
  {
    label: "Accuracy",
    title: "Built from Revenue.ie",
    body: "Every rate, band, and credit comes straight from the Irish Revenue Commissioners. We update after every Budget — not when we get around to it.",
    color: "#00a86b",
  },
  {
    label: "Speed",
    title: "Numbers update as you type",
    body: "No submit button. No spinner. Change the salary and the result changes. That's it.",
    color: "#3b82f6",
  },
  {
    label: "Privacy",
    title: "Your data never leaves your browser",
    body: "All calculations run locally. We don't store your salary, we don't log your session, and there's no account required.",
    color: "#a855f7",
  },
];

const faqs = [
  { q: "How is Irish income tax calculated?", a: "Ireland uses two rates. Income up to €44,000 (single person, 2026) is taxed at 20%. Everything above that is taxed at 40%. You then subtract your tax credits from the total — which is different from how the UK personal allowance works." },
  { q: "What is USC and do I have to pay it?", a: "USC stands for Universal Social Charge. If your total income is €13,000 or less you pay nothing. Above that, it applies across four bands: 0.5%, 2%, 3%, and 8%. It's charged on gross income before pension relief." },
  { q: "What PRSI rate do I pay?", a: "Most employees pay Class A PRSI at 4.2% of gross earnings in 2026. That rises to 4.35% from 1 October 2026. You're exempt in any week where your earnings are €352 or less." },
  { q: "What tax credits does everyone get?", a: "Every taxpayer gets the Personal Tax Credit (€2,000). PAYE employees also get the Employee Tax Credit (€2,000). Both reduce your tax bill directly — after the tax has been calculated on your income." },
  { q: "Does the calculator include pension contributions?", a: "Yes. Drag the pension slider to your contribution percentage. Pension contributions come off your gross before tax, USC, and PRSI are worked out — so you get relief at your top rate." },
];

export default function HomePage() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />

      {/* ── HERO ───────────────────────────────────── */}
      <section style={{
        background: `radial-gradient(ellipse 80% 50% at 60% -10%, rgba(0,168,107,0.09) 0%, transparent 65%),
                     radial-gradient(ellipse 60% 40% at 0% 60%, rgba(59,130,246,0.05) 0%, transparent 60%),
                     var(--bg-0)`,
        padding: "90px 24px 64px",
        position: "relative",
      }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div className="hero-grid">
            {/* Left */}
            <div id="main">
              <div className="badge badge-green anim-fade-up" style={{ marginBottom: 28 }}>
                <span className="pulse-green" style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", display: "inline-block" }} />
                Updated for Budget 2026
              </div>

              <h1 className="anim-fade-up-1" style={{ marginBottom: 22 }}>
                Irish Tax
                <br />
                <span style={{ color: "var(--accent-hi)" }}>Calculators</span>
              </h1>

              <p className="anim-fade-up-2" style={{ fontSize: 17, color: "var(--text-1)", lineHeight: 1.75, maxWidth: 460, marginBottom: 36 }}>
                Calculate your <strong style={{ color: "var(--text-0)", fontWeight: 600 }}>take-home pay</strong>, <strong style={{ color: "var(--text-0)", fontWeight: 600 }}>USC</strong>, and <strong style={{ color: "var(--text-0)", fontWeight: 600 }}>capital gains</strong>. Based on Revenue.ie 2026 rates. Free.
              </p>

              <div className="anim-fade-up-3" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 56 }}>
                <Link href="/salary-calculator" className="btn-primary">
                  <Calculator size={15} /> Salary Calculator <ArrowRight size={13} />
                </Link>
                <Link href="/tools" className="btn-ghost">
                  All calculators
                </Link>
              </div>

              {/* Stats — organic numbers, no round figures */}
              <div className="anim-fade-up-4" style={{ display: "flex", gap: 36, flexWrap: "wrap" }}>
                {[
                  { value: "2026", label: "Tax year" },
                  { value: "12", label: "Free tools" },
                  { value: "Revenue.ie", label: "Source" },
                  { value: "0", label: "Accounts needed" },
                ].map(s => (
                  <div key={s.label}>
                    <p style={{ fontSize: 20, fontWeight: 700, color: "var(--text-0)", letterSpacing: "-0.03em" }}>{s.value}</p>
                    <p style={{ fontSize: 11, color: "var(--text-2)", marginTop: 2 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Quick Calculator */}
            <div className="anim-fade-up-2">
              <QuickCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* ── SEARCH ─────────────────────────────────── */}
      <div style={{ padding: "0 24px", marginTop: -20, position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <ToolSearch />
        </div>
      </div>

      {/* ── POPULAR ────────────────────────────────── */}
      <section style={{ padding: "72px 24px 0" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
            <div>
              <p className="label-sm" style={{ marginBottom: 8 }}>Most used</p>
              <h2>Popular calculators</h2>
            </div>
            <Link href="/tools" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
              View all <ArrowRight size={12} />
            </Link>
          </div>

          <div className="popular-grid">
            {popularCards.map(({ label, desc, href, Icon, color }) => (
              <Link key={href} href={href} className="tool-card" style={{ display: "flex", flexDirection: "column", padding: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}1a`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-0)", marginBottom: 5 }}>{label}</p>
                <p style={{ fontSize: 12, color: "var(--text-1)", lineHeight: 1.5 }}>{desc}</p>
                <span style={{ marginTop: "auto", paddingTop: 16, fontSize: 12, fontWeight: 600, color, display: "flex", alignItems: "center", gap: 4 }}>
                  Calculate <ArrowRight size={11} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALL TOOLS GRID ─────────────────────────── */}
      <section style={{ padding: "72px 24px 0" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <p className="label-sm" style={{ marginBottom: 8 }}>All tools</p>
            <h2>Complete Irish tax suite</h2>
            <p style={{ fontSize: 14, color: "var(--text-1)", marginTop: 10, maxWidth: 440 }}>
              Six calculators covering the main ways Irish workers and investors interact with Revenue
            </p>
          </div>
          <div className="tools-grid">
            {featuredTools.map(t => <ToolCard key={t.slug} tool={t} />)}
          </div>
        </div>
      </section>

      {/* ── FEATURES — borderless, divider style ───── */}
      <section style={{ padding: "80px 24px 0" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <p className="label-sm" style={{ marginBottom: 12 }}>Why use this</p>
          <div className="features-grid">
            {features.map(({ label, title, body, color }) => (
              <div key={title} style={{ padding: "36px 32px" }}>
                <span className="badge badge-neutral" style={{ marginBottom: 20 }}>{label}</span>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-0)", marginBottom: 12, letterSpacing: "-0.02em" }}>{title}</h3>
                <p style={{ fontSize: 13, color: "var(--text-1)", lineHeight: 1.75 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS — no cards, divider style ── */}
      <section style={{ padding: "80px 24px 0" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p className="label-sm" style={{ marginBottom: 12 }}>Background</p>
          <h2 style={{ marginBottom: 40 }}>How Irish tax works in 2026</h2>
          {[
            { title: "Income tax (PAYE)", body: "Ireland taxes income at two rates. The first €44,000 goes through at 20%. Anything above is taxed at 40%. Married couples get a wider band, which is why the one-income married result can be significantly better than single." },
            { title: "Universal Social Charge (USC)", body: "USC is a separate charge on gross income — not income tax. It has four bands in 2026: 0.5%, 2%, 3%, 8%. If you earn €13,000 or less in the year, you pay no USC at all." },
            { title: "PRSI", body: "Class A PRSI is 4.2% of gross pay for most employees. It goes into the Social Insurance Fund, which is what funds your State pension and Jobseeker's Benefit if you need them." },
            { title: "Tax credits", body: "This is where Ireland differs from the UK. There is no tax-free personal allowance here. Instead, you get credits that come off your tax bill after it has been calculated. A €2,000 credit saves you €2,000 in tax regardless of your rate." },
          ].map(({ title, body }, i) => (
            <div key={title} style={{ paddingBottom: 32, marginBottom: 32, borderBottom: i < 3 ? "1px solid var(--border-0)" : "none" }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-0)", marginBottom: 10, letterSpacing: "-0.01em" }}>{title}</h3>
              <p style={{ fontSize: 14, color: "var(--text-1)", lineHeight: 1.8 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ — inline progressive disclosure ────── */}
      <section style={{ padding: "80px 24px 0" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p className="label-sm" style={{ marginBottom: 12 }}>Common questions</p>
          <h2 style={{ marginBottom: 36 }}>FAQ</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {faqs.map(({ q, a }, i) => (
              <details key={q} style={{ borderBottom: i < faqs.length - 1 ? "1px solid var(--border-0)" : "none" }}>
                <summary style={{
                  padding: "18px 0", cursor: "pointer",
                  fontSize: 14, fontWeight: 500, color: "var(--text-0)",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  listStyle: "none", gap: 16, userSelect: "none",
                }}>
                  {q}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, color: "var(--text-2)", transition: "transform 0.2s" }}>
                    <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p style={{ padding: "0 0 18px", fontSize: 13, color: "var(--text-1)", lineHeight: 1.8 }}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────── */}
      <section style={{ padding: "80px 24px 96px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            padding: "52px 40px", borderRadius: "var(--radius-xl)",
            background: `radial-gradient(ellipse at top, rgba(0,168,107,0.1) 0%, transparent 70%), var(--bg-1)`,
            border: "1px solid var(--border-0)",
          }}>
            <p className="label-sm" style={{ marginBottom: 16 }}>Free forever</p>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", marginBottom: 12 }}>Work out your take-home pay</h2>
            <p style={{ fontSize: 14, color: "var(--text-1)", marginBottom: 28, lineHeight: 1.7 }}>
              Free, instant, based on 2026 Revenue.ie rates.
            </p>
            <Link href="/salary-calculator" className="btn-primary">
              <Calculator size={15} /> Open salary calculator
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
