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
          DEFAULT: "#1a1f1c", // Deep forest black
          secondary: "rgb(52 65 57 / 0.15)", // Sage green tint
        },
        foreground: {
          DEFAULT: "#e5ebe7", // Soft sage white
          secondary: "#94a196", // Muted sage
          muted: "#5f6d63", // Deep sage
        },
        border: "rgb(147 162 150 / 0.2)", // Sage border
        primary: {
          DEFAULT: "#2dd4bf", // Vibrant teal
          foreground: "#1a1f1c", // Dark on light
          hover: "#5eead4", // Lighter teal
        },
        secondary: {
          DEFAULT: "rgb(52 65 57 / 0.3)", // Sage overlay
          foreground: "#e5ebe7", // Light on dark
          hover: "rgb(52 65 57 / 0.4)", // Darker sage overlay
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
