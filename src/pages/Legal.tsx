import { Link, useLocation } from 'react-router-dom';
import { Eyebrow } from '@/components/ui/Eyebrow';

const COPY: Record<string, { eyebrow: string; title: string; body: React.ReactNode }> = {
  '/aviso-de-privacidad': {
    eyebrow: 'Privacidad',
    title: 'Aviso de privacidad',
    body: (
      <>
        <p>
          GP Autolease, parte del Grupo Plasencia, con domicilio en Av. Mariano Otero
          405, Jardines del Sol, 45050 Zapopan, Jalisco, es responsable del tratamiento
          de tus datos personales.
        </p>
        <h3>Finalidades del tratamiento</h3>
        <p>
          Tus datos se utilizan para evaluar y procesar tu solicitud de arrendamiento,
          ejecutar el contrato y darle seguimiento a la relación comercial. No
          compartimos datos con terceros con fines mercadológicos sin tu consentimiento
          expreso.
        </p>
        <h3>Derechos ARCO</h3>
        <p>
          Tienes derecho a acceder, rectificar, cancelar u oponerte al tratamiento de
          tus datos. Para ejercerlos, escríbenos a hola@gpautolease.com.
        </p>
        <p className="text-sm text-ink-500">
          Este aviso es un placeholder. La versión definitiva la valida el equipo legal
          del Grupo Plasencia antes del cutover de producción.
        </p>
      </>
    ),
  },
  '/terminos': {
    eyebrow: 'Legal',
    title: 'Términos y condiciones',
    body: (
      <>
        <p>
          Al usar este sitio aceptas los presentes términos y condiciones. La
          información sobre cotizaciones, plazos y mensualidades es referencial; los
          términos exactos del contrato se confirman al firmar.
        </p>
        <h3>Cotizaciones</h3>
        <p>
          Los cálculos están basados en supuestos generales (ISR 30%, IVA 16%,
          depreciación lineal) y no constituyen una oferta vinculante. La cotización
          definitiva considera tu perfil crediticio, marca, plazo y régimen fiscal.
        </p>
        <h3>Aprobación</h3>
        <p>
          Toda solicitud está sujeta a análisis crediticio y aprobación. La aprobación
          puede tardar hasta 48 horas hábiles desde la entrega completa de documentos.
        </p>
        <p className="text-sm text-ink-500">
          Documento placeholder. La versión definitiva la valida el equipo legal antes
          del cutover.
        </p>
      </>
    ),
  },
  '/transparencia': {
    eyebrow: 'Transparencia',
    title: 'Información de transparencia',
    body: (
      <>
        <p>
          Operamos bajo las disposiciones de la CONDUSEF y el SAT aplicables a
          arrendamiento puro. Estamos registrados como entidad del sector financiero
          ante las autoridades correspondientes.
        </p>
        <h3>CAT y comisiones</h3>
        <p>
          El Costo Anual Total (CAT) y todas las comisiones aplicables se desglosan en
          la cotización oficial y en el contrato. Cero comisiones ocultas.
        </p>
        <h3>Buró financiero</h3>
        <p>
          GP Autolease está registrada en el Buró de Entidades Financieras de la
          CONDUSEF. Puedes consultar nuestro historial y reclamaciones en
          buro.gob.mx.
        </p>
        <p className="text-sm text-ink-500">
          Página placeholder. Reglas, registros y enlaces oficiales se completan antes
          del cutover.
        </p>
      </>
    ),
  },
};

export default function Legal() {
  const { pathname } = useLocation();
  const data = COPY[pathname];
  if (!data) return null;

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container-prose">
        <Link to="/" className="text-sm text-ink-500 hover:text-forest transition-colors">← Inicio</Link>
        <div className="mt-8">
          <Eyebrow marker="§">{data.eyebrow}</Eyebrow>
        </div>
        <h1 className="mt-6 font-display font-semibold tracking-tight text-ink-900 text-fluid-h1 leading-[1.02]">
          {data.title}
        </h1>
        <div className="prose prose-lg mt-8 max-w-none text-ink-700 leading-relaxed [&_h3]:font-display [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-ink-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mt-4">
          {data.body}
        </div>
      </div>
    </div>
  );
}
