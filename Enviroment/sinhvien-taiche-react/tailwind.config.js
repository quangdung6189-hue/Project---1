export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ecoGreen: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d'
        },
        ecoBlue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7'
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'Inter', 'sans-serif']
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
