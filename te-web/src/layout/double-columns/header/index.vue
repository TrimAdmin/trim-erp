<script setup lang="ts">
import OpenSettings from '@/layout/components/header/open-settings.vue'
import Refresh from '@/layout/components/header/refresh.vue'
import Breadcrumb from '../../components/header/breadcrumb.vue'
import UserInfo from '../../components/header/user-info.vue'
</script>

<template>
  <n-layout-header
    class="h-header flex-bc px-4"
  >
    <div class="flex items-center gap-2">
      <SiderCollapse />
      <Breadcrumb />
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
