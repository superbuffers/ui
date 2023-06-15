/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    screens: {
      // sm: '480px',
      // md: '768px',
      // lg: '976px',
      xl: '1510px'
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '55px',
        // sm: '2rem',
        // lg: '4rem',
        xl: '55px'
        // '2xl': '6rem'
      }
    },
    extend: {
      gridTemplateColumns: {
        14: 'repeat(14, minmax(0, 1fr))'
      }
    }
  },
  plugins: []
}
