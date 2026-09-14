<template>
  <LogoJoneKiri
    class="w-36"
    :class="{'w-80': big}"
  />
</template>

<script setup lang="ts">
import LogoJoneKiri from '@/assets/img/logo/jonekiri.svg'

defineProps<{
  big?: boolean
}>()
</script>
