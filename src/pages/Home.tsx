import { Link } from 'react-router-dom';
import { useState } from 'react';
import { HeroCalculator } from '@/components/calc/HeroCalculator';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Tooltip } from '@/components/ui/Tooltip';
import { DotGrid } from '@/components/ui/BrandPattern';
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
import { cn } from '@/lib/cn';

const HERO_BG = `${import.meta.env.BASE_URL ?? '/'}img/hero-abstract.webp`;

export default function Home() {
  return (
    <>
      <HeroSection />
      <PilaresSection />
      <MarcasSection />
      <ProcesoSection />
      <TestimoniosSection />
      <FaqSection />
      <CtaFinalSection />
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-bg-muted via-white to-forest-50/40 pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Hero abstract illustration: subtle, layered */}
      <img
        src={HERO_BG}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.18] mix-blend-multiply"
        loading="eager"
        decoding="async"
      />
      {/* Soft color blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-lime-200/40 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 h-[32rem] w-[32rem] rounded-full bg-forest-100/60 blur-3xl" />
      </div>

      <div className="container-tight relative grid gap-10 lg:grid-cols-12 lg:gap-12 items-center">
        <div className="lg:col-span-7">
          <Reveal direction="up" duration="normal">
            <Pill variant="forest" icon={<IconSparkle size={14} />}>
              Para PFAE y empresas
            </Pill>
          </Reveal>

          <Reveal direction="up" duration="normal" delay={80}>
            <h1 className="mt-5 font-display font-semibold text-[clamp(2.5rem,5.5vw+1rem,5.75rem)] leading-[1.02] tracking-[-0.035em] text-ink-900">
              Tu próximo auto puede{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-forest">pagarte impuestos.</span>
                <span className="absolute inset-x-0 bottom-1.5 h-3 bg-lime-300/70 -z-0" aria-hidden />
              </span>
            </h1>
          </Reveal>

          <Reveal direction="up" duration="normal" delay={160}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-700 md:text-xl">
              Arrenda en lugar de comprar y{' '}
              <Tooltip content="Como PFAE puedes deducir el 100% de la mensualidad de arrendamiento como gasto. Si facturas $1.5M al año, deduces hasta $170K solo del auto.">
                deduce el 100%
              </Tooltip>
              ,{' '}
              <Tooltip content="El 16% de IVA de cada mensualidad lo acreditas contra el IVA que cobras a clientes. Es flujo de caja directo.">
                acredita el IVA cada mes
              </Tooltip>{' '}
              y conserva tu capital. Sin letra chica.
            </p>
          </Reveal>

          <Reveal direction="up" duration="normal" delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
              <TrustItem icon={<IconClock />} text="Aprobación en 48 hrs" />
              <TrustItem icon={<IconShield />} text="75 años Grupo Plasencia" />
              <TrustItem icon={<IconKeys />} text={`+${totalModelos} modelos disponibles`} />
            </div>
          </Reveal>

          <Reveal direction="up" duration="normal" delay={320}>
            <div className="mt-9 flex flex-wrap gap-3">
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
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:pl-4">
          <Reveal direction="left" duration="slow" delay={400}>
            <HeroCalculator />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PilaresSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-tight">
        <Reveal direction="up">
          <div className="mx-auto max-w-3xl text-center">
            <Pill variant="lime">El caso fiscal</Pill>
            <h2 className="mt-4 font-display font-semibold tracking-tight text-ink-900 text-fluid-h2">
              Por qué arrendar conviene si facturas
            </h2>
            <p className="mt-5 text-lg text-ink-600">
              La matemática que tu contador ya conoce, explicada claro y con ejemplos reales.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <Reveal direction="up" delay={0}>
            <PilarCard
              icon={<IconMoneyCircle size={36} />}
              title="Deduces el 100%"
              body="Tu mensualidad es gasto deducible. Si facturas $1.5M al año, deduces hasta $170K solo del auto."
              numero="$170K"
              numeroLabel="deducción anual estimada"
            />
          </Reveal>
          <Reveal direction="up" delay={80}>
            <PilarCard
              icon={<IconShield size={36} />}
              title="Acredita el IVA"
              body="Cada mes recuperas el 16% de IVA de la mensualidad. Es flujo de caja directo, no espera fin de año."
              numero="16%"
              numeroLabel="IVA acreditable cada mes"
            />
          </Reveal>
          <Reveal direction="up" delay={160}>
            <PilarCard
              icon={<IconSignature size={36} />}
              title="No descapitalizas"
              body="Mantienes tu efectivo en el negocio. Rentas como servicio, no compras como activo que se devalúa."
              numero="$500K+"
              numeroLabel="capital que no sale"
            />
          </Reveal>
        </div>

        <Reveal direction="up" delay={200}>
          <div className="mt-12 text-center">
            <Link
              to="/por-que-arrendar"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-forest-700 transition-colors"
            >
              Ver cuánto deduces con tu auto y tu régimen
              <IconArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MarcasSection() {
  return (
    <section className="relative overflow-hidden bg-bg-subtle py-20 md:py-24">
      <DotGrid
        cols={20}
        rows={8}
        gap={22}
        size={3}
        fade="radial"
        className="absolute -top-12 right-0 opacity-50"
      />
      <div className="container-tight relative">
        <Reveal direction="up">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Pill variant="forest">Catálogo</Pill>
              <h2 className="mt-3 font-display font-semibold tracking-tight text-ink-900 text-fluid-h2">
                Las marcas que arriendas con nosotros
              </h2>
              <p className="mt-3 max-w-xl text-ink-600">
                {MARCAS.length} marcas activas, +{totalModelos} modelos. Si la que buscas no está, igual la conseguimos.
              </p>
            </div>
            <Link to="/marcas">
              <Button variant="ghost" iconRight={<IconArrowRight />}>
                Ver todas las marcas
              </Button>
            </Link>
          </div>
        </Reveal>

        <Reveal direction="up" delay={120}>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-5 lg:grid-cols-7">
            {MARCAS.map((m, i) => (
              <Link
                key={m.slug}
                to={`/marcas/${m.slug}`}
                style={{ transitionDelay: `${i * 20}ms` }}
                className="group flex flex-col items-center justify-center rounded-xl bg-white px-4 py-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:ring-2 hover:ring-forest/15"
              >
                <span
                  className="font-display text-lg font-semibold tracking-tight transition-colors"
                  style={{ color: m.logoColor }}
                >
                  {m.nombre}
                </span>
                <span className="mt-0.5 text-[11px] text-ink-500">{m.modelos.length} modelos</span>
              </Link>
            ))}
          </div>
        </Reveal>

        <Reveal direction="up" delay={200}>
          <div className="mt-10 flex flex-col items-center gap-2 rounded-xl border border-dashed border-ink-300 bg-white/60 p-6 text-center">
            <p className="text-sm text-ink-600">¿No ves la marca o modelo que buscas?</p>
            <a
              href="https://wa.me/523300000000?text=Hola,%20busco%20una%20marca%20que%20no%20veo%20en%20el%20catálogo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-forest-700"
            >
              Pregunta por WhatsApp
              <IconArrowRight size={14} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProcesoSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-tight">
        <Reveal direction="up">
          <div className="mx-auto max-w-3xl text-center">
            <Pill variant="lime">Proceso</Pill>
            <h2 className="mt-4 font-display font-semibold tracking-tight text-ink-900 text-fluid-h2">
              De cotización a llaves en 4 pasos
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-4">
          {[
            { n: '1', icon: <IconMoneyCircle />, title: 'Cotizas', body: '60 segundos. Eliges auto, plazo, inicial. Ves la matemática completa.' },
            { n: '2', icon: <IconSignature />, title: 'Subes documentos', body: 'Lista clara según tu tipo de persona. Drag-and-drop en el navegador.' },
            { n: '3', icon: <IconUserCheck />, title: 'Aprobamos', body: 'Hasta 48 hrs. Te avisamos por WhatsApp en cada hito del proceso.' },
            { n: '4', icon: <IconKeys />, title: 'Manejas', body: 'Firma digital o presencial. Entrega del auto donde te convenga.' },
          ].map((s, i) => (
            <Reveal key={s.n} direction="up" delay={i * 100}>
              <Step n={s.n} icon={s.icon} title={s.title} body={s.body} />
            </Reveal>
          ))}
        </div>

        <Reveal direction="up" delay={300}>
          <div className="mt-14 text-center">
            <Link to="/como-funciona">
              <Button variant="ghost" iconRight={<IconArrowRight />}>
                Ver proceso detallado
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TestimoniosSection() {
  return (
    <section className="relative overflow-hidden bg-forest-950 py-20 md:py-24 text-white">
      <DotGrid
        cols={26}
        rows={10}
        gap={24}
        size={2.5}
        fade="left"
        color="#8EBF24"
        className="absolute -top-8 right-0 opacity-30"
      />
      <DotGrid
        cols={20}
        rows={8}
        gap={20}
        size={2}
        fade="right"
        color="#8EBF24"
        className="absolute bottom-0 -left-8 opacity-25"
      />

      <div className="container-tight relative">
        <Reveal direction="up">
          <div className="mx-auto max-w-3xl text-center">
            <Pill variant="soft">Clientes</Pill>
            <h2 className="mt-4 font-display font-semibold tracking-tight text-fluid-h2">
              Quienes ya facturan, ya arriendan
            </h2>
            <p className="mt-5 text-lg text-white/70">
              Profesionales y empresas que decidieron quedarse con su capital.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { quote: 'Mi contador me dijo que arrendar conviene. GP Autolease me lo demostró con números antes de pedirme un peso.', name: 'Andrea Cortés', role: 'Arquitecta · Mazda CX-50', initials: 'AC', color: '#8EBF24' },
            { quote: 'El PDF que descargué se lo mandé a mi contador y firmamos a los 3 días. Cero presión, cero llamadas.', name: 'Roberto Hernández', role: 'Médico cardiólogo · Hyundai Tucson', initials: 'RH', color: '#5BA678' },
            { quote: 'Mantuve $400K en mi negocio en lugar de un auto que se devalúa. El cambio cada 3 años es bonus.', name: 'Mariana Vega', role: 'Despacho contable · Nissan X-Trail', initials: 'MV', color: '#A8D058' },
          ].map((t, i) => (
            <Reveal key={t.name} direction="up" delay={i * 120}>
              <Testimonial {...t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  { q: '¿Cuánto puedo deducir si soy PFAE?', a: 'Si usas el auto al 100% para tu actividad empresarial, deduces el 100% de la mensualidad de arrendamiento. Si lo usas en parte personal, deduces el porcentaje correspondiente al uso fiscal. Tu contador puede ajustar el % real según tu régimen y movimientos.' },
  { q: '¿Qué pasa al final del contrato?', a: 'Tres opciones, todas tuyas: (1) ejerces opción de compra al valor residual acordado al inicio del contrato, (2) devuelves el auto y arriendas uno nuevo, (3) decides al momento sin presión. El valor residual se acuerda desde la firma para evitar sorpresas.' },
  { q: '¿Cuánto tarda la aprobación?', a: 'Hasta 48 horas hábiles desde que recibimos todos los documentos completos. Si falta algo, te avisamos por WhatsApp dentro de las primeras 4 horas. La mayoría de aprobaciones cierran en menos de 36 hrs.' },
  { q: '¿Hay límite de kilometraje?', a: 'Sí, definido al firmar contrato según tu uso esperado (típicamente 20,000 a 30,000 km/año). Si lo excedes, hay un cargo por kilómetro extra acordado desde el inicio. Sin sorpresas: lo ves antes de firmar.' },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-bg-subtle py-20 md:py-24">
      <div className="container-tight">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal direction="up" className="lg:col-span-4">
            <Pill variant="forest">Dudas frecuentes</Pill>
            <h2 className="mt-4 font-display font-semibold tracking-tight text-ink-900 text-fluid-h2">
              Preguntas que también nos hacen
            </h2>
            <p className="mt-5 text-ink-600">
              Si la tuya no está aquí, mándala por WhatsApp y te respondemos en menos de 30 minutos.
            </p>
            <Link
              to="/preguntas"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-forest-700 group"
            >
              Ver todas las preguntas
              <IconArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>

          <Reveal direction="up" delay={120} className="lg:col-span-8">
            <div className="divide-y divide-ink-200 rounded-xl border border-ink-200 bg-white shadow-soft">
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
                          'flex-shrink-0 text-ink-500 transition-transform duration-300',
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CtaFinalSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-forest via-forest-700 to-forest-950 py-20 md:py-28 text-white">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-lime-500/20 blur-3xl" />
      <DotGrid
        cols={28}
        rows={12}
        gap={22}
        size={2.5}
        fade="radial"
        color="#8EBF24"
        className="absolute inset-0 m-auto opacity-40"
      />
      <div className="container-tight relative text-center">
        <Reveal direction="up">
          <Pill variant="soft">Empieza ahora</Pill>
          <h2 className="mx-auto mt-5 max-w-3xl font-display font-semibold tracking-tight text-fluid-h1">
            ¿Listo para arrendar tu próximo auto?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
            Calcula en 60 segundos. Sin compromiso. Sin pedirte teléfono hasta que tú quieras.
          </p>
        </Reveal>
        <Reveal direction="up" delay={150}>
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
        </Reveal>
      </div>
    </section>
  );
}

function TrustItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2.5 text-sm text-ink-700">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-50 text-forest ring-1 ring-forest-100">
        {icon}
      </span>
      <span className="font-medium">{text}</span>
    </div>
  );
}

function PilarCard({
  icon, title, body, numero, numeroLabel,
}: { icon: React.ReactNode; title: string; body: string; numero: string; numeroLabel: string }) {
  return (
    <Card variant="outlined" padded="lg" className="group h-full transition-all duration-300 hover:border-forest hover:shadow-elevated hover:-translate-y-0.5">
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-forest-50 ring-1 ring-forest-100 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="font-display text-2xl font-semibold tracking-tight text-ink-900">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-600">{body}</p>
      <div className="mt-6 border-t border-ink-100 pt-4">
        <p className="num-display text-3xl font-semibold text-forest tabular-nums">{numero}</p>
        <p className="mt-1 text-xs text-ink-500">{numeroLabel}</p>
      </div>
    </Card>
  );
}

function Step({ n, icon, title, body }: { n: string; icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="relative">
      <div className="mb-5 flex items-center gap-4">
        <span className="font-display text-6xl font-semibold leading-none text-lime-500/90">{n}</span>
        <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-forest-50 text-forest ring-1 ring-forest-100">
          {icon}
        </span>
      </div>
      <h3 className="font-display text-xl font-semibold tracking-tight text-ink-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-600">{body}</p>
    </div>
  );
}

function Testimonial({
  quote, name, role, initials, color,
}: { quote: string; name: string; role: string; initials: string; color: string }) {
  return (
    <div className="group flex flex-col rounded-xl bg-white/[0.04] p-7 ring-1 ring-white/10 backdrop-blur transition-all duration-300 hover:bg-white/[0.07] hover:ring-white/20">
      <div className="mb-4 text-lime-400">
        <svg width="32" height="24" viewBox="0 0 28 22" fill="currentColor" aria-hidden>
          <path d="M0 22V12C0 5.4 4.6 0.6 11 0V4.6C7.6 5.4 5.4 8 5.4 12H10V22H0ZM18 22V12C18 5.4 22.6 0.6 28 0V4.6C25.6 5.4 23.4 8 23.4 12H28V22H18Z" />
        </svg>
      </div>
      <p className="flex-1 text-base leading-relaxed text-white/90">"{quote}"</p>
      <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
        <div
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold ring-1 ring-white/10"
          style={{ background: color, color: '#0a1f17' }}
        >
          {initials}
        </div>
        <div className="min-w-0">
          <p className="font-display font-semibold tracking-tight text-white truncate">{name}</p>
          <p className="text-sm text-white/60 truncate">{role}</p>
        </div>
      </div>
    </div>
  );
}
