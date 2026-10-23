import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#00a3da",
          navy: "#093484",
          darkNavy: "#062258",
          pink: "#f60362",
          pinkHover: "#d90255",
          charcoal: "#282828",
          lightGray: "#f4f6fa",
          borderGray: "#d8dbe7",
          gold: "#f59e0b",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      backgroundImage: {
        "nav-gradient": "linear-gradient(90deg, #00a3da 0%, #093484 100%)",
        "hero-gradient": "linear-gradient(135deg, rgba(0, 163, 218, 0.9) 0%, rgba(9, 52, 132, 0.95) 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
