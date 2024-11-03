<route lang="yaml">
name: SystemUser
meta:
  title: 用户管理
  icon: 'i-ep:user'
</route>

<script setup lang="ts">

</script>

<template>
  <PageContainer>
    user
    <n-button v-auth="['system:user']" />
  </PageContainer>
</template>

<style lang="scss" scoped>

</style>
