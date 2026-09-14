<template>
  <LogoStreamo
    class="w-36"
    :class="{'w-80': big}"
  />
</template>

<script setup lang="ts">
import LogoStreamo from '@/assets/img/logo/streamo.svg'

defineProps<{
  big?: boolean
}>()
</script>
