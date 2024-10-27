import { readFileSync } from 'node:fs'
import antfu from '@antfu/eslint-config'

const webFileUrl = new URL('./te-web/.eslintrc-auto-import.json', import.meta.url)
const webAutoImport = JSON.parse(readFileSync(webFileUrl))

export default antfu({
  typescript: {
    overrides: {
      'ts/consistent-type-imports': 'off',
      'ts/no-unused-vars': 'error',
    },
  },
  javascript: true,
  vue: {
    overrides: {
      'vue/block-order': ['error', {
        order: [
          'route',
          'script',
          'template',
          'style',
        ],
      }],
    },
  },
  jsonc: true,
  jsx: true,
  unocss: true,
  markdown: true,
  formatters: {
    css: 'prettier',
    markdown: 'prettier',
  },
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false,
    jsx: true,
    overrides: {
      'style/comma-dangle': ['error', 'always-multiline'],
      'style/curly-newline': ['error', 'always'],
      'style/arrow-parens': ['error', 'always'],
      'antfu/consistent-list-newline': ['error', {
        ArrayExpression: true,
        CallExpression: true,
        ObjectExpression: true,
        ObjectPattern: true,
      }],
      'style/object-curly-newline': ['error', {
        ObjectExpression: {
          multiline: true,
          minProperties: 1,
        },
        ObjectPattern: {
          multiline: true,
          minProperties: 3,
        },
        ImportDeclaration: {
          multiline: true,
          minProperties: 3,
        },
        ExportDeclaration: {
          multiline: true,
          minProperties: 3,
        },
      }],
      'no-console': ['off'],
    },
  },
}, {
  ignores: ['node_modules', 'dist', './te-web/types/generated/*.ts', '.env*'],
}, {
  files: ['./te-web/**/*.{ts,tsx,js,jsx,vue}'],
  languageOptions: webAutoImport,
  settings: {
    'import/core-modules': ['vue-router/auto-routes'],
  },
})
