/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Gunmetal / tactical neutrals (light end = text, dark end = surfaces)
        ink: {
          50: "#f2f4f5",
          100: "#e6e9ea",
          200: "#c4cacd",
          300: "#9aa3a8",
          400: "#6b757b",
          500: "#3a4248",
          600: "#272d32",
          700: "#1c2125",
          800: "#15191c",
          850: "#111416",
          900: "#0c0e0f",
          950: "#08090a",
        },
        // Phosphor amber — primary accent (military display glow)
        amber: {
          DEFAULT: "#f5a623",
          glow: "#ffc24b",
          dim: "#7a5512",
        },
        // Olive drab — secondary accent
        olive: {
          DEFAULT: "#8a9a5b",
          dim: "#4c5630",
        },
        // Alert red
        alert: "#e5484d",
      },
      fontFamily: {
        display: ['"Chakra Petch"', "sans-serif"],
        body: ['"Archivo"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      fontWeight: {
        500: "500",
        600: "600",
        700: "700",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(245,166,35,0.4), 0 0 24px -4px rgba(245,166,35,0.35)",
        "glow-sm": "0 0 12px -2px rgba(245,166,35,0.4)",
        panel: "0 24px 64px -16px rgba(0,0,0,0.8)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.82" },
        },
      },
      animation: {
        scan: "scan 3.5s linear infinite",
        flicker: "flicker 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
