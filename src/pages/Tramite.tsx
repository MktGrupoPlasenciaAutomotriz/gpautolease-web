import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { IconArrowRight, IconArrowLeft, IconCheck, IconUpload, IconClock } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';

type Step = 1 | 2 | 3;

interface DocSpec {
  key: string;
  label: string;
  hint: string;
}

const DOCS_PFAE: DocSpec[] = [
  { key: 'ine', label: 'Identificación oficial', hint: 'INE o pasaporte, frente y reverso · PDF, JPG o PNG · Max 5MB' },
  { key: 'cdomicilio', label: 'Comprobante de domicilio', hint: 'Recibo CFE / Telmex / agua, no mayor a 3 meses' },
  { key: 'declaraciones', label: 'Declaraciones anuales', hint: 'PDF de las últimas 2 declaraciones anuales del SAT' },
];

export default function Tramite() {
  const [step, setStep] = useState<Step>(1);
  const [uploaded, setUploaded] = useState<Record<string, string>>({});
  const [folio, setFolio] = useState<string | null>(null);

  const allDocsUploaded = DOCS_PFAE.every((d) => uploaded[d.key]);

  const handleSubmit = () => {
    // TODO: cablear con Worker /api/tramite
    const f = `GPA-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    setFolio(f);
    setStep(3);
  };

  return (
    <div className="bg-bg-subtle min-h-[calc(100vh-5rem)] py-10 md:py-16">
      <div className="container-tight max-w-3xl">
        <Link to="/cotizar/resultado" className="text-sm text-ink-500 hover:text-forest">
          ← Volver a cotización
        </Link>

        <div className="mt-6">
          <Progress step={step} />
        </div>

        <div className="mt-8 animate-fade-in">
          {step === 1 && (
            <Card variant="default" padded="lg">
              <Pill variant="forest">Trámite paso 1 de 3</Pill>
              <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-900 md:text-4xl">
                Confirma tus datos
              </h1>
              <p className="mt-2 text-ink-600">
                Estos datos van a tu contrato. Verifica que estén correctos.
              </p>

              <form
                className="mt-8 space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(2);
                }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input label="Nombre completo" name="nombre" required />
                  <Input label="RFC" name="rfc" required hint="13 caracteres" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input label="Email" name="email" type="email" required />
                  <Input label="WhatsApp" name="wa" type="tel" required prefix="+52" />
                </div>
                <div className="grid gap-5 sm:grid-cols-3">
                  <Input label="Código postal" name="cp" required />
                  <div className="sm:col-span-2">
                    <Input label="Calle y número" name="calle" required />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-3">
                  <Input label="Colonia" name="colonia" />
                  <Input label="Ciudad" name="ciudad" />
                  <Input label="Estado" name="estado" />
                </div>

                <label className="flex items-start gap-3 text-sm text-ink-600 pt-2">
                  <input type="checkbox" required className="mt-1" />
                  <span>
                    Acepto el{' '}
                    <a href="/aviso-de-privacidad" className="text-forest hover:underline">
                      aviso de privacidad
                    </a>{' '}
                    y autorizo el análisis crediticio.
                  </span>
                </label>

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between pt-4">
                  <Link to="/cotizar/resultado">
                    <Button type="button" variant="ghost">Atrás</Button>
                  </Link>
                  <Button type="submit" variant="primary" size="lg" iconRight={<IconArrowRight />}>
                    Continuar
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {step === 2 && (
            <Card variant="default" padded="lg">
              <Pill variant="forest">Trámite paso 2 de 3</Pill>
              <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-900 md:text-4xl">
                Sube tus documentos
              </h1>
              <p className="mt-2 text-ink-600">
                Drag-and-drop directo aquí. Validamos calidad antes de procesar.
              </p>

              <div className="mt-8 space-y-4">
                {DOCS_PFAE.map((doc) => (
                  <DocUpload
                    key={doc.key}
                    spec={doc}
                    uploaded={uploaded[doc.key]}
                    onUpload={(filename) => setUploaded((u) => ({ ...u, [doc.key]: filename }))}
                  />
                ))}
              </div>

              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <Button variant="ghost" onClick={() => setStep(1)} iconLeft={<IconArrowLeft size={18} />}>
                  Atrás
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={!allDocsUploaded}
                  iconRight={<IconArrowRight />}
                >
                  Enviar trámite
                </Button>
              </div>
            </Card>
          )}

          {step === 3 && folio && (
            <Card variant="default" padded="xl" className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-forest-50 text-forest">
                <IconCheck size={32} />
              </div>
              <Pill variant="lime">Trámite enviado</Pill>
              <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-900 md:text-5xl">
                Tu folio:{' '}
                <span className="num-display text-forest">{folio}</span>
              </h1>
              <p className="mt-4 text-ink-600 max-w-md mx-auto">
                Guárdalo para seguimiento. Te avisamos por WhatsApp en cada hito del proceso.
              </p>

              <div className="mx-auto mt-10 max-w-lg rounded-xl bg-bg-muted p-6 text-left">
                <p className="text-sm font-semibold uppercase tracking-wider text-forest">
                  Próximos pasos
                </p>
                <ul className="mt-4 space-y-3">
                  <NextStep n="1" title="Revisamos tus documentos" eta="hoy" done />
                  <NextStep n="2" title="Análisis crediticio" eta="hasta 24 hrs" />
                  <NextStep n="3" title="Aprobación y propuesta" eta="hasta 48 hrs" />
                  <NextStep n="4" title="Firma y entrega" eta="cuando tú elijas" />
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href="https://wa.me/523300000000"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="lg">Hablar por WhatsApp</Button>
                </a>
                <Link to="/">
                  <Button variant="ghost" size="lg">Volver al inicio</Button>
                </Link>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function Progress({ step }: { step: Step }) {
  const labels = ['Datos', 'Documentos', 'Confirmación'];
  return (
    <div>
      <div className="flex items-center gap-1.5">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={cn(
              'h-1 flex-1 rounded-full transition-colors',
              step >= s ? 'bg-forest' : 'bg-ink-200',
            )}
          />
        ))}
      </div>
      <div className="mt-3 flex justify-between text-xs">
        {labels.map((l, i) => (
          <span
            key={l}
            className={cn(
              'flex-1 text-center font-medium',
              i === 0 && 'text-left',
              i === labels.length - 1 && 'text-right',
              step >= i + 1 ? 'text-forest' : 'text-ink-400',
            )}
          >
            {i + 1}. {l}
          </span>
        ))}
      </div>
    </div>
  );
}

function DocUpload({
  spec,
  uploaded,
  onUpload,
}: {
  spec: DocSpec;
  uploaded?: string;
  onUpload: (filename: string) => void;
}) {
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert('El archivo no puede exceder 5MB');
      return;
    }
    onUpload(file.name);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
      }}
      className={cn(
        'rounded-lg border-2 border-dashed p-5 transition-all',
        uploaded
          ? 'border-forest bg-forest-50/40'
          : dragOver
          ? 'border-forest bg-forest-50/60'
          : 'border-ink-300 bg-white hover:border-ink-400',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-display font-semibold tracking-tight text-ink-900">
            {spec.label}
          </h3>
          <p className="mt-0.5 text-xs text-ink-500">{spec.hint}</p>
          {uploaded && (
            <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-forest/10 px-2 py-0.5 text-xs font-medium text-forest">
              <IconCheck size={12} /> {uploaded}
            </p>
          )}
        </div>
        <label className="cursor-pointer">
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="sr-only"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFile(e.target.files[0]);
            }}
          />
          <span className="inline-flex h-10 items-center gap-1.5 rounded-md bg-white px-4 text-sm font-medium text-forest ring-1 ring-forest/30 hover:bg-forest-50 transition-colors">
            <IconUpload size={16} />
            {uploaded ? 'Cambiar' : 'Subir'}
          </span>
        </label>
      </div>
    </div>
  );
}

function NextStep({ n, title, eta, done }: { n: string; title: string; eta: string; done?: boolean }) {
  return (
    <li className="flex items-center gap-3">
      <span
        className={cn(
          'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold',
          done ? 'bg-forest text-white' : 'bg-white ring-1 ring-ink-300 text-ink-500',
        )}
      >
        {done ? <IconCheck size={14} /> : n}
      </span>
      <div className="flex-1 flex items-baseline justify-between gap-3">
        <span className={cn('font-medium', done ? 'text-ink-900' : 'text-ink-700')}>{title}</span>
        <span className="flex items-center gap-1 text-xs text-ink-500">
          <IconClock size={12} /> {eta}
        </span>
      </div>
    </li>
  );
}
