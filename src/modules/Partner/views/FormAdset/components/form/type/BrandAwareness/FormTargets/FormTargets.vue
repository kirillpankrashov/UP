<template>
  <component
    :is="targetComponent"
    v-model="model"
    data-test="adset-form-targets-component"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { StrategyPayment } from '@/core/types'

import { CPA, PPV } from './sections'

const model = defineModel<{
  strategyPayment: StrategyPayment
	targetCtr: number | undefined
	targetEvr?: number | undefined
}>({ required: true })

const targetComponent = computed(() => {
	switch (model.value.strategyPayment) {
		case StrategyPayment.PPV:
		case StrategyPayment.PPVA:
			return PPV
		case StrategyPayment.CPA:
			return CPA
		default:
			return null
	}
})
</script>
