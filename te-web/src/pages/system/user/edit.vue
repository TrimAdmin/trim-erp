<route lang="json5">
{
  name: "SystemUserEdit",
  meta:{
    title: "编辑用户",
    titleI18n: "menu.system.update-user",
    icon: "i-ep:user",
    keepAlive: true,
    hideMenu: true,
    activeMenu: "SystemUser"
  }
}
</route>

<script setup lang="ts">
import Form from './components/form.vue'
</script>

<template>
  <Form />
</template>

<style lang="scss" scoped>

</style>
