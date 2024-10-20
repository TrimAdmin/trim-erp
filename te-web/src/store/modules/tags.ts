import { RouteRecordRaw } from 'vue-router'

const useTagsStore = defineStore('tags', () => {
  const tagsList = ref<RouteRecordRaw[]>([])
  const keepAliveList = computed<string[]>(() => tagsList.value.filter((tag) => tag.meta?.keepAlive).map((item) => item.name as string))

  function addTag(route: RouteRecordRaw) {
    if (tagsList.value.find((item) => item.name === route.name))
      return
    tagsList.value.push(route)
  }

  function closeTag(route: RouteRecordRaw) {
    if (!tagsList.value.find((item) => item.name === route.name))
      return
    tagsList.value = tagsList.value.filter((item) => item.name !== route.name)
  }

  return {
    keepAliveList,
    tagsList,
    addTag,
    closeTag,
  }
})

export default useTagsStore
