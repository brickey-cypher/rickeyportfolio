/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables dark mode via the 'dark' class
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'mobile-light': '#f4f4f4',
      },
    },
  },
  plugins: [],
};

