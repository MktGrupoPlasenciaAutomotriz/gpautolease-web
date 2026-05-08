import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';

const BASE = import.meta.env.BASE_URL ?? '/';
import { IconArrowRight, IconCheck, IconWhatsApp } from '@/components/ui/Icon';

const PRINCIPIOS = [
  {
    title: 'Si no podemos explicar un número, no lo cobramos',
    body: 'Cada peso de tu mensualidad tiene una justificación clara. Si te preguntas "¿por qué pago esto?" y la respuesta no es transparente, no debería estar.',
  },
  {
    title: 'Aprobación o respuesta en menos de 48 hrs, siempre',
    body: 'Tu tiempo es tu recurso más caro. Si nos tardamos más de 48 hrs, te avisamos por qué y cuándo. Cero limbo silencioso.',
  },
  {
    title: 'WhatsApp cuando tú lo decidas',
    body: 'No te llamamos hasta que tú abras el canal. Cero spam de seguimiento. Cero "solo quería saludar". Si te ofrecemos algo, es porque pediste.',
  },
  {
    title: 'Cero letra chica, cero comisiones sorpresa',
    body: 'Te entregamos el contrato completo antes de firmar. Si una cláusula no te queda clara, la aclaramos. Si no se aclara, no firmes.',
  },
  {
    title: 'Si algo se rompe en el proceso, lo arreglamos',
    body: 'Cuando algo falla, no es culpa del cliente. Asumimos el problema y lo resolvemos sin pelotear responsabilidades entre departamentos.',
  },
  {
    title: 'Confidencialidad real',
    body: 'Tus datos fiscales no se comparten con terceros, agencias publicitarias ni proveedores externos. Solo se usan para procesar tu trámite.',
  },
];

export default function Nosotros() {
  return (
    <div className="bg-white">
      <section className="relative bg-white border-b border-ink-200/70 overflow-hidden">
        <div className="container-tight pt-16 md:pt-20 pb-12 md:pb-16">
          <div className="max-w-4xl">
            <Eyebrow marker="—">Quiénes somos</Eyebrow>
            <h1 className="mt-6 font-display font-semibold tracking-tight text-ink-900 text-fluid-h1 leading-[1.0]">
              Una arrendadora{' '}
              <span className="relative inline">
                <span className="relative z-10 text-forest">que entiende</span>
                <span aria-hidden className="absolute inset-x-0 bottom-1 h-[0.18em] bg-lime-300/70 -z-0" />
              </span>{' '}
              a quien factura.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-700">
              GP Autolease nació para hacer que el arrendamiento sea rápido, claro y
              humano para profesionales independientes y empresas. Sin lenguaje
              corporativo. Sin procesos diseñados para ocultar.
            </p>
          </div>
        </div>

        {/* Editorial cover image */}
        <div className="container-tight pb-16 md:pb-20">
          <div className="relative overflow-hidden rounded-2xl ring-1 ring-ink-200/70">
            <img
              src={`${BASE}img/hero-nosotros.webp`}
              alt="Espacio de trabajo de GP Autolease — interior moderno con luz natural"
              className="h-[280px] md:h-[420px] lg:h-[480px] w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/60 via-forest-950/20 to-transparent p-6 md:p-8 text-white">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">Sede piloto</p>
                  <p className="mt-1 font-display text-xl md:text-2xl font-semibold tracking-tight">Zapopan, Jalisco</p>
                </div>
                <div className="hidden md:block h-10 w-px bg-white/20" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">Grupo Plasencia</p>
                  <p className="mt-1 font-display text-xl md:text-2xl font-semibold tracking-tight">75 años en movilidad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-tight max-w-5xl grid gap-10 md:grid-cols-2">
          <Card variant="default" padded="lg">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900 md:text-3xl">
              Respaldados por Grupo Plasencia
            </h2>
            <p className="mt-4 leading-relaxed text-ink-700">
              Somos parte del Grupo Plasencia, con 75 años en el sector automotriz
              mexicano. Representamos +15 marcas, operamos varias agencias en
              Jalisco y atendemos a miles de clientes activos cada año.
            </p>
            <p className="mt-3 leading-relaxed text-ink-700">
              Esa infraestructura es la diferencia: no somos una arrendadora
              independiente con un solo proveedor — tenemos red, capacidad y
              respaldo financiero para responder con velocidad y volumen.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <Stat n="75+" label="años" />
              <Stat n="+15" label="marcas" />
              <Stat n="miles" label="clientes activos" />
            </div>
          </Card>

          <Card variant="forest" padded="lg">
            <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
              Tu aliado en movimiento
            </h2>
            <p className="mt-4 leading-relaxed text-white/80">
              No vendemos coches: vendemos eficiencia fiscal, capital libre y
              tranquilidad operativa. El auto es el medio, no el fin.
            </p>
            <p className="mt-3 leading-relaxed text-white/80">
              Por eso nuestro proceso prioriza tu tiempo, tu contador y tus
              números. No la cuota mensual del vendedor.
            </p>
            <div className="mt-8 rounded-lg bg-white/10 p-5">
              <p className="font-helvetica text-sm text-white/90">
                "Tu aliado en movimiento."
              </p>
              <p className="mt-1 text-xs text-white/60">— GP Autolease, desde día 1</p>
            </div>
          </Card>
        </div>
      </section>

      <section className="bg-bg-subtle py-16 md:py-24">
        <div className="container-tight max-w-5xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink-900 md:text-4xl">
            Cómo operamos
          </h2>
          <p className="mt-3 text-ink-600">
            Estos no son valores genéricos pegados en una pared. Son las reglas
            que aplicamos cuando algo no está claro.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {PRINCIPIOS.map((p, i) => (
              <div key={i} className="rounded-xl bg-white p-6 ring-1 ring-ink-200">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-forest text-white">
                    <IconCheck size={16} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-ink-900">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{p.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-tight max-w-5xl">
          <div className="grid gap-10 md:grid-cols-2 items-start">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-ink-900 md:text-4xl">
                Encuéntranos
              </h2>
              <address className="mt-6 not-italic">
                <p className="text-lg leading-relaxed text-ink-800">
                  Av. Mariano Otero 405,<br />
                  Jardines del Sol, 45050<br />
                  Zapopan, Jalisco
                </p>
              </address>
              <p className="mt-6 text-sm text-ink-600">Lunes a sábado · 9:00 a 19:00</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://maps.app.goo.gl/eagYrNWDJB8vap7v8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="md" iconRight={<IconArrowRight />}>
                    Cómo llegar
                  </Button>
                </a>
                <a
                  href="https://wa.me/523300000000"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" size="md" iconLeft={<IconWhatsApp size={18} />}>
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-xl bg-bg-muted ring-1 ring-ink-200 flex items-center justify-center">
              <iframe
                title="Ubicación GP Autolease"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-103.4090%2C20.6500%2C-103.3990%2C20.6580&amp;layer=mapnik&amp;marker=20.6540%2C-103.4040"
                className="h-full w-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-forest-950 py-16 text-white">
        <div className="container-tight max-w-3xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            ¿Listo para arrendar con un equipo que te entiende?
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/cotizar">
              <Button variant="lime" size="xl" iconRight={<IconArrowRight />}>
                Cotizar ahora
              </Button>
            </Link>
            <Link to="/contacto">
              <Button variant="inverse" size="xl">
                Hablar con nosotros
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="rounded-lg bg-forest-50 p-4 text-center ring-1 ring-forest-100">
      <p className="num-display text-2xl font-semibold text-forest">{n}</p>
      <p className="mt-0.5 text-xs text-ink-600">{label}</p>
    </div>
  );
}
