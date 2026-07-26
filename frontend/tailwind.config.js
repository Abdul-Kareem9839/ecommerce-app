/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#FAFAFA",
        "surface-alt": "#F1F0FB",
        ink: "#1C1B29",
        "ink-soft": "#57536B",
        primary: {
          DEFAULT: "#5B4FE9",
          dark: "#3D33B0",
          light: "#8B82F2",
        },
        accent: "#00C2A8",
        sale: "#F2545B",
        gold: "#F2B705",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 20px -4px rgba(28, 27, 41, 0.08)",
        "card-hover": "0 12px 30px -8px rgba(91, 79, 233, 0.25)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
