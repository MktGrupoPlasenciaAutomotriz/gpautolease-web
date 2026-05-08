import { useLocation, Navigate, Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import { Button } from '@/components/ui/Button';
import { IconArrowRight, IconDownload, IconWhatsApp, IconCheck, IconSparkle } from '@/components/ui/Icon';
import { calcular, type TipoPersona } from '@/lib/calc';
import { fmtMXN } from '@/lib/format';
import { MARCAS } from '@/data/marcas';
import { cn } from '@/lib/cn';

interface ResultState {
  tipo: TipoPersona;
  usoFiscal: number;
  marca: string | null;
  modeloSlug: string | null;
  plazo: number;
  iniPct: number;
  precio: number;
  esEcoVerde: boolean;
}

export default function CotizarResultado() {
  const location = useLocation();
  const state = location.state as ResultState | null;

  if (!state) return <Navigate to="/cotizar" replace />;

  const marcaData = MARCAS.find((m) => m.slug === state.marca);
  const modeloData = marcaData?.modelos.find((mo) => mo.slug === state.modeloSlug);

  const result = calcular({
    precioAuto: state.precio,
    pagoInicialPct: state.iniPct,
    plazoMeses: state.plazo,
    tipoPersona: state.tipo,
    usoFiscalPct: state.usoFiscal,
    esEcoVerde: state.esEcoVerde,
  });

  const ahorroVsCredito = Math.max(0, result.credito.flujoNetoTotal - result.arrendamiento.flujoNetoTotal);
  const aniosCompletos = state.plazo / 12;
  const deduccionTotal =
    (result.arrendamiento.isrAhorradoAnual + result.arrendamiento.ivaAcreditableAnual) *
    aniosCompletos;

  const handleDownloadPDF = () => {
    // TODO: Cablear con endpoint Worker /api/cotizacion/pdf
    alert('Generación de PDF pendiente. En producción esto descarga un PDF con el desglose fiscal completo.');
  };

  const waMessage = encodeURIComponent(
    `Hola, cotizo ${marcaData?.nombre ?? ''} ${modeloData?.nombre ?? 'auto'} a ${state.plazo} meses, ` +
      `inicial ${Math.round(state.iniPct * 100)}%. Mi mensualidad estimada es ${fmtMXN.format(
        result.arrendamiento.mensualidad,
      )}. ¿Podemos avanzar?`,
  );

  return (
    <div className="bg-bg-subtle min-h-[calc(100vh-5rem)] py-10 md:py-16">
      <div className="container-tight max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/cotizar" className="text-sm text-ink-500 hover:text-forest">
            ← Editar parámetros
          </Link>
          <Pill variant="lime" icon={<IconSparkle size={12} />}>
            Cotización lista
          </Pill>
        </div>

        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink-900 md:text-5xl">
          Tu cotización para{' '}
          <span className="text-forest">
            {marcaData?.nombre} {modeloData?.nombre ?? 'tu auto'}
          </span>
        </h1>
        <p className="mt-3 text-ink-600">
          {state.tipo === 'pfae' ? 'PFAE' : state.tipo === 'pm' ? 'Persona moral' : 'Persona física'} ·{' '}
          {state.plazo} meses · inicial {fmtMXN.format(state.precio * state.iniPct)} ·{' '}
          uso fiscal {Math.round(state.usoFiscal * 100)}%
        </p>

        {/* HERO STATS */}
        <Card variant="forest" padded="lg" className="mt-8 relative overflow-hidden">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-lime-400/20 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-3">
            <BigStat
              label="Mensualidad"
              value={fmtMXN.format(result.arrendamiento.mensualidad)}
              sub={`${fmtMXN.format(result.arrendamiento.mensualidadConIVA)} con IVA`}
            />
            <BigStat
              label="Deduces al año"
              value={fmtMXN.format(
                result.arrendamiento.isrAhorradoAnual + result.arrendamiento.ivaAcreditableAnual,
              )}
              sub="ISR + IVA acreditable"
              accent
            />
            <BigStat
              label={`Ahorras vs crédito en ${state.plazo} meses`}
              value={fmtMXN.format(ahorroVsCredito)}
              sub="flujo neto post-impuestos"
            />
          </div>
        </Card>

        {/* COMPARATIVA */}
        <Card variant="default" padded="lg" className="mt-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900 md:text-3xl">
            Comparativa lado a lado
          </h2>
          <p className="mt-2 text-sm text-ink-600">
            Lo que pagas, lo que deduces y lo que te queda al final del plazo en cada escenario.
          </p>

          <div className="mt-6 overflow-x-auto -mx-2 sm:mx-0">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200">
                  <th className="py-3 px-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-500"></th>
                  <Th highlight>Arrendamiento</Th>
                  <Th>Crédito</Th>
                  <Th>Contado</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                <Row label="Pago inicial" forest credito={result.credito.pagoInicial} contado={result.contado.pagoInicial}>
                  {fmtMXN.format(result.pagoInicialMonto)}
                </Row>
                <Row
                  label="Mensualidad"
                  forest
                  credito={result.credito.mensualidad}
                  contado={0}
                >
                  {fmtMXN.format(result.arrendamiento.mensualidadConIVA)}
                </Row>
                <Row
                  label={`Total pagado a ${state.plazo}m`}
                  forest
                  credito={result.credito.totalPagado}
                  contado={result.contado.pagoInicial}
                >
                  {fmtMXN.format(result.arrendamiento.totalPagado36)}
                </Row>
                <Row
                  label="Deducción anual estimada"
                  forest
                  credito={0}
                  contado={0}
                  accent
                >
                  {fmtMXN.format(result.arrendamiento.deduccionAnual)}
                </Row>
                <Row
                  label="ISR ahorrado al año"
                  forest
                  credito={0}
                  contado={0}
                  accent
                >
                  {fmtMXN.format(result.arrendamiento.isrAhorradoAnual)}
                </Row>
                <Row
                  label="IVA acreditable al año"
                  forest
                  credito={0}
                  contado={result.contado.ivaAcreditable / aniosCompletos}
                  accent
                >
                  {fmtMXN.format(result.arrendamiento.ivaAcreditableAnual)}
                </Row>
                <Row
                  label="Auto al final"
                  forest
                  text
                  creditoText={fmtMXN.format(result.credito.valorAutoFinal)}
                  contadoText={fmtMXN.format(result.contado.valorAutoFinal)}
                >
                  Devuelves o pagas residual
                </Row>
                <tr className="bg-forest-50/60 font-semibold">
                  <td className="py-4 px-3 text-ink-900">Flujo neto real</td>
                  <td className="py-4 px-3 text-right text-forest tabular-nums">
                    {fmtMXN.format(result.arrendamiento.flujoNetoTotal)}
                  </td>
                  <td className="py-4 px-3 text-right text-ink-700 tabular-nums">
                    {fmtMXN.format(result.credito.flujoNetoTotal)}
                  </td>
                  <td className="py-4 px-3 text-right text-ink-700 tabular-nums">
                    {fmtMXN.format(result.contado.flujoNetoTotal)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-6 rounded-lg bg-bg-muted p-4 text-xs leading-relaxed text-ink-600">
            <strong className="text-ink-800">Disclaimer:</strong> estimación basada en supuestos
            generales del mercado mexicano 2026 (ISR PFAE 30%, IVA 16%, depreciación lineal,
            tasas referenciales). Tu contador puede ajustar los números a tu situación específica.
            Los términos exactos se confirman al firmar contrato.
          </p>
        </Card>

        {/* KEY POINTS */}
        <Card variant="default" padded="lg" className="mt-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900 md:text-3xl">
            Lo que esto significa para ti
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <KeyPoint label={`Mantienes ${fmtMXN.format(result.arrendamiento.capitalLibre)} en tu negocio`}>
              en lugar de inmovilizarlos en un activo que se devalúa
            </KeyPoint>
            <KeyPoint label={`Deduces ${fmtMXN.format(deduccionTotal)} en ${aniosCompletos} años`}>
              entre ISR ahorrado e IVA acreditable
            </KeyPoint>
            <KeyPoint label="Renuevas auto cada 3 años" sub="opcional">
              o ejerces opción de compra al valor residual
            </KeyPoint>
          </div>
        </Card>

        {/* CTA STACK */}
        <div className="mt-10 grid gap-3 md:grid-cols-[1.5fr_1fr_1fr]">
          <Link to="/tramite" state={{ cotizacion: state, result }}>
            <Button variant="primary" size="xl" fullWidth iconRight={<IconArrowRight />}>
              Iniciar mi trámite
            </Button>
          </Link>
          <Button variant="secondary" size="xl" fullWidth iconLeft={<IconDownload size={20} />} onClick={handleDownloadPDF}>
            Descargar PDF
          </Button>
          <a href={`https://wa.me/523300000000?text=${waMessage}`} target="_blank" rel="noopener noreferrer">
            <Button variant="tertiary" size="xl" fullWidth iconLeft={<IconWhatsApp size={20} />}>
              WhatsApp
            </Button>
          </a>
        </div>

        <p className="mt-3 text-center text-xs text-ink-500">
          El PDF se descarga sin pedirte contacto. Lo lees, lo mandas a tu contador, lo usas como quieras.
        </p>

        <div className="mt-12 text-center">
          <Link to="/cotizar" className="inline-flex items-center gap-2 text-sm font-medium text-forest hover:text-forest-700">
            ← Cotizar otro auto
          </Link>
        </div>
      </div>
    </div>
  );
}

function BigStat({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-white/60">{label}</p>
      <p
        className={cn(
          'num-display mt-2 text-3xl font-semibold leading-tight md:text-4xl',
          accent ? 'text-lime-400' : 'text-white',
        )}
      >
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-white/60">{sub}</p>}
    </div>
  );
}

function Th({ children, highlight }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <th
      className={cn(
        'py-3 px-3 text-right text-xs font-semibold uppercase tracking-wider',
        highlight ? 'text-forest' : 'text-ink-500',
      )}
    >
      {children}
    </th>
  );
}

function Row({
  label,
  children,
  forest,
  accent,
  credito,
  contado,
  text,
  creditoText,
  contadoText,
}: {
  label: string;
  children: React.ReactNode;
  forest?: boolean;
  accent?: boolean;
  credito?: number;
  contado?: number;
  text?: boolean;
  creditoText?: string;
  contadoText?: string;
}) {
  void forest;
  return (
    <tr>
      <td className="py-3 px-3 text-ink-700">{label}</td>
      <td className={cn('py-3 px-3 text-right tabular-nums', accent ? 'text-forest font-semibold' : 'text-ink-900')}>
        {children}
      </td>
      <td className="py-3 px-3 text-right tabular-nums text-ink-600">
        {text ? creditoText : credito === 0 ? '—' : fmtMXN.format(credito ?? 0)}
      </td>
      <td className="py-3 px-3 text-right tabular-nums text-ink-600">
        {text ? contadoText : contado === 0 ? '—' : fmtMXN.format(contado ?? 0)}
      </td>
    </tr>
  );
}

function KeyPoint({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-forest-50 p-5 ring-1 ring-forest-100">
      <div className="mb-2 flex items-start gap-2">
        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-forest text-white">
          <IconCheck size={14} />
        </span>
        <p className="font-display font-semibold tracking-tight text-ink-900 leading-tight">
          {label}
          {sub && <span className="ml-1 text-xs font-normal text-ink-500">({sub})</span>}
        </p>
      </div>
      <p className="text-sm text-ink-600 ml-7">{children}</p>
    </div>
  );
}
