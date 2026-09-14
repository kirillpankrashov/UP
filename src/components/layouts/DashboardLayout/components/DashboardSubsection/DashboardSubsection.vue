<template>
  <div>
    <div class="_text-m-bold mb-3">
      {{ title }}
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
	title: string
}>()
</script>
