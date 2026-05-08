import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { IconArrowRight, IconWhatsApp } from '@/components/ui/Icon';

export default function Contacto() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-bg-subtle min-h-[calc(100vh-5rem)] py-12 md:py-20">
      <div className="container-tight max-w-5xl">
        <Pill variant="forest">Contacto</Pill>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink-900 md:text-5xl">
          Hablemos
        </h1>
        <p className="mt-4 text-lg text-ink-600">
          Tres formas. Tú eliges la velocidad.
        </p>

        {/* 3 canales */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <ChannelCard
            kind="wa"
            title="WhatsApp"
            sub="Respondemos en <30 min"
            desc="8AM - 9PM, todos los días"
            cta="Abrir WhatsApp"
            href="https://wa.me/523300000000"
            primary
          />
          <ChannelCard
            kind="email"
            title="Email"
            sub="Respondemos en <24 hrs"
            desc="hola@gpautolease.com"
            cta="Escribir email"
            href="mailto:hola@gpautolease.com"
          />
          <ChannelCard
            kind="visit"
            title="Visítanos"
            sub="Lun a Sáb · 9AM - 7PM"
            desc="Mariano Otero 405, Zapopan"
            cta="Ver mapa"
            href="https://maps.app.goo.gl/eagYrNWDJB8vap7v8"
          />
        </div>

        {/* Form */}
        <div className="mt-16">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-ink-200" />
            <span className="text-xs uppercase tracking-wider text-ink-500">o déjanos un mensaje</span>
            <div className="h-px flex-1 bg-ink-200" />
          </div>

          <Card variant="default" padded="lg" className="max-w-3xl mx-auto">
            {submitted ? (
              <div className="text-center py-8">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-forest-50 text-forest">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900">
                  Mensaje enviado
                </h2>
                <p className="mt-2 text-ink-600">Te contactamos en menos de 4 horas hábiles.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm font-medium text-forest hover:text-forest-700"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input label="Nombre" name="nombre" required />
                  <Input label="Email" name="email" type="email" required />
                </div>
                <Input label="Teléfono / WhatsApp" name="telefono" type="tel" hint="Opcional, si prefieres que te llamemos" />

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink-800">
                    ¿En qué te ayudamos? <span className="text-danger">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    className="w-full rounded-md border border-ink-200 bg-white px-3.5 py-2.5 outline-none transition-all focus:border-forest focus:shadow-focus-forest"
                    placeholder="Cuéntanos qué auto te interesa, tipo de persona, y cualquier duda. Mientras más concreto, mejor te ayudamos."
                  />
                </div>

                <label className="flex items-start gap-3 text-sm text-ink-600">
                  <input type="checkbox" required className="mt-1" />
                  <span>
                    Acepto el <a href="/aviso-de-privacidad" className="text-forest hover:underline">aviso de privacidad</a>.
                  </span>
                </label>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
                  <p className="text-xs text-ink-500">
                    Te respondemos en menos de 4 horas hábiles.
                  </p>
                  <Button type="submit" variant="primary" size="lg" iconRight={<IconArrowRight />}>
                    Enviar mensaje
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

function ChannelCard({
  kind,
  title,
  sub,
  desc,
  cta,
  href,
  primary,
}: {
  kind: 'wa' | 'email' | 'visit';
  title: string;
  sub: string;
  desc: string;
  cta: string;
  href: string;
  primary?: boolean;
}) {
  const icons = {
    wa: <IconWhatsApp size={28} />,
    email: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    visit: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  };

  return (
    <Card
      variant={primary ? 'forest' : 'default'}
      padded="lg"
      className="flex flex-col"
    >
      <div className={primary ? 'text-lime-400' : 'text-forest'}>{icons[kind]}</div>
      <h3 className={`mt-5 font-display text-2xl font-semibold tracking-tight ${primary ? 'text-white' : 'text-ink-900'}`}>
        {title}
      </h3>
      <p className={`mt-1 text-sm font-medium ${primary ? 'text-lime-300' : 'text-forest'}`}>
        {sub}
      </p>
      <p className={`mt-3 text-sm flex-1 ${primary ? 'text-white/70' : 'text-ink-600'}`}>{desc}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${primary ? 'text-white hover:text-lime-300' : 'text-forest hover:text-forest-700'}`}
      >
        {cta}
        <IconArrowRight size={14} />
      </a>
    </Card>
  );
}
