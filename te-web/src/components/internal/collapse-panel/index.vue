<script setup lang="ts">
const show = ref<boolean>()
</script>

<template>
  <div class="collapse-panel">
    <n-collapse-transition :show />
  </div>
</template>

<style lang="scss" scoped>
.collapse-panel {
  @apply bg-bg-card;
}
</style>
