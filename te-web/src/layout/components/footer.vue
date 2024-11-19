<script setup lang="ts">
const configStore = useConfigStore()
</script>

<template>
  <div v-if="configStore.config.feature.showFooter" class="h-footer flex-c">
    Copyright &copy; 2024-present Trim ERP
  </div>
</template>

<style lang="scss" scoped>

</style>
