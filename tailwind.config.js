/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens:{
        "untilMd" : {min:"0px", max : "767px"},
      },
      colors:{
        "night" : "#003554",
        "primary" : "#003554",
        "sky" : "#1c1c1c",
        "sun" : "#FFC100" ,
        "old" : "#D9B227"
      
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("daisyui"),require('tailwind-scrollbar')({ nocompatible: true })],
  
}
