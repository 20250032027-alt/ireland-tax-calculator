import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Ireland Tax Calculator — report an error, suggest a feature, or ask a question.",
};

export default function ContactPage() {
  const wrap = { maxWidth: 680, margin: "0 auto", padding: "48px 24px" };
  return (
    <>
      <Navbar />
      <main style={wrap}>
        <div style={{ marginBottom: 36 }}>
          <h1 style={{ marginBottom: 10 }}>Contact</h1>
          <p style={{ fontSize: 15, color: "var(--text-1)", lineHeight: 1.7 }}>
            Found an error in the rates? Have a calculator idea? Use the form below.
          </p>
        </div>
        <ContactForm />
        <div style={{ marginTop: 32, padding: 16, borderRadius: "var(--radius-md)", background: "var(--bg-2)", border: "1px solid var(--border-0)" }}>
          <p style={{ fontSize: 12, color: "var(--text-2)", lineHeight: 1.7 }}>
            We cannot provide individual tax advice. For questions about your specific tax situation, contact Revenue directly at <a href="https://www.revenue.ie" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-hi)", textDecoration: "underline" }}>revenue.ie</a> or speak to a qualified Irish tax adviser.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
