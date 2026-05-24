import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Moving to Ireland Tax Guide 2026 | PAYE, USC, PRSI for New Arrivals",
  description: "Complete Irish tax guide for people moving to Ireland. How PAYE works, your first year tax rules, USC exemptions, registering with Revenue, and how Ireland compares to UK and US tax.",
};

const sections = [
  {
    id: "first-year",
    title: "Your first year in Ireland",
    content: [
      "Ireland uses what is called a 'split year' approach for people who arrive during the tax year (which runs January to December). You are only taxed on Irish income for the portion of the year you actually live here.",
      "When you start work, your employer will put you on emergency tax if they have not received a Tax Credit Certificate from Revenue. This means you will be overtaxed for a few weeks. You need to register with Revenue immediately to get this sorted.",
      "The first thing you should do is register on myAccount at revenue.ie. This is Revenue's online portal and it handles everything: tax credits, tax certificates, refund claims, and communication with your employer.",
    ],
  },
  {
    id: "registration",
    title: "Registering with Revenue",
    content: [
      "Go to revenue.ie and create a myAccount profile. You will need your PPS number (Ireland's equivalent of a National Insurance number or Social Security number). If you do not have a PPS number yet, you need to apply at your local Intreo office before you can register for tax.",
      "Once registered, Revenue will automatically send a Tax Credit Certificate to your employer so they can stop emergency taxing you.",
      "If you worked in Ireland before but are returning after a period abroad, Revenue may still have your old details. Log in and check your credits are correct.",
    ],
  },
  {
    id: "how-tax-works",
    title: "How Irish tax actually works",
    content: [
      "Ireland has three separate charges on employment income: income tax (PAYE), the Universal Social Charge (USC), and PRSI. You pay all three on most income. They are not the same thing.",
      "Income tax works differently from the UK. Ireland does not give you a tax-free personal allowance. Instead, you get tax credits that directly reduce your tax bill after it has been calculated. The result is similar but the mechanism is different.",
      "USC is a separate charge on gross income at rates of 0.5%, 2%, 3%, and 8% depending on how much you earn. If your total income for the year is €13,000 or less, you are fully exempt from USC.",
      "PRSI is 4.2% of gross pay for most employees in 2026. It goes into the Social Insurance Fund and is what qualifies you for the Contributory State Pension and Jobseeker's Benefit later.",
    ],
  },
  {
    id: "vs-uk",
    title: "Ireland vs UK tax",
    content: [
      "The headline income tax rates look similar (20% and 40%) but Ireland's system is less generous at lower incomes. The standard rate band for a single person in Ireland is €44,000, lower than the UK's £50,270 higher rate threshold.",
      "Ireland does not have a tax-free personal allowance like the UK's £12,570. Instead, Irish tax credits (€4,000 for most PAYE workers) reduce your bill directly. At lower incomes, UK workers often pay no tax at all; Irish workers will pay some.",
      "USC is a charge you do not have to pay in the UK. There is no direct equivalent. It is more aggressive than National Insurance at some income levels.",
      "Overall, Ireland tends to be more expensive for middle-income earners than the UK, but income above €100k is taxed similarly.",
    ],
  },
  {
    id: "vs-us",
    title: "Ireland vs US tax",
    content: [
      "The biggest difference is that Ireland has no federal/state split. You pay national Irish tax and that is it. There are no separate state income taxes to worry about.",
      "Irish marginal rates (up to 52% including USC and PRSI) are higher than most US states at the top end. However, Irish workers get free or low-cost public healthcare and a State pension system in return.",
      "If you are a US citizen working in Ireland, the US taxes you on worldwide income regardless of where you live. You will need to file both Irish and US returns and use the Foreign Tax Credit (Form 1116) to avoid being taxed twice on the same income.",
      "The tax treaty between Ireland and the US covers most scenarios but it is worth getting specific advice if you have US pension accounts (401k, IRA) as these are treated differently under Irish law.",
    ],
  },
  {
    id: "credits-for-new-arrivals",
    title: "Tax credits you should claim",
    content: [
      "The Personal Tax Credit (€2,000) and Employee (PAYE) Tax Credit (€2,000) are automatic. Revenue will apply these as soon as your employer registers you.",
      "The Rent Tax Credit (€1,000 per year) must be actively claimed via myAccount. If you are renting privately, do not forget this one. It is a real €1,000 off your tax bill.",
      "If you have children, check whether you qualify for the Single Person Child Carer Credit (€1,900) or, if married, the Home Carer Credit (€1,950).",
      "Medical expenses at 20% relief can be claimed at the end of the year through myAccount. Keep receipts for GP visits, dental, and prescription costs.",
    ],
  },
];

const checklist = [
  "Apply for PPS number at local Intreo office",
  "Register on myAccount at revenue.ie",
  "Confirm employer has received your Tax Credit Certificate",
  "Check you are no longer on emergency tax",
  "Claim the Rent Tax Credit if renting privately",
  "Register for Local Property Tax if you buy a home",
  "File a tax return if you have non-PAYE income",
];

export default function MovingToIrelandPage() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1240, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "inline-flex", alignItems: "center", fontSize: 12, padding: "4px 12px", borderRadius: 99, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-1)", marginBottom: 16 }}>
            Tax Guide
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: "var(--text-0)", marginBottom: 12 }}>Moving to Ireland: Tax Guide 2026</h1>
          <p style={{ fontSize: 16, color: "var(--text-1)", lineHeight: 1.7, maxWidth: 660 }}>
            Everything you need to know about Irish tax when you arrive. How PAYE works, how to register with Revenue, and how Ireland compares to the UK and US.
          </p>
        </div>

        {/* Quick checklist */}
        <div style={{ background: "rgba(0,168,107,0.08)", border: "1px solid rgba(0,168,107,0.2)", borderRadius: 20, padding: 28, marginBottom: 48 }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: "var(--text-0)", marginBottom: 16 }}>New arrival checklist</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }} className="calc-grid">
            {checklist.map(item => (
              <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <CheckCircle size={14} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 13, color: "var(--text-1)", lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main content sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {sections.map(({ id, title, content }) => (
            <div key={id}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--text-0)", marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {title}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {content.map((para, i) => (
                  <p key={i} style={{ fontSize: 14, color: "var(--text-1)", lineHeight: 1.8 }}>{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Rate comparison table */}
        <div style={{ marginTop: 48, background: "var(--bg-2)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, overflow: "hidden" }}>
          <div style={{ padding: "18px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "var(--bg-1)" }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: "var(--text-0)" }}>Ireland vs UK vs US: quick comparison</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "10px 20px", background: "rgba(255,255,255,0.02)" }}>
            {["Feature", "Ireland", "UK", "US (federal)"].map(h => (
              <span key={h} style={{ fontSize: 11, fontWeight: 600, color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>
            ))}
          </div>
          {[
            ["Tax-free allowance", "None (credits instead)", "£12,570", "$14,600 (single)"],
            ["Lower income tax rate", "20%", "20%", "10–22%"],
            ["Higher income tax rate", "40%", "40%", "24–37%"],
            ["Higher rate kicks in at", "€44,000", "~£50,270", "~$47,150"],
            ["Social charge", "USC (0.5–8%)", "NI (12%)", "FICA (7.65%)"],
            ["Pension levy", "PRSI 4.2%", "Included in NI", "Included in FICA"],
            ["Healthcare", "Public (HSE)", "Public (NHS)", "Private / employer"],
            ["State pension", "Yes (PRSI-based)", "Yes (NI-based)", "Yes (FICA-based)"],
          ].map(([feature, ireland, uk, us], i) => (
            <div key={feature} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
              <span style={{ fontSize: 13, color: "var(--text-1)" }}>{feature}</span>
              <span style={{ fontSize: 13, color: "var(--accent-hi)", fontWeight: 500 }}>{ireland}</span>
              <span style={{ fontSize: 13, color: "var(--text-0)" }}>{uk}</span>
              <span style={{ fontSize: 13, color: "var(--text-0)" }}>{us}</span>
            </div>
          ))}
        </div>

        {/* Tools CTA */}
        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="calc-grid">
          {[
            { title: "Calculate your take-home pay", desc: "See exactly what you will earn after Irish tax.", href: "/salary-calculator", label: "Salary Calculator" },
            { title: "Understand your tax credits", desc: "Find every credit you are entitled to as a new arrival.", href: "/tools/tax-credits", label: "Tax Credits Guide" },
          ].map(({ title, desc, href, label }) => (
            <Link key={href} href={href} style={{ display: "block", padding: 24, borderRadius: 16, background: "var(--bg-2)", border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none" }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-0)", marginBottom: 6 }}>{title}</p>
              <p style={{ fontSize: 13, color: "var(--text-1)", marginBottom: 16 }}>{desc}</p>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--accent)" }}>
                {label} <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
