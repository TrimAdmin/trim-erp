import { resolve } from 'node:path'
import process from 'node:process'
import {
  defineConfig,
  loadEnv,
  type UserConfig,
} from 'vite'
import { vitePlugins } from './vite/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode }): UserConfig => {
  const env = loadEnv(mode, process.cwd(), '')
  const { VITE_ENABLE_PROXY, VITE_API_BASE_URL } = env

  return {
    server: {
      port: 5300,
      proxy: VITE_ENABLE_PROXY
        ? {
            '/proxy-api': {
              target: VITE_API_BASE_URL,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/proxy-api/, ''),
            },
          }
        : undefined,
    },
    plugins: vitePlugins(mode),
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '#': resolve(__dirname, 'types'),
      },
    },
  }
})
