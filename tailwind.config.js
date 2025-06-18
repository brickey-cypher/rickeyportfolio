import forms from '@tailwindcss/forms';

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}',
    './components/**/*.{astro,html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'mobilebg': '#0f172a',
        'desktopbg': 'transparent',
        'mobile-light': '#f4f4f4',
      },
    },
  },
  plugins: [forms],
}


