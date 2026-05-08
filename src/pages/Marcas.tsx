import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { IconArrowRight, IconWhatsApp } from '@/components/ui/Icon';
import { MARCAS, totalModelos, type Modelo } from '@/data/marcas';
import { fmtMXN } from '@/lib/format';
import { cn } from '@/lib/cn';

const BASE = import.meta.env.BASE_URL ?? '/';

const TIPOS: { value: Modelo['tipo'] | 'all'; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'sedan', label: 'Sedanes' },
  { value: 'suv', label: 'SUV' },
  { value: 'pickup', label: 'Pickups' },
  { value: 'hatch', label: 'Hatchbacks' },
];

export default function Marcas() {
  const [filter, setFilter] = useState<Modelo['tipo'] | 'all'>('all');
  const [evOnly, setEvOnly] = useState(false);

  const filteredMarcas = MARCAS.map((m) => ({
    ...m,
    modelos: m.modelos.filter((mo) => {
      if (filter !== 'all' && mo.tipo !== filter) return false;
      if (evOnly && !mo.hibridoEv) return false;
      return true;
    }),
  })).filter((m) => m.modelos.length > 0);

  return (
    <div className="bg-bg-subtle min-h-[calc(100vh-5rem)] py-14 md:py-20">
      <div className="container-tight">
        <div className="max-w-3xl">
          <Eyebrow marker="—">Catálogo</Eyebrow>
          <h1 className="mt-6 font-display font-semibold tracking-tight text-ink-900 text-fluid-h1 leading-[1.02]">
            Las marcas que arriendas con GP Autolease
          </h1>
          <p className="mt-5 text-lg text-ink-600 leading-relaxed">
            {MARCAS.length} marcas activas, +{totalModelos} modelos. Si no ves la marca o
            modelo que buscas, mándanos un WhatsApp y la conseguimos.
          </p>
        </div>

        {/* Filtros */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          {TIPOS.map((t) => (
            <button
              key={t.value}
              onClick={() => setFilter(t.value)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-all',
                filter === t.value
                  ? 'bg-forest text-white'
                  : 'bg-white text-ink-700 ring-1 ring-ink-200 hover:ring-ink-300',
              )}
            >
              {t.label}
            </button>
          ))}
          <button
            onClick={() => setEvOnly((v) => !v)}
            className={cn(
              'ml-1 rounded-full px-4 py-2 text-sm font-medium transition-all',
              evOnly
                ? 'bg-lime-500 text-ink-900'
                : 'bg-white text-ink-700 ring-1 ring-ink-200 hover:ring-ink-300',
            )}
          >
            ⚡ Híbridos / EV
          </button>
        </div>

        {/* Grid de marcas */}
        <div className="mt-10 space-y-12">
          {filteredMarcas.map((m) => (
            <section key={m.slug}>
              <div className="mb-5 flex items-end justify-between gap-4">
                <div className="flex items-baseline gap-4">
                  <img
                    src={`${BASE}img/marcas/${m.slug}.svg`}
                    alt={m.nombre}
                    className="h-7 w-auto max-w-[140px] object-contain [filter:grayscale(1)_brightness(0.4)] opacity-90"
                    loading="lazy"
                  />
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-500">
                    {m.modelos.length} modelos
                  </span>
                </div>
                <Link
                  to={`/marcas/${m.slug}`}
                  className="hidden text-sm font-medium text-forest hover:text-forest-700 sm:inline-flex sm:items-center sm:gap-1"
                >
                  Ver todos
                  <IconArrowRight size={14} />
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {m.modelos.map((mo) => (
                  <Card
                    key={mo.slug}
                    variant="default"
                    padded="md"
                    className="group flex flex-col justify-between hover:shadow-elevated transition-shadow"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-xl font-semibold tracking-tight text-ink-900">
                            {mo.nombre}
                          </h3>
                          <p className="mt-0.5 text-xs uppercase tracking-wider text-ink-500">
                            {mo.tipo}
                          </p>
                        </div>
                        {mo.hibridoEv && (
                          <span className="rounded-full bg-lime-100 px-2 py-0.5 text-[10px] font-semibold text-lime-900">
                            EV/HEV
                          </span>
                        )}
                      </div>
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-xs text-ink-500">desde</span>
                        <span className="num-display text-xl font-semibold text-forest">
                          {fmtMXN.format(mo.precioDesde)}
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/cotizar?precio=${mo.precioDesde}&inicial=0.10&plazo=36`}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-forest hover:text-forest-700 self-start"
                    >
                      Cotizar este modelo
                      <IconArrowRight size={14} />
                    </Link>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>

        {filteredMarcas.length === 0 && (
          <div className="mt-12 rounded-xl border-2 border-dashed border-ink-300 bg-white p-10 text-center">
            <p className="font-display text-xl font-semibold text-ink-900">
              No hay modelos con esos filtros
            </p>
            <p className="mt-2 text-ink-600">Prueba a quitar algún filtro o pregunta por WhatsApp.</p>
          </div>
        )}

        {/* CTA inferior */}
        <Card variant="forest" padded="lg" className="mt-16 text-center md:flex md:items-center md:justify-between md:text-left">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
              ¿No ves la marca o modelo que buscas?
            </h2>
            <p className="mt-2 text-white/80">
              Tenemos acceso a +15 marcas. Pregunta y te conseguimos cotización.
            </p>
          </div>
          <a
            href="https://wa.me/523300000000?text=Hola,%20busco%20una%20marca%20que%20no%20veo%20en%20el%20catálogo"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block md:mt-0 md:ml-6"
          >
            <Button variant="lime" size="lg" iconLeft={<IconWhatsApp size={20} />}>
              Pregunta por WhatsApp
            </Button>
          </a>
        </Card>
      </div>
    </div>
  );
}
