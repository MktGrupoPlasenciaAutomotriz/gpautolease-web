import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { IconArrowRight, IconWhatsApp } from '@/components/ui/Icon';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center bg-bg-subtle py-20">
      <div className="container-tight max-w-3xl text-center">
        <p className="num-display text-7xl font-semibold text-lime-500/70 md:text-9xl">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-900 md:text-5xl">
          Esta ruta no existe (todavía)
        </h1>
        <p className="mt-4 text-lg text-ink-600">
          O la quitamos, o nunca existió, o tecleaste algo raro. Sin drama: aquí abajo lo importante.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/">
            <Button variant="primary" size="lg" iconRight={<IconArrowRight />}>
              Volver al inicio
            </Button>
          </Link>
          <Link to="/cotizar">
            <Button variant="secondary" size="lg">Cotizar mi auto</Button>
          </Link>
          <a
            href="https://wa.me/523300000000"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="lg" iconLeft={<IconWhatsApp size={18} />}>
              WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
