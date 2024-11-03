<route lang="yaml">
name: Home
meta:
  title: 首页
  titleI18n: 'menu.home'
  icon: 'i-ant-design:home-outlined'
</route>

<script setup lang="ts">
const {
  gridConfig,
  gridRef,
} = useVxeGrid({
  id: 'HomeTable',
  columns: [
    {
      title: '姓名',
      field: 'name',
    },
  ],
  data: [
    {
      name: '张三',
    },
    {
      name: undefined,
    },
  ],
})
</script>

<template>
  <PageContainer>
    <VxeTableToolbar>
      <vxe-grid v-bind="gridConfig" ref="gridRef" />
    </VxeTableToolbar>
  </PageContainer>
</template>

<style lang="scss" scoped>

</style>
