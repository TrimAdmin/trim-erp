<script setup lang="ts">
import { useConfigStore } from '@/store'
import Menu from './menu.vue'
import Logo from '/logo.svg'

const configStore = useConfigStore()

const { VITE_DOCUMENT_TITLE } = import.meta.env
</script>

<template>
  <n-layout-sider :width="configStore.config.theme.siderWidth" :collapsed="configStore.config.theme.siderCollapsed" :collapsed-width="64" collapse-mode="width" show-trigger class="relative z-1500 border-r-1 border-r-border border-r-solid" @collapse="configStore.config.theme.siderCollapsed = true" @expand="configStore.config.theme.siderCollapsed = false">
    <div v-if="configStore.config.feature.showLogo" class="h-header flex-c overflow-hidden text-ellipsis whitespace-nowrap text-xl">
      <img :src="Logo" alt="logo" class="h-8 w-8">
      <span v-if="!configStore.config.theme.siderCollapsed" class="ml-2">
        {{ VITE_DOCUMENT_TITLE }}
      </span>
    </div>
    <Menu />
  </n-layout-sider>
</template>

<style lang="scss" scoped>

</style>
