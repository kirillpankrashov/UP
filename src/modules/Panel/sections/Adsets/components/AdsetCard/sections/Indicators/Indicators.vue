<template>
  <div data-name="campaigns-adset-card-indicators">
    <component
      :is="campaignIndicators"
      :adset="adset"
    />
  </div>
</template>

<script setup lang="ts">

import { computed } from 'vue'

import { CampaignType } from '@/core/types'
import type { IAdset } from '@/modules/Streamer/views/Campaigns/types'

import { BrandAwareness, Performance, Preroll } from './sections'

const props = defineProps<{
  adset: IAdset
}>()

const campaignIndicators = computed<any>(() => {
	if (props.adset.status === 'close') {
		return null
	}

	switch (props.adset.campaignType) {
		case CampaignType.BRAND_AWARENESS:
			return BrandAwareness
		case CampaignType.PERFORMANCE:
			return Performance
		case CampaignType.PREROLL:
			return Preroll
		default:
			return null
	}
})
</script>
