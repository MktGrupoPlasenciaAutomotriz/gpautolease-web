import type { HTMLAttributes, ReactNode } from 'react';
import { useReveal } from '@/lib/hooks';
import { cn } from '@/lib/cn';

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Delay before fade-in starts, in ms (0 = immediate). */
  delay?: number;
  /** Direction of motion. */
  direction?: 'up' | 'left' | 'right' | 'none';
  /** Animation duration multiplier. */
  duration?: 'fast' | 'normal' | 'slow';
}

const directionInitial: Record<NonNullable<RevealProps['direction']>, string> = {
  up: 'translate-y-6',
  left: '-translate-x-6',
  right: 'translate-x-6',
  none: '',
};

const durationCls: Record<NonNullable<RevealProps['duration']>, string> = {
  fast: 'duration-300',
  normal: 'duration-700',
  slow: 'duration-1000',
};

/**
 * Reveals children with a fade + translate when scrolled into view.
 * Respects prefers-reduced-motion (no animation, instant visible).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 'normal',
  style,
  ...props
}: RevealProps) {
  const [ref, revealed] = useReveal();

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all ease-out-expo motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100',
        durationCls[duration],
        revealed
          ? 'opacity-100 translate-x-0 translate-y-0'
          : `opacity-0 ${directionInitial[direction]}`,
        className,
      )}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
