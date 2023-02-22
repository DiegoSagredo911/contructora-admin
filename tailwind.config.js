/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens:{
      sm:'900px',
      md:'960px',
      lg:'1024px',
      xl:'1080px',
    },
    extend: {},
  },
  plugins: [],
}
