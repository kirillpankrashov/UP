<template>
  <component
    data-test="campaigns-info-brand-awareness"
    :is="strategyComponent"
    :adset="adset"
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
