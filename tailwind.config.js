const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    plugin(function({ addVariant }) {
      addVariant('group-hover', ':merge(.group):hover &')
      addVariant('peer-hover', ':merge(.peer):hover ~ &')
    })
  ],
}