import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { Button } from '@/components/ui/Button';
import { IconMenu, IconX, IconWhatsApp, IconArrowRight } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';

const navLinks = [
  { to: '/cotizar', label: 'Cotizar' },
  { to: '/marcas', label: 'Marcas' },
  { to: '/por-que-arrendar', label: 'Por qué arrendar' },
  { to: '/como-funciona', label: 'Cómo funciona' },
  { to: '/preguntas', label: 'Preguntas' },
  { to: '/contacto', label: 'Contacto' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full border-b transition-all duration-300',
          scrolled
            ? 'bg-white/85 backdrop-blur-md border-ink-100 shadow-soft'
            : 'bg-white/0 border-transparent',
        )}
      >
        <div className="container-tight flex h-16 items-center justify-between md:h-20">
          <Link to="/" aria-label="Inicio GP Autolease" className="flex items-center">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    'text-sm font-medium transition-colors',
                    isActive ? 'text-forest' : 'text-ink-700 hover:text-forest',
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://wa.me/523300000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-forest hover:bg-forest-50 transition-colors"
              aria-label="Hablar por WhatsApp"
            >
              <IconWhatsApp size={22} />
            </a>
            <Link
              to="/cotizar"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-lime-500 px-5 text-sm font-medium text-ink-900 shadow-soft transition-all duration-200 hover:bg-lime-400 active:bg-lime-600 active:scale-[0.98]"
            >
              Cotiza ahora
              <IconArrowRight />
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="https://wa.me/523300000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-forest hover:bg-forest-50"
              aria-label="WhatsApp"
            >
              <IconWhatsApp size={22} />
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink-900 hover:bg-ink-100"
            >
              {open ? <IconX size={24} /> : <IconMenu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 top-16 z-30 bg-white animate-fade-in lg:hidden overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="container-tight flex flex-col gap-1 py-6">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center justify-between rounded-md px-4 py-4 text-lg font-display font-medium tracking-tight transition-colors',
                    isActive
                      ? 'bg-forest-50 text-forest'
                      : 'text-ink-900 hover:bg-ink-50',
                  )
                }
              >
                {l.label}
                <IconArrowRight size={18} />
              </NavLink>
            ))}
            <div className="mt-6 flex flex-col gap-2">
              <Link to="/cotizar">
                <Button variant="primary" size="lg" fullWidth iconRight={<IconArrowRight />}>
                  Cotiza ahora
                </Button>
              </Link>
              <a
                href="https://wa.me/523300000000"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="lg" fullWidth iconLeft={<IconWhatsApp size={20} />}>
                  Hablar por WhatsApp
                </Button>
              </a>
            </div>
            <p className="mt-8 text-center text-xs text-ink-500">
              Av. Mariano Otero 405, Jardines del Sol, Zapopan, Jal.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
