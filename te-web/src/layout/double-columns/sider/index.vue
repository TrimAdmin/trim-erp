<script setup lang="ts">
import ChildMenu from '@/layout/components/mix/child-menu.vue'
import ParentMenu from '@/layout/components/mix/parent-menu.vue'

const configStore = useConfigStore()
</script>

<template>
  <n-layout-sider
    :width="configStore.config.theme.siderWidth + 80"
    :collapsed="configStore.config.theme.siderCollapsed"
    :collapsed-width="64 + 80"
    collapse-mode="width"
    show-trigger
    class="relative z-1500 border-r-1 border-r-border border-r-solid"
    :inverted="configStore.config.theme.menuInverted"
    content-class="flex items-start"
    @collapse="configStore.config.theme.siderCollapsed = true"
    @expand="configStore.config.theme.siderCollapsed = false"
  >
    <ParentMenu class="h-full flex-shrink-0 justify-start bg-bg-body" />
    <ChildMenu class="flex-grow" />
  </n-layout-sider>
</template>

<style lang="scss" scoped>

</style>
