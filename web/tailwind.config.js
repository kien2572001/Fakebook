/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mplus1: ['"M PLUS 1"', "sans-serif"],
        fredoka: ['"Fredoka One"', "cursive"],
        montserrat: ['"Montserrat"', "sans-serif"],
        openSans: ['"Open Sans"', "sans-serif"],
      },
      colors: {
        'default': "#111111",
        'primary': "#05f",
        'white': "#ffffff",
        'background': "#f5f5f5",
        'gray-text': "#adb5bd",
        'danger': "#ef4565",
        'warning': "#ffc53d",
        'success': "#73c42d",
        'disabled': "#8d8d8d",
        'button-disabled': '#c6c6c6'
      },
      boxShadow: {
        'xs': '0 0.5rem 1rem rgba(0, 0, 0, 0.03)',
      },
    },
    screens: {
      'mobile': '576px',
      'tablet': '768px',
      'laptop': '992px',
      'desktop': '1600px',
    },
  },
  plugins: [],
}
