<template>
  <div
    data-name="partner-agency-adset-info-description"
    data-test="partner-agency-adset-info-description"
  >
    <div class="_text-s-regular mb-1 text-gray">
      {{ t('creators.campaignSidebar.description') }}
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
import type { IAdsetInfo } from '@/modules/Partner/views/Agency/api'
import { messages } from '@/modules/Partner/views/Agency/locales'

const props = defineProps<{
  adset: IAdsetInfo
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

const markup = computed(() => filterXSS(converter.makeHtml(props.adset.description || props.adset.campaign?.description || '—')))
</script>
