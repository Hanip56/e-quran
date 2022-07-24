/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arabicFont: "Scheherazade New, serif;",
      },
      colors: {
        "green-quran": "#00967A",
        "light-green-quran": "#5AB7A7",
        "yellow-quran": "#F1CA7E",
        "white-quran": "#F9F9F9",
        "gray-quran": "#EDF0F3",
        "gray-2-quran": "#AAB6C1",
        "black-quran": "#080D11",
        "red-quran": "#E61D2C",
      },
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(14rem, 1fr))",
        "auto-fill": "repeat(auto-fill, minmax(11rem, 11rem))",
        newsGrid: "repeat(auto-fill, minmax(50%, 1fr))",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--gradient-color-stops))",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
