<script setup lang="ts">
import { usePermissionStore } from '@/store'
import { RouteNamedMap } from 'vue-router/auto-routes'

const permissionStore = usePermissionStore()
const router = useRouter()

function onMenuSelect(name: keyof RouteNamedMap) {
  router.push({
    name,
  })
}
</script>

<template>
  <n-menu
    accordion
    :options="permissionStore.menu" :indent="24"
    :value="$route.name"
    @select="onMenuSelect"
  />
</template>

<style lang="scss" scoped>

</style>
