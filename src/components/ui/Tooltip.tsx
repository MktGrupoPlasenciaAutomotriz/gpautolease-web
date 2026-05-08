import { useState, useId, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface TooltipProps {
  /** The text or element that shows the tooltip on hover/focus. */
  children: ReactNode;
  /** Tooltip content. Can be a string or rich content. */
  content: ReactNode;
  /** Where the tooltip should anchor relative to the trigger. */
  side?: 'top' | 'bottom';
  className?: string;
  triggerClassName?: string;
}

/**
 * Lightweight, accessible tooltip with no dependencies.
 * Triggered on hover (mouse) and focus (keyboard). ESC closes.
 *
 * Used primarily for educational fiscal terms (deducción, IVA acreditable, valor residual)
 * to keep the UI scannable while teaching when needed.
 */
export function Tooltip({
  children,
  content,
  side = 'top',
  className,
  triggerClassName,
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  const positionCls =
    side === 'top'
      ? 'bottom-full mb-2 origin-bottom'
      : 'top-full mt-2 origin-top';

  return (
    <span className="relative inline-block">
      <button
        type="button"
        aria-describedby={open ? id : undefined}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(false);
        }}
        className={cn(
          'cursor-help border-b border-dotted border-ink-400 hover:border-forest hover:text-forest transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500/60 focus-visible:rounded-sm',
          triggerClassName,
        )}
      >
        {children}
      </button>
      {open && (
        <span
          id={id}
          role="tooltip"
          className={cn(
            'absolute left-1/2 z-50 w-max max-w-xs -translate-x-1/2',
            'rounded-md bg-forest-950 px-3 py-2 text-xs leading-relaxed text-white shadow-elevated',
            'animate-fade-in pointer-events-none',
            positionCls,
            className,
          )}
        >
          {content}
          <span
            className={cn(
              'absolute left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-forest-950',
              side === 'top' ? '-bottom-1' : '-top-1',
            )}
          />
        </span>
      )}
    </span>
  );
}
