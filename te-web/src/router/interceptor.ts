import { Router, RouteRecordRaw } from 'vue-router'

export function routerInterceptor(router: Router) {
  router.beforeEach((to, from, next) => {
    const userStore = useUserStoreHook()
    loadingBar.value.start()

    useTitle(to.meta?.title ? `${to.meta?.title} - ${import.meta.env.VITE_DOCUMENT_TITLE}` : `${import.meta.env.VITE_DOCUMENT_TITLE}`)
    // 拦截非公共路由
    if (!to.meta.public && !userStore.isLogged) {
      next({
        name: 'Login',
      })
    }
    // 登录后拦截跳转登录页
    if (to.name === 'Login' && userStore.isLogged) {
      next({
        name: from.name,
      })
    }

    // 推到tagsList
    const tagsStore = useTagsStoreHook()
    tagsStore.addTag(to as unknown as RouteRecordRaw)
    next()
  })

  router.afterEach(() => {
    loadingBar.value.finish()
  })
}
