<script setup lang="ts">
defineProps<{
  full?: boolean
  bg?: boolean
}>()
</script>

<template>
  <div
    class="page-container"
    :class="{
      'flex-grow flex flex-col': full,
      'bg-bg-card p-4': bg,
    }"
    :bordered="false"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
</style>
