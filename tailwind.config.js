/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        overpass: ["Overpass Mono", "sans-serif"],
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
