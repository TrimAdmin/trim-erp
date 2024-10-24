<script setup lang="ts">
import UserInfo from '@/layout/components/header/user-info.vue'
import Breadcrumb from '../../components/header/breadcrumb.vue'
</script>

<template>
  <n-layout-header
    class="h-header flex-bc px-4 shadow-md"
  >
    <div class="flex items-center gap-2">
      <sider-collapse />
      <Breadcrumb />
    </div>
    <div class="flex items-center gap-2">
      <toggle-dark />
      <switch-locale />
      <UserInfo />
    </div>
  </n-layout-header>
</template>

<style lang="scss" scoped>

</style>
