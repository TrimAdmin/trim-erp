<route lang="yaml">
name: Home
meta:
  title: 首页
  titleI18n: 'menu.home'
  icon: 'i-ant-design:home-outlined'
</route>

<script setup lang="ts">

</script>

<template>
  <PageContainer>
    <div v-for="item in 100" :key="item">
      111
    </div>
  </PageContainer>
</template>

<style lang="scss" scoped>

</style>
