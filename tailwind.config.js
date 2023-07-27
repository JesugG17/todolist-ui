/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#424256",
        "secondary": "#25273C",
        "background": "#181824",
        "background-light": "#262633",
        "test": "#3B3D52",
        "gradientCustom": 'linear-gradient(blue, violet)'
      },
    },
  },
  plugins: [],
}

