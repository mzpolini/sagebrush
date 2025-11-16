const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Theme system colors using CSS variables
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        card: "rgb(var(--color-card) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        text: "rgb(var(--color-text) / <alpha-value>)",
        "text-muted": "rgb(var(--color-text-muted) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
          light: "rgb(var(--color-primary-light) / <alpha-value>)",
          dark: "rgb(var(--color-primary-dark) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
          light: "rgb(var(--color-accent-light) / <alpha-value>)",
        },
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        gradient: {
          from: "rgb(var(--color-gradient-from) / <alpha-value>)",
          via: "rgb(var(--color-gradient-via) / <alpha-value>)",
          to: "rgb(var(--color-gradient-to) / <alpha-value>)",
        },
        chart: {
          1: "rgb(var(--color-chart-1) / <alpha-value>)",
          2: "rgb(var(--color-chart-2) / <alpha-value>)",
          3: "rgb(var(--color-chart-3) / <alpha-value>)",
          4: "rgb(var(--color-chart-4) / <alpha-value>)",
        },
      },
      opacity: {
        5: "0.05",
        10: "0.1",
        20: "0.2",
      },
      fontFamily: {
        sans: ["var(--font-source-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
        display: ["var(--font-outfit)", ...fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
};
