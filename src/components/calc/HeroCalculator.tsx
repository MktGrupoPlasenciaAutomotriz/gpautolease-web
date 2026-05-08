import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Slider } from '@/components/ui/Slider';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { Tooltip } from '@/components/ui/Tooltip';
import { HairlineDivider } from '@/components/ui/DataViz';
import { IconArrowRight } from '@/components/ui/Icon';
import { calcular } from '@/lib/calc';
import { fmtMXN } from '@/lib/format';
import { useCountUp } from '@/lib/hooks';
import { cn } from '@/lib/cn';

const PLAZOS = [
  { value: 24, label: '24m' },
  { value: 36, label: '36m' },
  { value: 48, label: '48m' },
  { value: 60, label: '60m' },
];

interface Props {
  className?: string;
}

/**
 * Fintech-style quote panel. Sharper geometry, dominant numbers, hairline
 * dividers. Numbers smoothly count up. The header uses a "live" pulse to
 * communicate that calculations update on input change.
 */
export function HeroCalculator({ className }: Props) {
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

  const deduccionAnual = result.arrendamiento.isrAhorradoAnual + result.arrendamiento.ivaAcreditableAnual;
  const capitalLibre = precio - result.pagoInicialMonto;

  const animMensualidad = useCountUp(result.arrendamiento.mensualidad, 500);
  const animDeduccion = useCountUp(deduccionAnual, 500);
  const animCapitalLibre = useCountUp(capitalLibre, 500);

  return (
    <div
      className={cn(
        'group relative overflow-hidden bg-white text-ink-900',
        'rounded-[14px] ring-1 ring-ink-200/70 shadow-[0_24px_60px_-20px_rgb(29_29_27_/_0.18),0_8px_24px_-12px_rgb(29_29_27_/_0.08)]',
        className,
      )}
    >
      {/* Subtle top brand strip */}
      <div className="h-1 bg-gradient-to-r from-forest via-forest-600 to-lime-500" />

      <div className="relative px-6 pt-6 pb-7 md:px-7 md:pt-7">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-500 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-500" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500">
              Cotización en vivo
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-wider text-ink-400">PFAE · 85%</span>
        </div>

        <div className="mt-5 space-y-5">
          <SliderRow
            label="Precio del auto"
            value={fmtMXN.format(precio)}
            min={250_000}
            max={1_500_000}
            step={10_000}
            current={precio}
            onChange={setPrecio}
            ariaLabel="Precio del auto"
            minLabel="$250K"
            maxLabel="$1.5M"
          />
          <SliderRow
            label="Pago inicial"
            value={`${Math.round(iniPct * 100)}% · ${fmtMXN.format(precio * iniPct)}`}
            min={0}
            max={30}
            step={1}
            current={iniPct * 100}
            onChange={(v) => setIniPct(v / 100)}
            ariaLabel="Pago inicial porcentaje"
            minLabel="0%"
            maxLabel="30%"
          />
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500">
              Plazo
            </label>
            <SegmentedControl
              options={PLAZOS}
              value={plazo}
              onChange={setPlazo}
              ariaLabel="Plazo en meses"
            />
          </div>
        </div>
      </div>

      <HairlineDivider />

      {/* Stats panel — number-dominant */}
      <div className="bg-bg-subtle/60 px-6 py-6 md:px-7">
        <div className="grid grid-cols-3 divide-x divide-ink-200/70">
          <BigStat
            label="Mensualidad"
            value={fmtMXN.format(animMensualidad)}
            sub={
              <Tooltip content="Cantidad antes de IVA. El IVA del 16% que pagas mensual lo acreditas contra el IVA que cobras a tus clientes.">
                + IVA
              </Tooltip>
            }
            position="left"
          />
          <BigStat
            label="Deduces al año"
            value={fmtMXN.format(animDeduccion)}
            sub={
              <Tooltip content="Suma del ISR ahorrado por deducir la mensualidad como gasto y el IVA acreditable mensual. Tu contador puede ajustarlo a tu régimen específico.">
                ISR + IVA
              </Tooltip>
            }
            accent
          />
          <BigStat
            label="Capital libre"
            value={fmtMXN.format(animCapitalLibre)}
            sub={
              <Tooltip content="Dinero que mantienes en tu negocio en lugar de inmovilizarlo en un activo que se devalúa. Comparado con comprar a contado al mismo precio.">
                vs comprar
              </Tooltip>
            }
            position="right"
          />
        </div>
      </div>

      <HairlineDivider />

      {/* CTAs */}
      <div className="px-6 pt-5 pb-6 md:px-7">
        <Link
          to={`/cotizar?precio=${precio}&inicial=${iniPct}&plazo=${plazo}`}
          className="group/cta flex h-12 w-full items-center justify-between rounded-md bg-forest px-5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-forest-700 active:scale-[0.99]"
        >
          <span>Ver cotización completa</span>
          <span className="flex items-center gap-1.5 text-lime-300">
            <span className="text-[11px] font-mono uppercase tracking-wider opacity-80">PDF</span>
            <IconArrowRight size={18} className="transition-transform group-hover/cta:translate-x-0.5" />
          </span>
        </Link>
        <a
          href={`https://wa.me/523300000000?text=${encodeURIComponent(
            `Hola, cotizo un auto de ${fmtMXN.format(precio)} a ${plazo} meses, inicial ${Math.round(iniPct * 100)}%. ¿Me ayudan?`,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-md text-sm font-medium text-ink-700 hover:text-forest transition-colors"
        >
          <span>O hablar por WhatsApp</span>
          <IconArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}

function SliderRow({
  label, value, min, max, step, current, onChange, ariaLabel, minLabel, maxLabel,
}: {
  label: string; value: string; min: number; max: number; step: number; current: number;
  onChange: (v: number) => void; ariaLabel: string; minLabel: string; maxLabel: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500">
          {label}
        </label>
        <span className="num-display text-[15px] font-semibold text-ink-900 tabular-nums">{value}</span>
      </div>
      <Slider
        value={current}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        ariaLabel={ariaLabel}
      />
      <div className="mt-1 flex justify-between font-mono text-[10px] tracking-wider text-ink-400 tabular-nums">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

function BigStat({
  label, value, sub, accent, position,
}: {
  label: string; value: string; sub?: React.ReactNode; accent?: boolean; position?: 'left' | 'right';
}) {
  return (
    <div className={cn('flex flex-col', position === 'left' ? 'pr-4' : position === 'right' ? 'pl-4' : 'px-4')}>
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-500">
        {label}
      </span>
      <span
        className={cn(
          'num-display mt-2 text-xl sm:text-2xl font-semibold leading-none tabular-nums',
          accent ? 'text-forest' : 'text-ink-900',
        )}
      >
        {value}
      </span>
      {sub && <span className="mt-1.5 text-[10px] text-ink-500">{sub}</span>}
    </div>
  );
}
