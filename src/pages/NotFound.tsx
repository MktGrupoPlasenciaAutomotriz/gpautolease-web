import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { DotGrid } from '@/components/ui/BrandPattern';
import { IconArrowRight, IconWhatsApp } from '@/components/ui/Icon';

export default function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden bg-bg-subtle py-20">
      {/* Brand grid baseline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#1d1d1b_1px,transparent_1px),linear-gradient(to_bottom,#1d1d1b_1px,transparent_1px)] [background-size:80px_80px]"
      />
      <DotGrid
        cols={26}
        rows={10}
        gap={22}
        size={2.5}
        fade="radial"
        className="absolute inset-0 m-auto opacity-25"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-lime-200/30 blur-[120px]"
      />

      <div className="container-tight relative max-w-3xl">
        <Eyebrow marker="!">Error 404</Eyebrow>
        <p className="num-display mt-4 text-[clamp(6rem,18vw,12rem)] font-semibold tabular-nums leading-[0.85] tracking-[-0.04em] text-forest">
          404
        </p>
        <h1 className="mt-6 font-display font-semibold tracking-tight text-ink-900 text-fluid-h1 leading-[1.02]">
          Esta ruta no existe{' '}
          <span className="relative inline">
            <span className="relative z-10 text-forest">todavía</span>
            <span aria-hidden className="absolute inset-x-0 bottom-1 h-[0.18em] bg-lime-300/70 -z-0" />
          </span>
          <span className="text-ink-900">.</span>
        </h1>
        <p className="mt-7 max-w-xl text-lg text-ink-700 leading-relaxed">
          O la quitamos, o nunca existió, o tecleaste algo raro. Sin drama: aquí abajo está lo importante.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link to="/">
            <Button variant="primary" size="xl" iconRight={<IconArrowRight />}>
              Volver al inicio
            </Button>
          </Link>
          <Link to="/cotizar">
            <Button variant="secondary" size="xl">Cotizar mi auto</Button>
          </Link>
          <a
            href="https://wa.me/523300000000"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="xl" iconLeft={<IconWhatsApp size={18} />}>
              WhatsApp
            </Button>
          </a>
        </div>

        {/* Helpful links */}
        <div className="mt-14 grid gap-3 sm:grid-cols-3 max-w-2xl">
          <QuickLink to="/marcas" label="Catálogo" hint="13 marcas activas" />
          <QuickLink to="/por-que-arrendar" label="Por qué arrendar" hint="El caso fiscal" />
          <QuickLink to="/preguntas" label="Preguntas" hint="Soporte y dudas" />
        </div>
      </div>
    </div>
  );
}

function QuickLink({ to, label, hint }: { to: string; label: string; hint: string }) {
  return (
    <Link
      to={to}
      className="group flex items-center justify-between gap-3 rounded-md border border-ink-200/70 bg-white px-4 py-3.5 transition-all hover:border-forest hover:shadow-soft"
    >
      <div>
        <p className="text-sm font-semibold text-ink-900">{label}</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500">{hint}</p>
      </div>
      <IconArrowRight size={14} className="text-ink-400 transition-all group-hover:text-forest group-hover:translate-x-0.5" />
    </Link>
  );
}
