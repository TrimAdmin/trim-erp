<script setup lang="ts">
import { useConfigStore } from '@/store'
import Menu from './menu.vue'

const configStore = useConfigStore()

const { VITE_DOCUMENT_TITLE } = import.meta.env
</script>

<template>
  <n-layout-sider :width="configStore.config.theme.siderWidth" :collapsed-width="64" show-trigger class="shadow-md">
    <div class="h-header flex-c text-xl">
      {{ VITE_DOCUMENT_TITLE }}
    </div>
    <Menu />
  </n-layout-sider>
</template>

<style lang="scss" scoped>

</style>
