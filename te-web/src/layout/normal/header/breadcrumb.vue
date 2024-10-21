<script setup lang="ts">
import { usePermissionStore } from '@/store'

const route = useRoute()
const permissionStore = usePermissionStore()
const breadcrumbList = computed(() => permissionStore.getBreadcrumbList(route.name))
</script>

<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-for="item in breadcrumbList" :key="item.key" :clickable="false">
      {{ item.i18n ? $t(item.i18n as string) : item.label }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<style lang="scss" scoped>

</style>
