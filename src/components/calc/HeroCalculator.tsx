import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Slider } from '@/components/ui/Slider';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { Button } from '@/components/ui/Button';
import { IconArrowRight } from '@/components/ui/Icon';
import { calcular } from '@/lib/calc';
import { fmtMXN } from '@/lib/format';
import { cn } from '@/lib/cn';

const PLAZOS = [
  { value: 24, label: '24m' },
  { value: 36, label: '36m' },
  { value: 48, label: '48m' },
  { value: 60, label: '60m' },
];

interface Props {
  className?: string;
  variant?: 'hero' | 'standalone';
}

export function HeroCalculator({ className, variant = 'hero' }: Props) {
  const [precio, setPrecio] = useState(580_000);
  const [iniPct, setIniPct] = useState(0.10);
  const [plazo, setPlazo] = useState(36);

  const result = useMemo(
    () =>
      calcular({
        precioAuto: precio,
        pagoInicialPct: iniPct,
        plazoMeses: plazo,
        tipoPersona: 'pfae',
        usoFiscalPct: 0.85,
      }),
    [precio, iniPct, plazo],
  );

  const ahorroVsCredito = result.credito.flujoNetoTotal - result.arrendamiento.flujoNetoTotal;

  const isInverse = variant === 'hero';

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl',
        isInverse
          ? 'bg-white text-ink-900 shadow-elevated'
          : 'bg-white border border-ink-200',
        className,
      )}
    >
      {/* Soft gradient corner accent */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-lime-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-12 -bottom-12 h-48 w-48 rounded-full bg-forest-100/60 blur-3xl" />

      <div className="relative p-6 md:p-8">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold tracking-tight text-ink-900">
            Calcula tu mensualidad
          </h3>
          <span className="rounded-full bg-forest-50 px-2.5 py-1 text-[11px] font-semibold text-forest tracking-wide">
            PFAE · 85% uso
          </span>
        </div>
        <p className="text-xs text-ink-500">
          Estimación referencial. El detalle fiscal completo en el cotizador.
        </p>

        <div className="mt-6 space-y-5">
          {/* Precio del auto */}
          <div>
            <div className="mb-2 flex items-baseline justify-between">
              <label className="text-sm font-medium text-ink-800">Precio del auto</label>
              <span className="num-display text-lg font-semibold text-forest">
                {fmtMXN.format(precio)}
              </span>
            </div>
            <Slider
              value={precio}
              min={250_000}
              max={1_500_000}
              step={10_000}
              onChange={setPrecio}
              ariaLabel="Precio del auto"
            />
            <div className="mt-1 flex justify-between text-[11px] text-ink-400 tabular-nums">
              <span>$250K</span>
              <span>$1.5M</span>
            </div>
          </div>

          {/* Pago inicial */}
          <div>
            <div className="mb-2 flex items-baseline justify-between">
              <label className="text-sm font-medium text-ink-800">Pago inicial</label>
              <span className="num-display text-lg font-semibold text-forest">
                {Math.round(iniPct * 100)}% · {fmtMXN.format(precio * iniPct)}
              </span>
            </div>
            <Slider
              value={iniPct * 100}
              min={0}
              max={30}
              step={1}
              onChange={(v) => setIniPct(v / 100)}
              ariaLabel="Pago inicial porcentaje"
            />
            <div className="mt-1 flex justify-between text-[11px] text-ink-400 tabular-nums">
              <span>0%</span>
              <span>30%</span>
            </div>
          </div>

          {/* Plazo */}
          <div>
            <label className="mb-2 block text-sm font-medium text-ink-800">Plazo</label>
            <SegmentedControl
              options={PLAZOS}
              value={plazo}
              onChange={setPlazo}
              ariaLabel="Plazo en meses"
            />
          </div>
        </div>

        {/* Resultados */}
        <div className="mt-7 grid grid-cols-3 gap-3 rounded-xl bg-ink-50/80 p-4 ring-1 ring-ink-100">
          <Stat
            label="Mensualidad"
            value={fmtMXN.format(result.arrendamiento.mensualidad)}
            sub="+ IVA"
          />
          <Stat
            label="Deduces al año"
            value={fmtMXN.format(result.arrendamiento.isrAhorradoAnual + result.arrendamiento.ivaAcreditableAnual)}
            sub="ISR + IVA"
            accent
          />
          <Stat
            label="Vs. crédito"
            value={fmtMXN.format(Math.max(0, ahorroVsCredito))}
            sub={`a ${plazo} meses`}
          />
        </div>

        <div className="mt-6 grid gap-2 sm:grid-cols-[1fr_auto]">
          <Link to={`/cotizar?precio=${precio}&inicial=${iniPct}&plazo=${plazo}`}>
            <Button variant="primary" size="lg" fullWidth iconRight={<IconArrowRight />}>
              Ver cotización completa
            </Button>
          </Link>
          <a
            href={`https://wa.me/523300000000?text=${encodeURIComponent(
              `Hola, cotizo un auto de ${fmtMXN.format(precio)} a ${plazo} meses, inicial ${Math.round(iniPct * 100)}%. ¿Me ayudan?`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" size="lg" fullWidth>
              WhatsApp
            </Button>
          </a>
        </div>

        <p className="mt-3 text-center text-[11px] text-ink-400 leading-relaxed">
          Sin compromiso. Sin pedirte teléfono hasta que tú quieras.
        </p>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-500">
        {label}
      </span>
      <span
        className={cn(
          'num-display mt-1 text-base sm:text-lg font-semibold leading-tight',
          accent ? 'text-forest' : 'text-ink-900',
        )}
      >
        {value}
      </span>
      {sub && <span className="mt-0.5 text-[10px] text-ink-500">{sub}</span>}
    </div>
  );
}
