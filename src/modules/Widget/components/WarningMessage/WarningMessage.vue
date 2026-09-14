<template>
  <div
    data-name="warning-message"
    class="fixed bottom-0 left-0 z-[100] flex w-full items-start justify-between bg-white p-[1.5vw]"
  >
    <div class="flex w-1/2 items-end text-[3vw] font-bold leading-[3.5vw] tracking-[-0.02em] text-primary">
      <CircleExclamationIcon class="mr-[1vw] h-[3vw] w-[3vw]" />
      {{ title }}
    </div>
    <div
      class="text-light-black flex w-1/2 text-[3vw] leading-[3.5vw] tracking-[-0.02em]"
      v-html="description"
    />
  </div>
</template>

<script setup lang="ts">
import CircleExclamationIcon from '@/assets/img/icons/circle-exclamation.svg'

defineProps<{
  title: string
  description: string
}>()
</script>
