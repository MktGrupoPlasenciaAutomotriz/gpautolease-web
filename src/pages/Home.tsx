import { Link } from 'react-router-dom';
import { useState } from 'react';
import { HeroCalculator } from '@/components/calc/HeroCalculator';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { DotGrid } from '@/components/ui/BrandPattern';
import { BarPair, HairlineDivider, Sparkline } from '@/components/ui/DataViz';
import {
  IconArrowRight,
  IconWhatsApp,
  IconChevronDown,
} from '@/components/ui/Icon';
import { MARCAS, totalModelos } from '@/data/marcas';
import { fmtMXN } from '@/lib/format';
import { cn } from '@/lib/cn';

const BASE = import.meta.env.BASE_URL ?? '/';

export default function Home() {
  return (
    <>
      <HeroSection />
      <DataPointsBand />
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
    <section className="relative overflow-hidden bg-white pt-10 pb-16 md:pt-16 md:pb-24">
      {/* Single restrained grid baseline — no gradient blob noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#1d1d1b_1px,transparent_1px),linear-gradient(to_bottom,#1d1d1b_1px,transparent_1px)] [background-size:80px_80px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-lime-200/25 blur-[120px]"
      />

      <div className="container-tight relative grid gap-10 lg:grid-cols-12 lg:gap-14 items-center">
        <div className="lg:col-span-7">
          <Reveal direction="up">
            <Eyebrow marker="—">Para PFAE y empresas</Eyebrow>
          </Reveal>

          <Reveal direction="up" delay={80}>
            <h1 className="mt-6 font-display font-semibold text-[clamp(2.5rem,5.4vw+0.75rem,5.75rem)] leading-[1.0] tracking-[-0.04em] text-ink-900 [text-wrap:balance]">
              Tu próximo auto{' '}
              <span className="relative inline">
                <span className="relative z-10 text-forest">paga tus impuestos</span>
                <span aria-hidden className="absolute inset-x-0 bottom-1 h-[0.18em] bg-lime-300/70 -z-0" />
              </span>
              <span className="text-ink-900">.</span>
            </h1>
          </Reveal>

          <Reveal direction="up" delay={160}>
            <p className="mt-7 max-w-[34rem] text-lg leading-[1.55] text-ink-700 md:text-xl">
              Arrenda en lugar de comprar.{' '}
              <span className="text-ink-900 font-semibold">Deduce el 100%</span>,{' '}
              acredita el IVA cada mes y mantén tu capital trabajando en tu negocio.
            </p>
          </Reveal>

          <Reveal direction="up" delay={280}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
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
                <Button variant="ghost" size="xl" iconLeft={<IconWhatsApp size={20} />}>
                  WhatsApp
                </Button>
              </a>
              <span className="ml-2 hidden md:inline-flex items-center gap-1.5 text-xs font-medium text-ink-500">
                <span className="inline-block h-1 w-1 rounded-full bg-lime-500 animate-pulse" />
                Aprobación en menos de 48 hrs
              </span>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal direction="left" duration="slow" delay={350}>
            <HeroCalculator />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * Premium fintech data band — 4 hard numbers separated by hairlines, no fluff.
 * Anchors the entire site in concrete metrics, not vibes.
 */
function DataPointsBand() {
  const stats = [
    { num: '+75', unit: 'años', label: 'de Grupo Plasencia respaldando' },
    { num: '<48', unit: 'hrs', label: 'aprobación promedio del trámite' },
    { num: '+15', unit: 'marcas', label: 'disponibles, +43 modelos' },
    { num: '100%', unit: '', label: 'de la mensualidad deducible para PFAE' },
  ];
  return (
    <section className="border-y border-ink-200/70 bg-bg-subtle/40">
      <div className="container-tight grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-ink-200/70">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="px-5 py-7 lg:py-9">
              <div className="flex items-baseline gap-1.5">
                <span className="num-display text-fluid-stat-sm font-semibold tabular-nums text-ink-900 leading-none">
                  {s.num}
                </span>
                {s.unit && (
                  <span className="text-sm font-medium text-ink-500 lowercase">{s.unit}</span>
                )}
              </div>
              <p className="mt-3 max-w-[14rem] text-xs leading-snug text-ink-600">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PilaresSection() {
  // Sample data for the BarPair — illustrates "lo que pasa con $1.5M de facturación"
  const ejemploDeduccion = [
    { label: 'Comprar', value: 0, accent: false },
    { label: 'Crédito', value: 60_000, accent: false },
    { label: 'Arrendar', value: 178_000, accent: true },
  ];

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-tight">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16 items-start">
          <Reveal className="lg:col-span-5">
            <Eyebrow marker="01">El caso fiscal</Eyebrow>
            <h2 className="mt-6 font-display font-semibold tracking-tight text-ink-900 text-fluid-h2">
              Por qué arrendar conviene si facturas
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-700">
              No es magia. Es la diferencia entre comprar un activo que se devalúa y rentar un servicio que deduces.
            </p>
            <Link
              to="/por-que-arrendar"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-forest-700 group"
            >
              Ver cuánto deduces tú
              <IconArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={120}>
            <div className="rounded-xl border border-ink-200/70 bg-bg-subtle/40 p-7 md:p-9">
              <div className="flex items-baseline justify-between">
                <Eyebrow marker="$">Si facturas $1.5M al año</Eyebrow>
                <span className="font-mono text-[10px] tracking-wider text-ink-400">DEDUCCIÓN ANUAL</span>
              </div>
              <BarPair className="mt-7" data={ejemploDeduccion} format={(v) => fmtMXN.format(v)} />
              <HairlineDivider className="mt-7" />
              <p className="mt-5 text-sm leading-relaxed text-ink-600">
                Comprar a contado no genera deducción de mensualidad. Crédito permite deducir intereses con tope de inversión $200K. <span className="text-ink-900 font-semibold">Arrendamiento puro deduce el 100%</span> sin tope.
              </p>
            </div>
          </Reveal>
        </div>

        <HairlineDivider className="mt-20" />

        <div className="mt-20 grid gap-10 md:grid-cols-3">
          <Reveal>
            <PilarRow
              n="01"
              title="Deduces 100%"
              body="Cada mensualidad es gasto deducible. Cero tope, cero límite de inversión."
              metric="$170K"
              metricLabel="ISR ahorrado al año"
              spark={[10, 22, 28, 35, 48, 55, 70]}
            />
          </Reveal>
          <Reveal delay={100}>
            <PilarRow
              n="02"
              title="Acreditas el IVA"
              body="El 16% de IVA mensual contra tu IVA cobrado. Es flujo de caja directo."
              metric="16%"
              metricLabel="cada mes, no anual"
              spark={[40, 38, 42, 40, 41, 40, 42]}
            />
          </Reveal>
          <Reveal delay={200}>
            <PilarRow
              n="03"
              title="No descapitalizas"
              body="Mantienes tu efectivo trabajando en tu negocio, no inmovilizado en un activo."
              metric="$522K"
              metricLabel="capital libre vs comprar"
              spark={[20, 35, 50, 60, 75, 88, 100]}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MarcasSection() {
  return (
    <section className="relative overflow-hidden bg-bg-subtle py-24 md:py-28 border-y border-ink-200/70">
      <DotGrid
        cols={20}
        rows={6}
        gap={22}
        size={3}
        fade="radial"
        className="absolute -top-12 right-0 opacity-40"
      />
      <div className="container-tight relative">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow marker="02">Catálogo</Eyebrow>
              <h2 className="mt-6 font-display font-semibold tracking-tight text-ink-900 text-fluid-h2">
                Las marcas que arriendas con nosotros
              </h2>
              <p className="mt-4 max-w-xl text-ink-600">
                {MARCAS.length} marcas activas, +{totalModelos} modelos. Si la que buscas no está, la conseguimos.
              </p>
            </div>
            <Link to="/marcas">
              <Button variant="ghost" iconRight={<IconArrowRight />}>
                Ver todas las marcas
              </Button>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-ink-200/70 bg-ink-200/70 sm:grid-cols-4 lg:grid-cols-7">
            {MARCAS.map((m) => (
              <Link
                key={m.slug}
                to={`/marcas/${m.slug}`}
                className="group relative flex aspect-[4/3] items-center justify-center bg-white p-6 transition-all hover:bg-forest hover:text-white"
                aria-label={m.nombre}
              >
                <img
                  src={`${BASE}img/marcas/${m.slug}.svg`}
                  alt={m.nombre}
                  className="h-8 w-auto max-w-[120px] object-contain transition-all duration-300 [filter:grayscale(1)_brightness(0.85)] opacity-70 group-hover:opacity-100 group-hover:[filter:brightness(0)_invert(1)]"
                  loading="lazy"
                />
                <span className="absolute bottom-2 right-2.5 font-mono text-[9px] tracking-wider text-ink-400 group-hover:text-white/60 tabular-nums">
                  {String(m.modelos.length).padStart(2, '0')}
                </span>
              </Link>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 flex flex-col items-center gap-2 text-center">
            <p className="text-sm text-ink-600">¿No ves la marca o modelo que buscas?</p>
            <a
              href="https://wa.me/523300000000?text=Hola,%20busco%20una%20marca%20que%20no%20veo%20en%20el%20catálogo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-forest-700 group"
            >
              Pregunta por WhatsApp
              <IconArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProcesoSection() {
  const steps = [
    { n: '01', dur: '60 segundos', title: 'Cotizas', body: 'Eliges auto, plazo, inicial. Ves la matemática completa con desglose fiscal.' },
    { n: '02', dur: '~10 minutos', title: 'Subes documentos', body: 'Lista clara según tu tipo de persona. Drag-and-drop directo en el navegador.' },
    { n: '03', dur: 'hasta 48 hrs', title: 'Aprobamos', body: 'Análisis crediticio + propuesta firmada. Te avisamos por WhatsApp en cada hito.' },
    { n: '04', dur: 'cuando tú', title: 'Manejas', body: 'Firma digital o presencial. Entrega del auto donde te convenga.' },
  ];
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-tight">
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow marker="03">Proceso</Eyebrow>
            <h2 className="mt-6 font-display font-semibold tracking-tight text-ink-900 text-fluid-h2">
              De cotización a llaves en 4 pasos
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-ink-200/70 bg-ink-200/70 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div className="h-full bg-white p-7 lg:p-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-wider text-ink-400">{s.n}</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-forest">{s.dur}</span>
                </div>
                <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight text-ink-900">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
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

const TESTIMONIALS = [
  {
    quote: 'Mi contador me dijo que arrendar conviene. GP Autolease me lo demostró con números antes de pedirme un peso.',
    name: 'Andrea Cortés',
    role: 'Arquitecta independiente',
    car: 'Mazda CX-50 2026',
    deducido: '$172,400',
    photo: 'andrea',
  },
  {
    quote: 'El PDF que descargué se lo mandé a mi contador y firmamos a los 3 días. Cero presión, cero llamadas insistentes.',
    name: 'Roberto Hernández',
    role: 'Médico cardiólogo',
    car: 'Hyundai Tucson 2026',
    deducido: '$189,900',
    photo: 'roberto',
  },
  {
    quote: 'Mantuve $400K en mi negocio en lugar de inmovilizarlos en un auto. El cambio cada 3 años es bonus.',
    name: 'Mariana Vega',
    role: 'Despacho contable',
    car: 'Nissan X-Trail 2026',
    deducido: '$165,200',
    photo: 'mariana',
  },
];

function TestimoniosSection() {
  const [featured, ...rest] = TESTIMONIALS;
  return (
    <section className="relative overflow-hidden bg-forest-950 py-24 md:py-32 text-white">
      <DotGrid
        cols={32}
        rows={14}
        gap={22}
        size={2}
        fade="radial"
        color="#8EBF24"
        className="absolute inset-0 m-auto opacity-[0.18]"
      />

      <div className="container-tight relative">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Eyebrow marker="04" variant="inverse">Clientes reales</Eyebrow>
              <h2 className="mt-6 font-display font-semibold tracking-tight text-fluid-h2 text-white">
                Quienes ya facturan, ya arriendan
              </h2>
              <p className="mt-5 text-lg text-white/65">
                Profesionales que decidieron quedarse con su capital y dejar que el auto pague impuestos.
              </p>
            </div>
            <div className="hidden md:flex items-baseline gap-3 border-l border-white/15 pl-6">
              <span className="num-display text-fluid-stat-sm font-semibold text-lime-400 tabular-nums leading-none">
                $176K
              </span>
              <span className="text-xs uppercase tracking-[0.14em] text-white/45 max-w-[8rem] leading-tight">
                deducción anual<br />promedio PFAE
              </span>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          {/* Featured */}
          <Reveal className="lg:col-span-7" delay={80}>
            <FeaturedTestimonial {...featured} />
          </Reveal>

          {/* Secondary */}
          <div className="lg:col-span-5 grid gap-6">
            {rest.map((t, i) => (
              <Reveal key={t.name} delay={160 + i * 100}>
                <CompactTestimonial {...t} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedTestimonial({
  quote, name, role, car, deducido, photo,
}: { quote: string; name: string; role: string; car: string; deducido: string; photo: string }) {
  return (
    <article className="group relative h-full overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/[0.03]">
      <div className="grid h-full md:grid-cols-[5fr_7fr]">
        <div className="relative aspect-[4/5] md:aspect-auto overflow-hidden">
          <img
            src={`${BASE}img/persona-${photo}.webp`}
            alt={name}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.04]"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-forest-950/30" />
        </div>
        <div className="flex flex-col justify-between p-7 md:p-9">
          <div>
            <span aria-hidden className="block text-6xl font-display leading-none text-lime-400/70">"</span>
            <p className="mt-3 font-display text-2xl leading-[1.25] tracking-tight text-white md:text-3xl">
              {quote}
            </p>
          </div>
          <div className="mt-8 flex items-end justify-between gap-4 border-t border-white/10 pt-6">
            <div className="min-w-0">
              <p className="font-display text-lg font-semibold tracking-tight text-white truncate">{name}</p>
              <p className="mt-0.5 text-sm text-white/60 truncate">{role}</p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-white/40 uppercase">{car}</p>
            </div>
            <div className="flex flex-col items-end flex-shrink-0">
              <span className="num-display text-2xl font-semibold text-lime-400 tabular-nums leading-none">
                {deducido}
              </span>
              <span className="mt-1.5 font-mono text-[9px] tracking-[0.14em] text-white/40 uppercase">
                deducido al año
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function CompactTestimonial({
  quote, name, role, car, deducido, photo,
}: { quote: string; name: string; role: string; car: string; deducido: string; photo: string }) {
  return (
    <article className="group relative flex gap-5 overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/[0.03] p-5 transition-all duration-500 hover:ring-white/20 hover:bg-white/[0.05]">
      <div className="flex-shrink-0">
        <img
          src={`${BASE}img/persona-${photo}-sm.webp`}
          alt={name}
          className="h-20 w-20 rounded-full object-cover ring-1 ring-white/15"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="flex flex-col min-w-0 flex-1">
        <p className="text-sm leading-relaxed text-white/85 line-clamp-3">"{quote}"</p>
        <div className="mt-3 flex items-baseline justify-between gap-3">
          <div className="min-w-0">
            <p className="font-display text-sm font-semibold tracking-tight text-white truncate">{name}</p>
            <p className="font-mono text-[9px] tracking-[0.14em] text-white/40 uppercase truncate">{role} · {car}</p>
          </div>
          <span className="num-display text-sm font-semibold text-lime-400 tabular-nums whitespace-nowrap">
            {deducido}
          </span>
        </div>
      </div>
    </article>
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
    <section className="bg-bg-subtle py-24 md:py-28 border-y border-ink-200/70">
      <div className="container-tight">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow marker="05">Dudas frecuentes</Eyebrow>
            <h2 className="mt-6 font-display font-semibold tracking-tight text-ink-900 text-fluid-h2">
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

          <Reveal className="lg:col-span-8" delay={120}>
            <div className="divide-y divide-ink-200 rounded-xl border border-ink-200/70 bg-white">
              {FAQS.map((faq, i) => {
                const isOpen = open === i;
                return (
                  <div key={i}>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-bg-muted"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs text-ink-400 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                        <span className="font-display text-lg font-semibold tracking-tight text-ink-900">
                          {faq.q}
                        </span>
                      </div>
                      <IconChevronDown
                        size={20}
                        className={cn(
                          'flex-shrink-0 text-ink-500 transition-transform duration-300',
                          isOpen && 'rotate-180 text-forest',
                        )}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pl-[3.25rem] text-ink-700 leading-relaxed animate-fade-in">
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
    <section className="relative overflow-hidden bg-forest-950 py-28 md:py-32 text-white">
      <DotGrid
        cols={28}
        rows={12}
        gap={22}
        size={2.5}
        fade="radial"
        color="#8EBF24"
        className="absolute inset-0 m-auto opacity-30"
      />
      <div className="container-tight relative grid gap-10 lg:grid-cols-12 items-center">
        <Reveal className="lg:col-span-7">
          <Eyebrow marker="→" variant="inverse">Empieza ahora</Eyebrow>
          <h2 className="mt-6 font-display font-semibold tracking-tight text-fluid-h1 leading-[1.02]">
            ¿Listo para arrendar tu próximo auto?
          </h2>
          <p className="mt-6 max-w-xl text-lg text-white/75">
            Calcula en 60 segundos. Sin compromiso. Sin pedirte teléfono hasta que tú quieras.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/cotizar">
              <Button variant="lime" size="xl" iconRight={<IconArrowRight />}>
                Cotizar ahora
              </Button>
            </Link>
            <a href="https://wa.me/523300000000" target="_blank" rel="noopener noreferrer">
              <Button variant="inverse" size="xl" iconLeft={<IconWhatsApp size={20} />}>
                WhatsApp
              </Button>
            </a>
          </div>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={150}>
          <div className="rounded-xl border border-white/15 bg-white/[0.03] p-8 backdrop-blur-sm">
            <Eyebrow marker="$" variant="inverse">Promedio cliente PFAE</Eyebrow>
            <p className="mt-5 num-display text-5xl font-semibold tabular-nums text-lime-400 leading-none">
              $176K
            </p>
            <p className="mt-3 text-sm text-white/60">deducción anual estimada en arrendamiento puro vs $0 si compras a contado.</p>
            <HairlineDivider className="mt-6 bg-white/10" />
            <div className="mt-5 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">Crecimiento neto 36 meses</span>
              <Sparkline data={[20, 30, 45, 55, 75, 100, 130]} width={100} height={28} stroke="#8EBF24" endDot />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PilarRow({
  n, title, body, metric, metricLabel, spark,
}: {
  n: string; title: string; body: string; metric: string; metricLabel: string; spark: number[];
}) {
  return (
    <div className="group rounded-xl border border-ink-200/70 bg-white p-7 transition-all duration-300 hover:border-forest/40 hover:shadow-elevated">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs tracking-wider text-ink-400">{n}</span>
        <Sparkline data={spark} width={88} height={26} stroke="#8EBF24" />
      </div>
      <h3 className="mt-9 font-display text-2xl font-semibold tracking-tight text-ink-900">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-600">{body}</p>
      <HairlineDivider className="mt-7" />
      <div className="mt-5 flex items-baseline gap-2">
        <p className="num-display text-4xl font-semibold text-forest tabular-nums leading-none">
          {metric}
        </p>
      </div>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-ink-500">
        {metricLabel}
      </p>
    </div>
  );
}

