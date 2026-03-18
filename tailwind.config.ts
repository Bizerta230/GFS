import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1e3a5f", // deep blue
        },
        secondary: {
          DEFAULT: "#c4973b", // petroleum gold
        },
        accent: {
          DEFAULT: "#2d8a4e", // technical green
        },
        background: {
          DEFAULT: "#f5f5f7",
        },
        foreground: {
          DEFAULT: "#1a1a2e",
        },
      },
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

