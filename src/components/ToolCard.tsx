"use client";
import Link from "next/link";
import { ArrowRight, TrendingUp, Calculator, PiggyBank, FileText, Landmark, Coins } from "lucide-react";
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
};

export default function ToolCard({ tool }: { tool: Tool }) {
  const Icon = SLUG_ICONS[tool.slug] ?? Calculator;
  const color = CATEGORY_COLORS[tool.category] ?? "#3b82f6";

  return (
    <Link
      href={tool.href}
      className="group block rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 tool-card"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}1a` }}
        >
          <Icon size={18} style={{ color }} />
        </div>
        {tool.popular && (
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: "rgba(0,168,107,0.15)", color: "var(--accent-green-light)" }}
          >
            Popular
          </span>
        )}
      </div>

      <div className="mb-1 flex items-center gap-2">
        <span
          className="text-xs px-1.5 py-0.5 rounded"
          style={{ background: `${color}1a`, color }}
        >
          {tool.category}
        </span>
      </div>

      <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
        {tool.title}
      </h3>
      <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
        {tool.description}
      </p>

      <div
        className="flex items-center gap-1 text-xs font-medium transition-colors group-hover:gap-2"
        style={{ color: "var(--accent-green)" }}
      >
        Calculate Now <ArrowRight size={12} />
      </div>
    </Link>
  );
}
