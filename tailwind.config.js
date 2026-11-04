/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: {
          0: '#0A1020',
          1: '#0F1830',
          2: '#16213F',
          glass: 'rgba(20, 30, 58, 0.72)',
          surface: 'rgba(255, 255, 255, 0.04)',
        },
        champagne: {
          DEFAULT: '#F5B027',
          deep: '#D98218',
          light: '#FFD369',
          muted: 'rgba(245, 176, 39, 0.18)',
        },
        sapphire: {
          DEFAULT: '#4C6FD1',
          deep: '#3A58B8',
          muted: 'rgba(76, 111, 209, 0.15)',
        },
        petrol: {
          DEFAULT: '#2C7A85',
          deep: '#1F6670',
          muted: 'rgba(44, 122, 133, 0.15)',
        },
        pearl: '#F3F5FA',
        mist: '#A8B2C7',
        fog: '#76819B',
        status: {
          success: '#10B981',
          'success-bg': 'rgba(6, 78, 59, 0.85)',
          'success-border': 'rgba(16, 185, 129, 0.60)',
          'success-text': '#6EE7B7',
          warning: '#F5B027',
          error: '#EF4444',
        }
      },
      fontFamily: {
        display: ['"Montserrat"', 'system-ui', '-apple-system', 'sans-serif'],
        sans: ['"Montserrat"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm: '10px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      boxShadow: {
        'glass-sm': '0 8px 24px -12px rgba(0, 0, 0, 0.45), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
        'glass-md': '0 16px 36px -18px rgba(0, 0, 0, 0.55), inset 0 1px 0 0 rgba(255, 255, 255, 0.10)',
        'glass-lg': '0 24px 48px -24px rgba(0, 0, 0, 0.65), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)',
        'gold-glow': '0 0 24px -4px rgba(245, 176, 39, 0.35)',
      },
      backdropBlur: {
        xs: '4px',
        glass1: '20px',
        glass2: '28px',
        glass3: '40px',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'ambient-slow': 'ambientFloat 30s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
        ambientFloat: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(30px, -20px) scale(1.08)' },
        }
      }
    },
  },
  plugins: [],
}
