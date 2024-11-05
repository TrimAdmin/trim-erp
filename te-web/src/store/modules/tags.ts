import { RouteRecordRaw } from 'vue-router'
import { RouteNamedMap } from 'vue-router/auto-routes'

const useTagsStore = defineStore('tags', () => {
  const tagsList = ref<RouteRecordRaw[]>([])
  const keepAliveList = computed<string[]>(() => tagsList.value.filter((tag) => tag.meta?.keepAlive).map((item) => item.name as string))

  const route = useRoute()
  const router = useRouter()

  function addTag(route: RouteRecordRaw) {
    if (route.meta?.hideTab)
      return
    if (tagsList.value.find((item) => item.name === route.name))
      return
    tagsList.value.push(route)
  }

  // 关闭标签
  function closeTag(routeName: keyof RouteNamedMap) {
    if (tagsList.value.length <= 1)
      return
    if (!tagsList.value.find((item) => item.name === routeName))
      return
    tagsList.value = tagsList.value.filter((item) => item.name !== routeName)
    // 如果关闭的是当前路由，则跳转到上一个路由
    if (route.name !== routeName)
      return
    router.push({
      name: tagsList.value[tagsList.value.length - 1].name as keyof RouteNamedMap,
    })
  }

  function clearTags() {
    tagsList.value = []
  }

  return {
    keepAliveList,
    tagsList,
    addTag,
    closeTag,
    clearTags,
  }
})

export default useTagsStore
