import type { Config } from 'tailwindcss';

/**
 * GP Autolease Design Tokens
 *
 * Brand foundation:
 *   #2D6548  Verde oscuro institucional (Pantone 554 C)
 *   #8EBF24  Verde lima acento (Pantone 375 C)
 *   #1D1D1B  Negro tipografía (Pantone Black 3 C)
 *
 * Display: Cal Sans (headings, números grandes)
 * Body:    Montserrat (todo lo demás)
 * Tagline: Helvetica Neue Regular (lockup oficial únicamente)
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        // Brand primitivos
        forest: {
          DEFAULT: '#2D6548',
          50: '#F2F8F4',
          100: '#DFEEE5',
          200: '#B8D7C5',
          300: '#8EBFA1',
          400: '#5C9777',
          500: '#3F7B5C',
          600: '#2D6548',
          700: '#235038',
          800: '#1A3C2A',
          900: '#102819',
          950: '#091E16',
        },
        lime: {
          DEFAULT: '#8EBF24',
          50: '#F4FAE7',
          100: '#E6F4C9',
          200: '#CDE893',
          300: '#B3DB5D',
          400: '#9ECC36',
          500: '#8EBF24',
          600: '#75A01D',
          700: '#5C7C18',
          800: '#445912',
          900: '#2B380C',
        },
        ink: {
          DEFAULT: '#1D1D1B',
          900: '#1D1D1B',
          800: '#2C2C2A',
          700: '#3F3F3D',
          600: '#5A5A57',
          500: '#7A7A77',
          400: '#9C9C99',
          300: '#C0C0BD',
          200: '#DCDCD9',
          100: '#EEEEEC',
          50: '#F8F8F6',
        },
        // Semánticos
        bg: {
          DEFAULT: '#FFFFFF',
          subtle: '#F8F8F6',
          muted: '#F2F8F4',
          inverse: '#091E16',
        },
        text: {
          DEFAULT: '#1D1D1B',
          muted: '#5A5A57',
          subtle: '#7A7A77',
          inverse: '#FFFFFF',
        },
        border: {
          DEFAULT: '#DCDCD9',
          strong: '#9C9C99',
          brand: '#2D6548',
        },
        success: '#2D6548',
        warning: '#D97706',
        danger: '#AD3232',
      },
      fontFamily: {
        display: ['"Cal Sans"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Montserrat', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        helvetica: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // Body scale (Montserrat)
        xs: ['0.75rem', { lineHeight: '1.125rem', letterSpacing: '0.01em' }],
        sm: ['0.875rem', { lineHeight: '1.375rem', letterSpacing: '0.005em' }],
        base: ['1rem', { lineHeight: '1.625rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.875rem' }],
        // Display scale (Cal Sans, tighter leading)
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.01em' }],
        '3xl': ['1.875rem', { lineHeight: '2.375rem', letterSpacing: '-0.015em' }],
        '4xl': ['2.25rem', { lineHeight: '2.625rem', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '3.25rem', letterSpacing: '-0.025em' }],
        '6xl': ['3.75rem', { lineHeight: '4rem', letterSpacing: '-0.03em' }],
        '7xl': ['4.5rem', { lineHeight: '4.75rem', letterSpacing: '-0.035em' }],
      },
      spacing: {
        '4.5': '1.125rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        sm: '0.375rem',
        DEFAULT: '0.625rem',
        md: '0.625rem',
        lg: '0.875rem',
        xl: '1.25rem',
        '2xl': '1.75rem',
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgb(29 29 27 / 0.04), 0 1px 3px 0 rgb(29 29 27 / 0.06)',
        card: '0 4px 12px -2px rgb(29 29 27 / 0.06), 0 2px 4px -2px rgb(29 29 27 / 0.04)',
        elevated: '0 12px 32px -8px rgb(29 29 27 / 0.12), 0 4px 12px -4px rgb(29 29 27 / 0.06)',
        focus: '0 0 0 3px rgb(142 191 36 / 0.35)',
        'focus-forest': '0 0 0 3px rgb(45 101 72 / 0.25)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out',
        'slide-up': 'slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
