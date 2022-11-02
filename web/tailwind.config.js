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
        }
      },
      backgroundImage: {
        'bg-effects': "url('/images/background.svg')",
      }
    },
  },
  plugins: [],
}
