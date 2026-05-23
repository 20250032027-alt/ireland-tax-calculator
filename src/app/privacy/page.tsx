import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  const wrap = { maxWidth: 720, margin: "0 auto", padding: "48px 24px" };
  return (
    <>
      <Navbar />
      <main style={wrap}>
        <h1 style={{ marginBottom: 32 }}>Privacy policy</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, fontSize: 14, color: "var(--text-1)", lineHeight: 1.8 }}>
          <p>Ireland Tax Calculator does not collect, store, or transmit any personal data. All calculations are performed entirely in your browser. Your salary figures never leave your device.</p>
          <div style={{ paddingTop: 20, borderTop: "1px solid var(--border-0)" }}>
            <h2 style={{ fontSize: 16, marginBottom: 10 }}>Cookies</h2>
            <p>We may use standard analytics cookies (e.g. Google Analytics) to understand aggregate site usage — which pages are visited and which calculators are used most. No personally identifiable information is collected. You can opt out via your browser settings.</p>
          </div>
          <div style={{ paddingTop: 20, borderTop: "1px solid var(--border-0)" }}>
            <h2 style={{ fontSize: 16, marginBottom: 10 }}>Advertising</h2>
            <p>This site may display advertisements served by Google AdSense. Google may use cookies to show relevant ads. You can manage ad personalisation at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-hi)", textDecoration: "underline" }}>adssettings.google.com</a>.</p>
          </div>
          <div style={{ paddingTop: 20, borderTop: "1px solid var(--border-0)" }}>
            <h2 style={{ fontSize: 16, marginBottom: 10 }}>Contact</h2>
            <p>If you have questions about this policy, use the contact form on this site.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
