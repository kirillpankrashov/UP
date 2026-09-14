<template>
  <div
    v-if="isBlocked"
    data-name="campaigns-adset-card-tags-block-moderator"
    class="mb-3 flex text-center sm:mb-0 sm:ml-6"
  >
    <div class="_text-caption !text-danger">
      {{ t('campaignRow.reasons.moderator') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { AdsetBlockReason } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'
import type { IActiveAdset } from '@/modules/Streamer/views/Campaigns/types'

const props = defineProps<{
  adset: IActiveAdset
}>()

const { t } = useLocale<typeof messages>(messages)

const isBlocked = computed(() => {
	if ('blocked' in props.adset && props.adset.blocked.reason === AdsetBlockReason.MODERATOR) {
		return true
	}

	return false
})
</script>
