/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        zen: {
          900: '#14110f',
          800: '#1d1916',
          700: '#2a2420',
          600: '#3a322c',
          500: '#5b4f46',
          400: '#8a7b6f',
          300: '#b8aa9c',
          200: '#d9cfc4',
          100: '#f3ede6',
        },
        terracotta: {
          300: '#e6b29b',
          400: '#d8967a',
          500: '#c2714f',
          600: '#a65a3c',
        },
      },
      keyframes: {
        'slide-in-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        equalizer: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'slide-in-right': 'slide-in-right 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        'fade-in': 'fade-in 0.4s ease-out',
        equalizer: 'equalizer 1.1s ease-in-out infinite',
        breathe: 'breathe 3.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
