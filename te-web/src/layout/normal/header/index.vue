<script setup lang="ts">
import UserInfo from '@/layout/components/header/user-info.vue'
import Breadcrumb from '../../components/header/breadcrumb.vue'
</script>

<template>
  <n-layout-header
    class="h-header flex-bc border-b-1 border-b-border border-b-solid px-4"
  >
    <div class="flex items-center gap-2">
      <SiderCollapse />
      <Breadcrumb />
    </div>
    <div class="flex items-center gap-3">
      <ToggleDark />
      <SwitchLocale />
      <UserInfo />
    </div>
  </n-layout-header>
</template>

<style lang="scss" scoped>

</style>
