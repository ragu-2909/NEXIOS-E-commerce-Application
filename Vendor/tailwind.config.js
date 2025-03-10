/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        brunoAce: ['Bruno Ace' ,'sans-serif']
      },

      width:{
        'max-content' : 'max-content',
      },

      colors: {
        customgrey: '#7D7D7D',
        customborder: '#27272A',
        lightGray: 'rgba(217, 217, 217, 0.28)',
        customblue: '#0572B6',
        customDarkblue: '#081117',
        customred: '#E92929',
        customDarkred: '#150707',
        customyellow: '#FFA500',
        customDarkyellow: '#1A1308',
        custombgcolor: '#090909',
        customemeraldGreen: '#50C878', 
       'main-bg': 'var(--main-bg)',
       'second-bg': 'var(--second-bg)',
       'third-bg': 'var(--third-bg)',
       'txt-color': 'var(--txt-color)',
       'txt-white': 'var(--txt-white)',
       'main-color': 'var(--main-color)',
       'second-color': 'var(--second-color)',
       'box-shadow': 'var(--box-shadow)',
        'main-color-blue': 'var(--main-color-blue)',
        'second-color-blue': 'var(--second-color-blue)',
        'main-color-red': 'var(--main-color-red)',
        'second-color-red': 'var(--second-color-red)',
        'main-color-cyan': 'var(--main-color-cyan)',
        'second-color-cyan': 'var(--second-color-cyan)',
        'main-color-green': 'var(--main-color-green)',
        'second-color-green': 'var(--second-color-green)',
        'main-color-orange': 'var(--main-color-orange)',
        'second-color-orange': 'var(--second-color-orange)',

        // themes Light mode 
        'main-bg-light': 'var(--main-bg-light)',
       'second-bg-light': 'var(--second-bg-light)',
       'third-bg-light': 'var(--third-bg-light)',
       'txt-color-light': 'var(--txt-color-light)',
       'box-shadow-light': 'var(--box-shadow-light)',

       // themes Dark mode 
       'main-bg-dark': 'var(--main-bg-dark)',
       'second-bg-dark': 'var(--second-bg-dark)',
       'third-bg-dark': 'var(--third-bg-dark)',
       'txt-color-dark': 'var(--txt-color-dark)',
       'box-shadow-dark': 'var(--box-shadow-dark)',

      },
    },
  },
  plugins: [],
}

