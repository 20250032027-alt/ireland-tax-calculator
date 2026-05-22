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
  { icon: Shield, title: "Revenue.ie Verified", desc: "All tax rates, bands, and credits sourced directly from the Irish Revenue Commissioners and updated for Budget 2026.", color: "#00a86b" },
  { icon: Zap, title: "Instant Results", desc: "Real-time calculations as you type. No page reloads, no waiting — see your take-home pay update instantly.", color: "#f59e0b" },
  { icon: CheckCircle, title: "No Registration", desc: "Use every calculator completely free, forever. No account, no email, no ads in the way of your result.", color: "#3b82f6" },
];

const faqs = [
  { q: "How is Irish income tax calculated?", a: "Ireland uses a two-rate system: 20% on income up to the standard rate band (€44,000 for single individuals in 2026) and 40% on income above that. Your tax credits are then subtracted from the gross tax figure to give your actual tax payable." },
  { q: "What is USC and do I have to pay it?", a: "USC (Universal Social Charge) is a separate charge from income tax. You are exempt if your total income is €13,000 or less. Above that, you pay 0.5% on the first €12,012, 2% up to €28,700, 3% up to €70,044, and 8% on any income above that." },
  { q: "What PRSI rate do I pay?", a: "Most employees pay Class A PRSI at 4.2% of gross earnings in 2026, rising to 4.35% from 1 October 2026. If your weekly earnings are €352 or less you are exempt from PRSI for that week." },
  { q: "What tax credits does everyone get?", a: "Every taxpayer gets the Personal Tax Credit (€2,000). PAYE workers also get the Employee Tax Credit (€2,000). These are applied after calculating your gross tax, directly reducing what you owe — not your income." },
  { q: "Does the calculator include pension contributions?", a: "Yes. You can enter a pension contribution percentage and it will be deducted from your gross income before tax, USC, and PRSI are calculated — giving you the correct tax relief on contributions." },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-8 px-4 sm:px-6" style={{ background: "linear-gradient(160deg, var(--bg-secondary) 0%, var(--bg-primary) 60%)" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(ellipse, var(--accent-green) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="pt-4">
              <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full mb-6" style={{ background: "rgba(0,168,107,0.12)", border: "1px solid rgba(0,168,107,0.25)", color: "var(--accent-green-light)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                Updated for Budget 2026
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4" style={{ color: "var(--text-primary)" }}>
                Irish Tax{" "}
                <span className="block" style={{ background: "linear-gradient(90deg, var(--accent-green), var(--accent-green-light))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Calculators
                </span>
              </h1>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Calculate your <strong style={{ color: "var(--text-primary)" }}>take-home pay</strong>, <strong style={{ color: "var(--text-primary)" }}>USC</strong>, and <strong style={{ color: "var(--text-primary)" }}>capital gains tax</strong> with Ireland&apos;s most accurate free calculators. Based on Revenue.ie 2026 rates.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link href="/salary-calculator" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90" style={{ background: "var(--accent-green)", color: "#fff", boxShadow: "0 4px 20px rgba(0,168,107,0.3)" }}>
                  <Calculator size={16} /> Salary Calculator <ArrowRight size={14} />
                </Link>
                <Link href="/tools" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-primary)" }}>
                  All Calculators
                </Link>
              </div>
              <div className="flex flex-wrap gap-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{s.value}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div><QuickCalculator /></div>
          </div>
        </div>
      </section>

      {/* Popular cards */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Most Popular Calculators</h2>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Start with our most-used tools for your tax obligations</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Salary Calculator", desc: "Take-home after PAYE, USC & PRSI", href: "/salary-calculator", Icon: TrendingUp, color: "#00a86b" },
              { label: "Income Tax", desc: "PAYE tax across all bands", href: "/tools/income-tax-calculator", Icon: Calculator, color: "#3b82f6" },
              { label: "USC Calculator", desc: "Universal Social Charge", href: "/tools/usc-calculator", Icon: Coins, color: "#f59e0b" },
              { label: "Capital Gains", desc: "33% CGT on assets", href: "/tools/cgt-calculator", Icon: Landmark, color: "#a855f7" },
            ].map(({ label, desc, href, Icon, color }) => (
              <Link key={href} href={href} className="rounded-2xl p-5 flex flex-col gap-3 transition-all hover:-translate-y-0.5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}1a` }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>{label}</p>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{desc}</p>
                </div>
                <span className="text-xs font-medium mt-auto" style={{ color }}>Calculate Now →</span>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/tools" className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-80" style={{ color: "var(--accent-green)" }}>
              View all calculators <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Full grid */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full mb-3" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
              <Calculator size={12} /> Professional Tax Tools
            </div>
            <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Complete Irish Tax Calculator Suite</h2>
            <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>From salary calculations to capital gains — covering every aspect of Irish taxation for 2026</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allTools.map((t) => <ToolCard key={t.slug} tool={t} />)}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Why Use Our Calculator?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${color}1a` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explainer */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "var(--text-primary)" }}>How Irish Tax Works in 2026</h2>
          <div className="space-y-4">
            {[
              { title: "Income Tax (PAYE)", body: "Ireland taxes income at two rates. The first €44,000 of income (for a single person) is taxed at 20%. Any income above that is taxed at 40%. Married couples and civil partners benefit from a wider standard rate band." },
              { title: "Universal Social Charge (USC)", body: "USC is charged on gross income before pension contributions. It has four bands in 2026: 0.5%, 2%, 3%, and 8%. You are fully exempt if your total income is €13,000 or less." },
              { title: "PRSI", body: "Most employees pay Class A PRSI at 4.2% of gross pay. It funds the Social Insurance Fund, entitling you to benefits including the State pension. There is a weekly earnings threshold below which no PRSI is payable." },
              { title: "Tax Credits", body: "Unlike the UK's personal allowance system, Ireland uses tax credits that directly reduce your tax bill after calculation. The Personal Tax Credit and Employee (PAYE) Tax Credit together give most workers €4,000 in credits." },
            ].map(({ title, body }) => (
              <div key={title} className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: "var(--text-primary)" }}>Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <details key={q} className="rounded-xl group" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <summary className="flex justify-between items-center px-5 py-4 cursor-pointer text-sm font-medium list-none" style={{ color: "var(--text-primary)" }}>
                  {q}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 transition-transform group-open:rotate-180" style={{ color: "var(--text-muted)" }}>
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-2xl p-10" style={{ background: "linear-gradient(135deg, rgba(0,168,107,0.15) 0%, rgba(59,130,246,0.1) 100%)", border: "1px solid rgba(0,168,107,0.2)" }}>
            <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>Calculate your take-home pay now</h2>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>Free, instant, and accurate — based on 2026 Revenue.ie rates.</p>
            <Link href="/salary-calculator" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90" style={{ background: "var(--accent-green)", color: "#fff" }}>
              <Calculator size={16} /> Open Salary Calculator
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
