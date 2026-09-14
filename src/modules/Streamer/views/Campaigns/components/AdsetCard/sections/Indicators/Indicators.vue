<template>
  <div data-name="campaigns-adset-card-indicators">
    <template v-if="adset.status === 'close'">
      <div class="grid grid-cols-3 gap-4 sm:grid-cols-4">
        <div class="w-28">
          <div class="_text-caption mb-1">
            {{ t('campaignRow.dateEnd') }}
          </div>
          <div class="_text-m-regular">
            {{ adset.dates.end }}
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <component
        :is="campaignIndicators"
        :adset="adset"
      />
    </template>
  </div>
</template>

<script setup lang="ts">

import { computed } from 'vue'

import { CampaignType } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'
import type { IAdset } from '@/modules/Streamer/views/Campaigns/types'

import {
	BrandAwareness,
	Extension,
	Performance,
	Preroll,
	SpecialProject,
} from './sections'

const { t } = useLocale<typeof messages>(messages)

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
		case CampaignType.EXTENSION:
			return Extension
		case CampaignType.SPECIAL_PROJECT:
			return SpecialProject
		default:
			return null
	}
})
</script>
