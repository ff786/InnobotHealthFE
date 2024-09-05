/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',

  ],
  theme: {
    extend: {
      colors:{
        "dark-purple": "#02072D",
        'light-white':'rgba(255,255,255,0.4)',
        "amber":"#03989e",
        'blue-violet': '#8A2BE2',
       
      
      },
      width:{
        '20':'7rem',
        '4/5': '48.5%', 
      },
      padding: {
        '5': '2.5rem',
        '8': '2rem',
      },
      borderRadius: {
        'right': '0 1.95rem 2.95rem 0' // Border-radius for right corners
      },
      
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('preline/plugin'),
    require("@material-tailwind/react/utils/withMT"),
  ],
}
