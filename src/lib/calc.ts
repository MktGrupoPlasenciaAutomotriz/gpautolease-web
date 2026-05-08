/**
 * Modelo de cálculo de arrendamiento puro vs crédito vs contado.
 *
 * Disclaimer: Estimación basada en supuestos generales del mercado mexicano
 * 2026. Los números reales se ajustan en contrato según perfil crediticio,
 * marca, plazo y régimen fiscal específico del cliente. El PDF descargable
 * incluye este disclaimer prominentemente.
 *
 * Supuestos default:
 *   IVA: 16%
 *   ISR PFAE máximo: 30%
 *   Tasa arrendamiento puro: 18% anual nominal
 *   Tasa crédito automotriz: 12% anual nominal
 *   Valor residual a 36m: 40% del precio
 *   Valor residual a 24m: 55%
 *   Valor residual a 48m: 28%
 *   Valor residual a 60m: 18%
 *   Depreciación de auto comprado: ~20% año 1, 15% año 2, 12% año 3 → ~57% al final año 3
 */

export type TipoPersona = 'pfae' | 'pm' | 'pf';

export interface CalcInput {
  precioAuto: number;
  pagoInicialPct: number; // 0..1
  plazoMeses: number; // 24, 36, 48, 60
  tipoPersona: TipoPersona;
  usoFiscalPct: number; // 0..1, qué % del uso es para actividad empresarial
  esEcoVerde?: boolean; // híbrido / eléctrico (deducción potenciada)
}

export interface CalcOutput {
  // Inputs derivados
  pagoInicialMonto: number;
  precioNeto: number; // precio - inicial
  valorResidual: number;

  // Arrendamiento
  arrendamiento: {
    mensualidad: number; // sin IVA
    mensualidadConIVA: number;
    ivaMensual: number;
    totalPagado36: number;
    deduccionAnual: number; // monto deducible base
    isrAhorradoAnual: number;
    ivaAcreditableAnual: number;
    flujoNetoTotal: number; // costo neto total post-impuestos
    capitalLibre: number; // dinero que no salió de tu negocio
  };

  // Crédito tradicional
  credito: {
    pagoInicial: number; // típicamente 20%
    mensualidad: number;
    totalPagado: number;
    valorAutoFinal: number;
    flujoNetoTotal: number;
  };

  // Contado
  contado: {
    pagoInicial: number; // 100%
    ivaAcreditable: number;
    valorAutoFinal: number;
    flujoNetoTotal: number;
  };
}

const IVA = 0.16;
const ISR_PFAE = 0.30;
const TASA_ARREND_ANUAL = 0.18;
const TASA_CREDITO_ANUAL = 0.12;

const valorResidualPorPlazo = (meses: number): number => {
  if (meses <= 24) return 0.55;
  if (meses <= 36) return 0.40;
  if (meses <= 48) return 0.28;
  return 0.18;
};

const depreciacionPorPlazo = (meses: number): number => {
  // % del precio que el auto vale al final del plazo si lo compras
  if (meses <= 24) return 0.70;
  if (meses <= 36) return 0.55;
  if (meses <= 48) return 0.42;
  return 0.32;
};

/**
 * Mensualidad de arrendamiento usando fórmula simplificada:
 *   M = (Precio - VR - Inicial) / N + (Precio + VR) / 2 * (i/12)
 *
 * Que aproxima el costo financiero promedio sobre el saldo pendiente.
 */
function mensualidadArrendamiento(
  precio: number,
  inicial: number,
  meses: number,
): number {
  const vrPct = valorResidualPorPlazo(meses);
  const vr = precio * vrPct;
  const capital = precio - vr - inicial;
  const tasaMensual = TASA_ARREND_ANUAL / 12;
  const cargoFinanciero = ((precio + vr) / 2) * tasaMensual;
  return capital / meses + cargoFinanciero;
}

/**
 * Mensualidad de crédito automotriz (anualidad fija).
 */
function mensualidadCredito(
  monto: number,
  meses: number,
  tasaAnual = TASA_CREDITO_ANUAL,
): number {
  const i = tasaAnual / 12;
  if (i === 0) return monto / meses;
  return (monto * i) / (1 - Math.pow(1 + i, -meses));
}

export function calcular(input: CalcInput): CalcOutput {
  const {
    precioAuto,
    pagoInicialPct,
    plazoMeses,
    tipoPersona,
    usoFiscalPct,
    esEcoVerde = false,
  } = input;

  const pagoInicialMonto = precioAuto * pagoInicialPct;
  const precioNeto = precioAuto - pagoInicialMonto;
  const valorResidual = precioAuto * valorResidualPorPlazo(plazoMeses);

  // === ARRENDAMIENTO ===
  const mensualidadBase = mensualidadArrendamiento(
    precioAuto,
    pagoInicialMonto,
    plazoMeses,
  );
  const ivaMensual = mensualidadBase * IVA;
  const mensualidadConIVA = mensualidadBase + ivaMensual;
  const totalPagado36 = mensualidadConIVA * plazoMeses + pagoInicialMonto;

  // Deducción: aplica solo si tipo persona deduce. Boost para eco-verde.
  const factorEco = esEcoVerde ? 1.15 : 1;
  const factorTipoPersona = tipoPersona === 'pfae' || tipoPersona === 'pm' ? 1 : 0;
  const deduccionAnual =
    mensualidadBase * 12 * usoFiscalPct * factorEco * factorTipoPersona;
  const isrAhorradoAnual = deduccionAnual * ISR_PFAE;
  const ivaAcreditableAnual =
    ivaMensual * 12 * usoFiscalPct * factorTipoPersona;

  const aniosCompletos = plazoMeses / 12;
  const flujoNetoArrend =
    totalPagado36 -
    isrAhorradoAnual * aniosCompletos -
    ivaAcreditableAnual * aniosCompletos;
  const capitalLibre = precioAuto - pagoInicialMonto;

  // === CRÉDITO TRADICIONAL ===
  // Asume pago inicial 20% del precio (estándar mercado MX)
  const credInicial = precioAuto * 0.20;
  const credMonto = precioAuto - credInicial;
  const credMensualidad = mensualidadCredito(credMonto, plazoMeses);
  const credTotal = credMensualidad * plazoMeses + credInicial;
  const credValorFinal = precioAuto * depreciacionPorPlazo(plazoMeses);
  // Flujo neto = lo pagado menos lo que vale el auto (que sí es activo del cliente)
  const credFlujoNeto = credTotal - credValorFinal;

  // === CONTADO ===
  const contIvaAcreditable =
    precioAuto * IVA * usoFiscalPct * factorTipoPersona;
  const contValorFinal = precioAuto * depreciacionPorPlazo(plazoMeses);
  const contFlujoNeto = precioAuto - contIvaAcreditable - contValorFinal;

  return {
    pagoInicialMonto,
    precioNeto,
    valorResidual,
    arrendamiento: {
      mensualidad: mensualidadBase,
      mensualidadConIVA,
      ivaMensual,
      totalPagado36,
      deduccionAnual,
      isrAhorradoAnual,
      ivaAcreditableAnual,
      flujoNetoTotal: flujoNetoArrend,
      capitalLibre,
    },
    credito: {
      pagoInicial: credInicial,
      mensualidad: credMensualidad,
      totalPagado: credTotal,
      valorAutoFinal: credValorFinal,
      flujoNetoTotal: credFlujoNeto,
    },
    contado: {
      pagoInicial: precioAuto,
      ivaAcreditable: contIvaAcreditable,
      valorAutoFinal: contValorFinal,
      flujoNetoTotal: contFlujoNeto,
    },
  };
}
