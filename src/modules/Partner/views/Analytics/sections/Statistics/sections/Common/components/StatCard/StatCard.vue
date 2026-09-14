<template>
  <div class="relative flex flex-col justify-between rounded p-4 shadow-lg shadow-primary-100">
    <div class="_text-m-bold mb-6">
      {{ title }}
    </div>
    <div
      v-if="value"
      class="_text-l-bold !text-4xl sm:!text-5xl"
    >
      {{ formattedValue }}
    </div>
    <div
      v-if="total"
      class="_text-s-regular absolute right-4 top-5 text-dark-gray"
    >
      {{ formattedTotal }}
    </div>
    <div v-if="$slots.default">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useCurrency } from '@/core/hooks'

const props = defineProps<{
  title: string
  value: number | string
  total?: string | number
}>()

const { formatNumber } = useCurrency()

const formattedValue = computed(() => {
	if (typeof props.value === 'number') {
		return formatNumber(props.value, false)
	}

	return props.value
})

const formattedTotal = computed(() => {
	if (typeof props.total === 'number') {
		return formatNumber(props.total, false)
	}

	return props.total
})
</script>
