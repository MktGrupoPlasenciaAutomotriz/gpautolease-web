import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Slider } from '@/components/ui/Slider';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { IconArrowRight, IconArrowLeft, IconCheck, IconSparkle } from '@/components/ui/Icon';
import { MARCAS } from '@/data/marcas';
import { calcular, type TipoPersona } from '@/lib/calc';
import { fmtMXN } from '@/lib/format';
import { cn } from '@/lib/cn';

type Step = 1 | 2 | 3;

const PERSONAS: { value: TipoPersona; label: string; hint: string; recommended?: boolean }[] = [
  { value: 'pfae', label: 'PFAE', hint: 'Persona física con actividad empresarial', recommended: true },
  { value: 'pm', label: 'Persona moral', hint: 'Empresa con RFC empresarial' },
  { value: 'pf', label: 'Persona física', hint: 'Sin actividad empresarial' },
];

const PLAZOS = [
  { value: 24, label: '24 meses' },
  { value: 36, label: '36 meses' },
  { value: 48, label: '48 meses' },
  { value: 60, label: '60 meses' },
];

export default function Cotizar() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  // Pre-cargar de query string si vino del home calculator
  const initialPrecio = Number(params.get('precio')) || 580_000;
  const initialIni = Number(params.get('inicial')) || 0.10;
  const initialPlazo = Number(params.get('plazo')) || 36;

  const [step, setStep] = useState<Step>(1);
  const [tipo, setTipo] = useState<TipoPersona>('pfae');
  const [usoFiscal, setUsoFiscal] = useState(0.85);
  const [marca, setMarca] = useState<string | null>(null);
  const [modeloSlug, setModeloSlug] = useState<string | null>(null);
  const [plazo, setPlazo] = useState(initialPlazo);
  const [iniPct, setIniPct] = useState(initialIni);
  const [precio, setPrecio] = useState(initialPrecio);

  const marcaData = useMemo(() => MARCAS.find((m) => m.slug === marca), [marca]);
  const modeloData = useMemo(
    () => marcaData?.modelos.find((mo) => mo.slug === modeloSlug),
    [marcaData, modeloSlug],
  );

  // Si hay modelo seleccionado, sincroniza el precio
  const efectivePrecio = modeloData?.precioDesde ?? precio;
  const efectiveEcoVerde = modeloData?.hibridoEv ?? false;

  const result = useMemo(
    () =>
      calcular({
        precioAuto: efectivePrecio,
        pagoInicialPct: iniPct,
        plazoMeses: plazo,
        tipoPersona: tipo,
        usoFiscalPct: usoFiscal,
        esEcoVerde: efectiveEcoVerde,
      }),
    [efectivePrecio, iniPct, plazo, tipo, usoFiscal, efectiveEcoVerde],
  );

  const next = () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else {
      // Submit → ir al resultado con state
      navigate('/cotizar/resultado', {
        state: {
          tipo, usoFiscal, marca, modeloSlug, plazo, iniPct,
          precio: efectivePrecio,
          esEcoVerde: efectiveEcoVerde,
        },
      });
    }
  };

  const prev = () => setStep((s) => Math.max(1, (s - 1) as Step) as Step);

  // PM bypass
  if (tipo === 'pm' && step === 2) {
    return <EmpresaTrack onBack={() => { setTipo('pfae'); setStep(1); }} />;
  }

  return (
    <div className="bg-bg-subtle min-h-[calc(100vh-5rem)] py-10 md:py-16">
      <div className="container-tight max-w-3xl">
        <div className="mb-8">
          <Link to="/" className="text-sm text-ink-500 hover:text-forest">
            ← Inicio
          </Link>
        </div>

        <Progress step={step} />

        <div className="mt-8 animate-fade-in">
          {step === 1 && (
            <StepCard
              title="¿Cómo facturas?"
              subtitle="Esto nos ayuda a calcular tu deducción real."
            >
              <div className="grid gap-3">
                {PERSONAS.map((p) => {
                  const active = tipo === p.value;
                  return (
                    <button
                      key={p.value}
                      onClick={() => setTipo(p.value)}
                      className={cn(
                        'flex items-center justify-between gap-4 rounded-lg border-2 p-5 text-left transition-all',
                        active
                          ? 'border-forest bg-forest-50/50 shadow-soft'
                          : 'border-ink-200 bg-white hover:border-ink-300',
                      )}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display text-lg font-semibold tracking-tight text-ink-900">
                            {p.label}
                          </span>
                          {p.recommended && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-lime-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-lime-900">
                              <IconSparkle size={10} /> Recomendado
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-ink-600">{p.hint}</p>
                      </div>
                      <span
                        className={cn(
                          'flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all',
                          active
                            ? 'border-forest bg-forest text-white'
                            : 'border-ink-300 bg-white',
                        )}
                      >
                        {active && <IconCheck size={14} />}
                      </span>
                    </button>
                  );
                })}
              </div>

              {(tipo === 'pfae' || tipo === 'pf') && (
                <div className="mt-8 rounded-lg bg-white p-5 ring-1 ring-ink-200">
                  <div className="mb-2 flex items-baseline justify-between">
                    <label className="text-sm font-medium text-ink-800">
                      Uso del auto para tu actividad empresarial
                    </label>
                    <span className="num-display text-lg font-semibold text-forest">
                      {Math.round(usoFiscal * 100)}%
                    </span>
                  </div>
                  <Slider
                    value={usoFiscal * 100}
                    min={0}
                    max={100}
                    step={5}
                    onChange={(v) => setUsoFiscal(v / 100)}
                    ariaLabel="Uso fiscal porcentaje"
                  />
                  <p className="mt-2 text-xs text-ink-500">
                    Tu contador puede ajustar el % real al firmar contrato.
                  </p>
                </div>
              )}

              {tipo === 'pf' && (
                <div className="mt-6 rounded-lg border border-warning/30 bg-warning/5 p-5">
                  <p className="text-sm font-semibold text-warning">
                    Heads-up honesto
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700">
                    El arrendamiento puro está pensado para PFAE y empresas porque
                    el beneficio principal es la deducción fiscal. Si compras como
                    persona física pura, probablemente te conviene más un crédito
                    automotriz tradicional. Aquí continúas si quieres, o te
                    sugerimos opciones de financiamiento honestas.
                  </p>
                </div>
              )}
            </StepCard>
          )}

          {step === 2 && (
            <StepCard
              title="¿Qué auto quieres?"
              subtitle="Elige tu marca y modelo. Si no lo ves, mándalo por WhatsApp."
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-ink-800">Marca</label>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {MARCAS.map((m) => (
                    <button
                      key={m.slug}
                      onClick={() => {
                        setMarca(m.slug);
                        setModeloSlug(null);
                      }}
                      className={cn(
                        'rounded-md border-2 px-3 py-2.5 text-sm font-medium transition-all',
                        marca === m.slug
                          ? 'border-forest bg-forest-50 text-forest'
                          : 'border-ink-200 bg-white text-ink-700 hover:border-ink-300',
                      )}
                    >
                      {m.nombre}
                    </button>
                  ))}
                </div>
              </div>

              {marcaData && (
                <div className="mt-6 animate-fade-in">
                  <label className="mb-2 block text-sm font-medium text-ink-800">Modelo</label>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {marcaData.modelos.map((mo) => (
                      <button
                        key={mo.slug}
                        onClick={() => setModeloSlug(mo.slug)}
                        className={cn(
                          'flex items-center justify-between rounded-md border-2 px-4 py-3 text-left transition-all',
                          modeloSlug === mo.slug
                            ? 'border-forest bg-forest-50/50'
                            : 'border-ink-200 bg-white hover:border-ink-300',
                        )}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-ink-900">{mo.nombre}</span>
                            {mo.hibridoEv && (
                              <span className="rounded-full bg-lime-100 px-1.5 py-0.5 text-[10px] font-semibold text-lime-900">
                                EV/HEV
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-ink-500">
                            Desde {fmtMXN.format(mo.precioDesde)}
                          </span>
                        </div>
                        <span className="text-[11px] uppercase tracking-wider text-ink-400">
                          {mo.tipo}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {modeloData && (
                <div className="mt-6 rounded-lg bg-white p-5 ring-1 ring-ink-200 animate-fade-in">
                  <div className="mb-2 flex items-baseline justify-between">
                    <label className="text-sm font-medium text-ink-800">
                      Precio de referencia
                    </label>
                    <span className="num-display text-lg font-semibold text-forest">
                      {fmtMXN.format(precio)}
                    </span>
                  </div>
                  <Slider
                    value={precio}
                    min={modeloData.precioDesde * 0.85}
                    max={modeloData.precioDesde * 1.6}
                    step={5_000}
                    onChange={setPrecio}
                    ariaLabel="Precio del auto"
                  />
                  <p className="mt-2 text-xs text-ink-500">
                    Ajusta según versión específica. El precio final se confirma con el concesionario.
                  </p>
                </div>
              )}
            </StepCard>
          )}

          {step === 3 && (
            <StepCard
              title="Términos del contrato"
              subtitle="Plazo y pago inicial. Lo demás lo afinamos en contrato."
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-ink-800">Plazo</label>
                <SegmentedControl
                  options={PLAZOS}
                  value={plazo}
                  onChange={setPlazo}
                  size="lg"
                  ariaLabel="Plazo en meses"
                />
              </div>

              <div className="mt-6">
                <div className="mb-2 flex items-baseline justify-between">
                  <label className="text-sm font-medium text-ink-800">Pago inicial</label>
                  <span className="num-display text-lg font-semibold text-forest">
                    {Math.round(iniPct * 100)}% · {fmtMXN.format(efectivePrecio * iniPct)}
                  </span>
                </div>
                <Slider
                  value={iniPct * 100}
                  min={0}
                  max={30}
                  step={1}
                  onChange={(v) => setIniPct(v / 100)}
                  ariaLabel="Pago inicial"
                />
                <div className="mt-1 flex justify-between text-[11px] text-ink-400 tabular-nums">
                  <span>0%</span>
                  <span>30%</span>
                </div>
              </div>

              <div className="mt-8 rounded-lg bg-forest-50 p-5 ring-1 ring-forest-100">
                <p className="text-xs font-semibold uppercase tracking-wider text-forest">
                  Estimación con tus datos
                </p>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  <Mini label="Mensualidad" value={fmtMXN.format(result.arrendamiento.mensualidad)} sub="+ IVA" />
                  <Mini
                    label="Deducción anual"
                    value={fmtMXN.format(result.arrendamiento.isrAhorradoAnual + result.arrendamiento.ivaAcreditableAnual)}
                    accent
                  />
                  <Mini label="Plazo" value={`${plazo} meses`} />
                </div>
              </div>
            </StepCard>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            {step > 1 ? (
              <Button variant="ghost" size="lg" onClick={prev} iconLeft={<IconArrowLeft size={18} />}>
                Atrás
              </Button>
            ) : (
              <Link to="/" className="inline-block">
                <Button variant="ghost" size="lg">Cancelar</Button>
              </Link>
            )}
            <Button
              variant="primary"
              size="lg"
              onClick={next}
              iconRight={<IconArrowRight />}
              disabled={step === 2 && !modeloSlug}
            >
              {step === 3 ? 'Ver cotización completa' : 'Siguiente'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Progress({ step }: { step: Step }) {
  const labels = ['Tipo de persona', 'Auto', 'Términos'];
  return (
    <div>
      <div className="flex items-center gap-1.5">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={cn(
              'h-1 flex-1 rounded-full transition-colors',
              step >= s ? 'bg-forest' : 'bg-ink-200',
            )}
          />
        ))}
      </div>
      <div className="mt-3 flex justify-between text-xs">
        {labels.map((l, i) => (
          <span
            key={l}
            className={cn(
              'flex-1 text-center font-medium',
              i === 0 && 'text-left',
              i === labels.length - 1 && 'text-right',
              step >= i + 1 ? 'text-forest' : 'text-ink-400',
            )}
          >
            {i + 1}. {l}
          </span>
        ))}
      </div>
    </div>
  );
}

function StepCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <Card variant="default" padded="lg">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-ink-900 md:text-4xl">{title}</h1>
      <p className="mt-2 text-ink-600">{subtitle}</p>
      <div className="mt-8">{children}</div>
    </Card>
  );
}

function Mini({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-500">{label}</p>
      <p
        className={cn(
          'num-display mt-1 text-lg font-semibold leading-tight',
          accent ? 'text-forest' : 'text-ink-900',
        )}
      >
        {value}
      </p>
      {sub && <p className="mt-0.5 text-[10px] text-ink-500">{sub}</p>}
    </div>
  );
}

function EmpresaTrack({ onBack }: { onBack: () => void }) {
  return (
    <div className="bg-bg-subtle min-h-[calc(100vh-5rem)] py-10 md:py-16">
      <div className="container-tight max-w-2xl">
        <Card variant="default" padded="lg">
          <Eyebrow marker="—">Empresas / Persona moral</Eyebrow>
          <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink-900 md:text-4xl">
            Te asignamos un asesor dedicado
          </h1>
          <p className="mt-3 text-ink-600 leading-relaxed">
            Para empresas con flotilla de 5 o más unidades, nuestro proceso es a la
            medida: condiciones por volumen, contrato master, integración con tu
            departamento contable. Cuéntanos lo básico y te contactamos en menos
            de 24 hrs.
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Form submit pendiente de cableado al Worker');
            }}
          >
            <FormField label="Nombre" name="nombre" required />
            <FormField label="Empresa" name="empresa" required />
            <FormField label="Email" name="email" type="email" required />
            <FormField label="WhatsApp" name="wa" type="tel" required />
            <FormField label="Unidades estimadas" name="unidades" type="number" required hint="Aproximado" />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-800">
                ¿Qué necesitas?
              </label>
              <textarea
                rows={4}
                className="w-full rounded-md border border-ink-200 bg-white px-3.5 py-2.5 outline-none focus:border-forest focus:shadow-focus-forest"
              />
            </div>
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <Button type="button" variant="ghost" onClick={onBack}>
                Volver
              </Button>
              <Button type="submit" variant="primary" size="lg" iconRight={<IconArrowRight />}>
                Solicitar asesor
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

function FormField({
  label,
  name,
  type = 'text',
  required,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink-800">
        {label}
        {required && <span className="ml-0.5 text-danger">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full h-11 rounded-md border border-ink-200 bg-white px-3.5 outline-none focus:border-forest focus:shadow-focus-forest"
      />
      {hint && <p className="mt-1 text-xs text-ink-500">{hint}</p>}
    </div>
  );
}
