import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Slider } from '@/components/ui/Slider';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { Button } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';
import { IconArrowRight, IconSparkle } from '@/components/ui/Icon';
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

  const deduccionAnual = result.arrendamiento.isrAhorradoAnual + result.arrendamiento.ivaAcreditableAnual;
  // Capital libre = lo que NO sale de tu negocio comparado con comprar a contado.
  // Es la métrica honesta: arrendamiento conserva tu capital, comprar lo inmoviliza.
  const capitalLibre = precio - result.pagoInicialMonto;

  const animMensualidad = useCountUp(result.arrendamiento.mensualidad, 500);
  const animDeduccion = useCountUp(deduccionAnual, 500);
  const animCapitalLibre = useCountUp(capitalLibre, 500);

  const isInverse = variant === 'hero';

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl',
        isInverse
          ? 'bg-white text-ink-900 shadow-elevated ring-1 ring-ink-100'
          : 'bg-white border border-ink-200',
        className,
      )}
    >
      {/* Soft gradient corner accent */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-lime-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-12 -bottom-12 h-48 w-48 rounded-full bg-forest-100/60 blur-3xl" />

      <div className="relative p-6 md:p-8">
        <div className="mb-1 flex items-center justify-between gap-3">
          <h3 className="font-display text-lg font-semibold tracking-tight text-ink-900">
            Calcula tu mensualidad
          </h3>
          <span className="rounded-full bg-forest-50 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-forest">
            PFAE · 85% uso
          </span>
        </div>
        <p className="text-xs text-ink-500">
          Estimación referencial. Detalle fiscal completo en el cotizador.
        </p>

        <div className="mt-6 space-y-5">
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
            value={fmtMXN.format(animMensualidad)}
            subElement={
              <Tooltip content="Cantidad antes de IVA. El IVA del 16% que pagas mensual lo acreditas contra el IVA que cobras a tus clientes.">
                + IVA
              </Tooltip>
            }
          />
          <Stat
            label="Deduces al año"
            value={fmtMXN.format(animDeduccion)}
            subElement={
              <Tooltip content="Suma del ISR ahorrado por deducir la mensualidad como gasto y el IVA acreditable mensual. Tu contador puede ajustarlo a tu régimen específico.">
                ISR + IVA
              </Tooltip>
            }
            accent
          />
          <Stat
            label="Capital libre"
            value={fmtMXN.format(animCapitalLibre)}
            subElement={
              <Tooltip content="Dinero que mantienes en tu negocio en lugar de inmovilizarlo en un activo que se devalúa. Comparado con comprar a contado al mismo precio.">
                vs comprar
              </Tooltip>
            }
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

        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-ink-400">
          <IconSparkle size={12} className="text-lime-500" />
          Sin pedirte teléfono hasta que tú quieras.
        </p>
      </div>
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  current,
  onChange,
  ariaLabel,
  minLabel,
  maxLabel,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  current: number;
  onChange: (v: number) => void;
  ariaLabel: string;
  minLabel: string;
  maxLabel: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <label className="text-sm font-medium text-ink-800">{label}</label>
        <span className="num-display text-lg font-semibold text-forest tabular-nums">{value}</span>
      </div>
      <Slider
        value={current}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        ariaLabel={ariaLabel}
      />
      <div className="mt-1 flex justify-between text-[11px] text-ink-400 tabular-nums">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  subElement,
  accent,
}: {
  label: string;
  value: string;
  subElement?: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-500">{label}</span>
      <span
        className={cn(
          'num-display mt-1 text-base sm:text-lg font-semibold leading-tight tabular-nums',
          accent ? 'text-forest' : 'text-ink-900',
        )}
      >
        {value}
      </span>
      {subElement && <span className="mt-0.5 text-[10px] text-ink-500">{subElement}</span>}
    </div>
  );
}
