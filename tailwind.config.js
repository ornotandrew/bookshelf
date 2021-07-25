const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: { 'sans': ['Roboto', 'sans-serif'] },
      gridTemplateColumns: {
        'hero': 'repeat(5, minmax(140px, 1fr))',
        'hero-mobile': 'repeat(1, minmax(140px, 1fr))',
      },
      gridTemplateRows: {
        'hero': 'repeat(5, minmax(0, 1fr))',
        'hero-mobile': 'repeat(11, minmax(75px, 1fr))',
      }
    },
    colors: {
      base: {
        '1': '#E5E5E5',
        '2': '#C4C4C4',
        '3': '#A3A3A3',
        '4': '#828282',
      },
      typography: {
        main: colors.black,
        secondary: '#737373',
        dim: '#4A4A4A'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
