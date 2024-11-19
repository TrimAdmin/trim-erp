<script setup lang="ts">
function handleRefresh() {
  mitter.emit('page-refresh')
}
</script>

<template>
  <n-tooltip>
    {{ $t('btn.refresh') }}
    <template #trigger>
      <div class="h-6 w-6 flex-c text-4 hover:cursor-pointer" @click="handleRefresh">
        <i class="i-ep:refresh" />
      </div>
    </template>
  </n-tooltip>
</template>

<style lang="scss" scoped>

</style>
