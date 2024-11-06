<script setup lang="ts">
defineProps<{
  full?: boolean
}>()
</script>

<template>
  <div
    class="overflow-hidden rounded-md bg-bg-card p-4" :class="{
      'flex-grow': full,
    }"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>

</style>
