/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rockwell: ['rockwell', 'sans-serif'],
        gilroy: ['Gilroy', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

