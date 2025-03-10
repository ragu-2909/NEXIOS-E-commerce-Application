const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,jsx,css,ts,tsx}"], // Added TypeScript extensions for content scanning
   // Added dark mode support
  theme: {
    extend: {
      animation: {
        shimmer: 'shimmer 2s linear infinite',
      },
      boxShadow: {
        input: "0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)",
        'custom-glow': '0 0 2px #fff, inset 0 0 2px #fff, 0 0 5px rgba(255, 55, 55, 0.8), 0 0 15px rgba(255, 55, 55, 0.6), 0 0 30px rgba(255, 55, 55, 0.3)',
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', "sans-serif"],
        orbitron: ['Orbitron', 'sans-serif'], // Font family for Bebas Neue
      },
      letterSpacing:{
        wide:'2px',
      },
      textShadow: {
        redGlow: '0 0 10px rgba(255,55,55,0.5)',
      },

      colors: {
        violetStart: "#7F00FF", // Starting violet color
        violetEnd: "#E100FF",   // Ending violet color
      },
      backgroundImage: {
        "violet-gradient": "linear-gradient(to right, #7F00FF, #E100FF)", // Custom gradient
      },
    },
    keyframes: {
      shimmer: {
        from: {
          backgroundPosition: '0 0',
        },
        to: {
          backgroundPosition: '-200% 0',
        },
      },
    },
  },
  plugins: [
    require("tailwindcss/plugin")(({ addBase, theme }) => {
      const allColors = flattenColorPalette(theme("colors"));
      const newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--color-${key}`, val])
      );

      addBase({
        ":root": newVars,
      });
    }),
    function addVariablesForColors({ addBase, theme }) {
      const allColors = flattenColorPalette(theme("colors"));
      const newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val]) // Matches the earlier `--${key}` format
      );

      addBase({
        ":root": newVars,
      });
    },
  ],
};
