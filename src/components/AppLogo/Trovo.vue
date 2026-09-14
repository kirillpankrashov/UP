<template>
  <LogoTrovo
    class="w-36 fill-black"
    :class="{'w-96': big}"
  />
</template>

<script setup lang="ts">
import LogoTrovo from '@/assets/img/logo/trovo.svg'

defineProps<{
  big?: boolean
}>()
</script>
