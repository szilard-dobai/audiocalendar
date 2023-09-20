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
          DEFAULT: "#1db954",
          "50": "#f0fdf4",
          "100": "#dbfde6",
          "200": "#baf8cf",
          "300": "#84f1aa",
          "400": "#48e07d",
          "500": "#1db954",
          "600": "#14a547",
          "700": "#13823b",
          "800": "#156633",
          "900": "#13542c",
          "950": "#042f15",
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
