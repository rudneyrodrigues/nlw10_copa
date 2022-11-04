/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          500: "#F7DD43"
        },
        green: {
          300: "#129E57",
          500: "#047C3F"
        },
        zinc: {
          950: '#09090A',
          900: '#121214',
          800: '#202024',
          600: '#323238',
          300: '#8D8D99',
          200: '#C4C4CC',
          100: '#E1E1E6'
        },
      },
      fontFamily: {
        sans: "'Roboto', sans-serif",
      },
      backgroundImage: {
        'bg-effects': "url('/images/background.svg')",
      }
    },
  },
  plugins: [],
}
