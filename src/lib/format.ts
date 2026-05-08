/**
 * Mexican peso formatter — short form (no centavos by default).
 * "$ 14,820"
 */
export const fmtMXN = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
});

export const fmtMXNCompact = (n: number): string => {
  if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (Math.abs(n) >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return fmtMXN.format(n);
};

export const fmtPercent = (n: number): string => `${Math.round(n * 100)}%`;

export const fmtNumber = new Intl.NumberFormat('es-MX', {
  maximumFractionDigits: 0,
});
