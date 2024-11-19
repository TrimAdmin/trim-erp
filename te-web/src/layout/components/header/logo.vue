<script setup lang="ts">
import Logo from '/logo.svg'

const configStore = useConfigStore()
const { VITE_DOCUMENT_TITLE } = import.meta.env
</script>

<template>
  <div v-if="configStore.config.feature.showLogo" class="h-header flex-c select-none overflow-hidden text-ellipsis whitespace-nowrap text-xl">
    <img :src="Logo" alt="logo" class="h-8 w-8">
    <span v-if="configStore.config.layout !== 'normal' || !configStore.config.theme.siderCollapsed" class="ml-2">
      {{ VITE_DOCUMENT_TITLE }}
    </span>
  </div>
</template>

<style lang="scss" scoped>

</style>
