<script setup lang="ts">
import { useConfigStore } from '@/store'
import Menu from './menu.vue'

const configStore = useConfigStore()

const { VITE_DOCUMENT_TITLE } = import.meta.env
</script>

<template>
  <n-layout-sider :width="configStore.config.theme.siderWidth" :collapsed="configStore.config.theme.siderCollapsed" :collapsed-width="64" collapse-mode="width" show-trigger class="shadow-md" @collapse="configStore.config.theme.siderCollapsed = true" @expand="configStore.config.theme.siderCollapsed = false">
    <div v-if="!configStore.config.theme.siderCollapsed" class="h-header flex-c overflow-hidden text-ellipsis whitespace-nowrap text-xl">
      {{ VITE_DOCUMENT_TITLE }}
    </div>
    <Menu />
  </n-layout-sider>
</template>

<style lang="scss" scoped>

</style>
