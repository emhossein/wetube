/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#0F0F0F",
        white: "#F1F1F1",
        "gray-350": "#303030",
        "gray-hover": "#3D3D3D",
        "red-brand": "#FF0000",
        "gray-light": "#AAAAAA",
      },
      fontSize: {
        body: "1.3rem",
      },
      spacing: {
        "80%": "68vw",
      },
    },
  },
  plugins: [],
};
