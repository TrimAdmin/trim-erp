<script setup lang="ts">
import Logo from '@/layout/components/header/logo.vue'
import { useConfigStore } from '@/store'
import Menu from '../../components/menu.vue'

const configStore = useConfigStore()
</script>

<template>
  <n-layout-sider
    :width="configStore.config.theme.siderWidth"
    :collapsed="configStore.config.theme.siderCollapsed"
    :collapsed-width="64"
    collapse-mode="width"
    show-trigger
    class="relative z-1500 border-r-1 border-r-border border-r-solid"
    :inverted="configStore.config.theme.siderInverted"
    @collapse="configStore.config.theme.siderCollapsed = true"
    @expand="configStore.config.theme.siderCollapsed = false"
  >
    <Logo />
    <Menu mode="vertical" />
  </n-layout-sider>
</template>

<style lang="scss" scoped>

</style>
