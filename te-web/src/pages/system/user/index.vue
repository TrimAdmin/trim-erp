<route lang="yaml">
name: SystemUser
meta:
  title: 用户管理
  icon: 'i-ep:user'
</route>

<script setup lang="ts">

</script>

<template>
  <PageContainer bg>
    <SearchPanel />
    <TableBar id="SystemUserList">
      <template #default="{ columns }">
        <n-data-table :columns="columns" :data="[]" />
      </template>
    </TableBar>
  </PageContainer>
</template>

<style lang="scss" scoped>

</style>
