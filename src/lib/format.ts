export function formatDollars(amount: number): string {
  const abs = Math.abs(amount);
  if (abs >= 1e12) return `$${(amount / 1e12).toFixed(1)}T`;
  if (abs >= 1e9) return `$${(amount / 1e9).toFixed(1)}B`;
  if (abs >= 1e6) return `$${(amount / 1e6).toFixed(0)}M`;
  if (abs >= 1e3) return `$${(amount / 1e3).toFixed(0)}K`;
  return `$${amount.toFixed(0)}`;
}

export function formatDollarsLong(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(pct: number): string {
  return `${pct.toFixed(1)}%`;
}
