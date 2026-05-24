import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calculator, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 600, margin: "0 auto", padding: "96px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 72, fontWeight: 700, color: "var(--border-1)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 24 }}>404</p>
        <h1 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", marginBottom: 12 }}>Page not found</h1>
        <p style={{ fontSize: 15, color: "var(--text-1)", marginBottom: 36, lineHeight: 1.7 }}>
          The page you are looking for does not exist or has moved.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/salary-calculator" className="btn-primary">
            <Calculator size={15} /> Salary calculator
          </Link>
          <Link href="/tools" className="btn-ghost">
            All calculators <ArrowRight size={13} />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
