/**
 * @type {import('tailwindcss').TailwindConfig}
 */
module.exports = {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}', 'index.html'],
  theme: {
    extend: {
      backgroundImage: {
        'repeating-radial-gradient':
          '-webkit-repeating-radial-gradient(center center,#04b4e0,#04b4e0 1px,transparent 0px,transparent 100%)',
      },
    },
    gridTemplateAreas: {
      layout: ['navbar header content'],
    },
    gridTemplateColumns: {
      layout: '0.25fr 1fr 2fr',
    },
  },
  plugins: [require('@savvywombat/tailwindcss-grid-areas')],
  variants: {
    gridTemplateAreas: ['responsive'],
  },
}
