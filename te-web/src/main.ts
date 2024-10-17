import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'

import '@/styles/index.scss'
import 'uno.css'
import 'vfonts/Inter.css'
import 'vfonts/FiraCode.css'

const app = createApp(App)
app.use(pinia)
app.use(router)

app.mount('#app')
