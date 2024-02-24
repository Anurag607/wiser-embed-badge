/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,mjs,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '475px',
        mobile: {
          max: '531px',
        },
        md: '825px',
        sidepopup: '475px',
      },
      colors: {
        primary: '#025951',
        'footer-light': '#7FF68B',
        'primary-light': '#E5FFE0',
        'header-light': '#E3FFDE',
        'text-primary': '#333333',
        'text-secondary': '#828282',
        'rating-good': '#6FCF97',
        'rating-mid': '#F2C94C',
        'rating-bad': '#EB5757',
        'shop-button': '#66a77c',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
