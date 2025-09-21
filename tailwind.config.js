// tailwind.config.js
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#6366f1', dark: '#4f46e5', glow: '#c4b5fd' },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(2,6,23,.08)',
      },
    },
  },
  plugins: [typography],
};
