"use client";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "General", message: "" });

  const lbl: React.CSSProperties = { display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 6 };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xwvzqkor", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div style={{ padding: 32, borderRadius: "var(--radius-lg)", background: "rgba(0,168,107,0.08)", border: "1px solid var(--accent-border)", textAlign: "center" }}>
        <CheckCircle size={32} style={{ color: "var(--accent-hi)", margin: "0 auto 12px" }} />
        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--text-0)", marginBottom: 6 }}>Message sent</p>
        <p style={{ fontSize: 13, color: "var(--text-1)" }}>We will get back to you if a response is needed.</p>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--bg-2)", border: "1px solid var(--border-0)", borderRadius: "var(--radius-lg)", padding: 28 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="calc-grid">
          <div>
            <label style={lbl}>Name</label>
            <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" required />
          </div>
          <div>
            <label style={lbl}>Email</label>
            <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" required />
          </div>
        </div>
        <div>
          <label style={lbl}>Subject</label>
          <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}>
            <option>General</option>
            <option>Rate or calculation error</option>
            <option>Feature request</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label style={lbl}>Message</label>
          <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="What would you like to tell us?" required rows={5}
            style={{ background: "var(--bg-2)", border: "1px solid var(--border-0)", borderRadius: "var(--radius-sm)", padding: "10px 13px", width: "100%", color: "var(--text-0)", fontSize: 14, fontFamily: "var(--font-sans)", outline: "none", resize: "vertical" }}
          />
        </div>
        {status === "error" && <p style={{ fontSize: 13, color: "#f87171" }}>Something went wrong. Try again or email us directly.</p>}
        <button onClick={handleSubmit} disabled={status === "sending"} className="btn-primary" style={{ alignSelf: "flex-start", opacity: status === "sending" ? 0.6 : 1 }}>
          {status === "sending" ? "Sending..." : "Send message"}
        </button>
      </div>
    </div>
  );
}
