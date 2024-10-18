<route lang="yaml">
name: Home
meta:
  title: 首页
  public: true
</route>

<script setup lang="ts">

</script>

<template>
  <div>
    <SwitchLocale />
    {{ $t('common.test') }}
    <vxe-table
      :data="[{
        name: 1,
      }]"
      :edit-config="{
        trigger: 'click',
        mode: 'row',
      }"
    >
      <vxe-column title="序号" type="seq" />
      <vxe-column
        title="姓名" field="name" :edit-render="{
          slots: {
            edit: 'edit',
          },
        }"
      >
        <template #edit="{ row }">
          <n-select
            v-model:value="row.name" :options="[{
              value: 1,
              label: '1',
            }, {
              value: 2,
              label: '2',
            }]"
          />
        </template>
      </vxe-column>
      <vxe-column title="操作" field="operation">
        <n-button>删除</n-button>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<style lang="scss" scoped>

</style>
