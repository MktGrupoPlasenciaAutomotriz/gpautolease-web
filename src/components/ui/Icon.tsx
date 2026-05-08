import type { SVGProps } from 'react';

/**
 * Sistema de iconos line-art en doble verde, alineado con el manual oficial.
 * Stroke 2px, fill secundario en lima.
 *
 * Manual original: Seguro, Firma, Titular, Aval, Mantenimiento, GPS, Llaves, Cobro/Pago.
 * Aquí se extiende con íconos de UI para mantener consistencia visual.
 */

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const baseProps = (size = 24): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 32 32',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
});

// Manual oficial — recreados con stroke
export const IconShield = ({ size = 24, ...p }: IconProps) => (
  <svg {...baseProps(size)} {...p}>
    <path d="M16 4 L26 8 V16 C26 22 21 27 16 28 C11 27 6 22 6 16 V8 Z" stroke="#2D6548" />
    <path d="M11 16 L15 20 L21 12" stroke="#8EBF24" strokeWidth={2.5} />
  </svg>
);

export const IconSignature = ({ size = 24, ...p }: IconProps) => (
  <svg {...baseProps(size)} {...p}>
    <rect x="6" y="4" width="18" height="22" rx="2" stroke="#2D6548" />
    <path d="M10 10 H18" stroke="#8EBF24" strokeWidth={2.5} />
    <path d="M10 14 H20" stroke="#8EBF24" strokeWidth={2.5} />
    <path d="M10 18 H16" stroke="#8EBF24" strokeWidth={2.5} />
    <path d="M22 22 L26 26 L28 24 L24 20 Z" stroke="#2D6548" />
  </svg>
);

export const IconKeys = ({ size = 24, ...p }: IconProps) => (
  <svg {...baseProps(size)} {...p}>
    <circle cx="16" cy="11" r="5" stroke="#2D6548" />
    <path d="M16 16 V26" stroke="#2D6548" />
    <path d="M16 20 H20" stroke="#8EBF24" strokeWidth={2.5} />
    <path d="M16 24 H19" stroke="#8EBF24" strokeWidth={2.5} />
    <path d="M16 8 V14" stroke="#8EBF24" strokeWidth={2} />
  </svg>
);

export const IconMoneyCircle = ({ size = 24, ...p }: IconProps) => (
  <svg {...baseProps(size)} {...p}>
    <path d="M26 12 A12 12 0 1 0 24 22" stroke="#2D6548" />
    <path d="M22 6 L26 12 L20 14" stroke="#2D6548" />
    <path d="M16 10 V22" stroke="#8EBF24" strokeWidth={2.5} />
    <path d="M19 13 H14 A2 2 0 0 0 14 17 H18 A2 2 0 0 1 18 21 H13" stroke="#8EBF24" strokeWidth={2.5} />
  </svg>
);

export const IconGears = ({ size = 24, ...p }: IconProps) => (
  <svg {...baseProps(size)} {...p}>
    <path d="M16 6 V8 M16 24 V26 M6 16 H8 M24 16 H26 M9 9 L10.5 10.5 M21.5 21.5 L23 23 M9 23 L10.5 21.5 M21.5 10.5 L23 9" stroke="#2D6548" />
    <circle cx="16" cy="16" r="6" stroke="#2D6548" />
    <path d="M13 16 L15 18 L19 13" stroke="#8EBF24" strokeWidth={2.5} />
  </svg>
);

export const IconPin = ({ size = 24, ...p }: IconProps) => (
  <svg {...baseProps(size)} {...p}>
    <path d="M16 28 C22 22 24 17 24 13 A8 8 0 0 0 8 13 C8 17 10 22 16 28 Z" stroke="#2D6548" />
    <path d="M12 13 L15 16 L20 11" stroke="#8EBF24" strokeWidth={2.5} />
  </svg>
);

export const IconUserCheck = ({ size = 24, ...p }: IconProps) => (
  <svg {...baseProps(size)} {...p}>
    <circle cx="16" cy="11" r="4" stroke="#2D6548" />
    <path d="M8 26 C8 21 11.5 18 16 18 C20.5 18 24 21 24 26" stroke="#2D6548" />
    <path d="M19 11 L21 13 L25 9" stroke="#8EBF24" strokeWidth={2.5} />
  </svg>
);

export const IconUsersCheck = ({ size = 24, ...p }: IconProps) => (
  <svg {...baseProps(size)} {...p}>
    <circle cx="11" cy="11" r="3.5" stroke="#2D6548" />
    <circle cx="21" cy="11" r="3.5" stroke="#2D6548" />
    <path d="M5 25 C5 21 7.5 18 11 18 C14.5 18 17 21 17 25" stroke="#2D6548" />
    <path d="M17 25 C17 21 19 18 21 18 C24.5 18 27 21 27 25" stroke="#2D6548" />
    <path d="M22 11 L24 13 L28 9" stroke="#8EBF24" strokeWidth={2.5} />
  </svg>
);

// UI extensión
export const IconArrowRight = ({ size = 20, ...p }: IconProps) => (
  <svg {...baseProps(size)} {...p}>
    <path d="M6 16 H26 M20 10 L26 16 L20 22" stroke="currentColor" />
  </svg>
);

export const IconArrowLeft = ({ size = 20, ...p }: IconProps) => (
  <svg {...baseProps(size)} {...p}>
    <path d="M26 16 H6 M12 10 L6 16 L12 22" stroke="currentColor" />
  </svg>
);

export const IconCheck = ({ size = 20, ...p }: IconProps) => (
  <svg {...baseProps(size)} {...p}>
    <path d="M6 16 L13 23 L26 9" stroke="currentColor" />
  </svg>
);

export const IconX = ({ size = 20, ...p }: IconProps) => (
  <svg {...baseProps(size)} {...p}>
    <path d="M8 8 L24 24 M24 8 L8 24" stroke="currentColor" />
  </svg>
);

export const IconChevronDown = ({ size = 20, ...p }: IconProps) => (
  <svg {...baseProps(size)} {...p}>
    <path d="M8 12 L16 20 L24 12" stroke="currentColor" />
  </svg>
);

export const IconWhatsApp = ({ size = 20, ...p }: IconProps) => (
  <svg {...baseProps(size)} {...p}>
    <path d="M16 4 C9.4 4 4 9.4 4 16 C4 18.2 4.6 20.4 5.7 22.2 L4 28 L10 26.4 C11.7 27.4 13.8 28 16 28 C22.6 28 28 22.6 28 16 C28 9.4 22.6 4 16 4 Z" stroke="currentColor" fill="none" />
    <path d="M11 12 C11 11 12 10 13 10 C13.5 10 14 10.5 14.5 11.5 L15 13 C15.2 13.5 15 14 14.5 14.5 L14 15 C14.5 16 15.5 17 17 18 L17.5 17.5 C18 17 18.5 16.8 19 17 L20.5 17.5 C21.5 18 22 18.5 22 19 C22 20 21 21 20 21 C16 21 11 16 11 12 Z" stroke="currentColor" />
  </svg>
);

export const IconMenu = ({ size = 24, ...p }: IconProps) => (
  <svg {...baseProps(size)} {...p}>
    <path d="M4 10 H28 M4 16 H28 M4 22 H28" stroke="currentColor" />
  </svg>
);

export const IconDownload = ({ size = 20, ...p }: IconProps) => (
  <svg {...baseProps(size)} {...p}>
    <path d="M16 4 V20 M10 14 L16 20 L22 14" stroke="currentColor" />
    <path d="M6 24 H26" stroke="currentColor" />
  </svg>
);

export const IconUpload = ({ size = 20, ...p }: IconProps) => (
  <svg {...baseProps(size)} {...p}>
    <path d="M16 24 V8 M10 14 L16 8 L22 14" stroke="currentColor" />
    <path d="M6 26 H26" stroke="currentColor" />
  </svg>
);

export const IconSparkle = ({ size = 20, ...p }: IconProps) => (
  <svg {...baseProps(size)} {...p}>
    <path d="M16 4 L18 13 L27 16 L18 19 L16 28 L14 19 L5 16 L14 13 Z" stroke="currentColor" />
  </svg>
);

export const IconClock = ({ size = 20, ...p }: IconProps) => (
  <svg {...baseProps(size)} {...p}>
    <circle cx="16" cy="16" r="11" stroke="currentColor" />
    <path d="M16 9 V16 L21 19" stroke="currentColor" />
  </svg>
);
