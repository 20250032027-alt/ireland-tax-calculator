"use client";
import Link from "next/link";
import { Calculator } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#0a1220", marginTop: 96 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 40 }}>
          {/* Brand */}
          <div style={{ gridColumn: "span 2" }} className="md:col-span-2">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "#00a86b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Calculator size={15} color="#fff" />
              </div>
              <span style={{ fontWeight: 600, color: "#f0f4ff", fontSize: 14 }}>Ireland Tax Calculator</span>
            </div>
            <p style={{ fontSize: 13, color: "#8899bb", lineHeight: 1.7, maxWidth: 340, marginBottom: 12 }}>
              Free, accurate Irish tax calculators updated for Budget 2026. Calculate your PAYE income tax, USC, and PRSI instantly.
            </p>
            <p style={{ fontSize: 12, color: "#4a5980" }}>
              © {new Date().getFullYear()} Ireland Tax Calculator. Estimates only. Always verify with{" "}
              <a href="https://www.revenue.ie" target="_blank" rel="noopener noreferrer" style={{ color: "#8899bb", textDecoration: "underline" }}>Revenue.ie</a>.
            </p>
          </div>

          {/* Calculators */}
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 600, color: "#f0f4ff", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.08em" }}>Calculators</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["Salary Calculator", "/salary-calculator"],
                ["Income Tax Calculator", "/tools/income-tax-calculator"],
                ["USC Calculator", "/tools/usc-calculator"],
                ["PRSI Calculator", "/tools/prsi-calculator"],
              ].map(([label, href]) => (
                <Link key={href} href={href} style={{ fontSize: 13, color: "#8899bb", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#f0f4ff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#8899bb")}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* More */}
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 600, color: "#f0f4ff", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.08em" }}>More Tools</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["CGT Calculator", "/tools/cgt-calculator"],
                ["Tax Credits Guide", "/tools/tax-credits"],
                ["Gross Salary Calculator", "/tools/gross-salary-calculator"],
                ["All Calculators", "/tools"],
              ].map(([label, href]) => (
                <Link key={href} href={href} style={{ fontSize: 13, color: "#8899bb", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#f0f4ff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#8899bb")}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div style={{ paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <p style={{ fontSize: 12, color: "#4a5980" }}>
            Tax rates sourced from <a href="https://www.revenue.ie" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>Revenue Commissioners Ireland</a> — updated for the 2026 tax year.
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            <Link href="/privacy" style={{ fontSize: 12, color: "#4a5980", textDecoration: "none" }}>Privacy</Link>
            <Link href="/disclaimer" style={{ fontSize: 12, color: "#4a5980", textDecoration: "none" }}>Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
