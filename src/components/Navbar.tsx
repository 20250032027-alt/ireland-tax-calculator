"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Calculator } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/salary-calculator", label: "Salary Calculator" },
  { href: "/tools", label: "All Calculators" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(10,22,40,0.92)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "#00a86b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Calculator size={16} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#f0f4ff", lineHeight: 1.2 }}>Tax Calculator</div>
            <div style={{ fontSize: 11, color: "#8899bb", lineHeight: 1.2 }}>Free Irish Tax Tools</div>
          </div>
        </Link>

        {/* Desktop */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="hidden md:flex">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} style={{ fontSize: 14, color: "#8899bb", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#f0f4ff")}
              onMouseLeave={e => (e.currentTarget.style.color = "#8899bb")}>
              {l.label}
            </Link>
          ))}
          <Link href="/salary-calculator" style={{ fontSize: 14, fontWeight: 600, padding: "8px 18px", borderRadius: 10, background: "#00a86b", color: "#fff", textDecoration: "none", boxShadow: "0 4px 14px rgba(0,168,107,0.3)" }}>
            Calculate Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ background: "none", border: "none", color: "#8899bb", cursor: "pointer", padding: 6 }}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#0f1f3d", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 12 }} className="md:hidden">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} style={{ fontSize: 14, color: "#8899bb", textDecoration: "none", padding: "4px 0" }} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/salary-calculator" style={{ fontSize: 14, fontWeight: 600, padding: "10px 18px", borderRadius: 10, background: "#00a86b", color: "#fff", textDecoration: "none", textAlign: "center", marginTop: 4 }} onClick={() => setOpen(false)}>
            Calculate Now
          </Link>
        </div>
      )}
    </nav>
  );
}
