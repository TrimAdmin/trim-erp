import { usePermissionStoreHook } from '@/store'
import { defineBasicLoader } from 'unplugin-vue-router/data-loaders/basic'
import { NavigationResult } from 'unplugin-vue-router/runtime'
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

const routerInterceptor = defineBasicLoader(async (to) => {
  useTitle(to.meta?.title ? `${to.meta?.title} - ${import.meta.env.VITE_DOCUMENT_TITLE}` : `${import.meta.env.VITE_DOCUMENT_TITLE}`)
  if (!to.meta.public) {
    return new NavigationResult({
      name: 'Login',
    })
  }
})

routes.forEach((route) => {
  route.meta ??= {}
  route.meta.loaders = [routerInterceptor]
})

usePermissionStoreHook().menu = generateMenu(routes)
usePermissionStoreHook().permissionList = generateFlatAuthList(routes)

const router = createRouter({
  routes,
  history: import.meta.env.VITE_HASH_HISTORY === 'true' ? createWebHashHistory() : createWebHistory(),
})

if (import.meta.hot) {
  handleHotUpdate(router)
}

export default router
