import { useMenuStoreHook } from '@/store'
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'
import { routerInterceptor } from './interceptor'

routes.forEach((route) => {
  route.meta ??= {}
})

// @ts-expect-error not infinity
useMenuStoreHook().menu = generateMenu(routes)
// @ts-expect-error not infinity
useMenuStoreHook().wholeMenu = generateMenu(routes, true)
useMenuStoreHook().permissionList = generateFlatAuthList(routes)

const router = createRouter({
  routes,
  history: import.meta.env.VITE_HASH_HISTORY === 'true' ? createWebHashHistory() : createWebHistory(),
})

routerInterceptor(router)

if (import.meta.env.DEV) {
  handleHotUpdate(router)
}

export default router
