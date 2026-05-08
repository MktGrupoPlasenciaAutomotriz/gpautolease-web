import type { SVGProps } from 'react';
import { cn } from '@/lib/cn';

/**
 * Mini bar comparison — used to show 2-3 scenarios at a glance.
 * Used inline in pillars and dashboard moments.
 */
interface BarPairProps {
  data: { label: string; value: number; accent?: boolean }[];
  className?: string;
  format?: (v: number) => string;
  showValues?: boolean;
}

export function BarPair({ data, className, format, showValues = true }: BarPairProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className={cn('space-y-2.5', className)}>
      {data.map((d, i) => {
        const pct = (d.value / max) * 100;
        return (
          <div key={i} className="flex items-center gap-3">
            <span className="w-24 text-[11px] uppercase tracking-wider text-ink-500">
              {d.label}
            </span>
            <div className="flex-1 h-2 rounded-full bg-ink-100 overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full transition-[width] duration-700 ease-out-expo',
                  d.accent ? 'bg-gradient-to-r from-forest to-lime-500' : 'bg-ink-300',
                )}
                style={{ width: `${pct}%` }}
              />
            </div>
            {showValues && (
              <span
                className={cn(
                  'num-display w-24 text-right text-sm font-semibold tabular-nums',
                  d.accent ? 'text-forest' : 'text-ink-700',
                )}
              >
                {format ? format(d.value) : d.value.toLocaleString('es-MX')}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Simple sparkline: SVG polyline normalized to height.
 * Used to show trend or curve moments inline.
 */
interface SparklineProps extends Omit<SVGProps<SVGSVGElement>, 'data'> {
  data: number[];
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
  /** Highlight last point as a dot. */
  endDot?: boolean;
}

export function Sparkline({
  data,
  width = 120,
  height = 40,
  stroke = '#2D6548',
  fill,
  endDot,
  className,
  ...rest
}: SparklineProps) {
  if (!data.length) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / Math.max(1, data.length - 1);
  const points = data.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return [x, y] as const;
  });
  const polyline = points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
  const areaPath =
    `M0,${height} L` + polyline + ` L${width},${height} Z`;

  const lastPoint = points[points.length - 1];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn('block', className)}
      role="presentation"
      aria-hidden
      {...rest}
    >
      {fill && <path d={areaPath} fill={fill} />}
      <polyline points={polyline} fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {endDot && <circle cx={lastPoint[0]} cy={lastPoint[1]} r={3.5} fill={stroke} />}
    </svg>
  );
}

/**
 * Stack divider (hairline) used to separate financial datapoints.
 */
export function HairlineDivider({ className, vertical = false }: { className?: string; vertical?: boolean }) {
  return (
    <div
      role="presentation"
      aria-hidden
      className={cn(
        'bg-ink-200',
        vertical ? 'w-px self-stretch' : 'h-px w-full',
        className,
      )}
    />
  );
}
