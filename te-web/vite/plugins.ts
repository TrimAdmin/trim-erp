import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import TurboConsole from 'unplugin-turbo-console/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { UserConfig } from 'vite'

export const plugins: UserConfig['plugins'] = [
  vue(),
  UnoCSS({
    configFile: '../uno.config.ts',
  }),
  AutoImport({
    dts: './types/generated/auto-import.d.ts',
    imports: ['pinia', 'vue-router', 'vue', '@vueuse/core', {
      'naive-ui': [
        'useDialog',
        'useMessage',
        'useNotification',
        'useLoadingBar',
      ],
    }],
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
