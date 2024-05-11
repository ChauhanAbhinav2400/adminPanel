/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    colors: {
      'primary': '#004AAC',
      "white":"#fff",
      "gray":"gray",
      "background":"#eee",
      "red":"red",
      "green":"green",
      "yellow":"yellow",
      "blue":"blue",
      "orange":"orange",
      "black":"black"
    },
    extend: {},
  },
  plugins: [ require('tailwind-scrollbar')],


}
