<script setup lang="ts">
import OpenSettings from '@/layout/components/header/open-settings.vue'
import Refresh from '@/layout/components/header/refresh.vue'
import Logo from '../../components/header/logo.vue'
import UserInfo from '../../components/header/user-info.vue'
import Menu from '../../components/menu.vue'
</script>

<template>
  <n-layout-header
    class="h-header flex-bc px-4"
  >
    <div class="flex flex-grow items-center gap-2">
      <Logo class="flex-shrink-0" />
      <Menu class="flex-grow" mode="horizontal" />
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
