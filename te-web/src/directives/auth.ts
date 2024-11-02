import type { Directive } from 'vue'
import { useUserStoreHook } from '@/store'

const vAuth: Directive = {
  mounted: (el: HTMLElement, binding) => {
    const userStore = useUserStoreHook()
    const permissionList = userStore.userInfo.permissions
    // 是否拥有全部权限
    if (permissionList.includes('*:*')) {
      return
    }
    let hasAuth: boolean = false
    if (Array.isArray(binding.value)) {
      hasAuth = binding.value.every((perm) => permissionList.includes(perm))
    }
    else if (typeof binding.value === 'string') {
      hasAuth = !!permissionList.find(binding.value)
    }
    !hasAuth && el?.remove()
  },
}

export default vAuth
