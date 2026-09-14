<template>
  <AmpverseLogo
    v-if="big"
    class="w-[370px]"
  />
  <AmpverseLogoSmall
    v-else
    class="w-[116px]"
  />
</template>

<script setup lang="ts">
import AmpverseLogo from '@/assets/img/logo/ampverse-logo.svg'
import AmpverseLogoSmall from '@/assets/img/logo/ampverse-logo-small.svg'

defineProps<{
  big?: boolean
}>()
</script>
