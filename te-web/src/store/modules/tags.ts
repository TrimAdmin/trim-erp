import { RouteRecordRaw } from 'vue-router'
import { RouteNamedMap } from 'vue-router/auto-routes'

const useTagsStore = defineStore('tags', () => {
  const configStore = useConfigStoreHook()
  const tagsList = ref<RouteRecordRaw[]>(JSON.parse(localStorage.getItem('trim__tags-list') ?? '[]') ?? [])
  const keepAliveList = computed<string[]>(() => tagsList.value.filter((tag) => tag.meta?.keepAlive).map((item) => item.name as string))

  const route = useRoute()
  const router = useRouter()

  watchEffect(() => {
    if (configStore.config.feature?.cacheTabs) {
      localStorage.setItem('trim__tags-list', JSON.stringify(tagsList.value))
    }
    else {
      localStorage.removeItem('trim__tags-list')
    }
  })

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

  // 关闭左侧标签页
  function closeLeftTags(name: string) {
    // 当前路由在标签页中的下标
    const currentTagIndex = tagsList.value.findIndex(
      (item) => item.name === router.currentRoute.value.name,
    )
    // 触发的标签页下标
    const tagIndex = tagsList.value.findIndex((item) => item.name === name)
    // 移除标签页列表中元素
    tagsList.value.splice(0, tagIndex)
    // 若触发标签页下标大于当前路由下标则跳转到首个标签页（关闭后首个标签页即为触发标签页）
    if (tagIndex > currentTagIndex) {
      router.push({
        name: tagsList.value[0].name as keyof RouteNamedMap,
      })
    }
  }

  // 关闭右侧标签页
  function closeRightTags(name: string) {
    // 当前路由在标签页中的下标
    const currentTagIndex = tagsList.value.findIndex(
      (item) => item.name === router.currentRoute.value.name,
    )
    // 触发的标签页下标
    const tagIndex = tagsList.value.findIndex((item) => item.name === name)
    // 移除标签页列表中元素
    tagsList.value.splice(tagIndex + 1, tagsList.value.length - tagIndex - 1)
    // 若触发标签页下标小于当前路由下标则跳转到触发标签页
    if (tagIndex < currentTagIndex) {
      router.push({
        name: tagsList.value[tagIndex].name as keyof RouteNamedMap,
      })
    }
  }

  // 关闭其他标签页
  function closeOtherTags(name: string) {
    // 触发的标签页下标
    let tagIndex = tagsList.value.findIndex((item) => item.name === name)
    // 移除标签页列表中左侧的元素
    tagsList.value.splice(0, tagIndex)
    // 重新获取下标
    tagIndex = tagsList.value.findIndex((item) => item.name === name)
    // 移除标签页列表中右侧的元素
    tagsList.value.splice(
      tagIndex + 1,
      tagsList.value.length - tagIndex - 1,
    )
    // 关闭后仅剩该标签页
    router.push({
      name: tagsList.value[0].name as keyof RouteNamedMap,
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
    closeLeftTags,
    closeRightTags,
    closeOtherTags,
    clearTags,
  }
})

export default useTagsStore
