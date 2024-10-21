<script setup lang="ts">
import Breadcrumb from './breadcrumb.vue'
</script>

<template>
  <n-layout-header
    class="h-header flex-bc px-4 shadow-md"
  >
    <div class="flex items-center gap-1">
      <sider-collapse />
      <Breadcrumb />
    </div>
    <div class="flex items-center gap-1">
      <toggle-dark />
      <switch-locale />
    </div>
  </n-layout-header>
</template>

<style lang="scss" scoped>

</style>
