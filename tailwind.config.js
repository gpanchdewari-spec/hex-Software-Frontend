/** @type {import('tailwindcss').Config} */
export default {
  content:['./index.html','./src/**/*.{js,jsx}'],
  theme:{extend:{fontFamily:{sans:['Inter','sans-serif'],display:['Manrope','sans-serif']},colors:{brand:{blue:'#1565C0',green:'#22A06B',lime:'#6BCB77',gold:'#D4A017',ink:'#1A1A1A',mist:'#F5F7FA'}}}},
  plugins:[]
};
