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
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        background: "rgba(10,22,40,0.9)",
        backdropFilter: "blur(12px)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "var(--accent-green)" }}
          >
            <Calculator size={16} color="#fff" />
          </div>
          <div>
            <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
              Tax Calculator
            </span>
            <span
              className="block text-xs leading-none"
              style={{ color: "var(--text-secondary)" }}
            >
              Free Irish Tax Tools
            </span>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm transition-colors hover:text-white"
              style={{ color: "var(--text-secondary)" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/salary-calculator"
            className="text-sm px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
            style={{ background: "var(--accent-green)", color: "#fff" }}
          >
            Calculate Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          style={{ color: "var(--text-secondary)" }}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t px-4 py-4 flex flex-col gap-3"
          style={{ borderColor: "var(--border)", background: "var(--bg-secondary)" }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm py-1"
              style={{ color: "var(--text-secondary)" }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
