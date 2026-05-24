"use client";
import Link from "next/link";
import { Calculator } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border-0)", background: "var(--bg-0)", marginTop: 0 }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "52px 24px 36px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 48 }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 16 }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Calculator size={13} color="#fff" strokeWidth={2.2} />
              </div>
              <span style={{ fontWeight: 600, color: "var(--text-0)", fontSize: 13 }}>Ireland Tax Calculator</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--text-1)", lineHeight: 1.75, maxWidth: 300, marginBottom: 14 }}>
              Free Irish tax calculators updated for Budget 2026. PAYE, USC, and PRSI calculations based on Revenue.ie rates.
            </p>
            <p style={{ fontSize: 11, color: "var(--text-2)", lineHeight: 1.7 }}>
              Estimates only. Verify with{" "}
              <a href="https://www.revenue.ie" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-1)", textDecoration: "underline" }}>Revenue.ie</a>.
            </p>
          </div>

          {/* Calculators */}
          <div>
            <p className="label-sm" style={{ marginBottom: 16 }}>Calculators</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["Salary calculator", "/salary-calculator"],
                ["Income tax", "/tools/income-tax-calculator"],
                ["USC calculator", "/tools/usc-calculator"],
                ["PRSI calculator", "/tools/prsi-calculator"],
                ["Contractor rate", "/tools/contractor-day-rate"],
                ["Salary comparison", "/tools/salary-comparison"],
              ].map(([label, href]) => (
                <Link key={href} href={href} style={{ fontSize: 13, color: "var(--text-1)", textDecoration: "none", transition: "color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text-0)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-1)")}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* More */}
          <div>
            <p className="label-sm" style={{ marginBottom: 16 }}>Guides</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["CGT calculator", "/tools/cgt-calculator"],
                ["Tax credits", "/tools/tax-credits"],
                ["Budget 2026", "/tools/budget-2026"],
                ["Moving to Ireland", "/tools/moving-to-ireland"],
                ["Payslip checker", "/tools/payslip-checker"],
                ["All calculators", "/tools"],
              ].map(([label, href]) => (
                <Link key={href} href={href} style={{ fontSize: 13, color: "var(--text-1)", textDecoration: "none", transition: "color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text-0)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-1)")}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div style={{ paddingTop: 24, borderTop: "1px solid var(--border-0)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <p style={{ fontSize: 11, color: "var(--text-2)" }}>
            © {new Date().getFullYear()} Ireland Tax Calculator. Rates from{" "}
            <a href="https://www.revenue.ie" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-2)", textDecoration: "underline" }}>Revenue Commissioners Ireland</a>.
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            {[["About", "/about"], ["Contact", "/contact"], ["Terms", "/terms"], ["Privacy", "/privacy"], ["Disclaimer", "/disclaimer"]].map(([l, h]) => (
              <Link key={h} href={h} style={{ fontSize: 11, color: "var(--text-2)", textDecoration: "none" }}>{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
