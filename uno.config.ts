import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerAttributifyJsx,
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      'text': 'hsl(0, 2%, 9%)',
      'text-regular': 'hsl(0, 0%, 20%)',
      'text-secondary': 'hsl(0, 0%, 51%)',
      'text-placeholder': 'hsl(0, 0%, 84%)',
      'text-disabled': 'hsl(0, 0%, 84%)',
      'text-placeholder-disabled': 'hsl(0, 0%, 94%)',
    },
  },
  presets: [
    presetUno({
      dark: 'class',
    }),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      prefix: 'i-',
      warn: true,
    }),
    presetAttributify(),
    presetTypography(),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
    transformerCompileClass(),
    transformerAttributifyJsx(),
  ],
  shortcuts: {
    'flex-c': 'flex justify-center items-center',
    'flex-bc': 'flex justify-between items-center',
    'flex-ac': 'flex justify-around items-center',
  },
})
