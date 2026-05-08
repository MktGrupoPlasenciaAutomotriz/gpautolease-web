import { cn } from '@/lib/cn';

interface Segment<T extends string | number> {
  value: T;
  label: string;
  hint?: string;
}

interface SegmentedControlProps<T extends string | number> {
  options: Segment<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  size?: 'md' | 'lg';
  ariaLabel?: string;
}

export function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
  className,
  size = 'md',
  ariaLabel,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex w-full rounded-md bg-ink-100 p-1',
        className,
      )}
    >
      {options.map((opt) => {
        const isActive = value === opt.value;
        return (
          <button
            key={String(opt.value)}
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(opt.value)}
            className={cn(
              'flex-1 rounded-sm font-semibold tracking-tight transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500/60',
              size === 'lg' ? 'px-4 py-2.5 text-base' : 'px-3 py-2 text-sm',
              isActive
                ? 'bg-white text-forest shadow-soft'
                : 'text-ink-600 hover:text-ink-900',
            )}
          >
            {opt.label}
            {opt.hint && (
              <span className="ml-1 text-[10px] font-normal text-ink-400">
                {opt.hint}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
