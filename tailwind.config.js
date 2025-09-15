// tailwind.config.js (ESM)
import typography from '@tailwindcss/typography';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#0f766e",
        "brand-dark": "#0d5f58",
      },
    },
  },
  plugins: [typography()],
};
