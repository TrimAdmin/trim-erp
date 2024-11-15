<route lang="json">
{
  "name": "SystemUser",
  "meta":{
    "title": "用户管理",
    "titleI18n": "menu.system.user",
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
  tableSearchForm,
} = useList()
</script>

<template>
  <PageContainer>
    <template #header>
      <n-page-header>
        <template #title>
          {{ $t('menu.system.user') }}
        </template>
      </n-page-header>
    </template>
    <SearchPanel v-model="tableSearchForm" @refresh="onSearch">
      <template #default="{ searchForm }">
        <n-form-item label="用户名">
          <n-input v-model:value="searchForm.username" />
        </n-form-item>
        <n-form-item>
          <n-input />
        </n-form-item>
      </template>
      <template #hide>
        <n-form-item>
          <n-input />
        </n-form-item>
        <n-form-item>
          <n-input />
        </n-form-item>
      </template>
    </SearchPanel>
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
          :search-form="tableSearchForm"
          api="system/user/page"
        />
      </template>
    </TableBar>
  </PageContainer>
</template>

<style lang="scss" scoped>

</style>
