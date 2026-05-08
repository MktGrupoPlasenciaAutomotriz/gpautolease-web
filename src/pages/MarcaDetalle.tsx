import { Link, useParams, Navigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { IconArrowRight, IconArrowLeft, IconWhatsApp } from '@/components/ui/Icon';
import { MARCAS } from '@/data/marcas';
import { fmtMXN } from '@/lib/format';

const BASE = import.meta.env.BASE_URL ?? '/';

export default function MarcaDetalle() {
  const { marca: slug } = useParams<{ marca: string }>();
  const marca = MARCAS.find((m) => m.slug === slug);
  if (!marca) return <Navigate to="/marcas" replace />;

  const desde = Math.min(...marca.modelos.map((mo) => mo.precioDesde));

  return (
    <div className="bg-bg-subtle min-h-[calc(100vh-5rem)] py-14 md:py-20">
      <div className="container-tight">
        <Link
          to="/marcas"
          className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-forest transition-colors"
        >
          <IconArrowLeft size={16} />
          Todas las marcas
        </Link>

        <div className="mt-8 grid gap-8 md:grid-cols-12 items-end">
          <div className="md:col-span-7">
            <Eyebrow marker="—">{marca.modelos.length} modelos</Eyebrow>
            <div className="mt-6 flex items-end gap-6 flex-wrap">
              <img
                src={`${BASE}img/marcas/${marca.slug}.svg`}
                alt={marca.nombre}
                className="h-20 md:h-24 w-auto max-w-[280px] object-contain [filter:grayscale(1)_brightness(0.2)]"
              />
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-ink-500 pb-3">
                desde<br />
                <span className="num-display text-base font-semibold tabular-nums text-forest tracking-tight not-italic mt-1 inline-block">
                  {fmtMXN.format(desde)}
                </span>
              </div>
            </div>
            <p className="mt-6 text-lg text-ink-600 leading-relaxed max-w-xl">
              Arrenda cualquier modelo de {marca.nombre} con esquema PFAE o empresa.
              Cotización en 60 segundos, aprobación en menos de 48 hrs.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {marca.modelos.map((mo) => (
            <Card
              key={mo.slug}
              variant="default"
              padded="lg"
              className="group flex flex-col justify-between hover:shadow-elevated transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900">
                    {mo.nombre}
                  </h2>
                  {mo.hibridoEv && (
                    <span className="rounded-full bg-lime-100 px-2 py-0.5 text-[10px] font-semibold text-lime-900">
                      EV/HEV
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs uppercase tracking-wider text-ink-500">{mo.tipo}</p>

                <div className="mt-6 border-t border-ink-100 pt-4">
                  <p className="text-xs text-ink-500">Precio de referencia</p>
                  <p className="num-display mt-1 text-2xl font-semibold text-forest">
                    desde {fmtMXN.format(mo.precioDesde)}
                  </p>
                </div>
              </div>
              <Link to={`/cotizar?precio=${mo.precioDesde}&inicial=0.10&plazo=36`}>
                <Button variant="primary" size="md" fullWidth iconRight={<IconArrowRight />} className="mt-6">
                  Cotizar este modelo
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        <div className="mt-16 rounded-xl bg-white p-8 ring-1 ring-ink-200 text-center">
          <p className="font-display text-xl font-semibold text-ink-900">
            ¿No ves el modelo o versión que buscas?
          </p>
          <p className="mt-2 text-ink-600">
            Pregunta por WhatsApp y te lo cotizamos en menos de 30 minutos.
          </p>
          <a
            href={`https://wa.me/523300000000?text=Hola,%20busco%20un%20modelo%20específico%20de%20${marca.nombre}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block"
          >
            <Button variant="primary" size="lg" iconLeft={<IconWhatsApp size={20} />}>
              Pregunta por WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
