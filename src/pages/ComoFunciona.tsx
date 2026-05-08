import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { HairlineDivider } from '@/components/ui/DataViz';
import {
  IconArrowRight,
  IconCheck,
} from '@/components/ui/Icon';

const BASE = import.meta.env.BASE_URL ?? '/';

const STEPS = [
  {
    n: '01',
    title: 'Cotizas',
    duration: '60 segundos',
    body:
      'Eliges marca, modelo, plazo y pago inicial. La calculadora te muestra mensualidad, deducción anual y comparativa contra crédito y contado.',
    points: [
      'Sin pedirte teléfono primero',
      'PDF descargable para tu contador',
      'Comparativa fiscal completa',
    ],
    image: 'proceso-1-cotizas',
    imageAlt: 'Manos calculando arrendamiento en un escritorio con luz cálida',
  },
  {
    n: '02',
    title: 'Subes documentos',
    duration: '~10 minutos',
    body:
      'Lista clara según tu tipo de persona. Drag-and-drop directo en el navegador. Validamos calidad y completitud en línea antes de procesar.',
    points: [
      'PFAE: ID + comprobante domicilio + 2 declaraciones',
      'Empresa: acta + ID rep legal + estados financieros',
      'Si falta algo, te avisamos por WhatsApp',
    ],
    image: 'proceso-2-documentos',
    imageAlt: 'Escaneando documentos con el celular en un escritorio de madera',
  },
  {
    n: '03',
    title: 'Aprobamos',
    duration: 'hasta 48 hrs',
    body:
      'Análisis crediticio, revisión de documentos, propuesta final. Te avisamos en cada hito por WhatsApp. Si necesitamos algo más, te lo decimos rápido y claro.',
    points: [
      'Notificaciones en tiempo real',
      'Propuesta con todos los términos por escrito',
      'Sin sorpresas en la firma',
    ],
    image: 'proceso-3-aprobamos',
    imageAlt: 'Recibiendo notificación de aprobación junto a las llaves del nuevo auto',
  },
  {
    n: '04',
    title: 'Firmas y manejas',
    duration: 'el día que tú elijas',
    body:
      'Firma digital o presencial, tú decides. Entrega del auto donde te convenga: agencia, oficina, casa. Soporte por WhatsApp durante todo el contrato.',
    points: [
      'Firma electrónica avanzada o presencial',
      'Entrega flexible en GDL y zona metropolitana',
      'Mantenimiento + seguro incluidos',
    ],
    image: 'proceso-4-manejas',
    imageAlt: 'Manos en el volante de un auto nuevo al atardecer',
  },
];

export default function ComoFunciona() {
  return (
    <div className="bg-white">
      <section className="relative bg-white py-16 md:py-24 border-b border-ink-200/70 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#1d1d1b_1px,transparent_1px),linear-gradient(to_bottom,#1d1d1b_1px,transparent_1px)] [background-size:80px_80px]"
        />
        <div className="container-tight relative max-w-4xl">
          <Eyebrow marker="—">Proceso</Eyebrow>
          <h1 className="mt-6 font-display font-semibold tracking-tight text-ink-900 text-fluid-h1 leading-[1.0]">
            De cotización a llaves en{' '}
            <span className="relative inline">
              <span className="relative z-10 text-forest">4 pasos</span>
              <span aria-hidden className="absolute inset-x-0 bottom-1 h-[0.18em] bg-lime-300/70 -z-0" />
            </span>
            <span className="text-ink-900">.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-relaxed text-ink-700">
            Sin vueltas, sin papeleo innecesario, sin presión de venta. Te mostramos
            todo el proceso antes de empezar.
          </p>
        </div>
      </section>

      {/* Editorial timeline — alternating layout left/right per step */}
      <section className="py-20 md:py-28">
        <div className="container-tight max-w-6xl">
          <div className="space-y-24 md:space-y-32">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} direction="up">
                <article className="grid gap-10 md:grid-cols-12 md:gap-14 items-center">
                  {/* Image — alternates left/right */}
                  <div
                    className={`md:col-span-7 ${i % 2 === 1 ? 'md:order-2' : ''}`}
                  >
                    <figure className="relative overflow-hidden rounded-2xl ring-1 ring-ink-200/70 bg-bg-subtle">
                      <img
                        src={`${BASE}img/${s.image}.webp`}
                        alt={s.imageAlt}
                        className="aspect-[4/3] w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <figcaption className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-white/95 backdrop-blur-sm ring-1 ring-ink-200/70 px-4 py-2.5">
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500">
                          Paso {s.n}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-forest">
                          {s.duration}
                        </span>
                      </figcaption>
                    </figure>
                  </div>

                  {/* Copy */}
                  <div className={`md:col-span-5 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                    <span className="num-display text-5xl md:text-6xl font-semibold leading-none text-lime-500/80 tabular-nums">
                      {s.n}
                    </span>
                    <h2 className="mt-5 font-display font-semibold tracking-tight text-ink-900 text-fluid-h3">
                      {s.title}
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed text-ink-700">{s.body}</p>
                    <HairlineDivider className="mt-7" />
                    <ul className="mt-6 space-y-2.5">
                      {s.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-3 text-sm text-ink-700">
                          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest ring-1 ring-forest-100">
                            <IconCheck size={11} />
                          </span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-subtle py-20 md:py-24 border-t border-ink-200/70">
        <div className="container-tight max-w-3xl text-center">
          <Card variant="forest" padded="xl">
            <h2 className="font-display font-semibold tracking-tight text-fluid-h2 text-white">
              ¿Empezamos?
            </h2>
            <p className="mt-5 text-white/80 text-lg">
              Cotiza en 60 segundos. Sin compromiso. Sin pedirte teléfono.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link to="/cotizar">
                <Button variant="lime" size="xl" iconRight={<IconArrowRight />}>
                  Cotizar ahora
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
