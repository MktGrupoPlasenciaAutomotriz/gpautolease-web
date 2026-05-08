import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'subtle' | 'forest' | 'inverse';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padded?: boolean | 'sm' | 'md' | 'lg' | 'xl';
}

const variantCls: Record<CardVariant, string> = {
  default: 'bg-white shadow-card',
  elevated: 'bg-white shadow-elevated',
  outlined: 'bg-white border border-border',
  subtle: 'bg-bg-subtle border border-ink-100',
  forest: 'bg-forest text-white',
  inverse: 'bg-forest-950 text-white',
};

const paddedCls = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

export function Card({
  className,
  variant = 'default',
  padded = 'md',
  children,
  ...props
}: CardProps) {
  const padding = padded === false ? '' : paddedCls[padded === true ? 'md' : padded];
  return (
    <div
      className={cn(
        'rounded-xl',
        variantCls[variant],
        padding,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
