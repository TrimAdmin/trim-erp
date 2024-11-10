import { MotionPlugin } from '@vueuse/motion'
import { DataLoaderPlugin } from 'unplugin-vue-router/data-loaders'
import { createApp } from 'vue'
import App from './App.vue'
import { registerDirectives } from './directives'
import i18n from './locales'

import router from './router'
import pinia from './store'
import './utils/icons'
import '@/styles/index.scss'
import 'uno.css'
import 'vfonts/Inter.css'
import 'vfonts/FiraCode.css'

const app = createApp(App)
app.use(pinia)
app.use(DataLoaderPlugin, {
  router,
})
app.use(router)
app.use(i18n)
app.use(MotionPlugin)

registerDirectives(app)

app.mount('#app')
