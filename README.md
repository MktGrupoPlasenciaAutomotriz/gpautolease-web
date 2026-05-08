# GP Autolease — Sitio web rediseñado

Sitio web de **GP Autolease**, la arrendadora del Grupo Plasencia, rediseñado desde cero centrado en el usuario protagonista (PFAE Daniel Vargas).

## Stack

- **Frontend:** Vite + React 18 + TypeScript + Tailwind CSS + React Router
- **Hosting:** GitHub Pages (deploy automático via GitHub Actions)
- **Backend (próxima fase):** Cloudflare Worker + D1 + R2 (no implementado en este repo)

## Persona dominante

Daniel Vargas, 38, PFAE — profesional independiente que factura. Diseñamos cada decisión de UX para él. Documentación completa: ver `grupo-plasencia-docs/01-strategy/Autolease-Persona-Dominante.md` en el repo de docs corporativo.

## Principios de diseño

1. La calculadora es el producto, no el cebo
2. Time-to-value < 60 segundos
3. Transparencia agresiva (cualquier número visible debe poder explicarse)
4. Mobile-first sin compromisos
5. Una decisión por pantalla
6. Cero urgencia artificial
7. WhatsApp es el canal default
8. Educar > persuadir
9. Performance es UX (LCP < 2.5s, INP < 200ms, CLS < 0.1)
10. WCAG AA mínimo

## Brand foundation

| Token | Hex | Pantone |
|---|---|---|
| Verde institucional | `#2D6548` | 554 C |
| Verde lima acento | `#8EBF24` | 375 C |
| Negro tipografía | `#1D1D1B` | Black 3 C |

Display: Cal Sans · Body: Montserrat · Tagline: Helvetica Neue Regular.

## Desarrollo local

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output en dist/
npm run preview  # servir build localmente
```

## Estructura

```
src/
├── components/
│   ├── ui/             primitives (Button, Input, Card, Slider, Pill, ...)
│   ├── layout/         Header, Footer, Logo
│   └── calc/           HeroCalculator (componente clave)
├── pages/              Home, Cotizar, CotizarResultado, Tramite, Marcas, ...
├── lib/
│   ├── calc.ts         modelo fiscal de arrendamiento vs crédito vs contado
│   ├── format.ts       formatters MXN
│   └── cn.ts           classname merger (clsx + tailwind-merge)
├── data/
│   └── marcas.ts       catálogo placeholder (en producción sale del Worker)
└── styles/
    └── globals.css     @font-face Cal Sans + base styles
```

## Backend pendiente

El sitio actual referencía `backend.gpautolease.com` (cliente Axios, ownership externo). Este repo NO consume ese backend. La siguiente fase construye nuestro propio backend en Cloudflare Worker:

```
gpautolease-api.grupo-plasencia-automotriz.workers.dev
├── /api/cotizacion
├── /api/cotizacion/:folio/lead
├── /api/tramite
├── /api/tramite/:folio/doc
├── /api/tramite/:folio
├── /api/empresa
├── /api/contacto
└── /api/marcas
```

Schema D1: `cotizaciones`, `leads`, `tramites`, `tramite_docs`, `empresa_leads`, `marcas`, `modelos`, `versiones`, `intake_log`.

Storage docs: R2 `gpautolease-docs` (privado, signed URLs).

## Deploy

Push a `main` dispara GitHub Action que:
1. `npm ci && npm run build`
2. Sube `dist/` a GitHub Pages
3. Pages publica en la URL del repo

Para custom domain (ej. `gpautolease.com`):
1. Agregar `public/CNAME` con el dominio
2. Configurar registro DNS apuntando a `<org>.github.io`

## Performance budget

- LCP < 2.5s
- INP < 200ms
- CLS < 0.1
- JS bundle inicial < 150KB gzipped (actual: 88KB)
- CSS < 20KB gzipped (actual: 7KB)

## Accesibilidad

- WCAG AA contraste validado
- Navegación completa por teclado
- Focus rings visibles (lima 60% sobre offset blanco)
- Reduced motion respetado
- ARIA roles en componentes custom (slider, segmented control, accordion)
- Idioma `es-MX` declarado

## Roadmap

| Fase | Descripción | Status |
|---|---|---|
| 1 | Persona + IA + flows | ✅ Documentado |
| 2 | Frontend v1 (este repo) | ✅ |
| 3 | Backend Cloudflare Worker | ⏳ Próximo |
| 4 | Tracking GTM + GA4 + Meta + Clarity | ⏳ |
| 5 | DNS cutover desde sitio actual | ⏳ |
| 6 | Migración leads históricos (si hay acceso) | ⏳ |

## Crédito

Rediseño completo dirigido por Chucho Porras (Director MKT Grupo Plasencia) y ejecutado con Claude Opus 4.7 actuando como Director de Diseño de Producto delegado.
