/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          900: '#0A332E',
          700: '#0F4C46',
          600: '#146158',
          500: '#1B7A6E',
          100: '#DCEBE8'
        },
        gold: {
          600: '#A9762A',
          500: '#C8943E',
          300: '#E8C98B',
          100: '#F6E8CC'
        },
        cream: {
          100: '#FBF6EC',
          50: '#FFFDF9'
        },
        ink: {
          900: '#1E2A26',
          600: '#51605B',
          400: '#7C8A85'
        }
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Karla', 'sans-serif']
      },
      borderRadius: {
        brand: '18px'
      }
    }
  },
  plugins: []
};
