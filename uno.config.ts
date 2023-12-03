import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'
import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify({
      ignoreAttributes: ['mode'],
    }),
    presetUno(),
  ],
  transformers: [transformerAttributifyJsx()],
})
