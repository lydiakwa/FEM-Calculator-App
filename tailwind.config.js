/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: '#864cff',
      },
      fontFamily: {
        popItalic: ['Poppins-Italic', 'sans-serif'],
        extraBoldItalic: ['Poppins-ExtraBoldItalic', 'sans-serif'],
        popBold: ['Poppins-Bold'],
        popReg: ['Poppins-Regular'],
      },
      fontSize: {
        tiny: '0.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        '4xl': '6rem',
      },
    },
  },
  plugins: [],
};
