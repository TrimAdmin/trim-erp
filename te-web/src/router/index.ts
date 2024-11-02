import { useMenuStoreHook, useUserStoreHook } from '@/store'
import { defineBasicLoader } from 'unplugin-vue-router/data-loaders/basic'
import { NavigationResult } from 'unplugin-vue-router/runtime'
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

const routerInterceptor = defineBasicLoader(async (to) => {
  const userStore = useUserStoreHook()

  useTitle(to.meta?.title ? `${to.meta?.title} - ${import.meta.env.VITE_DOCUMENT_TITLE}` : `${import.meta.env.VITE_DOCUMENT_TITLE}`)
  // 拦截非公共路由
  if (!to.meta.public && !userStore.isLogged) {
    return new NavigationResult({
      name: 'Login',
    })
  }
  // 登录后拦截跳转登录页
  if (to.name === 'Login' && userStore.isLogged) {
    return new NavigationResult(false)
  }
})

routes.forEach((route) => {
  route.meta ??= {}
  route.meta.loaders = [routerInterceptor]
})

// @ts-expect-error not infinity
useMenuStoreHook().menu = generateMenu(routes)
useMenuStoreHook().permissionList = generateFlatAuthList(routes)

const router = createRouter({
  routes,
  history: import.meta.env.VITE_HASH_HISTORY === 'true' ? createWebHashHistory() : createWebHistory(),
})

if (import.meta.hot) {
  handleHotUpdate(router)
}

export default router
