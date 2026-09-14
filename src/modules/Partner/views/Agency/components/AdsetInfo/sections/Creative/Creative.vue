<template>
  <component
    data-name="partner-agency-adset-info-creative"
    :is="adsetCreative"
    :adset="adset"
  />
</template>

<script setup lang="ts">

import { computed } from 'vue'

import { CampaignType } from '@/core/types'
import type { IAdsetInfo } from '@/modules/Partner/views/Agency/api'

import { BrandAwareness, Performance } from './sections'

const props = defineProps<{
  adset: IAdsetInfo
}>()

const adsetCreative = computed<any>(() => {
	switch (props.adset.campaignType) {
		case CampaignType.BRAND_AWARENESS:
			return BrandAwareness
		case CampaignType.PERFORMANCE:
			return Performance
		default:
			return null
	}
})
</script>
