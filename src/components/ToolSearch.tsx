"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { tools } from "@/lib/tools";

export default function ToolSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return tools.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  }, [query]);

  const showResults = query.trim().length > 0;

  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "relative" }}>
        <Search size={16} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#4a5980", pointerEvents: "none" }} />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search calculators... try 'salary', 'CGT', 'USC'"
          style={{
            paddingLeft: 44, paddingRight: 16, height: 48,
            fontSize: 14, borderRadius: 14,
            background: "#111d35",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#f0f4ff", width: "100%", outline: "none",
          }}
          onFocus={e => { e.currentTarget.style.borderColor = "#00a86b"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,168,107,0.15)"; }}
          onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
        />
      </div>

      {showResults && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, zIndex: 50,
          background: "#111d35", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 14, overflow: "hidden",
          boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
        }}>
          {results.length === 0 ? (
            <div style={{ padding: "16px 20px", fontSize: 13, color: "#4a5980" }}>
              No calculators found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            results.map((t, i) => (
              <Link key={t.slug} href={t.href} onClick={() => setQuery("")} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "12px 20px", textDecoration: "none",
                borderBottom: i < results.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                background: "transparent", transition: "background 0.1s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#162440")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#f0f4ff", marginBottom: 2 }}>{t.title}</p>
                  <p style={{ fontSize: 11, color: "#4a5980" }}>{t.category}</p>
                </div>
                <ArrowRight size={14} style={{ color: "#00a86b", flexShrink: 0 }} />
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
