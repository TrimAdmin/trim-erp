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
const menuList = computed(() => menuStore.menu.find((item) => item.key === parentRouteName.value)?.children)

const defaultExpandedKeys = computed<string[]>(() => [menuStore.getParentMenu(route.name)?.key as string ?? ''])

defineExpose({
  menuList,
})
</script>

<template>
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
</template>

<style lang="scss" scoped>

</style>
