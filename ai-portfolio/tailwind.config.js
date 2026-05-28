/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#050816',
        secondary: '#0B1120',
        accent: {
          cyan: '#00F5FF',
          purple: '#7B2FF7',
          green: '#00FFB2'
        },
        text: '#E2E8F0'
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'scan': 'scan 8s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'border-flow': 'border-flow 4s ease infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 1 }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'border-flow': {
          '0%, 100%': { borderColor: '#00F5FF' },
          '50%': { borderColor: '#7B2FF7' }
        }
      },
      backdropBlur: {
        xs: '2px'
      }
    },
  },
  plugins: [],
}