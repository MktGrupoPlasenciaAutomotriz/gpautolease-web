import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface EyebrowProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional leading marker glyph or numeric step. */
  marker?: string | number;
  variant?: 'default' | 'inverse' | 'lime';
}

/**
 * Typographic section label, fintech style. Replaces decorative pills.
 * Shape: tiny uppercase tracking-wider label with a leading marker line/number.
 *
 * Examples:
 *   <Eyebrow marker="01">El caso fiscal</Eyebrow>
 *   <Eyebrow marker="—">Para PFAE y empresas</Eyebrow>
 */
export function Eyebrow({
  marker,
  variant = 'default',
  className,
  children,
  ...props
}: EyebrowProps) {
  const colorCls =
    variant === 'inverse'
      ? 'text-white/60 [&_.eyebrow-marker]:text-lime-400'
      : variant === 'lime'
      ? 'text-lime-700 [&_.eyebrow-marker]:text-lime-600'
      : 'text-forest [&_.eyebrow-marker]:text-lime-600';

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em]',
        'font-sans',
        colorCls,
        className,
      )}
      {...props}
    >
      {marker !== undefined && (
        <>
          <span className="eyebrow-marker font-display tracking-tight">{marker}</span>
          <span aria-hidden className="h-px w-6 bg-current opacity-40" />
        </>
      )}
      <span>{children}</span>
    </div>
  );
}
