import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { HairlineDivider } from '@/components/ui/DataViz';
import {
  IconArrowRight,
  IconMoneyCircle,
  IconShield,
  IconSignature,
  IconClock,
  IconCheck,
  IconX,
} from '@/components/ui/Icon';
import { fmtMXN } from '@/lib/format';

const BASE = import.meta.env.BASE_URL ?? '/';

export default function PorQueArrendar() {
  return (
    <div className="bg-white">
      <section className="relative bg-white border-b border-ink-200/70 overflow-hidden">
        <div className="container-tight pt-16 md:pt-20 pb-0">
          <div className="grid gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-7 pb-16 md:pb-20">
              <Eyebrow marker="01">El caso fiscal</Eyebrow>
              <h1 className="mt-6 font-display font-semibold tracking-tight text-ink-900 text-fluid-h1 leading-[1.0]">
                Por qué arrendar conviene si{' '}
                <span className="relative inline">
                  <span className="relative z-10 text-forest">facturas</span>
                  <span aria-hidden className="absolute inset-x-0 bottom-1 h-[0.18em] bg-lime-300/70 -z-0" />
                </span>
                <span className="text-ink-900">.</span>
              </h1>
              <p className="mt-7 max-w-xl text-xl leading-relaxed text-ink-700">
                La matemática que tu contador ya conoce, explicada claro. Sin lenguaje
                legal. Con ejemplos numéricos reales.
              </p>
            </div>
            <div className="lg:col-span-5 relative -mb-px">
              <div className="aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-t-2xl ring-1 ring-ink-200/70">
                <img
                  src={`${BASE}img/hero-por-que.webp`}
                  alt="Profesional revisando su cotización en una oficina con luz natural"
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-xl bg-white/95 backdrop-blur-sm ring-1 ring-ink-200/70 px-4 py-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500">PFAE típico</p>
                  <p className="num-display mt-0.5 text-base font-semibold text-forest tabular-nums">$176,400</p>
                </div>
                <div className="h-8 w-px bg-ink-200" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500">Anual deducido</p>
                  <p className="num-display mt-0.5 text-base font-semibold text-ink-900 tabular-nums">36 meses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-tight max-w-5xl">
          <Eyebrow marker="02">Los puntos que importan</Eyebrow>
          <h2 className="mt-6 font-display font-semibold tracking-tight text-ink-900 text-fluid-h2">
            Cuatro razones, cero magia
          </h2>
          <HairlineDivider className="mt-10" />
          <div className="mt-12 space-y-12">
            <BulletPoint
              n="01"
              icon={<IconMoneyCircle size={32} />}
              title="Deduces el 100% de la mensualidad"
              body="Cada peso que pagas de mensualidad de arrendamiento es un gasto deducible. No es financiamiento, no es compra a plazos: es renta de uso. Y la renta para tu actividad empresarial baja tu base gravable peso por peso."
              example={
                <>
                  Si tu mensualidad es <strong>{fmtMXN.format(14820)}</strong> y la usas 100% para
                  tu actividad, deduces <strong>{fmtMXN.format(14820 * 12)}</strong> al año. Si tu
                  ISR efectivo es 30%, eso son <strong>{fmtMXN.format(14820 * 12 * 0.3)}</strong> menos de impuestos.
                </>
              }
            />
            <BulletPoint
              n="02"
              icon={<IconShield size={32} />}
              title="Acreditas el IVA cada mes"
              body="El 16% de IVA de tu mensualidad es acreditable contra el IVA que cobras a tus clientes. Es flujo de caja directo, no espera fin de año, no se queda como saldo a favor en el SAT."
              example={
                <>
                  Mensualidad de <strong>{fmtMXN.format(14820)}</strong> + IVA = pagas{' '}
                  <strong>{fmtMXN.format(14820 * 1.16)}</strong>, pero acreditas{' '}
                  <strong>{fmtMXN.format(14820 * 0.16)}</strong> contra tu IVA cobrado. Tu costo
                  efectivo de IVA es cero.
                </>
              }
            />
            <BulletPoint
              n="03"
              icon={<IconSignature size={32} />}
              title="No descapitalizas tu negocio"
              body="Comprar un auto a contado es inmovilizar capital en un activo que se devalúa 50% en 3 años. Comprar a crédito te ata a un activo cuyo valor cae más rápido que la deuda. Arrendar te deja el capital líquido en tu negocio."
              example={
                <>
                  En lugar de poner <strong>{fmtMXN.format(580000)}</strong> en un auto, pones{' '}
                  <strong>{fmtMXN.format(580000 * 0.10)}</strong> de inicial y mantienes{' '}
                  <strong>{fmtMXN.format(580000 * 0.90)}</strong> trabajando en tu negocio.
                </>
              }
            />
            <BulletPoint
              n="04"
              icon={<IconClock size={32} />}
              title="Renuevas cada 2-3 años sin re-trámite"
              body="Al final del contrato decides si lo compras al valor residual acordado o devuelves y arriendas uno nuevo. Sin papeleo de venta, sin pérdida en el resale, sin mantener un auto que ya no quieres."
              example={
                <>
                  Manejas siempre algo nuevo, con garantía vigente y mantenimiento incluido.
                  Tu imagen profesional se mantiene actualizada sin esfuerzo.
                </>
              }
            />
          </div>
        </div>
      </section>

      <section className="bg-bg-subtle py-20 md:py-28 border-y border-ink-200/70">
        <div className="container-tight max-w-5xl">
          <Eyebrow marker="03">Mitos vs realidades</Eyebrow>
          <h2 className="mt-6 font-display font-semibold tracking-tight text-ink-900 text-fluid-h2">
            Lo que escuchas vs cómo funciona
          </h2>
          <p className="mt-4 text-ink-600">
            Seis mitos comunes desmontados con la cláusula real del contrato.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <MythCard
              myth="Al final el auto no es tuyo"
              reality="Si quieres, sí lo es. Ejerces opción de compra al valor residual acordado desde el día 1. Si no quieres, lo devuelves sin culpa."
            />
            <MythCard
              myth="Te cobran kilometraje sorpresa"
              reality="El límite de km/año se acuerda al firmar. Si lo excedes, el costo por km extra también. Cero sorpresas: lo ves antes de firmar."
            />
            <MythCard
              myth="Es solo para empresas grandes"
              reality="Funciona perfecto para PFAE solo. De hecho, los beneficios fiscales son donde mejor encaja: deducción + IVA + capital libre."
            />
            <MythCard
              myth="El crédito siempre es más barato"
              reality="Solo si no facturas. Si facturas, la deducción + IVA acreditable + valor residual cambian la matemática completa."
            />
            <MythCard
              myth="Te obligan a comprar al final"
              reality="Cero obligación. Tres puertas: compras, devuelves, o arriendas el siguiente. Tú decides cuando llegue el momento."
            />
            <MythCard
              myth="Hay letra chica que aparece después"
              reality="Te entregamos el contrato completo antes de firmar. Si algo no te queda claro, lo aclaramos. Si no se aclara, no firmes."
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-tight max-w-3xl text-center">
          <Card variant="forest" padded="xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              ¿Listo para hacer la cuenta con tu propio auto?
            </h2>
            <p className="mt-4 text-white/80">
              60 segundos. Sin pedirte teléfono. Con PDF descargable para mandarle a tu contador.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/cotizar">
                <Button variant="lime" size="xl" iconRight={<IconArrowRight />}>
                  Cotizar mi auto
                </Button>
              </Link>
              <Link to="/preguntas">
                <Button variant="inverse" size="xl">
                  Preguntas frecuentes
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

function BulletPoint({
  n,
  icon,
  title,
  body,
  example,
}: {
  n: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  example: React.ReactNode;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-10">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-forest-50 ring-1 ring-forest-100">
          {icon}
        </div>
        <span className="font-display text-5xl font-semibold leading-none text-lime-500/70">{n}</span>
      </div>
      <div>
        <h3 className="font-display text-2xl font-semibold tracking-tight text-ink-900 md:text-3xl">
          {title}
        </h3>
        <p className="mt-3 text-lg leading-relaxed text-ink-700">{body}</p>
        <div className="mt-5 rounded-lg border-l-4 border-forest bg-bg-muted p-4 text-sm leading-relaxed text-ink-700">
          <span className="text-xs font-semibold uppercase tracking-wider text-forest">
            En números
          </span>
          <p className="mt-1.5">{example}</p>
        </div>
      </div>
    </div>
  );
}

function MythCard({ myth, reality }: { myth: string; reality: string }) {
  return (
    <Card variant="outlined" padded="md" className="bg-white">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-danger/10 text-danger">
          <IconX size={14} />
        </span>
        <p className="font-display text-base font-semibold tracking-tight text-ink-700 line-through opacity-70">
          {myth}
        </p>
      </div>
      <div className="mt-3 flex items-start gap-3 border-t border-ink-100 pt-3">
        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest">
          <IconCheck size={14} />
        </span>
        <p className="text-sm leading-relaxed text-ink-700">
          <span className="font-semibold text-forest">Realidad: </span>
          {reality}
        </p>
      </div>
    </Card>
  );
}
