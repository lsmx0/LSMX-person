import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        sketch: {
          stroke: "var(--sketch-stroke)",
          fill: "var(--sketch-fill)",
          accent1: "var(--sketch-accent1)",
          accent2: "var(--sketch-accent2)",
          accent3: "var(--sketch-accent3)",
        },
      },
      fontFamily: {
        hand: ["var(--font-hand)", "cursive"],
        handCn: ["var(--font-hand-cn)", "cursive"],
      },
      screens: {
        tablet: "768px",
        desktop: "1024px",
      },
    },
  },
  plugins: [],
};
export default config;
