"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Calculator } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/salary-calculator", label: "Salary calculator" },
  { href: "/tools/contractor-day-rate", label: "Contractor rate" },
  { href: "/tools", label: "All tools" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(7,13,26,0.88)",
      backdropFilter: "blur(14px) saturate(1.4)",
      borderBottom: "1px solid var(--border-0)",
    }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Brand */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Calculator size={14} color="#fff" strokeWidth={2.2} />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text-0)", letterSpacing: "-0.01em", lineHeight: 1.2 }}>Tax Calculator</div>
            <div style={{ fontSize: 10, color: "var(--text-2)", letterSpacing: "0.02em", lineHeight: 1.2 }}>Ireland 2026</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden md:flex">
          {navLinks.map(l => {
            const active = pathname === l.href;
            return (
              <Link key={l.href} href={l.href} style={{
                fontSize: 13, fontWeight: active ? 600 : 400,
                color: active ? "var(--text-0)" : "var(--text-1)",
                textDecoration: "none", padding: "6px 12px", borderRadius: 8,
                background: active ? "var(--bg-2)" : "transparent",
                transition: "color 0.15s, background 0.15s",
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.color = "var(--text-0)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.color = "var(--text-1)"; e.currentTarget.style.background = "transparent"; }}}>
                {l.label}
              </Link>
            );
          })}
          <Link href="/salary-calculator" className="btn-primary" style={{ marginLeft: 8, padding: "7px 16px", fontSize: 13 }}>
            Calculate
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ background: "none", border: "none", color: "var(--text-1)", cursor: "pointer", padding: 6, borderRadius: 6 }} aria-label="Toggle menu">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div style={{ borderTop: "1px solid var(--border-0)", background: "var(--bg-1)", padding: "12px 24px 20px", display: "flex", flexDirection: "column", gap: 4 }} className="md:hidden">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} style={{ fontSize: 14, color: "var(--text-1)", textDecoration: "none", padding: "9px 0", borderBottom: "1px solid var(--border-0)" }} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/salary-calculator" className="btn-primary" style={{ marginTop: 12, justifyContent: "center" }} onClick={() => setOpen(false)}>
            Calculate now
          </Link>
        </div>
      )}
    </nav>
  );
}
