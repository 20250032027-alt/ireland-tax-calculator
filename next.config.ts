import type { NextConfig } from "next";

const securityHeaders = [
  // Stops browsers from guessing content types (prevents MIME-type attacks)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Prevents your site from being embedded in iframes on other sites (clickjacking)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Stops browsers from sending the full URL as referrer to third parties
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Forces HTTPS for 2 years once you have a custom domain
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Controls what browser features the page can use
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Content Security Policy — only allow scripts from Google AdSense and self
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://www.googletagservices.com https://partner.googleadservices.com https://tpc.googlesyndication.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https://pagead2.googlesyndication.com",
      "frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
      "connect-src 'self' https://pagead2.googlesyndication.com",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
