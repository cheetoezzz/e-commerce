/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'minimal-gray': '#f8f9fa',
        'minimal-dark': '#1a1a1a',
        'minimal-border': '#e9ecef',
      },
      fontFamily: {
        'minimal': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
