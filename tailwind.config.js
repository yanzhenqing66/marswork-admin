/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-deep': '#BA3A24',
        primary: '#DD6048',
        'primary-shallow': '#FFBD66',
        grey: '#b7b7b7'
      },
      fontSize: {
        md: ['18px', '26px']
      }
    }
  },
  plugins: []
}
