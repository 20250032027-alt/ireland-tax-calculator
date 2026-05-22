export type FilingStatus = "single" | "married1" | "married2" | "spccc";
export type Frequency = "year" | "month" | "week" | "day" | "hour";

export interface TaxInput {
  grossSalary: number;
  frequency: Frequency;
  status: FilingStatus;
  pensionPct: number;
  rentCredit: boolean;
  homeCarerCredit: boolean;
  selfEmployed: boolean;
}

export interface TaxBreakdown {
  gross: number;
  pensionRelief: number;
  taxableIncome: number;
  incomeTax: number;
  usc: number;
  prsi: number;
  totalCredits: number;
  totalDeductions: number;
  net: number;
  effectiveRate: number;
  marginalRate: number;
  netMonthly: number;
  netWeekly: number;
  netDaily: number;
  netHourly: number;
  uscBands: { label: string; rate: number; amount: number; income: number }[];
  itBands: { label: string; rate: number; amount: number; income: number }[];
}

const FREQ_MULTIPLIERS: Record<Frequency, number> = {
  year: 1,
  month: 12,
  week: 52,
  day: 260,
  hour: 2080,
};

export function toAnnual(amount: number, freq: Frequency): number {
  return amount * FREQ_MULTIPLIERS[freq];
}

export function calcUSC(income: number): {
  total: number;
  bands: { label: string; rate: number; amount: number; income: number }[];
} {
  if (income <= 13000) return { total: 0, bands: [] };

  const BANDS = [
    { label: "0.5% band", limit: 12012, rate: 0.005 },
    { label: "2% band", limit: 28700, rate: 0.02 },
    { label: "3% band", limit: 70044, rate: 0.03 },
    { label: "8% band", limit: Infinity, rate: 0.08 },
  ];

  let remaining = income;
  let prev = 0;
  let total = 0;
  const bands: { label: string; rate: number; amount: number; income: number }[] = [];

  for (const band of BANDS) {
    const slice = Math.min(remaining, band.limit - prev);
    if (slice <= 0) break;
    const tax = slice * band.rate;
    if (tax > 0) {
      bands.push({ label: band.label, rate: band.rate * 100, amount: tax, income: slice });
    }
    total += tax;
    remaining -= slice;
    prev = band.limit;
    if (remaining <= 0) break;
  }

  return { total, bands };
}

export function calcPRSI(income: number): number {
  const annualThreshold = 352 * 52; // €18,304
  if (income <= annualThreshold) return 0;
  return income * 0.042;
}

export function getStandardBand(status: FilingStatus): number {
  switch (status) {
    case "married1": return 53000;
    case "married2": return 88000;
    case "spccc": return 48000;
    default: return 44000;
  }
}

export function getCredits(
  status: FilingStatus,
  selfEmployed: boolean,
  rentCredit: boolean,
  homeCarerCredit: boolean
): number {
  let credits = 2000; // Personal tax credit
  credits += selfEmployed ? 2000 : 2000; // Earned income / PAYE credit both €2,000 in 2026
  if (status === "married1" || status === "married2") credits += 2000; // Spouse personal credit
  if (status === "spccc") credits += 1900; // Single Person Child Carer Credit
  if (rentCredit) credits += status === "married1" || status === "married2" ? 2000 : 1000;
  if (homeCarerCredit && (status === "married1" || status === "married2")) credits += 1950;
  return credits;
}

export function calcIncomeTax(
  taxableIncome: number,
  status: FilingStatus,
  credits: number
): {
  tax: number;
  bands: { label: string; rate: number; amount: number; income: number }[];
} {
  const band = getStandardBand(status);
  const bands: { label: string; rate: number; amount: number; income: number }[] = [];

  let grossTax = 0;

  if (taxableIncome <= 0) return { tax: 0, bands: [] };

  const at20 = Math.min(taxableIncome, band);
  const at40 = Math.max(0, taxableIncome - band);

  if (at20 > 0) {
    bands.push({ label: "Standard rate (20%)", rate: 20, amount: at20 * 0.2, income: at20 });
    grossTax += at20 * 0.2;
  }
  if (at40 > 0) {
    bands.push({ label: "Higher rate (40%)", rate: 40, amount: at40 * 0.4, income: at40 });
    grossTax += at40 * 0.4;
  }

  const tax = Math.max(0, grossTax - credits);
  return { tax, bands };
}

export function getMarginalRate(taxableIncome: number, status: FilingStatus): number {
  const band = getStandardBand(status);
  const itRate = taxableIncome > band ? 0.4 : 0.2;

  let uscRate = 0;
  if (taxableIncome > 13000) {
    if (taxableIncome > 70044) uscRate = 0.08;
    else if (taxableIncome > 28700) uscRate = 0.03;
    else if (taxableIncome > 12012) uscRate = 0.02;
    else uscRate = 0.005;
  }

  const prsiRate = taxableIncome > 352 * 52 ? 0.042 : 0;
  return Math.round((itRate + uscRate + prsiRate) * 1000) / 10;
}

export function calculate(input: TaxInput): TaxBreakdown {
  const gross = toAnnual(input.grossSalary, input.frequency);
  const pensionRelief = gross * (Math.min(40, Math.max(0, input.pensionPct)) / 100);
  const taxableIncome = Math.max(0, gross - pensionRelief);

  const credits = getCredits(
    input.status,
    input.selfEmployed,
    input.rentCredit,
    input.homeCarerCredit
  );

  const { tax: incomeTax, bands: itBands } = calcIncomeTax(taxableIncome, input.status, credits);
  const { total: usc, bands: uscBands } = calcUSC(taxableIncome);
  const prsi = calcPRSI(taxableIncome);

  const totalDeductions = incomeTax + usc + prsi + pensionRelief;
  const net = gross - totalDeductions;
  const effectiveRate = gross > 0 ? ((incomeTax + usc + prsi) / gross) * 100 : 0;
  const marginalRate = getMarginalRate(taxableIncome, input.status);

  return {
    gross,
    pensionRelief,
    taxableIncome,
    incomeTax,
    usc,
    prsi,
    totalCredits: credits,
    totalDeductions,
    net,
    effectiveRate,
    marginalRate,
    netMonthly: net / 12,
    netWeekly: net / 52,
    netDaily: net / 260,
    netHourly: net / 2080,
    uscBands,
    itBands,
  };
}
