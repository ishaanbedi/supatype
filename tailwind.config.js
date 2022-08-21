/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Prompt", "sans-serif"],
    },

    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
