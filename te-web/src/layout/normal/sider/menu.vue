<script setup lang="ts">
import { useConfigStore, useMenuStore } from '@/store'
import { MenuOption } from 'naive-ui'
import { RouteNamedMap } from 'vue-router/auto-routes'

const permissionStore = useMenuStore()
const configStore = useConfigStore()
const router = useRouter()
const { t } = useLocale()

function onMenuChange(name: keyof RouteNamedMap) {
  router.push({
    name,
  })
}

function renderLabel(menu: MenuOption) {
  return menu.i18n ? t(menu.i18n as string) : menu.label as string
}
</script>

<template>
  <n-menu
    accordion
    :options="permissionStore.menu"
    :indent="24"
    :collapsed="configStore.config.theme.siderCollapsed"
    :value="$route.name"
    :render-label="renderLabel"
    :collapsed-width="64"
    :inverted="configStore.config.theme.darkMode"
    :watch-props="['defaultValue']"
    @update-value="onMenuChange"
  />
</template>

<style lang="scss" scoped>

</style>
