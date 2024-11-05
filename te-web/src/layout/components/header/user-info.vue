<script setup lang="ts">
import { useUserStore } from '@/store'
import { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'

const userStore = useUserStore()
const { t } = useLocale()

const options: DropdownMixedOption[] = [
  {
    label: t('common.user-info'),
    key: 'UserInfo',
    icon: () => renderIcon('i-ri:account-circle-line'),
  },
  {
    type: 'divider',
  },
  {
    label: t('common.logout'),
    key: 'Logout',
    icon: () => renderIcon('i-ri:logout-circle-line'),
  },
]

function renderIcon(icon: string) {
  return h('span', {
    class: icon,
  })
}

function onSelect(key: string) {
  switch (key) {
    case 'UserInfo':
      break
    case 'Logout':
      dialog.value.warning({
        title: t('common.tips'),
        content: t('toast.logout'),
        positiveText: t('btn.confirm'),
        negativeText: t('btn.cancel'),
        onPositiveClick: () => {
          userStore.handleLogout()
        },
      })
      break
  }
}
</script>

<template>
  <n-dropdown :options @select="onSelect">
    <div class="flex-c cursor-pointer select-none">
      <n-avatar round size="small" class="mr-1">
        {{ userStore.userInfo.nickname || userStore.userInfo.username }}
      </n-avatar>
      {{ userStore.userInfo.nickname || userStore.userInfo.username || '-' }}
      <span class="i-ri:arrow-down-s-fill" />
    </div>
  </n-dropdown>
</template>

<style lang="scss" scoped>

</style>
