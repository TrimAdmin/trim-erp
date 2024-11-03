import { RouteRecordRaw } from 'vue-router'
import { RouteNamedMap } from 'vue-router/auto-routes'

const useTagsStore = defineStore('tags', () => {
  const tagsList = ref<RouteRecordRaw[]>([])
  const keepAliveList = computed<string[]>(() => tagsList.value.filter((tag) => tag.meta?.keepAlive).map((item) => item.name as string))

  function addTag(route: RouteRecordRaw) {
    if (route.meta?.hideTab)
      return
    if (tagsList.value.find((item) => item.name === route.name))
      return
    tagsList.value.push(route)
  }

  function closeTag(routeName: keyof RouteNamedMap) {
    if (tagsList.value.length <= 1)
      return
    if (!tagsList.value.find((item) => item.name === routeName))
      return
    tagsList.value = tagsList.value.filter((item) => item.name !== routeName)
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
