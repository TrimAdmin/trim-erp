<route lang="json">
{
  "name": "SystemUser",
  "meta":{
    "title": "用户管理",
    "icon": "i-ep:user",
    "keepAlive": true
  }
}
</route>

<script setup lang="ts">
import { useList } from './hooks/useList'

defineOptions({
  name: 'SystemUser',
})

const {
  columns,
  tableRef,
  onSearch,
  checkedRowKeys,
} = useList()
</script>

<template>
  <PageContainer full>
    <SearchPanel />
    <TableBar
      id="SystemUserList"
      class="flex-1"
      :columns="columns"
      :select-count="checkedRowKeys?.length"
      @refresh="onSearch"
    >
      <template #default="{ storageColumns, size }">
        <CommonTable
          ref="tableRef"
          v-model:checked-row-keys="checkedRowKeys"
          :size
          :columns="storageColumns"
          api="system/user/page"
        />
      </template>
    </TableBar>
  </PageContainer>
</template>

<style lang="scss" scoped>

</style>
