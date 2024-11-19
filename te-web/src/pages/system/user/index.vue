<route lang="json5">
{
  name: "SystemUser",
  meta:{
    title: "用户管理",
    titleI18n: "menu.system.user",
    icon: "i-ep:user",
    keepAlive: true
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
  getData,
  onReset,
  checkedRowKeys,
  searchForm,
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
    <SearchPanel @refresh="getData" @reset="onReset">
      <n-form
        :model="searchForm"
        :show-feedback="false"
        inline
        label-placement="left"
      >
        <n-form-item label="用户名" path="username">
          <n-input v-model:value="searchForm.username" clearable />
        </n-form-item>
      </n-form>
    </SearchPanel>
    <TableBar
      id="SystemUserList"
      class="flex-1"
      :columns="columns"
      :select-count="checkedRowKeys?.length"
      @refresh="getData"
    >
      <template #right>
        <n-button type="primary" @click="$router.push({ name: 'SystemUserAdd' })">
          <template #icon>
            <i class="i-ep:plus" />
          </template>
          {{ $t('btn.create') }}
        </n-button>
      </template>
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
