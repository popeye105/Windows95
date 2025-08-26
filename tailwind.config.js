/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'win95-gray': '#c0c0c0',
        'win95-dark-gray': '#808080',
        'win95-light-gray': '#dfdfdf',
        'win95-blue': '#000080',
        'win95-desktop': '#008080',
      },
      fontFamily: {
        'ms-sans': ['MS Sans Serif', 'sans-serif'],
      },
      boxShadow: {
        'win95-inset': 'inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #c0c0c0',
        'win95-outset': 'inset -1px -1px #dfdfdf, inset 1px 1px #0a0a0a, inset -2px -2px #c0c0c0, inset 2px 2px #808080',
        'win95-button': 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #c0c0c0',
        'win95-pressed': 'inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #c0c0c0, inset 2px 2px #808080',
      }
    },
  },
  plugins: [],
}
