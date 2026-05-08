import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'lime' | 'inverse';
type Size = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-forest text-white hover:bg-forest-700 active:bg-forest-800 shadow-soft',
  lime:
    'bg-lime-500 text-ink-900 hover:bg-lime-400 active:bg-lime-600 shadow-soft',
  secondary:
    'bg-white text-forest border border-forest hover:bg-forest-50 active:bg-forest-100',
  tertiary:
    'bg-ink-100 text-ink-900 hover:bg-ink-200 active:bg-ink-300',
  ghost:
    'bg-transparent text-forest hover:bg-forest-50 active:bg-forest-100',
  inverse:
    'bg-white text-forest hover:bg-ink-50 active:bg-ink-100 shadow-soft',
};

const sizeStyles: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-13 h-[3.25rem] px-6 text-base gap-2',
  xl: 'h-15 h-[3.75rem] px-8 text-lg gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      iconLeft,
      iconRight,
      loading,
      fullWidth,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium tracking-tight',
          'transition-all duration-200 ease-out-expo',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500/60 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none',
          'active:scale-[0.98]',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          iconLeft && <span className="flex-shrink-0">{iconLeft}</span>
        )}
        {children}
        {!loading && iconRight && (
          <span className="flex-shrink-0">{iconRight}</span>
        )}
      </button>
    );
  },
);
Button.displayName = 'Button';
