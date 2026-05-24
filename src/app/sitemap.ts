import { MetadataRoute } from "next";

const BASE_URL = "https://ireland-tax-calculator-g5uifnze4.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { url: "/", priority: 1.0, changeFrequency: "monthly" as const },
    { url: "/salary-calculator", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/tools", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/tools/income-tax-calculator", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/tools/usc-calculator", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/tools/prsi-calculator", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/tools/cgt-calculator", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/tools/gross-salary-calculator", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/tools/contractor-day-rate", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/tools/salary-comparison", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/tools/payslip-checker", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/tools/budget-2026", priority: 0.9, changeFrequency: "yearly" as const },
    { url: "/tools/moving-to-ireland", priority: 0.8, changeFrequency: "yearly" as const },
    { url: "/tools/tax-credits", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/about", priority: 0.4, changeFrequency: "yearly" as const },
    { url: "/contact", priority: 0.4, changeFrequency: "yearly" as const },
    { url: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/disclaimer", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
