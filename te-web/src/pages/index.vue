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
      name: '李四',
    },
  ],
})
</script>

<template>
  <div>
    <SwitchLocale />
    {{ $t('common.test') }}
    <vxe-grid v-bind="gridConfig" ref="gridRef" />
  </div>
</template>

<style lang="scss" scoped>

</style>
