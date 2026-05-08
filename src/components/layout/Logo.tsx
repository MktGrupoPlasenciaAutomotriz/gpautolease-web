import { cn } from '@/lib/cn';

interface LogoProps {
  variant?: 'color' | 'white' | 'black';
  className?: string;
  showTagline?: boolean;
}

const srcMap = {
  color: '/logo.svg',
  white: '/logo-white.svg',
  black: '/logo-black.svg',
};

export function Logo({ variant = 'color', className, showTagline = false }: LogoProps) {
  return (
    <div className={cn('inline-flex flex-col items-start', className)}>
      <img
        src={srcMap[variant]}
        alt="GP Autolease"
        className="h-9 w-auto md:h-10 select-none"
        draggable={false}
      />
      {showTagline && (
        <span
          className={cn(
            'mt-1 font-helvetica text-[10px] tracking-wide',
            variant === 'white' ? 'text-white/85' : 'text-ink-600',
          )}
        >
          Tu aliado en movimiento
        </span>
      )}
    </div>
  );
}
