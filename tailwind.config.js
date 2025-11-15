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
        background: {
          DEFAULT: "#1c2321", // Rich forest background
          secondary: "rgb(44 57 51 / 0.15)", // Deep moss overlay
        },
        foreground: {
          DEFAULT: "#ecf0ed", // Clean paper white
          secondary: "#9cb0a4", // Sage mist
          muted: "#5c6b65", // Forest shadow
        },
        border: "rgb(156 176 164 / 0.2)", // Misty border
        primary: {
          DEFAULT: "#2c7a7b", // Deep teal (more natural)
          foreground: "#1c2321", // Dark forest on light
          hover: "#38a89d", // Ocean teal
        },
        secondary: {
          DEFAULT: "rgb(44 57 51 / 0.3)", // Forest overlay
          foreground: "#ecf0ed", // Clean white on dark
          hover: "rgb(44 57 51 / 0.4)", // Deep forest overlay
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
    },
  },
};
