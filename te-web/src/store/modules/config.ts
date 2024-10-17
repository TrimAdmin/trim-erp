const useConfigStore = defineStore('config', () => {
  const config = ref({
    theme: 'blue',
  })

  return {
    config,
  }
}, {
  persist: {
    key: 'trim__config',
  },
})

export default useConfigStore
