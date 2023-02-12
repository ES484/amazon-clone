/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './node_modules/flowbite-react/**/*.js',
    './src/**/*'
  ],
  theme: {
    extend: {
      colors: {
        amazon_blue: {
          light: "#232F3E",
          DEFAULT: "#131921",
        },
      },
    },
  },
  variants: {
    gridColumn: ['last', 'rtl'],
    space: ['responsive', 'direction'],
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwindcss-rtl'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@headlessui/react'),
    require('@tailwindcss/line-clamp'),
  ],
  debug: false,
}