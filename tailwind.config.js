/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        WHITE: '#FFFFFF',
        PRIMARY: '#0075FF',
      },
      fontFamily: {
        oRegular: ['Outfit-Regular', 'sans-serif'],
        oBold: ['Outfit-Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
