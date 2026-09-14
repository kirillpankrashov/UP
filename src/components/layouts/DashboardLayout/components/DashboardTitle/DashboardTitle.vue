<template>
  <div class="mb-8 w-full items-center justify-between sm:flex">
    <div class="_headline-2 mb-6 max-w-full sm:mb-0">
      <slot>{{ title }}</slot>
    </div>
    <div>
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
	title: string
}>()
</script>
