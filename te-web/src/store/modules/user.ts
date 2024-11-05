import { LoginForm } from '#/common/login'
import { UserInfo } from '#/system/user'
import { getUserInfo, login } from '@/api/system/auth'

const useUserStore = defineStore('user', () => {
  const token = useLocalStorage<string>('trim__token', '')
  const userInfo = ref<UserInfo>({} as UserInfo)
  const isLogged = computed<boolean>(() => !!token.value)
  const tagsStore = useTagsStoreHook()

  const router = useRouter()

  async function handleLogin(form: LoginForm) {
    const { data } = await login(form)
    token.value = data
    await handleGetUserInfo()
    router.replace({
      name: 'Home',
    })
  }

  async function handleGetUserInfo() {
    if (!isLogged.value)
      return
    const { data } = await getUserInfo()
    userInfo.value = data
  }

  function handleLogout() {
    token.value = undefined
    userInfo.value = {} as UserInfo
    tagsStore.clearTags()
    router.replace({
      name: 'Login',
    })
  }

  return {
    token,
    isLogged,
    userInfo,
    handleLogin,
    handleGetUserInfo,
    handleLogout,
  }
})

export default useUserStore
