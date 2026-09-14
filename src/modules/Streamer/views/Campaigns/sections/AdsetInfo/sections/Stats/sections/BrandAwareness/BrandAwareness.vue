<template>
  <component
    data-name="campaigns-stats-brand-awareness"
    :is="strategyComponent"
    :adset="adset"
    container-class="bg-primary-50 sm:before:bg-light-gray relative mb-8 grid gap-y-6 rounded px-2 py-5 text-center sm:grid-cols-2 sm:before:absolute sm:before:inset-y-2 sm:before:left-1/2 sm:before:w-[1px] sm:before:content-['']"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { StrategyPayment } from '@/core/types'
import type { IBrandAwarenessAdsetInfo } from '@/modules/Streamer/views/Campaigns/api'

import { CPA, CPC, PPV, PPVA } from './sections'

const props = defineProps<{
  adset: IBrandAwarenessAdsetInfo
}>()

const strategyComponent = computed(() => {
	switch (props.adset.strategyPayment.slug) {
		case StrategyPayment.CPA:
			return CPA
		case StrategyPayment.CPC:
			return CPC
		case StrategyPayment.PPV:
			return PPV
		case StrategyPayment.PPVA:
			return PPVA
		default:
			return null
	}
})
</script>
