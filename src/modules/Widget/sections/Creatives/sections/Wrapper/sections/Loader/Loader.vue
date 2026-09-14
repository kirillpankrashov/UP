<template>
  <div
    data-name="loader"
    class="bg-white/40 absolute bottom-0 left-0 w-full"
  >
    <div
      class="h-2 bg-[#FFC600]"
      :style="style"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Widget } from '@/modules/Widget/class/Widget'

const props = defineProps<{
  widget: Widget
}>()

const style = computed(() => {
	const timer = props.widget.creativesManager.timer
	const percent = 100 / timer.total.value * timer.current.value
	return `width: ${percent}%`
})
</script>
