<route lang="yaml">
name: Home
meta:
  title: 首页
  public: true
</route>

<script setup lang="ts">

</script>

<template>
  <SwitchLocale />
  {{ $t('common.test') }}
</template>

<style lang="scss" scoped>

</style>
