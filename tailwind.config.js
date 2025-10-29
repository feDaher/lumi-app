/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        lightBg: "#FFFDD0",
        darkBg: "#0f0f0f",
        lightText: "#111",
        darkText: "#f5f5f5",
        accent: "#6C63FF",
        cream: "#EBEDD8",
      },
    },
  },
  plugins: [],
};
