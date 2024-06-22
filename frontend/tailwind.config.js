/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'magz' : 'magz',
      'alegreya' : 'alegreya',
      'sans': ['Inter', 'sans-serif'],
    }
  },
  plugins: [],
}

