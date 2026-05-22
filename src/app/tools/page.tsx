"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools";
import type { ToolCategory } from "@/lib/tools";

const categories: (ToolCategory | "All")[] = ["All", "Income Tax", "Investment Tax", "Other"];

export default function ToolsPage() {
  const [active, setActive] = useState<ToolCategory | "All">("All");

  const filtered = active === "All" ? tools : tools.filter((t) => t.category === active);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
            All Irish Tax Calculators
          </h1>
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>
            Free tools covering every aspect of Irish taxation — updated for Budget 2026.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: active === cat ? "var(--accent-green)" : "var(--bg-card)",
                color: active === cat ? "#fff" : "var(--text-secondary)",
                border: `1px solid ${active === cat ? "transparent" : "var(--border)"}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
