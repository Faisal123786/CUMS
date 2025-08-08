/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "arrow-fly": {
          "0%": { transform: "translateX(-10px)", opacity: 0 },
          "10%": { transform: "translateX(0)", opacity: 1 }, 
          "40%": { transform: "translateX(0)", opacity: 1 },
          "100%": { transform: "translateX(20px)", opacity: 0 },
        },
      },
      animation: {
        "arrow-fly": "arrow-fly 3s ease-in-out infinite",
      },

      colors: {
        background: {
          DEFAULT: "rgb(var(--color-background) / <alpha-value>)",
        },
        text: {
          DEFAULT: "rgb(var(--color-text) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: [
          "BlinkMacSystemFont",
          "-apple-system",
          '"Segoe UI"',
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          '"Fira Sans"',
          '"Droid Sans"',
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
