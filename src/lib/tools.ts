export type ToolCategory = "Income Tax" | "Investment Tax" | "Other";

export interface Tool {
  slug: string;
  title: string;
  description: string;
  category: ToolCategory;
  popular?: boolean;
  href: string;
}

export const tools: Tool[] = [
  {
    slug: "salary-calculator",
    title: "Salary Calculator",
    description: "Calculate your take-home pay after PAYE, USC, and PRSI deductions. Supports all filing statuses and pension contributions.",
    category: "Income Tax",
    popular: true,
    href: "/salary-calculator",
  },
  {
    slug: "income-tax-calculator",
    title: "Income Tax Calculator",
    description: "Estimate your PAYE income tax liability across the 20% standard rate and 40% higher rate bands for 2026.",
    category: "Income Tax",
    popular: true,
    href: "/tools/income-tax-calculator",
  },
  {
    slug: "usc-calculator",
    title: "USC Calculator",
    description: "Calculate your Universal Social Charge across all four USC bands. Includes the €13,000 exemption threshold.",
    category: "Income Tax",
    href: "/tools/usc-calculator",
  },
  {
    slug: "prsi-calculator",
    title: "PRSI Calculator",
    description: "Estimate your Pay Related Social Insurance contribution. Class A, S, and self-employed rates covered.",
    category: "Income Tax",
    href: "/tools/prsi-calculator",
  },
  {
    slug: "gross-salary-calculator",
    title: "Gross Salary Calculator",
    description: "Work backwards from your desired take-home pay to find the gross salary you need to earn.",
    category: "Income Tax",
    href: "/tools/gross-salary-calculator",
  },
  {
    slug: "cgt-calculator",
    title: "Capital Gains Tax Calculator",
    description: "Calculate CGT on Irish property, shares, and crypto at the 33% standard rate. Includes the €1,270 annual exemption.",
    category: "Investment Tax",
    href: "/tools/cgt-calculator",
  },
  {
    slug: "tax-credits",
    title: "Tax Credits Checker",
    description: "Find all the tax credits and reliefs you may be entitled to — personal, PAYE, rent, home carer, medical, and more.",
    category: "Other",
    href: "/tools/tax-credits",
  },
];
