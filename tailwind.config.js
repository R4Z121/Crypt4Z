/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./assets/**/*.{html,js,ttf}"],
  theme: {
    extend: {
      colors: {
        app : {
          100: '#BBE1FA',
          200: '#0C7B93',
          300: '#27496D',
          400: '#142850',
          500: '#141E61'
        },
        transparent: 'transparent'
      },
      fontFamily: {
        'Goldman': 'Goldman, Helvetica, Arial',
        'GoldmanBold': ['"Goldman Bold"','Helvetica', 'Arial']
      },
      backgroundImage: {
        'hero-pattern': "url('../img/jumbo-image.jpg')"
      },
      padding: {
        2.5: '10px'
      },
      fontSize: {
        'super-sm': '10px'
      },
      minHeight: {
        '75': '300px'
      },
      height: {
        '1/2': '2px'
      },
      borderWidth: {
        '3' : '3px'
      }
    },
  },
  plugins: [],
}
