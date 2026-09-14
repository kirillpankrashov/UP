<template>
  <LogoStreammoney
    class="w-36 fill-primary"
    :class="{'w-96': big}"
  />
</template>

<script setup lang="ts">
import LogoStreammoney from '@/assets/img/logo/streammoney.svg'

defineProps<{
  big?: boolean
}>()
</script>
