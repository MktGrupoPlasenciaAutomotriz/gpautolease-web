import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  inputSize?: 'md' | 'lg';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      hint,
      error,
      prefix,
      suffix,
      inputSize = 'md',
      id,
      required,
      ...props
    },
    ref,
  ) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;
    const sizeCls = inputSize === 'lg' ? 'h-14 text-lg' : 'h-11 text-base';

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-ink-800"
          >
            {label}
            {required && <span className="ml-0.5 text-danger">*</span>}
          </label>
        )}
        <div
          className={cn(
            'group relative flex items-center rounded-md border border-border bg-white',
            'transition-all duration-200',
            'focus-within:border-forest focus-within:shadow-focus-forest',
            error &&
              'border-danger focus-within:border-danger focus-within:shadow-[0_0_0_3px_rgb(173_50_50_/_0.2)]',
            sizeCls,
          )}
        >
          {prefix && (
            <span
              className={cn(
                'pl-3.5 pr-1 text-ink-500 select-none',
                inputSize === 'lg' ? 'text-lg' : 'text-base',
              )}
            >
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            required={required}
            className={cn(
              'min-w-0 flex-1 bg-transparent px-3.5 outline-none placeholder:text-ink-400 tabular-nums',
              prefix && 'pl-1',
              suffix && 'pr-1',
              className,
            )}
            {...props}
          />
          {suffix && (
            <span
              className={cn(
                'pr-3.5 pl-1 text-ink-500 select-none',
                inputSize === 'lg' ? 'text-lg' : 'text-base',
              )}
            >
              {suffix}
            </span>
          )}
        </div>
        {(hint || error) && (
          <p
            className={cn(
              'mt-1.5 text-xs',
              error ? 'text-danger font-medium' : 'text-ink-500',
            )}
          >
            {error || hint}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';
