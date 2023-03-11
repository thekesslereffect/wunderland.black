/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#E1E5E6',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'hot' : '#FF0082',
      'black' : '#101010',
    },
    extend: {
      fontFamily: {
        overpass: ['"Overpass Mono"'],
        mono: ['"Overpass Mono"'],
      },
      keyframes: {
        pulse: {
            '0%': {
                opacity: '0',
            },
            '50%': {
              opacity: '1',
            },
            '100%': {
              opacity: '0',
            },
        }
    },
      animation: {
        'pulse-fast': 'pulse 1s  infinite',
      }
    },
  },
  plugins: [],
}
