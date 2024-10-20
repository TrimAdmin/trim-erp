<script setup lang="ts">
import { useConfigStore, usePermissionStore } from '@/store'
import { RouteNamedMap } from 'vue-router/auto-routes'

const permissionStore = usePermissionStore()
const configStore = useConfigStore()
const router = useRouter()

function onMenuChange(name: keyof RouteNamedMap) {
  router.push({
    name,
  })
}
</script>

<template>
  <n-menu
    accordion
    :options="permissionStore.menu"
    :indent="24"
    :collapsed="configStore.config.theme.siderCollapsed"
    :value="$route.name"
    :collapsed-width="64"
    :inverted="configStore.config.theme.darkMode"
    @update-value="onMenuChange"
  />
</template>

<style lang="scss" scoped>

</style>
