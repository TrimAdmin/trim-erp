import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { plugins } from './vite/plugins'

// https://vitejs.dev/config/
export default defineConfig({
  plugins,
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '#': resolve(__dirname, 'types'),
    },
  },
})
