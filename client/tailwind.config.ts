import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
  theme: {
    extend: {
      colors: {
        primary: "#2f2e41",
        secondary: "#454464",
        brand: {
          DEFAULT: "#17bf3e",
          "50": "#effef2",
          "100": "#dafee1",
          "200": "#b8fac6",
          "300": "#80f59a",
          "400": "#42e668",
          "500": "#17bf3e",
          "600": "#0eab33",
          "700": "#0f862b",
          "800": "#126927",
          "900": "#105722",
          "950": "#033010",
        },
        complement: {
          DEFAULT: "#6c63ff",
          "50": "#ecf0ff",
          "100": "#dde2ff",
          "200": "#c2caff",
          "300": "#9ca6ff",
          "400": "#7577ff",
          "500": "#6c63ff",
          "600": "#5036f5",
          "700": "#452ad8",
          "800": "#3825ae",
          "900": "#312689",
          "950": "#1f1650",
        },
      },
    },
  },
};
export default config;
