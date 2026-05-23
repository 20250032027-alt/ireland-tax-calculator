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
    <Link href={tool.href} className="tool-card" style={{
      display: "block", borderRadius: 16, padding: "20px",
      background: "#111d35", border: "1px solid rgba(255,255,255,0.06)",
      textDecoration: "none", transition: "all 0.2s ease",
    }}>
      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ width: 42, height: 42, borderRadius: 12, background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={18} style={{ color }} />
        </div>
        {tool.popular && (
          <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 99, background: "rgba(0,208,132,0.12)", color: "#00d084" }}>
            Popular
          </span>
        )}
      </div>

      {/* Category badge */}
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 11, padding: "2px 7px", borderRadius: 4, background: `${color}18`, color }}>
          {tool.category}
        </span>
      </div>

      <h3 style={{ fontSize: 14, fontWeight: 600, color: "#f0f4ff", marginBottom: 8, lineHeight: 1.4 }}>
        {tool.title}
      </h3>
      <p style={{ fontSize: 12, color: "#8899bb", lineHeight: 1.6, marginBottom: 16 }}>
        {tool.description}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: "#00a86b" }}>
        Calculate Now <ArrowRight size={12} />
      </div>
    </Link>
  );
}
