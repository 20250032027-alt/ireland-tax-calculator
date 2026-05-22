import Link from "next/link";
import { Calculator } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="border-t mt-24"
      style={{ borderColor: "var(--border)", background: "var(--bg-secondary)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "var(--accent-green)" }}
              >
                <Calculator size={16} color="#fff" />
              </div>
              <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                Ireland Tax Calculator
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
              Free, accurate Irish tax calculators updated for Budget 2026. Calculate your PAYE
              income tax, USC, and PRSI instantly. No registration required.
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              © {new Date().getFullYear()} Ireland Tax Calculator. All figures are estimates only.
              Always verify with{" "}
              <a
                href="https://www.revenue.ie"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80"
                style={{ color: "var(--text-secondary)" }}
              >
                Revenue.ie
              </a>
              .
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
              Calculators
            </h3>
            <ul className="space-y-2">
              {[
                ["Salary Calculator", "/salary-calculator"],
                ["Income Tax Calculator", "/tools/income-tax-calculator"],
                ["USC Calculator", "/tools/usc-calculator"],
                ["PRSI Calculator", "/tools/prsi-calculator"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
              More Tools
            </h3>
            <ul className="space-y-2">
              {[
                ["CGT Calculator", "/tools/cgt-calculator"],
                ["Tax Code Checker", "/tools/tax-credits"],
                ["Gross Salary Calculator", "/tools/gross-salary-calculator"],
                ["All Calculators", "/tools"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-10 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-2"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Tax rates sourced from{" "}
            <a
              href="https://www.revenue.ie"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Revenue Commissioners Ireland
            </a>{" "}
            — updated for the 2026 tax year.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs hover:text-white" style={{ color: "var(--text-muted)" }}>
              Privacy
            </Link>
            <Link href="/disclaimer" className="text-xs hover:text-white" style={{ color: "var(--text-muted)" }}>
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
