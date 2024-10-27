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
  content: {
    pipeline: ['./te-web/**/*.{ts,tsx,vue}'],
  },
  theme: {
    colors: {
      'primary': 'var(--n-primary-color)',
      'info': 'var(--n-info-color)',
      'success': 'var(--n-success-color)',
      'warning': 'var(--n-warning-color)',
      'error': 'var(--n-error-color)',
      'text-primary': 'var(--n-text-color-1)',
      'text-regular': 'var(--n-text-color-2)',
      'text-secondary': 'var(--n-text-color-3)',
      'text-disabled': 'var(--n-text-color-disabled)',
      'text-placeholder': 'var(--n-placeholder-color)',
      'text-placeholder-disabled': 'var(--n-placeholder-color-disabled)',
      'divider': 'var(--n-divider-color)',
      'border': 'var(--n-border-color)',
      'bg-popover': 'var(--n-popover-color)',
      'bg-table': 'var(--n-table-color)',
      'bg-card': 'var(--n-card-color)',
      'bg-modal': 'var(--n-modal-color)',
      'bg-body': 'var(--n-body-color)',
      'bg-tag': 'var(--n-tag-color)',
    },
    shadow: {
      primary: 'var(--n-box-shadow-1)',
      regular: 'var(--n-box-shadow-2)',
      secondary: 'var(--n-box-shadow-3)',
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
