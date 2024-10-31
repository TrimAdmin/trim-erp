<script setup lang="ts">
import { useUserStore } from '@/store'
import { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'

const userStore = useUserStore()

const options: DropdownMixedOption[] = [
  {
    label: '个人信息',
    key: 'UserInfo',
    icon: () => renderIcon('i-ri:account-circle-line'),
  },
  {
    type: 'divider',
  },
  {
    label: '退出登录',
    key: 'Logout',
    icon: () => renderIcon('i-ri:logout-circle-line'),
  },
]

function renderIcon(icon: string) {
  return h('span', {
    class: icon,
  })
}
</script>

<template>
  <n-dropdown :options>
    <div class="flex-c cursor-pointer select-none gap-1">
      <n-avatar circle size="small">
        {{ userStore.userInfo.nickname || userStore.userInfo.username }}
      </n-avatar>
      {{ userStore.userInfo.nickname || userStore.userInfo.username }}
      <span class="i-ri:arrow-down-s-fill" />
    </div>
  </n-dropdown>
</template>

<style lang="scss" scoped>

</style>
