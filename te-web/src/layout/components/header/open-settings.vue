<script setup lang="ts">
function handleOpenConfigPanel() {
  mitter.emit('toggle-config-panel')
}
</script>

<template>
  <n-tooltip>
    {{ $t('common.config-panel') }}
    <template #trigger>
      <div
        class="h-6 w-6 flex-c text-4 hover:cursor-pointer"
        @click="handleOpenConfigPanel"
      >
        <i class="i-ep:setting" />
      </div>
    </template>
  </n-tooltip>
</template>

<style lang="scss" scoped>

</style>
