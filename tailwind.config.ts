import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "infinite-scroll": "infinite-scroll 40s linear infinite",
        "infinite-scroll-fast": "infinite-scroll 25s linear infinite",
        "infinite-scroll-slow": "infinite-scroll 60s linear infinite",
      },
      keyframes: {
        "infinite-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-100% / 3))" }, // Divide by 3 since we tripled
        },
      },
    },
  },
  plugins: [],
};

export default config;
