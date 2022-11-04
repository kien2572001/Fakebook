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
      },
      colors: {
        'default': "#094067",
        'primary': "#3da9fc",
        'white': "#fffffe",
        'danger': "#ef4565",
        'warning': "#ffc53d",
        'success': "#73c42d",
        'disabled': "#8d8d8d",
        'button-disabled': '#c6c6c6'
      },
    },
  },
  plugins: [],
}
