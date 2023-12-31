import { defineConfig, presetIcons, presetUno } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  theme: {
    colors: {
      primary: '#EAA806',
      dark: '#000100'
    },
    fontFamily: {
      primary: ['BungeeShade', 'cursive'],
      secondary: ['GloriaHallelujah', 'cursive'],
      tertiary: ['VT323', 'cursive']
    },
    animation: {
      keyframes: {
        opacity: '{0% { opacity:0} 100% { opacity:1}}'
      },
      durations: {
        opacity: '2s'
      },
      timingFns: {
        opacity: 'alternate'
      }
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
  ],
  transformers: [transformerDirectives()]
})
