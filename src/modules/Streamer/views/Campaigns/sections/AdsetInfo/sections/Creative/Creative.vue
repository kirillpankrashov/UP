<template>
  <component
    data-name="campaigns-info-creative"
    :is="adsetCreative"
    :adset="adset"
  />
</template>

<script setup lang="ts">

import { computed } from 'vue'

import { CampaignType } from '@/core/types'
import type { IActiveAdsetInfo } from '@/modules/Streamer/views/Campaigns/types'

import {
	BrandAwareness,
	Extension,
	Performance,
	Preroll,
	SpecialProject,
} from './sections'

const props = defineProps<{
  adset: IActiveAdsetInfo
}>()

const adsetCreative = computed<any>(() => {
	switch (props.adset.campaignType) {
		case CampaignType.BRAND_AWARENESS:
			return BrandAwareness
		case CampaignType.PERFORMANCE:
			return Performance
		case CampaignType.PREROLL:
			return Preroll
		case CampaignType.EXTENSION:
			return Extension
		case CampaignType.SPECIAL_PROJECT:
			return SpecialProject
		default:
			return null
	}
})
</script>
