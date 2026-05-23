"use client";
import Link from "next/link";
import { ArrowRight, TrendingUp, Calculator, PiggyBank, FileText, Landmark, Coins, Briefcase, GitCompare, ClipboardCheck, BookOpen, Plane } from "lucide-react";
import type { Tool } from "@/lib/tools";

const CATEGORY_COLORS: Record<string, string> = {
  "Income Tax": "#3b82f6",
  "Investment Tax": "#a855f7",
  "Other": "#f59e0b",
};

const SLUG_ICONS: Record<string, React.ElementType> = {
  "salary-calculator": TrendingUp,
  "income-tax-calculator": Calculator,
  "usc-calculator": Coins,
  "prsi-calculator": PiggyBank,
  "gross-salary-calculator": Calculator,
  "cgt-calculator": Landmark,
  "tax-credits": FileText,
  "contractor-day-rate": Briefcase,
  "salary-comparison": GitCompare,
  "payslip-checker": ClipboardCheck,
  "budget-2026": BookOpen,
  "moving-to-ireland": Plane,
};

export default function ToolCard({ tool }: { tool: Tool }) {
  const Icon = SLUG_ICONS[tool.slug] ?? Calculator;
  const color = CATEGORY_COLORS[tool.category] ?? "#3b82f6";

  return (
    <Link href={tool.href} className="tool-card" style={{ display: "flex", flexDirection: "column", padding: 20, textDecoration: "none" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={17} style={{ color }} />
        </div>
        {tool.popular && (
          <span className="badge badge-green" style={{ fontSize: 10 }}>Popular</span>
        )}
      </div>

      <span style={{ fontSize: 10, fontWeight: 600, color, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
        {tool.category}
      </span>

      <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-0)", marginBottom: 8, lineHeight: 1.35 }}>
        {tool.title}
      </h3>
      <p style={{ fontSize: 12, color: "var(--text-1)", lineHeight: 1.65, marginBottom: 18, flexGrow: 1 }}>
        {tool.description}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: "var(--accent)", marginTop: "auto" }}>
        Calculate <ArrowRight size={11} />
      </div>
    </Link>
  );
}
