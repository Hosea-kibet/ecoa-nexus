/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgba(245,132,38)',
        "yellow-bg": '#F58426'
      },
      backgroundImage: {
        'hero': "url('../public/Mary.png')",
        'elec': "url('../public/econexus.png')"
      },
    },
  },
  plugins: [],
}
