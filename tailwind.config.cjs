/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkmode: {
          700: "#232d45",
          800: "#1b253b",
        },
      },
    },
  },
  plugins: [],
};
