<template>
  <component
    :is="campaignTags"
    :adset="adset"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { CampaignType } from '@/core/types'
import type { IAdset } from '@/modules/Streamer/views/Campaigns/types'

import { BrandAwareness, Performance, Preroll } from './sections'

const props = defineProps<{
  adset: IAdset
}>()

const campaignTags = computed<any>(() => {
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
