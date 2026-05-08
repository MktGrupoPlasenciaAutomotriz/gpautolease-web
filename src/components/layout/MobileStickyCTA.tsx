import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconArrowRight, IconWhatsApp } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';

/**
 * Mobile-only sticky CTA. Appears after scrolling past the hero, hides
 * automatically on cotizador / tramite flows where the user is already
 * deep in conversion.
 *
 * Always-visible primary action that doesn't compete with hero. Fintech
 * apps like Cash App / Monzo use this pattern to keep the conversion
 * always one tap away.
 */
export function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();

  // Hide on routes where the CTA would distract the active flow
  const hideOnRoutes = [
    '/cotizar',
    '/cotizar/resultado',
    '/tramite',
    '/contacto',
  ];
  const shouldHide = hideOnRoutes.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (shouldHide) {
      setVisible(false);
      return;
    }
    const onScroll = () => {
      // Show after the user has scrolled past most of the hero
      setVisible(window.scrollY > 480);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [shouldHide]);

  if (shouldHide) return null;

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-30 lg:hidden',
        'transition-transform duration-300 ease-out-expo',
        visible ? 'translate-y-0' : 'translate-y-full',
      )}
      aria-hidden={!visible}
    >
      <div className="border-t border-ink-200/70 bg-white/95 backdrop-blur-md shadow-[0_-12px_32px_-8px_rgb(29_29_27_/_0.12)] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-2.5">
          <Link
            to="/cotizar"
            className="group/cta flex h-12 flex-1 items-center justify-between rounded-md bg-forest px-5 text-sm font-semibold text-white shadow-soft transition-all active:scale-[0.99]"
          >
            <span>Cotizar mi auto</span>
            <span className="flex items-center gap-1 text-lime-300">
              <span className="font-mono text-[10px] uppercase tracking-wider opacity-80">60s</span>
              <IconArrowRight size={16} className="transition-transform group-hover/cta:translate-x-0.5" />
            </span>
          </Link>
          <a
            href="https://wa.me/523300000000"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hablar por WhatsApp"
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md ring-1 ring-ink-200 text-forest hover:bg-forest-50 transition-colors"
          >
            <IconWhatsApp size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
