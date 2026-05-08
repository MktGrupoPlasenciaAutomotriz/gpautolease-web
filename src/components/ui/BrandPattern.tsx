import type { SVGProps } from 'react';
import { cn } from '@/lib/cn';

/**
 * Decorative brand pattern: dot grid in lima green, alignable to corners.
 * Used as quiet visual texture in dark and forest sections to keep brand
 * presence without noise.
 */
type DotGridProps = SVGProps<SVGSVGElement> & {
  cols?: number;
  rows?: number;
  size?: number; // dot diameter in px
  gap?: number; // grid gap in px
  fade?: 'none' | 'left' | 'right' | 'top' | 'bottom' | 'radial';
  color?: string;
};

export function DotGrid({
  cols = 12,
  rows = 6,
  size = 4,
  gap = 18,
  fade = 'radial',
  color = '#8EBF24',
  className,
  ...rest
}: DotGridProps) {
  const w = cols * gap;
  const h = rows * gap;
  const maskId = `dotmask-${cols}-${rows}-${fade}`;

  const gradient =
    fade === 'left'
      ? 'linear-gradient(to right, transparent, white)'
      : fade === 'right'
      ? 'linear-gradient(to left, transparent, white)'
      : fade === 'top'
      ? 'linear-gradient(to bottom, transparent, white)'
      : fade === 'bottom'
      ? 'linear-gradient(to top, transparent, white)'
      : fade === 'radial'
      ? 'radial-gradient(ellipse at center, white 30%, transparent 75%)'
      : '';

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      role="presentation"
      aria-hidden
      className={cn('pointer-events-none select-none', className)}
      style={
        gradient
          ? {
              maskImage: gradient,
              WebkitMaskImage: gradient,
            }
          : undefined
      }
      {...rest}
    >
      <defs>
        <pattern id={maskId} x={0} y={0} width={gap} height={gap} patternUnits="userSpaceOnUse">
          <circle cx={gap / 2} cy={gap / 2} r={size / 2} fill={color} />
        </pattern>
      </defs>
      <rect width={w} height={h} fill={`url(#${maskId})`} />
    </svg>
  );
}

/**
 * Curved abstract line — used in decorative moments, e.g. dark CTA section.
 */
export function CurveAccent({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 400 120"
      preserveAspectRatio="none"
      className={cn('pointer-events-none select-none', className)}
      role="presentation"
      aria-hidden
      {...rest}
    >
      <path
        d="M0,100 C80,60 140,30 220,40 C300,50 360,90 400,80"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M0,110 C80,80 140,55 220,65 C300,75 360,100 400,95"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}
