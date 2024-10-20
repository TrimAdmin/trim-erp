import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { vitePlugins } from './vite/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {
      port: 5300,
    },
    plugins: vitePlugins(mode),
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '#': resolve(__dirname, 'types'),
      },
    },
  }
})
