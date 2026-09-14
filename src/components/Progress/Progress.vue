<template>
  <div
    data-test="progress"
    class="relative"
  >
    <div
      class="relative flex min-h-[24px] w-full items-center rounded px-2 py-1"
      :class="calcProgress == 0 ? 'bg-danger-50' : 'bg-success-50'"
    >
      <div class="relative z-10 w-full text-black">
        <span
          v-if="!$slots.default"
          class="_text-s-regular text-black"
        >{{ progressText }}</span>
        <slot />
      </div>
      <div
        class="absolute left-0 top-0 h-full"
        :class="calcProgress == 0 ? 'bg-danger-200' : 'bg-success-200'"
        :style="{width: progress}"
      />
    </div>

    <ElPopover
      v-if="forecast && currency"
      popper-class="!w-auto"
      placement="bottom"
      trigger="hover"
    >
      <div class="_text-s-regular whitespace-nowrap">
        {{ t('progress.forecast') + ': ' + formatCurrency(forecast, false, currency) }}
      </div>
      <template #reference>
        <div
          class="absolute left-[80%] top-0 z-20 h-full w-[2px] -translate-x-1/2 cursor-pointer bg-primary before:absolute before:left-1/2 before:top-0 before:h-full before:w-[20px] before:-translate-x-1/2 before:content-['']"
          :style="{left: forecastProgress}"
        />
      </template>
    </ElPopover>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { CurrencyName } from '@/core/types'
import { useCurrency, useLocale } from '@/core/hooks'
import { ElPopover } from '@/components/element-plus'

import { messages } from './locales'

const { t } = useLocale<typeof messages>(messages)

const { formatCurrency } = useCurrency()

const props = withDefaults(defineProps<{
  current: number
  total: number
  text?: string
  forecast?: number
  currency?: CurrencyName
}>(), {
	current: 0,
	total: 0,
})

const calcProgress = computed(() => {
	const sum = ((props.current / props.total) * 100) || 0
	return sum > 100 ? 100 : sum
})
const progress = computed(() => calcProgress.value.toFixed() + '%')
const progressText = computed(() => {
	// if (props.current === props.total) {
	//   return props.text
	// }

	return `${progress.value} ${t('progress.of')} ${props.text}`
})
const forecastProgress = computed(() => {
	if (!props.forecast) {
		return '0%'
	}
	const sum = (((props.forecast / props.total) * 100) || 0)

	return (sum > 100 ? 100 : sum.toFixed()) + '%'
})
</script>
