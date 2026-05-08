import { Link } from 'react-router-dom';
import { HeroCalculator } from '@/components/calc/HeroCalculator';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import { Button } from '@/components/ui/Button';
import {
  IconMoneyCircle,
  IconShield,
  IconKeys,
  IconClock,
  IconArrowRight,
  IconSparkle,
  IconWhatsApp,
  IconUserCheck,
  IconSignature,
  IconChevronDown,
} from '@/components/ui/Icon';
import { MARCAS, totalModelos } from '@/data/marcas';
import { useState } from 'react';
import { cn } from '@/lib/cn';

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-bg-muted via-white to-forest-50/40 pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-lime-200/40 blur-3xl" />
          <div className="absolute -bottom-40 -left-20 h-[32rem] w-[32rem] rounded-full bg-forest-100/60 blur-3xl" />
        </div>

        <div className="container-tight relative grid gap-10 lg:grid-cols-12 lg:gap-12 items-center">
          <div className="lg:col-span-7 animate-slide-up">
            <Pill variant="forest" icon={<IconSparkle size={14} />}>
              Para PFAE y empresas
            </Pill>

            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-ink-900 sm:text-5xl lg:text-6xl">
              Tu próximo auto puede{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-forest">pagarte impuestos.</span>
                <span className="absolute inset-x-0 bottom-1 h-3 bg-lime-300/70 -z-0" aria-hidden />
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
              Arrenda en lugar de comprar y deduce el 100%, acredita el IVA
              cada mes y conserva tu capital. Sin letra chica. Calcula
              cuánto te ahorras a la derecha.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <TrustItem icon={<IconClock />} text="Aprobación en 48 hrs" />
              <TrustItem icon={<IconShield />} text="75 años Grupo Plasencia" />
              <TrustItem icon={<IconKeys />} text={`+${totalModelos} modelos disponibles`} />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/cotizar">
                <Button variant="primary" size="xl" iconRight={<IconArrowRight />}>
                  Cotizar mi auto
                </Button>
              </Link>
              <a
                href="https://wa.me/523300000000"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="xl" iconLeft={<IconWhatsApp size={20} />}>
                  Hablar por WhatsApp
                </Button>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pl-4">
            <HeroCalculator />
          </div>
        </div>
      </section>

      {/* PILARES PFAE */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-tight">
          <div className="mx-auto max-w-3xl text-center">
            <Pill variant="lime">El caso fiscal</Pill>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-900 md:text-4xl">
              Por qué arrendar conviene si facturas
            </h2>
            <p className="mt-4 text-lg text-ink-600">
              La matemática que tu contador ya conoce, explicada claro y con
              ejemplos reales.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <PilarCard
              icon={<IconMoneyCircle size={36} />}
              title="Deduce el 100%"
              body="Tu mensualidad de arrendamiento es gasto deducible. Si facturas $1.5M al año, deduces hasta $170K solo del auto."
              numero="$170K"
              numeroLabel="deducción anual estimada"
            />
            <PilarCard
              icon={<IconShield size={36} />}
              title="Acredita el IVA"
              body="Cada mes recuperas el 16% de IVA de la mensualidad. Es flujo de caja directo, no espera fin de año."
              numero="16%"
              numeroLabel="IVA acreditable cada mes"
            />
            <PilarCard
              icon={<IconSignature size={36} />}
              title="No descapitalizas"
              body="Mantienes tu efectivo en el negocio. Rentas como servicio, no compras como activo que se devalúa."
              numero="$500K+"
              numeroLabel="capital que no sale"
            />
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/por-que-arrendar"
              className="inline-flex items-center gap-2 text-sm font-medium text-forest hover:text-forest-700"
            >
              Ver cuánto deduces con tu auto y tu régimen
              <IconArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* MARCAS */}
      <section className="bg-bg-subtle py-20 md:py-24">
        <div className="container-tight">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Pill variant="forest">Catálogo</Pill>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink-900 md:text-4xl">
                Las marcas que arriendas con nosotros
              </h2>
              <p className="mt-2 max-w-xl text-ink-600">
                {MARCAS.length} marcas activas. Si la que buscas no está,
                igual la conseguimos.
              </p>
            </div>
            <Link to="/marcas">
              <Button variant="ghost" iconRight={<IconArrowRight />}>
                Ver todas las marcas
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3 md:grid-cols-5 lg:grid-cols-7">
            {MARCAS.map((m) => (
              <Link
                key={m.slug}
                to={`/marcas/${m.slug}`}
                className="group flex flex-col items-center justify-center rounded-xl bg-white px-4 py-5 shadow-soft hover:shadow-card transition-all hover:-translate-y-0.5"
              >
                <span
                  className="font-display text-lg font-semibold tracking-tight transition-colors"
                  style={{ color: m.logoColor }}
                >
                  {m.nombre}
                </span>
                <span className="mt-0.5 text-[11px] text-ink-500">
                  {m.modelos.length} modelos
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-2 rounded-xl border border-dashed border-ink-300 bg-white/60 p-6 text-center">
            <p className="text-sm text-ink-600">¿No ves la marca o modelo que buscas?</p>
            <a
              href="https://wa.me/523300000000?text=Hola,%20busco%20una%20marca%20que%20no%20veo%20en%20el%20catálogo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-forest hover:text-forest-700"
            >
              Pregunta por WhatsApp
              <IconArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-tight">
          <div className="mx-auto max-w-3xl text-center">
            <Pill variant="lime">Proceso</Pill>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-900 md:text-4xl">
              De cotización a llaves en 4 pasos
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-4">
            <Step n="1" icon={<IconMoneyCircle />} title="Cotizas" body="60 segundos. Eliges auto, plazo, inicial. Ves la matemática completa." />
            <Step n="2" icon={<IconSignature />} title="Subes documentos" body="Lista clara según tu tipo de persona. Drag-and-drop en el navegador." />
            <Step n="3" icon={<IconUserCheck />} title="Aprobamos" body="Hasta 48 hrs. Te avisamos por WhatsApp en cada hito del proceso." />
            <Step n="4" icon={<IconKeys />} title="Manejas" body="Firma digital o presencial. Entrega del auto donde te convenga." />
          </div>

          <div className="mt-12 text-center">
            <Link to="/como-funciona">
              <Button variant="ghost" iconRight={<IconArrowRight />}>
                Ver proceso detallado
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="bg-forest-950 py-20 md:py-24 text-white">
        <div className="container-tight">
          <div className="mx-auto max-w-3xl text-center">
            <Pill variant="soft">Clientes</Pill>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Quienes ya facturan, ya arriendan
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Profesionales y empresas que decidieron quedarse con su capital.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Testimonial
              quote="Mi contador me dijo que arrendar conviene. GP Autolease me lo demostró con números antes de pedirme un peso."
              name="Andrea Cortés"
              role="Arquitecta · Mazda CX-50"
            />
            <Testimonial
              quote="El PDF que descargué se lo mandé a mi contador y firmamos a los 3 días. Cero presión, cero llamadas."
              name="Roberto Hernández"
              role="Médico cardiólogo · Hyundai Tucson"
            />
            <Testimonial
              quote="Mantuve $400K en mi negocio en lugar de un auto que se devalúa. El cambio cada 3 años es bonus."
              name="Mariana Vega"
              role="Despacho contable · Nissan X-Trail"
            />
          </div>
        </div>
      </section>

      {/* FAQ DESTACADO */}
      <FaqSection />

      {/* CTA FINAL */}
      <section className="relative overflow-hidden bg-gradient-to-br from-forest via-forest-700 to-forest-950 py-20 md:py-24 text-white">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-lime-500/20 blur-3xl" />
        <div className="container-tight relative text-center">
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-semibold tracking-tight md:text-5xl">
            ¿Listo para arrendar tu próximo auto?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">
            Calcula en 60 segundos. Sin compromiso. Sin pedirte teléfono hasta que tú quieras.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/cotizar">
              <Button variant="lime" size="xl" iconRight={<IconArrowRight />}>
                Cotizar ahora
              </Button>
            </Link>
            <a
              href="https://wa.me/523300000000"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="inverse" size="xl" iconLeft={<IconWhatsApp size={20} />}>
                Hablar por WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function TrustItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-ink-700">
      <span className="text-forest">{icon}</span>
      <span className="font-medium">{text}</span>
    </div>
  );
}

function PilarCard({
  icon,
  title,
  body,
  numero,
  numeroLabel,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  numero: string;
  numeroLabel: string;
}) {
  return (
    <Card variant="outlined" padded="lg" className="group hover:border-forest hover:shadow-card transition-all">
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-forest-50 ring-1 ring-forest-100">
        {icon}
      </div>
      <h3 className="font-display text-2xl font-semibold tracking-tight text-ink-900">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-600">{body}</p>
      <div className="mt-6 border-t border-ink-100 pt-4">
        <p className="num-display text-3xl font-semibold text-forest">{numero}</p>
        <p className="mt-1 text-xs text-ink-500">{numeroLabel}</p>
      </div>
    </Card>
  );
}

function Step({ n, icon, title, body }: { n: string; icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="relative">
      <div className="mb-4 flex items-center gap-3">
        <span className="font-display text-5xl font-semibold text-lime-500/80 leading-none">{n}</span>
        <span className="text-forest">{icon}</span>
      </div>
      <h3 className="font-display text-xl font-semibold tracking-tight text-ink-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-600">{body}</p>
    </div>
  );
}

function Testimonial({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-6 backdrop-blur">
      <div className="mb-3 text-lime-400">
        <svg width="28" height="22" viewBox="0 0 28 22" fill="currentColor">
          <path d="M0 22V12C0 5.4 4.6 0.6 11 0V4.6C7.6 5.4 5.4 8 5.4 12H10V22H0ZM18 22V12C18 5.4 22.6 0.6 28 0V4.6C25.6 5.4 23.4 8 23.4 12H28V22H18Z" />
        </svg>
      </div>
      <p className="text-base leading-relaxed text-white/90">"{quote}"</p>
      <div className="mt-5 border-t border-white/10 pt-4">
        <p className="font-display font-semibold tracking-tight">{name}</p>
        <p className="text-sm text-white/60">{role}</p>
      </div>
    </div>
  );
}

const FAQS = [
  {
    q: '¿Cuánto puedo deducir si soy PFAE?',
    a: 'Si usas el auto al 100% para tu actividad empresarial, deduces el 100% de la mensualidad de arrendamiento. Si lo usas en parte personal, deduces el porcentaje correspondiente al uso fiscal. Tu contador puede ajustar el % real según tu régimen y movimientos.',
  },
  {
    q: '¿Qué pasa al final del contrato?',
    a: 'Tres opciones, todas tuyas: (1) ejerces opción de compra al valor residual acordado al inicio del contrato, (2) devuelves el auto y arriendas uno nuevo, (3) decides al momento sin presión. El valor residual se acuerda desde la firma para evitar sorpresas.',
  },
  {
    q: '¿Cuánto tarda la aprobación?',
    a: 'Hasta 48 horas hábiles desde que recibimos todos los documentos completos. Si falta algo, te avisamos por WhatsApp dentro de las primeras 4 horas. La mayoría de aprobaciones cierran en menos de 36 hrs.',
  },
  {
    q: '¿Hay límite de kilometraje?',
    a: 'Sí, definido al firmar contrato según tu uso esperado (típicamente 20,000 a 30,000 km/año). Si lo excedes, hay un cargo por kilómetro extra acordado desde el inicio. Sin sorpresas: lo ves antes de firmar.',
  },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-bg-subtle py-20 md:py-24">
      <div className="container-tight">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Pill variant="forest">Dudas frecuentes</Pill>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-900 md:text-4xl">
              Preguntas que también nos hacen
            </h2>
            <p className="mt-4 text-ink-600">
              Si la tuya no está aquí, mándala por WhatsApp y te respondemos en menos de 30 minutos.
            </p>
            <Link
              to="/preguntas"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest hover:text-forest-700"
            >
              Ver todas las preguntas
              <IconArrowRight size={14} />
            </Link>
          </div>

          <div className="lg:col-span-8 divide-y divide-ink-200 rounded-xl border border-ink-200 bg-white">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-bg-muted"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg font-semibold tracking-tight text-ink-900">
                      {faq.q}
                    </span>
                    <IconChevronDown
                      size={20}
                      className={cn(
                        'flex-shrink-0 text-ink-500 transition-transform duration-200',
                        isOpen && 'rotate-180 text-forest',
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-ink-700 leading-relaxed animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
