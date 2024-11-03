<script setup lang="ts">
import { DropdownOption } from 'naive-ui'
import { VueDraggable } from 'vue-draggable-plus'
import { RouteNamedMap } from 'vue-router/auto-routes'
import Card from './components/card.vue'

const route = useRoute()
const router = useRouter()
const activeTab = ref<keyof RouteNamedMap>(route.name)
const tagsStore = useTagsStore()

watchEffect(() => {
  activeTab.value = route.name
})

// 右键菜单
const contextMenuDropdown = computed<DropdownOption[]>(() => {
  const index = tagsStore.tagsList.findIndex((item) => item.name === activeTab.value)
  const showCloseOther = tagsStore.tagsList.length > 1
  const showCloseLeft = index > 0
  const showCloseRight = tagsStore.tagsList.length > 1 && index < tagsStore.tagsList.length - 1
  return [
    {
      label: '刷新',
      key: 'refresh',
      icon: () => h('span', {
        class: 'i-ep-refresh',
      }),
      show: activeTab.value === route.name,
    },
    {
      label: '关闭标签页',
      key: 'close',
      icon: () => h('span', {
        class: 'i-ep-close',
      }),
      show: tagsStore.tagsList.length > 1,
    },
    {
      label: '最大化',
      key: 'maximize',
      icon: () => h('span', {
        class: 'i-ri-aspect-ratio-line',
      }),
    },
    {
      type: 'divider',
      show: showCloseLeft || showCloseOther || showCloseRight,
    },
    {
      label: '关闭其他标签页',
      key: 'close-other',
      icon: () => h('span', {
        class: 'i-ri-arrow-left-right-line',
      }),
      show: showCloseOther,
    },
    {
      label: '关闭左侧标签页',
      key: 'close-left',
      icon: () => h('span', {
        class: 'i-ri-skip-left-line',
      }),
      show: showCloseLeft,
    },
    {
      label: '关闭右侧标签页',
      key: 'close-right',
      icon: () => h('span', {
        class: 'i-ri-skip-right-line',
      }),
      show: showCloseRight,
    },
  ]
})

const showMenu = ref<boolean>(false)
const x = ref<number>(0)
const y = ref<number>(0)

async function handleContextMenu(e: MouseEvent, routeName: keyof RouteNamedMap) {
  e.preventDefault()
  showMenu.value = false
  await nextTick()
  showMenu.value = true
  x.value = e.clientX
  y.value = e.clientY
  activeTab.value = routeName
}

// 点击外部关闭菜单
function onClickOutside() {
  showMenu.value = false
}

function onRouterChange(name: keyof RouteNamedMap) {
  router.push({
    name,
  })
}

// 标签点击
function onTagClick(name: keyof RouteNamedMap) {
  onRouterChange(name)
}

// 关闭标签
function handleClose(name: keyof RouteNamedMap) {
  tagsStore.closeTag(name)
}

// 下拉选中
function handleSelect(key: string) {
  // console.log(key)
  switch (key) {
    case 'refresh':
      break
    // 关闭标签
    case 'close':
      handleClose(activeTab.value)
      break
    case 'maximize':
      break
    case 'close-other':
      break
    // 关闭左侧标签页
    case 'close-left':
      break
    case 'close-right':
      break
  }
  showMenu.value = false
}
</script>

<template>
  <VueDraggable v-model="tagsStore.tagsList" :disabled="tagsStore.tagsList.length <= 1" class="trim-tags">
    <template v-for="item in tagsStore.tagsList" :key="item.name">
      <component :is="Card" :active="route.name === item.name" :closable="tagsStore.tagsList.length > 1" :tab="item" @close="handleClose(item.name as keyof RouteNamedMap)" @contextmenu="(e: MouseEvent) => handleContextMenu(e, item.name as keyof RouteNamedMap)" @click.stop="() => onTagClick(item.name as keyof RouteNamedMap)" />
    </template>
  </VueDraggable>
  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    :show="showMenu"
    :x
    :y
    :on-clickoutside="onClickOutside"
    :options="contextMenuDropdown"
    @select="handleSelect"
  />
</template>

<style scoped lang="scss">
.trim-tags {
  overflow-x: auto;
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 8px;
}
</style>
