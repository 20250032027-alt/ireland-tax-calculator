export function formatEuro(amount: number, decimals = 0): string {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Math.round(amount));
}

export function formatPct(value: number, decimals = 1): string {
  return `${Math.round(value * 10 ** decimals) / 10 ** decimals}%`;
}
