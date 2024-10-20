import process from 'node:process'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import TurboConsole from 'unplugin-turbo-console/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import vueRouter from 'unplugin-vue-router/vite'
import { loadEnv, UserConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

export function vitePlugins(mode: string): UserConfig['plugins'] {
  const env = loadEnv(mode, process.cwd(), '')
  const { VITE_ENABLE_VUE_DEVTOOLS } = env

  return [
    vueRouter({
      dts: './types/generated/typed-router.d.ts',
      routesFolder: ['src/pages'],
      extensions: ['.vue', '.tsx'],
      routeBlockLang: 'yaml',
    }),
    vue(),
    vueJsx(),
    VITE_ENABLE_VUE_DEVTOOLS === 'true' && vueDevTools(),
    UnoCSS({
      configFile: '../uno.config.ts',
    }),
    AutoImport({
      dts: './types/generated/auto-import.d.ts',
      imports: ['pinia', 'vue', '@vueuse/core', VueRouterAutoImports],
      dirs: ['./src/utils', './src/hooks', './src/composables'],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
      },
    }),
    Components({
      dts: './types/generated/components.d.ts',
      dirs: ['./src/components'],
      resolvers: [
        IconsResolver({
          prefix: 'icon',
        }),
        NaiveUiResolver(),
      ],
      extensions: ['vue', 'tsx'],
    }),
    TurboConsole(),
    Icons({
      compiler: 'vue3',
    }),
  ]
}
