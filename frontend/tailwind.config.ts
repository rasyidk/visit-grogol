import type { Config } from 'tailwindcss';

/**
 * Design tokens extracted from the VisitGrogol / DesaWisata design set.
 * Forest-green luxury palette, generous radii, soft elevation.
 */
const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7f0',
          100: '#d6ecdb',
          200: '#addbb9',
          300: '#7cc38f',
          400: '#4ba565',
          500: '#2b8a47',
          600: '#1b7a3e', // primary
          700: '#156131',
          800: '#134f2a',
          900: '#0f3f23',
          950: '#062413',
        },
        gold: {
          400: '#d4a63a',
          500: '#b8860b',
          600: '#9a6f09',
        },
        ink: {
          DEFAULT: '#141915',
          soft: '#3a423b',
          muted: '#6b7280',
        },
        cream: '#f5f6f4',
        sand: '#eceee9',
        midnight: {
          900: '#0B111A', // deep space
          800: '#151D29', // card bg
          700: '#1F2937', // border
          DEFAULT: '#0B111A',
        },
        neon: {
          DEFAULT: '#00F0FF',
          green: '#39FF14',
          teal: '#00E5FF'
        }
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(19, 79, 42, 0.18)',
        card: '0 4px 24px -8px rgba(20, 25, 21, 0.12)',
        glass: '0 8px 32px 0 rgba(15, 63, 35, 0.15)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255,255,255,0.4)',
        'neon-glow': '0 0 15px rgba(0, 229, 255, 0.5)',
        'midnight-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #1b7a3e 0%, #134f2a 100%)',
        'hero-fade': 'linear-gradient(180deg, rgba(6,36,19,0) 0%, rgba(6,36,19,0.65) 100%)',
        'midnight-gradient': 'linear-gradient(135deg, rgba(21,29,41,0.8) 0%, rgba(11,17,26,0.95) 100%)',
        'glass-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
