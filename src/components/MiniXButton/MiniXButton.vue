<template>
  <div
    class="_text-s-regular group inline-flex cursor-pointer items-center transition-all hover:text-primary"
    @click="$emit('click')"
  >
    <XIcon class="mr-2 h-2 w-2 fill-black group-hover:fill-primary" />
    <slot />
  </div>
</template>

<script setup lang="ts">
defineEmits(['click'])

import XIcon from '@/assets/img/icons/x.svg'
</script>
