import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'lime' | 'forest' | 'soft' | 'outline';
  icon?: ReactNode;
}

const variantCls = {
  default: 'bg-ink-100 text-ink-800',
  lime: 'bg-lime-100 text-lime-900 ring-1 ring-lime-300/60',
  forest: 'bg-forest-100 text-forest-900 ring-1 ring-forest-300/40',
  soft: 'bg-white/10 text-white/90 ring-1 ring-white/20',
  outline: 'bg-white text-forest border border-forest',
};

export function Pill({
  className,
  variant = 'default',
  icon,
  children,
  ...props
}: PillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide',
        variantCls[variant],
        className,
      )}
      {...props}
    >
      {icon && <span className="flex h-3.5 w-3.5 items-center justify-center">{icon}</span>}
      {children}
    </span>
  );
}
