import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0B0F14",
        base2: "#12171D",
        surface: "#1A2028",
        surface2: "#20272F",
        hairline: "rgba(255,255,255,0.07)",
        strain: "#1E90FF",
        sleep: "#9FB9D0",
        health: "#16C47F",
        rec: {
          red: "#FF4D4F",
          yellow: "#FFC53D",
          green: "#16C47F",
        },
        stress: {
          low: "#16C47F",
          med: "#FFC53D",
          high: "#FF8A3D",
        },
        muted: "#7A8794",
      },
      borderRadius: {
        card: "18px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        num: ["var(--font-condensed)", "var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        micro: "0.14em",
      },
      maxWidth: {
        phone: "440px",
      },
      backgroundImage: {
        "app-grad": "linear-gradient(160deg, #0B0F14 0%, #12171D 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
