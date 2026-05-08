export interface Modelo {
  slug: string;
  nombre: string;
  tipo: 'sedan' | 'suv' | 'pickup' | 'hatch' | 'mpv';
  precioDesde: number;
  hibridoEv?: boolean;
}

export interface Marca {
  slug: string;
  nombre: string;
  logoColor: string; // hex aproximado
  modelos: Modelo[];
}

/**
 * Catálogo placeholder para v1. En producción este data se sirve desde
 * /api/marcas (Cloudflare Worker), reaprovechando feed MaxiPublica filtrado
 * por marcas activas en Autolease.
 */
export const MARCAS: Marca[] = [
  {
    slug: 'mazda',
    nombre: 'Mazda',
    logoColor: '#0E1A2C',
    modelos: [
      { slug: 'cx-5', nombre: 'CX-5', tipo: 'suv', precioDesde: 545000 },
      { slug: 'cx-50', nombre: 'CX-50', tipo: 'suv', precioDesde: 580000 },
      { slug: 'cx-30', nombre: 'CX-30', tipo: 'suv', precioDesde: 470000 },
      { slug: 'mazda3', nombre: 'Mazda3', tipo: 'sedan', precioDesde: 410000 },
      { slug: 'mx-30', nombre: 'MX-30', tipo: 'suv', precioDesde: 690000, hibridoEv: true },
    ],
  },
  {
    slug: 'hyundai',
    nombre: 'Hyundai',
    logoColor: '#002C5F',
    modelos: [
      { slug: 'tucson', nombre: 'Tucson', tipo: 'suv', precioDesde: 525000 },
      { slug: 'creta', nombre: 'Creta', tipo: 'suv', precioDesde: 395000 },
      { slug: 'elantra', nombre: 'Elantra', tipo: 'sedan', precioDesde: 410000 },
      { slug: 'kona', nombre: 'Kona', tipo: 'suv', precioDesde: 445000 },
      { slug: 'ioniq-5', nombre: 'Ioniq 5', tipo: 'suv', precioDesde: 950000, hibridoEv: true },
    ],
  },
  {
    slug: 'chevrolet',
    nombre: 'Chevrolet',
    logoColor: '#FFC72C',
    modelos: [
      { slug: 'aveo', nombre: 'Aveo', tipo: 'sedan', precioDesde: 295000 },
      { slug: 'tracker', nombre: 'Tracker', tipo: 'suv', precioDesde: 410000 },
      { slug: 'trax', nombre: 'Trax', tipo: 'suv', precioDesde: 470000 },
      { slug: 'equinox', nombre: 'Equinox', tipo: 'suv', precioDesde: 595000 },
      { slug: 'silverado', nombre: 'Silverado', tipo: 'pickup', precioDesde: 980000 },
    ],
  },
  {
    slug: 'ford',
    nombre: 'Ford',
    logoColor: '#003478',
    modelos: [
      { slug: 'territory', nombre: 'Territory', tipo: 'suv', precioDesde: 510000 },
      { slug: 'escape', nombre: 'Escape', tipo: 'suv', precioDesde: 615000 },
      { slug: 'maverick', nombre: 'Maverick', tipo: 'pickup', precioDesde: 545000, hibridoEv: true },
      { slug: 'f-150', nombre: 'F-150', tipo: 'pickup', precioDesde: 1050000 },
    ],
  },
  {
    slug: 'jeep',
    nombre: 'Jeep',
    logoColor: '#1F5C24',
    modelos: [
      { slug: 'compass', nombre: 'Compass', tipo: 'suv', precioDesde: 580000 },
      { slug: 'grand-cherokee', nombre: 'Grand Cherokee', tipo: 'suv', precioDesde: 1295000 },
      { slug: 'wrangler', nombre: 'Wrangler', tipo: 'suv', precioDesde: 1145000 },
    ],
  },
  {
    slug: 'ram',
    nombre: 'RAM',
    logoColor: '#000000',
    modelos: [
      { slug: '1500', nombre: '1500', tipo: 'pickup', precioDesde: 1080000 },
      { slug: '700', nombre: '700', tipo: 'pickup', precioDesde: 415000 },
      { slug: '2500', nombre: '2500', tipo: 'pickup', precioDesde: 1395000 },
    ],
  },
  {
    slug: 'dodge',
    nombre: 'Dodge',
    logoColor: '#A80000',
    modelos: [
      { slug: 'attitude', nombre: 'Attitude', tipo: 'sedan', precioDesde: 285000 },
      { slug: 'journey', nombre: 'Journey', tipo: 'suv', precioDesde: 525000 },
    ],
  },
  {
    slug: 'gmc',
    nombre: 'GMC',
    logoColor: '#C8102E',
    modelos: [
      { slug: 'terrain', nombre: 'Terrain', tipo: 'suv', precioDesde: 695000 },
      { slug: 'sierra', nombre: 'Sierra', tipo: 'pickup', precioDesde: 1150000 },
    ],
  },
  {
    slug: 'buick',
    nombre: 'Buick',
    logoColor: '#A8A9AD',
    modelos: [
      { slug: 'envision', nombre: 'Envision', tipo: 'suv', precioDesde: 720000 },
      { slug: 'enclave', nombre: 'Enclave', tipo: 'suv', precioDesde: 980000 },
    ],
  },
  {
    slug: 'peugeot',
    nombre: 'Peugeot',
    logoColor: '#1B2C50',
    modelos: [
      { slug: '2008', nombre: '2008', tipo: 'suv', precioDesde: 425000 },
      { slug: '3008', nombre: '3008', tipo: 'suv', precioDesde: 615000 },
      { slug: 'partner', nombre: 'Partner', tipo: 'mpv', precioDesde: 380000 },
    ],
  },
  {
    slug: 'changan',
    nombre: 'Changan',
    logoColor: '#0070C0',
    modelos: [
      { slug: 'cs35-plus', nombre: 'CS35 Plus', tipo: 'suv', precioDesde: 350000 },
      { slug: 'cs55-plus', nombre: 'CS55 Plus', tipo: 'suv', precioDesde: 410000 },
      { slug: 'eado-plus', nombre: 'Eado Plus', tipo: 'sedan', precioDesde: 320000 },
    ],
  },
  {
    slug: 'gac',
    nombre: 'GAC',
    logoColor: '#C8102E',
    modelos: [
      { slug: 'emkoo', nombre: 'Emkoo', tipo: 'suv', precioDesde: 385000 },
      { slug: 'emzoom', nombre: 'Emzoom', tipo: 'suv', precioDesde: 425000 },
    ],
  },
  {
    slug: 'nissan',
    nombre: 'Nissan',
    logoColor: '#C3002F',
    modelos: [
      { slug: 'versa', nombre: 'Versa', tipo: 'sedan', precioDesde: 305000 },
      { slug: 'kicks', nombre: 'Kicks', tipo: 'suv', precioDesde: 410000 },
      { slug: 'sentra', nombre: 'Sentra', tipo: 'sedan', precioDesde: 425000 },
      { slug: 'x-trail', nombre: 'X-Trail', tipo: 'suv', precioDesde: 645000 },
    ],
  },
];

export const totalModelos = MARCAS.reduce((acc, m) => acc + m.modelos.length, 0);
