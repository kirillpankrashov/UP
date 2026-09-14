<template>
  <div
    v-if="isBlocked"
    data-name="campaigns-adset-card-tags-block-low-ctr"
    class="mb-3 flex items-end text-center sm:mb-0 sm:ml-6"
  >
    <div class="_text-caption !text-danger">
      {{ t('campaignRow.reasons.lowCTR') }}
    </div>
    <a
      class="_text-caption ml-6 flex items-center !text-primary"
      :href="t('campaignRow.reasons.lowCTRLink.href')"
      target="_blank"
    >
      {{ t('campaignRow.reasons.lowCTRLink.text') }}
      <LinkIcon class="h-3 w-3 fill-primary" />
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { AdsetBlockReason } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'
import type { IActiveAdset } from '@/modules/Streamer/views/Campaigns/types'

import LinkIcon from '@/assets/img/icons/link.svg'

const props = defineProps<{
  adset: IActiveAdset
}>()

const { t } = useLocale<typeof messages>(messages)

const isBlocked = computed(() => {
	if ('blocked' in props.adset && props.adset.blocked.reason === AdsetBlockReason.LOW_CTR) {
		return true
	}

	return false
})
</script>
