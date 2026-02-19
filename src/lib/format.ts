export function formatDollars(amount: number): string {
  const abs = Math.abs(amount);
  const sign = amount < 0 ? "-" : "";
  if (abs >= 1e12) return `${sign}$${(abs / 1e12).toFixed(1)}T`;
  if (abs >= 1e9) return `${sign}$${(abs / 1e9).toFixed(1)}B`;
  if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(1)}M`;
  if (abs >= 1e3) return `${sign}$${(abs / 1e3).toFixed(0)}K`;
  return `${sign}$${abs.toFixed(0)}`;
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

const TITLE_CASE_PRESERVE = new Set([
  'LLC', 'DOD', 'USA', 'RTX', 'LP', 'LLP', 'U.S.',
]);

const TITLE_CASE_REPLACE: Record<string, string> = {
  'INC': 'Inc.',
};

export function toTitleCase(str: string): string {
  if (str.toUpperCase() !== str || str.length <= 3) return str;

  return str
    .toLowerCase()
    .split(' ')
    .map((word) => {
      const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
      const upper = word.toUpperCase();
      const stripped = upper.replace(/[.,]+$/g, '');
      if (TITLE_CASE_PRESERVE.has(upper) || TITLE_CASE_PRESERVE.has(stripped)) return upper;
      if (TITLE_CASE_REPLACE[stripped]) return TITLE_CASE_REPLACE[stripped];
      return capitalized;
    })
    .join(' ');
}
