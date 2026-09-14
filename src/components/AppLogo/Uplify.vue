<template>
  <LogoUplify
    class="w-16 fill-primary"
    :class="{'w-48': big}"
  />
</template>

<script setup lang="ts">
import LogoUplify from '@/assets/img/logo/uplify.svg'

defineProps<{
  big?: boolean
}>()
</script>
