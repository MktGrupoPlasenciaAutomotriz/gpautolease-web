import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import { Button } from '@/components/ui/Button';
import {
  IconArrowRight,
  IconMoneyCircle,
  IconSignature,
  IconUserCheck,
  IconKeys,
  IconCheck,
} from '@/components/ui/Icon';

const STEPS = [
  {
    n: '01',
    icon: <IconMoneyCircle size={32} />,
    title: 'Cotizas',
    duration: '60 segundos',
    body:
      'Eliges marca, modelo, plazo y pago inicial. La calculadora te muestra mensualidad, deducción anual y comparativa contra crédito y contado.',
    points: [
      'Sin pedirte teléfono primero',
      'PDF descargable para tu contador',
      'Comparativa fiscal completa',
    ],
  },
  {
    n: '02',
    icon: <IconSignature size={32} />,
    title: 'Subes documentos',
    duration: '~10 minutos',
    body:
      'Lista clara según tu tipo de persona. Drag-and-drop directo en el navegador. Validamos calidad y completitud en línea antes de procesar.',
    points: [
      'PFAE: ID + comprobante domicilio + 2 declaraciones',
      'Empresa: acta + ID rep legal + estados financieros',
      'Si falta algo, te avisamos por WhatsApp',
    ],
  },
  {
    n: '03',
    icon: <IconUserCheck size={32} />,
    title: 'Aprobamos',
    duration: 'hasta 48 hrs',
    body:
      'Análisis crediticio, revisión de documentos, propuesta final. Te avisamos en cada hito por WhatsApp. Si necesitamos algo más, te lo decimos rápido y claro.',
    points: [
      'Notificaciones en tiempo real',
      'Propuesta con todos los términos por escrito',
      'Sin sorpresas en la firma',
    ],
  },
  {
    n: '04',
    icon: <IconKeys size={32} />,
    title: 'Firmas y manejas',
    duration: 'el día que tú elijas',
    body:
      'Firma digital o presencial, tú decides. Entrega del auto donde te convenga: agencia, oficina, casa. Soporte por WhatsApp durante todo el contrato.',
    points: [
      'Firma electrónica avanzada o presencial',
      'Entrega flexible en GDL y zona metropolitana',
      'Mantenimiento + seguro incluidos',
    ],
  },
];

export default function ComoFunciona() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-bg-muted via-white to-forest-50/40 py-16 md:py-24">
        <div className="container-tight max-w-4xl">
          <Pill variant="lime">Proceso</Pill>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink-900 md:text-6xl leading-[1.05]">
            De cotización a llaves en{' '}
            <span className="text-forest">4 pasos</span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-600">
            Sin vueltas, sin papeleo innecesario, sin presión de venta. Te mostramos
            todo el proceso antes de empezar.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-tight max-w-5xl">
          <div className="space-y-16">
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative">
                <div className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-12">
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="font-display text-6xl font-semibold leading-none text-lime-500/80">
                        {s.n}
                      </span>
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-forest-50 ring-1 ring-forest-100">
                        {s.icon}
                      </div>
                    </div>
                    <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-forest">
                      {s.duration}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-ink-900 md:text-3xl">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-lg leading-relaxed text-ink-700">{s.body}</p>
                    <ul className="mt-5 space-y-2">
                      {s.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2 text-ink-700">
                          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest">
                            <IconCheck size={12} />
                          </span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="ml-7 mt-12 h-12 w-px bg-gradient-to-b from-forest-200 to-transparent md:ml-32" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-subtle py-16 md:py-20">
        <div className="container-tight max-w-3xl text-center">
          <Card variant="forest" padded="xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              ¿Empezamos?
            </h2>
            <p className="mt-4 text-white/80">
              Cotiza en 60 segundos. Sin compromiso. Sin pedirte teléfono.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
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
