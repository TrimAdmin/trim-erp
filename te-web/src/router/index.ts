import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  routes: [{
    path: '/',
    name: 'Home',
    component: h('div', null, 'hello world'),
  }],
  history: createWebHashHistory(),
})

export default router
