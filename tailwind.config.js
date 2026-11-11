/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          sage: "#DDE8D5",
          "sage-light": "#EDF4E8",
          "sage-dark": "#C3D3B8",
          forest: "#183B2C",
          "forest-dark": "#0F261C",
          "forest-light": "#25533F",
          ivory: "#F8F6ED",
          "ivory-dark": "#EDE9DC",
          gold: "#C6A66A",
          "gold-light": "#D8BD87",
          "gold-dark": "#9E824C",
          neutral: "#F2F0E8",
          "neutral-dark": "#E2DFD3",
          text: "#1A251F",
          "text-muted": "#55645A",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "DM Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 10px 30px -10px rgba(24, 59, 44, 0.08)",
        "luxury-lg": "0 20px 40px -15px rgba(24, 59, 44, 0.12)",
        gold: "0 4px 20px rgba(198, 166, 106, 0.25)",
      },
    },
  },
  plugins: [],
};
