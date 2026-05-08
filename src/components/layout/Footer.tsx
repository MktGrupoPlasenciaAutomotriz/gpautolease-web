import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { IconWhatsApp } from '@/components/ui/Icon';

export function Footer() {
  return (
    <footer className="bg-forest-950 text-white/85">
      <div className="container-tight py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="white" />
            <p className="mt-4 font-helvetica text-sm text-white/70">
              Tu aliado en movimiento.
            </p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/70">
              Arrendamiento puro para PFAE y empresas. Respaldados por Grupo
              Plasencia, +75 años en movilidad en México.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://wa.me/523300000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-lime-500 hover:text-ink-900 transition-all"
                aria-label="WhatsApp"
              >
                <IconWhatsApp size={20} />
              </a>
              <a
                href="https://instagram.com/gpautolease"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-lime-500 hover:text-ink-900 transition-all"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-4 font-display text-sm font-semibold text-white tracking-tight">
              Producto
            </h4>
            <ul className="space-y-2.5 text-sm">
              <FooterLink to="/cotizar">Cotizar</FooterLink>
              <FooterLink to="/marcas">Marcas</FooterLink>
              <FooterLink to="/por-que-arrendar">Por qué arrendar</FooterLink>
              <FooterLink to="/como-funciona">Cómo funciona</FooterLink>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-4 font-display text-sm font-semibold text-white tracking-tight">
              Soporte
            </h4>
            <ul className="space-y-2.5 text-sm">
              <FooterLink to="/preguntas">Preguntas</FooterLink>
              <FooterLink to="/contacto">Contacto</FooterLink>
              <FooterLink to="/tramite">Iniciar trámite</FooterLink>
              <li>
                <a
                  href="https://wa.me/523300000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-lime-300 transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="mb-4 font-display text-sm font-semibold text-white tracking-tight">
              GP Autolease
            </h4>
            <ul className="space-y-2.5 text-sm">
              <FooterLink to="/nosotros">Nosotros</FooterLink>
              <FooterLink to="/aviso-de-privacidad">Aviso de privacidad</FooterLink>
              <FooterLink to="/terminos">Términos y condiciones</FooterLink>
              <FooterLink to="/transparencia">Transparencia</FooterLink>
            </ul>
            <address className="mt-6 text-sm not-italic text-white/70 leading-relaxed">
              Av. Mariano Otero 405,<br />
              Jardines del Sol, 45050<br />
              Zapopan, Jal.
            </address>
            <a
              href="mailto:hola@gpautolease.com"
              className="mt-3 inline-block text-sm text-white/85 hover:text-lime-300 transition-colors"
            >
              hola@gpautolease.com
            </a>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} GP Autolease. Una marca del Grupo Plasencia.
          </p>
          <p className="text-xs text-white/40 font-helvetica">
            75 años en movilidad
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        to={to}
        className="text-white/70 hover:text-lime-300 transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}
