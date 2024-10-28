<route lang="yaml">
name: Login
meta:
  title: 登录
  public: true
  hideMenu: true
  noLayout: true
</route>

<script setup lang="ts">
import ImgChart from '@/assets/img/login/chart.png'

const title = import.meta.env.VITE_DOCUMENT_TITLE
</script>

<template>
  <div class="login-page h-screen w-screen flex-c gap-[180px]">
    <img :src="ImgChart" alt="chart" class="h-[539px] w-[633px]">
    <div class="login-form">
      <h1 class="text-center text-[30px] font-bold">
        {{ $t('login.welcome') }}{{ title }}
      </h1>
      <div class="mx-auto mt-2 h-2 w-[80px] bg-primary" />
      <n-form class="mt-[72px]" :show-label="false" size="large">
        <n-form-item>
          <n-input round :placeholder="$t('common.phinput', { field: $t('login.username') })">
            <template #prefix>
              <i class="i-ri:user-3-line" />
            </template>
          </n-input>
        </n-form-item>
        <n-form-item>
          <n-input round type="password" show-password-toggle :placeholder="$t('common.phinput', { field: $t('login.password') })">
            <template #prefix>
              <i class="i-ri:lock-2-line" />
            </template>
          </n-input>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  background-image: url('@/assets/img/login/bg.png');
  background-size: cover;

  .login-form {
    flex-shrink: 0;
    width: 518px;
    height: 628px;
    padding: 78px;
    background-color: rgb(255 255 255 / 70%);
    border-radius: 30px;

    .n-input {
      --n-height: 56px !important;
    }
  }
}
</style>
