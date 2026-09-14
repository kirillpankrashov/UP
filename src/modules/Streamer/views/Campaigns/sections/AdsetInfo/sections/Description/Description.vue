<template>
  <div data-name="campaigns-info-description">
    <div class="_text-s-regular mb-1 text-gray">
      {{ t('campaignSidebar.description') }}
    </div>
    <div
      class="prose"
      v-html="markup"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Converter } from 'showdown'
import { filterXSS } from 'xss'

import { useLocale } from '@/core/hooks'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'
import type { IActiveAdsetInfo } from '@/modules/Streamer/views/Campaigns/types'

const props = defineProps<{
  adset: IActiveAdsetInfo
}>()

const { t } = useLocale<typeof messages>(messages)

const converter = new Converter({
	emoji: true,
	simpleLineBreaks: true,
	openLinksInNewWindow: true,
	headerLevelStart: 3,
	noHeaderId: true,
	ghCodeBlocks: true,
})

const markup = computed(() => {
	// TODO: add campaign to adset info for Special Projects
	let description = '—'

	if ('description' in props.adset && props.adset.description) {
		description = props.adset.description
	}

	else if ('campaign' in props.adset && 'description' in props.adset.campaign && props.adset.campaign.description) {
		description = props.adset.campaign.description
	}

	return filterXSS(converter.makeHtml(description))
})
</script>
