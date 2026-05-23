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
  const filtered = active === "All" ? tools : tools.filter(t => t.category === active);

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: "#f0f4ff", marginBottom: 10 }}>All Irish Tax Calculators</h1>
          <p style={{ fontSize: 15, color: "#8899bb" }}>Free tools covering every aspect of Irish taxation — updated for Budget 2026.</p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{
              padding: "8px 18px", borderRadius: 99, fontSize: 13, fontWeight: 500, cursor: "pointer",
              background: active === cat ? "#00a86b" : "#111d35",
              color: active === cat ? "#fff" : "#8899bb",
              border: `1px solid ${active === cat ? "transparent" : "rgba(255,255,255,0.08)"}`,
              transition: "all 0.15s",
            }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(t => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </main>
      <Footer />
    </>
  );
}
