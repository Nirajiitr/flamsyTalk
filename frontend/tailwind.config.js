/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      
      colors: {
        yellow: '#f5c32c',
        orange: '#fca61f',
        black: '#242d49',
        gray: 'rgba(36, 45, 73, 0.65)',
        profileShadow: '0px 4px 17px 2px rgba(0, 0, 0, 0.25)',
        hrColor: '#cfcdcd',
        cardColor: 'rgba(255, 255, 255, 0.64)',
        buttonBg: 'linear-gradient(98.63deg, #f9a225 0%, #f95f35 100%)',
        inputColor: 'rgba(40, 52, 62, 0.07)',
        photo: '#4CB256',
        video: '#4A4EB7',
        location: '#EF5757',
        schedule: '#E1AE4A',
      },
    },
  },
  plugins: [require('daisyui')],
}
