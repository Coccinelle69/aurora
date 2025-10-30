import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        default: "#1A3C5B", // main blue
        text: "#CCCCCC",
      },
    },
  },
  plugins: [],
};

export default config;
