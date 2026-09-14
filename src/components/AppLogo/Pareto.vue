<template>
  <LogoPareto
    class="w-24"
    :class="{'w-52': big}"
  />
</template>

<script setup lang="ts">
import LogoPareto from '@/assets/img/logo/pareto.svg'

defineProps<{
  big?: boolean
}>()
</script>
