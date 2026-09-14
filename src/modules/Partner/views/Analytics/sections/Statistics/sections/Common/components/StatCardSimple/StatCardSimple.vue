<template>
  <div>
    <div class="_text-caption mb-1 sm:mb-3">
      {{ title }}
    </div>
    <div class="_text-s-regular !text-2xl">
      {{ value }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: number | string
}>()
</script>
