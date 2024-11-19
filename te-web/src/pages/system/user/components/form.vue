<script setup lang="ts">
import { useForm } from '../hooks/useForm'

const { formData } = useForm()
</script>

<template>
  <PageContainer>
    {{ formData }}
  </PageContainer>
</template>

<style lang="scss" scoped>

</style>
