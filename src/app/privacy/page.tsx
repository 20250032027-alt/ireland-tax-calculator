import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold mb-8" style={{ color: "#f0f4ff" }}>
          Privacy Policy
        </h1>
        <div className="prose space-y-6 text-sm leading-relaxed" style={{ color: "#8899bb" }}>
          <p>
            Ireland Tax Calculator does not collect, store, or transmit any personal data. All
            calculations are performed entirely in your browser — no salary figures, tax results, or
            personal details ever leave your device.
          </p>
          <h2 className="text-base font-semibold" style={{ color: "#f0f4ff" }}>
            Cookies
          </h2>
          <p>
            We may use standard analytics cookies (e.g. Google Analytics) to understand aggregate
            site usage such as which pages are visited and which calculators are used most. No
            personally identifiable information is collected. You can opt out via your browser
            settings.
          </p>
          <h2 className="text-base font-semibold" style={{ color: "#f0f4ff" }}>
            Third-party advertising
          </h2>
          <p>
            This site may display advertisements served by Google AdSense. Google may use cookies to
            show relevant ads. You can manage ad personalisation at{" "}
            <a href="https://adssettings.google.com" className="underline" target="_blank" rel="noopener noreferrer">
              adssettings.google.com
            </a>
            .
          </p>
          <h2 className="text-base font-semibold" style={{ color: "#f0f4ff" }}>
            Contact
          </h2>
          <p>
            If you have questions about this privacy policy, please use the contact form on this site.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
