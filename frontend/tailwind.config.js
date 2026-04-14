/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Sora", "sans-serif"]
      },
      colors: {
        ink: "#0a0f14",
        mist: "#e7edf1",
        clay: "#cfd7de",
        tide: "#1b4b5a",
        flare: "#c27b4a",
        signal: "#b91c1c"
      },
      boxShadow: {
        soft: "0 12px 30px -20px rgba(15, 23, 42, 0.45)",
        glow: "0 16px 40px -18px rgba(14, 116, 144, 0.45)"
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0px)" }
        }
      },
      animation: {
        floatSlow: "floatSlow 6s ease-in-out infinite",
        fadeUp: "fadeUp 0.6s ease-out"
      }
    }
  },
  plugins: []
};
