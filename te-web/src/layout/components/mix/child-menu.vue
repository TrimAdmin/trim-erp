<script setup lang="ts">
import { MenuOption } from 'naive-ui'
import { RouteNamedMap } from 'vue-router/auto-routes'

const configStore = useConfigStore()
const menuStore = useMenuStore()
const router = useRouter()
const route = useRoute()

const { t } = useLocale()

function onMenuChange(name: keyof RouteNamedMap) {
  router.push({
    name,
  })
}

function renderLabel(menu: MenuOption) {
  return menu.i18n ? t(menu.i18n as string) : menu.label as string
}

const parentRouteName = computed<string>(() => menuStore.getParentMenu(route.name)?.key as string ?? '')
const menuList = computed(() => {
  const list = menuStore.menu.find((item) => item.key === parentRouteName.value)?.children
  if (list && list.length)
    return list
  return menuStore.getParentMenu(route.name) ? [menuStore.getParentMenu(route.name)] : []
})

const defaultExpandedKeys = computed<string[]>(() => [menuStore.getParentMenu(route.name)?.key as string ?? ''])
const { VITE_DOCUMENT_TITLE } = import.meta.env

defineExpose({
  menuList,
})
</script>

<template>
  <div>
    <span
      v-if="configStore.config.feature.showLogo && !configStore.config.theme.siderCollapsed && configStore.config.layout === 'double-columns'"
      class="h-header flex-c select-none overflow-hidden text-ellipsis whitespace-nowrap text-xl"
    >
      {{ VITE_DOCUMENT_TITLE }}
    </span>
    <n-scrollbar>
      <n-menu
        mode="vertical"
        :options="menuList"
        :indent="24"
        :collapsed="configStore.config.theme.siderCollapsed"
        :default-expanded-keys
        :value="$route.meta.activeMenu as string ?? $route.name"
        :render-label="renderLabel"
        :collapsed-width="64"
        :inverted="configStore.config.theme.menuInverted"
        :watch-props="['defaultExpandedKeys']"
        @update-value="onMenuChange"
      />
    </n-scrollbar>
  </div>
</template>

<style lang="scss" scoped>

</style>
