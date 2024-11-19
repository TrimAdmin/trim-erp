<script setup lang="ts">
import Logo from '@/layout/components/header/logo.vue'
import OpenSettings from '@/layout/components/header/open-settings.vue'
import Refresh from '@/layout/components/header/refresh.vue'
import ParentMenu from '@/layout/components/mix/parent-menu.vue'
import UserInfo from '../../components/header/user-info.vue'

const configStore = useConfigStore()
</script>

<template>
  <n-layout-header
    class="h-header flex-bc border-b-1px border-b-border border-b-solid px-4"
    :inverted="configStore.config.theme.menuInverted"
  >
    <div class="flex flex-grow items-center gap-2">
      <Logo class="flex-shrink-0" />
      <ParentMenu class="flex-grow" mode="horizontal" />
    </div>
    <div class="flex items-center gap-3">
      <Refresh />
      <ToggleDark />
      <SwitchLocale />
      <OpenSettings />
      <UserInfo />
    </div>
  </n-layout-header>
</template>

<style lang="scss" scoped>

</style>
