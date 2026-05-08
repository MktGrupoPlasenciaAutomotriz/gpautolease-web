import type { ChangeEvent } from 'react';
import { cn } from '@/lib/cn';

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  className?: string;
  ariaLabel?: string;
}

/**
 * Single-thumb range slider with brand styling.
 * Uses native input[type=range] for accessibility + keyboard support.
 */
export function Slider({
  value,
  min,
  max,
  step = 1,
  onChange,
  className,
  ariaLabel,
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  const handle = (e: ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value));

  return (
    <div className={cn('relative h-6 w-full', className)}>
      <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-ink-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-forest to-lime-500 transition-[width] duration-150"
          style={{ width: `${pct}%` }}
        />
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handle}
        aria-label={ariaLabel}
        className={cn(
          'absolute inset-0 w-full appearance-none bg-transparent cursor-pointer',
          // Webkit thumb
          '[&::-webkit-slider-thumb]:appearance-none',
          '[&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6',
          '[&::-webkit-slider-thumb]:rounded-full',
          '[&::-webkit-slider-thumb]:bg-white',
          '[&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-forest',
          '[&::-webkit-slider-thumb]:shadow-card',
          '[&::-webkit-slider-thumb]:transition-transform',
          '[&::-webkit-slider-thumb]:hover:scale-110',
          // Firefox thumb
          '[&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6',
          '[&::-moz-range-thumb]:rounded-full',
          '[&::-moz-range-thumb]:bg-white',
          '[&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-forest',
          '[&::-moz-range-thumb]:cursor-pointer',
          'focus-visible:[&::-webkit-slider-thumb]:ring-4 focus-visible:[&::-webkit-slider-thumb]:ring-lime-500/40',
        )}
      />
    </div>
  );
}
