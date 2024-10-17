import { readFileSync } from 'node:fs'
import antfu from '@antfu/eslint-config'

const fileUrl = new URL('./te-web/.eslintrc-auto-import.json', import.meta.url)
const autoImport = JSON.parse(readFileSync(fileUrl))

export default antfu({
  typescript: true,
  javascript: true,
  vue: true,
  jsonc: true,
  jsx: true,
  unocss: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false,
    jsx: true,
    overrides: {
      'style/comma-dangle': ['error', 'always-multiline'],
      'style/curly-newline': ['error', 'always'],
      'ts/consistent-type-imports': 'off',
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
          minProperties: 1,
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
    },
  },
}, {
  ignores: ['node_modules', 'dist'],
}, {
  files: ['./te-web/**/*.{ts,tsx,js,jsx,vue}'],
  languageOptions: autoImport,
})
