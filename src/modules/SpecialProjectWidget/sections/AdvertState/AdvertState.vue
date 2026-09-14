<template>
  <div class="min-w-0 rounded bg-[rgba(0,0,0,0.6)] px-3 py-1.5 text-lg tracking-tight text-white">
    <div
      v-if="disclaimerText"
      class="mt-0.5 text-sm leading-snug"
    >
      {{ disclaimerText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { AdFormat, type IUnitAttachment, type IVideoAttachment } from '@/core/types'
import type { ISpCreative } from '@/modules/SpecialProjectWidget/api'

const props = defineProps<{
  creative: ISpCreative
}>()

const disclaimerText = computed(() => {
	const { creative } = props
	const advertiser = creative.adSet.advertiser

	let attachment: IVideoAttachment | IUnitAttachment | undefined

	switch (creative.adSet.format) {
		case AdFormat.SP_FULLSCREEN:
			attachment = creative.attachments.video ?? creative.attachments.unit
			break
		case AdFormat.SP_CUSTOM:
			attachment = creative.attachments.zip
			break
	}

	const erid = attachment?.extend?.legal_compliance?.erid?.media

	if (creative.adSet.campaign.ordMarkup && erid) {
		return `${creative.adSet.campaign.ordMarkup} erid: ${erid}`
	}

	const advertiserName = advertiser?.legalName
	const advertiserTin = advertiser?.tin

	if (!erid || !advertiserName || !advertiserTin) {
		if (advertiserName && advertiserTin) {
			return `Реклама, ${advertiserName}, ИНН ${advertiserTin}`
		}
		return null
	}

	return `ERID ${erid}, Реклама, ${advertiserName}, ИНН ${advertiserTin}`
})
</script>
