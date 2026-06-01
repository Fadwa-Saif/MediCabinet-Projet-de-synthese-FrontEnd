/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: "class",
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "on-tertiary-container": "#fffbff",
        "surface-dim": "#d9dadb",
        "on-secondary-fixed-variant": "#075985",
        "on-primary-fixed-variant": "#0369a1",
        "on-error": "#ffffff",
        "on-secondary-fixed": "#082f49",
        "surface-container-lowest": "#ffffff",
        "on-secondary": "#ffffff",
        primary: "#0891b2",
        "on-background": "#191c1d",
        "surface-container-low": "#f3f4f5",
        "error-container": "#ffdad6",
        "inverse-primary": "#67e8f9",
        "secondary-container": "#cffafe",
        "secondary-fixed": "#ecfeff",
        "outline-variant": "#c1c6d7",
        "on-tertiary-fixed-variant": "#7c2e00",
        "tertiary-fixed": "#ffdbcc",
        "tertiary-container": "#c64f00",
        "surface-container-high": "#e7e8e9",
        "surface-tint": "#0284c7",
        outline: "#717786",
        "on-tertiary": "#ffffff",
        "on-tertiary-fixed": "#351000",
        "surface-container-highest": "#e1e3e4",
        tertiary: "#9e3d00",
        "on-primary-fixed": "#164e63",
        "inverse-on-surface": "#f0f1f2",
        "primary-fixed-dim": "#a5f3fc",
        surface: "#f8f9fa",
        "inverse-surface": "#2e3132",
        "primary-fixed": "#ecfeff",
        "on-secondary-container": "#075985",
        secondary: "#0ea5e9",
        "on-primary": "#ffffff",
        background: "#f8f9fa",
        "surface-variant": "#e1e3e4",
        "on-primary-container": "#164e63",
        "on-error-container": "#93000a",
        error: "#ba1a1a",
        "surface-bright": "#f8f9fa",
        "on-surface": "#191c1d",
        "surface-container": "#edeeef",
        "tertiary-fixed-dim": "#ffb695",
        "secondary-fixed-dim": "#a5f3fc",
        "primary-container": "#cffafe",
        "on-surface-variant": "#414754",
        blue: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
      },
      fontFamily: {
        headline: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        label: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "label-sm": ["0.75rem", { lineHeight: "1rem" }],
      },
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-from-top-2": {
          "0%": { transform: "translateY(-0.5rem)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "slide-in": "slide-in 0.28s ease-out",
        "slide-in-from-top-2": "slide-in-from-top-2 0.24s ease-out",
      },
      borderRadius: {
        lg: "0.5rem",
        xl: "0.75rem",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".signature-gradient": {
          backgroundImage: "linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)",
        },
        ".animate-in": {
          animationDuration: "0.24s",
          animationTimingFunction: "ease-out",
          animationFillMode: "both",
        },
        ".slide-in-from-top-2": {
          "--tw-enter-translate-y": "-0.5rem",
          transform: "translateY(var(--tw-enter-translate-y))",
          animationName: "slide-in-from-top-2",
        },
      });
    }),
  ],
};
