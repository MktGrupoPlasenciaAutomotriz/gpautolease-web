import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { IconArrowRight, IconWhatsApp, IconChevronDown } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';

interface QA {
  q: string;
  a: string;
}

const FAQS: Record<string, QA[]> = {
  Fiscal: [
    {
      q: '¿Cuánto puedo deducir si soy PFAE?',
      a: 'Si usas el auto al 100% para tu actividad empresarial, deduces el 100% de la mensualidad. Si tu uso es parcial, deduces el porcentaje correspondiente al uso fiscal real. Tu contador puede ajustar el % al firmar contrato según tus movimientos y régimen específico.',
    },
    {
      q: '¿Qué pasa con el IVA?',
      a: 'Cada mensualidad lleva 16% de IVA, que es acreditable contra el IVA que cobras a tus clientes. Es flujo de caja directo, no se queda como saldo a favor del SAT. Para autos eléctricos / híbridos hay reglas especiales que potencian el beneficio.',
    },
    {
      q: '¿Necesito cambiar de régimen para arrendar?',
      a: 'No. Mientras tengas RFC con actividad empresarial (PFAE, RESICO PF con actividad, o Persona Moral) puedes arrendar y deducir. Si eres persona física pura sin actividad, los beneficios fiscales no aplican y probablemente te conviene más un crédito.',
    },
    {
      q: '¿Cómo declaro el arrendamiento ante el SAT?',
      a: 'Como gasto deducible bajo el concepto de "Arrendamiento Puro" en tu declaración mensual. El IVA se acredita en la misma declaración. Te entregamos factura mensual electrónica con todos los datos fiscales correctos.',
    },
    {
      q: '¿Hay tope de deducción?',
      a: 'La deducción de mensualidad de arrendamiento no tiene tope cuando el uso es 100% para actividad empresarial y el contrato es propiamente de arrendamiento puro. Es distinto al tope de $200K que aplica a deducción de inversiones (compra), que NO te aplica aquí.',
    },
  ],
  Contractual: [
    {
      q: '¿Qué pasa al final del contrato?',
      a: 'Tres opciones, todas tuyas: (1) ejerces opción de compra al valor residual acordado al inicio del contrato, (2) devuelves el auto y arriendas uno nuevo, (3) decides al momento sin presión. El valor residual se acuerda desde la firma para evitar sorpresas.',
    },
    {
      q: '¿Puedo terminar el contrato antes?',
      a: 'Sí, con aplicación de penalización pre-acordada o reestructuración. Las opciones varían según el motivo: cambio de actividad, problemas financieros, cesión a un tercero. Te las explicamos caso por caso, sin sorpresas.',
    },
    {
      q: '¿Puedo ceder el contrato a otra persona?',
      a: 'Sí, sujeto a aprobación crediticia del nuevo titular. El proceso típico toma 2-3 semanas. Aplica una comisión administrativa pre-acordada en el contrato original.',
    },
    {
      q: '¿Hay penalizaciones por pago tarde?',
      a: 'Sí, intereses moratorios estándar del mercado, pre-acordados en el contrato. Si vas a tener problemas con un pago, contáctanos antes de la fecha límite — siempre podemos buscar una solución.',
    },
  ],
  Operativo: [
    {
      q: '¿Cuánto tarda la aprobación?',
      a: 'Hasta 48 horas hábiles desde que recibimos todos los documentos completos. Si falta algo, te avisamos por WhatsApp dentro de las primeras 4 horas. La mayoría de aprobaciones cierran en menos de 36 hrs.',
    },
    {
      q: '¿Qué documentos necesito?',
      a: 'PFAE: identificación oficial, comprobante de domicilio reciente y declaraciones anuales de los últimos 2 años. Persona Moral: acta constitutiva, identificación del representante legal, estados financieros básicos y comprobante de domicilio fiscal.',
    },
    {
      q: '¿Hay límite de kilometraje?',
      a: 'Sí, definido al firmar contrato según tu uso esperado (típicamente 20,000 a 30,000 km/año). Si excedes, hay un cargo por kilómetro extra acordado desde el inicio. Lo ves antes de firmar — sin sorpresas.',
    },
    {
      q: '¿El mantenimiento y seguro están incluidos?',
      a: 'Sí en planes Premium y Premium+. En el plan básico el seguro va por separado pero te ayudamos a contratarlo. El mantenimiento periódico (servicios) está incluido en todos los planes mientras el auto esté dentro del kilometraje pactado.',
    },
    {
      q: '¿Dónde se entrega el auto?',
      a: 'En cualquier agencia de la red Plasencia en GDL y zona metropolitana sin costo. Para entrega en domicilio o fuera de GDL aplica un cargo logístico, que te cotizamos por separado.',
    },
  ],
  Técnico: [
    {
      q: '¿Qué marcas puedo arrendar?',
      a: 'Tenemos las 13 marcas más demandadas activas: Mazda, Hyundai, Chevrolet, Ford, Jeep, RAM, Dodge, GMC, Buick, Peugeot, Changan, GAC y Nissan. Si la marca o modelo que buscas no está, pregúntanos por WhatsApp — tenemos acceso a +15 marcas.',
    },
    {
      q: '¿Pueden ser modelos del año o usados?',
      a: 'Solo modelos del año en curso o del inmediato anterior, en agencia, con garantía vigente. No arrendamos seminuevos ni usados — para eso, las landings de Seminuevos del Grupo Plasencia.',
    },
    {
      q: '¿Pueden ser autos eléctricos o híbridos?',
      a: 'Sí, y de hecho la deducción es más favorable para EV/HEV. Tenemos modelos de Hyundai, Mazda, Ford y otras marcas con tecnología eléctrica.',
    },
    {
      q: '¿Hay opción de equipar el auto con accesorios?',
      a: 'Sí, accesorios fijos al auto (rines, blindaje, equipo de comunicación) se cotizan junto con el contrato y se incluyen en la mensualidad. Accesorios removibles (cargadores, organizadores) los puedes poner tú.',
    },
  ],
};

const CATEGORIES = Object.keys(FAQS);

export default function Preguntas() {
  const [active, setActive] = useState<string>('Fiscal');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set([`${CATEGORIES[0]}-0`]));

  const toggle = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="bg-bg-subtle min-h-[calc(100vh-5rem)] py-14 md:py-20">
      <div className="container-tight max-w-4xl">
        <Eyebrow marker="?">Soporte</Eyebrow>
        <h1 className="mt-6 font-display font-semibold tracking-tight text-ink-900 text-fluid-h1 leading-[1.02]">
          Preguntas frecuentes
        </h1>
        <p className="mt-5 text-lg text-ink-600 leading-relaxed">
          Si la tuya no está aquí, mándala por WhatsApp. Respondemos en menos de 30 minutos en horario de oficina.
        </p>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap gap-2 border-b border-ink-200">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                'rounded-t-md px-5 py-3 text-sm font-medium transition-colors',
                active === cat
                  ? 'bg-white text-forest border-b-2 border-forest -mb-px'
                  : 'text-ink-500 hover:text-ink-800',
              )}
            >
              {cat}
              <span className="ml-2 text-xs text-ink-400">{FAQS[cat].length}</span>
            </button>
          ))}
        </div>

        {/* Acordeón */}
        <div className="mt-6 divide-y divide-ink-200 rounded-xl bg-white shadow-card">
          {FAQS[active].map((faq, i) => {
            const key = `${active}-${i}`;
            const isOpen = openItems.has(key);
            return (
              <div key={key}>
                <button
                  onClick={() => toggle(key)}
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
                  <div className="px-6 pb-6 leading-relaxed text-ink-700 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-xl bg-white p-8 ring-1 ring-ink-200 text-center">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900">
            ¿No encontraste tu respuesta?
          </h2>
          <p className="mt-2 text-ink-600">Mándala por WhatsApp y te respondemos en menos de 30 minutos.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/523300000000"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="lg" iconLeft={<IconWhatsApp size={20} />}>
                Pregunta por WhatsApp
              </Button>
            </a>
            <Link to="/cotizar">
              <Button variant="secondary" size="lg" iconRight={<IconArrowRight />}>
                Mejor cotizo y luego pregunto
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
