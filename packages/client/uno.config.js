import { defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      primary: '#EAA806',
      dark: '#000100'
    },
    fontFamily: {
      primary: ['Bungee Shade', 'cursive'],
      secondary: ['Gloria Hallelujah', 'cursive'],
      tertiary: ['VT323', 'cursive']
    }
  },
  rules: [
    [
      /^grid-repeat-([\.\d]+)$/,
      ([_, num]) => ({
        'grid-template-columns': `repeat(auto-fit, minmax(${num}px, 1fr))`
      })
    ]
  ],
  presets: [
    presetUno(),

    presetIcons({
      cdn: 'https://esm.sh/',
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    })
  ]
})
